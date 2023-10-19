<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Api\DeviceController;

use App\Http\Controllers\Controller;
use App\Models\Device; 
use App\Models\Brand;
use App\Models\Series;
use App\Http\Requests\StoreDeviceRequest; 
use App\Http\Requests\UpdateDeviceRequest; 
use App\Http\Resources\DeviceResource; 

class DeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{

    $devices = Device::with(['brand','series'])->orderBy('device_id', 'desc')->paginate(15); 
    return DeviceResource::collection($devices);
}
    /**
     * Fetch all brands.
     */
    public function getBrands() {
        return Brand::select('brand_id', 'brand_name')->get();
    }

    /**
     * Fetch all series.
     */
    public function getSeries() {
        return Series::select('series_id', 'series_name')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeviceRequest $request)
    {
        $data = $request->validated();
        $device = Device::create($data);
        return response(new DeviceResource($device), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Device $device)
    {
        $device->load('brand', 'series');
    
        return new DeviceResource($device);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeviceRequest $request, Device $device)
    {
        $data = $request->validated();
        $device->update($data);
        return new DeviceResource($device);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Device $device)
    {
        $device->delete();
        return response("", 204);
    }

    public function restore(Device $device)
    {
        $device->restore();
        return response("", 204);
    }
}
