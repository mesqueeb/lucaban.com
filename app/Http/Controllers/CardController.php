<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Item;
use DB;
use Illuminate\Http\Response;
use Carbon\Carbon;

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
        return Item::with('tagged')
            ->where('done',0)
            ->orWhere('done_date', '>', Carbon::now()->subHour(18))
            ->orderBy('depth', 'asc')
            ->get();
    }

    public function getDone()
    {
        // return $tags;
        // if($tags){
        //     $doneItems = Item::withAnyTag($tags)
        //                 ->with('tagged')
        //                 ->where('done',1)
        //                 ->orderBy('done_date', 'desc')
        //                 ->get();
        // }
        $doneItems = Item::with('tagged')
                        ->where('done',1)
                        ->orderBy('done_date', 'desc')
                        ->get();
        return $doneItems;
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
        // return var_dump($request->all());
        return Item::saveItemTree($request->all());
        
        // return Item::saveTaskTree($taskData);
        if (is_array ($request->input('newItemArray'))){
            $all = [];
            foreach ($request->input('newItemArray') as $item)
            {
                $a = Item::create($item);
                array_push($all,$a);
            }
            return $all;
        }
        $a = Item::create($request->all());
        // print($a);
        return $a["id"];
        // TODO:      moveToRightOf($otherNode)!!!
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        return Item::with('tagged')->findOrFail($id);
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
