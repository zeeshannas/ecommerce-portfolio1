<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Product extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'description',
        'price',
        'image',
        'is_approved'
    ];

    public function vendor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
