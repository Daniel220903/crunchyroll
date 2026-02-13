<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\User;
use App\Models\Series;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first() ?? User::factory(),
            'series_id' => Series::inRandomOrder()->first() ?? Series::factory(),
            'rating' => fake()->numberBetween(1, 5),
            'comment' => fake()->optional(0.8)->paragraph(),
        ];
    }
}
