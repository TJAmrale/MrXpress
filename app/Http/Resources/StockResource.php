<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
{
    public static $wrap = false;
    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'stock_id' => $this->stock_id,
            'device_id' => $this->device_id,
            'device' => [
                'model' => $this->device->model,
                'color' => $this->device->colours, // Added color
                'brand' => [
                    'brand_name' => optional($this->device->brand)->brand_name,
                ],
                'series' => [
                    'series_name' => optional($this->device->series)->series_name,
                ],
            ],
            'item_id' => $this->item_id,
            'item' => [
                'item_name' => optional($this->item)->item_name,
                'item_type' => optional($this->item)->item_type, // Added item type
            ],
            'buy_price' => $this->buy_price,
            'wholesale_price' => $this->wholesale_price,
            'retail_price' => $this->retail_price,
            'quantity' => $this->quantity,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => optional($this->updated_at)->format('Y-m-d H:i:s'),
            'deleted_at' => optional($this->deleted_at)->format('Y-m-d H:i:s'),
        ];
    
        
    }
}