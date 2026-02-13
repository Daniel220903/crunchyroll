<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class VoiceActor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'country',
    ];

    public function episodes()
    {
        return $this->belongsToMany(Episode::class, 'episode_voice_actors')
            ->withPivot('character_name', 'deleted_at')
            ->withTimestamps();
    }
}
