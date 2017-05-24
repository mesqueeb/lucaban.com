	import Vue from 'vue';
	import Vuex from 'vuex';
	import VueResource from 'vue-resource';

	import VueFilters from '../vue-components/vueFilters.js';

	//Start List App:
	import ListApp from './vm.js'
	// JS Classes
	import ListAppKeyBindings from '../components/ListAppKeyBindings.js';
	import ListStore from './store/store.js';

	import listDirectives from '../vue-components/Directives.js';

export default function(fetchedData)
{
	if (!fetchedData){ console.log('no fetchedData'); return; }
	window.fetchedData = fetchedData;
	window.Vue = Vue;
	
	Vue.use(VueResource);
	VueFilters(Vue);
	
	new ListAppKeyBindings();
	window.eventHub = new Vue();

	Vue.use(Vuex);
	window.store = new Vuex.Store(ListStore());
	window.vm = new Vue(ListApp());
	Vue.use(listDirectives);

	store.commit('patch', { id:null, field:'patching', value:false } );
	store.commit('patch', { id:null, field:'loading', value:false } );
}