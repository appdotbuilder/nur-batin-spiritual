<?php

namespace Database\Factories;

use App\Models\DetectionLog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetectionLog>
 */
class DetectionLogFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\DetectionLog>
     */
    protected $model = DetectionLog::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $detectionTypes = ['spiritual_entity', 'aura_reading', 'frequency_scan'];
        $locations = [
            'Ruang Tamu',
            'Kamar Tidur',
            'Dapur',
            'Halaman Belakang',
            'Ruang Keluarga',
            'Mushola',
            'Taman',
            'Garasi',
            'Unknown Location'
        ];
        
        $entityDetected = $this->faker->boolean(30); // 30% chance of detection
        
        $responses = [
            "A'udzu billahi minasy-syaitaanir rajiim (3x)",
            "Bacaan Ayat Kursi",
            "Dzikir: La hawla wa la quwwata illa billahi",
            "Surat Al-Falaq dan An-Nas",
            "Perbanyak istighfar dan tasbih",
        ];

        return [
            'detection_type' => $this->faker->randomElement($detectionTypes),
            'location' => $this->faker->randomElement($locations),
            'simulated_readings' => [
                'emf_level' => $this->faker->numberBetween(10, 85),
                'spiritual_frequency' => $this->faker->numberBetween(20, 80) . ' Hz',
                'energy_disturbance' => $this->faker->numberBetween(15, 75),
                'temperature_anomaly' => $this->faker->numberBetween(-5, 10) . '°C',
                'magnetic_field' => $this->faker->numberBetween(20, 60) . ' μT',
            ],
            'entity_detected' => $entityDetected,
            'recommended_response' => $entityDetected ? $this->faker->randomElement($responses) : null,
            'created_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that an entity was detected.
     */
    public function withEntity(): static
    {
        return $this->state(fn (array $attributes) => [
            'entity_detected' => true,
            'recommended_response' => "A'udzu billahi minasy-syaitaanir rajiim",
        ]);
    }

    /**
     * Indicate that no entity was detected.
     */
    public function safe(): static
    {
        return $this->state(fn (array $attributes) => [
            'entity_detected' => false,
            'recommended_response' => null,
        ]);
    }
}