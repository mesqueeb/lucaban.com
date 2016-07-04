<?php

Route::get('/', function () {
    return view('welcome');
});

Route::auth();

Route::get('/home', 'HomeController@index');

Route::get('/things','ThingsController@index');
Route::post('/things/add','ThingsController@add');
Route::get('/playground',function(){
	return view('playground.index');
});