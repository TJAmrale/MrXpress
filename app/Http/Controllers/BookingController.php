<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Device;
use App\Models\Stock;
use App\Models\Item;
use App\Models\Series;
use Illuminate\Http\Request;

class BookingController extends Controller
{
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
}
