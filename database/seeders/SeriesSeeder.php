<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Series;
use App\Models\Season;
use App\Models\Episode;
use App\Models\Genre;
use App\Models\VoiceActor;

class SeriesSeeder extends Seeder
{
    public function run(): void
    {
        $genres = Genre::all();
        $voiceActors = VoiceActor::all();

        if ($genres->isEmpty() || $voiceActors->isEmpty()) {
            return;
        }

        Series::factory(15)->create()->each(function ($series) use ($genres, $voiceActors) {
            $series->genres()->attach(
                $genres->random(rand(1, 3))->pluck('id')->toArray()
            );

            for ($s = 1; $s <= 2; $s++) {
                $season = Season::create([
                    'series_id' => $series->id,
                    'season_number' => $s,
                    'title' => "Season $s",
                    'release_year' => rand(2015, date('Y')),
                ]);

                for ($e = 1; $e <= 5; $e++) {
                    $episode = Episode::create([
                        'season_id' => $season->id,
                        'episode_number' => $e,
                        'title' => "Episode $e",
                        'description' => fake()->paragraph(),
                        'duration_minutes' => rand(20, 60),
                        'video_url' => 'https://example.com/video/' . fake()->uuid(),
                    ]);

                    $episode->voiceActors()->attach(
                        $voiceActors->random(rand(1, 3))->pluck('id')->toArray(),
                        ['character_name' => fake()->name()]
                    );
                }
            }
        });
    }
}
