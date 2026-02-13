<?php

namespace App\Http\Controllers;

use App\Models\VoiceActor;
use App\Http\Requests\VoiceActorRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class VoiceActorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('VoiceActors/Index', [
            'actors' => VoiceActor::latest()->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('VoiceActors/Create');
    }

    public function store(VoiceActorRequest $request): RedirectResponse
    {
        VoiceActor::create($request->validated());
        return redirect()->route('voice-actors.index')->with('message', 'Actor de voz creado.');
    }

    public function show(VoiceActor $voiceActor): Response
    {
        return Inertia::render('VoiceActors/Show', [
            'actor' => $voiceActor->load('episodes.season.series')
        ]);
    }

    public function edit(VoiceActor $voiceActor): Response
    {
        return Inertia::render('VoiceActors/Edit', [
            'actor' => $voiceActor
        ]);
    }

    public function update(VoiceActorRequest $request, VoiceActor $voiceActor): RedirectResponse
    {
        $voiceActor->update($request->validated());
        return redirect()->route('voice-actors.index')->with('message', 'Actor actualizado.');
    }

    public function destroy(VoiceActor $voiceActor): RedirectResponse
    {
        $voiceActor->delete();
        return redirect()->route('voice-actors.index')->with('message', 'Actor eliminado.');
    }
}
