<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'customer_id';
    protected $fillable = ['customer_id'];
    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function technicianFormRequests()
    {
        return $this->hasMany(TechnicianForm::class, 'customer_id');
    }

    public function jobs()
    {
        return $this->hasMany(Job::class, 'customer_id');
    }

    public function technicianRatings()
    {
        return $this->hasMany(TechnicianRating::class, 'customer_id');
    }

    public function customerRatings()
    {
        return $this->hasMany(CustomerRating::class, 'customer_id');
    }
}
