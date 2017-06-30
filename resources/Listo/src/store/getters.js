import { format, formatRelative, differenceInCalendarDays } from 'date-fns/esm'
// import { enhancedGetters } from 'vuex-strong-cache'
import { Platform } from 'quasar'
import {
	Utilities,objectToArray,uniqBy,sortObjectArrayByProperty,sortObjectArrayByTwoProperties
} from '../helpers/globalFunctions.js'
import { sec_to_hourmin } from '../helpers/valueMorphers2.js'

export default {
// ...enhancedGetters({
	totalPlannedMin: (state, getters) =>
	(id = state.root.id) => {
		let item = state.nodes[id];
		if (!item){ return 0; }

		let selfValue = (item.planned_time) ? parseFloat(item.planned_time) : 0;
		let childrenArray = getters.allVisibleChildIds(id);
		if (!childrenArray || !childrenArray.length) { return selfValue; }
		let x = childrenArray.reduce(function(prevVal, childId){
			let child = state.nodes[childId];
			let plannedTime = (!child) ? 0 : child.planned_time;
			return prevVal + parseFloat(plannedTime);
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
			childrenArray = getters.allVisibleChildIds(idOrItem);
		}
		if (!item){ return 0; }

		let selfValue = (item.used_time) ? parseFloat(item.used_time) : 0;
		if (!childrenArray || !childrenArray.length) { return selfValue; }
		
		let x = childrenArray.reduce(function(prevVal, childId){
			let child = state.nodes[childId];
			let usedTime = (!child) ? 0 : child.used_time;
			return prevVal + parseFloat(usedTime);
		}, selfValue);
	    return (x) ? x : 0;
	},
// }),
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
	if (!item){ return 0; }
	if (!item.parent_id){ return true; }

	return getters.totalPlannedSec(id) != getters.totalPlannedSec(item.parent_id);
},
oS: (state, getters) => {
	return Platform.is.platform;
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
		if (tagExists){ hasTags = true; }
	});
	return hasTags;
},
hasParentWithTag: (state, getters) =>
(id, tags) => {
	if (!id){ return false; }
	let item = state.nodes[id];
	let parentId = state.nodes[id].parent_id;
	if (!parentId){ return false; }
	if (!state.nodes[parentId]){
		// console.log('Parent of ('+id+')['+item.body+'] is non existant.');
		return false;
	}
	let parentHasTag = getters.hasTag(parentId, tags);
	if (parentHasTag)
	{
		return true;
	} else {
		return getters.hasParentWithTag(parentId, tags);
	}
},
parentIdWithTag: (state, getters) =>
(id, tags) => {
	// debugger;
	let item = state.nodes[id];
	console.log('id & body = '+item.id+" - "+item.body);
	let parentId = state.nodes[id].parent_id;
	if (!parentId){ return false; }
	
	let parentHasTag = getters.hasTag(parentId, tags);
	console.log('parentHasTag');
	console.log(parentHasTag);
	if (parentHasTag)
	{
		return parentId;
	} else {
		return getters.parentIdWithTag(parentId, tags);
	}
},
tagsArray: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if (!item){ return []; }
	return item.tagged.map(obj => obj.tag_name);
},
siblingIndex: (state, getters) =>
(id, {visibleChildrenOnly = false} = {visibleChildrenOnly: false}) => {
	let item = state.nodes[id];
	if (!item){ return false; }
	let parentId = item.parent_id;
	if (!parentId || !state.nodes[parentId]){ return false; }
	let siblingsArray;
	if (visibleChildrenOnly)
	{
		siblingsArray = getters.visibleDirectChildIds(parentId);
	}
	else
	{
		siblingsArray = state.nodes[parentId].children_order;
	}
	return siblingsArray.indexOf(id);
},
olderSiblingId: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if (!item){ return; }
	let parentId = item.parent_id;
	if (!parentId){ return; }
	let siblingsArray = state.nodes[parentId].children_order;
	if (siblingsArray.length <= 1 || getters.siblingIndex(id) == 0)
	{
		return parentId;
	}
	let siblingIndex = siblingsArray.indexOf(id);
	return state.nodes[parentId].children_order[siblingIndex-1];
},
nextItemId: (state, getters) =>
(id, debug) => {
	if (debug){ debugger; }
	if (!id){ return; }
	let item = state.nodes[id];
	if (!item){ return; }

	// Journal
	if (state.selection.view == 'journal')
	{
		let ind = getters.filteredIdsTree.indexOf(id);
		if (ind+1 == getters.filteredIdsTree.length)
		{
			return getters.filteredIdsTree[0];
		}
		return getters.filteredIdsTree[ind+1];
	}
	// Select next item on top level.
	else if (getters.filteredIdsTree.includes(id)
		&& (!getters.visibleDirectChildren(id).length
			|| !item.show_children ))
	{
		let ind = getters.filteredIdsTree.indexOf(id);
		if (ind+1 == getters.filteredIdsTree.length)
		{
			return getters.filteredIdsTree[0];
		}
		return getters.filteredIdsTree[ind+1];
	}
	// Select first child if any.
	else if ( getters.visibleDirectChildIds(id).length && item.show_children)
	{
		return getters.visibleDirectChildIds(id)[0];
 	}
	// All other cases
 	else
 	{
		return getters.nextItemRecursion(id);
 	}
},
nextItemRecursion: (state, getters) =>
(id) => {
	if (!id){ return; }
	if (getters.itIsADeepestChild(id))
	{
		let topLvlItemId = getters.topLvlParentOfDeepestChild(id);
		let index = getters.filteredIdsTree.indexOf(topLvlItemId);
		if (index+1 == getters.filteredIdsTree.length)
		{ 
			let firstItemId = getters.filteredIdsTree[0];
			if (firstItemId == id) { return null; }
			return firstItemId;
		}
		return getters.filteredIdsTree[index+1];
	}
	let index = getters.siblingIndex(id, {visibleChildrenOnly:true});
	let parentId = state.nodes[id].parent_id;
	let parentsChildren = getters.visibleDirectChildIds(parentId);
	if (index+1 == parentsChildren.length)
	{
		if (parentId == state.root.id){ return; }
		return getters.nextItemRecursion(parentId);
	}
	return parentsChildren[index+1];
},
nextSiblingOrParentsSiblingId: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if (!item){ return; }
	let parentId = item.parent_id;
	if (!parentId){ return; }
	let children_order = state.nodes[parentId].children_order;
	let nextIndex = getters.siblingIndex(id)+1;
	if (nextIndex == children_order.length)
	{
		return getters.nextSiblingOrParentsSiblingId(parentId);
	} else {
		return children_order[nextIndex];
	}
},
findDeepestVisibleChild: (state, getters) =>
(id = state.selection.selectedId) => {
	let childrenIds = getters.visibleDirectChildIds(id);
	if (!childrenIds.length)
	{
		return id;
	}
	let deepestId = childrenIds[childrenIds.length-1];
	return getters.findDeepestVisibleChild(deepestId);
},
filteredItemsTreeDeepestChildren: (state, getters) => {
	return getters.filteredIdsTree.map(id => {
		return {
			'id':id,
			'deepestChild':getters.findDeepestVisibleChild(id)
		};
	});
},
itIsADeepestChild: (state, getters) =>
(id) => {
	// console.log('running itIsADeepestChild');
	if (!id){ console.log('you need an ID'); return; }
	return getters.filteredItemsTreeDeepestChildren.map(item => item.deepestChild).includes(id);
},
topLvlParentOfDeepestChild: (state, getters) =>
(id) => {
	return getters.filteredItemsTreeDeepestChildren.find(obj => (obj.deepestChild == id)).id;
},
isFirstItem: (state, getters) =>
(id) => {
	if (getters.noItems){ return false; }
	return (getters.siblingIndex(id) == 0);
},
prevItemId: (state, getters) =>
(id, debug) => {
	if (debug){ debugger; }
	if (!id || state.nodes[id].depth == 0){ return false; }
	let prevItemId;
	// Previous item in JOURNAL
	if (state.selection.view == 'journal')
	{
		let journalChildren = getters.filteredIdsTree;
		let index = journalChildren.indexOf(id);
		if (index == 0)
		{
			prevItemId = journalChildren[journalChildren.length-1];
		}
		else
		{
			prevItemId = journalChildren[index-1];
		}
	}
	// Previous item on top level
	else if (getters.filteredIdsTree.includes(id))
	{
		let topLvlIds = getters.filteredIdsTree;
		let index = topLvlIds.indexOf(id);
		if (index == 0) {
			prevItemId = getters.findDeepestVisibleChild(topLvlIds[topLvlIds.length-1]);
		} else {
			prevItemId = getters.findDeepestVisibleChild(topLvlIds[index-1]);
		}
	// All other cases
	} else {
		let item = state.nodes[id];
		let index = getters.siblingIndex(id, {visibleChildrenOnly:true});
		if (index == 0) {
			prevItemId = item.parent_id;
		} else {
			let elderSiblingId = getters.visibleDirectChildIds(item.parent_id)[index-1];
			prevItemId = getters.findDeepestVisibleChild(elderSiblingId);
		}
	}
 	return prevItemId;
},
isTopLvlItemInFilteredRoot: (state, getters) =>
(id) => {
	// console.log('running isTopLvlItemInFilteredRoot');
	if (getters['selection/nothingSelected'] && state.selection.view == 'tree')
	{
		// console.log('the root is not filtered');
		return false;
	}
	if (id == state.root.id)
	{
		return true;
	}
	return getters.filteredIdsTree.includes(id);
},
hasParentDueToday: (state, getters) =>
(id) => {
	id = (id) ? id : state.selection.selectedId;
	let item = state.nodes[id];
	if (!item.parent_id){ return false; }
	let parent = state.nodes[item.parent_id];
	if (!parent){ return false; }
	let diff = differenceInCalendarDays(new Date(parent.due_date), new Date());
	if (diff <= 0)
	{
		return true;
	} else {
		return getters.hasParentDueToday(item.parent_id);
	}
},
isDueToday: (state, getters) =>
(id = state.selection.selectedId) => {
	let item = state.nodes[id];
	if (!item){ return false; }

	let diff = differenceInCalendarDays(new Date(item.due_date), new Date());
	if (diff <= 0) { return true; }
	return false;
},
isProject: (state, getters) =>
(id) => {
	if (!id){ return false; }
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
	if (children.length == doneAmount)
	{
		return true;
	} else {
		return false;
	}
},
calTotalPlannedTime: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	let totalPlannedTime;
    if (!(Array.isArray(item.children) && item.children.length))
    {
    	// if we don't have children, do nothing, leave the time as-is
		totalPlannedTime = (!item.done || state.selection.view == 'journal') ? parseFloat(item.planned_time) : 0 ;
    } else {
		// add up all the times of our direct children
	    totalPlannedTime = item.children.reduce((prev, next) => {
	        let x = (next.totalPlannedTime) ? next.totalPlannedTime : next.planned_time ;
	        return prev+parseFloat(x);
	    }, (!item.done || state.selection.view == 'journal') ? parseFloat(item.planned_time) : 0 );
    }
    return parseFloat(totalPlannedTime);
},
calTotalUsedTime: (state, getters) =>
(id) => {
	let item = state.nodes[id];
	if (!item){ return 0; }
	let totalUsedTime;
    if (!(Array.isArray(item.children) && item.children.length))
    {
    	// if we don't have children, do nothing, leave the time as-is
		totalUsedTime = (!item.done || state.selection.view == 'journal') ? parseFloat(item.used_time) : 0 ;
    } else {
		// add up all the times of our direct children
	    totalUsedTime = item.children.reduce((prev, next) => {
	        let x = (next.totalUsedTime) ? next.totalUsedTime : next.used_time ;
	        return prev+parseFloat(x);
	    }, (!item.done || state.selection.view == 'journal') ? parseFloat(item.used_time) : 0 );
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
setDefaultItemValues: (state, getters) =>
(item) => {
	// item.parent_id_backup = item.parent_id;
	item.depth = Number(item.depth);
	if (item.show_children == null){ item.show_children = 1 		 }
	if (!item.children)	{ item.children = []					 }
	if (!item.due_date)	{ item.due_date = "0000-00-00 00:00:00"	 }
	if (!item.done_date)	{ item.done_date = "0000-00-00 00:00:00" }
	if (!item.done)		{ item.done = false 					 }
	if (!item.used_time)	{ item.used_time = 0 					 }
	if (!item.tagged)	{ item.tagged = []	 					 }
	if (!item.children_order){ item.children_order = [];			 }
	else if (typeof item.children_order === 'string')
	{
		item.children_order = item.children_order.split(',').map(Number);
	}
	return item;
},
// Original VM
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
// Computed properties
language: (state, getters) => {
	if (state.setLanguage){ return state.setLanguage; }
	else if (defaultLanguage) { return defaultLanguage; }
	else { return 'en'; }
},
text: (state, getters) => {
	return state.languageContents[getters.language];
},
desktop: (state, getters) => {
	return Platform.is.desktop;
},
mobile: (state, getters) => {
	if (state.manualMobile){
		return true;
	}
	return Platform.is.mobile;
},
mobileSmall: (state, getters) => {
	if (window.innerWidth < 385){ return true; }
},
noItems: (state, getters) => {
	if (!getters.visibleDirectChildren(state.root.id).length){ 
		return true;
	}
	return false;
},
filteredItems: (state, getters) => {
	return getters.filteredItemsTree;
},
filteredItemsJournal: (state, getters) => {
	if (state.selection.view != 'journal'){ return []; }
	let dates = {};
	getters.filteredItemsTree.forEach(function(item){
		if (!item.done){ return; }
		let dd = format(item.done_date, 'YYYY-MM-DD');
		if (!dates[dd])
		{
			dates[dd] = [];
		}
		dates[dd].push(item);
	});
	let datesArray = [];
	Object.keys(dates).forEach(function(dd){
		let journalItem = {
			'done_date':dd,
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
filteredIdsFlat: (state, getters) => {
	if (state.loading){ return []; }
	let ids = [];
	console.log('running filteredIdsFlat');
	let allNodes = Object.keys(state.nodes).map(k => (Number(k)) ? Number(k) : k);
	if (getters['selection/noFilterOrTag'])
	{
		ids = allNodes.filter(id => id != state.root.id);
	}
	else
	{
		ids = allNodes.filter(id => {
			return getters['selection/testAgainstAllSelection'](id, { flat:true })
		});
	}
	return ids;
},
filteredItemsFlat: (state, getters) => {
	let children = getters.filteredIdsFlat
					.map(id => state.nodes[id])
					.filter(child => child !== undefined);
	if (state.selection.view == 'journal')
	{
		children = sortObjectArrayByTwoProperties(children,'done_date','parents_bodies','desc','asc');
	}
	return children;
},
filteredIdsTree: (state, getters) => {
	return getters.filteredItemsTree
			.map(item => item.id);			
},
filteredItemsTree: (state, getters) => {
	if (state.loading){ return []; }
	let ids = [];
	if (getters['selection/noFilterOrTag'])
	{
		ids = state.root.children_order;
	}
	else
	{
		ids = Object.keys(state.nodes).map(k => (Number(k)) ? Number(k) : k).filter(id => {
			return getters['selection/testAgainstAllSelection'](id, { flat:false })
		});
	}
	console.log('ids');
	console.log(ids);
	let children = ids.map(id => state.nodes[id]);
	// .filter(item => item !== undefined);
	// SORTING !!
	// Sort the children by children_order if there's no selected tag or filter
	if (getters['selection/noFilterOrTag'])
	{
		if (ids.length)
		{
			children = ids.map(id => children.find(child => child.id === id));
		}
	}
	// Sort children by done_date if dueDate is filtered
	else if ( getters['selection/dueTodayFiltered'] )
	{
		children = sortObjectArrayByTwoProperties(children, 'done_date', 'due_date', 'asc', 'desc');
	}
	else if ( state.selection.view == 'journal' )
	{
		children = sortObjectArrayByTwoProperties(children, 'done_date', 'parents_bodies', 'desc', 'asc');
	}
	return children;
},
allVisibleChildItems: (state, getters) =>
(id) => {
	let children = getters.visibleDirectChildren(id);
	let flattenedTree = getters.flattenTree(children);
	let visibleChildren = flattenedTree.filter(child => getters.filteredIdsFlat.includes(child.id));
	return visibleChildren;
},
allVisibleChildIds: (state, getters) =>
(id) => {
	return getters.allVisibleChildItems(id).map(c => c.id);
},
visibleDirectChildren: (state, getters) =>
(id) => {
	if (id == state.root.id)
	{
		return getters.filteredItems;
	}
	let item = state.nodes[id];
	if (!item || !item.children.length || !item.show_children){ return []; }

	return item.children.filter(child => getters.filteredIdsFlat.includes(child.id));
},
visibleDirectChildIds: (state, getters) =>
(id) => {
	return getters.visibleDirectChildren(id).map(c => c.id);
},
flattenTree: (state, getters) =>
(array) => {
	// console.log('flattening tree...');
	let flattenedTree = [];
	array.forEach(function(item){
		flattenedTree.push(item);
		if (item.children.length)
		{
			Array.prototype.push.apply(flattenedTree, getters.flattenTree(item.children));
		}
	});
	return flattenedTree;
},
clipboardText: (state, getters) =>
(id = state.selection.selectedId) => {
	id = (!id) ? state.root.id : id ;
	let item = state.nodes[id];
	let children;
	let directChildren;
	let spaceVariable = 0;
	if (getters['selection/dueTodayFiltered'])
	{
		// item = id;
		// children = item.children;
		directChildren = true;
	} else {
		// item = state.nodes[id];
		// children = getters.allVisibleChildItems(id);
		spaceVariable = parseFloat(item.depth);
	}
	item = state.nodes[id];
	children = getters.allVisibleChildItems(id);

	if (!item){ return ''; }
    let allChildren = children.reduce(function(all, val){
		let spacesVal = (directChildren) ? 0 : parseFloat(val.depth)-spaceVariable;
		let spaces = '　　'.repeat(spacesVal);
		return `${all}
${spaces}・${val.body}`;
	}, `${item.body}`);
    return allChildren;
},
clipboardTextFromItem: (state, getters) =>
(idOrItem = state.selection.selectedId) => {
	let item;
	let children;
	let directChildren;
	let spaceVariable = 0;
	if (typeof idOrItem === 'object')
	{
		item = idOrItem;
		children = item.children;
		directChildren = true;
	} else {
		item = state.nodes[idOrItem];
		children = getters.allVisibleChildItems(idOrItem);
		spaceVariable = parseFloat(item.depth);
	}

	if (!item){ return ''; }
    let allChildren = children.reduce(function(all, val){
		let spacesVal = (directChildren) ? 0 : parseFloat(val.depth)-spaceVariable;
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
    	let completionMemo = (val.completion_memo) ? `
　　${val.completion_memo}`:'';
    	let pb = (!all.includes(`【${val.parents_bodies}】`)) ? `
【${val.parents_bodies}】` :`` ;
		return `${all}${pb}
・${val.body}${completionMemo}`;
	}, journalDateTxt);
    return allChildren;
},
journalDate: (state, getters) =>
(item) => {
	if ( !item || state.selection.view != 'journal'
	  || !item.journalDate )
	{
		return false;
	}
	return item.done_date;
},
allTagsComputed: (state, getters) => {
	var t0 = performance.now( );
	if (getters.noItems){ return []; }
	let allTagsArray = [];
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
	if (!items.length){ return []; }
	items.forEach(function(item)
	{
		item.tagged.forEach(function(taggedObj){
			if (!taggedObj.tag || !taggedObj.tag.name)
			{
				return; // solves bugs with broken tags
			}
			let tagAlreadyPushed = allTagsArray.find(function(pushedTag)
			{
				return pushedTag.name == taggedObj.tag.name;
			}.bind(taggedObj));

			if (!tagAlreadyPushed)
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
	if (getters.noItems){ return []; }
	let allTagsArray = [];
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
	console.log('allTagsComputed_2');
	if (!items.length){ return []; }
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
	if (getters.noItems){ return []; }
	let allTagsArray = new Set( );
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
	if (!items.length){ return []; }
	items.forEach(function(item)
	{
		if (item.tagged.length){
			item.tagged.forEach(taggedObj => { if (taggedObj){ allTagsArray.add(taggedObj.tag) } });
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
	if (getters.noItems){ return []; }
	let allTagsArray = [];
	let items = (getters.filteredItemsFlat.length) ? getters.filteredItemsFlat : [] ;
	if (!items.length){ return []; }
	items.forEach(function(item)
	{
		item.tagged.forEach(function(taggedObj){
			if (!taggedObj.tag || !taggedObj.tag.name)
			{
				return; // solves bugs with broken tags
			}
			let tagAlreadyPushed = allTagsArray.find(function(pushedTag)
			{
				return pushedTag.name == taggedObj.tag.name;
			}.bind(taggedObj));

			if (!tagAlreadyPushed)
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
	return getters.filteredIdsFlat.length;
},
doneItemAmount: (state, getters) => {
	return getters.filteredItemsFlat.filter(child => child.done).length;
},
lastItems: (state, getters) => {
	if (getters.noItems ){ return []; }
	let lastChild = getters.filteredIdsTree[getters.filteredIdsTree.length-1];
	let deepestChild = getters.findDeepestVisibleChild(lastChild);
	return [lastChild, deepestChild];
},
firstItem: (state, getters) => {
	if (getters.noItems){ return null; }
	return getters.filteredIdsTree[0];
},
}