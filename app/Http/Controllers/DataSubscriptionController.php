<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAirtimeSubscriptionRequest;
use App\Models\DataSubscription;
use App\Http\Requests\StoreDataSubscriptionRequest;
use App\Http\Requests\UpdateDataSubscriptionRequest;
use App\Models\DataPricing;
use App\Models\Isp;
use App\Models\Payment;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DataSubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'isps' => Isp::all(),
            'plans' => DataPricing::with('isp')->get()
        ];
        return Inertia::render('Subscriptions/Data', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $history = Transaction::where([['user_id', Auth::id()], ['statement', 'Airtime'], ['flow', 'OUTWARD']])->get();
        $data = ['history' => $history];
        return Inertia::render('Subscriptions/Airtime', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDataSubscriptionRequest $request)
    {
        $isp = strtolower(str_replace("9", "nine_", $request->isp));
        $allowed = explode(',', config("odh.first_four.{$isp}"));
        $first_four = substr($request->phone, 0, 4);

        $isp = Isp::where('name', $request->isp)->first();
        $pricing = DataPricing::find($request->data_plan);
        if ( ! $isp || ! $pricing ) {
            $error = ! $isp ? '4011' : '4012';
            return back()->withErrors(['message'=>"An unexpected error occurred. <br />Contact our support with the following code: <b>&#0x{$error}</b>"]);
        }

        if ( ! in_array($first_four, $allowed) ) {
            return back()->withErrors(['message'=>"This is not a valid <b>{$request->isp}</b> number"]);
        }

        $deposits = Payment::where('user_id', Auth::id())->where('status', 'PAID')->sum('payable') ?: 0;
        $purchases = Transaction::where('FLOW', 'OUTWARD')->whereNot('status', 'CANCELED')->sum('amount') ?: 0;


        if ( $deposits - $purchases - $pricing->price < 0 ) {
            return back()->withErrors(['message'=>"Insufficient funds"]);
        }


        // TODO: Implement Data topup API integration (set as background task)

        $f = $request->phone;
        $formatted = implode(' ', ['+234', substr($f, 1, 3), substr($f, 4, 3), substr($f, 7)]);

        $trx = new Transaction;
        $trx->user_id = Auth::id();
        $trx->amount = $pricing->price;
        // $trx->starlink_plan_id = $subscription->id;
        $trx->statement = 'Data Subscription';
        $trx->description = "({$isp->name}) {$formatted}";
        $trx->flow = 'OUTWARD';
        $trx->status = 'COMPLETED';
        $trx->save();
        return to_route('dashboard')->with(['message'=>"Data purchase successful!"]);
    }

    /**
     * Display the specified resource.
     */
    public function buy_airtime(StoreAirtimeSubscriptionRequest $request)
    {
        $isp = strtolower(str_replace("9", "nine_", $request->isp));
        $allowed = explode(',', config("odh.first_four.{$isp}"));
        $first_four = substr($request->phone, 0, 4);

        $isp = Isp::where('name', $request->isp)->first();
        if ( ! $isp ) {
            return back()->withErrors(['message'=>"An unexpected error occurred. <br />Contact our support with the following code: <b>&4011</b>"]);
        }

        if ( ! in_array($first_four, $allowed) ) {
            return back()->withErrors(['message'=>"This is not a valid <b>{$request->isp}</b> number"]);
        }

        $deposits = Payment::where('user_id', Auth::id())->where('status', 'PAID')->sum('payable') ?: 0;
        $purchases = Transaction::where('FLOW', 'OUTWARD')->whereNot('status', 'CANCELED')->sum('amount') ?: 0;

        if ( $deposits - $purchases - $request->amount < 0 ) {
            return back()->withErrors(['message'=>"Insufficient funds"]);
        }


        // TODO: Implement Airtime topup API integration (set as background task)

        $f = $request->phone;
        $formatted = implode(' ', ['+234', substr($f, 1, 3), substr($f, 4, 3), substr($f, 7)]);

        $trx = new Transaction;
        $trx->user_id = Auth::id();
        $trx->amount = $request->amount;
        // $trx->starlink_plan_id = $subscription->id;
        $trx->statement = 'Airtime';
        $trx->description = "({$isp->name}) {$formatted}";
        $trx->flow = 'OUTWARD';
        $trx->status = 'COMPLETED';
        $trx->save();
        return to_route('dashboard')->with(['message'=>"Airtime purchase successful!"]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataSubscription $dataSubscription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreDataSubscriptionRequest $request, DataSubscription $dataSubscription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataSubscription $dataSubscription)
    {
        //
    }
}
