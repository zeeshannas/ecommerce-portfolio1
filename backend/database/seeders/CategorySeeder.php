<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Electronics', 'slug' => 'electronics'],
            ['name' => 'Fashion', 'slug' => 'fashion'],
            ['name' => 'Home & Kitchen', 'slug' => 'home-kitchen'],
            ['name' => 'Sports', 'slug' => 'sports'],
            ['name' => 'Books', 'slug' => 'books'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
