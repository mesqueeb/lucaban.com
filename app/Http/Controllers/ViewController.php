<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class viewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        return view('home');
    }
    public function items()
    {
    	$tags = \App\Item::existingTags();
		return view('items.index')->with('tags',$tags);
    }
}
