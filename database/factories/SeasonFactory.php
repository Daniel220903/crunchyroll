<?php

namespace Database\Factories;

use App\Models\Season;
use App\Models\Series;
use Illuminate\Database\Eloquent\Factories\Factory;

class SeasonFactory extends Factory
{
    protected $model = Season::class;

    public function definition(): array
    {
        $series = Series::inRandomOrder()->first() ?? Series::factory();
        $number = fake()->numberBetween(1, 10);

        return [
            'series_id' => $series->id,
            'season_number' => $number,
            'title' => 'Season ' . $number,
            'release_year' => fake()->numberBetween(2000, 2026),
        ];
    }
}
