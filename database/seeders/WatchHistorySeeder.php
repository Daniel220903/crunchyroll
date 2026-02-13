<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Episode;
use App\Models\WatchHistory;

class WatchHistorySeeder extends Seeder
{
    public function run(): void
    {
        $episodes = Episode::all();

        if ($episodes->isEmpty()) {
            return;
        }

        User::all()->each(function ($user) use ($episodes) {
            foreach ($episodes->random(min(5, $episodes->count())) as $episode) {
                $isCompleted = fake()->boolean(40);

                WatchHistory::create([
                    'user_id' => $user->id,
                    'episode_id' => $episode->id,
                    'progress_seconds' => $isCompleted ? 0 : rand(60, 1200),
                    'completed' => $isCompleted,
                    'last_watched_at' => now()->subDays(rand(0, 10)),
                ]);
            }
        });
    }
}
