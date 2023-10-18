<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobRequest extends FormRequest
{
    public function authorize()
    {
        // Define authorization rules here if needed.
        return true;
    }

    public function rules()
    {
        return [
            'customer_id' => 'required|exists:customers,customer_id',
            'technician_id' => 'required|exists:technicians,technician_id',
            'device_id' => 'required|exists:devices,device_id',
            'description' => 'required|string',
            'status' => 'required|in:pending,in_progress,completed',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'price' => 'required|numeric',
            'notes' => 'string|nullable',
            'location' => 'string|nullable',
        ];
    }

    // You can also define custom validation messages if needed.
    public function messages()
    {
        return [
            'customer_id.exists' => 'The selected customer is invalid.',
            'technician_id.exists' => 'The selected technician is invalid.',
            'device_id.exists' => 'The selected device is invalid.',
        ];
    }
}
