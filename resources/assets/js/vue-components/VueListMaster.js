import Card from './Card.vue';
import Journal from './Journal.vue';
import Timer from './Timer.vue';
import Popups from './Popups.vue';
import Popouts from './Popouts.vue';
import { sortObjectArrayByProperty, removeEmptyValuesFromArray } from '../components/globalFunctions.js';

export default {
	el:'#body',
	data: {
		doneData: null,
		allData: null,
		selection: null,
		addingNewUnder: null,
		addingNewAsChild: false,
		addingNewAsFirstChild: false,
		editingItem: null,
		editingDoneDateItem: null,
		loading: true,
		patching: true,
		popups: [],
		popouts: [],
		timerItems: [],
		// allTags: [],
	},
	components: {
		Card,
		Journal,
		Timer,
		Popups,
		Popouts,
	},
	computed:{
		allTagsComputed(){
			if(!this.allData){ return []; }
			let childrensTags = [];
			let items = allItems.flattenTree(allItems.root.children);
			if(!items.length){ return []; }
			items.forEach(function(child) {
				child.tagged.forEach(function(taggedObj){
					if(!taggedObj.tag || !taggedObj.tag.name){
						return; // solves bugs with broken tags
					}
					let tagPresent = childrensTags.find(function(tagAlready){
						return tagAlready.name == taggedObj.tag.name;
					}.bind(taggedObj));
					if(!tagPresent){
						childrensTags.push(taggedObj.tag);
					}
				}.bind(childrensTags));
			}.bind(childrensTags));
			console.log('before sorting tags');
			childrensTags = sortObjectArrayByProperty(childrensTags, 'name');
			return childrensTags;
		},
		childrenAmount(){
			if(!this.allData){ return 0; }
			return this.countChildren(this.allData);
		},
		doneChildrenAmount(){
			if(!this.allData){ return 0; }
			return this.countDoneChildren(this.allData);
		},
		totalSecLeft(){
			console.log('run totalSecLeft');
			if(!this.allData){ return 0; }
			let card = this.$children.find(child => child.totalSecLeft);
			return card.totalSecLeft;
		},
		totalUsedSec(){
			console.log('run totalUsedSec');
			if(!this.allData){ return 0; }
			let card = this.$children.find(child => child.totalUsedSec);
			return card.totalUsedSec;
		},
	},
	watch:{
		childrenAmount(){
			this.bcFI();
		},
	},
	methods:{
		countChildren(item){
			let x;
			if (!item.children){ return 0; }
			x = item.children.length;
			item.children.forEach(function(child){
				x = x+this.countChildren(child);
			}.bind(this));
			return x;
		},
		countDoneChildren(item){
			let x;
			if (!item.children){ return 0; }
			x = this.returnDoneChildrenAmount(item);
			item.children.forEach(function(child){
				x = x+this.countDoneChildren(child);
			}.bind(this));
			return x;
		},
		returnDoneChildrenAmount(item){
			let x = item.children.reduce(function(prevChild, currChild) {
				let y = (currChild.done) ? 1 : 0;
				return prevChild + y;
			}, 0);
			return x;
		},
		showChildren(id, show){
			id = (id) ? id : selection.selectedId;
			let item = allItems.nodes[id];
			if (!item.children || !item.children.length){ return; }
			if (show == 'show'){
				if (item.show_children) { return; }
				item.show_children = true;
			} else if (show == 'hide') {
				if (!item.show_children) { return; }
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
		indent(id){
			id = (id) ? id : selection.selectedId;
			// if(!allItems.isTopLvlItemInFilteredRoot(id)){ 
			// 	console.log("can't indent a topLvlItem in filtered list");
			// 	return;
			// }
			let new_parent_id = allItems.olderSiblingId(id);
			if(new_parent_id == allItems.nodes[id].parent_id){ console.log('bump! ceiling!'); return; }
			console.log('new_parent_id / olderSiblingId: '+new_parent_id);
			allItems.giveNewParent(id,new_parent_id);
		},
		unindent(id){
			id = (id) ? id : selection.selectedId;
			// if(!allItems.isTopLvlItemInFilteredRoot(id)){ 
			// 	console.log("can't unindent a topLvlItem in filtered list");
			// 	return;
			// }
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
					sel = allItems.nextItemId(id);
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
		setToday(id){
			id = (id) ? id : selection.selectedId;
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
		stopPatching(){
			if(window.stopPatchingIcon){ clearTimeout(window.stopPatchingIcon); }
		    window.stopPatchingIcon = setTimeout(function(){ this.patching = false; }.bind(this), 300);
		},
		startPatching(){
		    if(window.stopPatchingIcon){ clearTimeout(window.stopPatchingIcon); }
			this.patching = true;
		},
		patch(id, arg){
			if(allItems.isTopLvlItemInFilteredRoot(id)){ 
				if(arg == 'children_order' || arg == 'parent_id'){
					console.log("you can't sync a toplvlItem when filtering");
					return;
				}
			}
			this.startPatching();
			let patchObj = {};
			let patchVal = allItems.nodes[id][arg];
			if(arg == 'children_order'){
				patchVal = allItems.arrayToString(patchVal);
			}
			patchObj[arg] = patchVal;
			this.$http.patch('/api/items/' + id, patchObj, { method: 'PATCH'})
			.then(function(response){
				console.log('patched ['+allItems.nodes[id].body+'].'+arg+' = '+patchObj[arg]+';');
				this.stopPatching();
			}, (response) => {
				this.patching = 'error';
			});
		},
		patchTag(id, tags, requestType){
			/* requestType can be:
				'tag': tag item  (default if null)
				'untag': untag item with certain tag
				'retag': delete all tags and retag new ones
			*/
			if(!tags){ return; }
			if(Array.isArray(tags)){
				tags = removeEmptyValuesFromArray(tags);
				if(!tags.length){ return; }
			} else {
				if(!tags.replace(/\s/g, "").length){ return; }
			}
			if(tags=='t' || tags=='T' || tags=='today' || tags=='Today'){
				this.setToday(id);
				return;
			}
			this.startPatching();
			let patchObj = {};
			patchObj['tags'] = tags;
			patchObj['type'] = requestType;
			this.$http.patch('/api/itemtags/' + id, patchObj, { method: 'PATCH'})
			.then(function(tagResponse){
				let syncedTags = tagResponse.data.tags;
				console.log('patched ['+allItems.nodes[id].body+'] TAGS: '+tagResponse.data.tags+';');
				console.log(tagResponse);
				// Re-Add tags of item
				this.$http.get('/api/itemtags/' + id, { type: 'tags'})
				// Codementor: Request type doesn't work......
				.then(function(updatedTagList){
					console.log('updatedTagList');
					console.log(updatedTagList.data);
					allItems.nodes[id].tagged = updatedTagList.data;
				});
				this.stopPatching();
			});
		},

		patchDueDate(id, duedate){
			this.startPatching();
			if (duedate == '0000-00-00 00:00:00'){
				this.$http.patch('/api/items/' + id, {'due_date':duedate})
				.then(function(response){
					this.stopPatching();
				});
				return;
			}
			duedate = moment(duedate).format();
			console.log('PatchDueDate: '+duedate);
			this.$http.patch('/api/items/' + id, {'due_date':duedate})
			.then(function(response){
				this.stopPatching();
			});
		},
		patchDone(id){
			this.startPatching();
			let done_date;
			let doneValue = allItems.nodes[id].done;
			if (doneValue){
				done_date = moment().format();
			} else {
				done_date = '0000-00-00 00:00:00';
			}
			this.$http.patch('/api/items/' + id, {'done':doneValue, 'done_date':done_date})
			.then(function(response){
				this.stopPatching();
			});
		},
		deleteItem(id){
			id = (!id) ? selection.selectedId : id ;
			// if (confirm("Do you really want to delete: "+allItems.nodes[id].body+"?") == false) {
		 //        return;
		 //    }
		 	this.popout(id, 'confirm-delete');
		},
		deleteItemApi(idOrArray){
			this.startPatching();
			if (Array.isArray(idOrArray) && idOrArray.length) {
				let array = idOrArray; // It's an array!
				array.forEach(id => { this.deleteItemApi(id); });
			} else {
				let id = idOrArray; // It's an ID!
				let item = allItems.nodes[id];
				this.$http.delete('/api/items/' + id)
				.then(function(response){
					console.log('deleted: ['+item.body+']');
					this.stopPatching();
				});
			}
		},
		popup(id, type){
			id = (!id) ? selection.selectedId : id ;
			let item = allItems.nodes[id];
			let popupExists = this.popups.filter(function (popup) { return popup.item.id === id; })[0];
			if(popupExists){ return; }
			this.popups.push({
            	item,
                type: type,
                timeout: true, // not yet fully integrated
                time: 10, // not yet fully integrated
            });
            if (type == 'afterDone') {
				setTimeout(function() {
		        	document.querySelector('#popups>div:first-child textarea').focus();
					let fpId = "#done-date-edit-"+id;
					let fpEl = document.querySelector(fpId);
					fpEl.flatpickrify();
					let fpId_b = "#done-date-edit-"+id+"-popup";
					let fpEl_b = document.querySelector(fpId_b);
					fpEl_b.flatpickrify();
				}, 20);
            }
		},
		popout(id, type){
			id = (!id) ? selection.selectedId : id ;
			let item = allItems.nodes[id];
			let popoutExists = this.popouts.filter(function (popout) { return popout.item.id === id; })[0];
			if(!popoutExists){
				this.popouts.push({
	            	item,
	                type: type,
	            });
			}
			if(type=='timer'){
				setTimeout(function() {
					this.$broadcast('playTimer', item);
				}.bind(this), 20);
			} else {
				setTimeout(function() {
					document.querySelector('#popouts-mask>div:first-child .btn-ok').focus();
				}, 20);
			}
		},
		addTimer(id){
			id = (!id) ? selection.selectedId : id ;
			this.popout(id, 'timer');
			return;
		},
		fetchDone(tags){
			this.loading = true;
			this.$http.get('/api/items/fetchdone').then(function(response){
				// debugger;
				let data = response.json();
				data.forEach(item => item = allItems.setDefaultItemValues(item));
				data.forEach(item => {
					if(!allItems.nodes[item.id]){ allItems.nodes[item.id] = item; }
					// let parent = allItems.nodes[item.parent_id];
					// if(parent && ){
					// 	parent.children.push(item);
					// }
				});
				this.loading = false;
				allItems.doneitems = data;
			});
		},
		fetchDoneVersion2(tags){
			this.loading = true;
			this.$http.get('/api/items/fetchdone').then(function(response){
				// debugger;
				let data = response.json();
				console.log(data);
				if(tags){
					data = allItems.arrayFilterTag(data, tags);
				}
				data.forEach(function(item){
					allItems.nodes[item.id] = item;
					allItems.setDefaultItemValues(item);
				});
				// allItems.root.children = allItems.formatDone(data);
				// allItems.doneitems = allItems.formatDone(data);
				this.doneData = allItems.formatDone(data);
				this.loading = false;
			});
		},

		fetchTagged(tags, requestType){
			/* requestType can be:
				'withAnyTag': fetch articles with any tag listed
				'withAllTags': only fetch articles with all the tags
				'tagNames': fetch all existing tags
			*/
			this.loading = true;
			let request = {};
			requestType = (!requestType) ? 'withAnyTag' : requestType;
			request['tags'] = tags;
			request['type'] = requestType;
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
		bcFI(){
			this.$broadcast('filterItems');
		},
		filterItems(keyword, value, event){
			// debugger;
			let operator = null;
			if(event){
				event.preventDefault();
				if (event.ctrlKey || event.metaKey){
					operator = 'AND';
				} else if (event.altKey){
					operator = 'NOT';
				}
			}
			if(!operator){
				selection.tags = [];
				selection.filter = [];
				selection.hiddenItems = [];
				selection.hiddenTags = [];
			}

			if(keyword == 'all'){
				allItems.filterItems('all');
				return;
			}

			if(keyword == 'tag'){
				if(operator == 'NOT'){
					if(selection.hiddenTags.includes(value)){ return; }
					selection.hiddenTags.push(value);
					allItems.hideTaggedNodes(value);
					return;
				} else {
					if(selection.tags.includes(value)){ return; }
					selection.tags.push(value);
				}
			} else {
				if(value){
					if(selection.filter.includes(value)){ return; }
					selection.filter.push(value);
				} else {
					if(selection.filter.includes(keyword)){ return; }
					selection.filter.push(keyword);
				}
			}
			if (keyword == 'done' && !this.doneData.length){
				this.fetchDone();
			}
			allItems.filterItems(keyword,value,operator);
		},
		duplicate(id){
			id = (!id) ? selection.selectedId : id ;
			allItems.duplicate(id);
		},
		postNewItem(newItem, index, addNextItemAs, addTags, duplication){
			this.startPatching();
			// Prepare children_order for sending to DB.
			if(newItem.children_order){
				newItem.children_order = allItems.arrayToString(newItem.children_order);
			}
			// let data = {
			// 	newItemArray: [newItem, newItem]
			// }
			let data = newItem;
			// newItem.id = 99999999;
			// index = 0;
			// allItems.addItem(newItem, index);
			// return;
		
			// let data = newItem;
			// data = JSON.stringify(data);
			this.$http.post('/api/items',data) //SEND
			// this.$http.post('/api/items',newItem) //SEND
			.then(function(response){ //response
				let storedItem = response.data;
				// Revert old item's children_order back to string.
				// storedItem.children_order = (!newItem.children_order) ? [] : newItem.children_order.split(',').map(Number);
				// if(storedItem.constructor === Array){
				// 	console.log(storedItem);
				// 	console.log('storedItem ARRAY');
				// 	storedItem.forEach(item => allItems.addItem(item));
				// 	return;
				// }
				console.log('starting dom update...');
				console.log('Index: ');
				console.log(index);
				allItems.addItem(storedItem, index, addNextItemAs, addTags, duplication);
				this.stopPatching();
			}, (response) => {
				this.patching = 'error';
			});

		},
		keystroke(k){
			console.log(k);
			if(k == 'arrowUp'){ this.selectItem('prev')}
			if(k == 'arrowDown'){ this.selectItem('next')}
			if(k == 'arrowRight'){ this.showChildren(null, 'show')}
			if(k == 'arrowLeft'){ this.showChildren(null, 'hide')}
			if(k == 'meta_arrowUp'){ this.moveItem('up')}
			if(k == 'meta_arrowDown'){ this.moveItem('down')}
			if(k == 'meta_arrowRight'){ this.indent()}
			if(k == 'meta_arrowLeft'){ this.unindent()}
			if(k == 'spaceBar'){ this.markDone()}
			if(k == 'tab'){ this.indent()}
			if(k == 'shift_tab'){ this.unindent()}
			if(k == 'enter'){ this.showAddNewItem()}
			if(k == 'shift_enter'){ this.showAddNewItem(null, 'child')}
			if(k == 'meta_enter'){ this.$broadcast('startEdit')}
			if(k == 't'){ this.setToday()}
			if(k == 's'){ this.addTimer()}
			if(k == 'meta_shift_d'){ this.duplicate()}
			if(k == 'meta_delete'){ this.deleteItem()}
			if(k == 'backspace'){ this.deleteItem()}
			if(k == 'delete'){ this.deleteItem()}
			if(k == 'ctrl_u'){ this.$broadcast('startEdit')}
		},
		test(id){
			// id = (!id) ? selection.selectedId : id ;
			id = selection.selectedId;
			let item = allItems.nodes[id];
			this.patchTag(id, 'bloem', 'tag');
		},
	},
	events: {
        'confirm-ok': function (id) {
            console.log('computer says "ok"...');
            console.log(id);
            allItems.deleteItem(id);
        },
        'confirm-cancel': function (id) {
            console.log('computer says "no"...');
            console.log(id);
            return;
        },
    },
	mounted(){

	},
	ready: function() {
      let vm = this;
      window.addEventListener('keydown', function(e) {
        let x = e.keyCode;
       	if(document.activeElement.className == "flatpickr-days"){
			if(x == 9){
				console.log('hiya!');
				e.preventDefault();
				return;
				// This stops the event listener when a flatpickr dialogue is open.
			}
		}
    	if (vm.popouts.length){
    		if(x == 27) { // escape
				e.preventDefault();
				vm.$broadcast('clearAll');
			}
			if(x == 9){ // TAB
				e.preventDefault();
				if (e.shiftKey){
					$(".btn-cancel").focus();
				} else {
					$(".btn-ok").focus();
				}
	  		}
			if(x == 37){ // arrow left
				e.preventDefault();
				$(".btn-cancel").focus();
			}
			if(x == 39){ // arrow right
				e.preventDefault();
				$(".btn-ok").focus();
			}
		} else if(vm.editingItem || vm.addingNewUnder){
			if(!$('button:focus').length){
				return;
		    }
			if(e.keyCode == 27){ // Escape
				if(vm.editingItem){
					vm.$broadcast('escapeOnEditButtonFocus');
				} else if(vm.addingNewUnder){
					vm.$broadcast('escapeOnNewButtonFocus');
				}
			}
		} else if ( $('input:focus').length > 0
        	||  $('textarea:focus').length > 0
        	|| $('a:focus').length > 0
        	|| $('button:focus').length > 0)
		{
        	return;
		} else { 
		  // INPUT AREAS NOT IN FOCUS
          switch(e.keyCode) { 
			case 37: // arrowLeft
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
		  			vm.keystroke('meta_arrowLeft');
		  			break;
		  		}
				vm.keystroke('arrowLeft');
				break;
			case 39: // arrowRight
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
		  			vm.keystroke('meta_arrowRight');
		  			break;
		  		}
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
			case 84: // key t
				vm.keystroke('t');
				break;
			case 83: // key s
				vm.keystroke('s');
				break;
			case 85: // key u
				if (e.ctrlKey){
					vm.keystroke('ctrl_u');
		  			break;
		  		}
				vm.keystroke('u');
				break;
			case 68: // key d
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
				vm.keystroke('backspace');
				break;
			case 46: // DELETE (real delete)
				e.preventDefault();
				vm.keystroke('delete');
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
}