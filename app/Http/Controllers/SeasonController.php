<?php

namespace App\Http\Controllers;

use App\Models\Season;
use App\Models\Series;
use App\Http\Requests\SeasonRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SeasonController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Seasons/Index', [
            'seasons' => Season::with('series')->latest()->paginate(10)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Seasons/Create', [
            'series' => Series::all(['id', 'title'])
        ]);
    }

    public function show(Season $season): Response
    {
        return Inertia::render('Seasons/Show', [
            'season' => $season->load(['series', 'episodes'])
        ]);
    }

    public function store(SeasonRequest $request): RedirectResponse
    {
        Season::create($request->validated());

        return redirect()
            ->route('seasons.index')
            ->with('message', 'Temporada creada.');
    }

    public function edit(Season $season): Response
    {
        return Inertia::render('Seasons/Edit', [
            'season' => $season->load('series'),
            'series' => Series::all(['id', 'title'])
        ]);
    }

    public function update(SeasonRequest $request, Season $season): RedirectResponse
    {
        $season->update($request->validated());

        return redirect()
            ->route('seasons.show', $season)
            ->with('message', 'Temporada actualizada correctamente');
    }

    public function destroy(Season $season): RedirectResponse
    {
        $season->delete();

        return redirect()
            ->back()
            ->with('message', 'Temporada eliminada correctamente');
    }
}
