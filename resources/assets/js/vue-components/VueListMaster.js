window.langContentsItems = {
	'en':
	{
		'global'://
		{
			'min':'min',
			'hour':'hour',
			'm':'m',
			'h':'h',
			'cancel':'Cancel',
			'delete':'Delete',
			'save':'save',
		},
		'menu'://
		{
			'all':'All',
			'today':'Today',
			'journal':'Journal',
			'?':'?',
			'usedTime':'Used time',
			'timeLeft':'Time left',
			'items':'Items',
			'done':'Done',
			'total':'Total',
		},
		'card'://
		{
			'duration':'Duration:',
			'addTag':'Add tag:',
			'edit':'Edit',
			'addAndContinue':'Add and continue',
			'addAndClose':'Add and close',
		},
		'tags':
		{
			'done':'Done',
			'today':'Today',
		},
		'popouts'://
		{
			'reset':'Reset',
			'ok':'Ok',
			'reallyDelete':'Really delete',
			'andAllChildren':'And all children',
			'overtime':'overtime',
			'total':'Total',
		},		
		'popups'://
		{
			'journalNotes':'Journal notes',
			'completed':'Completed',
			'completedB':'',
			'usedTime':'Used time',
			'reset':'Reset',
		},
		'guide'://
		{
			'action':'Action',
			'key':'Key',
			'keybindings': [
				{'key':'T','note':'Do <u>T</u>oday'},
				{'key':'S','note':'<u>S</u>topwatch / Timer'},
				{'key':'tab','note':'Indent item'},
				{'key':'enter','note':'Add item'},
				{'key':'cmd/ctrl + enter','note':'Edit item'},
				{'key':'shift + T','note':'Edit tags'},
				{'key':'alt + click on tag','note':'Hide tag'},
				{'key':'cmd/ctrl + ↑↓','note':'Move item up/down'},
			],
		},
	},
	'ja':
	{
		'global'://
		{
			'min':'分',
			'hour':'時',
			'm':'分',
			'h':'時',
			'cancel':'キャンセル',
			'delete':'削除',
			'save':'保存',
		},
		'menu'://
		{
			'all':'全て',
			'today':'今日',
			'journal':'日報',
			'?':'？',
			'usedTime':'使用時間',
			'timeLeft':'残時間',
			'items':'アイテム',
			'done':'完了',
			'total':'合計',
		},
		'card'://
		{
			'duration':'使用時間:',
			'addTag':'タグを追加:',
			'edit':'編集',
			'addAndContinue':'複数追加',
			'addAndClose':'追加して閉じる',
		},
		'tags':
		{
			'done':'完了',
			'today':'今日',
		},
		'popouts'://
		{
			'reset':'リセット',
			'ok':'Ok',
			'reallyDelete':'本当に削除しますか？',
			'andAllChildren':'とその中の全てのアイテム',
			'overtime':'オーバータイム',
			'total':'合計',
		},		
		'popups'://
		{
			'journalNotes':'日報メモ',
			'completed':'',
			'completedB':'を完了致しました',
			'usedTime':'使用時間',
			'reset':'リセット',
		},
		'guide'://
		{
			'action':'アクション',
			'key':'ショートカットキー',
			'keybindings': [
				{'key':'T','note':'今日のタスクとして設定'},
				{'key':'S','note':'ストップウォッチ / タイマー'},
				{'key':'tab','note':'アイテムを右へ'},
				{'key':'enter','note':'アイテムを追加'},
				{'key':'cmd/ctrl + enter','note':'アイテムを編集'},
				{'key':'shift + T','note':'タグを編集'},
				{'key':'alt + click on tag','note':'タグのアイテムを非表示'},
				{'key':'cmd/ctrl + ↑↓','note':'アイテムを上下へ移動'},
			],
		},
	},

};


import Card from './Card.vue';
import Popups from './Popups.vue';
import Popouts from './Popouts.vue';
import { hasClass, mobilecheck, isElementInViewport, objectToArray, uniqBy, uniq, arrayToString, sec_to_hourmin, sortObjectArrayByProperty, sortObjectArrayByTwoProperties, removeEmptyValuesFromArray } from '../components/globalFunctions.js';
import Selection from './Selection.js';
import Tree from './dataTree.js';

window.selection = new Selection();

export default {
	el:'#items-app',
	data: {
		doneData: null,
		// FILTER REWRITE
		// allData: {
		// 	"body":"ALL",
		// 	"children":[],
		// 	"children_order":[],
		// 	"depth":0,
		// 	"done":false,
		// 	"done_date":"0000-00-00 00:00:00",
		// 	"due_date":"0000-00-00 00:00:00",
		// 	"id":"x",
		// 	"show_children":1,
		// 	"tagged":[],
		// 	"used_time":0
		// },
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
		popouts: {'delete':[], 'timer':[], 'edit':[], 'guide':false },
		timerItems: [],
		beforeEditCache_body: null,
		beforeEditCache_planned_time: null,
		fetchedDone: false,
		cancelThroughKeydown: false,
		manualMobile: false,
		newItem: {
			body: '',
			planned_time:0,
			preparedTags:[],
			due_date: '0000-00-00 00:00:00',
			children: '',
		},
		newTag: null,
		setLanguage: null,
		langContentsItems,
		// allTags: [],
	},
	components: {
		Card,
		Popups,
		Popouts,
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
		// window.addEventListener( "scroll", function( event ) {
		//     console.log(vm.mobile); return;
		// });
		// window.addEventListener( "onscroll", function( event ) {
		//     console.log(vm.mobile); return;
		// });
   //      window.onscroll = function(e) {
			// console.log(vm.mobile); return; };
		// 	if(vm.mobile){ return; }
		// 	let el = document.getElementsByClassName('line');
		// 	// let el = $('.navigation');
		// 	if (!isElementInViewport(el[0]))
		// 	{
		//     	console.log('a');
		//     	document.querySelector("body").className += " scrolled-down";
		// 	}
		// 	else
		// 	{
		//     	let a = document.querySelector("body");
		//     	document.querySelector("body").className = a.className.replace('scrolled-down','');
		//     	console.log(a.className);
		// 	}
		// }.bind(this);
    },
	computed:{
		language()
		{
			if(this.setLanguage){ return this.setLanguage; }
			else if (defaultLanguage) { return defaultLanguage; }
			else { return 'en'; }
		},
		text()
		{
			if(this.language == 'en'){ return this.langContentsItems.en; }
			if(this.language == 'ja'){ return this.langContentsItems.ja; }
		},
		allData(){
			if(!allItems || !allItems.root)
			{
				return {
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
				};
			}
			return {
				"body":"ALL",
				"children":this.filteredItems,
				"children_order":this.nodes[allItems.root.id].children_order,
				"id":this.nodes[allItems.root.id].id,
				"depth":0,
				"done":false,
				"done_date":"0000-00-00 00:00:00",
				"due_date":"0000-00-00 00:00:00",
				"show_children":1,
				"tagged":[],
				"used_time":0
			}
		},
		mobile()
		{
			if(this.manualMobile){
				return true;
			}
			return mobilecheck();
		},
		mobileSmall()
		{
			if (window.innerWidth < 385){ return true; }
		},
		noItems()
		{
			if(!this.allData.children.length){ return true; }
			// if(!allItems || !allItems.root || !allItems.root.children.length){
			// 	return true;
			// } return false;
		},
		// doneItems() // Flat
		// {
		// 	return this.filteredItemsFlat.filter(child => child.done);
		// },
		filteredItems()
		{
			// if(this.noItems){ return []; }
			if (this.selection.view == 'tree')
			{
				return this.filteredItemsTree;
			}
			else if (this.selection.view == 'journal')
			{
				return this.filteredItemsFlat;
			}
		},
		filteredItemsFlat()
		{
			let ar = objectToArray(this.nodes).filter(function(item){
				let target = this.selection.tags.every(tag => allItems.hasTag(item.id, tag));
				let targetHidden = this.selection.hiddenTags.some(tag => allItems.hasTag(item.id, tag));
				let targetDone = (selection.view == 'journal') ? item.done : true;
				let targetToday = true;
				if ( selection.filter.includes('today') )
				{
					targetToday = false;
					let diff = moment(item.due_date).diff(moment(), 'days');
					if ( diff <= 0 || allItems.hasParentDueToday(item.id) )
					{
						targetToday = true;
					}
					let doneDateDiff = moment(item.done_date).diff(moment(), 'days');
					if (doneDateDiff <= 1) { targetToday = false; }
				}
				if(target && !targetHidden && targetDone && targetToday)
				{
					return true;
				}
			}.bind(this));
			if (selection.view == 'journal')
			{
				ar = sortObjectArrayByTwoProperties(ar,'done_date','parents_bodies','desc','asc');
			}
			return ar;
		},
		filteredItemsTree()
		{
			//Go through ALL ITEMS and return those that have the tag AND no parent with the tag.
			let children = objectToArray(this.nodes).filter(function(item){
				let target;
				let hasParentWithTag;
				let targetToday;
				let topLvlItem;
				if (this.selection.noFilterOrTag())
				{
					topLvlItem = (item.depth == 1) ? true : false;
					if (topLvlItem){ return true; } else { return false; }
				}

				if (this.selection.tags.length > 1)
				{
					hasParentWithTag = this.selection.tags.every(tag => allItems.hasParentWithTag(item.id, tag));
				} else {
					hasParentWithTag = this.selection.tags.some(tag => allItems.hasParentWithTag(item.id, tag));
				}
				target = this.selection.tags.every(tag => allItems.hasTag(item.id, tag));

				if ( !selection.filter.includes('today') && target && !hasParentWithTag )
				{
					return true;
				}

				if ( selection.filter.includes('today') )
				{
					let doneDateDiff = moment(item.done_date).diff(moment(), 'days');
					if (doneDateDiff <= 1) { return false; }
					let hasParentDueToday = allItems.hasParentDueToday(item.id);
					let isDue = allItems.isDueToday(item.id);
					if(!selection.tags.length && isDue)
					{
						console.log('(!selection.tags.length && isDue)');
						return true;
					}
					else if ( 	selection.tags.length
							&& 	target
							&& 	(isDue || hasParentDueToday)
							&& 	!(hasParentWithTag && hasParentDueToday) )
					{
						return true;
					}
				}
				return false;
			}.bind(this));
			// Sort on root children_order when no filter:
			if(this.selection.noFilterOrTag())
			{
				let order = allItems.root.children_order;
				if (order instanceof Array && order.length)
				{
					// order = order.filter(id => this.$refs.root.childrenOrder.includes(id));
					children = order.map(id => children.find(t => t.id === id));
				}
			}
			if ( selection.filter.includes('today') )
			{
				children = sortObjectArrayByProperty(children,'done_date');
			}
			return children;
		},
		hiddenItemIds()
		{
			return objectToArray(this.nodes).filter(function(item){
				let targetHidden = this.selection.hiddenTags.some(tag => allItems.hasTag(item.id, tag));
				if(targetHidden){ return true; }
			}.bind(this)).map(item => item.id);
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
		// allVisibleItems()
		// {
		// 	if(!this.allData){ return []; }
		// 	return filteredItemsFlat;
		// 	// let items = allItems.flattenTree(allItems.root.children);
		// 	// return items.filter(function(item)
		// 	// {
		// 	// 	return !selection.hiddenItems.includes(item.id);
		// 	// });
		// },
		allTagsComputed()
		{
			var t0 = performance.now();
			if(this.noItems){ return []; }
			let allTagsArray = [];
			// let items = allItems.flattenTree(allItems.root.children);
			// FILTER REWRITE
			// let items = this.allVisibleItems;
			// let items = (this.$refs.root) ? this.$refs.root.allVisibleChildItems : [] ;
			let items = (this.filteredItemsFlat.length) ? this.filteredItemsFlat : [] ;
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
			if(this.noItems){ return []; }
			let allTagsArray = [];
			// let items = allItems.flattenTree(allItems.root.children);
			// FILTER REWRITE
			// let items = this.allVisibleItems;
			// let items = (this.$refs.root) ? this.$refs.root.allVisibleChildItems : [] ;
			let items = (this.filteredItemsFlat.length) ? this.filteredItemsFlat : [] ;
			console.log('allTagsComputed_2');
			// console.log('this.$refs.root.allVisibleChildItems');
			// console.log(this.$refs.root.allVisibleChildItems);
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
			if(this.noItems){ return []; }
			let allTagsArray = new Set();
			// let items = allItems.flattenTree(allItems.root.children);
			// FILTER REWRITE
			// let items = this.allVisibleItems;
			// let items = (this.$refs.root) ? this.$refs.root.allVisibleChildItems : [] ;
			let items = (this.filteredItemsFlat.length) ? this.filteredItemsFlat : [] ;
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
			if(this.noItems){ return []; }
			let allTagsArray = [];
			// let items = allItems.flattenTree(allItems.root.children);
			// FILTER REWRITE
			// let items = this.allVisibleItems;
			// let items = (this.$refs.root) ? this.$refs.root.allVisibleChildItems : [] ;
			let items = (this.filteredItemsFlat.length) ? this.filteredItemsFlat : [] ;
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
		itemAmount()
		{
			if(this.noItems){ return 0; }
			// let x = this.countChildren(this.allData);
			// let x = this.$refs.root.allVisibleChildItems.length;
			let items = (this.filteredItemsFlat.length) ? this.filteredItemsFlat : [] ;
			return items.length-1;
		},
		doneItemAmount()
		{
			if(this.noItems){ return 0; }
			// let doneChildren = this.$refs.root.allVisibleChildItems.filter(child => child.done).length;
			let items = (this.filteredItemsFlat.length) ? this.filteredItemsFlat : [] ;
			let doneChildren = items.filter(child => child.done).length;
			return doneChildren;
		},
		totalPlannedMin()
		{ if(this.noItems){ return 0; }
			let selfValue = 0;
			let childrenArray = this.filteredItemsFlat;
			if (!childrenArray || !childrenArray.length) { return selfValue; }
			let x = childrenArray.reduce(function(prevVal, child){
				return prevVal + parseFloat(child.planned_time);
			}, selfValue);
		    return (x) ? parseFloat(x) : 0;
		},
		totalPlannedSec()
		{
			return this.totalPlannedMin*60;
		},
		totalUsedSec()
		{ if(this.noItems){ return 0; }
			let selfValue = 0;
			let childrenArray = this.filteredItemsFlat;
			if (!childrenArray || !childrenArray.length) { return selfValue; }
			let x = childrenArray.reduce(function(prevVal, child){
				return prevVal + parseFloat(child.used_time);
			}, selfValue);
		    return (x) ? x : 0;
		},
		totalSecLeft()
		{
			if(this.noItems){ return 0; }
			return this.totalPlannedSec-this.totalUsedSec;
		},
		totalUsedHourMin()
		{
			return sec_to_hourmin(this.totalUsedSec);
		},
		totalHourMinLeft()
		{
			return sec_to_hourmin(this.totalSecLeft);
		},
		lastItems()
		{
			if(this.noItems ){ return []; }
			let lastChild = this.topLvlItems[this.topLvlItems.length-1];
			let deepestChild = this.findDeepestVisibleChild(lastChild);
			return [lastChild, deepestChild];
		},
		firstItem()
		{
			if(this.noItems){ return null; }
			return this.topLvlItems[0];
		},
		topLvlItems()
		{
			if(this.noItems){ return []; }
			return this.filteredItemsTree.map(i => i.id);
		},
		// hiddenItemsTotalUsedTime()
		// {
		// 	// CodeMentor
		// 	if(!this.selection.hiddenItems.length){ return 0; }
		// 	return this.selection.hiddenItems.reduce(function(a,id){
		// 		let b = allItems.nodes[id].used_time;
		// 		return a + b;
		// 	}, 0);
		// },
		// hiddenItemsTotalPlannedTime()
		// {
		// 	// CodeMentor
		// 	if(!this.selection.hiddenItems.length){ return 0; }		
		// 	return this.selection.hiddenItems.reduce(function(a,id){
		// 		let b = allItems.nodes[id].planned_time;
		// 		return a + b;
		// 	}, 0);
		// },
	},
	watch:
	{
		// allTagsComputed()
		// {
		// 	alert('allTagsComputed changed');
		// 	console.log('allTagsComputed changed');
		// },
		// selection:
		// {
		// 	handler() {
				// try 2
				// Vue.nextTick(() => {
				// 	this.allTagsComputed.forEach(t => {
				// 		let el = document.querySelector("a[value='"+t.slug+"']");
				// 		if(selection.tags.includes(t.slug))
				// 		{
				// 			el.className += ' active';
				// 		} else {
				// 			el.className = el.className.replace('active','');
				// 		}
				// 	})				
				// });
				// Vue.nextTick(()=> console.log('a'));
				
				// try 3
				// setTimeout(() => {
				// 	document.querySelectorAll(".tag-menu a").forEach(el => el.className = el.className.replace('active',''));
				// 	this.allTagsComputed.forEach(t => {
				// 		let el = document.querySelector("a[value='"+t.slug+"']");
				// 		if(selection.tags.includes(t.slug))
				// 		{
				// 			el.className += ' active';
				// 		} else {
				// 			el.className = el.className.replace('active','');
				// 		}
				// 	})
				// },1000);
		    // },
		    // deep: true
		// },
	},
	methods:
	{
		startEdit(item, event)
		{
			// debugger;
			if (event &&
				(event.srcElement.hasClass('done')
				|| event.srcElement.hasClass('custom-tag')))
			{
				return;
			}
			console.log('startEdit');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			this.beforeEditCache_body = item.body;
			this.beforeEditCache_planned_time = item.planned_time;
			// if( this.mobile )
			// {
			// 	this.popouts.edit.push(item);
			// 	return;
			// }
			this.editingItem = item.id;
		},
		scrollToItemIfNeeded(id)
		{
			let el = document.getElementById('item-body-'+id);
			if(!isElementInViewport(el))
			{
				el.scrollIntoView();
			}
		},
		doneEdit(item)
		{
			console.log('Done edit!');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			// if (!this.editingItem)
			// {
			// 	return;
			// }
			this.editingItem = null;
			vm.popouts.edit = [];
			if(this.editingItemTags)
			{
				this.editingItemTags = null;
				return;
			}
			if (!item.body)
			{
				item.body = this.beforeEditCache_body;
			}
			// item.body = item.body.trim();

			if (typeof item.planned_time != 'number' || Number.isNaN(item.planned_time))
			{
				item.planned_time = 0;
			}
			if (item.planned_time != this.beforeEditCache_planned_time)
			{
				this.patch(item.id, 'planned_time');
			}
			if (item.body != this.beforeEditCache_body)
			{
				this.patch(item.id, 'body');
				allItems.copyParentBodyToAllChildren(item.id);
			}
			this.beforeEditCache_body = null;
			this.beforeEditCache_planned_time = null;
			// setTimeout(() => this.convertbodyURLtoHTML(),1000);
		},
		cancelEdit(item)
		{
			item = (item) ? item : allItems.nodes[selection.selectedId];
			if(this.editingItem || this.popouts.edit.length)
			{
				console.log("cancel edit. Reverting to:");
				console.log(this.beforeEditCache_body);
				item.body = this.beforeEditCache_body;
				item.planned_time = this.beforeEditCache_planned_time;
			}
			this.editingItem = null;
			this.editingItemTags = null;
			this.popouts.edit = [];
		},
		cancelAddNew()
		{
			console.log('cancelAddNew');
			this.addingNewUnder = null;
			selection.selectedId = selection.lastSelectedId;
			// Reset newItem to sibling stance.
			this.addingNewAsChild = false;
			// $(':focus').blur();
		},
		addNew(addNextItemAs, newItem, parentToBe, addTags)
		{
			parentToBe = (parentToBe) ? parentToBe : allItems.nodes[selection.selectedId];
			newItem = (newItem) ? newItem : this.newItem;
			addTags = (addTags) ? addTags : [];
			let index;

			if(!newItem.body){ return; }
			newItem.parent_id = (parentToBe.parent_id) ? parentToBe.parent_id : allItems.root.id;
			newItem.depth = parentToBe.depth;

			let OlderSiblingIndex = allItems.siblingIndex(parentToBe.id);
			index = (isNaN(OlderSiblingIndex)) ? 0 : OlderSiblingIndex+1;
			
			if (this.addingNewAsChild || this.noItems)
			{
				newItem.depth = parentToBe.depth + 1;
        		newItem.parent_id = parentToBe.id;
        		index = 0;
			}
			if(selection.view == "journal")
			{
				newItem.done = 1;
				newItem.done_date = parentToBe.done_date;
			}
			if ( selection.filter.includes('today')
			   && allItems.isTopLvlItemInFilteredRoot(parentToBe.id)
			   && !this.addingNewAsChild )
			{
				newItem.due_date = moment().format();
				addTags = addTags.filter(function(val){
					return val != 'Today';
				});
			}
			console.log('sending newItem:');
			console.log(newItem);
			console.log('sending tags:');
			console.log(addTags);
			// Send to Root for Ajax call.
			this.postNewItem(newItem, index, addNextItemAs, addTags);
			allItems.addTempNewItem(newItem, index, addNextItemAs, addTags);
		},
		itIsADeepestChild(id)
		{
			if (!id){ console.log('you need an ID'); return; }
			if (this.$refs.root.childrensDeepestChildren.map(item => item.deepestChild).includes(id))
			{
				return true;
			} return false;
		},
		checkFilteredItemsTree()
		{
			//Go through ALL ITEMS and return those that have the tag AND no parent with the tag.
			objectToArray(this.nodes).forEach(function(item){
				let target;
				let targetHidden;
				let hasParentWithTag;
				let targetToday;
				let topLvlItem;
				if (this.selection.nothingSelected())
				{
					topLvlItem = (item.depth == 1) ? true : false;
					if (topLvlItem){ return true; }
				} else {
					target = this.selection.tags.every(tag => allItems.hasTag(item.id, tag));
					targetHidden = this.selection.hiddenTags.some(tag => allItems.hasTag(item.id, tag));
					hasParentWithTag = this.selection.tags.some(tag => allItems.hasParentWithTag(item.id, tag));
					targetToday = true;
					if ( selection.filter.includes('today') )
					{
						targetToday = false;
						let diff = moment(item.due_date).diff(moment(), 'days');
						if (diff <= 0) { targetToday = true; }
					}
				}
				if (target){
					console.log(`target = [${item.body}]
					hidden: ${targetHidden}
					parentwithTag: ${hasParentWithTag}
					targetToday: ${targetToday}`);
				}
				// if ( target && !targetHidden && !hasParentWithTag && targetToday )
				// {
				// 	return true;
				// }
			}.bind(this));
		},
		// resetDoneData()
		// {
		// 	let dd = objectToArray(this.nodes).filter(item => item.done);
		// 	dd = sortObjectArrayByTwoProperties(dd,'done_date','parents_bodies','desc','asc');
		// 	this.doneData = dd;
		// },
		tagSlugToName(tagslug)
		{
			return allItems.tagSlugToName(tagslug);
		},
		countChildren(item){
			if (!item || !item.children){ return 0; }
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
		selectItem(direction)
		{
			let id = selection.selectedId;
			let item = allItems.nodes[id];
			let sel;
			if(direction == 'next')
			{
				if (!id || id == allItems.root.id)
				{
					sel = this.$refs.root.childrenOrder[0];
				} else {
					sel = allItems.nextItemId(id);
				}
			} else if (direction == 'prev') {
				if (!id || id == allItems.root.id)
				{
					let l = this.$refs.root.childrenOrder.length;
					sel = this.$refs.root.childrenOrder[l-1];
				} else {
					sel = allItems.prevItemId(id);
				}
			}
			selection.selectedId = sel;
			this.scrollToItemIfNeeded(sel);
		},
		findDeepestVisibleChild(id)
		{
			id = (id) ? id : selection.selectedId;
			let item = allItems.nodes[id];
			let children = item.children.filter(child => !this.hiddenItemIds.includes(child.id));
			if (!children.length) { return id; }
			let deepestId = children[children.length-1].id;
			return this.findDeepestVisibleChild(deepestId);
		},
		setToday(id)
		{
			id = (id) ? id : selection.selectedId;
			if(allItems.hasParentDueToday(id)){ console.log('parent is already due'); return; }
			allItems.setDueDate(id);
		},
		showAddNewItem(id, addAs){
			id = (id) ? id : (selection.selectedId) ? selection.selectedId : allItems.root.id ;
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
		patch(id, arg, value){
			// if(allItems.isTopLvlItemInFilteredRoot(id)){ 
			// 	if(arg == 'children_order' || arg == 'parent_id'){
			// 		console.log("you can't sync a toplvlItem when filtering");
			// 		return;
			// 	}
			// }
			this.startPatching();
			let patchObj = {};
			let patchVal = (value) ? value : allItems.nodes[id][arg];
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
			allItems.updateItemTagsDom(id, tags, requestType);
			if(Array.isArray(tags)){
				tags = removeEmptyValuesFromArray(tags);
				if(!tags.length){ return; }
			} else {
				if(!tags.replace(/\s/g, "").length){ return; }
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
					allItems.nodes[id].tagged = updatedTagList.data;
					console.log('updatedTagList of ['+allItems.nodes[id].body+'] with: '+updatedTagList.data.map(t => t.tag_name)+';');
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
				// console.log("poppy doesn't exist");
				if(type=='timer'){
					this.popouts.timer.push(item);
					Vue.nextTick(function () {
						eventHub.$emit('playTimer', item);
						console.log('emitted playTimer');
					});
				}
				if(type=='confirm-delete'){
					this.popouts.delete.push(item);
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
				});
				// Codementor
				this.selection.view = null;
				this.selection.view = 'journal';
				this.loading = false;
			});
		},

		// fetchTagged(tags, requestType){
		// 	/* requestType can be:
		// 		'withAnyTag': fetch articles with any tag listed
		// 		'withAllTags': only fetch articles with all the tags
		// 		'tagNames': fetch all existing tags
		// 	*/
		// 	this.loading = true;
		// 	let request = {};
		// 	requestType = (!requestType) ? 'withAnyTag' : requestType;
		// 	request['tags'] = tags;
		// 	request['type'] = requestType;
		// 	console.log('request');
		// 	console.log(request);
		// 	this.$http.post('/api/itemtags/fetchTagged', request).then(function(response){
		// 		let aaa = response.data;
		// 		aaa = json(aaa);
		// 		console.log('fetched tagged items!');
		// 		console.log(response);
		// 		console.log(response.json());
		// 		console.log(aaa);
		// 		allItems.filteredTagItems = aaa;
		// 		allItems.nodes = aaa;
		// 		allItems.root = aaa;
		// 		this.allData = aaa;
		// 		this.loading = false;
		// 	});
		// },
		filterItems(keyword, value, event)
		{
			// debugger;
			let operator = null;
			if (event){
				event.preventDefault();
				if (event.ctrlKey || event.metaKey)
				{
					operator = 'AND';
				} else if (event.altKey) {
					operator = 'NOT';
				}
			}
			if (!operator)
			{
				selection.clear();
			}
			if (keyword == 'journal' && !this.fetchedDone)
			{
				this.fetchDone(null,operator);
			}
			selection.addKeywords(keyword,value,operator);
			// FILTER REWRITE
			// allItems.filterItems(keyword,value,operator);
			// setTimeout(()=>{ 
			// 	let a = selection.tags;
			// 	selection.tags = [];
			// 	selection.tags = a;
			// 	console.log(selection.tags);
			// },500);
			// console.log(selection.tags);
			// setTimeout(()=>{ vm.test() },1000);
		},
		removeFilter(tag)
		{
			selection.hiddenTags = selection.hiddenTags.filter(x => x !== tag);
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
		isFirstItem(id)
		{
			if(this.noItems){ return false; }
			return (allItems.siblingIndex(id) == 0);
		},
		test(id){
			document.querySelectorAll(".tag-menu a").forEach(el => alert(JSON.stringify(el.style.color)));
			// id = (!id) ? selection.selectedId : id ;
			// id = selection.selectedId;
			// let item = allItems.nodes[id];
			// this.patchTag(id, 'bloem', 'tag');

		},
		alert(value)
		{
			alert(value);
		},
		// tagActive(tag)
		// {
		// 	console.log(tag);
		// 	return selection.tags.includes(tag);
		// 	console.log(this.allTagsComputed.map(t => t.name));
		// 	console.log(selection.tags);
		// 	if(selection.tags.includes(tagslug)){ console.log(tagslug); }
		// 	let a;
		// 	Vue.nextTick(() => {
		// 		a = true;
		// 		return selection.tags.includes(tagslug)
		// 	});
		// 	console.log(a);
		// },
	},
	http: {
		headers: {
			'X-CSRF-TOKEN': document.querySelector('#csrf-token').getAttribute('content'),
		},
    },
}