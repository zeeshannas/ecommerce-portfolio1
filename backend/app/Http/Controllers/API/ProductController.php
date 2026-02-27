<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'image' => 'nullable|image'
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product = Product::create([
            'user_id' => $request->user()->id,
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imagePath
        ]);

        return response()->json($product);
    }

    public function approve($id)
    {
        $product = Product::findOrFail($id);
        $product->update(['is_approved' => true]);

        return response()->json(['message' => 'Product approved']);
    }

    public function show($id)
    {
        return Product::where('is_approved', true)
            ->with('category', 'vendor')
            ->findOrFail($id);
    }

    public function index(Request $request)
    {
        $query = Product::where('is_approved', true)
            ->with('category', 'vendor');

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->min_price && $request->max_price) {
            $query->whereBetween('price', [
                $request->min_price,
                $request->max_price
            ]);
        }

        if ($request->sort == 'price_asc') {
            $query->orderBy('price', 'asc');
        } elseif ($request->sort == 'price_desc') {
            $query->orderBy('price', 'desc');
        } else {
            $query->latest();
        }

        $products = $query->paginate(10);

        return response()->json($products);
    }

    public function myProducts(Request $request)
    {
        return Product::WHERE('user_id', $request->user()->id)->with('category')->latest()->get();
    }

    public function pendingProducts()
    {
        return Product::where('is_approved', false)->with('vendor', 'category')->latest()->get();
    }
}
