<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStockRequest extends FormRequest
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
    protected $primaryKey = 'stock_id';

    public function rules(): array
    {
        return [   
            'device_id' => 'required|integer',
            'item_id' => 'required|integer',
            'buy_price' => 'required|numeric|min:0.01',
            'wholesale_price' => 'required|numeric|min:0.01',
            'retail_price' => 'required|numeric|min:0.01',
            'quantity' => 'required|integer|min:1',
        ];
    }
}