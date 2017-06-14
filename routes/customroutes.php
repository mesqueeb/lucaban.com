<?php

Route::domain('api'.env('SESSION_DOMAIN'))
	->middleware(['cors','api'])
	->post('auth','AuthenticateController@authenticate');
// Cors patches
Route::domain('api'.env('SESSION_DOMAIN'))
	->options('auth','CORSHelperController@handleCORS');
Route::domain('api'.env('SESSION_DOMAIN'))
	->options('items','CORSHelperController@handleCORS');

Route::domain('listo'.env('SESSION_DOMAIN'))
	->middleware(['web','auth'])
	->get('/', 'ViewController@items')
	->name('listo.index');