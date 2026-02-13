<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EpisodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'season_id' => ['required', 'exists:seasons,id'],
            'episode_number' => ['required', 'integer', 'min:1'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['nullable', 'integer', 'min:0'],
            'video_url' => ['nullable', 'url', 'max:2048'],
            'voice_actor_ids' => ['nullable', 'array'],
            'voice_actor_ids.*' => ['exists:voice_actors,id'],
            'character_names' => ['nullable', 'array'],
            'character_names.*' => ['nullable', 'string', 'max:255'],
        ];
    }
}
