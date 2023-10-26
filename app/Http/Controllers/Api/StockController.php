<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stock; 
use App\Models\StockAudit;
use App\Http\Requests\StoreStockRequest; 
use App\Http\Requests\UpdateStockRequest; 
use App\Http\Resources\StockResource; 

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all stock, ordered by ID in descending order
        //$stock = Stock::query()->orderBy('stock_id', 'desc')->get();

     
        
        $stocks = Stock::with(['device', 'item', 'device.brand', 'device.series'])
        ->orderBy('stock_id', 'desc')
        ->paginate(10);

return StockResource::collection($stocks);

        //return StockResource::collection($stock);
        // Convert the collection of stock to StockResource and return
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockRequest $request)
    {
        // Validate and fetch the data from the request
        $data = $request->validated();
        // Create a new stock and save to database
        $stock = Stock::create($data);
        // Return the new stock resource with a 201 status code
        return response(new StockResource($stock), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
{
    $stock->load('device', 'item', 'device.brand', 'device.series');


    return new StockResource($stock);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequest $request, Stock $stock)
    {
        // Validate and fetch the data from the request
        $data = $request->validated();
        // Update the stock record
        $stock->update($data);
        // Return the updated StockResource
        return new StockResource($stock);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        // Delete the stock
        $stock->delete();
        // Return a 204 No Content status code
        return response("", 204);
    }

    public function restore(Stock $stock)
    {
        // restore the stock
        $stock->restore();
        // Return a 204 No Content status code
        return response("", 204);
    }

    public function changes() {
       $changes = StockAudit::all(); 
       return response()->json($changes);
    }


}
