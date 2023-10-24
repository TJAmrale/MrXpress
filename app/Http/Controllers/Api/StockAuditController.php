<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StockAudit; 
use App\Http\Resources\StockAuditResource; 

class StockAuditController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $audits = StockAudit::with(['user'])->paginate(20);

        return StockAuditResource::collection($audits);
    }

    // You can add other methods like `show` if you need to view details of a specific audit.

    /**
     * Display the specified audit.
     */
    public function show(StockAudit $audit)
    {
        return new StockAuditResource($audit);
    }
    

}

