
// IMPORT Own jQuery replacement functions
	import { hasClass, addClass, removeClass } from './components/globalFunctions.js';
	// Make hasClass(el) available as el.hasClass();
	window.Element.prototype.hasClass = function(config){ return hasClass(this,config)};
	window.Element.prototype.addClass = function(config){ return addClass(this,config)};
	window.Element.prototype.removeClass = function(config){ return removeClass(this,config)};

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

	import initialize from './items/initialize.js';

	import axios from 'axios';
	console.log('start fetching all items');
/*/ ～～～～～～～～～～～～～～～～～～～～～～～　\*\		*/
axios.get('/api/items').then(({data}) => { 			/*
\*\ ～～～～～～～～～～～～～～～～～～～～～～～　/*/
	console.log('fetched all items');
	initialize(data);
});