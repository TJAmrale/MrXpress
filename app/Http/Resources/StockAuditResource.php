<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StockAuditResource extends JsonResource
{
    public static $wrap = false;
    
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'stock_audit_id' => $this->stock_audit_id,
            'stock_id' => $this->stock_id,
            'user_id' => $this->user_id,
            'changes' => json_encode(json_decode($this->changes, true), JSON_PRETTY_PRINT),

            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => optional($this->updated_at)->format('Y-m-d H:i:s'),
        ];
    }
}
