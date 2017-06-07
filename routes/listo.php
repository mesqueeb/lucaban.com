<?php

// use Illuminate\Http\Request;

// Route::get('login',[]);

Route::get('/', ['uses' => 'ViewController@items','as'=>'listo.index']);

Route::get('/api/items/fetchdone','CardController@getDone');
Route::post('/api/itemtags/fetchTagged','ItemTagController@fetchTagged');
Route::resource('/api/items','CardController');
Route::resource('/api/itemtags','ItemTagController');
// Route::group(
// [
// 	'prefix' => LaravelLocalization::setLocale(),
// 	'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]
// ],
// function()
// {
//     // Authentication Routes...
//     // Registration Routes...
//     Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
//     // Password Reset Routes...
//     Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
//     Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
// });
//     Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
// 	// AUTH API
//     Route::post('register', 'Auth\RegisterController@register');
//     Route::post('login', 'Auth\LoginController@login');
//     Route::post('logout', 'Auth\LoginController@logout')->name('logout');
//     Route::post('password/reset', 'Auth\ResetPasswordController@reset');
//     Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');

// Route::get('/', ['as' => 'listo', 'uses' => 'ViewController@items']);

// Route::group([
// 	'middleware' => 'auth',
// ],function(){
// 	Route::get('/', ['as' => 'listo', 'uses' => 'ViewController@items']);
// });