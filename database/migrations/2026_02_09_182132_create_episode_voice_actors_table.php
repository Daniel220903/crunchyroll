<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('episode_voice_actors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('episode_id')->constrained('episodes')->cascadeOnDelete();
            $table->foreignId('voice_actor_id')->constrained('voice_actors')->cascadeOnDelete();
            $table->string('character_name')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['episode_id', 'voice_actor_id', 'character_name'], 'eva_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episode_voice_actors');
    }
};
