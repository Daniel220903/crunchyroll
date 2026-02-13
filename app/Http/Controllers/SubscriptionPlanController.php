<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use App\Http\Requests\SubscriptionPlanRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SubscriptionPlanController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('SubscriptionPlans/Index', [
            'plans' => SubscriptionPlan::all()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('SubscriptionPlans/Create');
    }

    public function store(SubscriptionPlanRequest $request): RedirectResponse
    {
        SubscriptionPlan::create($request->validated());

        return redirect()->route('subscription-plans.index')
            ->with('message', 'Plan creado correctamente.');
    }

    public function edit(SubscriptionPlan $subscription_plan): Response
    {
        return Inertia::render('SubscriptionPlans/Edit', [
            'plan' => $subscription_plan
        ]);
    }

    public function update(SubscriptionPlanRequest $request, SubscriptionPlan $subscription_plan): RedirectResponse
    {
        $subscription_plan->update($request->validated());

        return redirect()->route('subscription-plans.index')
            ->with('message', 'Plan actualizado.');
    }

    public function destroy(SubscriptionPlan $subscription_plan): RedirectResponse
    {
        $subscription_plan->delete();
        
        return redirect()->route('subscription-plans.index')
            ->with('message', 'Plan eliminado.');
    }
}
