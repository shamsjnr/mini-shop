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
        Schema::create('starlink_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('category', ['BUSINESS', 'PERSONAL'])->default('BUSINESS');
            $table->decimal('price', 10, 1);
            $table->decimal('discount', 7,1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('starlink_plans');
    }
};
