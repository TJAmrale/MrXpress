<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Device; 
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

    $devices = Device::with(['brand','series'])->orderBy('device_id', 'desc')->paginate(15); // for example, 15 devices per page
    return DeviceResource::collection($devices);
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
