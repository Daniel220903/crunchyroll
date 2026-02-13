<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subscription;
use App\Models\Payment;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        Subscription::with('plan')->get()->each(function ($subscription) {
            Payment::create([
                'user_id' => $subscription->user_id,
                'subscription_id' => $subscription->id,
                'amount' => $subscription->plan->price,
                'payment_method' => fake()->randomElement(['card', 'paypal', 'stripe']),
                'payment_status' => 'succeeded',
                'paid_at' => $subscription->start_date,
            ]);
        });
    }
}
