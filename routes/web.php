<?php

use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\SeriesController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SubscriptionPlanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoiceActorController;
use App\Http\Controllers\WatchHistoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });
});

Route::middleware('auth')->group(function () {

    Route::get('/series/index', [SeriesController::class, 'index'])->name('series.index');
    Route::get('/series/preview/{series}', [SeriesController::class, 'preview'])->name('series.preview');
    Route::get('/series/show/{series}', [SeriesController::class, 'show'])->name('series.show');
    Route::get('/episodes/{episode}', [EpisodeController::class, 'show'])->name('episodes.show');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/watch-history', [WatchHistoryController::class, 'index'])->name('watch-history.index');
    Route::post('/watch-history', [WatchHistoryController::class, 'update'])->name('watch-history.update');
    Route::delete('/watch-history/{episode}', [WatchHistoryController::class, 'destroy'])->name('watch-history.destroy');
    Route::delete('/watch-history-clear', [WatchHistoryController::class, 'clear'])->name('watch-history.clear');

    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites/toggle/{id}', [FavoriteController::class, 'toggle'])->name('favorites.toggle');

    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::put('/reviews/{review}', [ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');

    Route::middleware(['admin'])->group(function () {
        
        Route::get('/series/create', [SeriesController::class, 'create'])->name('series.create');
        Route::post('/series/store', [SeriesController::class, 'store'])->name('series.store');
        Route::get('/series/edit/{series}', [SeriesController::class, 'edit'])->name('series.edit');
        Route::match(['put','patch'],'/series/update/{series}', [SeriesController::class, 'update'])->name('series.update');
        Route::delete('/series/destroy/{series}', [SeriesController::class, 'destroy'])->name('series.destroy');

        Route::get('/seasons', [SeasonController::class, 'index'])->name('seasons.index');
        Route::get('/seasons/create', [SeasonController::class, 'create'])->name('seasons.create');
        Route::post('/seasons', [SeasonController::class, 'store'])->name('seasons.store');
        Route::get('/seasons/{season}', [SeasonController::class, 'show'])->name('seasons.show');
        Route::get('/seasons/{season}/edit', [SeasonController::class, 'edit'])->name('seasons.edit');
        Route::match(['put', 'patch'], '/seasons/{season}', [SeasonController::class, 'update'])->name('seasons.update');
        Route::delete('/seasons/{season}', [SeasonController::class, 'destroy'])->name('seasons.destroy');

        Route::get('/episodes', [EpisodeController::class, 'index'])->name('episodes.index');
        Route::get('/episodes/create', [EpisodeController::class, 'create'])->name('episodes.create');
        Route::post('/episodes', [EpisodeController::class, 'store'])->name('episodes.store');
        Route::get('/episodes/{episode}/edit', [EpisodeController::class, 'edit'])->name('episodes.edit');
        Route::match(['put', 'patch'], '/episodes/{episode}', [EpisodeController::class, 'update'])->name('episodes.update');
        Route::delete('/episodes/{episode}', [EpisodeController::class, 'destroy'])->name('episodes.destroy');

        Route::get('/voice-actors', [VoiceActorController::class, 'index'])->name('voice-actors.index');
        Route::get('/voice-actors/create', [VoiceActorController::class, 'create'])->name('voice-actors.create');
        Route::post('/voice-actors', [VoiceActorController::class, 'store'])->name('voice-actors.store');
        Route::get('/voice-actors/{voice_actor}', [VoiceActorController::class, 'show'])->name('voice-actors.show');
        Route::get('/voice-actors/{voice_actor}/edit', [VoiceActorController::class, 'edit'])->name('voice-actors.edit');
        Route::match(['put', 'patch'], '/voice-actors/{voice_actor}', [VoiceActorController::class, 'update'])->name('voice-actors.update');
        Route::delete('/voice-actors/{voice_actor}', [VoiceActorController::class, 'destroy'])->name('voice-actors.destroy');

        Route::get('/genres', [GenreController::class, 'index'])->name('genres.index');
        Route::get('/genres/create', [GenreController::class, 'create'])->name('genres.create');
        Route::post('/genres', [GenreController::class, 'store'])->name('genres.store');
        Route::get('/genres/{genre}', [GenreController::class, 'show'])->name('genres.show');
        Route::get('/genres/{genre}/edit', [GenreController::class, 'edit'])->name('genres.edit');
        Route::put('/genres/{genre}', [GenreController::class, 'update'])->name('genres.update');
        Route::delete('/genres/{genre}', [GenreController::class, 'destroy'])->name('genres.destroy');

        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::post('/users/{user}', [UserController::class, 'update'])->name('users.update'); 
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

        Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
        Route::post('/payments', [PaymentController::class, 'store'])->name('payments.store');
        Route::get('/payments/{payment}', [PaymentController::class, 'show'])->name('payments.show');

        Route::get('/subscription-plans', [SubscriptionPlanController::class, 'index'])->name('subscription-plans.index');
        Route::get('/subscription-plans/create', [SubscriptionPlanController::class, 'create'])->name('subscription-plans.create');
        Route::post('/subscription-plans', [SubscriptionPlanController::class, 'store'])->name('subscription-plans.store');
        Route::get('/subscription-plans/{subscription_plan}/edit', [SubscriptionPlanController::class, 'edit'])->name('subscription-plans.edit');
        Route::put('/subscription-plans/{subscription_plan}', [SubscriptionPlanController::class, 'update'])->name('subscription-plans.update');
        Route::delete('/subscription-plans/{subscription_plan}', [SubscriptionPlanController::class, 'destroy'])->name('subscription-plans.destroy');

        Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
        Route::get('/subscriptions/create', [SubscriptionController::class, 'create'])->name('subscriptions.create');
        Route::post('/subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
        Route::get('/subscriptions/{subscription}/edit', [SubscriptionController::class, 'edit'])->name('subscriptions.edit');
        Route::put('/subscriptions/{subscription}', [SubscriptionController::class, 'update'])->name('subscriptions.update');
        Route::delete('/subscriptions/{subscription}', [SubscriptionController::class, 'destroy'])->name('subscriptions.destroy');
        Route::post('/subscriptions/{subscription}/cancel', [SubscriptionController::class, 'cancel'])->name('subscriptions.cancel');
        Route::post('/subscriptions/{subscription}/resume', [SubscriptionController::class, 'resume'])->name('subscriptions.resume');
    });
});

require __DIR__.'/auth.php';
