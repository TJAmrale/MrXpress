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
use App\Models\TechnicianRatings;
use App\Models\CustomerRatings;

use Stripe\Stripe;
use Stripe\PaymentIntent;

class JobController extends Controller
{
    public function CsortJobStatus($status, $customer_id)
    {

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

    public function cancelAcceptedJob($jobId)
    {
        // Begin a transaction to ensure all database operations are atomic
        DB::beginTransaction();

        try {
            // Find the job by its ID
            $job = Job::find($jobId);
            $status = "CANCELLED";

            if (!$job) {
                return response()->json(['error' => 'Job not found'], 404);
            }

            Stripe::setApiKey(config('services.stripe.secret'));

            $job->job_status = $status;
            $job->callout_fee = 50.00;
            $job->amount = 50.00;

            $paymentIntent = PaymentIntent::retrieve(
                $job->payment_intent_id
            );
            $paymentIntent->capture(['amount_to_capture' => 5000]);
            $job->payment_status = "succeeded";

            // Save the changes
            $job->save();
            // If everything is successful, commit the transaction
            DB::commit();
            return response()->json(['message' => 'Confirm Job completion successfully!'], 200);
        } catch (\Exception $e) {
            // If there's any error, rollback the entire transaction
            DB::rollBack();
            return response()->json(['message' => 'Confirm Job completion failed. Please try again.'], 500);
        }

        return response()->json(['message' => 'Cancelled'], 200);
    }


    public function storeTechnicianRating(Request $request)
    {
        $jobId = $request->input('jobId');
        $rating = $request->input('rating');
        $comments = $request->input('comments');

        // Find the job by jobId to obtain customer_id and technician_id
        $job = Job::where('job_id', $jobId)->first();

        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        $customer_id = $job->customer_id;
        $technician_id = $job->technician_id;

        // Create a new TechnicianRatings record
        $customerRating = new TechnicianRatings();
        $customerRating->job_id = $jobId;
        $customerRating->rating = $rating;
        $customerRating->comments = $comments;
        $customerRating->customer_id = $customer_id;
        $customerRating->technician_id = $technician_id;

        $customerRating->save();

        return response()->json(['message' => 'Rating and comment saved successfully'], 200);
    }


    public function storeCustomerRating(Request $request)
    {
        $jobId = $request->input('jobId');
        $rating = $request->input('rating');
        $comments = $request->input('comments');

        // Find the job by jobId to obtain customer_id and technician_id
        $job = Job::where('job_id', $jobId)->first();

        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        $existingRating = CustomerRatings::where('job_id', $jobId)->first();

        if ($existingRating) {
            // Return an error response if a rating entry already exists
            return response()->json(['error' => 'Rating entry already exists for this job'], 400);
        }

        $customer_id = $job->customer_id;
        $technician_id = $job->technician_id;

        // Create a new TechnicianRatings record
        $technicianRating = new CustomerRatings();
        $technicianRating->job_id = $jobId;
        $technicianRating->rating = $rating;
        $technicianRating->comments = $comments;
        $technicianRating->customer_id = $customer_id;
        $technicianRating->technician_id = $technician_id;

        $technicianRating->save();

        return response()->json(['message' => 'Rating and comment saved successfully'], 200);
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

