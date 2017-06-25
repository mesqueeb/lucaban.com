// QUASAR DEFAULTS:
// // === DEFAULT / CUSTOM STYLE ===
// // WARNING! always comment out ONE of the two require() calls below.
// // 1. use next line to activate CUSTOM STYLE (./src/themes)
// // require(`./themes/app.${__THEME}.styl`)
// // 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// // ==============================

// import Vue from 'vue'
// import Quasar from 'quasar'
// import router from './router'

// Vue.config.productionTip = false
// Vue.use(Quasar) // Install Quasar Framework

// if (__THEME === 'mat') {
//   require('quasar-extras/roboto-font')
// }
// import 'quasar-extras/material-icons'
// // import 'quasar-extras/ionicons'
// // import 'quasar-extras/fontawesome'
// // import 'quasar-extras/animate'

// Quasar.start(() => {
//   /* eslint-disable no-new */
//   new Vue({
//     el: '#q-app',
//     router,
//     render: h => h(require('./App'))
//   })
// })




// MY ITEMS APP:

// IMPORT Own jQuery replacement functions
	import { hasClass, addClass, removeClass } from './helpers/globalFunctions.js';
	// Make hasClass(el) available as el.hasClass();
	window.Element.prototype.hasClass = function(config){ return hasClass(this,config) };
	window.Element.prototype.addClass = function(config){ return addClass(this,config) };
	window.Element.prototype.removeClass = function(config){ return removeClass(this,config) };

// IMPORT linkify
	import * as linkify from 'linkifyjs';
	import linkifyHtml from 'linkifyjs/html';
	import hashtag from 'linkifyjs/plugins/hashtag'; // optional
	window.linkifyHtml = linkifyHtml;
	window.hashtag = hashtag;
	hashtag(linkify);


// IMPORT Moment
	import moment from 'moment';
	window.moment = moment;

	import axios from 'axios';
	window.axios = axios;
	// window.axios.defaults.headers.common = {
	//     'X-Requested-With': 'XMLHttpRequest',
	// 	'Authorization': "Bearer " + token ,
	// };
	
// 1.
import Vue from 'vue';
window.Vue = Vue;
Vue.config.productionTip = false
// 2.
import Quasar from 'quasar-framework';
Vue.use(Quasar);
// 3.
import Vuex from 'vuex';
Vue.use(Vuex);
import ListStore from './store/store.js';
window.store = new Vuex.Store(ListStore);
// 4.
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
// 5.
import router from './router.js'
window.router = router;
// 6.
import WindowKeyBindings from './config/WindowKeyBindings.js';
new WindowKeyBindings();
// 7.
import ListDirectives from './config/Directives.js';
Vue.use(ListDirectives);
// 8.
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);
// GO.
new Vue({
    el: '#q-app',
	router,
	store,
    render: h => h(require('./App.vue'))
});

// CSS
require(`./css/index.scss`);