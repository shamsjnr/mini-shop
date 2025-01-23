<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->foreignId('starlink_plan_id')->on('starlink_plans')->nullable()->onDelete('cascade');
            $table->foreignId('data_plan_id')->on('data_pricings')->nullable()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('transactions', function (Blueprint $table) {

        // });
        if (Schema::hasColumn('transaction', 'starlink_plan_id')) {
            Schema::dropColumns('transactions', ['starlink_plan_id', 'data_plan_id']);
        }
    }
};
