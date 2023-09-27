<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Device extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $primaryKey = 'device_id';
    protected $fillable = ['brand_id', 'series_id', 'model', 'colours'];
    protected $dates = ['deleted_at'];

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'brand_id');
    }

    public function series()
    {
        return $this->belongsTo(Series::class, 'series_id', 'series_id');
    }
}
