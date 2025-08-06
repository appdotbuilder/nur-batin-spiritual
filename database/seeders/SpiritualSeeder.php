<?php

namespace Database\Seeders;

use App\Models\DetectionLog;
use App\Models\WiridSession;
use Illuminate\Database\Seeder;

class SpiritualSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample wirid sessions
        WiridSession::factory(15)->completed()->create();
        WiridSession::factory(2)->active()->create();
        WiridSession::factory(3)->state(['status' => 'interrupted'])->create();

        // Create sample detection logs
        DetectionLog::factory(10)->safe()->create();
        DetectionLog::factory(5)->withEntity()->create();
        DetectionLog::factory(3)->create(); // random mix
    }
}