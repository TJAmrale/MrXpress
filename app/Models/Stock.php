<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    // Define Primary Key
    protected $primaryKey = 'stock_id';
    
    // Explicitly define the table name
    protected $table = 'stock';
    
    public function device()
    {
        return $this->belongsTo(Device::class, 'device_id');
    }

    public function part()
    {
        return $this->belongsTo(Part::class, 'part_id');
    }
}
