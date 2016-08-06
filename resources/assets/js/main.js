import Panel from './vue-components/Panel.vue';
var VueAutosize = require('vue-autosize')
Vue.use(VueAutosize)

import Tree from './vue-components/dataTree.js';
window.allThings = new Tree(fetchedData);
import Selection from './vue-components/Selection.js';
window.selection = new Selection();

new Vue({
	el:'body',
	data: {
		import_data: allThings.root,
		selection: selection,
	},
	components: { Panel },
	methods:{
		addThing(){
			let body = 'test';
			let selId = selection.selectedId;
            let older_sibling = allThings.nodes[selId];
            let parent_id = older_sibling.parent_id;
            let older_sibling_index = allThings.nodes[parent_id].children_order.indexOf(selId);
            let thing = {id:10, parent_id:parent_id, body:body, older_sibling_index:older_sibling_index};
            console.log(thing);
            allThings.addThing(thing);
		},
	},
	created(){
	},
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
			case 38: // arrowUp
				e.preventDefault();
				if (event.ctrlKey || event.metaKey){
		  			console.log('meta_arrowUp');
		  			vm.$broadcast('meta_arrowUp');
		  			break;
		  		}
				vm.$broadcast('arrowUp');
				break;
			case 40: // arrowDown
				e.preventDefault();
				if (event.ctrlKey || event.metaKey){
					console.log('meta_arrowDown');
		  			vm.$broadcast('meta_arrowDown');
		  			break;
		  		}
				vm.$broadcast('arrowDown');
				break;
			case 32: // spaceBar
				e.preventDefault();
				vm.$broadcast('spaceBar');
				break;
			case 9: // tab
				e.preventDefault();
				if (e.shiftKey){
		  			vm.$broadcast('shift_tab');
		  			break;
		  		}
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
    },
	http: {
		root: '/root',
		headers: {
			'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value'),
		},
    },
});

