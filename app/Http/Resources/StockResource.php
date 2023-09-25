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
            'part_id' => $this->part_id,
            'buy_price' => $this->buy_price,
            'wholesale_price' => $this->wholesale_price,
            'retail_price' => $this->retail_price,
            'quantity' => $this->quantity,
            'created_at' => $this->created_at->format('Y-m-d H:i:s')
        ];
    }
}