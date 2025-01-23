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
        Schema::create('data_pricings', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->foreignId('isp_id')->on('isps')->nullable();
            $table->unsignedSmallInteger('term')->default('30');
            $table->decimal('price');
            $table->decimal('discount', 6,1)->nullable();
            $table->timestamps();
        });

        Schema::create('isps', function (Blueprint $table) {
            $table->unsignedTinyInteger('id', true);
            $table->string('name', 50);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_pricings');
        Schema::dropIfExists('isps');
    }
};
