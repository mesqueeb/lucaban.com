// IMPORT jQuery
	import $ from 'jquery';
	import jQuery from 'jquery';
	// export for others scripts to use
	window.$ = $;
	window.jQuery = jQuery;

// IMPORT Own jQuery replacement functions
	import { arrayToString, hasClass, btnEffect, isElementInViewport } from './components/globalFunctions.js';
	import autosize from 'autosize';
	import autosizeInput from 'autosize-input';

	window.btnEffect = btnEffect;
	// Make hasClass(el) available as el.hasClass();
	window.Element.prototype.hasClass = function(config){ return hasClass(this,config)};

// IMPORT linkify
	import * as linkify from 'linkifyjs';
	import linkifyHtml from 'linkifyjs/html';
	import hashtag from 'linkifyjs/plugins/hashtag'; // optional
	window.linkifyHtml = linkifyHtml;
	window.hashtag = hashtag;
	hashtag(linkify);


// IMPORT Moment
	// having trouble with these:
			// countdown/countdown.js
			// moment/min/moment-with-locales.min.js
			// moment-countdown/dist/moment-countdown.min.js
	// var moment = require('moment');
	import moment from 'moment';
	window.moment = moment;

// IMPORT FlatPickr
	import Flatpickr from 'flatpickr';
	window.Flatpickr = Flatpickr;
	import flatPickConfig from './components/flatPickrOptions.js';

// Vue Basics
	import Vue from 'vue';
	window.Vue = Vue;
	import VueResource from 'vue-resource';
	Vue.use(VueResource);

	import VueFilters from './vue-components/vueFilters.js';
	VueFilters(Vue);
	// Vue Components
	import VueListMaster from './vue-components/VueListMaster.js'

// JS Classes
	import Tree from './vue-components/dataTree.js';
	import ListAppKeyBindings from './components/ListAppKeyBindings.js';

$('body').on('click', 'button', function(e){
	console.log(e);
	btnEffect(e);
});

	console.log('start fetching all items');
$.getJSON('/api/items',function(fetchedData){
	console.log('fetched all items');
	
	//response
	window.eventHub = new Vue();
	window.allItems = new Tree(fetchedData);
	console.log(allItems);

	window.vm = new Vue(VueListMaster);
	new ListAppKeyBindings();
	// vm.allData = allItems.root;
	// vm.doneData = allItems.doneitems;
	vm.nodes = allItems.nodes;

	console.log('allItems ↓');
	console.log(allItems);

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


	vm.patching = false;
	vm.loading = false;
}); // end ajax - get data