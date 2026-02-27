<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use App\Models\User;
use App\Models\Product;

class ProductFactory extends Factory
{
    protected $model = Product::class;
    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? 1,
            'category_id' => Category::inRandomOrder()->first()->id,
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 100, 5000),
            'image' => 'https://picsum.photos/400/400?random=' . rand(1, 1000),
            'is_approved' => true,
        ];
    }
}
