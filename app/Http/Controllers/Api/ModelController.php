<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ModelController extends Controller
{
    use App\Models\Device;  

    public function index() {
        return Device::select('model')->distinct()->get();
    }

}
