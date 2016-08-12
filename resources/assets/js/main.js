import Card from './vue-components/Card.vue';
var VueAutosize = require('vue-autosize')
Vue.use(VueAutosize)

import Tree from './vue-components/dataTree.js';
import Selection from './vue-components/Selection.js';

$.getJSON('/api/items',function(fetchedData){

	//response

	window.allItems = new Tree(fetchedData);
	window.selection = new Selection();


window.vm = new Vue({
	el:'body',
	data: {
		import_data: allItems.root,
		selection: selection,
		addingNewUnder: null,
	},
	components: { Card },
	methods:{

		markDone(){
			let item = allItems.nodes[selection.selectedId];
			item.done = !item.done;
			this.$http.patch('/api/items/' + item.id, {'done':item.done});
		},
		indent(){
			let id = selection.selectedId;
			let new_parent_id = allItems.olderSiblingId(id);
			if(new_parent_id == allItems.nodes[id].parent_id){ console.log('bump! ceiling!'); return; }
			console.log('new_parent_id / olderSiblingId: '+new_parent_id);
			allItems.giveNewParent(id,new_parent_id);
			// this.$broadcast('updateDepth');
		},
		unindent(){
			let id = selection.selectedId;
			let depth = allItems.nodes[id].depth;
			let olderSiblingId = allItems.olderSiblingId(id);
			let olderSiblingDepth = allItems.nodes[olderSiblingId].depth;

			while(olderSiblingDepth != depth-1){
				olderSiblingId = allItems.olderSiblingId(olderSiblingId);
				olderSiblingDepth = allItems.nodes[olderSiblingId].depth;
			}
			let new_parent_id = olderSiblingId;
			let new_parent_depth = olderSiblingDepth;
			console.log('new_parent: '+new_parent_id);

			if(!new_parent_id){ console.log('crash! floor!'); return; }
			if(new_parent_depth == 0 && depth == 1){ console.log('crash! floor!'); return; }
			if(new_parent_id == allItems.nodes[id].parent_id){
				new_parent_id = allItems.nodes[new_parent_id].parent_id;
			}
			allItems.giveNewParent(id,new_parent_id);
		},
		select(direction){
			let id = selection.selectedId;
			let sel = '';
			if(direction == 'next'){
				sel = allItems.nextItemId(id)
			} else if (direction == 'prev'){
				sel = allItems.olderSiblingId(id)
			}
			selection.selectedId = sel;
		},
		showAddNewItem(id){
			id = (id) ? id : selection.selectedId;
			console.log('showAddNewItem for '+id);
			this.addingNewUnder = id;
			setTimeout(function(){$("#new-under-"+id+">textarea").focus();},10);
		},
		patchChildren_order(id, newItem){
			let childrenArray = allItems.nodes[id].children_order;
			let c_o = '';
			childrenArray.forEach(function(entry) {
			    c_o = c_o+','+entry;
			});
			c_o = c_o.substring(1);
			console.log("sending new Parent's child_order: "+c_o);

			// When patching the parent's child_order,
			// this.$root.addingNewUnder get's set to 'null' without any reason...
			// That's why I patch it like so:
			

			this.$http.patch('/api/items/' + id, { children_order: c_o }, { method: 'PATCH'})
			.then(function(response){
				console.log('patched children_order');
				this.showAddNewItem(newItem);
			});
		},
		keystroke(keystroke){
			switch(keystroke) { 
				case 'arrowUp':
					this.select('prev');
					break;
				case 'arrowDown':
					this.select('next');
					break;
				case 'meta_arrowUp':
					this.meta_arrowUp();
					break;
				case 'meta_arrowDown':
					this.meta_arrowDown();
					break;
				case 'spaceBar':
					this.markDone();
					break;
				case 'shift_tab':
					this.unindent();
					break;
				case 'tab':
					this.indent();
					break;
				case 'enter':
					this.showAddNewItem();
					break;
				case 'meta_enter':
					this.$broadcast('startEdit');
					break;
			}
		},
	},
	created(){
	},
	ready: function() {
      var vm = this;
      window.addEventListener('keydown', function(e) {
        if ( $('input:focus').length > 0 ||  $('textarea:focus').length > 0 ) {
        	return;
		} else { 
		  // INPUT AREAS NOT IN FOCUS
          switch(e.keyCode) { 
			case 38: // arrowUp
				e.preventDefault();
				if (event.ctrlKey || event.metaKey){
		  			vm.keystroke('meta_arrowUp');
		  			break;
		  		}
				vm.keystroke('arrowUp');
				break;
			case 40: // arrowDown
				e.preventDefault();
				if (event.ctrlKey || event.metaKey){
		  			vm.keystroke('meta_arrowDown');
		  			break;
		  		}
				vm.keystroke('arrowDown');
				break;
			case 32: // spaceBar
				e.preventDefault();
				vm.keystroke('spaceBar');
				break;
			case 9: // tab
				e.preventDefault();
				if (e.shiftKey){
		  			vm.keystroke('shift_tab');
		  			break;
		  		}
				vm.keystroke('tab');
				break;
			case 13: // enter
				e.preventDefault();
				if (event.ctrlKey || event.metaKey){
		  			vm.keystroke('meta_enter');
		  			break;
		  		}
				vm.keystroke('enter');
				break;
			case 'xexx':
				vm.keystroke('unindent');
				break;
			case 'xexx':
				vm.keystroke('unindent');
				break;
			case 'xexx':
				vm.keystroke('unindent');
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



}); // end ajax