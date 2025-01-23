<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StarlinkSubscription;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Dashboard extends Controller
{
    public function login()
    {
        if (Auth::user()) return to_route('admin.index');
        return Inertia::render('Admin/Login');
    }

    public function index()
    {
        $users = User::whereNot('is_admin', 1)->count();
        $recents = Transaction::with('user')->limit(25)->orderBy('id', 'DESC')->get();
        $starlink = StarlinkSubscription::where('status', 'PENDING')->count();
        $transactions = Transaction::whereLike('created_at', '%'.date('Y-m').'%')->count();
        $counts = [
            'users' => $users,
            'starlink' => $starlink,
            'transactions' => $transactions,
        ];
        return Inertia::render('Admin/Index', [
            'counts' => $counts,
            'recents' => $recents
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      return Inertia::render('Admin/Pin');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $request->validate([
        'pin' => 'required|alphanum|size:4'
      ], [
        'pin.required' => 'Request invalid',
        'pin.alphanum' => 'Pin is invalid'
      ]);

      $user = Auth::user();
      $pin = md5("Olimpia{$request->pin}.ng");

      if ($pin != $user->pin) {
        return back()->withErrors(['pin' => 'Pin is invalid']);
      }

      session(['odh_pin_logged' => true]);
      return to_route('admin.index')->with(['success' => 'Welcome']);
    }

    /**
     * Display the specified resource.
     */
    public function profile()
    {
      return Inertia::render('Admin/Profile');
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
    public function update(Request $request)
    {
      $request->validate([
        'oldPin' => 'required|alphanum|size:4',
        'newPin' => 'required|alphanum|size:4|confirmed',
      ], [
        'oldPin.required' => 'Enter your current PIN'
      ]);

      $user = Auth::user();
      if ($user->pin !== md5("Olimpia{$request->oldPin}.ng"))
        return to_route('admin.profile')->withErrors(['oldPin' => 'Current PIN is incorrect!']);

      $user = User::find($user->id);
      $user->pin = md5("Olimpia{$request->newPin}.ng");
      $user->save();

      return back()->with('success', 'PIN updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
