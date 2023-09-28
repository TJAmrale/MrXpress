<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $primaryKey = 'job_id';
    protected $fillable = ['customer_id', 'technician_id', 'device_id', 'description', 'status', 'date', 'start_time', 'end_time', 'price', 'notes', 'location'];
    protected $dates = ['deleted_at'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function technician()
    {
        return $this->belongsTo(Technician::class, 'technician_id', 'technician_id');
    }

    public function device()
    {
        return $this->belongsTo(Device::class, 'device_id', 'device_id');
    }

    public function stocksUsed()
    {
        return $this->hasMany(JobStock::class, 'job_id', 'job_id');
    }
}
