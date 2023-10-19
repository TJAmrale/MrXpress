<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource; 

class ItemController extends Controller
{
    /**
     * Display a listing of the items.
     */
    public function index()
    {
        $item = Item::select('item_id','item_type', 'item_name', 'created_at', 'updated_at', 'description')->get();


        // Convert the collection of items to ItemResource and return
        return ItemResource::collection($item);
    }

    /**
     * Store a newly created item in storage.
     */
    public function store(StoreItemRequest $request)
    {
        // Validate and fetch the data from the request
        $data = $request->validated();
        
        // Create a new item and save to the database
        $item = Item::create($data);

        // Return the new item resource with a 201 status code
        return response(new ItemResource($item), 201);
    }

    /**
     * Display the specified item.
     */
    public function show(Item $item)
    {
        return new ItemResource($item);
    }

    /**
     * Update the specified item in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        // Validate and fetch the data from the request
        $data = $request->validated();

        // Update the item record
        $item->update($data);

        // Return the updated ItemResource
        return new ItemResource($item);
    }

    /**
     * Remove the specified item from storage.
     */
    public function destroy(Item $item)
    {
        // Delete the item
        $item->delete();


        // Return a 204 No Content status code
        return response("", 204);
    }

    public function restore(item $item)
    {
        // restore the item
        $item->restore();
        // Return a 204 No Content status code
        return response("", 204);
    }
   
    public function getItems() {
        return Item::select('item_id','item_type',  'item_name', 'description')->get();
    }


}
