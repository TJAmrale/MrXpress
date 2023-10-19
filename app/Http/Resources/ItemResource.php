<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    public static $wrap = false;
    
    /**
     * Transform the resource into an array.
     *
     * 
     * @return array<string, mixed>
     */


    public function toArray($request): array
    {
        return [
            'item_id' => $this->item_id,
            'item_name' => $this->item_name,
            'item_type' => $this->item_type,
            'description' => $this->description,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => optional($this->updated_at)->format('Y-m-d H:i:s'),
            'deleted_at' => optional($this->deleted_at)->format('Y-m-d H:i:s'),
        ];
    }
}
