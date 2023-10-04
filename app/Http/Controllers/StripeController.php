<?php

namespace App\Http\Controllers;

use Stripe\Stripe;
use Stripe\PaymentIntent;

use Illuminate\Http\Request;

class StripeController extends Controller
{
    public function createPaymentIntent(Request $request) {
        Stripe::setApiKey(config('services.stripe.secret'));
    
        $amount = $request->input('amount');  // * Request from Front-end | Amount should be in cents
    
        $paymentIntent = PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'aud',
        ]);
    
        return response()->json([
            'clientSecret' => $paymentIntent->client_secret
        ]);
    }
}
