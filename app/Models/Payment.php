<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'payments';
    protected $primaryKey = 'payment_id';
    protected $fillable = [
        'customer_id',
        'job_id',
        'payment_intent_id',
        'amount',
        'currency',
        'status',
    ];
    protected $dates = ['deleted_at'];

    public function job()
    {
        return $this->belongsTo(Job::class, 'job_id', 'job_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

}
