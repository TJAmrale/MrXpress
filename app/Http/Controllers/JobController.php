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

class JobController extends Controller
{
    public function CsortJobStatus($status, $customer_id)
    {

        \Log::info('Customer ID: ' . $customer_id);
        $validStatuses = ["NEW", "IN PROGRESS", "COMPLETED"];

        if (!in_array($status, $validStatuses)) {
            return response()->json(['error' => 'Invalid status specified'], 400);
        }

        // Retrieve and filter jobs by the specified job_status and customer_id
        $query = Job::where('job_status', $status)
            ->where('customer_id', $customer_id);

        $filteredJobs = $query->orderBy('job_status')->get();

        $jobsWithDetails = [];

        foreach ($filteredJobs as $job) {
            $customerId = $job->customer_id;
            $customer = User::find($customerId);

            if (!$customer) {
                return response()->json(['error' => 'Customer not found'], 404);
            }

            // Get the related JobStock records for the job
            $jobStocks = $job->stocksUsed;

            $itemDetails = [];
            foreach ($jobStocks as $jobStock) {
                $stock = $jobStock->stock;
                $device = $stock->device;
                $series = $device->series;
                $item = $stock->item;

                // Extract the item details
                $itemDetails[] = [
                    'model' => $device->model,
                    'series_name' => $series->series_name,
                    'item_type' => $item->item_type,
                    'item_name' => $item->item_name,
                ];
            }

            // Now combine customer and item details
            $jobWithDetails = [
                'job_id' => $job->job_id,
                'job_status' => $job->job_status,
                'total_cost' => $job->total_cost,
                'finished_at'=> $job->finished_at,
                'item_details' => $itemDetails,
                // Add other job details as needed
            ];

            $jobsWithDetails[] = $jobWithDetails;
        }

        return response()->json(['jobsWithDetails' => $jobsWithDetails], 200);
    }


    public function cancelJob($jobId)
    {
        // Find the job by its ID
        $job = Job::find($jobId);
        $status = "CANCELLED";

        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        // Set the technician_id
        $job->job_status = $status;

        // Save the changes
        $job->save();

        return response()->json(['message' => 'Cancelled'], 200);
    }



    public function cancelAcceptJob($jobId)
    {
        // Find the job by its ID
        $job = Job::find($jobId);
        $status = "CANCELLED";

        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        // Set the technician_id
        $job->job_status = $status;

        // Save the changes
        $job->save();

        return response()->json(['message' => 'Cancelled'], 200);
    }




    public function index(Request $request)
    {
        // Check if the user is authenticated
        if ($request->user()) {
            // User is authenticated; no need to retrieve jobs here
            return response()->json(['message' => 'Authenticated user'], 200);
        } else {
            // User is not authenticated, return an error response
            return response()->json(['error' => 'User is not authenticated'], 401);
        }
    }



    public function show($id)
    {
        // Retrieve a specific job by its ID
        $job = Job::find($id);

        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        return response()->json(['job' => $job], 200);
    }

}

/*
    public function store(Request $request)
    {
        // Create a new job based on the data in the request
        $data = $request->all();
        // ...

        // Save the job to the database
        $job = new Job();
        // Set job properties based on $data
        // $job->property = $data['property'];
        $job->save();

        return response()->json(['message' => 'Job created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        // Update an existing job by its ID
        $job = Job::find($id);

        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        $data = $request->all();
        // Update job properties based on $data
        // $job->property = $data['property'];
        $job->save();

        return response()->json(['message' => 'Job updated successfully'], 200);
    }

    public function destroy($id)
    {
        // Delete a job by its ID
        $job = Job::find($id);

        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        $job->delete();

        return response()->json(['message' => 'Job deleted successfully'], 200);
    }
*/