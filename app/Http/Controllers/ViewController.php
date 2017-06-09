<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class viewController extends Controller
{
    public function __construct()
    {
        //dd(Auth::check());
        // $this->middleware('auth');
        
    }
    public function index()
    {
        return view('layouts.lp');
    }
    public function items()
    {
        return view('items.index');
    }    
    public function controlPanel()
    {
    	return view('userarea.controlpanel');
    }

}
