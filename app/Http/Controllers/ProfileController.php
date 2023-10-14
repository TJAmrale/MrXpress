<?php

namespace App\Http\Controllers;

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

    public function update(Request $request, $user_id)
    {
        // Validate the request data
        $request->validate([
            'name' => 'string',
            'email' => 'email',
            'phone' => 'string',
            'address' => 'string',
            'dob' => 'date',
        ]);

        // Retrieve the user to update
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Update the user's profile based on the provided data
        if ($request->has('name')) {
            $user->name = $request->input('name');
        }

        if ($request->has('email')) {
            $user->email = $request->input('email');
        }

        if ($request->has('phone')) {
            $user->phone = $request->input('phone');
        }

        if ($request->has('address')) {
            $user->address = $request->input('address');
        }

        if ($request->has('dob')) {
            $user->dob = $request->input('dob');
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully'], 200);
    }
}
