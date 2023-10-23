<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Technician;

class TechnicianController extends Controller
{
    public function showFullName($technician_id)
    {
        $technician = Technician::find($technician_id);

        if (!$technician) {
            // Handle the case where the technician with the given ID is not found
            return response()->json(['message' => 'Technician not found'], 404);
        }

        $fullname = $technician->fullname;

        return response()->json(['fullname' => $fullname]);
    }
}
