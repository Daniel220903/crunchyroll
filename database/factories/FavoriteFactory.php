<?php

namespace Database\Factories;

use App\Models\Favorite;
use App\Models\User;
use App\Models\Series;
use Illuminate\Database\Eloquent\Factories\Factory;

class FavoriteFactory extends Factory
{
    protected $model = Favorite::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first() ?? User::factory(),
            'series_id' => Series::inRandomOrder()->first() ?? Series::factory(),
        ];
    }
}
