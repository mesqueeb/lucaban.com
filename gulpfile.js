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

	var npmDir = 'node_modules/',
    	jsDir = 'resources/assets/js/';

    mix.copy(npmDir + 'vue/dist/vue.js', jsDir);
    mix.copy(npmDir + 'vue-resource/dist/vue-resource.js', jsDir);
    mix.copy(npmDir + 'jquery/dist/jquery.min.js', jsDir);
    mix.copy(npmDir + 'countdown/countdown.js', jsDir);
    mix.copy(npmDir + 'moment/min/moment-with-locales.min.js', jsDir);
    mix.copy(npmDir + 'moment-countdown/dist/moment-countdown.min.js', jsDir);
    mix.copy(npmDir + 'timer-machine/lib/timer.js', jsDir);

	mix.scripts([
		'vue.js',
		'vue-resource.js',
		'jquery.min.js',
		'countdown.js',
		'moment-with-locales.min.js',
		'moment-countdown.min.js',
		'timer.js',
	], 'public/js/vendor.js');

});
	