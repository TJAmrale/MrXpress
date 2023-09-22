<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $primaryKey = 'stock_id';
    
    public function device()
    {
        return $this->belongsTo(Device::class, 'device_id');
    }

    public function part()
    {
        return $this->belongsTo(Part::class, 'part_id');
    }
}
