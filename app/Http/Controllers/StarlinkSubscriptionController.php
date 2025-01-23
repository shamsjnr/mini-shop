<?php

namespace App\Http\Controllers;

use App\Models\StarlinkSubscription;
use App\Http\Requests\StoreStarlinkSubscriptionRequest;
use App\Http\Requests\UpdateStarlinkSubscriptionRequest;
use App\Models\StarlinkPlan;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StarlinkSubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = explode(',', config('odh.starlink_categories'));

        $plans = [];

        foreach ($categories as $category) {
            $plans[strtolower($category)] = StarlinkPlan::where('category', $category)->select('name', 'price', 'category')->get();
        }

        $data = [
            'categories' => $categories,
            'plans' => $plans
        ];

        return Inertia::render('Subscriptions/Starlink', $data);
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
    public function store(StoreStarlinkSubscriptionRequest $request)
    {
        // $subscription = new StarlinkSubscription;

        // $subscription->user_id = Auth::id();
        // $subscription->subscription_type = strtoupper($request->type);
        // $subscription->priority = $request->priority;
        // $subscription->charge = 55000;

        // $subscription->save();
        $subscription = StarlinkPlan::where([['name', $request->priority], ['category', $request->type]])->first();

        // Log the transaction...
        $trx = new Transaction;
        $trx->user_id = Auth::id();
        $trx->amount = $subscription->price;
        $trx->starlink_plan_id = $subscription->id;
        $trx->statement = 'Starlink';
        $trx->description = ucfirst(strtolower($subscription->category)) ." ({$subscription->name})";
        $trx->flow = 'OUTWARD';
        $trx->status = 'PENDING';
        $trx->save();

        return to_route('dashboard')->with('message', 'Your subscription will activate in a moment <br />You will receive a confirmation message in your mailbox');
    }

    /**
     * Display the specified resource.
     */
    public function show(StarlinkSubscription $starlinkSubscription)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StarlinkSubscription $starlinkSubscription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStarlinkSubscriptionRequest $request, StarlinkSubscription $starlinkSubscription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StarlinkSubscription $starlinkSubscription)
    {
        //
    }
}
