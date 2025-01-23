<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreStarlinkSubscriptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user() ? true : false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'in:business,personal'],
            'priority' => ['required', 'exists:starlink_plans,name'],
            'kit_number' => ['required', 'string'],
            'kit_email' => ['required', 'email'],
            'kit_pass' => ['required', 'confirmed'],
        ];
    }

    public function messages()
    {
        return [
            'type.in' => 'The selected subscription type is invalid.',
            'priority.exists' => 'Please select the desired subscription priority.',
            'kit_number.required' => 'Starlink Kit number is required.',
            'kit_number.string' => 'Starlink Kit number is invalid.',
            'kit_email.required' => 'Kit Registered email is required.',
            'kit_email.email' => 'Email is invalid.',
            'kit_pass.required' => 'Starlink password is required',
            'kit_pass.confirmed' => 'Passwords do not match.',
        ];
    }
}
