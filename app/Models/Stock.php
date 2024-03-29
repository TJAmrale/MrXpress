<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Stock extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'stock';
    protected $primaryKey = 'stock_id';
    protected $fillable = ['device_id', 'item_id', 'buy_price', 'wholesale_price', 'retail_price', 'quantity'];
    protected $dates = ['deleted_at'];

    public function device()
    {
        return $this->belongsTo(Device::class, 'device_id', 'device_id');
    }

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id', 'item_id');
    }
    protected static function boot() {
        parent::boot();
    
        static::updated(function ($stock) {
            try {
                $changes = $stock->getChanges();
                StockAudit::create([
                    'stock_id' => $stock->stock_id,
                    'user_id' => auth()->id(),
                    'changes' => json_encode($changes)
                ]);
            } catch (\Exception $e) {
                \Log::error('Failed to create stock audit log: ' . $e->getMessage());
            }
        });
    } 
    

}
