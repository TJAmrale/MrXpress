<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
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
    protected $primaryKey = 'item_id'; 

    public function rules(): array
    {
        return [
            'item_name' => 'required|string|max:255',
            'item_type' => 'required|string|max:100',
            'description' => 'nullable|string|max:500', 
        ];
    }
}
