<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Cart::firstOrCreate([
            'user_id' => $request->user()->id
        ]);

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            $item->increment('quantity', $request->quantity);
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }

        return response()->json(['message' => 'Added to cart']);
    }

    public function viewCart(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)
            ->with('items.product')
            ->first();

        return response()->json($cart ?: ['items' => []]);
    }

    public function removeItem($id, Request $request)
    {
        $item = CartItem::findOrFail($id);

        if ($item->cart->user_id !== $request->user()->id) {
            abort(403);
        }

        $item->delete();
        return response()->json(['message' => 'Item removed']);
    }

    public function checkout(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)
            ->with('items.product')
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $total = 0;

        foreach ($cart->items as $item) {
            $total += $item->product->price * $item->quantity;
        }

        $order = Order::create([
            'user_id' => $request->user()->id,
            'total_amount' => $total
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price
            ]);
        }

        $cart->items()->delete();

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order
        ]);
    }
}
