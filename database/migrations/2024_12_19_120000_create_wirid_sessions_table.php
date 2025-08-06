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
        Schema::create('wirid_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('wirid_name')->comment('Name of the wirid being practiced');
            $table->integer('duration_minutes')->default(0)->comment('Duration of the wirid session in minutes');
            $table->enum('status', ['active', 'completed', 'interrupted'])->default('active')->comment('Status of the wirid session');
            $table->json('feedback_data')->nullable()->comment('Simulated feedback data from the session');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('wirid_name');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wirid_sessions');
    }
};