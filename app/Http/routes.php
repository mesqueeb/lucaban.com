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
Route::patch('/api/things/{id}/makeChildOf','ThingsPanelController@makeChildOf');
Route::patch('/api/things/{id}/makeSiblingOf','ThingsPanelController@makeSiblingOf');
Route::patch('/api/things/{id}/moveThing','ThingsPanelController@moveThing');
Route::resource('/api/things','ThingsPanelController');
////////////////////////////////////////////////
Route::get('/playground',function(){
	return view('playground.index');
});