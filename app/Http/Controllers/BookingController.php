<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Device;
use App\Models\Stock;
use App\Models\Item;
use App\Models\Job;
use App\Models\JobStock;
use App\Models\Series;
use App\Models\Technician;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class BookingController extends Controller
{


    public function sortJobStatus($status, $technician_id)
    {
        $validStatuses = ["NEW", "IN PROGRESS", "COMPLETED"];

        if (!in_array($status, $validStatuses)) {
            return response()->json(['error' => 'Invalid status specified'], 400);
        }

        //Retrieve and filter jobs by the specified job_status and technician_id
        $query = Job::where('job_status', $status);

        if ($status !== "NEW") {
            // If status is not "NEW," filter by technician_id
            $query->where('technician_id', $technician_id);
        } else {
            //If status is "NEW," include jobs with a null technician_id
            $query->where(function ($q) use ($technician_id) {
                $q->where('technician_id', $technician_id)
                    ->orWhereNull('technician_id');
            });
        }

        $filteredJobs = $query->orderBy('job_status')->get();

        $jobsWithDetails = [];

        foreach ($filteredJobs as $job) {
            $customerId = $job->customer_id;
            $customer = User::find($customerId);

            if (!$customer) {
                return response()->json(['error' => 'Customer not found'], 404);
            }

            //Get the related JobStock records for the job
            $jobStocks = $job->stocksUsed;

            $itemDetails = [];
            foreach ($jobStocks as $jobStock) {
                $stock = $jobStock->stock;
                $device = $stock->device;
                $series = $device->series;
                $item = $stock->item;

                //Extract the item details
                $itemDetails[] = [
                    'model' => $device->model,
                    'series_name' => $series->series_name,
                    'item_type' => $item->item_type,
                    'item_name' => $item->item_name,
                ];
            }

            //now combine customer and item details
            $jobWithDetails = [
                'job_id' => $job->job_id,
                'job_status' => $job->job_status,
                'total_cost' => $job->total_cost,
                'custom_address' => $job->custom_address,
                'address' => $customer->address,
                'phone' => $customer->phone,
                'finished_at'=> $job->finished_at,
                'item_details' => $itemDetails,
                // Add other job details as needed
            ];

            $jobsWithDetails[] = $jobWithDetails;
        }

        return response()->json(['jobsWithDetails' => $jobsWithDetails], 200);
    }


    public function updateTechnicianId($jobId, $technicianId) {
        // Find the job by its ID
        $job = Job::find($jobId);
        $status = "IN PROGRESS";
    
        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }
    
        // Set the technician_id
        $job->technician_id = $technicianId;
        $job->job_status = $status;
    
        // Save the changes
        $job->save();
    
        return response()->json(['message' => 'Technician assigned to the job successfully'], 200);
    }

    public function completeJob($jobId) {
        $job = Job::find($jobId);
    
        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }
    
        // Check if the job is already completed to avoid updating the timestamp multiple times
        if ($job->job_status !== 'COMPLETED') {
            $job->job_status = 'COMPLETED';
            $job->finished_at = now(); // Set the finished_at column to the current timestamp
    
            $job->save();
        }
    
        return response()->json(['message' => 'Job marked as completed'], 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $totalCost = 0;
        $totalTechPayout = 0;

        // 1. Retrieve the device_id based on brand, series, model, and colour
        $brand = Brand::where('brand_name', $data['device']['brand'])->first();
        $series = Series::where('series_name', $data['device']['series'])->first();

        if (!$brand || !$series) {
            return response()->json(['error' => 'Invalid brand or series selected'], 400);
        }

        $device = Device::where('brand_id', $brand->brand_id)
            ->where('series_id', $series->series_id)
            ->where('model', $data['device']['model'])
            ->where('colours', $data['device']['colour'])
            ->first();

        if (!$device) {
            return response()->json(['error' => 'Invalid device selection'], 400);
        }

        // 2. Calculate cost for the part
        $part = Item::where('item_name', $data['parts'])->first();

        if (!$part) {
            return response()->json(['error' => 'Invalid part selected'], 400);
        }

        $partStock = Stock::where('device_id', $device->device_id)
            ->where('item_id', $part->item_id)
            ->first();

        if (!$partStock || $partStock->quantity <= 0) {
            return response()->json(['error' => 'Part is out of stock'], 400);
        }

        $totalCost += $partStock->retail_price;

        // Technician Payout calculation for the part
        $techPayoutForPart = $partStock->wholesale_price + 0.7 * ($partStock->retail_price - $partStock->wholesale_price);
        $totalTechPayout += $techPayoutForPart;

        // 3. Calculate cost for the accessories
        foreach ($data['accessories'] as $accessoryName) {
            $accessory = Item::where('item_name', $accessoryName)->first();

            if (!$accessory) {
                continue; // Or you can return an error response here.
            }

            $accessoryStock = Stock::where('item_id', $accessory->item_id)->first();

            if (!$accessoryStock || $accessoryStock->quantity <= 0) {
                continue; // Or you can return an error response here.
            }

            $totalCost += $accessoryStock->retail_price;

            // Technician Payout calculation for the accessory
            $techPayoutForAccessory = $accessoryStock->wholesale_price + 0.7 * ($accessoryStock->retail_price - $accessoryStock->wholesale_price);
            $totalTechPayout += $techPayoutForAccessory;
        }

        // 4. Calculate the total cost:
        $companyEarnings = $totalCost - $totalTechPayout;

        // TODO: Need Confirmation from Customer to Confirm the job
        // 5. Storing the data in the database (job table and job_stock table)
        // ...

        return response()->json([
            'totalCost' => $totalCost,
            'techPayout' => $totalTechPayout,
            'companyEarnings' => $companyEarnings
        ], 200);
    }

    public function confirm(Request $request)
    {
        $data = $request->all();

        // Begin a transaction to ensure all database operations are atomic
        DB::beginTransaction();

        try {
            // Add booking to the Job table
            $job = new Job();
            $job->customer_id = $data['customer_id'];
            $job->job_status = "NEW";
            $job->callout_fee = 0;
            $job->total_cost = $data['totalCost'];
            $job->technician_fee = $data['techPayout'];
            $job->admin_fee = $data['companyEarnings'];
            $job->save();

            // Add the main part to the Job_stock table
            $part = Item::where('item_name', $data['parts'])->first();
            if ($part) {
                // Fetch the stock record for the given item_id
                $stock = Stock::where('item_id', $part->item_id)->first();

                if ($stock) {
                    $jobStock = new JobStock();
                    $jobStock->job_id = $job->job_id;
                    $jobStock->stock_id = $stock->stock_id;  // use the stock_id from the fetched stock record
                    $jobStock->quantity = 1;
                    $jobStock->save();
                }
            }

            // Add accessories to the Job_stock table
            foreach ($data['accessories'] as $accessoryName) {
                $accessory = Item::where('item_name', $accessoryName)->first();
                if ($accessory) {
                    // Fetch the stock record for the given item_id
                    $stock = Stock::where('item_id', $part->item_id)->first();

                    if ($stock) {
                        $jobStock = new JobStock();
                        $jobStock->job_id = $job->job_id;
                        $jobStock->stock_id = $stock->stock_id;  // use the stock_id from the fetched stock record
                        $jobStock->quantity = 1;
                        $jobStock->save();
                    }
                }
            }

            // If everything is successful, commit the transaction
            DB::commit();

            return response()->json(['message' => 'Booking confirmed!', 'job_id' => $job->job_id, 'customer_id' => $data['customer_id']], 200);
        } catch (\Exception $e) {
            // If there's any error, rollback the entire transaction
            DB::rollBack();

            // TODO Not good to have that getMessage
            return response()->json(['message' => 'Confirmation failed. Please try again.'], 500);
        }
    }

    public function getJobCost($job_id)
    {
        $job = Job::find($job_id);

        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        return response()->json(['totalCost' => $job->total_cost], 200);
    }

}
