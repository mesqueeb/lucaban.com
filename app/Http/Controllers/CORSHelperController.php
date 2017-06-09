<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CORSHelperController extends Controller
{
	public function __construct(){
		$this->middleware('subdomainCORS');
	}
	public function handleCORS(){
		return response('',200);
	}
}
