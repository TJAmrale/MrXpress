<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $table = "items";
    protected $primaryKey = 'item_id';
    protected $fillable = ['item_type', 'item_name', 'description'];
    protected $dates = ['deleted_at'];

    public function stocks()
    {
        return $this->hasMany(Stock::class, 'item_id');
    }


}
