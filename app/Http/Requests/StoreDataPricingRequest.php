<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreDataPricingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->is_admin && session('odh_pin_logged');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'isp' => ['required', 'string', 'exists:isps,name'],
            'name' => ['required', 'string', 'min:3'],
            'term' => ['required'],
            'price' => ['required', 'numeric', 'gte:0']
        ];
    }

    public function messages() {
        return [
            'isp.exists' => 'Invalid service provider'
        ];
    }
}
