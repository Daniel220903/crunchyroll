<?php

namespace Database\Factories;

use App\Models\Subscription;
use App\Models\User;
use App\Models\SubscriptionPlan;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class SubscriptionFactory extends Factory
{
    protected $model = Subscription::class;

    public function definition(): array
    {
        $start = Carbon::parse(fake()->dateTimeBetween('-90 days', 'now'));
        
        $planDuration = fake()->randomElement([7, 30, 90, 365]);
        
        $end = $start->copy()->addDays($planDuration);

        return [
            'user_id' => User::factory(),
            'plan_id' => SubscriptionPlan::factory(),
            'start_date' => $start->format('Y-m-d'),
            'end_date' => $end->format('Y-m-d'),
            'status' => fake()->randomElement(['active', 'cancelled', 'expired']),
        ];
    }
}
