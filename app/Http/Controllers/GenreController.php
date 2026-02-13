<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Http\Requests\GenreRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class GenreController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Genres/Index', [
            'genres' => Genre::all()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Genres/Create');
    }

    public function store(GenreRequest $request): RedirectResponse
    {
        Genre::create($request->validated());
        return redirect()->route('genres.index');
    }

    public function edit(Genre $genre): Response
    {
        return Inertia::render('Genres/Edit', [
            'genre' => $genre
        ]);
    }

    public function update(GenreRequest $request, Genre $genre): RedirectResponse
    {
        $genre->update($request->validated());
        return redirect()->route('genres.index');
    }

    public function destroy(Genre $genre): RedirectResponse
    {
        $genre->delete();
        return redirect()->route('genres.index');
    }
}
