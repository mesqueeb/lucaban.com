<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Thing;
use DB;
use Illuminate\Http\Response;


class ThingsPanelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $god = Thing::where('parent_id', null)->first();
        if(!$god){
            return Thing::create(['body' => 'ALL', 'id' => '1']);
        }
        return Thing::get();
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
        return Thing::where('parent_id', request()->parent_id)->first()->children()->create($request->all());
        // TODO:      moveToRightOf($otherNode)!!!
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Thing::findOrFail($id);
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
        Thing::findOrFail($id)->update(request()->all());
        return response()->json($request->all());
    }

    public function makeChildOf(Request $request, $id)
    {
        $thing = Thing::findOrFail($id);
        $target_id = request()->target_id;
        return $thing->makeChildOf($target_id);
    }
    public function makeSiblingOf($id)
    {
        $thing = Thing::findOrFail($id);
        $target_id = $thing->parent()->first()->id;
        return $thing->makeSiblingOf($target_id);
    }
    public function moveThing(Request $request, $id)
    {
        $thing = Thing::findOrFail($id);
        $direction = request()->direction;
        if($direction=='up'){
            return $thing->moveLeft();
        } else if ($direction=='down'){
            return $thing->moveRight();
        }
    }

        



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Thing::findOrFail($id)->delete();
    }
}
