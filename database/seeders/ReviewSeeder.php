<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Series;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $series = Series::all();

        if ($series->isEmpty()) {
            return;
        }

        User::all()->each(function ($user) use ($series) {
            $count = min(2, $series->count());

            foreach ($series->random($count) as $s) {
                Review::updateOrCreate(
                    ['user_id' => $user->id, 'series_id' => $s->id],
                    [
                        'rating' => rand(1, 5),
                        'comment' => fake()->boolean(80) ? fake()->paragraph() : null,
                    ]
                );
            }
        });
    }
}
