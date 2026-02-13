<?php

namespace App\Http\Controllers;

use App\Models\WatchHistory;
use App\Http\Requests\WatchHistoryRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class WatchHistoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('WatchHistory/Index', [
            'history' => WatchHistory::where('user_id', Auth::id())
                ->with(['episode.season.series'])
                ->orderBy('last_watched_at', 'desc')
                ->get()
        ]);
    }

    public function update(WatchHistoryRequest $request): JsonResponse
    {
        WatchHistory::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'episode_id' => $request->episode_id
            ],
            [
                'progress_seconds' => $request->progress_seconds,
                'completed' => $request->completed,
                'last_watched_at' => now()
            ]
        );

        return response()->json(['status' => 'success']);
    }

    public function destroy($episode_id): RedirectResponse
    {
        WatchHistory::where('user_id', Auth::id())
            ->where('episode_id', $episode_id)
            ->delete();

        return back();
    }

    public function clear(): RedirectResponse
    {
        WatchHistory::where('user_id', Auth::id())->delete();

        return back();
    }
}
