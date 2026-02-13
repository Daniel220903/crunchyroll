<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GenreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $genreId = $this->route('genre');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('genres')->ignore($genreId)
            ],
        ];
    }
}
