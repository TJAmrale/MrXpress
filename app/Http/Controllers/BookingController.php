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

class BookingController extends Controller
{

    public function sortJobStatus($status)
    {
        $validStatuses = ["NEW", "IN PROGRESS", "COMPLETED"];

        if (!in_array($status, $validStatuses)) {
            return response()->json(['error' => 'Invalid status specified'], 400);
        }

        //Retrieve and filter jobs by the specified job_status
        $filteredJobs = Job::where('job_status', $status)->orderBy('job_status')->get();

        return response()->json(['filteredJobs' => $filteredJobs], 200);
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
    
        $job->job_status = 'COMPLETED';
    

        $job->save();
    
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
