<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WatchHistoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'episode_id' => ['required', 'exists:episodes,id'],
            'progress_seconds' => ['required', 'integer', 'min:0'],
            'completed' => ['required', 'boolean'],
            'last_watched_at' => ['nullable', 'date'],
        ];
    }
}
