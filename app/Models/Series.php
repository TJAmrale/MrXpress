<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    use HasFactory;

    protected $primaryKey = 'series_id';
    protected $fillable = ['series_name'];

    
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function devices()
    {
        return $this->hasMany(Device::class, 'series_id');
    }
}
