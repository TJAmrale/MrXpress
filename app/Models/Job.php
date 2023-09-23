<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $primaryKey = 'job_id'; 

    protected $fillable = [
        'customer_id',
        'technician_id',
        'stock_id',
        'job_status',
        'start_date_time',
        'update_date_time',
        'end_date_time',
        'total_cost',
        'technician_fee',
        'admin_fee',
        'parts_used'
    ];

    // Define the relationships to other models

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function technician()
    {
        return $this->belongsTo(Technician::class, 'technician_id');
    }

    public function stock()
    {
        return $this->belongsTo(Stock::class, 'stock_id');
    }
}
