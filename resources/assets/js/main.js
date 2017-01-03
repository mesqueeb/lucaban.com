// IMPORT jQuery
	import $ from 'jquery';
	import jQuery from 'jquery';
	// export for others scripts to use
	window.$ = $;
	window.jQuery = jQuery;

// IMPORT Own jQuery replacement functions
	import { hasClass, btnEffect, isElementInViewport } from './components/globalFunctions.js';
	window.btnEffect = btnEffect;
	// Make hasClass(el) available as el.hasClass();
	window.Element.prototype.hasClass = function(config){ return hasClass(this,config)};

// IMPORT linkify
	import * as linkify from 'linkifyjs';;
	import linkifyHtml from 'linkifyjs/html';
	import hashtag from 'linkifyjs/plugins/hashtag'; // optional
	window.linkifyHtml = linkifyHtml;
	window.hashtag = hashtag;
	hashtag(linkify);


// IMPORT Moment
	// having trouble with these:
			// countdown/countdown.js
			// moment/min/moment-with-locales.min.js
			// moment-countdown/dist/moment-countdown.min.js
	// var moment = require('moment');
	// import moment from 'moment';
	// moment().format();
	// import countdown from 'countdown';
	// require('moment-countdown');
	// import moment-countdown from 'moment-countdown';

// IMPORT FlatPickr
	import flatpickr from 'flatpickr';
	
	(function(document){ // iife

	let openFlatPickr = null;
	// Make flatpickr(el) available as el.flatpickr();
	window.Element.prototype.flatpickr = function(config){ return flatpickr(this,config)};
	window.Element.prototype.flatpickrify = function(config){ return flatpickr(this,{
    	dateFormat: 'Y-m-d H:i:S',
    	maxDate: 'today',
    	enableTime: true,
    	time_24hr: true,
    	onOpen(dateObj, dateStr, instance){
			if(!vm.$root.beforeEditCache_doneDate){
				vm.$root.beforeEditCache_doneDate = {};
			}
			let elId = instance.element.id;
			let id = elId.replace('done-date-edit-', '');
			console.log('opening for '+id);
			id = id.replace('-popup', '');
			vm.$root.beforeEditCache_doneDate[id] = dateStr;
			openFlatPickr = instance;
    	},
    	onChange: function(dateObj, dateStr, instance){
			let el = instance.element.id;
			instance.element.focus();
			console.log('flatPicker on change');
		},
		onClose: function(dateObj, dateStr, instance){
			let elId = instance.element.id;
			let id = elId.replace('done-date-edit-', '');
			id = id.replace('-popup', '');
			console.log('vm.$root.beforeEditCache_doneDate[id] = '+vm.$root.beforeEditCache_doneDate[id]);
			// This doesn't even work...
			if (vm.$root.beforeEditCache_doneDate[id] == dateStr){ return; }
			console.log('patching: '+id)
			vm.patch(id, 'done_date');
			delete vm.$root.beforeEditCache_doneDate[id];
			console.log('flatPicker on close');
			openFlatPickr = null;
		},
	})};
	let documentClick = function documentClick(e) {
		// Luca Patch
		if(e.target.parentNode.nodeName == 'BODY') { 
			console.log('aoe');
			// See Patch inside Flatpickr File!!!
			if(openFlatPickr && openFlatPickr.isOpen){
				openFlatPickr.close();
			}
		}
		// End Luca Patch

	};
	document.addEventListener("click", documentClick, true);

	})(document);// end flatpickr

	window.flatpickrifyAllInputs = function(){
		let flatpickrInputs = document.getElementsByClassName("flatpickr");
		for (var i = 0; i < flatpickrInputs.length; i++) {
		    flatpickrInputs[i].flatpickrify();
		}
	};



// Vue Basics
	import Vue from 'vue';
	window.Vue = Vue;
	import VueResource from 'vue-resource';
	Vue.use(VueResource);
	var VueAutosize = require('vue-autosize');
	Vue.use(VueAutosize);

	import VueFilters from './vue-components/vueFilters.js';
	VueFilters(Vue);
	// Vue Components
	import Card from './vue-components/Card.vue';
	import Journal from './vue-components/Journal.vue';
	import Timer from './vue-components/Timer.vue';
	import Popups from './vue-components/Popups.vue';
	import Popouts from './vue-components/Popouts.vue';
	
	


// JS Classes
	import Tree from './vue-components/dataTree.js';
	import Selection from './vue-components/Selection.js';
	import NotificationStoreClass from './vue-components/NotificationStore.js';

// $(window).on("scroll", function(e) {
// 	// console.log($(this).scrollTop());
// 	if ($(this).scrollTop() > 33 && vm.timerItems.length) {
// 		$("body").addClass("fix-timer");
// 	} else {
// 		$("body").removeClass("fix-timer");
// 	}
// });
$(window).on("scroll", function(e) {
	if(!selection.filter.length && !selection.tags.length){ return; }
	let el = document.getElementsByClassName('line');
	// let el = $('.navigation');
	if (!isElementInViewport(el[0])) {
    	$("body").addClass("scrolled-down");
	} else {
    	$("body").removeClass("scrolled-down");
	}
});

// set row height each time resize window
window.setRowHeight = function(){
	console.log('resized edit windows');
	$('textarea[name=item_body]').each(function( index ) {
		let x = $( this ).parent().parent().find('.bodybox').height();
		$( this ).height(x);
	});	
}

$(window).on('resize', function(e) {
	clearTimeout(window.resizeTimer);
	window.resizeTimer = setTimeout(function() {
		setRowHeight();
	}, 1000);
});
$( document ).ready(function() {
   setTimeout(function() {
		setRowHeight();
	}, 2000);
});
$('body').on('click', 'button', function(e){
	console.log(e);
	btnEffect(e);
});





$.getJSON('/api/items',function(fetchedData){

	//response
	// Codementor: How do I make the following function wait until DOM is loaded?
	setTimeout(function(){
		flatpickrifyAllInputs();
	}, 1000);


window.allItems = new Tree(fetchedData);
window.selection = new Selection();
// import VueRoot from './vue-components/VueRoot.js';
window.vm = new Vue({
	el:'#body',
	data: {
		allData: allItems.root,
		doneData: allItems.doneitems,
		selection: selection,
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
		allTags: null,
	},
	components: {
		Card,
		Journal,
		Timer,
		Popups,
		Popouts,
	},
	computed:{
		childrenAmount(){
			return this.countChildren(this.allData);
		},
		doneChildrenAmount(){
			return this.countDoneChildren(this.allData);
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
		patch(id, arg){
			if((selection.filter.length > 0 || selection.tags.length > 0)
				&& allItems.isTopLvlItemInFilteredRoot(id)){ 
				if(arg == 'children_order' || arg == 'parent_id'){
					console.log('trying to move toplvlItem on filtered');
					return;
				}
			}
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
			if(tags=='t' || tags=='T' || tags=='today' || tags=='Today'){
				this.setToday(id);
				return;
			}
			this.patching = true;
			let patchObj = {};
			patchObj['tags'] = tags;
			patchObj['type'] = requestType;
			this.$http.patch('/api/itemtags/' + id, patchObj, { method: 'PATCH'})
			.then(function(tagResponse){
				console.log('patched ['+allItems.nodes[id].body+'] TAGS: '+tagResponse.data.tags+';');
				console.log(tagResponse);
				// Re-Add tags of item
				this.$http.get('/api/items/' + id, { method: 'GET'})
				.then(function(response){
					console.log('response');
					console.log(response);
					let newTags = response.data.tagged;
					allItems.nodes[id].tagged = newTags;
				});
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
			// if (confirm("Do you really want to delete: "+allItems.nodes[id].body+"?") == false) {
		 //        return;
		 //    }
		 	this.popout(id, 'confirm-delete');
		},
		deleteItemApi(idOrArray){
			this.patching = true;
			if (Array.isArray(idOrArray) && idOrArray.length) {
				let array = idOrArray; // It's an array!
				array.forEach(id => { this.deleteItemApi(id); });
			} else {
				let id = idOrArray; // It's an ID!
				let item = allItems.nodes[id];
				this.$http.delete('/api/items/' + id)
				.then(function(response){
					console.log('deleted: ['+item.body+']');
					this.patching = false;
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
			// id = (!id) ? selection.selectedId : id ;
			// let item = allItems.nodes[id];
			// let timerExists = this.timerItems.filter(function (item) { return item.id === id; })[0];
			// if (!timerExists){
			// 	this.timerItems.push(item);
			// 	this.playTimer(item);
			// }
		},
		fetchDone(tags){
			this.loading = true;
			this.$http.get('/api/items/fetchdone').then(function(response){
				// debugger;
				let data = response.json();
				data.forEach(item => allItems.setDefaultItemValues(item));
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
		filterItems(keyword, value, operator){
			if(!operator){
				selection.tags = [];
				selection.filter = [];
			}

			if(keyword == 'done2'){
				if(selection.filter.includes('done2')){ return; }
				selection.filter.push('done2');
				this.fetchDoneVersion2();
				return;
			}

			if(keyword == 'tag'){
				if(selection.tags.includes(value)){ return; }
				selection.tags.push(value);
			} else {
				if(selection.filter.includes(value)){ return; }
				if(keyword == 'all'){
					selection.filter = [];
					allItems.filterItems('all');
					return;
				}
				if (keyword == 'done' && !this.doneData.length){
					this.fetchDone();
				}
				if(value){
					selection.filter.push(value);
				} else {
					selection.filter.push(keyword);
				}
			}
			allItems.filterItems(keyword,value);
		},

		// duplicate(id){
		// 	this.patching = true;
		// 	id = (!id) ? selection.selectedId : id ;
		// 	let item = allItems.nodes[id];
		// 	console.log('dupe item.children_order = '+item.children_order);
		// 	let OlderSiblingIndex = allItems.siblingIndex(selection.selectedId);
		// 	let index = parseInt(OlderSiblingIndex)+1;
		// 	this.$http.post('/api/items',item) //SEND
		// 	.then(function(response){ //response
				
		// 		// Copy all children as well!
		// 		// -> Not yet written!
				
		// 		let storedItem = response.data;
		// 		console.log('starting dom update...');
		// 		console.log('ind on duplicate: '+index);
		// 		allItems.addItem(storedItem, index);
		// 		this.patching = false;
		// 	}, (response) => {
		// 		this.patching = 'error';
		// 	});
		// },
		duplicate(id){
			id = (!id) ? selection.selectedId : id ;
			allItems.duplicate(id);
			// vm.duplicatedId = id;
			// let newItem = allItems.nodes[id];
			// newItem.children_order = '';
			// if(copyInto){
			// 	let copyIntoParent = allItems.nodes[copyInto];
			// 	newItem.parent_id = copyInto;
			// 	newItem.depth = copyIntoParent.depth+1;
			// }
			// let index = allItems.siblingIndex(id)+1;
			// let addNextItemAs = null;
			// let addTags = newItem.tagged.map(tagObj => tagObj.tag_name);
			// let duplication = true;
			// this.postNewItem(newItem, index, addNextItemAs, addTags, duplication);
		},
		postNewItem(newItem, index, addNextItemAs, addTags, duplication){
			this.patching = true;
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
				this.patching = false;
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
	created(){
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
});


$.getJSON('/api/itemtags',function(tags){
	console.log(tags);
	window.allTags = tags;
	vm.allTags = tags;
});

vm.patching = false;
vm.loading = false;
}); // end ajax - get data