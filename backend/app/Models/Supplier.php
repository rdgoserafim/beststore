<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Supplier extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'endpoint',
        'composition',
    ];

    protected $casts = [
        'composition' => 'array',
    ];

    public function composition(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value, true),
            set: fn ($value) => json_encode($value),
        );
    }
}
