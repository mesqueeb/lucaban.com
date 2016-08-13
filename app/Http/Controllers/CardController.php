<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Item;
use DB;
use Illuminate\Http\Response;


class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $god = Item::where('parent_id', null)->first();
        if(!$god){
            return Item::create(['body' => 'ALL', 'id' => '1', 'depth' => '0']);
        }
        return Item::orderBy('depth', 'asc')->get();
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
        return Item::create($request->all());
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
        return Item::findOrFail($id);
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
        Item::findOrFail($id)->update(request()->all());
        return response()->json($request->all());
    }

    public function makeChildOf(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $target_id = request()->target_id;
        return $item->makeChildOf($target_id);
    }
    public function makeSiblingOf($id)
    {
        $item = Item::findOrFail($id);
        $target_id = $item->parent()->first()->id;
        return $item->makeSiblingOf($target_id);
    }
    public function Item(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $direction = request()->direction;
        if($direction=='up'){
            return $item->moveLeft();
        } else if ($direction=='down'){
            return $item->moveRight();
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
        Item::findOrFail($id)->delete();
    }
}
