// IMPORT jQuery
	import $ from 'jquery';
	import jQuery from 'jquery';
	// export for others scripts to use
	window.$ = $;
	window.jQuery = jQuery;

import { hasClass } from './components/globalFunctions.js';
window.Element.prototype.hasClass = function(config){ return hasClass(this,config)};



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
	// Make flatpickr(el) available as el.flatpickr();
	window.Element.prototype.flatpickr = function(config){ return flatpickr(this,config)};

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
	
	// import VueFlatpickr from '../../../node_modules/vue-flatpickr/assets/flatpickr-en.js'
	// import VueFlatpickr from '../node_modules/vue-flatpickr/VueFlatpickr-en.vue';
	
	// import VueFlatpickr from '../../../node_modules/vue-flatpickr/VueFlatpickr-en.vue';

	import Card from './vue-components/Card.vue';
	import Journal from './vue-components/Journal.vue';

// JS Classes
import Tree from './vue-components/dataTree.js';
import Selection from './vue-components/Selection.js';

$(window).on("scroll", function(e) {
  if ($(this).scrollTop() > 33) {
    $("body").addClass("fix-timer");
  } else {
    $("body").removeClass("fix-timer");
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


$.getJSON('/api/items',function(fetchedData){

	//response

	setTimeout(function(){
		let flatpickrInputs = document.getElementsByClassName("flatpickr");
		for (var i = 0; i < flatpickrInputs.length; i++) {
		    flatpickrInputs[i].flatpickr({
		    	dateFormat: 'Y-m-d H:i:S',
		    	maxDate: 'today',
		    	enableTime: true,
		    	time_24hr: true,
		    	onChange: function(dateObj, dateStr, instance){
					let el = instance.element.id;
					document.getElementById(el).focus();
				},
	    	});
		}
	}, 1000);


window.allItems = new Tree(fetchedData);
window.selection = new Selection();
window.vm = new Vue({
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
		timerItems: [],
		loading: true,
		patching: false,
	},
	components: {
		Card,
		Journal,
	},
	methods:{
		btnEffect(id, identifier){
			let $el = $('#timer-'+id+' .'+identifier);
			$el.addClass("btn--click");
			setTimeout(function(){
				$el.removeClass("btn--click");
			}, 400);
		},
		addTimer(id){
			id = (!id) ? selection.selectedId : id ;
			let item = allItems.nodes[id];
			let timerExists = this.timerItems.filter(function (item) { return item.id === id; })[0];
			if (!timerExists){
				this.timerItems.push(item);
				this.playTimer(item);
			}
		},
		playTimer(item){
			this.btnEffect(item.id, 'play');
			let update = function(){
				if(item.planned_time>0){
					item.used_time = ++item.used_time;
				} else {
					item.used_time = ++item.used_time;
				}

			}
			window.timers = (!window.timers) ? {} : timers;
			if(timers[item.id]){ return; }
			timers[item.id] = setInterval(update,1000);
		},
		pauseTimer(item){
			this.btnEffect(item.id, 'pause');
			clearInterval(window.timers[item.id]);
			delete window.timers[item.id];
			this.patch(item.id, 'used_time');
			allItems.calculateTotalTime(item.id);
		},
		forwardTimer(item){
			this.btnEffect(item.id, 'forward');
			item.used_time = item.used_time+60;
		},
		resetTimer(item){
			this.btnEffect(item.id, 'reset');
			item.used_time = 0;
			this.patch(item.id, 'used_time');
			allItems.calculateTotalTime(item.id);
		},
		removeTimer(item){
			this.btnEffect(item.id, 'close');
			clearInterval(window.timers[item.id]);
			delete window.timers[item.id];
			if(item.used_time < 5){
				item.used_time = 0;
			} else {
				this.patch(item.id, 'used_time');
				allItems.calculateTotalTime(item.id);
			}
			document.getElementById('timer-'+item.id).className += ' fade-out';
			setTimeout(function(){ this.timerItems.$remove(item) }.bind(this),1000);
		},
		showChildren(id, show){
			let item = (!id) ? allItems.nodes[selection.selectedId] : allItems.nodes[id];
			if (!item.children || !item.children.length){ return; }
			if (show == 'show'){
				item.show_children = true;
			} else if (show == 'hide') {
				item.show_children = false;
			} else {
				item.show_children = !item.show_children;
			}
			this.patch(item.id, 'show_children');
		},
		markDone(id, markAs){
			let item = (!id) ? allItems.nodes[selection.selectedId] : allItems.nodes[id];
			if (markAs == 'notDone'){
				item.done = false;
				allItems.prepareDonePatch(item.id);
				return;
			}
			if (item.children.length && !allItems.allChildrenDone(item.id)){
				return;
			}
			if (markAs == 'done') {
				item.done = true;
			} else {
				item.done = !item.done;
			}
			allItems.prepareDonePatch(item.id);
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
				setTimeout(function(){$("#new-firstchild-of-"+id+" textarea").focus();},10);
			} else {
				this.addingNewAsFirstChild = false;
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
				console.log('patched item['+id+'].'+arg+' = '+patchObj[arg]+';');
				this.patching = false;
			});
		},
		patchDueDate(id, duedate){
			this.patching = true;
			if (duedate == '0000-00-00 00:00:00'){
				this.$http.patch('/api/items/' + id, {'due_date':duedate});
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
		clickDone(){
			this.fetchDone();
			selection.filter = 'done';
		},
		fetchDone(){
			this.$http.get('/api/items/fetchdone').then(function(response){
				this.doneData = allItems.formatDone(response.json());
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
		duplicate(){
			let item = allItems.nodes[selection.selectedId];
			item.children_order = allItems.arrayToString(item.children_order);			
			console.log('dupe item.children_order = '+item.children_order);
			console.log(typeof item.children_order);
			console.log(item.children_order);
			let OlderSiblingIndex = allItems.siblingIndex(selection.selectedId);
			let index = parseInt(OlderSiblingIndex)+1;
			this.$http.post('/api/items',item) //SEND
			.then(function(response){ //response
				let storedItem = response.data;
				console.log('starting dom update...');
				console.log('ind on duplicate: '+index);
				allItems.addItem(storedItem, index);
			});
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