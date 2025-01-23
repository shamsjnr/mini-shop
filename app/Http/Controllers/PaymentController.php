<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Unicodeveloper\Paystack\Facades\Paystack;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ['status' => session('status')];
        return Inertia::render('Payments/Start', $data);
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
    public function store(StorePaymentRequest $request)
    {
        $amount = floatval($request->amount);
        $user = Auth::user();
        $data = array(
            "amount" => $amount * 100,
            "reference" => md5($user->id + time()),
            "email" => "{$user->phone}@olimpia.ng",
            "currency" => "NGN",
            "orderID" => time(),
            "callback_url" => route('verify_pay')
        );

        $paystack = Paystack::getAuthorizationUrl($data);

        $payment = new Payment;
        $payment->user_id = $user->id;
        $payment->payment_ref = $paystack->url;
        $payment->transaction_id = $data['reference'];
        $payment->payable = $amount;
        $payment->save();

        return back()->with('message', $paystack->url);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $paymentDetails = Paystack::getPaymentData();
        $data = $paymentDetails['data'];

        $pay = Payment::where('transaction_id', ($data['reference'] ?? 'invalid'))->first();

        if ($data['status'] == 'success' && $pay) {

            // Update payment status...
            $pay->status = 'PAID';
            $pay->paid_at = date_create($data['paid_at']);
            $pay->save();

            // Log the transaction...
            $trx = new Transaction;
            $trx->user_id = $pay->user_id;
            $trx->amount = $pay->payable;
            $trx->statement = 'Cash Deposit';
            $trx->description = 'Cash Deposit';
            $trx->flow = 'INWARD';
            $trx->status = 'COMPLETED';
            $trx->save();

            $msg = 'You have added <span class="font-semibold tracking-wider"><span class="naira">N</span> '. number_format($pay->payable) .'</span> to your wallet.';
            return to_route('dashboard')->with('message', $msg);
        }

        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
