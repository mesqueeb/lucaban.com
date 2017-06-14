	// require('quasar-framework/dist/quasar.ios.css');
	import Quasar from 'quasar-framework';
	import Vue from 'vue';
	import Vuex from 'vuex';
	import router from '../router.js'

	//Start List App:
	// VUE options
	import ListAppKeyBindings from './ListAppKeyBindings.js';
	import ListStore from '../store/store.js';
	import listDirectives from './Directives.js';
	import VueClipboard from 'vue-clipboard2';

export default function(fetchedData)
{
	console.log('initializing Vue...');
	if (!fetchedData){ console.log('no fetchedData'); return; }

	window.fetchedData = fetchedData;
	window.Vue = Vue;
	Vue.use(Vuex);
	Vue.use(listDirectives);
	Vue.use(Quasar);
	Vue.use(VueClipboard);
	new ListAppKeyBindings();
	window.store = new Vuex.Store(ListStore());
	window.vm = new Vue({
	    el: '#q-app',
		store,
		// router,
	    render: h => h(require('../App.vue'))
	});

	store.commit('updateState', { field:'patching', value:false } );
	store.commit('updateState', { field:'loading', value:false } );
}