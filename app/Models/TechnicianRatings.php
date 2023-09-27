<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TechnicianRatings extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'rating_id';
    protected $fillable = ['job_id', 'customer_id', 'technician_id', 'rating', 'comments'];
    protected $dates = ['deleted_at'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function technician()
    {
        return $this->belongsTo(Technician::class, 'technician_id', 'technician_id');
    }

    public function job()
    {
        return $this->belongsTo(Job::class, 'job_id', 'job_id');
    }
}
