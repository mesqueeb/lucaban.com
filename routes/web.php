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
Route::get('/', ['as' => 'home', 'uses' => 'ViewController@index'])->name('home');
Route::get('/home', ['as' => 'home', 'uses' => 'ViewController@index']);
Route::get('/items', ['as' => 'items', 'uses' => 'ViewController@items']);
// Codementor ↑ what's this?

////////////////////////////////////////////////
Route::get('/api/items/fetchdone','CardController@getDone');
Route::post('/api/itemtags/fetchTagged','ItemTagController@fetchTagged');
Route::resource('/api/items','CardController');
Route::resource('/api/itemtags','ItemTagController');
////////////////////////////////////////////////
