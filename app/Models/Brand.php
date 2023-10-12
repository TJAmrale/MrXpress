<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'brand_id';
    protected $fillable = ['brand_name'];
    protected $dates = ['deleted_at'];

    public function devices()
    {
        return $this->hasMany(Device::class, 'brand_id');
    }
    public function items()
    {
        return $this->hasMany(Item::class, 'brand_id');
    }

}
