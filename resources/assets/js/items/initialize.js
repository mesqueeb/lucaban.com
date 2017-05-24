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
	// VueFilters(Vue);
	new ListAppKeyBindings();
	window.eventHub = new Vue();
	window.store = new Vuex.Store(ListStore());
	window.vm = new Vue(ListApp());

	// Vue.directive('flatpicky', {
	// 	inserted(el)
	// 	{
	// 		new Flatpickr(el,flatPickConfig);
	// 	},
	// });
	// Vue.directive('focus', {
	// 	inserted(el, binding)
	// 	{
	// 		if(vm.mobile && !binding.modifiers.mobile){ return; }
	// 		el.focus()
	// 	}
	// });
	// Vue.directive('autoheight', {
	// 	inserted(el, binding)
	// 	{
	// 		Vue.nextTick(function ()
	// 		{
	// 			autosize(el);
	// 		});
	// 	}
	// });
	// Vue.directive('autowidth', {
	// 	inserted(el, binding)
	// 	{
	// 		Vue.nextTick(function ()
	// 		{
	// 			autosizeInput(el);
	// 		});
	// 	}
	// });


	store.commit('updateState', { field:'patching', value:false } );
	store.commit('updateState', { field:'loading', value:false } );
}