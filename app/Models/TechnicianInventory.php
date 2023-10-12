<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TechnicianInventory extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'inventory_id';
    protected $fillable = ['technician_id', 'stock_id', 'inventory'];
    protected $dates = ['deleted_at'];

    public function technician()
    {
        return $this->belongsTo(Technician::class, 'technician_id', 'technician_id');
    }

    public function stock()
    {
        return $this->belongsTo(Stock::class, 'stock_id', 'stock_id');
    }
}
