<?php

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\DataSubscriptionController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StarlinkSubscriptionController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('/profile')->group(function() {
        Route::get('/settings', [ProfileController::class, 'settings'])->name('profile.settings');
        Route::get('', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('', [ProfileController::class, 'updateEmail'])->name('profile.email');
        Route::patch('', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::prefix('/pay')->group(function() {
        Route::post('', [PaymentController::class, 'store']);
        Route::get('', [PaymentController::class, 'index'])->name('paynow');
    });

    Route::prefix('/buy')->group(function () {
        Route::post('/starlink', [StarlinkSubscriptionController::class, 'store']);
        Route::get('/starlink', [StarlinkSubscriptionController::class, 'index'])->name('starlink');
        Route::post('/airtime', [DataSubscriptionController::class, 'buy_airtime']);
        Route::get('/airtime', [DataSubscriptionController::class, 'create'])->name('buy.airtime');
        Route::post('/data', [DataSubscriptionController::class, 'store']);
        Route::get('/data', [DataSubscriptionController::class, 'index'])->name('buy.data');
    });

    Route::get('/dashboard', [Dashboard::class, 'index'])->name('dashboard');
});

// Admin Panel routes
require __DIR__.'/admin.php';

// Paystack webhook
Route::get('/pay/verify', [PaymentController::class, 'update'])->name('verify_pay');

// Authentication routes
require __DIR__.'/auth.php';
