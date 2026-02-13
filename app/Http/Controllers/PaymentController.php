<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Requests\PaymentRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PaymentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Payments/Index', [
            'payments' => Payment::with(['user', 'subscription'])
                ->latest()
                ->paginate(15)
        ]);
    }

    public function store(PaymentRequest $request): RedirectResponse
    {
        Payment::create($request->validated());

        return redirect()->back()->with('message', 'Pago procesado.');
    }

    public function show(Payment $payment): Response
    {
        return Inertia::render('Payments/Show', [
            'payment' => $payment->load(['user', 'subscription'])
        ]);
    }
}
