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
			case 13: //ENTER
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
			case 40: //Down arrow
				e.preventDefault();
				vm.$broadcast('downArrow');
				break;
			case 38: //Up arrow
				e.preventDefault();
				vm.$broadcast('upArrow');
				break;
			case 32: //space
				e.preventDefault();
				vm.$broadcast('spaceBar');
				break;
			case 9: //TAB
				e.preventDefault();
				vm.$broadcast('tab');
				break;
			case 13: //ENTER
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