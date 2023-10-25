<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use App\Models\User;

class ProfileController extends Controller
{
    public function show($user_id)
    {
        // Retrieve user data based on the provided user ID
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['user' => $user], 200);
    }

    public function update(UpdateProfileRequest $request, $user_id)
    {
        // Retrieve the user to update
    $user = User::find($user_id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    // Update the user's profile based on the provided data
    $user->name = $request->input('name');
    $user->email = $request->input('email');
    $user->phone = $request->input('phone');
    $user->address = $request->input('address');
    $user->dob = $request->input('dob');

    $user->save();

    return response()->json(['message' => 'Profile updated successfully'], 200);
    }
}