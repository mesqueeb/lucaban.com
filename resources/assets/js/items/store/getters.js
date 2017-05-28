import { mobilecheck,Utilities,objectToArray,uniqBy,sortObjectArrayByProperty,sortObjectArrayByTwoProperties } from '../../components/globalFunctions.js';
import { sec_to_hourmin } from '../../components/valueMorphers2.js';
import * as moment from 'moment';

export default {
totalPlannedMin: (state, getters) =>
(id = state.root.id) => {
	let item = state.nodes[id];
	if (!item){ return 0; }

	let selfValue = (item.planned_time) ? parseFloat(item.planned_time) : 0;
	let childrenArray = getters.allVisibleChildItems(id);
	if (!childrenArray || !childrenArray.length) { return selfValue; }
	let x = childrenArray.reduce(function(prevVal, child){
		return prevVal + parseFloat(child.planned_time);
	}, selfValue);
    return (x) ? parseFloat(x) : 0;
},
totalUsedSec: (state, getters) =>
(idOrItem = state.root.id) => {
	let item;
	let childrenArray;
	if (typeof idOrItem === 'object' && idOrItem.journalDate)
	{
		item = idOrItem;
		childrenArray = item.children;
	} else {
		item = state.nodes[idOrItem];
		childrenArray = getters.allVisibleChildItems(idOrItem);
	}
	if (!item){ return 0; }

	let selfValue = (item.used_time) ? parseFloat(item.used_time) : 0;
	if (!childrenArray || !childrenArray.length) { return selfValue; }
	
	let x = childrenArray.reduce(function(prevVal, child){
		return prevVal + parseFloat(child.used_time);
	}, selfValue);
    return (x) ? x : 0;
},
totalUsedMin: (state, getters) =>
(id = state.root.id) => {
	return Math.floor(getters.totalUsedSec(id)/60);
},
totalUsedHourMin: (state, getters) =>
(id = state.root.id) => {
	// console.log(`id: ${id} in totalUsedHourMin ${state.root.id}`);
	return sec_to_hourmin(getters.totalUsedSec(id));
},
totalPlannedSec: (state, getters) =>
(id = state.root.id) => {
	return getters.totalPlannedMin(id)*60;
},
totalPlannedHour: (state, getters) =>
(id = state.root.id) => {
	return getters.totalPlannedMin(id)/60;
},
totalMinLeft: (state, getters) =>
(id = state.root.id) => {
	return getters.totalPlannedMin(id)-getters.totalUsedMin(id);
},
totalSecLeft: (state, getters) =>
(id = state.root.id) => {
	return getters.totalPlannedSec(id)-getters.totalUsedSec(id);
},
totalHourMinLeft: (state, getters) =>
(id = state.root.id) => {
	return sec_to_hourmin(getters.totalSecLeft(id));
},
secLeft: (state, getters) =>
(id = state.root.id) => {
	let item = state.nodes[id];
	if (!item){ return 0; }
	return item.planned_time*60-item.used_time;
},
minLeft: (state, getters) =>
(id = state.root.id) => {
	return getters.secLeft(id)/60;
},
totalTimeDifferentFromParent: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if(!item){ return 0; }
	if(!item.parent_id){ return true; }

	return getters.totalPlannedSec(id) != getters.totalPlannedSec(item.parent_id);
},
tagsArray: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if(!item){ return []; }

	return item.tagged.map(obj => obj.tag_name);
},
oS: (state, getters) => {
	return 'mac';
},
hasTag: (state, getters) =>
(id, tags) => {
	let item = state.nodes[id];
	if (!item) { console.log("[hasTag(id, tags)] what is state shit... id:"+id); return false;}
	if (!item.tagged || !item.tagged.length){ return false; }
	let hasTags;
	if (!Array.isArray(tags)) { tags = [tags]; }
	tags.forEach(function (tag) {
		tag = Utilities.tagNameToSlug(tag);
		let tagExists = item.tagged.find(itemTags => itemTags.tag_slug == tag);
		if(tagExists){ hasTags = true; }
	});
	return hasTags;
},
hasParentWithTag: (state, getters) =>
(id, tags) => {
	if(!id){ return false; }
	let item = state.nodes[id];
	let parent_id = state.nodes[id].parent_id;
	if(!parent_id){ return false; }
	if(!state.nodes[parent_id]){
		// console.log('Parent of ('+id+')['+item.body+'] is non existant.');
		return false;
	}
	let parentHasTag = getters.hasTag(parent_id, tags);
	if (parentHasTag)
	{
		return true;
	} else {
		return getters.hasParentWithTag(parent_id, tags);
	}
},
parentIdWithTag: (state, getters) =>
(id, tags) => {
	// debugger;
	let item = state.nodes[id];
	console.log('id & body = '+item.id+" - "+item.body);
	let parent_id = state.nodes[id].parent_id;
	if(!parent_id){ return false; }
	
	let parentHasTag = getters.hasTag(parent_id, tags);
	console.log('parentHasTag');
	console.log(parentHasTag);
	if (parentHasTag)
	{
		return parent_id;
	} else {
		return getters.parentIdWithTag(parent_id, tags);
	}
},
returnTagsAsArray: (state, getters) =>
(id) => {
	return state.nodes[id].tagged.map(obj => obj.tag_name);
},
siblingIndex: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if(!item){ return false; }
	let parent_id = item.parent_id;
	if(!parent_id || !state.nodes[parent_id]){ return false; }
	// console.log('sibind parent_id');
	// console.log(parent_id);
	// console.log(state.nodes[parent_id]);
	let siblingsArray = state.nodes[parent_id].children_order;
	return siblingsArray.indexOf(id);
},
olderSiblingId: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if(!item){ return; }
	let parent_id = item.parent_id;
	if(!parent_id){ return; }
	let siblingsArray = state.nodes[parent_id].children_order;
	if(siblingsArray.length <= 1 || getters.siblingIndex(id) == 0)
	{
		return parent_id;
	}
	let siblingIndex = siblingsArray.indexOf(id);
	return state.nodes[parent_id].children_order[siblingIndex-1];
},
nextItemId: (state, getters) =>
(id, debug) => {
	if(debug){ debugger; }
	if(!id){ return; }
	let item = state.nodes[id];
	if(!item){ return; }
	let nextItemId;
	// Select next item on top level.
	if ( getters.isTopLvlItemInFilteredRoot(id) && !item.show_children
	  || selection.view == 'journal' )
	{
		let ind = getters.childrenOrder(state.root.id).indexOf(id);
		if (ind+1 == getters.childrenOrder(state.root.id).length)
		{
			return getters.childrenOrder(state.root.id)[0];
		}
		return getters.childrenOrder(state.root.id)[ind+1];
	}
	// Select first child if any.
	if (item.show_children && item.children.length)
	{
		nextItemId = item.children_order[0];
		if(getters.hiddenItemIds.includes(nextItemId))
	 	{
	 		nextItemId = getters.nextItemRecursion(nextItemId);
	 	}
 	} else {
		nextItemId = getters.nextItemRecursion(id);
 	}
 	return nextItemId;
},
nextSiblingOrParentsSiblingId: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if(!item){ return; }
	let parent_id = item.parent_id;
	if(!parent_id){ return; }
	let children_order = state.nodes[parent_id].children_order;
	let nextIndex = getters.siblingIndex(id)+1;
	if (nextIndex == children_order.length)
	{
		return getters.nextSiblingOrParentsSiblingId(parent_id);
	} else {
		return children_order[nextIndex];
	}
},
childrensDeepestChildren: (state, getters) =>
(id = state.root.id) => {
	return getters.visibleDirectChildren(id).map(function(item){
		return {
			'id':item.id,
			'deepestChild':getters.findDeepestVisibleChild(item.id)
		};
	});
},
deepestChild: (state, getters) =>
(id) => {
	return getters.childrensDeepestChildren(state.root.id).find(obj => (obj.id == id)).deepestChild;
},
topLvlParentOfDeepestChild: (state, getters) =>
(id) => {
	return getters.childrensDeepestChildren(state.root.id).find(obj => (obj.deepestChild == id)).id;
},
prevItemId: (state, getters) =>
(id, debug) => {
	if(debug){ debugger; }
	if(!id){ return false; }
	let item = state.nodes[id];
	if(item.depth == 0){ return false; }
	let parent_id = item.parent_id;
	let prevItemId;
	let index;
	// Select next item on top level.
	let childrenIds = getters.childrenOrder(state.root.id);
	if (getters.isTopLvlItemInFilteredRoot(id) || selection.view == 'journal')
	{
		index = childrenIds.indexOf(id);
		if (index == 0) {
			if(selection.view == 'journal')
			{
				prevItemId = childrenIds[childrenIds.length-1];
			} else {
				prevItemId = getters.deepestChild(childrenIds[childrenIds.length-1]);
			}
		} else {
			prevItemId = childrenIds[index-1];
			if(selection.view != 'journal')
			{
				prevItemId = getters.deepestChild(prevItemId);
			}
		}
	} else {
		index = getters.siblingIndex(id);
		if (childrenIds[0] == id)
		{
			prevItemId = getters.deepestChild(childrenIds[childrenIds.length-1]);
		} else if (index == 0) {
			prevItemId = parent_id;
		} else {
			prevItemId = state.nodes[parent_id].children_order[index-1];
			prevItemId = getters.getDeepestLastChildId(prevItemId);
		}
	}
 	if (getters.hiddenItemIds.includes(prevItemId))
 	{
	 	return getters.prevItemId(prevItemId);
 	} else {
	 	return prevItemId;
 	}
},
nextItemRecursion: (state, getters) =>
(id) => {
	// debugger;
	let nextIndex = getters.siblingIndex(id)+1;
	let item = state.nodes[id];
	let parent_id = item.parent_id;
	// let tagsSelected = selection.tags.length;

	if (getters.itIsADeepestChild(id))
	{
		let topLvlItemId = getters.topLvlParentOfDeepestChild(id);
		let topLvlChildrenIds = getters.childrenOrder(state.root.id);
		let ind = topLvlChildrenIds.indexOf(topLvlItemId);
		if (ind+1 == topLvlChildrenIds.length)
		{ 
			let firstItemId = topLvlChildrenIds[0];
			if (firstItemId == id) { return null; }
			return firstItemId;
		}
		return topLvlChildrenIds[ind+1];
	}
	let parentsChildrenOrder = state.nodes[parent_id].children_order;
	let itemIsLastSibling = (nextIndex == parentsChildrenOrder.length);
	if(itemIsLastSibling)
	{
		if(parent_id == state.root.id){ return; }
		return getters.nextItemRecursion(parent_id);
	}
	let nextItemId = state.nodes[parent_id].children_order[nextIndex];
	if (getters.hiddenItemIds.includes(nextItemId))
	{
		return getters.nextItemRecursion(nextItemId);
	}
	return nextItemId;
},
isTopLvlItemInFilteredRoot: (state, getters) =>
(id) => {
	// console.log('running isTopLvlItemInFilteredRoot');
	let s = selection;
	if (selection.nothingSelected() && selection.view == 'tree')
	{
		// console.log('the root is not filtered');
		return false;
	}
	if (id == state.root.id)
	{
		return true;
	} else if (getters.childrenOrder(state.root.id).includes(id)) {
		return true;
	} else {
		return false;
	}
},
hasParentDueToday: (state, getters) =>
(id) => {
	id = (id) ? id : selection.selectedId;
	let item = state.nodes[id];
	if (!item.parent_id){ return false; }
	let parent = state.nodes[item.parent_id];
	if (!parent){ return false; }
	let diff = moment(parent.due_date).diff(moment(), 'days');
	if (diff <= 0)
	{
		return true;
	} else {
		return getters.hasParentDueToday(item.parent_id);
	}
},
isDueToday: (state, getters) =>
(id) => {
	id = (id) ? id : selection.selectedId;
	let item = state.nodes[id];
	let diff = moment(item.due_date).diff(moment(), 'days');
	if (diff <= 0) { return true; }
	return false;
},
isProject: (state, getters) =>
(id) => {
	if(!id){ return false; }
	if (state.nodes[id].body.slice(-1) == ':')
	{
		return true;
	} else {
		return false;
	}
},
itemTagArray: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	return item.tagged.map(function(tagObj){
		return tagObj.tag_name;
	});
},
allChildrenDone: (state, getters) =>
(id) => {
	let children = state.nodes[id].children;
	if (!children.length){ return false; }
	let doneAmount = children.reduce(function (prev, child){
		let a = (child.done) ? 1 : 0 ;
		return Utilities.AplusB(a,prev);
	}, 0);
	if(children.length == doneAmount)
	{
		return true;
	} else {
		return false;
	}
},
getAllChildrenIds: (state, getters) =>
(id) => {
	let allChildrenIds = [];
	getters.getAllChildrenIdsRecursive(id, allChildrenIds);		
	return allChildrenIds;
},
getAllChildrenIdsRecursive: (state, getters) =>
(id, allChildrenIds) => {
	let item = state.nodes[id];
	if (!(Array.isArray(item.children) && item.children.length))
	{
		return;
	} else {
		item.children_order.forEach(item => { allChildrenIds.push(item); });
		item.children_order.forEach(item => { return getters.getAllChildrenIdsRecursive(item, allChildrenIds) });
	}
},
calTotalPlannedTime: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	let totalPlannedTime;
    if (!(Array.isArray(item.children) && item.children.length))
    {
    	// if we don't have children, do nothing, leave the time as-is
		totalPlannedTime = (!item.done || selection.view == 'journal') ? parseFloat(item.planned_time) : 0 ;
    } else {
		// add up all the times of our direct children
	    totalPlannedTime = item.children.reduce((prev, next) => {
	        let x = (next.totalPlannedTime) ? next.totalPlannedTime : next.planned_time ;
	        return prev+parseFloat(x);
	    }, (!item.done || selection.view == 'journal') ? parseFloat(item.planned_time) : 0 );
    }
    return parseFloat(totalPlannedTime);
},
calTotalUsedTime: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	let totalUsedTime;
    if (!(Array.isArray(item.children) && item.children.length))
    {
    	// if we don't have children, do nothing, leave the time as-is
		totalUsedTime = (!item.done || selection.view == 'journal') ? parseFloat(item.used_time) : 0 ;
    } else {
		// add up all the times of our direct children
	    totalUsedTime = item.children.reduce((prev, next) => {
	        let x = (next.totalUsedTime) ? next.totalUsedTime : next.used_time ;
	        return prev+parseFloat(x);
	    }, (!item.done || selection.view == 'journal') ? parseFloat(item.used_time) : 0 );
    }
    return parseFloat(totalUsedTime);
},
checkValParentTree: (state, getters) =>
(id, val) => {
	let pId = state.nodes[id].parent_id;
	console.log('checkValParentTree pId: '+checkValParentTree);
	if (!pId){ return false; }
	let checkVal = state.nodes[pId].item[val];
	console.log('checkValParentTree checkVal: '+checkVal);
	if (checkVal)
	{
		return checkVal;
	} else {
		return getters.checkValParentTree(pId, val);
	}
},
getParentsAsArray: (state, getters) =>
(id) => {
	let pArr = [];
	getters.getParentsRecursive(id, pArr);
	pArr.reverse().shift();
	return pArr;
},
getParentsRecursive: (state, getters) =>
(id, pArr) => {
	let pId = state.nodes[id].parent_id;
	if (!pId){ return; }
	pArr.push(state.nodes[pId].body);
	getters.getParentsRecursive(pId, pArr);
},
getLastChildId: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	let childrenCount = item.children.length;
	if(childrenCount && item.show_children)
	{
		let lastChild = item.children[childrenCount-1];
		return lastChild.id;
	}
	return id;
},
getDeepestLastChildId: (state, getters) =>
(id) => {
	// debugger;
	let lastChildId = getters.getLastChildId(id);
	let item = state.nodes[lastChildId];
	if(item.children.length && item.show_children)
	{
		return getters.getDeepestLastChildId(lastChildId);
	}
	return lastChildId;
},
setDefaultItemValues: (state, getters) =>
(item) => {
	// item.parent_id_backup = item.parent_id;
	item.depth = Number(item.depth);
	if(item.show_children == null){ item.show_children = 1 		 }
	if(!item.children)	{ item.children = []					 }
	if(!item.due_date)	{ item.due_date = "0000-00-00 00:00:00"	 }
	if(!item.done_date)	{ item.done_date = "0000-00-00 00:00:00" }
	if(!item.done)		{ item.done = false 					 }
	if(!item.used_time)	{ item.used_time = 0 					 }
	if(!item.tagged)	{ item.tagged = []	 					 }
	if(!item.children_order){ item.children_order = [];			 }
	else if (typeof item.children_order === 'string')
	{
		item.children_order = item.children_order.split(',').map(Number);
	}
	return item;
},
flattenTree: (state, getters) =>
(array) => {
	let flattenedTree = [];
	array.forEach(function(item){
		flattenedTree.push(item);
		if(item.children.length)
		{
			Array.prototype.push.apply(flattenedTree, getters.flattenTree(item.children));
		}
	});
	return flattenedTree;
},
// Original VM
itIsADeepestChild: (state, getters) =>
(id) => {
	// console.log('running itIsADeepestChild');
	if (!id){ console.log('you need an ID'); return; }
	if (getters.childrensDeepestChildren(state.root.id).map(item => item.deepestChild).includes(id))
	{
		return true;
	} return false;
},
countChildren: (state, getters) =>
(item) => {
	if (!item || !item.children){ return 0; }
	let children = getters.flattenTree(item.children);
	let x = children.length;
	return x;
},
countDoneChildren: (state, getters) =>
(item) => {
	if (!item.children){ return 0; }
	let children = getters.flattenTree(item.children);
	let doneChildren = children.filter(child => child.done);
	let x = doneChildren.length;
	return x;
},
findDeepestVisibleChild: (state, getters) =>
(id = selection.selectedId) => {
	// console.log('running findDeepestVisibleChild');
	let item = state.nodes[id];
	let children = item.children.filter(child => !getters.hiddenItemIds.includes(child.id));
	if (!children.length) { return id; }
	let deepestId = children[children.length-1].id;
	return getters.findDeepestVisibleChild(deepestId);
},
isFirstItem: (state, getters) =>
(id) => {
	if(getters.noItems){ return false; }
	return (getters.siblingIndex(id) == 0);
},
// Computed properties
language: (state, getters) => {
	if(state.setLanguage){ return state.setLanguage; }
	else if (defaultLanguage) { return defaultLanguage; }
	else { return 'en'; }
},
text: (state, getters) => {
	return state.languageContents[getters.language];
},
allData: (state, getters) => {
	if(!window.fetchedData)
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
		"children":getters.filteredItems,
		"children_order":state.nodes[state.root.id].children_order,
		"id":state.nodes[state.root.id].id,
		"depth":0,
		"done":false,
		"done_date":"0000-00-00 00:00:00",
		"due_date":"0000-00-00 00:00:00",
		"show_children":1,
		"tagged":[],
		"used_time":0
	}
},
mobile: (state, getters) => {
	if(state.manualMobile){
		return true;
	}
	return mobilecheck();
},
mobileSmall: (state, getters) => {
	if (window.innerWidth < 385){ return true; }
},
noItems: (state, getters) => {
	if(!getters.allData.children.length){ return true; }
	return false;
	// if(!state || !state.root || !state.root.children.length){
	// 	return true;
	// } return false;
},
// doneItems: (state, getters) =>
// () => { // Flat
// 	return getters.filteredItemsFlat.filter(child => child.done);
// },
filteredItems: (state, getters) => {
	// if(getters.noItems){ return []; }
	if (selection.view == 'tree')
	{
		return getters.filteredItemsTree;
	}
	else if (selection.view == 'journal')
	{
		return getters.filteredItemsJournal;
	}
},
filteredItemsJournal: (state, getters) => {
	if (selection.view != 'journal'){ return []; }
	let dates = {};
	getters.filteredItemsFlat.forEach(function(item){
		if (!item.done){ return; }
		let dd = moment(item.done_date).format('YYYY-MM-DD');
		if (!dates[dd])
		{
			dates[dd] = [];
		}
		dates[dd].push(item);
	});
	let datesArray = [];
	Object.keys(dates).forEach(function(dd){
		let journalItem = {
			'done_date':moment(dd).format('YYYY-MM-DD'),
			'children':sortObjectArrayByProperty(dates[dd], 'parents_bodies'),
			'depth':0,
			'journalDate':true,
		};
		journalItem = getters.setDefaultItemValues(journalItem);
		datesArray.push(journalItem);
	});
	datesArray = sortObjectArrayByProperty(datesArray, 'done_date', 'desc');
	return datesArray;
},
journalDates: (state, getters) => {
	return Object.keys(getters.filteredItemsJournal);
},
filteredItemsFlat: (state, getters) => {
	let ar = objectToArray(state.nodes).filter(function(item){
		let target = selection.tags.every(tag => getters.hasTag(item.id, tag));
		let targetHidden = selection.hiddenTags.some(tag => getters.hasTag(item.id, tag));
		let targetDone = (selection.view == 'journal') ? item.done : true;
		let targetToday = true;
// 		console.log(`
// ${item.body} =
// target = ${target}
// targetHidden = ${targetHidden}
// targetDone = ${targetDone}
// targetToday = ${targetToday}
// 			`);
		if ( selection.filter.includes('today') )
		{
			targetToday = false;
			let diff = moment(item.due_date).diff(moment( ), 'days');
			if ( diff <= 0 || getters.hasParentDueToday(item.id) )
			{
				targetToday = true;
			}
			let doneDateDiff = moment(item.done_date).diff(moment( ), 'days');
			if (doneDateDiff <= 1) { targetToday = false; }
		}
		if(target && !targetHidden && targetDone && targetToday)
		{
			return true;
		}
	});
	if (selection.view == 'journal')
	{
		ar = sortObjectArrayByTwoProperties(ar,'done_date','parents_bodies','desc','asc');
	}
	return ar;
},
filteredItemsTree: (state, getters) => {
	console.log(`update filteredItemsTree (nodes length: ${objectToArray(state.nodes).length})`);
	//Go through ALL ITEMS and return those that have the tag AND no parent with the tag.
	let children = objectToArray(state.nodes).filter(function(item){
		let target;
		let hasParentWithTag;
		let targetToday;
		let topLvlItem;
		if (selection.noFilterOrTag( ))
		{
			topLvlItem = (item.depth == 1) ? true : false;
			if (topLvlItem){ return true; } else { return false; }
		}

		if (selection.tags.length > 1)
		{
			hasParentWithTag = selection.tags.every(tag => getters.hasParentWithTag(item.id, tag));
		} else {
			hasParentWithTag = selection.tags.some(tag => getters.hasParentWithTag(item.id, tag));
		}
		target = selection.tags.every(tag => getters.hasTag(item.id, tag));

		if ( !selection.filter.includes('today') && target && !hasParentWithTag )
		{
			return true;
		}

		if ( selection.filter.includes('today') )
		{
			let doneDateDiff = moment(item.done_date).diff(moment( ), 'days');
			if (item.done && doneDateDiff <= -1) { return false; }
			let hasParentDueToday = getters.hasParentDueToday(item.id);
			let isDue = getters.isDueToday(item.id);
			if(!selection.tags.length && isDue)
			{
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
	});
	// Sort on root children_order when no filter:
	if(selection.noFilterOrTag( ))
	{
		let order = state.root.children_order;
		if (order instanceof Array && order.length)
		{
			// order = order.filter(id => getters.childrenOrder(state.root.id).includes(id));
			children = order.map(id => children.find(t => t.id === id));
		}
	}
	if ( selection.filter.includes('today') )
	{
		children = sortObjectArrayByProperty(children,'done_date');
	}
	return children;
},
allVisibleChildItems: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if(!item || !item.children.length){ return []; }
	
	let flattenedTree = getters.flattenTree(item.children);
	let visibleChildren = flattenedTree.filter(child => !getters.hiddenItemIds.includes(child.id));
	return visibleChildren;
},
visibleDirectChildren: (state, getters) =>
(id) => {
	if (id == state.root.id){ return getters.filteredItems; }
	let item = state.nodes[id];
	if(!item || !item.children.length){ return []; }

	return item.children.filter(child => !getters.hiddenItemIds.includes(child.id));
},
childrenOrder: (state, getters) =>
(id) => {
	let children = getters.visibleDirectChildren(id);
	if (selection.view == 'journal' && id == state.root.id)
	{
		children = children.reduce((a, c) => a.concat(c.children), []);
	}
	return children.map(child => child.id);
},
clipboardText: (state, getters) =>
(id = selection.selectedId) => {
	let item = state.nodes[id];
	if(!item){ return ''; }
	let spaceVariable = parseFloat(item.depth);
    let allChildren = getters.allVisibleChildItems(id).reduce(function(all, val){
		let spacesVal = parseFloat(val.depth)-spaceVariable;
		let spaces = '　　'.repeat(spacesVal);
		return `${all}
${spaces}・${val.body}`;
	}, `${item.body}`);
    return allChildren;
},
clipboardTextJournal: (state, getters) =>
(item) => {
	let usedT = (getters.totalUsedMin(item)) ? `
${getters.text.menu.usedTime}: ${sec_to_hourmin(getters.totalUsedSec(item))}` : '';
	let journalDateTxt = `${getters.journalDate(item)}
==========${usedT}` ;
    let allChildren = item.children.reduce(function(all, val){
    	let pb = (!all.includes(`【${val.parents_bodies}】`)) ? `
【${val.parents_bodies}】` :`` ;
		return `${all}${pb}
・${val.body}`;
	}, journalDateTxt);
    return allChildren;
},
journalDate: (state, getters) =>
(item) => {
	if ( selection.view != 'journal'
	  || !item.journalDate )
	{
		return false;
	}
	return moment(item.done_date,'YYYYMMDD').format('YYYY/MM/DD');
},
hiddenItemIds: (state, getters) => {
	// console.log('running hiddenItemIds');
	return objectToArray(state.nodes).filter(function(item){
		let targetHidden = selection.hiddenTags.some(tag => getters.hasTag(item.id, tag));
		if(targetHidden){ return true; }
	}).map(item => item.id);
},
selectionFilter: (state, getters) => { // For list title
	return selection.filter.map(function (val, i) {
		if(selection.filter.length == i+1)
		{
			val = Utilities.tagSlugToName(val);
		}
		else
		{
			val = Utilities.tagSlugToName(val)+', ';
		}
		return val;
	});
},
selectionTags: (state, getters) => { // For list title
	return selection.tags.map(function (val, i) {
		if(selection.tags.length == i+1)
		{
			val = Utilities.tagSlugToName(val);
		}
		else
		{
			val = Utilities.tagSlugToName(val)+', ';
		}
		return val;
	});
},
selectionHiddenTags: (state, getters) => { // For list title
	return selection.hiddenTags.map(function (val, i) {
		if(selection.hiddenTags.length == i+1)
		{
			val = Utilities.tagSlugToName(val);
		}
		else
		{
			val = Utilities.tagSlugToName(val)+', ';
		}
		return val;
	});
},
allTagsComputed: (state, getters) => {
	var t0 = performance.now( );
	if(getters.noItems){ return []; }
	let allTagsArray = [];
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
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
	var t1 = performance.now( );
	console.log("Call to allTagsComputed took " + (t1 - t0) + " milliseconds.")
	return allTagsArray;
},
allTagsComputed_2: (state, getters) => {
	let t2_0 = performance.now( );
	if(getters.noItems){ return []; }
	let allTagsArray = [];
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
	console.log('allTagsComputed_2');
	if(!items.length){ return []; }
	allTagsArray = items.reduce(function(a, item)
	{
		let tags = item.tagged.map(taggedObj => taggedObj.tag).filter(tag => tag);
		return a.concat(tags);
	}, []);
	allTagsArray = uniqBy(allTagsArray);
	// console.log('allTagsArray in allTagsComputed_2');
	// console.log(allTagsArray);
	allTagsArray = sortObjectArrayByProperty(allTagsArray, 'name');
	let t2_1 = performance.now( );
	console.log("Call to allTagsComputed_2 took " + (t2_1 - t2_0) + " milliseconds.")
	return allTagsArray;
},
allTagsComputed_3: (state, getters) => {
	let t3_0 = performance.now( );
	if(getters.noItems){ return []; }
	let allTagsArray = new Set( );
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
	if(!items.length){ return []; }
	items.forEach(function(item)
	{
		if(item.tagged.length){
			item.tagged.forEach(taggedObj => { if(taggedObj){ allTagsArray.add(taggedObj.tag) } });
		}
	}.bind(allTagsArray));
	allTagsArray = [...allTagsArray];
	allTagsArray = uniqBy(allTagsArray);
	allTagsArray = sortObjectArrayByProperty(allTagsArray, 'name');
	let t3_1 = performance.now( );
	console.log("Call to allTagsComputed_3 took " + (t3_1 - t3_0) + " milliseconds.")
	return allTagsArray;
},
allTagsComputed_1b: (state, getters) => {
	var t0 = performance.now( );
	if(getters.noItems){ return []; }
	let allTagsArray = [];
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
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
	var t1 = performance.now( );
	console.log("Call to allTagsComputed 1b took " + (t1 - t0) + " milliseconds.")
	return allTagsArray;
},
itemAmount: (state, getters) => {
	if(getters.noItems){ return 0; }
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
	return items.length-1;
},
doneItemAmount: (state, getters) => {
	if(getters.noItems){ return 0; }
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
	let doneChildren = items.filter(child => child.done).length;
	return doneChildren;
},
lastItems: (state, getters) => {
	if(getters.noItems ){ return []; }
	let lastChild = getters.topLvlItems[getters.topLvlItems.length-1];
	let deepestChild = getters.findDeepestVisibleChild(lastChild);
	return [lastChild, deepestChild];
},
firstItem: (state, getters) => {
	if(getters.noItems){ return null; }
	return getters.topLvlItems[0];
},
topLvlItems: (state, getters) => {
	if(getters.noItems){ return []; }
	return getters.filteredItemsTree.map(i => i.id);
},

}