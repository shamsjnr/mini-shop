<?php

namespace App\Http\Controllers;

use App\Models\DataPricing;
use App\Http\Requests\StoreDataPricingRequest;
use App\Http\Requests\UpdateDataPricingRequest;
use App\Models\Isp;
use Inertia\Inertia;

class DataPricingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($isp = '')
    {
        if ($isp) {
            $isp = Isp::where('name', $isp)->first()?->id;
            abort_if( ! $isp, 404); // Return a 404 if the reverse lookup fails for ISP
        }

        $data = [
            'plans' => ( ! $isp) ? DataPricing::with('isp')->get() : DataPricing::where('isp_id', $isp)->with('isp')->get(),
            'isps' => Isp::orderBy('id')->get(),
        ];

        return Inertia::render('Admin/DataPlans', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDataPricingRequest $request)
    {
        $isp = Isp::where('name', $request->isp)->first()->id; // No need to validate as StoreDataPricingRequest already affirms its existence in the DB...
        $term = explode(' ', $request->input('term'))[0];

        $check = DataPricing::where([['name', $request->name], ['term', $term], ['isp_id', $isp]])->first();
        if ($check) {
            return back()->withErrors(['message'=>'Pricing already exist']);
        }

        $price = new DataPricing;
        $price->isp_id = $isp;
        $price->name = $request->input('name');
        $price->term = $term;
        $price->price = $request->input('price');
        $price->save();

        return back()->with('success', 'Pricing saved!');
    }

    /**
     * Display the specified resource.
     */
    public function show(DataPricing $dataPricing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataPricing $dataPricing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreDataPricingRequest $request, DataPricing $pricing)
    {
        $isp = Isp::where('name', $request->isp)->first()->id;
        $term = explode(' ', $request->input('term'))[0];

        $check = DataPricing::where([['name', $request->name], ['term', $term], ['isp_id', $isp]])->whereNot('id', $pricing->id)->first();
        if ($check) {
            return back()->withErrors(['message'=>'Pricing already exist']);
        }

        $pricing->isp_id = $isp;
        $pricing->name = $request->name;
        $pricing->term = $term;
        $pricing->price = $request->price;
        $pricing->discount = $request->discount;
        $pricing->save();

        return back()->with('success', 'Pricing updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataPricing $pricing)
    {
        $pricing->delete();
        return back()->with('success', 'Data removed!');
    }
}
