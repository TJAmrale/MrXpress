<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Brand;
use App\Models\Series;
use App\Models\Device;
use Illuminate\Support\Facades\DB;

class ImportMobileDevices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    // protected $signature = 'app:import-mobile-devices';
    protected $signature = 'import:mobile-devices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import mobile devices from a CSV file into the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Read the CSV file
        $csvFile = storage_path('sample_100_mobile_devices_v1.csv');
        $rows = array_map('str_getcsv', file($csvFile));
        $header = array_shift($rows);

        // List of common device colors
        $colors_list = [
            "Black", "White", "Blue", "Red", "Green", "Gold", "Silver", "Space Gray", "Midnight Green", "Rose Gold"
        ];

        // Begin a transaction
        DB::beginTransaction();

        try {
            foreach ($rows as $row) {
                $row = array_combine($header, $row);

                // Assign a random color to each device
                $row['colours'] = $colors_list[array_rand($colors_list)];
                
                // Insert or get existing brand
                $brand = Brand::firstOrCreate(['brand_name' => $row['brand']]);

                // Insert or get existing series
                $series = Series::firstOrCreate(['series_name' => $row['series']]);

                // Insert device
                $device = new Device();
                $device->brand_id = $brand->brand_id;
                $device->series_id = $series->series_id;
                $device->model = $row['model'];
                $device->colours = $row['colours'];
                $device->save();
            }

            // Commit the transaction
            DB::commit();
        } catch (\Exception $e) {
            // Rollback the transaction in case of errors
            DB::rollback();
            echo "Failed to insert data: " . $e->getMessage();
        }
    }
}
