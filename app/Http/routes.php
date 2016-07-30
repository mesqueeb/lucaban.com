<?php
Route::auth();
////////////////////////////////////////////////
Route::get('/', function () {
    return view('welcome');
});
Route::get('/home', 'HomeController@index');
////////////////////////////////////////////////
Route::get('/things',function(){
	return view('things.index');
});
Route::post('/api/things/fetchTreeMetaFlat','ThingsPanelController@fetchTreeMetaFlat');
Route::patch('/api/things/{id}/indent','ThingsPanelController@indent');
Route::resource('/api/things','ThingsPanelController');
////////////////////////////////////////////////
Route::get('/playground',function(){
	return view('playground.index');
});