<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('items/fetchdone','CardController@getDone');
Route::post('itemtags/fetchTagged','ItemTagController@fetchTagged');
Route::resource('items','CardController');
Route::resource('itemtags','ItemTagController');
Route::get('user','AuthenticateController@getAuthenticatedUser');
Route::get('allTags','ItemTagController@index');
