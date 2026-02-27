<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // Electronics (10)
            // Electronics (10)
            ['user_id' => 1, 'category_id' => 1, 'name' => 'Wireless Bluetooth Headphones', 'description' => 'Comfortable over-ear headphones for daily music and calls.', 'price' => 49.99, 'image' => 'https://picsum.photos/seed/headphones1/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 1, 'name' => 'Smart LED TV 42 inch', 'description' => 'High-definition smart TV with streaming apps support.', 'price' => 399.99, 'image' => 'https://picsum.photos/seed/smarttv2/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 1, 'name' => 'Portable Power Bank 10000mAh', 'description' => 'Compact power bank for charging devices on the go.', 'price' => 25.50, 'image' => 'https://picsum.photos/seed/powerbank3/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 1, 'name' => 'Smartphone 128GB', 'description' => 'Latest model smartphone with high-speed performance.', 'price' => 599.99, 'image' => 'https://picsum.photos/seed/smartphone4/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 1, 'name' => 'Laptop 15 inch', 'description' => 'Powerful laptop for work and entertainment.', 'price' => 899.99, 'image' => 'https://picsum.photos/seed/laptop5/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 1, 'name' => 'Wireless Mouse', 'description' => 'Ergonomic wireless mouse for smooth control.', 'price' => 19.99, 'image' => 'https://picsum.photos/seed/mouse6/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 1, 'name' => 'Mechanical Keyboard', 'description' => 'RGB backlit mechanical keyboard for gaming and work.', 'price' => 79.99, 'image' => 'https://picsum.photos/seed/keyboard7/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 1, 'name' => 'Noise Cancelling Earbuds', 'description' => 'Compact earbuds with high-quality sound.', 'price' => 59.99, 'image' => 'https://picsum.photos/seed/earbuds8/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 1, 'name' => 'Smartwatch Series 7', 'description' => 'Monitor fitness and notifications on the go.', 'price' => 249.99, 'image' => 'https://picsum.photos/seed/smartwatch9/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 1, 'name' => 'HD Projector', 'description' => 'Portable projector for movies and presentations.', 'price' => 179.99, 'image' => 'https://picsum.photos/seed/projector10/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],

            // Clothing (10)
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Men Casual Cotton T-Shirt', 'description' => 'Soft cotton t-shirt perfect for everyday wear.', 'price' => 15.99, 'image' => 'https://picsum.photos/seed/tshirt1/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Women Summer Dress', 'description' => 'Lightweight and stylish summer dress for casual outings.', 'price' => 29.99, 'image' => 'https://picsum.photos/seed/dress2/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Men Slim Fit Jeans', 'description' => 'Comfortable and trendy slim fit jeans.', 'price' => 39.99, 'image' => 'https://picsum.photos/seed/jeans3/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Women Hoodie Sweatshirt', 'description' => 'Cozy hoodie for chilly days.', 'price' => 34.99, 'image' => 'https://picsum.photos/seed/hoodie4/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Men Leather Jacket', 'description' => 'Stylish jacket for casual and formal occasions.', 'price' => 89.99, 'image' => 'https://picsum.photos/seed/jacket5/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Women Skinny Jeans', 'description' => 'Comfortable and trendy skinny jeans.', 'price' => 44.99, 'image' => 'https://picsum.photos/seed/skinny6/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Men Polo Shirt', 'description' => 'Classic polo shirt for daily wear.', 'price' => 25.99, 'image' => 'https://picsum.photos/seed/polo7/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Women Summer Skirt', 'description' => 'Flowy skirt perfect for summer outings.', 'price' => 19.99, 'image' => 'https://picsum.photos/seed/skirt8/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Unisex Socks Pack', 'description' => 'Comfortable cotton socks for everyday use.', 'price' => 9.99, 'image' => 'https://picsum.photos/seed/socks9/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 2, 'name' => 'Men Running Shorts', 'description' => 'Lightweight shorts for daily workouts.', 'price' => 21.99, 'image' => 'https://picsum.photos/seed/shorts10/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],

            // Home & Kitchen (10)
            ['user_id' => 1, 'category_id' => 3, 'name' => 'Stainless Steel Cooking Set', 'description' => 'Durable cookware set for daily kitchen use.', 'price' => 79.99, 'image' => 'https://picsum.photos/seed/cookware1/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 3, 'name' => 'LED Desk Lamp', 'description' => 'Adjustable desk lamp with modern design.', 'price' => 19.99, 'image' => 'https://picsum.photos/seed/desklamp2/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 3, 'name' => 'Cotton Bed Sheet Set', 'description' => 'Soft and comfortable bed sheets for 2-person bed.', 'price' => 49.99, 'image' => 'https://picsum.photos/seed/bedsheet3/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 3, 'name' => 'Non-stick Frying Pan', 'description' => 'Easy-to-clean frying pan for everyday cooking.', 'price' => 29.99, 'image' => 'https://picsum.photos/seed/fryingpan4/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 3, 'name' => 'Vacuum Cleaner', 'description' => 'Powerful vacuum cleaner for home cleaning.', 'price' => 129.99, 'image' => 'https://picsum.photos/seed/vacuum5/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 3, 'name' => 'Ceramic Coffee Mug Set', 'description' => 'Set of 4 mugs for daily coffee or tea.', 'price' => 24.99, 'image' => 'https://picsum.photos/seed/mug6/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 3, 'name' => 'Wall Clock Modern', 'description' => 'Stylish wall clock for living room or bedroom.', 'price' => 19.99, 'image' => 'https://picsum.photos/seed/clock7/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 3, 'name' => 'Microwave Oven 20L', 'description' => 'Compact microwave oven for quick meals.', 'price' => 99.99, 'image' => 'https://picsum.photos/seed/microwave8/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 3, 'name' => 'Kitchen Knife Set', 'description' => 'Sharp and durable knives for daily use.', 'price' => 39.99, 'image' => 'https://picsum.photos/seed/knife9/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 3, 'name' => 'Plastic Storage Containers', 'description' => 'Set of containers to keep your food fresh.', 'price' => 19.99, 'image' => 'https://picsum.photos/seed/container10/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],

            // Books (10)
            ['user_id' => 1, 'category_id' => 4, 'name' => 'The Power of Habit', 'description' => 'Bestselling book on personal habits and productivity.', 'price' => 12.99, 'image' => 'https://picsum.photos/seed/book1/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 4, 'name' => 'Cookbook for Beginners', 'description' => 'Easy recipes for everyday cooking.', 'price' => 18.50, 'image' => 'https://picsum.photos/seed/book2/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 4, 'name' => 'Science Fiction Novel', 'description' => 'Engaging sci-fi story for all age groups.', 'price' => 14.99, 'image' => 'https://picsum.photos/seed/book3/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 4, 'name' => 'Mystery Thriller Book', 'description' => 'Exciting mystery novel full of suspense.', 'price' => 16.99, 'image' => 'https://picsum.photos/seed/book4/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 4, 'name' => 'Personal Finance Guide', 'description' => 'Learn to manage money wisely and save more.', 'price' => 13.99, 'image' => 'https://picsum.photos/seed/book5/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 4, 'name' => 'Children Story Book Set', 'description' => 'Fun and educational stories for kids.', 'price' => 25.99, 'image' => 'https://picsum.photos/seed/book6/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 4, 'name' => 'Historical Fiction Novel', 'description' => 'Immerse yourself in historical adventures.', 'price' => 15.99, 'image' => 'https://picsum.photos/seed/book7/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 4, 'name' => 'Self-Help Motivation Book', 'description' => 'Tips and guidance to improve your life.', 'price' => 11.99, 'image' => 'https://picsum.photos/seed/book8/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 4, 'name' => 'Travel Guide Europe', 'description' => 'Complete guide for traveling in Europe.', 'price' => 19.99, 'image' => 'https://picsum.photos/seed/book9/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 4, 'name' => 'Photography Basics Book', 'description' => 'Learn photography techniques and tips.', 'price' => 17.99, 'image' => 'https://picsum.photos/seed/book10/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],

            // Sports (10)
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Yoga Mat', 'description' => 'Non-slip mat for daily yoga and exercises.', 'price' => 25.00, 'image' => 'https://picsum.photos/seed/sports1/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Dumbbell Set 10kg', 'description' => 'Adjustable dumbbells for home workouts.', 'price' => 59.99, 'image' => 'https://picsum.photos/seed/sports2/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Running Shoes Men', 'description' => 'Lightweight running shoes for daily jogging.', 'price' => 49.99, 'image' => 'https://picsum.photos/seed/sports3/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Tennis Racket', 'description' => 'Professional tennis racket for all levels.', 'price' => 79.99, 'image' => 'https://picsum.photos/seed/sports4/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Football Official Size', 'description' => 'Durable football for training and matches.', 'price' => 29.99, 'image' => 'https://picsum.photos/seed/sports5/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Gym Resistance Bands', 'description' => 'Set of bands for strength and flexibility exercises.', 'price' => 19.99, 'image' => 'https://picsum.photos/seed/sports6/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Basketball Official', 'description' => 'High-quality basketball for indoor and outdoor use.', 'price' => 34.99, 'image' => 'https://picsum.photos/seed/sports7/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Skipping Rope Adjustable', 'description' => 'Durable rope for cardio workouts.', 'price' => 12.99, 'image' => 'https://picsum.photos/seed/sports8/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Cycling Helmet', 'description' => 'Safety helmet for cycling enthusiasts.', 'price' => 45.99, 'image' => 'https://picsum.photos/seed/sports9/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['user_id' => 1, 'category_id' => 5, 'name' => 'Exercise Ball 65cm', 'description' => 'Fitness ball for core and balance exercises.', 'price' => 29.99, 'image' => 'https://picsum.photos/seed/sports10/400/300', 'is_approved' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
