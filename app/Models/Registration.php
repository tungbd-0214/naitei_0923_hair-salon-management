<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Registration extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function salon(): HasOne
    {
        return $this->hasOne(Salon::class, 'email', 'owner_email');
    }
    public function package(): HasOne
    {
        return $this->hasOne(Package::class, 'id', 'package_id');
    }
}
