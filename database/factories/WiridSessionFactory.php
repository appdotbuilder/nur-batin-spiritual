<?php

namespace Database\Factories;

use App\Models\WiridSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WiridSession>
 */
class WiridSessionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\WiridSession>
     */
    protected $model = WiridSession::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $wiridTypes = ['Yaa Nur', 'Yaa Haqq', 'La Hawla', 'Asmaul Husna'];
        $statuses = ['completed', 'active', 'interrupted'];
        
        return [
            'wirid_name' => $this->faker->randomElement($wiridTypes),
            'duration_minutes' => $this->faker->numberBetween(5, 60),
            'status' => $this->faker->randomElement($statuses),
            'feedback_data' => [
                'start_time' => $this->faker->time('H:i:s'),
                'alignment_score' => $this->faker->numberBetween(60, 100),
                'spiritual_frequency' => $this->faker->numberBetween(40, 60) . ' Hz',
                'aura_reading' => $this->faker->randomElement(['positive', 'balanced', 'harmonious']),
                'final_alignment' => $this->faker->numberBetween(80, 100),
                'completion_score' => $this->faker->numberBetween(85, 100),
            ],
            'created_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the wirid session is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'duration_minutes' => 0,
        ]);
    }

    /**
     * Indicate that the wirid session is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'duration_minutes' => $this->faker->numberBetween(10, 45),
        ]);
    }
}