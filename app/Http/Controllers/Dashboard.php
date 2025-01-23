<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Dashboard extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::where('user_id', Auth::id())
                                ->select('amount', 'statement', 'description', 'status', 'updated_at AS date')
                                ->orderBy('id', 'DESC')
                                ->limit(10)
                                ->get();
        $deposit = Payment::where([['user_id', Auth::id()], ['status', 'PAID']])->sum('payable');
        $completed = Transaction::where([['user_id', Auth::id()], ['flow', 'OUTWARD']])->sum('amount');

        $data = [
            'wallet' => $deposit - $completed,
            'history' => $transactions
        ];

        return Inertia::render('Dashboard', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
