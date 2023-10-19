<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Device;  

class ModelController extends Controller
{
    

    public function index() {
        return Device::with(['brand', 'series'])
            ->select('device_id', 'model', 'colours', 'brand_id', 'series_id')
            ->distinct()
            ->get();
    }
}
