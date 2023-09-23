<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;
use App\Models\Device;
use App\Models\Part;
use App\Models\Stock;
use App\Models\Job;



class RepairController extends Controller
{
    public function store(Request $request)
    {
        // Fetch all the data from the request
        $data = $request->all();

        // 1. Retrieve the device_id based on brand, series, model, and colour
        // Query the Device table based on the brand name, series name, model, and colour provided in the request
        $device = Device::whereHas('brand', function ($query) use ($data) {
            $query->where('brand_name', $data['device']['brand']);
        })
            ->whereHas('series', function ($query) use ($data) {
                $query->where('series_name', $data['device']['series']);
            })
            ->where('model', $data['device']['model'])
            ->where('colours', $data['device']['colour'])
            ->first();
        // Fetch the device ID
        $deviceId = $device->device_id;

        // 2. Get the repair_price based on the device_id and the part name
        // Query the Part table to get the part name
        $part = Part::where('part_name', $data['repair']['part_name'])->first();
        // Query the Stock table based on device_id and part_id to get the repair price
        $stock = Stock::where('device_id', $deviceId)
            ->where('part_id', $part->part_id)
            ->first();

        $repairPrice = $stock->repair_price;

        // 3. Handle accessories if any are selected
        $accessoryPrices = [];

        $accessoryPrices = [];
        if(isset($data['accessories'])) {
            foreach ($data['accessories'] as $accessory) {
                $part = Part::where('part_name', $accessory['part_name'])->first();
                $accessoryPrices[] = $part->retail_price;
            }
        }

        // 4. Calculate the total cost:
        $totalCost = $repairPrice + array_sum($accessoryPrices);

        // TODO. Need Confirmation from Customer to Confirm the job
        // 5. Storing the data in the database
        $job = new Job();
        $job->customer_id = $data['customer_id'];
        $job->stock_id = $stock->stock_id;  // We already queried the stock based on device and part
        $job->job_status = 'NEW';
        $job->start_date_time = now(); // Set the start date-time to the current timestamp
        $job->total_cost = $totalCost;
        $job->parts_used = count($data['accessories']);  // ? Assuming parts_used refers to the number of parts used
        $job->technician_fee = 0; // no idea at the moment
        $job->admin_fee = 0; // no idea at the moment
        $job->save();

        // Returning JSON response
        return response()->json(['totalCost' => $totalCost], 200);

    }
}
