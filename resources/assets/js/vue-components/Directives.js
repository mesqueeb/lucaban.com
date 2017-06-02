import { mobilecheck } from '../components/globalFunctions.js';
import Flatpickr from 'flatpickr';
import flatPickConfig from '../components/flatPickrOptions.js';
import autosize from 'autosize';
import autosizeInput from 'autosize-input';

export default {
install(Vue){
    window.eventHub = new Vue();
    Vue.prototype.$bus = window.eventHub;
    Vue.bus = window.eventHub;
	Vue.directive('flatpicky', {
		inserted(el)
		{
			new Flatpickr(el,flatPickConfig);
		},
	});
	Vue.directive('focus', {
		inserted(el, binding)
		{
			if (binding.modifiers.noMobile && mobilecheck()){ return; }
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
	Vue.directive('btn-effect', {
		bind(el, binding)
		{
			element.addClass("btn").addClass("btn-dipclick");
			el.addEventListener('click', 
				function btnEffect(event){
					console.log(event);
					let element = (event.target.nodeName == 'I') ? event.target.parentElement : event.target;
					element.addClass("btn--click");
					setTimeout(function(){
						element.removeClass("btn--click");
					}, 400);
				}
			);
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
}
}