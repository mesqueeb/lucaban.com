<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class viewController extends Controller
{
    public function __construct()
    {
    }
    public function index()
    {
        return view('layouts.lp');
    }
    public function items()
    {

        return view('items.index');
    }
    public function listo()
    {
        // return view('listo');
        // return \View::make('listo');
        return \File::get(public_path() . '/listo.html');
    }
    public function controlPanel()
    {
    	return view('userarea.controlpanel');
    }

}
