<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeviceResource extends JsonResource
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
            'device_id' => $this->device_id,
            'brand_id' =>$this->brand_id,
            'series_id' =>$this->series_id,
            'model' => $this->model,
            'colour' => $this->colours,
            'brand' => [
                
                'brand_name' => optional($this->brand)->brand_name,
            ],
            'series' => [
                'series_name' => optional($this->series)->series_name,
            ],
            // If there are related fields similar to 'item' in the device model, add them here.
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => optional($this->updated_at)->format('Y-m-d H:i:s'),
            'deleted_at' => optional($this->deleted_at)->format('Y-m-d H:i:s'),
        ];
    }
}
