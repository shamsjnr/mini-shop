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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->on('users')->onDelete('cascade');
            $table->unsignedInteger('amount')->default(0);
            $table->string('statement')->nullable();
            $table->string('description')->nullable();
            $table->enum('flow', ['INWARD', 'OUTWARD'])->nullable();
            $table->enum('status', ['COMPLETED', 'PENDING', 'CANCELED'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
