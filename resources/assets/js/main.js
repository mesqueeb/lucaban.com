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
				vm.$broadcast('doneEdit');
				break;
		} // end switch
		} else { 
			// INPUT AREAS NOT IN FOCUS
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
			case 13:
				e.preventDefault();
				vm.$broadcast('startEdit');
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