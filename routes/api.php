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

Route::get('user','AuthenticateController@getAuthenticatedUser');

Route::patch('items/bulkPatch','CardController@bulk_patch_items');
Route::patch('items/bulkDestroy','CardController@bulk_destroy');
Route::get('items/fetchdone','CardController@getDone');
Route::resource('items','CardController');

Route::post('itemtags/fetchTagged','ItemTagController@fetchTagged');
Route::patch('itemtags/bulkTag','ItemTagController@bulk_tag');
Route::get('allTags','ItemTagController@index');
Route::resource('itemtags','ItemTagController');
