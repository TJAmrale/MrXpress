<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    use App\Models\Brand;  

    public function index() {
    return Brand::all();
    }

}
