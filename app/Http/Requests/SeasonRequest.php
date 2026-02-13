<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SeasonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'series_id' => ['required', 'exists:series,id'],
            'season_number' => ['required', 'integer', 'min:1'],
            'title' => ['nullable', 'string', 'max:255'],
            'release_year' => ['nullable', 'integer', 'min:1900', 'max:' . date('Y')],
        ];
    }
}
