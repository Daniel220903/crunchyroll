<?php

namespace App\Http\Controllers;

use App\Models\Series;
use App\Models\Genre;
use App\Http\Requests\SeriesRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SeriesController extends Controller
{
    
    //---------------------TERMINADA----------------------    
    public function index(): Response
    {
        // dd('lala',Series::with('genres')->latest()->paginate(2));    

        return Inertia::render('Series/Index', [
            'series' => Series::with('genres')->latest()->paginate(12)
        ]);
    }

    //---------------------TERMINADA----------------------  
    public function preview(Series $series): Response
    {
        return Inertia::render('Series/Preview', [
            'series' => $series->load(['genres', 'seasons' => function($query) {
                $query->with(['episodes' => function($q) {
                    $q->orderBy('episode_number')->limit(3);
                }]);
            }])
        ]);
    }

    //---------------------TERMINADA---------------------- 
    public function create(): Response
    {
        return Inertia::render('Series/Create', [
            'genres' => Genre::all()
        ]);
    }

    //---------------------TERMINADA---------------------- 
    public function store(SeriesRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('series', 'public');
        }

        $series = Series::create($data);

        if ($request->has('genre_ids')) {
            $series->genres()->attach($request->genre_ids);
        }

        return redirect()->route('series.index')->with('message', 'Serie creada con éxito');
    }

    //---------------------TERMINADA---------------------- 
    public function show(Series $series): Response
    {
        return Inertia::render('Series/Show', [
            'series' => $series->load(['seasons.episodes', 'genres']),
            'isFavorite' => auth()->check() 
                ? auth()->user()->favorites()->where('series_id', $series->id)->exists() 
                : false,
            'reviews' => $series->reviews()->with('user')->latest()->get(),
            'userReview' => auth()->check() 
                ? $series->reviews()->where('user_id', auth()->id())->first() 
                : null,
        ]);
    }

    //---------------------TERMINADA---------------------- 
    public function edit(Series $series): Response
    {
        return Inertia::render('Series/Edit', [
            'series' => $series->load('genres'),
            'genres' => Genre::all()
        ]);
    }

    //---------------------TERMINADA---------------------- 
    public function update(SeriesRequest $request, Series $series): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            if ($series->cover_image) {
                Storage::disk('public')->delete($series->cover_image);
            }
            $data['cover_image'] = $request->file('cover_image')->store('series', 'public');
        }

        $series->update($data);

        if ($request->has('genre_ids')) {
            $series->genres()->sync($request->genre_ids);
        }

        return redirect()->route('series.index')->with('message', 'Serie actualizada');
    }

     //---------------------TERMINADA---------------------- 
    public function destroy(Series $series): RedirectResponse
    {
        if ($series->cover_image) {
            Storage::disk('public')->delete($series->cover_image);
        }

        $series->delete();
        return redirect()->route('series.index')->with('message', 'Serie eliminada');
    }
}
