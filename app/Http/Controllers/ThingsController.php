<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Thing;
use DB;

class ThingsController extends Controller
{
	public function index()
	{
		$things = DB::table('things')->get();
        //return view ('things.index');
        return view('things.index', [
        	'things' => $things,
        ]);
	}
    public function getAllThings()
    {
        $things = DB::table('things')->get();
        return $things;
    }
    public function markThingDone(App\Thing $thing)
    {
        $thing->delete();
    }

    public function add(){
		$request = request()->all();
    	$validator = \Validator::make($request, [
    		'body' => 'required|max:255',
    	]);
    	if ($validator->fails()) {
    		return back()->withInput()->withErrors($validator);
    	}
    	
    	$thing = new Thing;
    	$thing->body = request()->body;
    	$thing->save();
    	return back();
    }
}
