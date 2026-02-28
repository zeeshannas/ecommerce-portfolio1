<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'total_amount',
        'payment_status',
        'stripe_payment_id'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
