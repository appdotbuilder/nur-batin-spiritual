<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\WiridSession
 *
 * @property int $id
 * @property string $wirid_name
 * @property int $duration_minutes
 * @property string $status
 * @property array|null $feedback_data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession query()
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession whereDurationMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession whereFeedbackData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession whereWiridName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession active()
 * @method static \Illuminate\Database\Eloquent\Builder|WiridSession completed()
 * @method static \Database\Factories\WiridSessionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class WiridSession extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'wirid_name',
        'duration_minutes',
        'status',
        'feedback_data',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'feedback_data' => 'array',
        'duration_minutes' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active sessions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include completed sessions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}