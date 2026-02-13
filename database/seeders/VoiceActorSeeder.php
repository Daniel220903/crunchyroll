<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VoiceActor;

class VoiceActorSeeder extends Seeder
{
    public function run(): void
    {
        VoiceActor::factory(15)->create();
    }
}
