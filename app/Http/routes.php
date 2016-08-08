<?php
Route::auth();
////////////////////////////////////////////////
Route::get('/', function () {
    return view('welcome');
});
Route::get('/home', 'HomeController@index');
////////////////////////////////////////////////
Route::get('/things',function(){
    $god = App\Thing::where('parent_id', null)->first();
    if(!$god){
        $itemz = App\Thing::create(['body' => 'ALL', 'id' => '1']);
        return view('things.index', compact('itemz'));
    }
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