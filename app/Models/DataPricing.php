<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DataPricing extends Model
{
    /**
     * Get the user associated with the DataPricing
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function isp(): HasOne
    {
        return $this->hasOne(Isp::class, 'id', 'isp_id');
    }
}
