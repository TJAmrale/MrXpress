<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
{
    // Check if the user is authenticated
    if ($request->user()) {
        // Retrieve a list of jobs associated with the logged-in user
        $jobs = Job::where('customer_id', $request->user()->customer_id)->get();

        return response()->json(['jobs' => $jobs], 200);
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