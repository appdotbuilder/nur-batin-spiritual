<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\DetectionLog
 *
 * @property int $id
 * @property string $detection_type
 * @property string|null $location
 * @property array|null $simulated_readings
 * @property bool $entity_detected
 * @property string|null $recommended_response
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog whereDetectionType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog whereEntityDetected($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog whereRecommendedResponse($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog whereSimulatedReadings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DetectionLog withEntityDetected()
 * @method static \Database\Factories\DetectionLogFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DetectionLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'detection_type',
        'location',
        'simulated_readings',
        'entity_detected',
        'recommended_response',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'simulated_readings' => 'array',
        'entity_detected' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include detections with entities.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithEntityDetected($query)
    {
        return $query->where('entity_detected', true);
    }
}