// IMPORT jQuery
	import $ from 'jquery';
	import jQuery from 'jquery';
	// export for others scripts to use
	window.$ = $;
	window.jQuery = jQuery;

import marked from 'marked';
window.marked = marked;
import Vue from 'vue';
window.Vue = Vue;

import { isElementInViewport } from './components/globalFunctions.js';
const VueLpMaster = {
	el:'.lp-wrapper',
	data: {
        aboutMeTxt: "This app has been my introduction to programming and I fell in love. There are still great plans for new features so stay tuned! (I was greatly inspired by [Checkvist](https://checkvist.com/).)",
	},
    filters: {
        marked(text)
        {
            return marked(text);
        },
    },
    computed: {
        aboutMe(){
            return marked(this.aboutMeTxt);
        },
    },
	mounted()
	{
        window.onscroll = function() {
			let el = document.getElementsByClassName('line');
			if (!isElementInViewport(el[0]))
			{
		    	$("nav").addClass("scrolled-down");
			}
			else
			{
		    	$("nav").removeClass("scrolled-down");
			}
		};
	},
}
window.vm = new Vue(VueLpMaster);



// require('./bootstrap');

// (function($) {
//     "use strict"; // Start of use strict

//     // jQuery for page scrolling feature - requires jQuery Easing plugin
//     $('a.page-scroll').bind('click', function(event) {
//         var $anchor = $(this);
//         $('html, body').stop().animate({
//             scrollTop: ($($anchor.attr('href')).offset().top - 50)
//         }, 1250, 'easeInOutExpo');
//         event.preventDefault();
//     });

//     // Highlight the top nav as scrolling occurs
//     $('body').scrollspy({
//         target: '.navbar-fixed-top',
//         offset: 100
//     });

//     // Closes the Responsive Menu on Menu Item Click
//     $('.navbar-collapse ul li a').click(function() {
//         $('.navbar-toggle:visible').click();
//     });

//     // Offset for Main Navigation
//     $('#mainNav').affix({
//         offset: {
//             top: 50
//         }
//     })

// })(jQuery); // End of use strict