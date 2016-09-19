var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
elixir(function(mix) {
    mix.sass('app.scss');
	mix.browserify('main.js');
    // Copy MATERIAL FONT
    mix.copy('node_modules/material-design-iconic-font/dist/fonts', 'public/css/fonts');
    var NPM = '../../../node_modules/';
	mix.scripts([
		NPM+'countdown/countdown.js',
		NPM+'moment/min/moment-with-locales.min.js',
		NPM+'moment-countdown/dist/moment-countdown.min.js',
	], 'public/js/vendor.js');

});