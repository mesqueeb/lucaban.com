	import Vue from 'vue';
	import Vuex from 'vuex';
	import VueResource from 'vue-resource';

	import VueFilters from '../vue-components/vueFilters.js';

	//Start List App:
	import ListApp from './vm.js'
	// JS Classes
	import ListAppKeyBindings from '../components/ListAppKeyBindings.js';
	import ListStore from './store/store.js';

	import Selection from '../vue-components/Selection.js';

export default function(fetchedData)
{
	if (!fetchedData){ console.log('no fetchedData'); return; }
	window.fetchedData = fetchedData;
	window.Vue = Vue;
	Vue.use(Vuex);
	Vue.use(VueResource);
	VueFilters(Vue);
	new ListAppKeyBindings();
	window.selection = new Selection();
	window.eventHub = new Vue();
	window.store = new Vuex.Store(ListStore);
	window.vm = new Vue(ListApp());

	Vue.directive('flatpicky', {
		inserted(el)
		{
			new Flatpickr(el,flatPickConfig);
		},
	});
	Vue.directive('focus', {
		inserted(el, binding)
		{
			if(vm.mobile && !binding.modifiers.mobile){ return; }
			el.focus()
		}
	});
	Vue.directive('autoheight', {
		inserted(el, binding)
		{
			Vue.nextTick(function ()
			{
				autosize(el);
			});
		}
	});
	Vue.directive('autowidth', {
		inserted(el, binding)
		{
			Vue.nextTick(function ()
			{
				autosizeInput(el);
			});
		}
	});
	Vue.directive('ios-dblclick', {
		inserted(el, binding)
		{
			// TODO create ios Double click directive
			// clicks++;
			// if (clicks == 1) {
			//     setTimeout(function(){
			//         if(clicks == 1) {
			//             single_click_callback.call(self, event);
			//         } else {
			//             double_click_callback.call(self, event);
			//         }
			//     clicks = 0;
			//     }, timeout || 300);
			// }
		}
	});
	store.commit('patch', { id:null, field:'patching', value:false } );
	store.commit('patch', { id:null, field:'loading', value:false } );
}