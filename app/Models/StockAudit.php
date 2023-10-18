<?php
namespace App\models;

use Illuminate\Database\Eloquent\Model;

class StockAudit extends Model
{
    protected $primaryKey = 'stock_audit_id';
    protected $table = 'stock_audit';
    protected $fillable = [
        'stock_id', 'user_id', 'changes'
    ];

    public function stock()
    {
        return $this->belongsTo(Stock::class, 'stock_id', 'stock_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}