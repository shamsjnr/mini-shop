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
        Schema::create('starlink_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->on('users')->onDelete('cascade');
            $table->enum('subscription_type', ['PERSONAL', 'BUSINESS'])->default('PERSONAL');
            $table->enum('priority', ['MOBILE', 'GLOBAL', 'RESIDENTIAL'])->nullable();
            $table->decimal('charge')->nullable();
            $table->enum('status', ['PENDING', 'CANCELED', 'REFUNDED', 'COMPLETED'])->default('PENDING');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('starlink_subscriptions');
    }
};
