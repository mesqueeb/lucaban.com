import Panel from './vue-components/panel.vue';
var VueAutosize = require('vue-autosize')
Vue.use(VueAutosize)

new Vue({
	el:'body',
	components: { Panel },
	ready: function() {
      var vm = this;
      window.addEventListener('keydown', function(e) {
        switch(e.keyCode) { 
			case 40:
				e.preventDefault();
				vm.$broadcast('selectNext');
				break;
			case 38:
				e.preventDefault();
				vm.$broadcast('selectPrevious');
				break;
			case 32:
				e.preventDefault();
				vm.$broadcast('markDone');
				break;
			case 9:
				e.preventDefault();
				vm.$broadcast('indent');
				break;
			case 'xexx':
				vm.$broadcast('unindent');
				break;
			case 'xexx':
				vm.$broadcast('unindent');
				break;
			case 'xexx':
				vm.$broadcast('unindent');
				break;
			case 'xexx':
				vm.$broadcast('unindent');
				break;
        }
      });
    }	
});