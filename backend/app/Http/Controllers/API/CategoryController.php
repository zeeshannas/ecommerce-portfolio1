<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories'
        ]);

        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json($category);
    }

    public function index(Request $request)
    {
        $query = Category::query();

        // Optional: Search category by name
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Optional: Sort alphabetically
        if ($request->sort == 'name_asc') {
            $query->orderBy('name', 'asc');
        } elseif ($request->sort == 'name_desc') {
            $query->orderBy('name', 'desc');
        } else {
            $query->latest();
        }

        $categories = $query->get();

        return response()->json($categories);
    }
}
