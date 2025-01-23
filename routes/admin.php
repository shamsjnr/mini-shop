<?php

use App\Http\Controllers\Admin\Dashboard as AdminDashboard;
use App\Http\Controllers\DataPricingController;
use App\Http\Controllers\StarlinkPlanController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->middleware(['auth', 'is_admin'])->group(function() {
    Route::post('/pin', [AdminDashboard::class, 'store']);
    Route::get('/pin', [AdminDashboard::class, 'create'])->name('admin.pin');
    Route::get('/dashboard', [AdminDashboard::class, 'index'])->name('admin.index');
    Route::prefix('/data')->group(function () {
        Route::post('', [DataPricingController::class, 'store']);
        Route::put('/{pricing}', [DataPricingController::class, 'update'])->name('admin.plans.update');
        Route::delete('/{pricing}', [DataPricingController::class, 'destroy'])->name('admin.plans.delete');
        Route::get('{isp}', [DataPricingController::class, 'index'])->name('admin.plans.isp');
        Route::get('', [DataPricingController::class, 'index'])->name('admin.plans');
    });
    Route::prefix('/starlink')->group(function () {
        Route::post('', [StarlinkPlanController::class, 'store']);
        Route::put('/{pricing}', [StarlinkPlanController::class, 'update'])->name('admin.starlink.update');
        Route::delete('/{pricing}', [StarlinkPlanController::class, 'destroy'])->name('admin.starlink.delete');
        Route::get('/subscriptions', [StarlinkPlanController::class, 'subscriptions'])->name('admin.starlink.subscriptions');
        Route::get('', [StarlinkPlanController::class, 'index'])->name('admin.starlink');
    });
    Route::prefix('/profile')->group(function() {
        Route::put('', [AdminDashboard::class, 'update'])->name('admin.setPin');
        Route::get('', [AdminDashboard::class, 'profile'])->name('admin.profile');
    });
});
Route::get('/admin', [AdminDashboard::class, 'login'])->name('admin.login');
