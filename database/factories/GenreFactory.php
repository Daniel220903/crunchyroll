<?php

namespace Database\Factories;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

class GenreFactory extends Factory
{
    protected $model = Genre::class;

    public function definition(): array
    {
        $genres = [
            'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
            'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Slice of Life',
            'Isekai', 'Shonen', 'Shojo', 'Mecha', 'Psychological'
        ];

        return [
            'name' => fake()->unique()->randomElement($genres),
        ];
    }
}
