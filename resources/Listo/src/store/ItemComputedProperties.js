import { differenceInCalendarDays } from 'date-fns/esm'
import {
	Utilities
	// ,objectToArray,uniqBy,sortObjectArrayByProperty,sortObjectArrayByTwoProperties
} from '../helpers/globalFunctions.js'

function flattenTree(array){
	// console.log('running flattenTree...');
	let flattenedTree = [];
	array.forEach(function(item){
		flattenedTree.push(item);
		if (item.children.length)
		{
			Array.prototype.push.apply(flattenedTree, flattenTree(item.children));
		}
	});
	return flattenedTree;
}

export default {
totalPlannedMin()
{
	let t0__a = performance.now( );
	console.log('running totalPlannedMin...');
	let item = store.state.nodes[this.item.id];
	// if (store.state.debug){  debugger }
	if (!item){ return 0; }

	let selfValue = (item.planned_time) ? parseFloat(item.planned_time) : 0;
	let childrenArray = this.allChildItems;
	if (!childrenArray || !childrenArray.length) { return selfValue; }
	let x = childrenArray.reduce(function(prevVal, child){
		let plannedTime = (!child) ? 0 : child.planned_time;
		return prevVal + parseFloat(plannedTime);
	}, selfValue);
	let t1__a = performance.now( );
	console.log("			call to totalPlannedMin took " + (t1__a - t0__a) + " milliseconds.")
    return (x) ? parseFloat(x) : 0;
},
totalUsedSec()
{
	let t0__a = performance.now( );
	console.log('running totalUsedSec...');
	let item = store.state.nodes[this.item.id];
	let childrenArray = this.allChildItems;
	if (!item){ return 0; }

	let selfValue = (item.used_time) ? parseFloat(item.used_time) : 0;
	if (!childrenArray || !childrenArray.length) { return selfValue; }
	
	let x = childrenArray.reduce(function(prevVal, child){
		let usedTime = (!child) ? 0 : child.used_time;
		return prevVal + parseFloat(usedTime);
	}, selfValue);
	let t1__a = performance.now( );
	console.log("			call to totalUsedSec took " + (t1__a - t0__a) + " milliseconds.")
    return (x) ? x : 0;
},
totalPlannedSec()
{
	console.log('running totalPlannedSec...');
	return this.totalPlannedMin*60;
},
totalSecLeft()
{
	console.log('running totalSecLeft...');
	return this.totalPlannedSec-this.totalUsedSec;
},
totalVisiblePlannedMin()
{
	let t0__a = performance.now( );
	console.log('running totalVisiblePlannedMin...');
	let item = store.state.nodes[this.item.id];
	// if (store.state.debug){  debugger }
	if (!item){ return 0; }

	let selfValue = (item.planned_time) ? parseFloat(item.planned_time) : 0;
	let childrenArray = this.allVisibleChildIds;
	if (!childrenArray || !childrenArray.length) { return selfValue; }
	let x = childrenArray.reduce(function(prevVal, childId){
		let child = store.state.nodes[childId];
		let plannedTime = (!child) ? 0 : child.planned_time;
		return prevVal + parseFloat(plannedTime);
	}, selfValue);
	let t1__a = performance.now( );
	console.log("			call to totalVisiblePlannedMin took " + (t1__a - t0__a) + " milliseconds.")
    return (x) ? parseFloat(x) : 0;
},
totalVisibleUsedSec()
{
	let t0__a = performance.now( );
	console.log('running totalVisibleUsedSec...');
	let item = store.state.nodes[this.item.id];
	let childrenArray = this.allVisibleChildIds;
	if (!item){ return 0; }

	let selfValue = (item.used_time) ? parseFloat(item.used_time) : 0;
	if (!childrenArray || !childrenArray.length) { return selfValue; }
	
	let x = childrenArray.reduce(function(prevVal, childId){
		let child = store.state.nodes[childId];
		let usedTime = (!child) ? 0 : child.used_time;
		return prevVal + parseFloat(usedTime);
	}, selfValue);
	let t1__a = performance.now( );
	console.log("			call to totalVisibleUsedSec took " + (t1__a - t0__a) + " milliseconds.")
    return (x) ? x : 0;
},
totalVisiblePlannedSec()
{
	console.log('running totalVisiblePlannedSec...');
	return this.totalVisiblePlannedMin*60;
},
totalVisibleSecLeft()
{
	console.log('running totalVisibleSecLeft...');
	return this.totalVisiblePlannedSec-this.totalVisibleUsedSec;
},
secLeft()
{
	console.log('running secLeft...');
	let item = store.state.nodes[this.item.id];
	if (!item){ return 0; }
	return item.planned_time*60-item.used_time;
},
totalTimeDifferentFromParent()
{
	console.log('running totalTimeDifferentFromParent...');
	let item = store.state.nodes[this.item.id];
	if (!item){ return 0; }
	if (!item.parent_id){ return true; }

	return this.totalPlannedSec != itemGetters[item.parent_id].totalPlannedSec;
},
// totalPlannedHour()
// {
// 	console.log('running totalPlannedHour...');
// 	return this.totalPlannedMin/60;
// },
// totalMinLeft()
// {
// 	console.log('running totalMinLeft...');
// 	return this.totalPlannedMin-this.totalUsedMin;
// },
// minLeft()
// {
// 	console.log('running minLeft...');
// 	return this.secLeft/60;
// },
tagsArray()
{
	console.log('running tagsArray...');
	let item = store.state.nodes[this.item.id];
	if (!item){ return []; }
	return item.tagged.map(obj => obj.tag_name);
},
siblingIndex()
{
	console.log('running siblingIndex...');
	let id = this.item.id;
	let item = store.state.nodes[id];
	if (!item){ return false; }
	let parentId = item.parent_id;
	if (!parentId || !store.state.nodes[parentId]){ return false; }
	let siblingsArray = store.state.nodes[parentId].children_order;
	return siblingsArray.indexOf(id);
},
visibleSiblingIndex()
{
	console.log('running siblingIndex...');
	let id = this.item.id;
	let item = store.state.nodes[id];
	if (!item){ return false; }
	let parentId = item.parent_id;
	if (!parentId || !store.state.nodes[parentId]){ return false; }
	let siblingsArray = itemGetters[parentId].visibleDirectChildIds;
	return siblingsArray.indexOf(id);
},
olderSiblingId()
{
	console.log('running olderSiblingId...');
	let id = this.item.id;
	let item = store.state.nodes[id];
	if (!item){ return; }
	let parentId = item.parent_id;
	if (!parentId){ return; }
	let siblingsArray = store.state.nodes[parentId].children_order;
	if (siblingsArray.length <= 1 || this.siblingIndex == 0)
	{
		return parentId;
	}
	let siblingIndex = siblingsArray.indexOf(id);
	return store.state.nodes[parentId].children_order[siblingIndex-1];
},
nextItemId()
{
	console.log('running nextItemId...');
	let id = this.item.id;
	if (!id){ return; }
	let item = store.state.nodes[id];
	if (!item){ return; }

	// Journal
	if (store.state.selection.view == 'journal')
	{
		let journalItems = store.getters.filteredItemsFlat.map(item => item.id);
		let ind = journalItems.indexOf(id);
		if (ind+1 == journalItems.length)
		{
			return journalItems[0];
		}
		return journalItems[ind+1];
	}
	// Select next item on top level.
	else if (store.getters.filteredIdsTree.includes(id)
		&& (!this.visibleDirectChildren.length
			|| !item.show_children ))
	{
		let ind = store.getters.filteredIdsTree.indexOf(id);
		if (ind+1 == store.getters.filteredIdsTree.length)
		{
			return store.getters.filteredIdsTree[0];
		}
		return store.getters.filteredIdsTree[ind+1];
	}
	// Select first child if any.
	else if ( this.visibleDirectChildIds.length && item.show_children)
	{
		return this.visibleDirectChildIds[0];
 	}
	// All other cases
 	else
 	{
		return this.nextItemRecursion;
 	}
},
nextItemRecursion()
{
	console.log('running nextItemRecursion...');
	let id = this.item.id;
	if (!id){ return; }
	if (this.itIsADeepestChild)
	{
		let topLvlItemId = this.topLvlParentOfDeepestChild;
		let index = store.getters.filteredIdsTree.indexOf(topLvlItemId);
		if (index+1 == store.getters.filteredIdsTree.length)
		{ 
			let firstItemId = store.getters.filteredIdsTree[0];
			if (firstItemId == id) { return null; }
			return firstItemId;
		}
		return store.getters.filteredIdsTree[index+1];
	}
	let index = this.visibleSiblingIndex;
	let parentId = store.state.nodes[id].parent_id;
	if (!parentId){ return }
	let parentsChildren = itemGetters[parentId].visibleDirectChildIds;
	if (index+1 == parentsChildren.length)
	{
		if (parentId == store.state.root.id){ return; }
		return itemGetters[parentId].nextItemRecursion;
	}
	return parentsChildren[index+1];
},
nextSiblingOrParentsSiblingId()
{
	console.log('running nextSiblingOrParentsSiblingId...');
	let item = store.state.nodes[this.item.id];
	if (!item){ return; }
	let parentId = item.parent_id;
	if (!parentId){ return; }
	let children_order = store.state.nodes[parentId].children_order;
	let nextIndex = this.siblingIndex+1;
	if (nextIndex == children_order.length)
	{
		return itemGetters[parentId].nextSiblingOrParentsSiblingId;
	} else {
		return children_order[nextIndex];
	}
},
findDeepestVisibleChild()
{
	console.log('running findDeepestVisibleChild...');
	let id = this.item.id;
	let childrenIds = this.visibleDirectChildIds;
	if (!childrenIds.length){ return id }
	let deepestId = childrenIds[childrenIds.length-1];
	return itemGetters[deepestId].findDeepestVisibleChild;
	// if (!itemGetters[deepestId]){ return }
},
itIsADeepestChild()
{
	console.log('running itIsADeepestChild...');
	let id = this.item.id;
	// console.log('running itIsADeepestChild');
	if (!id){ console.log('you need an ID'); return; }
	return store.getters.filteredItemsTreeDeepestChildren.map(item => item.deepestChild).includes(id);
},
topLvlParentOfDeepestChild()
{
	console.log('running topLvlParentOfDeepestChild...');
	let deepestChildId = this.item.id;
	let topLvlParentDeepestChildSet = store.getters.filteredItemsTreeDeepestChildren.find(obj => (obj.deepestChild == deepestChildId))
	if (!topLvlParentDeepestChildSet){ return }
	return topLvlParentDeepestChildSet.id;
},
isFirstItem()
{
	console.log('running isFirstItem...');
	if (store.getters.noItems){ return false; }
	return (this.siblingIndex == 0);
},
prevItemId()
{
	console.log('running prevItemId...');
	let id = this.item.id;
	if (!id || store.state.nodes[id].depth == 0){ return false; }
	let prevItemId;
	// Previous item in JOURNAL
	if (store.state.selection.view == 'journal')
	{
		let journalItems = store.getters.filteredItemsFlat.map(item => item.id);
		let index = journalItems.indexOf(id);
		if (index == 0)
		{
			prevItemId = journalItems[journalItems.length-1];
		}
		else
		{
			prevItemId = journalItems[index-1];
		}
	}
	// Previous item on top level
	else if (store.getters.filteredIdsTree.includes(id))
	{
		let topLvlIds = store.getters.filteredIdsTree;
		let index = topLvlIds.indexOf(id);
		if (index == 0) {
			prevItemId = itemGetters[topLvlIds[topLvlIds.length-1]].findDeepestVisibleChild;
		} else {
			prevItemId = itemGetters[topLvlIds[index-1]].findDeepestVisibleChild;
		}
	// All other cases
	} else {
		let item = store.state.nodes[this.item.id];
		let index = this.visibleSiblingIndex;
		if (index == 0) {
			prevItemId = item.parent_id;
		} else {
			let elderSiblingId = itemGetters[item.parent_id].visibleDirectChildIds[index-1];
			prevItemId = itemGetters[elderSiblingId].findDeepestVisibleChild;
		}
	}
 	return prevItemId;
},
isTopLvlItemInFilteredRoot()
{
	console.log('running isTopLvlItemInFilteredRoot...');
	let id = this.item.id;
	// console.log('running isTopLvlItemInFilteredRoot');
	if (store.getters['selection/nothingSelected'] && store.state.selection.view == 'tree')
	{
		// console.log('the root is not filtered');
		return false;
	}
	if (id == store.state.root.id)
	{
		return true;
	}
	return store.getters.filteredIdsTree.includes(id);
},
hasParentDueToday()
{
	console.log('running hasParentDueToday...');
	let id = this.item.id;
	let item = store.state.nodes[id];
	if (!item.parent_id){ return false; }
	let parent = store.state.nodes[item.parent_id];
	if (!parent){ return false; }
	let diff = differenceInCalendarDays(new Date(parent.due_date.replace(/-/g, "/")), new Date());
	if (diff <= 0)
	{
		return true;
	} else {
		return itemGetters[item.parent_id].hasParentDueToday;
	}
},
isDueToday()
{
	console.log('running isDueToday...');
	let item = store.state.nodes[this.item.id];
	if (!item){ return false; }

	let diff = differenceInCalendarDays(new Date(item.due_date.replace(/-/g, "/")), new Date());
	if (diff <= 0) { return true; }
	return false;
},
isProject()
{
	console.log('running isProject...');
	let item = store.state.nodes[this.item.id];
	if (!item){ return false; }
	if (item.body.slice(-1) == ':')
	{
		return true;
	} else {
		return false;
	}
},
itemTagArray()
{
	console.log('running itemTagArray...');
	let item = store.state.nodes[this.item.id];
	return item.tagged.map(function(tagObj){
		return tagObj.tag_name;
	});
},
allChildrenAreDone()
{
	console.log('running allChildrenAreDone...');
	let id = this.item.id;
	let children = store.state.nodes[id].children;
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
calTotalPlannedTime()
{
	console.log('running calTotalPlannedTime...');
	let item = store.state.nodes[this.item.id];
	let totalPlannedTime;
    if (!(Array.isArray(item.children) && item.children.length))
    {
    	// if we don't have children, do nothing, leave the time as-is
		totalPlannedTime = (!item.done || store.state.selection.view == 'journal') ? parseFloat(item.planned_time) : 0 ;
    } else {
		// add up all the times of our direct children
	    totalPlannedTime = item.children.reduce((prev, next) => {
	        let x = (next.totalPlannedTime) ? next.totalPlannedTime : next.planned_time ;
	        return prev+parseFloat(x);
	    }, (!item.done || store.state.selection.view == 'journal') ? parseFloat(item.planned_time) : 0 );
    }
    return parseFloat(totalPlannedTime);
},
calTotalUsedTime()
{
	console.log('running calTotalUsedTime...');
	let item = store.state.nodes[this.item.id];
	if (!item){ return 0; }
	let totalUsedTime;
    if (!(Array.isArray(item.children) && item.children.length))
    {
    	// if we don't have children, do nothing, leave the time as-is
		totalUsedTime = (!item.done || store.state.selection.view == 'journal') ? parseFloat(item.used_time) : 0 ;
    } else {
		// add up all the times of our direct children
	    totalUsedTime = item.children.reduce((prev, next) => {
	        let x = (next.totalUsedTime) ? next.totalUsedTime : next.used_time ;
	        return prev+parseFloat(x);
	    }, (!item.done || store.state.selection.view == 'journal') ? parseFloat(item.used_time) : 0 );
    }
    return parseFloat(totalUsedTime);
},
allChildItems()
{
	console.log('running allVisibleChildItems...');
	let flattenedTree = flattenTree(this.item.children);
	// let flattenedTree = flattenedTree.map(child => child.id);
	return flattenedTree;
},
allVisibleChildItems()
{
	console.log('running allVisibleChildItems...');
	let children = this.visibleDirectChildren;
	let flattenedTree = flattenTree(children);
	let visibleChildren = flattenedTree.filter(child => store.getters.filteredIdsFlat.includes(child.id));
	return visibleChildren;
},
allVisibleChildIds()
{
	console.log('running allVisibleChildIds...');
	return this.allVisibleChildItems.map(c => c.id);
},
visibleDirectChildren()
{
	let item = store.state.nodes[this.item.id];
	if (!item || !item.children.length || !item.show_children){ return []; }

	return item.children.filter(child => store.getters.filteredIdsFlat.includes(child.id));
},
visibleDirectChildIds()
{
	console.log('running visibleDirectChildIds...');
	return this.visibleDirectChildren.map(c => c.id);
},
clipboardText()
{
	console.log('running clipboardText...');
	let id = this.item.id;
	let item = store.state.nodes[id];
	let children;
	let directChildren;
	let spaceVariable = 0;
	if (this.$store.getters['selection/dueTodayFiltered'])
	{
		// item = id;
		// children = item.children;
		directChildren = true;
	} else {
		// item = store.state.nodes[id];
		// children = this.allVisibleChildItems;
		spaceVariable = parseFloat(item.depth);
	}
	children = this.allVisibleChildItems;

	if (!item){ return ''; }
    let allChildren = children.reduce(function(all, val){
		let spacesVal = (directChildren) ? 0 : parseFloat(val.depth)-spaceVariable;
		let spaces = '　　'.repeat(spacesVal);
		return `${all}
${spaces}・${val.body}`;
	}, `${item.body}`);
    return allChildren;
},
}