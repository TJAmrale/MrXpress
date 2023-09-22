<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $primaryKey = 'brand_id';
    
    public function series()
    {
        return $this->hasMany(Series::class, 'brand_id');
    }

    public function devices()
    {
        return $this->hasMany(Device::class, 'brand_id');
    }
}
