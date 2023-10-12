<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Series; 
class SeriesController extends Controller
{
    

    public function index() {
        return Series::select('series_name')->distinct()->get();
    }
    
}
