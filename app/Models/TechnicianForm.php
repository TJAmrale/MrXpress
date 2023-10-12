<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TechnicianForm extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'request_id';
    protected $fillable = ['resume_cv', 'profile_image', 'technician_status'];
    protected $dates = ['deleted_at'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
