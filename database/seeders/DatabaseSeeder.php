<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            SubscriptionPlanSeeder::class,
            SubscriptionSeeder::class,
            PaymentSeeder::class,
            GenreSeeder::class,
            VoiceActorSeeder::class,
            SeriesSeeder::class,
            WatchHistorySeeder::class,
            FavoriteSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
