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
}
}