<?php

namespace App\Http\Controllers;

use Stripe\Stripe;
use Stripe\PaymentIntent;

use Illuminate\Http\Request;

class StripeController extends Controller
{
    /**
     * Create the PaymentIntent.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createPaymentIntent(Request $request) {
        Stripe::setApiKey(config('services.stripe.secret'));
    
        $amount = $request->input('amount');  // * Request from Front-end | Amount should be in cents
    
        $paymentIntent = PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'aud',
            'payment_method_types' => ['card']
        ]);
    
        return response()->json([
            'clientSecret' => $paymentIntent->client_secret
        ]);
    }

    /**
     * Verify the payment on the server-side.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function verifyPayment(Request $request)
    {
        try {
            // Validate incoming request
            $request->validate([
                'payment_intent' => 'required|string',
                'payment_intent_client_secret' => 'required|string',
            ]);

            Stripe::setApiKey(config('services.stripe.secret'));

            // Retrieve payment intent information from Stripe
            $paymentIntent = PaymentIntent::retrieve(
                $request->input('payment_intent')
            );

            // Optionally, you might want to check the payment status. If it's 'succeeded', you might want to 
            // record this in your database, send an email notification, etc.
            if ($paymentIntent->status === 'succeeded') {
                // Perform your post-payment logic here, e.g., save data to the database, send a thank-you email, etc.
                // ...

                return response()->json(['message' => 'Payment verified successfully.']);
            } else {
                return response()->json(['error' => 'Payment verification failed.'], 400);
            }
        } catch (\Exception $e) {
            // Handle error, such as logging, returning a message to the front end, etc.
            return response()->json(['error' => 'An error occurred while verifying the payment. ' . $e->getMessage()], 500);
        }
    }
}
