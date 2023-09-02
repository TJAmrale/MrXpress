<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $user = User::query()->orderBy('id', 'desc')->paginate(10); // Fetch users, using pagination (10 users per page)
        $user = User::query()->orderBy('id', 'desc')->get(); // Fetch all users, ordered by ID in descending order
        return UserResource::collection($user); // Convert the collection of users to UserResource and return
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated(); // Validate and fetch the data from the request
        $data['password'] = bcrypt($data['password']); // Hash the user password
        $user = User::create($data); // Create a new user and save to database
        return response(new UserResource($user), 201); // Return the new user resource with a 201 status code
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);  // Return a single UserResource
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated(); // Validate and fetch the data from the request
        $password = $data['password']; // Check if password is provided for update
        if (isset($password)) {
            $data['password'] = bcrypt($password);
        }
        $user->update($data); // Update the user record
        return new UserResource($user); // Return the updated UserResource
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete(); // Delete the user
        return response("", 204); // Return a 204 No Content status code
    }
}
