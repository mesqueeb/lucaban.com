<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class viewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', [
            'except'=>['index','indexJA'],
        ]);
    }
    public function index()
    {
        \App::setLocale('en');
        view()->share('currentLanguage', 'en');
        return view('layouts.welcome');
    }
    public function indexJA()
    {
        \App::setLocale('ja');
        view()->share('currentLanguage', 'ja');
        return view('layouts.welcome');
    }
    public function items()
    {
    	$tags = \App\Item::existingTags();
		return view('items.index')->with('tags',$tags);
    }
    public function itemsJA()
    {
        $tags = \App\Item::existingTags();
        return view('items.index')->with('tags',$tags);
    }
}
