<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function create(Request $request)
    {
        // Validate the request 
        $validatedData = $request->validate([
            'device' => 'required',
            'repair_type' => 'required',
            'address' => 'required',
            'price' => 'required',
            'status' => 'required', 
        ]);

        // Create a new booking record
        $booking = new Booking();
        $booking->device = $validatedData['device'];
        $booking->repair_type = $validatedData['repair_type'];
        $booking->address = $validatedData['address'];
        $booking->price = $validatedData['price'];
        $booking->status = $validatedData['status'];
        //$booking->technician_idkey = "";
        $booking->save();

        
        return response()->json(['message' => 'Booking created successfully']);
    }

    public function assignTechnician(Request $request, Booking $booking)
    {
        $technician_id = $request->input('technician_id');
        $booking->update([
            'technician_idkey' => $technician_id,
            'status' => 'activated',
        ]);

        return response()->json(['message' => 'Booking assigned to technician successfully']);
    }

    public function finishBooking(Booking $booking)
    {
        $booking->status = 'finished';
        $booking->save();

        return response()->json(['message' => 'Booking finished successfully']);
    }

    public function index()
    {
        $bookings = Booking::all();
        return response()->json($bookings);
    }
}