<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    public function run(): void
    {
        $genres = [
            ['name' => 'Action'],
            ['name' => 'Drama'],
            ['name' => 'Comedy'],
            ['name' => 'Sci-Fi'],
            ['name' => 'Fantasy'],
            ['name' => 'Horror'],
            ['name' => 'Romance'],
            ['name' => 'Psychological'],
            ['name' => 'Isekai'],
        ];

        foreach ($genres as $genre) {
            Genre::firstOrCreate($genre);
        }
    }
}
