<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Isp extends Model
{
    public function DataPricing(): BelongsTo
    {
        return $this->belongsTo(DataPricing::class, 'isp_id', 'id');
    }
}
