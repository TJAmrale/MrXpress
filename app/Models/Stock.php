<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class Stock extends Model
{
    use HasFactory, SoftDeletes;
    use HasFactory, SoftDeletes;

    protected $table = 'stock';
    protected $primaryKey = 'stock_id';
    
    protected $fillable = ['device_id', 'item_id', 'buy_price', 'wholesale_price', 'retail_price', 'quantity'];
    protected $dates = ['deleted_at'];

        
public function item()
{
    return $this->belongsTo(Item::class, 'item_id', 'item_id');
}

public function device()
{
    return $this->belongsTo(Device::class, 'device_id', 'device_id');
}
}
