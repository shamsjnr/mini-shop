<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreDataSubscriptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::id();
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
            'phone' => ['required', 'string', 'digits:11'],
            'data_plan' => ['required', 'exists:data_pricings,id']
        ];
    }

    function messages() {
        return [
            'isp.required' => 'Select a Service Provider',
            'phone.digits' => 'Receiver\'s Phone number is invalid',
            'data_plan.required' => 'Select a Data plan',
            'data_plan.exists' => 'Selected plan is not applicaple to Service Provider'
        ];
    }
}
