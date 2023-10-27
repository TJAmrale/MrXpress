<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\ModelController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\SeriesController;
use App\Http\Controllers\Api\StockAuditController;
use App\Http\Controllers\RepairSelectController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\Api\DeviceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;

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

    Route::get('/get-customer-details/{job_id}', [BookingController::class, 'getCustomerDetails']);


    // Route to logout authenticated user
    Route::post('logout', [AuthController::class, 'logout']);

    // RESTful resource routes for User, includes routes like GET /users, POST /users, etc.
    Route::apiResource('/users', UserController::class);

    // Routes for Booking
    Route::post('/book-repair', [BookingController::class, 'store']);
    Route::post('/confirm-repair', [BookingController::class, 'confirm']);
    Route::get('/get-job-cost/{job_id}', [BookingController::class, 'getJobCost']);
    Route::get('/sort-jobs/{status}/{technician_id}', [BookingController::class, 'sortJobStatus']);
    Route::get('/sort-jobs/{status}', [BookingController::class, 'sortJobStatus']);

    Route::put('/jobs/assign/{job_id}/{technician_id}', [BookingController::class, 'updateTechnicianId']);
    Route::put('jobs/complete/{job_id}', [BookingController::class, 'completeJob']);


    //Customer
    Route::get('/jobs/sort/{status}/{customer_id}', [JobController::class, 'CsortJobStatus']);
    Route::put('/job/cancel/{job_id}', [JobController::class, 'cancelJob']);
    Route::put('/job/cancel-accepted/{job_id}', [JobController::class, 'cancelAcceptedJob']);

    Route::post('/storeTechnicianRating', [JobController::class, 'storeTechnicianRating']);
    Route::post('/storeCustomerRating', [JobController::class, 'storeCustomerRating']);





    Route::apiResource('/stock', StockController::class);

    Route::apiResource('/device', DeviceController::class);

    Route::apiResource('/item', ItemController::class);

    Route::apiResource('/brand', BrandController::class);
    Route::apiResource('/series', SeriesController::class);

    Route::apiResource('stock-audits', StockAuditController::class);



    // routes/api.php

    Route::get('/stock/{stock_id}', StockController::class . '@show');


    Route::get('/brands', [BrandController::class, 'index']);
    Route::get('/device-info', [ModelController::class, 'index']);
    Route::get('/devices/models', [ModelController::class, 'index']);
    Route::get('/devices/colours', [ColourController::class, 'index']);
    Route::get('/items-stock', [ItemController::class, 'getItems']);

    Route::get('/series', [SeriesController::class, 'index']);

    // Fetch Brands
    Route::get('/brands', [DeviceController::class, 'getBrands']);

    // Fetch Series
    Route::get('/series-stock', [DeviceController::class, 'getSeries']);

    // Fetch stock for audit
    Route::get('/stock-changes', [StockController::class, 'changes']);

    // Route for RepairSelect
    Route::get('/repair-select-brands', [RepairSelectController::class, 'brands']);
    Route::get('/repair-select-series', [RepairSelectController::class, 'series']);
    Route::get('/repair-select-models', [RepairSelectController::class, 'models']);
    Route::get('/repair-select-colours', [RepairSelectController::class, 'colours']);
    Route::get('/repair-select-repairtype', [RepairSelectController::class, 'repairtype']);
    Route::get('/repair-select-accessories', [RepairSelectController::class, 'accessories']);

    // Routes for Stripe
    Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);
    Route::post('/verify-payment', [StripeController::class, 'verifyPayment']);

    //profile
    Route::put('/profile/edit/{user_id}', [ProfileController::class, 'update']);
    Route::get('/profile/ratings/{type}/{user_id}', [ProfileController::class, 'getRatings']);



    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{job_id}', [JobController::class, 'show']);
    Route::get('/jobs?customer_id={user_id}', [JobController::class, 'show']);
});

// Routes to register a new user or login a user, doesn't require authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
