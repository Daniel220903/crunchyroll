<?php

namespace Database\Factories;

use App\Models\VoiceActor;
use Illuminate\Database\Eloquent\Factories\Factory;

class VoiceActorFactory extends Factory
{
    protected $model = VoiceActor::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'country' => fake()->randomElement(['Japan', 'Mexico', 'USA', 'Spain', 'Argentina', 'Colombia']),
        ];
    }
}
