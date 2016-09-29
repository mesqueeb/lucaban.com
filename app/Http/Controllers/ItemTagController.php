<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Item;


class ItemTagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Item::existingTags();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if($request['type'] == 'tagNames'){
            return Item::findOrFail($id)->tagNames();
        }
        if($request['type'] == 'withAnyTag'){
            return Item::withAnyTag($request['request'])->get(); // fetch articles with any tag listed
        }
        if($request['type'] == 'withAllTags'){
            return Item::withAllTags($request['request'])->get(); // only fetch articles with all the tags
        }
    }
    public function fetchTagged(Request $request)
    {
        if($request['type'] == 'withAnyTag'){
            return Item::withAnyTag($request['request'])->get(); // fetch articles with any tag listed
        }
        if($request['type'] == 'withAllTags'){
            return Item::withAllTags($request['request'])->get(); // only fetch articles with all the tags
        }
        if($request['type'] == 'tagNames'){
            return Item::findOrFail($id)->tagNames();
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($request['type'] == 'tag'){
            Item::findOrFail($id)->tag($request['request']); // attach the tag
        }
        if ($request['type'] == 'untag'){
            Item::findOrFail($id)->untag($request['request']); // attach the tag
        }
        if ($request['type'] == 'retag'){
            Item::findOrFail($id)->retag($request['request']); // attach the tag
        }
        return response()->json($request->all());
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
