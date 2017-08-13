<?php

Route::domain('api'.env('SESSION_DOMAIN'))
	->middleware(['cors','api'])
	->group(function () {
		Route::post('auth','AuthenticateController@login');
		Route::post('register','AuthenticateController@register');
		Route::post('logout','AuthenticateController@logout');
		Route::post('refreshToken','AuthenticateController@refreshToken');
});
// Cors patches
Route::domain('api'.env('SESSION_DOMAIN'))
	->group(function () {
		Route::options('auth','CORSHelperController@handleCORS');
		Route::options('register','CORSHelperController@handleCORS');
		Route::options('logout','CORSHelperController@handleCORS');
		Route::options('items','CORSHelperController@handleCORS');
		Route::options('refreshToken','CORSHelperController@handleCORS');
});

Route::domain('listo'.env('SESSION_DOMAIN'))
	->get('/', 'ViewController@listo')
	->name('listo.index');
	// ->middleware(['web'])