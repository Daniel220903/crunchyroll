<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Http\Requests\ReviewRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        return Inertia::render('Reviews/Index', [
            'myReviews' => Review::with('series:id,title,cover_image')
                ->where('user_id', Auth::id())
                ->latest()
                ->get()
        ]);
    }

    public function store(ReviewRequest $request)
    {
        Review::updateOrCreate(
            ['user_id' => Auth::id(), 'series_id' => $request->series_id],
            [
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]
        );

        return redirect()->back()->with('message', 'Tu opinión ha sido registrada.');
    }

    public function destroy(Review $review)
    {
        if ($review->user_id === Auth::id()) {
            $review->delete();
        }
        return redirect()->back();
    }
}
