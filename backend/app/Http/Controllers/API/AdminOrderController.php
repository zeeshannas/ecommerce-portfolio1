<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')
            ->where('status', 'paid')
            ->latest()
            ->paginate(10);

        return response()->json($orders);
    }
}