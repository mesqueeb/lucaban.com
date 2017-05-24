// IMPORT jQuery
	import $ from 'jquery';
	import jQuery from 'jquery';
	// export for others scripts to use
	window.$ = $;
	window.jQuery = jQuery;

// IMPORT Own jQuery replacement functions
	import { arrayToString, hasClass, btnEffect, isElementInViewport } from './components/globalFunctions.js';
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
	window.flatPickConfig = flatPickConfig;


$('body').on('click', 'button', function(e){
	console.log(e);
	btnEffect(e);
});

	import initialize from './items/initialize.js';

	console.log('start fetching all items');
/*/ ～～～～～～～～～～～～～～～～～～～～～～～　\*\		*/
$.getJSON('/api/items',function(fetchedData){ 			/*
\*\ ～～～～～～～～～～～～～～～～～～～～～～～　/*/
	console.log('fetched all items');
	initialize(fetchedData);

}); // end ajax - get data