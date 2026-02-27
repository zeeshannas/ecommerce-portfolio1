<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\AdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\AdminOrderController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'role:vendor'])
    ->post('/product/create', [ProductController::class, 'store']);

Route::middleware(['auth:sanctum', 'role:admin'])
    ->get('/admin/users', [AdminController::class, 'users']);

Route::middleware(['auth:sanctum', 'role:vendor'])
    ->post('/products', [ProductController::class, 'store']);

Route::middleware(['auth:sanctum', 'role:admin'])
    ->put('/products/{id}/approve', [ProductController::class, 'approve']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::middleware(['auth:sanctum', 'role:vendor'])
    ->get('/vendor/products', [ProductController::class, 'myProducts']);

Route::middleware(['auth:sanctum', 'role:admin'])
    ->get('/admin/pending-products', [ProductController::class, 'pendingProducts']);

Route::middleware(['auth:sanctum', 'role:admin'])
    ->post('/categories', [CategoryController::class, 'store']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::get('/cart', [CartController::class, 'viewCart']);
    Route::delete('/cart/item/{id}', [CartController::class, 'removeItem']);
    Route::post('/checkout', [CartController::class, 'checkout']);
});

Route::middleware('auth:sanctum')->post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
Route::middleware('auth:sanctum')->post('/confirm-payment', [PaymentController::class, 'confirmPayment']);
Route::middleware(['auth:sanctum','admin'])->get('/admin/orders', [AdminOrderController::class,'index']);
