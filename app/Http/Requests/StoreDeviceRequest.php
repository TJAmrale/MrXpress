<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeviceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    protected $primaryKey = 'device_id';

    public function rules(): array
    {
        
        return [   
            'brand_id' => 'required|integer',  
            'series_id' => 'required|integer', 
            'model' => 'required|string|max:255', 
            'colours' => 'required|string|max:255',
        ];
    }
}
