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

Auth::routes();
Route::get('/', ['uses' => 'ViewController@index'])->name('en.home');
Route::get('/ja', ['uses' => 'ViewController@indexJA'])->name('ja.home');
Route::get('/home', ['as' => 'home', 'uses' => 'ViewController@index']);
Route::get('/items', ['as' => 'items', 'uses' => 'ViewController@items']);
Route::get('/ja/items', ['as' => 'items', 'uses' => 'ViewController@itemsJA']);
// Codementor ↑ what's this?

////////////////////////////////////////////////
Route::get('/api/items/fetchdone','CardController@getDone');
Route::post('/api/itemtags/fetchTagged','ItemTagController@fetchTagged');
Route::resource('/api/items','CardController');
Route::resource('/api/itemtags','ItemTagController');
////////////////////////////////////////////////
