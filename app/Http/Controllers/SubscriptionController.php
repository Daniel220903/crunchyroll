<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\User;
use App\Models\SubscriptionPlan;
use App\Http\Requests\SubscriptionRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SubscriptionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Subscriptions/Index', [
            'subscriptions' => Subscription::with(['user', 'plan'])
                ->latest()
                ->paginate(10)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Subscriptions/Create', [
            'users' => User::select('id', 'name', 'email')->get(),
            'plans' => SubscriptionPlan::select('id', 'name', 'price', 'duration_in_days')->get()
        ]);
    }

    public function store(SubscriptionRequest $request): RedirectResponse
    {
        Subscription::create($request->validated());

        return redirect()->route('subscriptions.index')
            ->with('message', 'Suscripción registrada correctamente.');
    }

    public function edit(Subscription $subscription): Response
    {
        return Inertia::render('Subscriptions/Edit', [
            'subscription' => $subscription,
            'users' => User::select('id', 'name')->get(),
            'plans' => SubscriptionPlan::select('id', 'name')->get()
        ]);
    }

    public function update(SubscriptionRequest $request, Subscription $subscription): RedirectResponse
    {
        $subscription->update($request->validated());

        return redirect()->route('subscriptions.index')
            ->with('message', 'Suscripción actualizada.');
    }

    public function destroy(Subscription $subscription): RedirectResponse
    {
        $subscription->delete();
        return redirect()->route('subscriptions.index');
    }

    public function cancel(Subscription $subscription): RedirectResponse
    {
        $subscription->update([
            'status' => 'cancelled',
        ]);

        return back()->with('message', 'Suscripción cancelada.');
    }

    public function resume(Subscription $subscription): RedirectResponse
    {
        $subscription->update([
            'status' => 'active'
        ]);

        return back()->with('message', 'Suscripción reactivada.');
    }
}
