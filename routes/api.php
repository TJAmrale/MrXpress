<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\Api\DeviceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    
    // Routes for Booking
    Route::post('/book-repair', [BookingController::class, 'store']);
    Route::post('/confirm-repair', [BookingController::class, 'confirm']);
    Route::get('/get-job-cost/{job_id}', [BookingController::class, 'getJobCost']);

    // Route::get('/stocks', [App\Http\Controllers\Api\StockController::class, 'index']);
    Route::apiResource('/stock', StockController::class);

    Route::apiResource('/device', DeviceController::class);

    // routes/api.php

    Route::get('/stock/{stock_id}', 'StockController@show');

    Route::get('/brands', 'Api\BrandController@index');
    Route::get('/devices/models', 'Api\ModelController@index');  // or some method to get distinct models
    Route::get('/devices/colours', 'Api\ColourController@index');  // or a method to get distinct colours
    Route::get('/items/types', 'Api\ItemTypeController@index');  // or a method to get distinct item types
    Route::get('/series', 'Api\SeriesController@index');
    
    



    
    // Route for Booking
    Route::post('/book-repair', [BookingController::class, 'store']);
    Route::post('/confirm-repair', [BookingController::class, 'confirm']);



    // Routes for Stripe
    Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);
    Route::post('/verify-payment', [StripeController::class, 'verifyPayment']);
});

// Routes to register a new user or login a user, doesn't require authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


