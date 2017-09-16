<?php
Route::domain('api.'.env('APP_URLBASE'))
	->middleware(['cors','api'])
	->group(function () {
		Route::post('auth','AuthenticateController@login');
		Route::post('register','AuthenticateController@register');
		Route::post('logout','AuthenticateController@logout');
		Route::post('refreshToken','AuthenticateController@refreshToken');
});
// Cors patches
Route::domain('api.'.env('APP_URLBASE'))
	->group(function () {
		Route::options('auth','CORSHelperController@handleCORS');
		Route::options('register','CORSHelperController@handleCORS');
		Route::options('logout','CORSHelperController@handleCORS');
		Route::options('items','CORSHelperController@handleCORS');
		Route::options('refreshToken','CORSHelperController@handleCORS');
});
// Cors patches
Route::prefix('api')
	->group(function () {
		Route::options('auth','CORSHelperController@handleCORS');
		Route::options('register','CORSHelperController@handleCORS');
		Route::options('logout','CORSHelperController@handleCORS');
		Route::options('items','CORSHelperController@handleCORS');
		Route::options('refreshToken','CORSHelperController@handleCORS');
});

Route::domain('listo.'.env('APP_URLBASE'))
->get('/', function () {
	return redirect(env('APP_SCHEME').'listo.'.env('APP_URLBASE'));
})->name('listo');
