<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'require',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ],
            'role' => 'required|in:1,2,3,4',
            'phone' => 'required|digits:10|regex:/^04\d+/',
            'address' => 'required|string|max:150',
        ];
    }
}