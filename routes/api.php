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

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/items/fetchdone','CardController@getDone');
Route::post('/itemtags/fetchTagged','ItemTagController@fetchTagged');
Route::resource('/items','CardController');
Route::options('/items',['uses' => 'CORSHelperController@handleCORS']);
Route::resource('/itemtags','ItemTagController');

// http://api.example.com/listo/tasks
// http://listo.example.com/

// Route::group([
// 	'middleware' => 'auth:api',
// 	'domain' => 'api'.env('SESSION_DOMAIN'),
// ], function(){
// 	Route::group([
// 		'prefix' => 'listo',
// 	], function(){
		
// 	});
// });