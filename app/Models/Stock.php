<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Stock extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     * 
     * 
     */

     protected $table = 'stock';

    protected $primaryKey = 'stock_id';
    protected $fillable = [
        'stock_id',
        'device_id',
        'part_id',
        'buy_price',
        'wholesale_price',
        'quantity'
    ];

  

}
