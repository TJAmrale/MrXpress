<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Technician extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'technician_id';
    protected $fillable = ['technician_id', 'profile_image'];
    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'technician_id', 'user_id');
    }

    public function inventoryItems()
    {
        return $this->hasMany(TechnicianInventory::class, 'technician_id', 'technician_id');
    }

    public function jobs()
    {
        return $this->hasMany(Job::class, 'technician_id', 'technician_id');
    }

    public function ratingsReceived()
    {
        return $this->hasMany(TechnicianRating::class, 'technician_id', 'technician_id');
    }

    public function ratingsGiven()
    {
        return $this->hasMany(CustomerRating::class, 'technician_id', 'technician_id');
    }
}
