// import marked from 'marked';
// window.marked = marked;
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