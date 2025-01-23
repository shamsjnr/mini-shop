<?php

namespace App\Http\Controllers;

use App\Models\StarlinkPlan;
use App\Http\Requests\StoreStarlinkPlanRequest;
use App\Models\StarlinkSubscription;
use App\Models\Transaction;
use Inertia\Inertia;

class StarlinkPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/StarlinkPlans', ['plans' => StarlinkPlan::all()]);
    }

    public function subscriptions()
    {
        return Inertia::render('Admin/StarlinkSubscriptions', [
            'data' => Transaction::where('status', 'PENDING')->with('user')->with('plan')->get(),
            'history' => Transaction::whereNot('status', 'PENDING')->with('user')->with('plan')->limit(50)->get()
        ]);
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
    public function store(StoreStarlinkPlanRequest $request)
    {
        $check = StarlinkPlan::where([['name', $request->name], ['category', $request->category]])->first();
        if ($check) {
            return back()->withErrors(['message'=>'Pricing already exist']);
        }

        $pricing = new StarlinkPlan;
        $pricing->name = $request->input('name');
        $pricing->category = $request->category;
        $pricing->price = $request->input('price');
        $pricing->save();

        return back()->with('success', 'Pricing saved!');
    }

    /**
     * Display the specified resource.
     */
    public function show(StarlinkPlan $starlinkPlan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StarlinkPlan $starlinkPlan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreStarlinkPlanRequest $request, StarlinkPlan $pricing)
    {
        $check = StarlinkPlan::where([['name', $request->name], ['category', $request->category]])->whereNot('id', $pricing->id)->first();
        if ($check) {
            return back()->withErrors(['message'=>'Pricing already exist']);
        }

        $pricing->name = $request->input('name');
        $pricing->category = $request->category;
        $pricing->price = $request->input('price');
        $pricing->save();

        return back()->with('success', 'Pricing saved!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StarlinkPlan $pricing)
    {
        $pricing->delete();
        return back()->with('success', 'Data removed!');
    }
}
