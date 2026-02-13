<?php

namespace Database\Factories;

use App\Models\WatchHistory;
use App\Models\User;
use App\Models\Episode;
use Illuminate\Database\Eloquent\Factories\Factory;

class WatchHistoryFactory extends Factory
{
    protected $model = WatchHistory::class;

    public function definition(): array
    {
        $user = User::inRandomOrder()->first() ?? User::factory();
        $episode = Episode::inRandomOrder()->first() ?? Episode::factory();
        
        $isCompleted = fake()->boolean(40);

        return [
            'user_id' => $user->id,
            'episode_id' => $episode->id,
            'progress_seconds' => $isCompleted ? 0 : fake()->numberBetween(10, 1200),
            'completed' => $isCompleted,
            'last_watched_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
