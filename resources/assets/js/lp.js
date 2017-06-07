// import marked from 'marked';
// window.marked = marked;
import Vue from 'vue';
window.Vue = Vue;
// import lang from './lang/lp.js'
import { isElementInViewport, addClass, removeClass } from './components/globalFunctions.js';
    window.Element.prototype.addClass = function(config){ return addClass(this,config) };
    window.Element.prototype.removeClass = function(config){ return removeClass(this,config) };

const VueLpMaster = {
	el:'.lp-wrapper',
	mounted()
	{
        window.onscroll = function() {
			let el = document.getElementsByClassName('line');
			if (!isElementInViewport(el[0]))
			{
		    	document.querySelector('nav').addClass("scrolled-down");
			}
			else
			{
		    	document.querySelector('nav').removeClass("scrolled-down");
			}
		};
	},
}
window.vm = new Vue(VueLpMaster);