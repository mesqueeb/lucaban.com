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

// Vue.use(Quasar) // Install Quasar Framework

// Quasar.start(() => {
//   /* eslint-disable no-new */
//   new Vue({
//     el: '#q-app',
//     router,
//     render: h => h(require('./App'))
//   })
// })



// MY ITEMS APP:

require(`./css/items.scss`);

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

	import initialize from './config/initialize.js';

	let token = 
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFkYmU4YzBiYTE1MTJjNGViMTVjMzhkNzFkMWQxZTdjM2VlNDE2MTQ3MjllZDRhMTZhNjU3MWYzYTEzMzU5NGY3ODg4YTRhZTMyYzZhM2JmIn0.eyJhdWQiOiIxIiwianRpIjoiYWRiZThjMGJhMTUxMmM0ZWIxNWMzOGQ3MWQxZDFlN2MzZWU0MTYxNDcyOWVkNGExNmE2NTcxZjNhMTMzNTk0Zjc4ODhhNGFlMzJjNmEzYmYiLCJpYXQiOjE0OTY5Mzk5MTAsIm5iZiI6MTQ5NjkzOTkxMCwiZXhwIjoxNTI4NDc1OTEwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.dS-cZzlBEhZdX-fnIyHyobCJNQVkd4XZq7rIRw3rn72CP1K5hH-3PLhiJJ2_v8khSktLjfh6XGIb87Gt36J8psMRtc8zSQELiBpGJvVouVUNMzy8RkP-kRRjVxNrcXQd6SggrybdpV_kV48pH5sDzINlGUx3VyYxW8waGHt4_KNsiHCP0D_U2pUhOuY0XxfZekNxe2ZvslksftpFK0GIKyWEq6mJanjOpKGa9qrVJd2kueruWXsxBkWZLqsNGOuLEERj40nw7OKDFKa01zaddGK_3dhwKELlHUgZAkCE3i1RcTyBrbCxe-trUWO1CMJx7YfRzqAtCoQ47KKJwxrx7vFLVDsxeM9ET66A9yLuHDFvYOr6KQrgXB8AMVeek0zR90gWjc5h1OjBp7smb1Rq1K6Dk3X3XaTyPfPdZfSo1kjoQlD6xOf8Nws3YX0oEkPnoQgWtM323BZ9Uvvc6QbKZETkK6anCm6NidtJv09zoF9cnGVgpGeGDzpmMb7EcTvEc1KGGT7mPFWuKhYBG3_WgKaQ0pBAOfB4-MjnmwP-5dC6CRArpNbF3kOHwYxRDdNLMB7uwwDYkbpAiY7RD-enqwq2MMADw1_swUJz8M0q9lv-dNC4Slwmh5Uks1dp1ZkABrinIy6az9zo6W0ea-GWAKSAbRtIwwBFlgsTNbux3DU';
	import axios from 'axios';
	window.axios = axios;
	window.axios.defaults.headers.common = {
	    'X-Requested-With': 'XMLHttpRequest',
		'Authorization': "Bearer " + token ,
	};
	console.log('start fetching all items');


/*/ ～～～～～～～～～～～～～～～～～～～～～～～　\*\		*/
axios.get('http://lucaban.dev/api/items').then(({data}) => { 			/*
\*\ ～～～～～～～～～～～～～～～～～～～～～～～　/*/
	console.log('fetched all items');
	initialize(data);
}).catch(()=>{
	console.log('ERROR');
	initialize(require('./config/testdata.json'));
});