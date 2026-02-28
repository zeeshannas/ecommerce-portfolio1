<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request) {
        $orders = Order::where('user_id', $request->user()->id)->with('items.product')->latest()->get();
        return response()->json($orders);
    }

}
