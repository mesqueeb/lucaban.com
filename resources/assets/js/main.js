import Panel from './vue-components/panel.vue';
var VueAutosize = require('vue-autosize')
Vue.use(VueAutosize)

new Vue({
	el:'body',
	components: { Panel },
	ready: function() {
      var vm = this;
      window.addEventListener('keydown', function(e) {
        if ( $('input:focus').length > 0 ||  $('textarea:focus').length > 0 ) {
        	// INPUT AREAS IN FOCUS
		switch(e.keyCode) { 
			case 13:
				if (e.shiftKey){
					break;
				}
				e.preventDefault();
				vm.$broadcast('enterOnFocussedInput');
				break;
		} // end switch
		} else { 
			// INPUT AREAS NOT IN FOCUS
        switch(e.keyCode) { 
			case 40: // arrowDown
				e.preventDefault();
				vm.$broadcast('arrowDown');
				break;
			case 38: // arrowUp
				e.preventDefault();
				vm.$broadcast('arrowUp');
				break;
			case 32: // spaceBar
				e.preventDefault();
				vm.$broadcast('spaceBar');
				break;
			case 9: // tab
				e.preventDefault();
				vm.$broadcast('tab');
				break;
			case 13: // enter
				e.preventDefault();
				vm.$broadcast('enter');
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
        } // end switch
    	} // END INPUT AREAS NOT IN FOCUS
      });
    }	
});