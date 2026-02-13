<?php

namespace Database\Factories;

use App\Models\Series;
use Illuminate\Database\Eloquent\Factories\Factory;

class SeriesFactory extends Factory
{
    protected $model = Series::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraphs(3, true),
            'cover_image' => 'https://picsum.photos/seed/' . fake()->uuid . '/600/800',
            'release_year' => fake()->year(),
            'status' => fake()->randomElement(['draft', 'published', 'scheduled', 'ongoing', 'archived']),
        ];
    }
}
