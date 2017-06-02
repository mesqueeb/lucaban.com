	import Vue from 'vue';
	import Vuex from 'vuex';

	// import VueFilters from '../vue-components/vueFilters.js';

	import Selection from '../vue-components/Selection.js';
	//Start List App:
	// JS Classes
	import ListAppKeyBindings from '../components/ListAppKeyBindings.js';
	import ListStore from './store/store.js';
	import ListApp from './vm.js'

	import listDirectives from '../vue-components/Directives.js';

	// require('quasar-framework/dist/quasar.ios.css');
	import Quasar from 'quasar-framework';
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
	window.vm = new Vue(ListApp());

	store.commit('updateState', { field:'patching', value:false } );
	store.commit('updateState', { field:'loading', value:false } );
}