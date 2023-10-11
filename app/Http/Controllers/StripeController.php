<?php

namespace App\Http\Controllers;

use App\Models\Job;
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
            'payment_method_types' => ['card'],
            // 'receipt_email' => 'someone@example.com' // Email receipt is not available in test mode
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
                'payment_intent_client_secret' => 'required|string'
            ]);

            Stripe::setApiKey(config('services.stripe.secret'));

            // Retrieve payment intent information from Stripe
            $paymentIntent = PaymentIntent::retrieve(
                $request->input('payment_intent')
            );

            // Check the payment status
            if ($paymentIntent->status === 'succeeded') {
                $data = $request->all();

                // Begin a transaction to ensure all database operations are atomic
                DB::beginTransaction();

                try {
                    // Update the job record with payment details
                    $job = Job::find($data['job_id']);
                    if (!$job) {
                        throw new \Exception('Job not found.');
                    }

                    $job->payment_intent_id = $data['payment_intent'];
                    $job->amount = $paymentIntent->amount;
                    $job->currency = $paymentIntent->currency;
                    $job->payment_status = "succeeded";
                    $job->save();

                    // If everything is successful, commit the transaction
                    DB::commit();
                    return response()->json(['message' => 'Payment recorded successfully!'], 200);
                } catch (\Exception $e) {
                    // If there's any error, rollback the entire transaction
                    DB::rollBack();
                    return response()->json(['message' => 'Recording payment failed. Please try again.'], 500);
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
