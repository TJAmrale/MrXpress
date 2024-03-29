<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
            'email' => 'required|email|unique:users,email,'.$this->user->user_id.',user_id', // Validate the email is required, is in email format, and is unique among users, excluding the current user's email.
            'password' => [
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ],
            'access_level' => 'required|in:1,2,3,4',
            'phone' => 'required|digits:10|regex:/^04\d+/',
            'address' => 'required|string|max:150',
        ];
    }
}
