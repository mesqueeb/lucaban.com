<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Item;
use App\User;
use DB;
use Illuminate\Http\Response;
use Carbon\Carbon;

class CardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userId = auth()->id();
        $god = User::find($userId)->items()
            ->where('parent_id',NULL)
            ->where('created_by',$userId)
            ->where('depth',0)
            ->first();
        if (!$god)
        {
            $firstItem = Item::create(
                ['body' => 'ALL',
                'created_by' => $userId,
                'depth' => 0]);
            $firstItem->users()->attach($userId);
            $firstItem['children'] = [];
            return [$firstItem];
        }
        return Item::UserItems()
            ->where('done',0)
            ->orWhere('done',NULL)
            ->orWhere(function($query)
            {
                $query->UserItems()
                ->where('done_date', '>', Carbon::now()->subHour(16));
            })
            ->with('users')
            ->with('tagged')
            ->orderBy('depth', 'asc')
            ->get()->all();
    }

    public function getDone()
    {
        $doneItems = Item::UserItems()
                        ->with('tagged')
                        ->where('done',1)
                        ->orderBy('done_date', 'desc')
                        ->get()->all();
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
        $payload = request()->all();
        Item::findOrFail($id)->update($payload);
        return response()->json($payload);
    }
    public function bulk_patch_items(Request $request) // needs to be an array
    {
        $payload = request()->all();
        foreach ($payload as $item) {
            Item::findOrFail($item['id'])->update($item);
        }
        return response()->json($payload);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->users()->detach(auth()->id());
        $item->delete();
    }
    public function bulk_destroy(Request $request)
    {
        $payload = request()->all();
        foreach ($payload as $id)
        {
            $item = Item::findOrFail($id);
            $item->users()->detach(auth()->id());
            $item->delete();
        }
    }
}
