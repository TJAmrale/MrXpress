<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Device; 

class ColourController extends Controller
{
    

    public function index() {
        return Device::select('colours')->distinct()->get();
    }
    
}
