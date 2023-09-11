<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// The AuthController is responsible for handling authentication-related actions like register, login, and logout.
class AuthController extends Controller
{
    // Handles the registration process for new users.
    public function register(RegisterRequest $request)
    {
        $data = $request->validated(); // Validate the incoming request data against the rules defined in RegisterRequest.

        $user = User::create([
            'access_level' => $data['role'],
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'phone' => $data['phone'],
            'address' => $data['address'],
        ]); // Create a new user in the database with the validated data

        $token = $user->createToken('main')->plainTextToken; // Create a new API token for the user

        return response([
            'user' => $user,
            'token' => $token
        ]); // Return the user and their token as a response
    }

    // Handles the login process for users.
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) { // Attempt to authenticate the user with the provided credentials
            return response([
                'message' => 'Email or Password is incorrect' // If unsuccessful, return an error message
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user(); // Get the currently authenticated user
        $token = $user->createToken('main')->plainTextToken; // Create a new API token for the user

        return response([
            'user' => $user,
            'token' => $token
        ]); // Return the user and their token as a response
    }

    // Handles the logout process for users.
    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user(); // Get the currently authenticated user.
        $user->currentAccessToken()->delete(); // Delete the user's current API token.
        return response('', 204); // Return a 'No Content' HTTP status code.
    }
}
