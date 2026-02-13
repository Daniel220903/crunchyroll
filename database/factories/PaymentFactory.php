<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Subscription;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        $subscription = Subscription::inRandomOrder()->first() ?? Subscription::factory();
        $status = fake()->randomElement(['pending', 'succeeded', 'failed']);

        return [
            'user_id' => $subscription->user_id,
            'subscription_id' => $subscription->id,
            'amount' => fake()->randomElement([100, 200, 300]),
            'payment_method' => fake()->randomElement(['card', 'paypal', 'stripe']),
            'payment_status' => $status,
            'paid_at' => $status === 'succeeded' ? fake()->dateTimeBetween('-180 days', 'now') : null,
        ];
    }
}
