<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StarlinkPlan extends Model
{
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, 'starlink_plan_id', 'id');
    }
}
