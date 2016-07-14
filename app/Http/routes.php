<?php
Route::auth();
////////////////////////////////////////////////
Route::get('/', function () {
    return view('welcome');
});
Route::get('/home', 'HomeController@index');
////////////////////////////////////////////////
Route::get('/things',function(){
	return view('things.index');
});
Route::resource('/api/things','ThingsPanelController');
////////////////////////////////////////////////
Route::get('/playground',function(){
	return view('playground.index');
});