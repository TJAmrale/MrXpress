<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSeriesRequest;
use App\Http\Requests\UpdateSeriesRequest;
use App\Models\Series;
use Illuminate\Http\Response;
use App\Http\Resources\SeriesResource; 

class SeriesController extends Controller
{
    /**
     * Display a listing of series.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $series = Series::select('series_id','series_name', 'created_at', 'updated_at')->get();

        return SeriesResource::collection($series);
    }

    /**
     * Store a newly created series in storage.
     *
     * @param  \App\Http\Requests\StoreSeriesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSeriesRequest $request)
    {
        // Validate and fetch the data from the request
        $data = $request->validated();
        
        // Create a new series and save to the database
        $series = Series::create($data);

        // Return the new series resource with a 201 status code
        return response(new SeriesResource($series), 201);
    }

    /**
     * Display the specified series.
     *
     * @param  \App\Models\series  $series
     * @return \Illuminate\Http\Response
     */
    public function show(Series $series)
    {
        return new SeriesResource($series);
    }

    /**
     * Update the specified series in storage.
     *
     * @param  \App\Http\Requests\StoreSeriesRequest  $request
     * @param  \App\Models\series  $series
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSeriesRequest $request, Series $series)
    {
        // Validate and fetch the data from the request
        $data = $request->validated();

        // Update the series record
        $series->update($data);

        // Return the updated SeriesResource
        return new SeriesResource($series);
    }

    /**
     * Remove the specified series from storage.
     *
     * @param  \App\Models\series  $series
     * @return \Illuminate\Http\Response
     */
    public function destroy(Series $series)
    {
        // Delete the series
        $series->delete();


        // Return a 204 No Content status code
        return response("", 204);
    }
    public function restore(Series $series)
    {
        // restore the series
        $series->restore();
        // Return a 204 No Content status code
        return response("", 204);
    }
}
