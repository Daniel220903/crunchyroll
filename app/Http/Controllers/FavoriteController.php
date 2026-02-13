<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FavoriteController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Favorites/Index', [
            'favorites' => Auth::user()->favoriteSeries()->get()
        ]);
    }

    public function toggle($id): RedirectResponse
    {
        Auth::user()->favoriteSeries()->toggle($id);

        return back();
    }
}
