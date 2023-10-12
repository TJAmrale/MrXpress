<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ItemTypeController extends Controller
{
    use App\Models\Item; 

    public function index() {
        return Item::select('item_type')->distinct()->get();
    }
    
}
