	import Vue from 'vue';
	import Vuex from 'vuex';
	import VueResource from 'vue-resource';

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
	// const VueClipboard = require('vue-clipboard')
	// import VueClipboard from 'vue-clipboard';
	import VueClipboard from 'vue-clipboard2';
 
	// import Flatpickr from 'flatpickr';
	// import flatPickConfig from '../components/flatPickrOptions.js';


export default function(fetchedData)
{
	console.log('initializing Vue...');
	if (!fetchedData){ console.log('no fetchedData'); return; }

	window.fetchedData = fetchedData;
	window.Vue = Vue;
	Vue.use(Vuex);
	Vue.use(VueResource);
	Vue.use(listDirectives);
	Vue.use(Quasar);
	Vue.use(VueClipboard);
	new ListAppKeyBindings();
	window.store = new Vuex.Store(ListStore());
	window.vm = new Vue(ListApp());

	store.commit('updateState', { field:'patching', value:false } );
	store.commit('updateState', { field:'loading', value:false } );
}