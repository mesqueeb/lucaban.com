<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class viewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', [
            'except'=>'index',
        ]);
    }
    public function index()
    {
        return view('layouts.welcome');
    }
    public function items()
    {
    	$tags = \App\Item::existingTags();
		return view('items.index')->with('tags',$tags);
    }
}
