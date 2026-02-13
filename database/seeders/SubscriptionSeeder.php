<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Subscription;
use App\Models\SubscriptionPlan;

class SubscriptionSeeder extends Seeder
{
    public function run(): void
    {
        $plans = SubscriptionPlan::all();

        if ($plans->isEmpty()) {
            return;
        }

        User::all()->each(function ($user) use ($plans) {
            $plan = $plans->random();
            $startDate = now()->subDays(rand(1, 180));

            Subscription::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'start_date' => $startDate,
                'end_date' => $startDate->copy()->addDays($plan->duration_in_days),
                'status' => 'active',
            ]);
        });
    }
}
