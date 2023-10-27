<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Series;
use App\Models\Device;
use App\Models\Item;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RepairSelectController extends Controller
{
    public function brands()
    {
        $brands = Brand::whereNull('deleted_at')->get();
        // Error Check
        if (empty($brands)) {
            return response()->json(['error' => 'Invalid brands selected'], 400);
        }

        return response()->json($brands);
    }

    public function series(Request $request)
    {
        $data = $request->all();

        // Fetch the brand_id from the database based on the brand_name
        $brand = Brand::where('brand_name', $data['device']['brand'])
            ->whereNull('deleted_at')
            ->first();
        // Error Check
        if (empty($brand)) {
            return response()->json(['error' => 'Invalid brand selected'], 400);
        }

        // Retrieve an Array of series_id based on brand
        $seriesIDs = Device::where('brand_id', $brand->brand_id)
            ->pluck('series_id')
            ->whereNull('deleted_at')
            ->toArray();
        // Error Check
        if (empty($seriesIDs)) {
            return response()->json(['error' => 'Invalid seriesIDs selection'], 400);
        }

        // Fetch the list of series from the database based on the seriesIDs
        $series = Series::whereIn('series_id', $seriesIDs)
            ->whereNull('deleted_at')
            ->get();
        // Error Check
        if (empty($series)) {
            return response()->json(['error' => 'Invalid series selected'], 400);
        }

        return response()->json($series);
    }

    public function models(Request $request)
    {
        $data = $request->all();

        // Fetch the brand_id from the database based on the brand_name
        $brandID = Brand::where('brand_name', $data['device']['brand'])
            ->whereNull('deleted_at')
            ->first();
        // Error Check
        if (empty($brandID)) {
            return response()->json(['error' => 'Invalid brandID selected'], 400);
        }

        // Fetch the series_id from the database based on the series_name
        $seriesID = Series::where('series_name', $data['device']['series'])
            ->whereNull('deleted_at')
            ->first();
        // Error Check
        if (empty($seriesID)) {
            return response()->json(['error' => 'Invalid seriesID selected'], 400);
        }

        // Fetch the list of models from the database based on the brand_id and series_id
        $models = Device::select('model')
            ->whereIn('brand_id', $brandID)
            ->whereIn('series_id', $seriesID)
            ->whereNull('deleted_at') // Exclude records where deleted_at is not null
            ->groupBy('model')
            ->get();
        // Error Check
        if (empty($models)) {
            return response()->json(['error' => 'Invalid models selected'], 400);
        }

        return response()->json($models);
    }

    public function colours(Request $request)
    {
        $data = $request->all();

        // Retrieve an Array of device_id from the database based on the model
        $deviceIDs = Device::where('model', $data['device']['model'])
            ->pluck('device_id')
            ->whereNull('deleted_at')
            ->toArray();
        // Error Check
        if (empty($deviceIDs)) {
            return response()->json(['error' => 'Invalid deviceIDs selected'], 400);
        }

        // Fetch the list of colours from the database based on the deviceIDs
        $colours = Device::whereIn('device_id', $deviceIDs)
            ->whereNull('deleted_at')
            ->get();
        // Error Check
        if (empty($colours)) {
            return response()->json(['error' => 'Invalid colours selection'], 400);
        }
        return response()->json($colours);
    }

    public function repairtype(Request $request)
    {
        $data = $request->all();

        // Retrieve the device_id from the database based on the model
        $deviceID = Device::where('model', $data['device']['model'])      
            ->where('colours', $data['device']['colour'])
            ->pluck('device_id')
            ->whereNull('deleted_at')
            ->first();
        // Error Check
        if (empty($deviceID)) {
            return response()->json(['error' => 'Invalid deviceID selected'], 400);
        }

        // Retrieve an Array of item_ids from the database based on the deviceID
        $itemIDs = Stock::where('device_id', $deviceID)
            ->pluck('item_id')
            ->whereNull('deleted_at')
            ->toArray();
        // Error Check
        if (empty($itemIDs)) {
            return response()->json(['error' => 'Invalid itemIDs selected'], 400);
        }

        // Fetch the list of items from the database based on the deviceIDs
        $items = Item::whereIn('item_id', $itemIDs)
            ->where('item_type', 'PART')
            ->whereNull('deleted_at')
            ->get();
        // Error Check
        if (empty($items)) {
            return response()->json(['error' => 'Invalid items selection'], 400);
        }

        return response()->json($items);
    }

    public function accessories(Request $request)
    {
        //\Log::info("doing"); //Error Checking
        $data = $request->all();

        // Retrieve the device_id from the database based on the model
        $deviceID = Device::where('model', $data['device']['model'])      
            ->where('colours', $data['device']['colour'])
            ->pluck('device_id')
            ->whereNull('deleted_at')
            ->first();
        // Error Check
        if (empty($deviceID)) {
            return response()->json(['error' => 'Invalid deviceID selected'], 400);
        }

        // Retrieve an Array of item_ids from the database based on the deviceID
        $itemIDs = Stock::where('device_id', $deviceID)
            ->pluck('item_id')
            ->whereNull('deleted_at')
            ->toArray();
        // Error Check
        if (empty($itemIDs)) {
            return response()->json(['error' => 'Invalid itemIDs selected'], 400);
        }

        // Fetch the list of items from the database based on the deviceIDs
        $items = Item::whereIn('item_id', $itemIDs)
            ->where('item_type', 'ACCESSORY')
            ->whereNull('deleted_at')
            ->get();
        // Error Check
        if (empty($items)) {
            return response()->json(['error' => 'Invalid items selection'], 400);
        }

        return response()->json($items);
    }
}