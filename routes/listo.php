<?php

use Illuminate\Http\Request;

// Route::get('login',[]);

Route::group([
	'middleware' => 'auth',
],function($router){

	Route::get('/', ['as' => 'listo', 'uses' => 'ViewController@items']);

});