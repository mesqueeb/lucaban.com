<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(
[
	'prefix' => LaravelLocalization::setLocale(),
	'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]
],
function()
{
	/** ADD ALL LOCALIZED ROUTES INSIDE THIS GROUP **/
	Auth::routes();
	Route::get('/', ['uses' => 'ViewController@index'])->name('home');
	Route::get('/home', ['as' => 'home', 'uses' => 'ViewController@index']);
});

Route::get('/items', ['as' => 'items', 'uses' => 'ViewController@items']);
Route::get('/ja/items', ['as' => 'items', 'uses' => "ViewController@itemsJA"]);
////////////////////////////////////////////////
Route::get('/api/items/fetchdone','CardController@getDone');
Route::post('/api/itemtags/fetchTagged','ItemTagController@fetchTagged');
Route::resource('/api/items','CardController');
Route::resource('/api/itemtags','ItemTagController');
////////////////////////////////////////////////
