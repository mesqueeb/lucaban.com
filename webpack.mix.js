const { mix } = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
   .js('resources/assets/js/items.js', 'public/js')
   .js('resources/assets/js/lp.js', 'public/js')
   .js('resources/assets/js/_boilerplate_app.js', 'public/js')

   .sass('resources/assets/sass/items.scss', 'public/css')
   .sass('resources/assets/sass/lp.scss', 'public/css')
   .sass('resources/assets/sass/_boilerplate_app.scss', 'public/css')

   .copy('resources/assets/svg', 'public/css/svg')
   .copy('resources/assets/img', 'public/img')
   // Copy MATERIAL FONT
   .copy('node_modules/material-design-iconic-font/dist/fonts', 'public/css/fonts');
