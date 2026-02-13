<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use App\Models\Season;
use App\Models\VoiceActor;
use App\Http\Requests\EpisodeRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class EpisodeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Episodes/Index', [
            'episodes' => Episode::with('season.series')->latest()->paginate(20)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Episodes/Create', [
            'seasons' => Season::with('series')->get()->map(function ($season) {
                return [
                    'id' => $season->id,
                    'label' => "{$season->series->title} - Temp {$season->season_number}"
                ];
            }),
            'voiceActors' => VoiceActor::all(['id', 'name'])
        ]);
    }

    public function store(EpisodeRequest $request): RedirectResponse
    {
        $episode = Episode::create($request->validated());

        if ($request->has('voice_actor_ids')) {
            $syncData = [];
            foreach ($request->voice_actor_ids as $index => $id) {
                $syncData[$id] = ['character_name' => $request->character_names[$index] ?? null];
            }
            $episode->voiceActors()->sync($syncData);
        }

        return redirect()->route('episodes.index')->with('message', 'Episodio creado correctamente.');
    }

    public function show(Episode $episode): Response
    {
        return Inertia::render('Episodes/Show', [
            'episode' => $episode->load(['season.series', 'voiceActors'])
        ]);
    }

    public function edit(Episode $episode): Response
    {
        return Inertia::render('Episodes/Edit', [
            'episode' => $episode->load('voiceActors'),
            'seasons' => Season::with('series')->get()->map(function ($season) {
                return [
                    'id' => $season->id,
                    'label' => "{$season->series->title} - Temp {$season->season_number}"
                ];
            }),
            'voiceActors' => VoiceActor::all(['id', 'name'])
        ]);
    }

    public function update(EpisodeRequest $request, Episode $episode): RedirectResponse
    {
        $episode->update($request->validated());

        if ($request->has('voice_actor_ids')) {
            $syncData = [];
            foreach ($request->voice_actor_ids as $index => $id) {
                $syncData[$id] = ['character_name' => $request->character_names[$index] ?? null];
            }
            $episode->voiceActors()->sync($syncData);
        }

        return redirect()->route('episodes.show', $episode)->with('message', 'Episodio actualizado.');
    }

    public function destroy(Episode $episode): RedirectResponse
    {
        $episode->delete();
        return redirect()->route('episodes.index')->with('message', 'Episodio eliminado.');
    }
}
