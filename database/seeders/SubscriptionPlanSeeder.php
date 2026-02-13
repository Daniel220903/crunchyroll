<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SubscriptionPlan;

class SubscriptionPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            ['name' => 'Standard', 'price' => 100, 'duration_in_days' => 30],
            ['name' => 'Premium', 'price' => 200, 'duration_in_days' => 90],
            ['name' => 'Gold', 'price' => 300, 'duration_in_days' => 365],
        ];

        foreach ($plans as $plan) {
            SubscriptionPlan::create($plan);
        }
    }
}
