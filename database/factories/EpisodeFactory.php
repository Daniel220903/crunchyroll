<?php

namespace Database\Factories;

use App\Models\Episode;
use App\Models\Season;
use Illuminate\Database\Eloquent\Factories\Factory;

class EpisodeFactory extends Factory
{
    protected $model = Episode::class;

    public function definition(): array
    {
        $season = Season::inRandomOrder()->first() ?? Season::factory();

        return [
            'season_id' => $season->id,
            'episode_number' => fake()->numberBetween(1, 24),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'duration_minutes' => fake()->numberBetween(20, 60),
            'video_url' => 'https://example.com/videos/' . fake()->uuid . '.mp4',
        ];
    }
}
