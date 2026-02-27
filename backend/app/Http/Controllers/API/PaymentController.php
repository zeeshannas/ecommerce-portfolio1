<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Order;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1'
        ]);

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $paymentIntent = PaymentIntent::create([
            'amount' => $request->amount * 100,
            'currency' => 'usd',
            'automatic_payment_methods' => ['enabled' => true],
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret
        ]);
    }

    public function confirmPayment(Request $request)
    {
        $request->validate([
            'paymentIntentId' => 'required|string'
        ]);

        $order = Order::where('user_id', $request->user()->id)
            ->where('payment_status', 'pending')
            ->latest()
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $pi = PaymentIntent::retrieve($request->input('paymentIntentId'));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unable to retrieve PaymentIntent', 'error' => $e->getMessage()], 400);
        }

        $status = data_get($pi, 'payment_status');

        if ($status === 'succeeded') {
            $order->update([
                'payment_status' => 'paid',
                'payment_intent_id' => $pi->id
            ]);

            return response()->json(['message' => 'Payment confirmed', 'status' => $status]);
        }

        // Not succeeded: store intent id and leave order pending
        $order->update([
            'payment_intent_id' => $pi->id,
            'payment_status' => 'pending'
        ]);

        return response()->json(['message' => 'Payment not completed', 'status' => $status], 200);
    }
}