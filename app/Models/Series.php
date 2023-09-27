<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Series extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'series_id';
    protected $fillable = ['series_name'];
    protected $dates = ['deleted_at'];

    public function devices()
    {
        return $this->hasMany(Device::class, 'series_id', 'series_id');
    }
}
