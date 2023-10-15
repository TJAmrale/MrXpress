<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use Illuminate\Http\Response;
use App\Http\Resources\BrandResource; 

class BrandController extends Controller
{
    /**
     * Display a listing of brands.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brand = Brand::select('brand_id','brand_name', 'created_at', 'updated_at')->get();

        return BrandResource::collection($brand);
    }

    /**
     * Store a newly created brand in storage.
     *
     * @param  \App\Http\Requests\StoreBrandRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBrandRequest $request)
    {
        // Validate and fetch the data from the request
        $data = $request->validated();
        
        // Create a new brand and save to the database
        $brand = Brand::create($data);

        // Return the new brand resource with a 201 status code
        return response(new BrandResource($brand), 201);
    }

    /**
     * Display the specified brand.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand)
    {
        return new BrandResource($brand);
    }

    /**
     * Update the specified brand in storage.
     *
     * @param  \App\Http\Requests\StoreBrandRequest  $request
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        // Validate and fetch the data from the request
        $data = $request->validated();

        // Update the brand record
        $brand->update($data);

        // Return the updated BrandResource
        return new BrandResource($brand);
    }

    /**
     * Remove the specified brand from storage.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Brand $brand)
    {
        // Delete the brand
        $brand->delete();


        // Return a 204 No Content status code
        return response("", 204);
    }
    public function restore(Brand $brand)
    {
        // restore the brand
        $brand->restore();
        // Return a 204 No Content status code
        return response("", 204);
    }
}
