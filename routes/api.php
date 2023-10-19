<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\testcontroller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes that require authentication using Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Route to fetch authenticated user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Route to logout authenticated user
    Route::post('logout', [AuthController::class, 'logout']);

    // RESTful resource routes for User, includes routes like GET /users, POST /users, etc.
    Route::apiResource('/users', UserController::class);
    
    // 
    Route::post('/book-repair', [BookingController::class, 'store']);

    Route::put('/profile/edit/{user_id}', [ProfileController::class, 'update']);
    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{job_id}', [JobController::class, 'show']);
    Route::get('/jobs?customer_id={user_id}', [JobController::class, 'show']);
});

// Route to register a new user or login a user, doesn't require authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::put('/profile/edit/{user_id}', [ProfileController::class, 'update']);
Route::get('/profile/edit/{user_id}', [ProfileController::class, 'show']);
Route::get('/jobs', [JobController::class, 'index']);

