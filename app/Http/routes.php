<?php
Route::auth();
////////////////////////////////////////////////
Route::get('/', function () {
    return view('welcome');
});
Route::get('/home', 'HomeController@index');
////////////////////////////////////////////////
Route::get('/things',function(){
	$itemz = App\Thing::get();
	return view('things.index', compact('itemz'));
});
Route::patch('/api/things/{id}/makeChildOf','ThingsPanelController@makeChildOf');
Route::patch('/api/things/{id}/makeSiblingOf','ThingsPanelController@makeSiblingOf');
Route::patch('/api/things/{id}/moveThing','ThingsPanelController@moveThing');
Route::resource('/api/things','ThingsPanelController');
////////////////////////////////////////////////
Route::get('/playground',function(){
	return view('playground.index');
});