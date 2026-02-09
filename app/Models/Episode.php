<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Episode extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'season_id',
        'episode_number',
        'title',
        'description',
        'duration_minutes',
        'video_url',
    ];

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    public function voiceActors()
    {
        return $this->belongsToMany(VoiceActor::class, 'episode_voice_actors')
            ->withPivot('character_name', 'deleted_at')
            ->withTimestamps();
    }

    public function watchHistory()
    {
        return $this->hasMany(WatchHistory::class);
    }
}

