import Card from './Card.vue';
import Popups from './Popups.vue';
import Popouts from './Popouts.vue';
import ListAppKeyBindings from './ListAppKeyBindings.vue';
import { objectToArray, uniqBy, uniq, arrayToString, sec_to_hourmin, sortObjectArrayByProperty, removeEmptyValuesFromArray } from '../components/globalFunctions.js';
import Selection from './Selection.js';
import Tree from './dataTree.js';

window.selection = new Selection();

export default {
	el:'#items-app',
	data: {
		doneData: null,
		allData: {
			"body":"ALL",
			"children":[],
			"children_order":[],
			"depth":0,
			"done":false,
			"done_date":"0000-00-00 00:00:00",
			"due_date":"0000-00-00 00:00:00",
			"id":"x",
			"show_children":1,
			"tagged":[],
			"used_time":0
		},
		nodes: {},
		selection,
		addingNewUnder: null,
		addingNewAsChild: false,
		addingNewAsFirstChild: false,
		editingItem: null,
		editingItemTags: null,
		editingDoneDateItem: null,
		loading: true,
		patching: true,
		popups: [],
		popouts: {'delete':[], 'timer':[]},
		timerItems: [],
		beforeEditCache_body: null,
		beforeEditCache_planned_time: null,
		fetchedDone: false,
		cancelThroughKeydown: false,
		// allTags: [],
	},
	components: {
		Card,
		Popups,
		Popouts,
	},
	computed:{
		noItems()
		{
			if(!this.allData || !allItems.root || !allItems.root.children.length){
				return true;
			} return false;
		},
		doneItems()
		{
			// Codementor: Not reactive...
			return objectToArray(this.nodes).filter(item => item.done);
		},
		selectionFilter() // For list title
		{
			return selection.filter.map(function (val, i) {
				if(selection.filter.length == i+1)
				{
					val = allItems.tagSlugToName(val);
				}
				else
				{
					val = allItems.tagSlugToName(val)+', ';
				}
				return val;
			});
		},
		selectionTags() // For list title
		{
			return selection.tags.map(function (val, i) {
				if(selection.tags.length == i+1)
				{
					val = allItems.tagSlugToName(val);
				}
				else
				{
					val = allItems.tagSlugToName(val)+', ';
				}
				return val;
			});
		},
		selectionHiddenTags() // For list title
		{
			return selection.hiddenTags.map(function (val, i) {
				if(selection.hiddenTags.length == i+1)
				{
					val = allItems.tagSlugToName(val);
				}
				else
				{
					val = allItems.tagSlugToName(val)+', ';
				}
				return val;
			});
		},
		allVisibleItems()
		{
			if(!this.allData){ return []; }
			let items = allItems.flattenTree(allItems.root.children);
			return items.filter(function(item)
			{
				return !selection.hiddenItems.includes(item.id);
			});
		},
		allTagsComputed()
		{
			var t0 = performance.now();
			if(!this.allData){ return []; }
			let allTagsArray = [];
			// let items = allItems.flattenTree(allItems.root.children);
			let items = this.allVisibleItems;
			if(!items.length){ return []; }
			items.forEach(function(item)
			{
				item.tagged.forEach(function(taggedObj){
					if(!taggedObj.tag || !taggedObj.tag.name)
					{
						return; // solves bugs with broken tags
					}
					let tagAlreadyPushed = allTagsArray.find(function(pushedTag)
					{
						return pushedTag.name == taggedObj.tag.name;
					}.bind(taggedObj));

					if(!tagAlreadyPushed)
					{
						allTagsArray.push(taggedObj.tag);
					}
				}.bind(allTagsArray));
			}.bind(allTagsArray));
			allTagsArray = sortObjectArrayByProperty(allTagsArray, 'name');
			var t1 = performance.now();
			console.log("Call to allTagsComputed took " + (t1 - t0) + " milliseconds.")
			return allTagsArray;
		},
		allTagsComputed_2()
		{
			let t2_0 = performance.now();
			if(!this.allData){ return []; }
			let allTagsArray = [];
			// let items = allItems.flattenTree(allItems.root.children);
			let items = this.allVisibleItems;
			if(!items.length){ return []; }
			allTagsArray = items.reduce(function(a, item)
			{
				let tags = item.tagged.map(taggedObj => taggedObj.tag);
				return a.concat(tags);
			}, []);
			allTagsArray = uniqBy(allTagsArray);
			allTagsArray = sortObjectArrayByProperty(allTagsArray, 'name');
			let t2_1 = performance.now();
			console.log("Call to allTagsComputed_2 took " + (t2_1 - t2_0) + " milliseconds.")
			return allTagsArray;
		},
		allTagsComputed_3()
		{
			let t3_0 = performance.now();
			if(!this.allData){ return []; }
			let allTagsArray = new Set();
			// let items = allItems.flattenTree(allItems.root.children);
			let items = this.allVisibleItems;
			if(!items.length){ return []; }
			items.forEach(function(item)
			{
				if(item.tagged.length){
					item.tagged.forEach(taggedObj => allTagsArray.add(taggedObj.tag));
				}
			}.bind(allTagsArray));
			allTagsArray = [...allTagsArray];
			allTagsArray = uniqBy(allTagsArray);
			allTagsArray = sortObjectArrayByProperty(allTagsArray, 'name');
			let t3_1 = performance.now();
			console.log("Call to allTagsComputed_3 took " + (t3_1 - t3_0) + " milliseconds.")
			return allTagsArray;
		},
		allTagsComputed_1b()
		{
			var t0 = performance.now();
			if(!this.allData){ return []; }
			let allTagsArray = [];
			// let items = allItems.flattenTree(allItems.root.children);
			let items = this.allVisibleItems;
			if(!items.length){ return []; }
			items.forEach(function(item)
			{
				item.tagged.forEach(function(taggedObj){
					if(!taggedObj.tag || !taggedObj.tag.name)
					{
						return; // solves bugs with broken tags
					}
					let tagAlreadyPushed = allTagsArray.find(function(pushedTag)
					{
						return pushedTag.name == taggedObj.tag.name;
					}.bind(taggedObj));

					if(!tagAlreadyPushed)
					{
						allTagsArray.push(taggedObj.tag);
					}
				}.bind(allTagsArray));
			}.bind(allTagsArray));
			allTagsArray = sortObjectArrayByProperty(allTagsArray, 'name');
			var t1 = performance.now();
			console.log("Call to allTagsComputed took " + (t1 - t0) + " milliseconds.")
			return allTagsArray;
		},
		childrenAmount()
		{
			if(!this.allData){ return 0; }
			let x = this.countChildren(this.allData);
			return x;
		},
		doneChildrenAmount()
		{
			if(!this.allData){ return 0; }
			return this.countDoneChildren(this.allData);
		},
		totalSecLeft()
		{
			if(!this.allData || !this.$children.length){ return 0; }
			// console.log('run totalSecLeft');
			let card = this.$children.find(child => (child.totalSecLeft || child.totalSecLeft == 0));
			return card.totalSecLeft;
		},
		totalUsedSec()
		{
			if(!this.allData || !this.$children.length){ return 0; }
			// console.log('run totalUsedSec');
			let card = this.$children.find(child => (child.totalUsedSec || child.totalUsedSec == 0));
			return card.totalUsedSec;
		},
		totalUsedHourMin()
		{
			return sec_to_hourmin(this.totalUsedSec);
		},
		totalHourMinLeft()
		{
			return sec_to_hourmin(this.totalSecLeft);
		},
		hiddenItemsTotalUsedTime()
		{
			if(!this.selection.hiddenItems.length){ return 0; }
			return this.selection.hiddenItems.reduce(function(a,id){
				let b = allItems.nodes[id].used_time;
				return a + b;
			}, 0);
		},
		hiddenItemsTotalPlannedTime()
		{
			if(!this.selection.hiddenItems.length){ return 0; }		
			return this.selection.hiddenItems.reduce(function(a,id){
				let b = allItems.nodes[id].planned_time;
				return a + b;
			}, 0);
		},
	},
	methods:{
		resetDoneData()
		{
			let dd = objectToArray(this.nodes).filter(item => item.done);
			sortObjectArrayByProperty(dd,'done_date','desc');
			this.doneData = dd;
		},
		tagSlugToName(tagslug)
		{
			return allItems.tagSlugToName(tagslug);
		},
		countChildren(item){
			if (!item.children){ return 0; }
			let children = allItems.flattenTree(item.children);
			let x = children.length;
			return x;
		},
		countDoneChildren(item){
			if (!item.children){ return 0; }
			let children = allItems.flattenTree(item.children);
			let doneChildren = children.filter(child => child.done);
			let x = doneChildren.length;
			return x;
		},
		// returnDoneChildrenAmount(item){
		// 	let x = item.children.reduce(function(prevChild, currChild) {
		// 		let y = (currChild.done) ? 1 : 0;
		// 		return prevChild + y;
		// 	}, 0);
		// 	return x;
		// },
		showChildren(id, show_or_hide){
			id = (id) ? id : selection.selectedId;
			let item = allItems.nodes[id];
			if (!item.children || !item.children.length){ return; }
			if (show_or_hide == 'show'){
				if (item.show_children) { return; }
				item.show_children = true;
			} else if (show_or_hide == 'hide') {
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
			this.addingNewAsFirstChild = (addAs == 'child') ? true : false;
			this.addingNewAsChild = (addAs == 'child') ? true : false;
		},
		startEditTags(id){
			id = (id) ? id : selection.selectedId;
			if(!id){ return; }
			this.editingItemTags = id;
		},
		stopPatching(){
			if(window.stopPatchingIcon){ clearTimeout(window.stopPatchingIcon); }
		    window.stopPatchingIcon = setTimeout(function(){ this.patching = false; }.bind(this), 300);
		},
		startPatching(){
		    if(window.stopPatchingIcon){ clearTimeout(window.stopPatchingIcon); }
			this.patching = true;
		},
		patchRootChildrenOrderWithFilter(id){
			this.$http.get('api/items/'+allItems.root.id).then(function(response){
				let rootChildrenOrder = response.data.children_order;
				rootChildrenOrder = rootChildrenOrder+','+id;
				this.$http.patch('api/items/'+allItems.root.id, {'children_order':rootChildrenOrder}).then(function(response){
					let newRootChildrenOrder = response.data.children_order;
					console.log('newRootChildrenOrder = '+newRootChildrenOrder);
				});
			});
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
				patchVal = arrayToString(patchVal);
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
				console.log('tagged ['+allItems.nodes[id].body+'] with: '+tagResponse.data.tags+';');
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
		popup(id, type)
		{
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
    //         if (type == 'afterDone') {
				// Vue.nextTick(function() {
				// 	let fpId = "#done-date-edit-"+id;
				// 	let fpEl = document.querySelector(fpId);
				// 	fpEl.flatpickrify();
				// 	let fpId_b = "#done-date-edit-"+id+"-popup";
				// 	let fpEl_b = document.querySelector(fpId_b);
				// 	fpEl_b.flatpickrify();
				// });
    //         }
		},
		popout(id, type){
			id = (!id) ? selection.selectedId : id ;
			if(!id){ return; }
			let item = allItems.nodes[id];
			// let popoutExists = this.popouts.filter(function (popout) { return popout.item.id === id; })[0];
			// if(!popoutExists){
				console.log("poppy doesn't exist");
				if(type=='timer'){
					this.popouts.timer.push(item);
					Vue.nextTick(function () {
						eventHub.$emit('playTimer', item);
						console.log('emitted playTimer');
					});
				}
				if(type=='confirm-delete'){
					this.popouts.delete.push(item);
					// solved with v-focus:
					// Vue.nextTick(function () {
					// 	document.querySelector('#popouts-mask>div:first-child .btn-ok').focus();
					// });
				}
			// }
		},
		addTimer(id){
			id = (!id) ? selection.selectedId : id ;
			this.popout(id, 'timer');
			return;
		},
		fetchDone(tags, operator){
			this.loading = true;
			this.$http.get('/api/items/fetchdone').then(function(response){
				// debugger;
				this.fetchedDone = true;
				console.log('fetched Done');
				let data = response.data;
				console.log(data);
				if(!data.length){ 
					console.log('no done items...');
					this.loading = false;
					return;
				}
				// clean up and add as nodes
				data.forEach(item => {
					item = allItems.setDefaultItemValues(item)
					if(!allItems.nodes[item.id]){ allItems.nodes[item.id] = item; }
					// if(!allItems.doneitems.includes(item)){ allItems.doneitems.push(item); }
				});
				this.resetDoneData();
				allItems.filterItems('journal',null,operator);
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
				selection.clear();
			}

			if (keyword == 'journal' && !this.fetchedDone){
				this.fetchDone(null,operator);
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
				newItem.children_order = arrayToString(newItem.children_order);
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
		test(id){
			// id = (!id) ? selection.selectedId : id ;
			id = selection.selectedId;
			let item = allItems.nodes[id];
			this.patchTag(id, 'bloem', 'tag');
		},
	},
	mounted() {
        eventHub.$on('confirm-ok', function(id) {
            console.log('computer says "ok"...');
            console.log(id);
            allItems.deleteItem(id);
        });
        eventHub.$on('confirm-cancel', function(id) {
            console.log('computer says "no"...');
            console.log(id);
            return;
        });
    },
	http: {
		headers: {
			'X-CSRF-TOKEN': document.querySelector('#csrf-token').getAttribute('content'),
		},
    },
}