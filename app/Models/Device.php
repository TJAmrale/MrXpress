<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $primaryKey = 'device_id';
    
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function series()
    {
        return $this->belongsTo(Series::class, 'series_id');
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class, 'device_id');
    }
}
