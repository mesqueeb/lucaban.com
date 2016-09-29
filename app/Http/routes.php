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
	$tags = App\Item::existingTags();
	return view('items.index')->with('tags',$tags);
});

Route::get('/api/items/fetchdone','CardController@getDone');
Route::resource('/api/items','CardController');
Route::resource('/api/itemtags','ItemTagController');
Route::post('/api/itemtags/fetchTagged','ItemTagController@fetchTagged');
////////////////////////////////////////////////
Route::get('/playground',function(){
	return view('playground.index');
});