let VueRoot = Vue.extend({
	el:'body',
	data: {
		allData: allItems.root,
		doneData: null,
		selection: selection,
		addingNewUnder: null,
		addingNewAsChild: false,
		addingNewAsFirstChild: false,
		editingItem: null,
		editingDoneDateItem: null,
		loading: true,
		patching: true,
		popups: [],
		allTags: null,
	},
	components: {
		Card,
		Journal,
		Timer,
		Popups,
	},
	methods:{
		showChildren(id, show){
			id = (id) ? id : selection.selectedId;
			let item = allItems.nodes[id];
			if (!item.children || !item.children.length){ return; }
			if (show == 'show'){
				item.show_children = true;
			} else if (show == 'hide') {
				item.show_children = false;
			} else {
				item.show_children = !item.show_children;
			}
			this.patch(id, 'show_children');
		},
		markDone(id, markAs){
			id = (id) ? id : selection.selectedId;
			let item = allItems.nodes[id];
			if (markAs == 'notDone'){
				item.done = false;
				allItems.prepareDonePatch(id);
				return;
			}
			if (item.children.length && !allItems.allChildrenDone(id)){
				return;
			}
			if (markAs == 'done') {
				item.done = true;
			} else {
				item.done = !item.done;
			}
			allItems.prepareDonePatch(id);
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
		selectItem(direction){
			let id = selection.selectedId;
			let item = allItems.nodes[id];
			let sel;
			if(direction == 'next'){
				if(!id || id == allItems.root.id){
					sel = allItems.root.children_order[0];
				} else {
					sel = allItems.nextItemId(id)
				}
			} else if (direction == 'prev'){
				let olderSiblingId = allItems.olderSiblingId(id);
				let olderSibling = allItems.nodes[olderSiblingId];
				if(!id || id == allItems.root.id){
					let l = allItems.root.children_order.length;
					sel = allItems.root.children_order[l-1];
				} else {
					sel = allItems.prevItemId(id);
				}
			}
			selection.selectedId = sel;
			document.getElementById('card-'+sel).scrollIntoViewIfNeeded();
		},
		setToday(){
			let id = selection.selectedId;
			allItems.setDueDate(id);
		},
		showAddNewItem(id, addAs){
			id = (id) ? id : selection.selectedId;
			if(!id){ return; }
			console.log('showAddNewItem for ['+allItems.nodes[id].body+']');
			this.addingNewUnder = id;
			selection.lastSelectedId = id;
			selection.selectedId = null;
			if(addAs == 'child'){
				this.addingNewAsFirstChild = true;
				this.addingNewAsChild = true;
				setTimeout(function(){$("#new-firstchild-of-"+id+" textarea").focus();},10);
			} else {
				this.addingNewAsFirstChild = false;
				this.addingNewAsChild = false;
				setTimeout(function(){$("#new-under-"+id+" textarea").focus();},10);
			}
		},
		patch(id, arg){
			this.patching = true;
			let patchObj = {};
			let patchVal = allItems.nodes[id][arg];
			if(arg == 'children_order'){
				patchVal = allItems.arrayToString(patchVal);
			}
			patchObj[arg] = patchVal;
			this.$http.patch('/api/items/' + id, patchObj, { method: 'PATCH'})
			.then(function(response){
				console.log('patched ['+allItems.nodes[id].body+'].'+arg+' = '+patchObj[arg]+';');
				this.patching = false;
			});
		},
		patchTag(id, tags, type){
			this.patching = true;
			let patchObj = {};
			patchObj['request'] = tags;
			patchObj['type'] = type;
			this.$http.patch('/api/itemtags/' + id, patchObj, { method: 'PATCH'})
			.then(function(response){
				console.log('patched ['+allItems.nodes[id].body+'] TAGS: '+response+';');
				console.log(response);
				this.patching = false;
			});
		},

		patchDueDate(id, duedate){
			this.patching = true;
			if (duedate == '0000-00-00 00:00:00'){
				this.$http.patch('/api/items/' + id, {'due_date':duedate})
				.then(function(response){
					this.patching = false;
				});
				return;
			}
			duedate = moment(duedate).format();
			console.log('PatchDueDate: '+duedate);
			this.$http.patch('/api/items/' + id, {'due_date':duedate})
			.then(function(response){
				this.patching = false;
			});
		},
		patchDone(id){
			this.patching = true;
			let done_date;
			let doneValue = allItems.nodes[id].done;
			if (doneValue){
				done_date = moment().format();
			} else {
				done_date = '0000-00-00 00:00:00';
			}
			this.$http.patch('/api/items/' + id, {'done':doneValue, 'done_date':done_date})
			.then(function(response){
				this.patching = false;
			});
		},
		deleteItem(id){
			id = (!id) ? selection.selectedId : id ;
			if (confirm("Do you really want to delete: "+allItems.nodes[id].body+"?") == false) {
		        return;
		    }
			allItems.deleteItem(id);
		},
		deleteItemApi(idOrArray){
			this.patching = true;
			if (Array.isArray(idOrArray) && idOrArray.length) {
				idOrArray.forEach(id => { this.deleteItemApi(id); });
			} else {
				console.log('deleting: '+idOrArray);
				this.$http.delete('/api/items/' + idOrArray)
				.then(function(response){
					this.patching = false;
				});
			}
		},
		clickDone(){
			this.fetchDone();
			selection.filter = 'done';
		},
		popup(id, type){
			id = (!id) ? selection.selectedId : id ;
			let item = allItems.nodes[id];
			this.popups.push({
            	item,
            	title: "Completed "+item.body,
                text: "",
                type: type,
                timeout: true,
                time: 10,
            });
		},
		fetchDone(){
			this.loading = true;
			this.$http.get('/api/items/fetchdone').then(function(response){
				this.doneData = allItems.formatDone(response.json());
				this.loading = false;
			});
		},
		fetchTagged(tag, requestType){
			this.loading = true;
			let request = {};
			requestType = (!requestType) ? 'withAnyTag' : requestType;
			request['type'] = requestType;
			request['request'] = tag;
			console.log('request');
			console.log(request);
			this.$http.post('/api/itemtags/fetchTagged', request).then(function(response){
				let aaa = response.data;
				aaa = json(aaa);
				console.log('fetched tagged items!');
				console.log(response);
				console.log(response.json());
				console.log(aaa);
				allItems.filteredTagItems = aaa;
				allItems.nodes = aaa;
				allItems.root = aaa;
				this.allData = aaa;
				this.loading = false;
			});
		},
		filter(type, value){
			if(type == 'all'){
				selection.filter = 'all';
				allItems.filter('all');
			}
			if(type == 'today'){
				selection.filter = 'today';
				allItems.filter('duedate','today');
			}
			if(type == 'done'){
				selection.filter = 'done';
				allItems.filter('today');
			}
			if(type == 'tag'){
				this.fetchTagged(value, 'withAnyTag');
			}
		},
		duplicate(id){
			this.patching = true;
			id = (!id) ? selection.selectedId : id ;
			let item = allItems.nodes[id];
			item.children_order = allItems.arrayToString(item.children_order);			
			console.log('dupe item.children_order = '+item.children_order);
			let OlderSiblingIndex = allItems.siblingIndex(selection.selectedId);
			let index = parseInt(OlderSiblingIndex)+1;
			this.$http.post('/api/items',item) //SEND
			.then(function(response){ //response
				// Revert old item's children_order back to string.
				item.children_order = (!item.children_order) ? [] : item.children_order.split(',').map(Number);
				
				let storedItem = response.data;
				console.log('starting dom update...');
				console.log('ind on duplicate: '+index);
				allItems.addItem(storedItem, index);
				this.patching = false;
			})
		},
		keystroke(k){
			console.log(k);
			if(k == 'arrowRight'){ this.showChildren(null, 'show')}
			if(k == 'arrowLeft'){ this.showChildren(null, 'hide')}
			if(k == 'arrowUp'){ this.selectItem('prev')}
			if(k == 'arrowDown'){ this.selectItem('next')}
			if(k == 'meta_arrowUp'){ this.moveItem('up')}
			if(k == 'meta_arrowDown'){ this.moveItem('down')}
			if(k == 'spaceBar'){ this.markDone() }
			if(k == 'shift_tab'){ this.unindent()}
			if(k == 'tab'){ this.indent()}
			if(k == 'enter'){ this.showAddNewItem()}
			if(k == 'shift_enter'){ this.showAddNewItem(null, 'child')}
			if(k == 'meta_enter'){ this.$broadcast('startEdit')}
			if(k == 't'){ this.setToday()}
			if(k == 'meta_shift_d'){ this.duplicate()}
			if(k == 'meta_delete'){ this.deleteItem()}
		},
		test(id){
			// id = (!id) ? selection.selectedId : id ;
			id = selection.selectedId;
			let item = allItems.nodes[id];
			this.patchTag(id, 'bloem', 'tag');
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
			case 37: // arrowLeft
				e.preventDefault();
				vm.keystroke('arrowLeft');
				break;
			case 39: // arrowRight
				e.preventDefault();
				vm.keystroke('arrowRight');
				break;
			case 38: // arrowUp
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
		  			vm.keystroke('meta_arrowUp');
		  			break;
		  		}
				vm.keystroke('arrowUp');
				break;
			case 40: // arrowDown
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
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
				if (e.ctrlKey || e.metaKey){
		  			vm.keystroke('meta_enter');
		  		} else if (e.shiftKey) {
					vm.keystroke('shift_enter');
		  		} else {
					vm.keystroke('enter');
		  		}
				break;
			case 84: // t
				vm.keystroke('t');
				break;
			case 68: // d
				e.preventDefault();
				if ((e.ctrlKey || e.metaKey) && e.shiftKey){
					vm.keystroke('meta_shift_d');
		  			break;
		  		}
				break;
			case 8: // DELETE (backspace)
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
					vm.keystroke('meta_delete');
		  			break;
		  		}
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
export { VueRoot }