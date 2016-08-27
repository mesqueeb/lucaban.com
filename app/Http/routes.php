<?php
Route::auth();
////////////////////////////////////////////////
// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/home', ['as' => 'home', 'uses' => 'HomeController@index']);


////////////////////////////////////////////////
Route::get('/items',function(){
 //    $god = App\Thing::where('parent_id', null)->first();
 //    if(!$god){
 //        $itemz = App\Thing::create(['body' => 'ALL', 'id' => '1']);
 //        return view('items.index', compact('itemz'));
 //    }
	// $itemz = App\Thing::get();
	return view('items.index');
});

Route::get('/api/items/fetchdone','CardController@getDone');
Route::resource('/api/items','CardController');
////////////////////////////////////////////////
Route::get('/playground',function(){
	return view('playground.index');
});