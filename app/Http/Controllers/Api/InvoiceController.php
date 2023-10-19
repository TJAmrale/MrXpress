<?php

namespace App\Http\Controllers\Api;

use PDF;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class InvoiceController extends Controller
{
    public function generateInvoice(Booking $booking)
    {
        $invoice = PDF::loadView('invoices.invoice_template', ['booking' => $booking]);
        return $invoice->download('invoice.pdf');
    }
}