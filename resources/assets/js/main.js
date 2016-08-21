import Card from './vue-components/Card.vue';
import Journal from './vue-components/Journal.vue';
var VueAutosize = require('vue-autosize')
Vue.use(VueAutosize)

import Tree from './vue-components/dataTree.js';
import Selection from './vue-components/Selection.js';

Vue.filter('M/D', {
  // model -> view
  // formats the value when updating the input element.
  read: function(val) {
  	return moment(val).format("M/D");
  },
  // // view -> model
  // // formats the value when writing to the data.
  // write: function(val, oldVal) {
  //   var number = +val.replace(/[^\d.]/g, '')
  //   return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
  // }
});
Vue.filter('momentRelative', {
	read: function(val) {
  		return moment(val).fromNow();
	},
});
Vue.filter('momentCalendar', {
	read: function(val) {
	  	return moment(val).startOf('day').calendar(null, {
		    sameDay: '[Today]',
		    nextDay: '[Tomorrow]',
		    nextWeek: 'dddd',
		    lastDay: '[Yesterday]',
		    lastWeek: '[Last] dddd',
		    sameElse: 'YYYY/MM/DD'
		});
  	},
});

$.getJSON('/api/items',function(fetchedData){

	//response

window.allItems = new Tree(fetchedData);
window.doneItems = allItems.getFiltered('done');
window.selection = new Selection();
window.vm = new Vue({
	el:'body',
	data: {
		allData: allItems.root,
		doneData: doneItems,
		selection: selection,
		addingNewUnder: null,
		editingItem: null,
	},
	components: {
		Card,
		Journal,
	},
	methods:{
		markDone(){
			let item = allItems.nodes[selection.selectedId];
			// swap done value because of iniciation with with spacebar:
			item.done = !item.done;
			allItems.updateDoneState(item.id);
		},
		patchDone(id){
			let done_date;
			let doneValue = allItems.nodes[id].done;
			if (doneValue){
				done_date = moment().format();
			} else {
				done_date = '0000-00-00 00:00:00';
			}
			this.$http.patch('/api/items/' + id, {'done':doneValue, 'done_date':done_date});
		},
		moveItem(direction){
			let id = selection.selectedId;
			if(!id){ return; }
			allItems.moveItem(id, direction);
		},
		indent(){
			let id = selection.selectedId;
			let new_parent_id = allItems.olderSiblingId(id);
			if(new_parent_id == allItems.nodes[id].parent_id){ console.log('bump! ceiling!'); return; }
			console.log('new_parent_id / olderSiblingId: '+new_parent_id);
			allItems.giveNewParent(id,new_parent_id);
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
			let sel;
			if(direction == 'next'){
				if(!id || id == allItems.root.id){
					sel = allItems.root.children_order[0]; }
				else {
					sel = allItems.nextItemId(id)
				}
			} else if (direction == 'prev'){
				if(!id || id == allItems.root.id){
					let l = allItems.root.children_order.length;
					sel = allItems.root.children_order[l-1]; }
				else {
					sel = allItems.prevItemId(id)
				}
			}
			selection.selectedId = sel;
		},
		setToday(){
			let id = selection.selectedId;
			allItems.setDueDate(id);
		},
		patchDueDate(id, duedate){
			if (duedate == '0000-00-00 00:00:00'){
				this.$http.patch('/api/items/' + id, {'due_date':duedate});
				return;
			}
			duedate = moment(duedate).format();
			console.log('PatchDueDate: '+duedate);
			this.$http.patch('/api/items/' + id, {'due_date':duedate});
		},
		showAddNewItem(id){
			id = (id) ? id : selection.selectedId;
			console.log('showAddNewItem for '+id);
			this.addingNewUnder = id;
			setTimeout(function(){$("#new-under-"+id+" textarea").focus();},10);
		},
		patchChildren_order(id, newItem){
			let childrenArray = allItems.nodes[id].children_order;
			let c_o = '';
			childrenArray.forEach(function(entry) {
			    c_o = c_o+','+entry;
			});
			c_o = c_o.substring(1);
			this.$http.patch('/api/items/' + id, { children_order: c_o }, { method: 'PATCH'})
			.then(function(response){
				console.log('patched item['+id+'].children_order = '+c_o+';');
				// this.showAddNewItem(newItem);
			});
		},
		patchDepth(id){
			let depth = allItems.nodes[id].depth;
			this.$http.patch('/api/items/' + id, { depth: depth }, { method: 'PATCH'})
			.then(function(response){
				console.log('patched item['+id+'].depth = '+depth+';');
			});	
		},
		patchParent_id(id){
			let parent_id = allItems.nodes[id].parent_id;
			this.$http.patch('/api/items/' + id, { parent_id: parent_id }, { method: 'PATCH'})
			.then(function(response){
				console.log('patched item['+id+'].parent_id = '+parent_id+';');
			});	
		},
		filter(value){
			if(value=='all'){
				selection.filter = 'all';
				allItems.filter('all');
			}
			if(value=='today'){
				selection.filter = 'today';
				allItems.filter('duedate','today');
			}
			if(value=='done'){
				selection.filter = 'done';
				allItems.filter('today');
			}
		},
		keystroke(k){
			console.log(k);
			if(k == 'arrowUp'){ this.select('prev')}
			if(k == 'arrowDown'){ this.select('next')}
			if(k == 'meta_arrowUp'){ this.moveItem('up')}
			if(k == 'meta_arrowDown'){ this.moveItem('down')}
			if(k == 'spaceBar'){ this.markDone()}
			if(k == 'shift_tab'){ this.unindent()}
			if(k == 'tab'){ this.indent()}
			if(k == 'enter'){ this.showAddNewItem()}
			if(k == 'meta_enter'){ this.$broadcast('startEdit')}
			if(k == 't'){ this.setToday()}
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
			case 84: // t
				vm.keystroke('t');
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