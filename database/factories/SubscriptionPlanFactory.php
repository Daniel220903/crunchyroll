<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionPlanFactory extends Factory
{
    public function definition(): array
    {
        $plans = [
            ['name' => 'Standard', 'price' => 100],
            ['name' => 'Premium', 'price' => 200],
            ['name' => 'Gold', 'price' => 300],
        ];

        $selectedPlan = fake()->randomElement($plans);

        return [
            'name' => $selectedPlan['name'],
            'price' => $selectedPlan['price'],
            'duration_in_days' => fake()->randomElement([30, 90, 180, 364]),
        ];
    }
}
