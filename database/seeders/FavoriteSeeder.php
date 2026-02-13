<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Series;
use App\Models\Favorite;

class FavoriteSeeder extends Seeder
{
    public function run(): void
    {
        $series = Series::all();

        if ($series->isEmpty()) {
            return;
        }

        User::all()->each(function ($user) use ($series) {
            $count = min(3, $series->count());
            
            foreach ($series->random($count) as $s) {
                Favorite::firstOrCreate([
                    'user_id' => $user->id,
                    'series_id' => $s->id,
                ]);
            }
        });
    }
}
