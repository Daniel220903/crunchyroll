<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => fake()->boolean(80) ? now() : null,
            'password' => Hash::make('password'),
            'avatar' => fake()->boolean(70) 
                ? 'https://i.pravatar.cc/200?u=' . fake()->unique()->uuid() 
                : 'default.png',
            'remember_token' => Str::random(10),
        ];
    }
}
