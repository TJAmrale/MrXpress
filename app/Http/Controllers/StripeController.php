<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Stripe\Stripe;
use Stripe\PaymentIntent;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StripeController extends Controller
{
    /**
     * Create the PaymentIntent.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createPaymentIntent(Request $request)
    {
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
                'job_id' => 'required|integer|min:1',
                'customer_id' => 'required|integer|min:1'
            ]);

            Stripe::setApiKey(config('services.stripe.secret'));

            // Retrieve payment intent information from Stripe
            $paymentIntent = PaymentIntent::retrieve(
                $request->input('payment_intent')
            );

            // Optionally, you might want to check the payment status. If it's 'succeeded', you might want to 
            // record this in your database, send an email notification, etc.
            if ($paymentIntent->status === 'succeeded') {
                $data = $request->all();

                // Begin a transaction to ensure all database operations are atomic
                DB::beginTransaction();

                try {
                    // Add payment to Payment table
                    $payment = new Payment();
                    $payment->customer_id = $data['customer_id']; 
                    $payment->job_id = $data['job_id']; 
                    $payment->payment_intent_id = $data['payment_intent'];
                    $payment->amount = $paymentIntent->amount;
                    $payment->currency = $paymentIntent->currency;
                    $payment->status = "succeeded"; // In the scope of this project, status will be 'succeeded' by default
                    $payment->save();

                    // If everything is successful, commit the transaction
                    DB::commit();
                    return response()->json(['message' => 'Payment added into table!'], 200);
                } catch (\Exception $e) {
                    // If there's any error, rollback the entire transaction
                    DB::rollBack();
                }

                return response()->json(['message' => 'Payment verified successfully.']);
            } else {
                return response()->json(['error' => 'Payment verification failed.'], 400);
            }
        } catch (\Exception $e) {
            // Handle error, such as logging, returning a message to the front end, etc.
            return response()->json(['error' => 'An error occurred while verifying the payment.'], 500);
        }
    }
}
