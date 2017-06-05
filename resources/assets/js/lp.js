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
// import lang from './lang/lp.js'

import { isElementInViewport } from './components/globalFunctions.js';
const VueLpMaster = {
	el:'.lp-wrapper',
	data: {
        'setLanguage':null,
	},
    filters: {
        marked(text)
        {
            return marked(text);
        },
    },
    methods: {
    	marked(text)
    	{
            return marked(text);
    	},
    },
    computed: {
    	language()
    	{
    		if(this.setLanguage){ return this.setLanguage; }
    		else if (defaultLanguage){ return defaultLanguage; }
    		else { return 'en' };
    	},
        contents()
        {
        	if(this.language == 'en')
        	{
        		return this.langContentsLP.EN;
        	}
        	if(this.language == 'ja')
        	{
        		return this.langContentsLP.JA;
        	}
        },
        aboutMe()
        {
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
