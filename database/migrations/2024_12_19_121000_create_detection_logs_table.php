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
        Schema::create('detection_logs', function (Blueprint $table) {
            $table->id();
            $table->enum('detection_type', ['spiritual_entity', 'aura_reading', 'frequency_scan'])->comment('Type of spiritual detection performed');
            $table->text('location')->nullable()->comment('Location where detection was performed');
            $table->json('simulated_readings')->nullable()->comment('Simulated sensor readings and spiritual data');
            $table->boolean('entity_detected')->default(false)->comment('Whether a spiritual entity was detected');
            $table->text('recommended_response')->nullable()->comment('Recommended spiritual response or prayer');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('detection_type');
            $table->index('entity_detected');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detection_logs');
    }
};