<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'subscription_id' => ['required', 'exists:subscriptions,id'],
            'amount' => ['required', 'numeric', 'min:0'],
            'payment_method' => ['nullable', 'string', 'max:100'],
            'payment_status' => [
                'nullable', 
                'string', 
                Rule::in(['pending', 'succeeded', 'failed', 'refunded'])
            ],
            'paid_at' => ['nullable', 'date'],
        ];
    }
}
