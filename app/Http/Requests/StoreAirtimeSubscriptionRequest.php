<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreAirtimeSubscriptionRequest extends FormRequest
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
            'amount' => ['required', 'numeric', 'min:50']
        ];
    }

    function messages() {
        return [
            'isp.required' => 'Select a Service Provider',
            'phone.digits' => 'Receiver\'s Phone number is invalid',
            'amount.min' => 'Minimum Airtime purchase amount is <span class="naira">N</span> 50'
        ];
    }
}
