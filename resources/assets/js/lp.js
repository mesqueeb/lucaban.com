import * as langContentsLP from '../../lang/ja.json';
langContentsLP = {
"EN":
{
	"menu":
	{
		"myList":"My LISTO",
		"login":"Login",
		"register":"Register",
		"author":"Author",
		"about":"About"
	},
	"lp":
	{
		"jumbotron":
		{
			"title":"Say hello to ",
			"title2":"",
			"body":"A simple task list for people who want to be organized without making things more complicated.",
			"btn":"Try it out"
		},
		"features":
		{
			"intro":" is focussed on the following features:",
			"cards":
			[
				{
					"title":"Simplicity",
					"body":"It needs to ”just work”. I believe an app shouldn't require a manual to know how to work it. Intuition is the prime pillar.",
					"img":"img/all.png"
				},
				{
					"title":"Time management",
					"body":"Add 'planned time' for a perspective of your taskload. You can use timers for increased productivity. You can easily log how much time you have spent on a task.",
					"img":"img/timer.png"
				},
				{
					"title":"A journal of done tasks",
					"body":"The most important feature to know what you've done.",
					"img":"img/journal.png"
				},
				{
					"title":"Tags",
					"body":"Tags for filtering and organization.",
					"img":"img/filter.png"
				},
				{
					"title":"Keyboard controls",
					"body":"Keep it fast and easy to work with. And powerfull for power users.",
					"img":"img/keyboard.jpg"
				}

			]
		},
		"author":
		{
			"title":"About the Author",
			"body1":"Hello community. My name is Luca Ban. I always wanted to build the perfect task list app that fits my needs. I have used about all task list apps out there. But there was always something missing. So that's why I decided to create ",
			"body1b":".",
			"body2":"This app has been my introduction to programming and I fell in love. There are still great plans for new features so stay tuned! (I was greatly inspired by [Checkvist](https://checkvist.com/).)",
			"btn":"Try it out now"
		}
	}
}
}
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
        langContentsLP,
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
