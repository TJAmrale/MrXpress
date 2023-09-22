<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    protected $primaryKey = 'part_id';

    public function stocks()
    {
        return $this->hasMany(Stock::class, 'part_id');
    }
}
