<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user');

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required', 
                'email', 
                'max:255', 
                Rule::unique('users')->ignore($userId)
            ],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'password' => [
                $this->isMethod('post') ? 'required' : 'sometimes',
                'nullable',
                'string',
                Password::min(6),
            ],
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->isMethod('patch') || $this->isMethod('put')) {
            if (!$this->filled('password')) {
                $this->request->remove('password');
            }
        }
    }
}
