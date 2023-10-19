<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();
        if ($user) {
            logger('Authenticated User:', ['user_id' => $user->user_id]);
            return true;
        } else {
            logger('Unauthenticated User');
            return false;
        }
    }
        public function rules(): array
        {
            return [
                'name' => 'string',
                'email' => 'required|email|unique:users',
            'phone' => 'required|digits:10|regex:/^04\d+/',
            'address' => 'required|string|max:150',
            'dob' => 'required',
        ];
    }
}
