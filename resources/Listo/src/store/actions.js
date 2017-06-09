import axios from 'axios';
import {
	Utilities, hasClass, mobilecheck, isElementInViewport, objectToArray, uniqBy, uniq, arrayToString, sortObjectArrayByProperty, sortObjectArrayByTwoProperties, removeEmptyValuesFromArray
} from '../helpers/globalFunctions.js';
// import { sec_to_hourmin } from '../../components/valueMorphers2.js';

export default {
giveNewParent ({state, commit, dispatch, getters},
	{ id, new_parent_id, specificNewIndex } = {})
{
	if (getters.isTopLvlItemInFilteredRoot(id))
	{ 
		let errMsg = getters.text.flashes.moveTopLvlItem;
		console.log(errMsg);
		dispatch('sendFlash', { type:'warning', msg:errMsg });
		return;
	}
	console.log('giving new parent');
	let parent_id = state.nodes[id].parent_id;
	let targetItem = state.nodes[id];
	let newParent = state.nodes[new_parent_id];
		console.log('newParent ↓ ');
		console.log(newParent);
	let prevParent = state.nodes[parent_id];
		console.log('prevParent ↓ ');
		console.log(prevParent);
	let siblingIndex = getters.siblingIndex(id);
	// targetItem.parent_id = new_parent_id;
	commit('updateState', { id: id, field: 'parent_id', value: new_parent_id });
	// targetItem.depth = newParent.depth+1;
	commit('updateState', { id: id, field: 'depth', value: newParent.depth+1 });
	// e.g. VUEX

	
	if (!newParent.children_order)
	{
		// newParent.children_order = [];
		commit('updateState', { id: new_parent_id, field: 'children_order', value: [] });
	}
	if (specificNewIndex || specificNewIndex == 0)
	{
		// newParent.children.splice(specificNewIndex,0,targetItem);
		// newParent.children_order.splice(specificNewIndex,0,id);
		commit('addChild',{'index':specificNewIndex,'item':targetItem,'newParentId':new_parent_id });		
	}
	else if (prevParent.depth-1 == newParent.depth && new_parent_id == prevParent.parent_id)
	{
		// when unindenting
		let newIndex = getters.siblingIndex(prevParent.id)+1;
		// newParent.children.splice(newIndex,0,targetItem);
		// newParent.children_order.splice(newIndex,0,id);
		commit('addChild',{'index':newIndex,'item':targetItem,'newParentId':new_parent_id });		
	} else {
		// when indenting
		// newParent.children.push(targetItem);
		// newParent.children_order.push(id)
		commit('addChild',{'item':targetItem,'newParentId':new_parent_id });
	}
	// Open newParent show_children if closed
	// newParent.show_children = 1;
	commit('updateState',{'field':'show_children','id':new_parent_id, 'value':1 });

	// Delete items attached to previous parent
	// prevParent.children.splice(siblingIndex,1);
	// prevParent.children_order.splice(siblingIndex,1);
	commit('deleteChild',{'index':siblingIndex,'id':prevParent.id });
	// Fix bug where item would still show if it prevParent has an array of 0 and the moved child was originally the last child...
	if (prevParent.children.length == 0)
	{
		// prevParent.children = [];
		commit('updateState',{'field':'children','id':prevParent.id, 'value':[] });
	}

	// Patches etc.
	dispatch('attachParentBody',{ id: id });
	let tags = getters.itemTagArray(new_parent_id);
	dispatch('tagItem', { id:id, tags:tags });
	dispatch('patch', { id:id, field:'depth' });
	dispatch('patch', { id:id, field:'parent_id' });
	dispatch('patch', { id:new_parent_id, field:'children_order' });
	dispatch('patch', { id:new_parent_id, field:'show_children' });
	dispatch('patch', { id:parent_id, field:'children_order' });
	dispatch('updateChildrenDepth', { id:targetItem.id });
	dispatch('updateChildrenDueDate', { id:new_parent_id });
	dispatch('updateChildrenDueDate', { id:parent_id });
	dispatch('autoCalculateDoneState', { id:new_parent_id });
	dispatch('autoCalculateDoneState', { id:parent_id });
},
duplicate ({state, commit, dispatch, getters},
	{id} = {})
{
	id = (!id) ? selection.selectedId : id ;
	let item = state.nodes[id];
	let index = getters.siblingIndex(id)+1;
	let dupe = JSON.parse(JSON.stringify(item));
	// state.nodes[item.parent_id].children.splice(index, 0, dupe);

	let addNextItemAs = null;
	let addTags = dupe.tagged.map(tagObj => tagObj.tag_name);
	let duplication = true;
	dispatch('postNewItem', { newItem:dupe, index, addNextItemAs, addTags, duplication });
},
addAndCleanNodesRecursively ({state, commit, dispatch, getters},
	{item} = {})
{
	item = getters.setDefaultItemValues(item);
	state.nodes[item.id] = item;
	if (item.children)
	{
		item.children.forEach(function(child) {
			return dispatch('addAndCleanNodesRecursively', { item:child });
		});
	}
},
addItem ({state, commit, dispatch, getters},
	{item, index, addNextItemAs, addTags, duplication} = {})
{
	// debugger;
	dispatch('addAndCleanNodesRecursively', {item} );
	let parent = state.nodes[item.parent_id];
	//Remove the Temp item
	// console.log('Remove the Temp item');
	// console.log(parent.children);
	// console.log(parent.children_order);
	state.nodes[item.parent_id].children = parent.children.filter(i => !i.temp);
	state.nodes[item.parent_id].children_order = parent.children_order.filter(i => i != 'x');
	delete state.nodes['x'];
	// let a = state.nodes[item.parent_id].children;
	// let b = state.nodes[item.parent_id].children_order;
	// console.log(`
	// 	state.nodes[item.parent_id].children_order -> ${a}
	// 	state.nodes[item.parent_id].children -> ${b}
	// 	`);
	//Actually ADD the item!
	commit('addChild',{ newParentId:item.parent_id, index, item });

	// Patches etc.
    selection.selectedId = item.id;
	// if ( getters.isTopLvlItemInFilteredRoot(item.id)
	// 	&& item.parent_id == state.root.id )
	// {
	// 	getters.backups.rootChildren.push(item);
	// 	vm.patchRootChildrenOrderWithFilter(item.id);
	// } else {
	    dispatch('patch', { id:item.parent_id, field:'children_order' });
	// }
    if (addTags){ dispatch('tagItem', { id:item.id, tags:addTags }); }
	dispatch('attachParentBody',{ id: item.id });
	dispatch('autoCalculateDoneState', { id:item.parent_id });
	
	if (selection.view == 'journal')
	{
		selection.view = null;
		selection.view = 'journal';
	}
	if (selection.filter.includes('today'))
	{
		selection.filter = selection.filter.filter(f => f != 'today');
		selection.filter.push('today');
	}
	if (selection.tags.length)
	{
		let tags = selection.tags;
		selection.tags = [];
		selection.tags = tags;
	}
	
    
    if (duplication || addNextItemAs == 'stop')
    {
    	state.addingNewUnder = null;
    	Vue.nextTick(()=> dispatch('scrollToItemIfNeeded', { id:item.id }));
    } else if (state.addingNewUnder == 'x') {
	    dispatch('showAddNewItem', { id:item.id, addAs:addNextItemAs });
    }
},
addTempNewItem ({state, commit, dispatch, getters},
	{item, index, addNextItemAs, addTags} = {})
{
	item = JSON.parse(JSON.stringify(item));
	console.log('temp item.body');
	console.log(item.body);
	item.id = 'x';
	item.temp = true;
	dispatch('addAndCleanNodesRecursively', {item} );
	console.log(item.body);
	const parent = state.nodes[item.parent_id];
	if (!parent.children_order) { parent.children_order = []; }
	//Actually ADD the item!
	parent.children.splice(index, 0, item);
	parent.children_order.splice(index, 0, item.id);
	state.addingNewUnder = item.id;
    if (addNextItemAs == 'stop')
    {
    	Vue.nextTick(()=> dispatch('scrollToItemIfNeeded', { id: item.id }));
	}
},
hideTaggedNodes ({state, commit, dispatch, getters},
	{tag} = {})
{
	Object.keys(state.nodes).forEach(function(id) {
		id = parseFloat(id);
		if (getters.hasTag(id, tag))
		{
			if (!selection.hiddenItems.includes(id))
			{
				selection.hiddenItems.push(id);
			}
		}
	}.bind(this));
},
hideDoneNodes ({state, commit, dispatch, getters} = {})
{
	Object.keys(state.nodes).forEach(function(id) {
		id = parseFloat(id);
		if (state.nodes[id].done){
			if (!selection.hiddenItems.includes(id)){
				selection.hiddenItems.push(id);
			}
		}
	}.bind(this));
},
sortAllChildren ({state, commit, dispatch, getters} = {})
{
	console.log('sorting all children');
	Object.keys(state.nodes).forEach(function (id) {
	    dispatch('sortChildren', {id});
	    dispatch('updateChildrenDueDate', {id});
	}.bind(this));
},
sortChildren ({state, commit, dispatch, getters},
	{id} = {})
{
	// console.log('sortingChildren');
	let item = state.nodes[id];
	item.children_order = item.children_order.filter(function(id){
		let child = state.nodes[id];
		let a = item.children.indexOf(child);
		let b = ~a; // Anything that's not -1 will become something else than 0, so will be included.
		return b;
	}.bind(this));

	let order = item.children_order;
	let items = item.children;
	if (order instanceof Array && order.length)
	{
		item.children = order.map(id => items.find(t => t.id === id));
	}
},
updateChildrenDepth ({state, commit, dispatch, getters},
	{id} = {})
{
	let targetChildren = state.nodes[id].children;
	if (!(targetChildren || targetChildren.length)){ return false; }
	targetChildren.forEach(function(child){
		console.log(child);
		child.depth = state.nodes[child.parent_id].depth+1;
		dispatch('patch', { id:child.id, field:'depth' });
		dispatch('updateChildrenDepth', { id:child.id } );
		return true;
	}.bind(this))
},
copyParentBodyToAllChildren ({state, commit, dispatch, getters},
	{parent_id} = {})
{
	if (!parent_id){ return; }
	let item = state.nodes[parent_id];
	if (!item.children_order.length){ return; }
	let b = item.body;
	item.children_order.forEach(childId => {
		let child = state.nodes[childId];
		child.parents_bodies = b;
		if (!vm){ return; }
		dispatch('patch', { id:child.id, field:'parents_bodies' });
	});
},
attachParentBody ({state, commit, dispatch, getters},
	{id} = {})
{
	if (!id){ return; }
	let item = state.nodes[id];
	if (!item.parent_id){ return; }
	let parent = state.nodes[item.parent_id];
	if (!parent){ return; }
	item.parents_bodies = parent.body;
	dispatch('patch', { id:id, field:'parents_bodies' });
},
deleteItem ({state, commit, dispatch, getters},
	{id} = {})
{
	if (!id){ console.log('item id not specified at deleteItem'); }
	let item = state.nodes[id];
	let previousItemId = (getters.prevItemId(id)) ? getters.prevItemId(id) : null;
	// Delete all children as well!
	if (Array.isArray(item.children) && item.children.length)
	{
		let allChildrenIds = getters.getAllChildrenIds(id);
		dispatch('deleteItemApi', { idOrArray:allChildrenIds });
	}
	// Delete items attached to previous parent
	let parent_id = item.parent_id;
	let prevParent = state.nodes[parent_id];
	if (prevParent)
	{
		let siblingIndex = getters.siblingIndex(id);
		prevParent.children.splice(siblingIndex,1);
		prevParent.children_order.splice(siblingIndex,1);
		// Patch and recalculate
		dispatch('patch', { id:parent_id, field:'children_order' });
	}
    dispatch('deleteItemApi', { idOrArray:id });
	// dispatch('autoCalculateDoneState', { id:parent_id });
	if (selection.view == 'journal')
	{
		selection.view = null;
		selection.view = 'journal';
	}
	if (selection.view == 'tree')
	{
		selection.view = 'journal';
		selection.view = 'tree';
	}
	if (selection.filter.includes('today'))
	{
		selection.filter = selection.filter.filter(f => f != 'today');
		selection.filter.push('today');
	}
	let newSelectedId = (getters.nextItemId(previousItemId)) ? getters.nextItemId(previousItemId) : null;
	console.log(`new selected ID is: ${newSelectedId}`);
    selection.selectedId = newSelectedId;
	delete state.nodes[id];
},
tagItem ({state, commit, dispatch, getters},
	{id, tags} = {})
{
	console.log(tags);
	if (!tags){ return; }
	if (Array.isArray(tags))
	{
		tags = removeEmptyValuesFromArray(tags);
		tags = tags.filter(function(t){
			return !getters.hasTag(id,t);
		}.bind(this));
		if (!tags.length){ return; }
	} else {
		if (!tags.replace(/\s/g, "").length){ return; }
		if (getters.hasTag(id, tags))
		{
			console.log('NG! Has the tag already!!');
			return;
		}
	}
	dispatch('patchTag', { id,tags });
	let item = state.nodes[id];
	if (item.children.length)
	{
		item.children_order.forEach(function(childId){
			dispatch('tagItem', { id:childId, tags:tags });
		}.bind(this));
	}
},
prepareTag ({state, commit, dispatch, getters},
	{id, tags} = {})
{
	let item = state.nodes[id];

},
prepareDonePatch ({state, commit, dispatch, getters},
	{id} = {})
{
	let item = state.nodes[id];
	let done_date = moment().format();
	item.done_date = done_date;
	dispatch('patchDone', {id} );
	if (item.done)
	{
		dispatch('popup', { id:id, type:'afterDone' });
	}
	// dispatch('autoCalculateDoneState', { id:item.parent_id });
	if (item.done)
	{ // IF DONE:
		//Add parent's body
		dispatch('attachParentBody',{ id: id });
	}
},
autoCalculateDoneState ({state, commit, dispatch, getters},
	{id} = {})
{
	if (state.nodes[id].depth == 0){ return; }
	if (getters.allChildrenDone(id) == true && !getters.isProject(id))
	{
		dispatch('markDone', {id, markAs:'done' });
	} else {
		dispatch('markDone', {id, markAs:'notDone' });
	}
},
updateItemTagsDom ({state, commit, dispatch, getters},
	{id, tags, requestType} = {})
{
	/* requestType can be:
		'tag': tag item  (default if null)
		'untag': untag item with certain tag
		'retag': delete all tags and retag new ones
	*/
	if (!tags){ return; }
	if (Array.isArray(tags)){
		tags.forEach(t => dispatch('updateItemTagsDom', { id, tags:t, requestType } ));
		return;
	}
	let tagName = tags.trim();
	let tagSlug = Utilities.tagNameToSlug(tagName);
	let tempTag = { 'temp':'temp',
		'tag_name':tagName,
		'tag_slug':tagSlug,
		'tag':{
			'name':tagName,
			'slug':tagSlug
		}};
	if (requestType == 'tag' || !requestType)
	{
		console.log(state.nodes[id].tagged);
		state.nodes[id].tagged.push(tempTag);
		console.log(state.nodes[id].tagged);
	}
	if (requestType == 'untag')
	{
		state.nodes[id].tagged = state.nodes[id].tagged.filter(t => t.tag_slug != tagSlug);
	}
},
moveItem ({state, commit, dispatch, getters},
	{id, direction} = {})
{
	id = (!id) ? selection.selectedId : id ;
	if (getters.isTopLvlItemInFilteredRoot(id))
	{ 
		let errMsg = getters.text.flashes.moveTopLvlItem;
		console.log(errMsg);
		dispatch('sendFlash', { type:'warning', msg:errMsg });
		return; 
	}
	clearTimeout(window.patchDelay);
	let pId = state.nodes[id].parent_id;
	let parent = state.nodes[pId];
	let index = getters.siblingIndex(id);
	if (direction == 'up')
	{
		if (index == 0)
		{
			if (parent.depth == 0){ console.log('ceiling!'); return; }
			// Jump to last child of previous Sibling
			let parentOlderSiblingId = getters.olderSiblingId(pId);
			let newInd = (parentOlderSiblingId == parent.parent_id) ? 0 : null;
			dispatch('giveNewParent', { id, new_parent_id:parentOlderSiblingId, specificNewIndex:newInd } );
		} else { // When moving through siblings
			parent.children_order.splice(index,1);
			parent.children_order.splice(index-1, 0, id);
			dispatch('sortChildren', { id:pId } );
			window.patchDelay = setTimeout(function(){
				dispatch('patch', { id:pId, field:'children_order' });
			},1000);
		}
	}
	else if (direction == 'down')
	{
		if ( index+1 == parent.children_order.length )
		{
			if (parent.depth == 0){ console.log('floor!'); return; }
			// Jump to First child of next Sibling
			let new_parent_id = getters.nextSiblingOrParentsSiblingId(id);
			console.log('new_parent_id: '+new_parent_id);
			dispatch('giveNewParent', { id, new_parent_id:new_parent_id, specificNewIndex:0 } );
		} else { // When moving through siblings
			parent.children_order.splice(index,1);
			parent.children_order.splice(index+1, 0, id);
			dispatch('sortChildren', { id:pId } );
			window.patchDelay = setTimeout(function(){
				dispatch('patch', { id:pId, field:'children_order' });
			},1000);
		}
	}
	Vue.nextTick(()=> dispatch('scrollToItemIfNeeded', { id:id }));
},
flushDoneItems ({state, commit, dispatch, getters} = {})
{ // Do not use yet. Not sure how to best implement the below...
	let nodes = state.nodes;
	let keys = Object.keys(nodes);
	let doneItemsObject = keys.reduce((prev,id) => {
		if (nodes[id].done)
		{
			dispatch('deleteItem', {id} );
		}
	});
},
setDueDate ({state, commit, dispatch, getters},
	{id, duedate} = {})
{
	let dd = (duedate) ? duedate : moment().format();
	let oriDueDate = state.nodes[id].due_date;
	let diff = moment(oriDueDate).diff(dd, 'days');
	if (diff == 0){ dd = '0000-00-00 00:00:00'; }
	state.nodes[id].due_date = dd;
	if (diff == 0 && selection.filter.includes('today'))
	{
		selection.selectedId = getters.nextItemId(id);
	}
	dispatch('patchDueDate', {id, duedate:dd });
	dispatch('updateChildrenDueDate', { id:id });
},
updateChildrenDueDate ({state, commit, dispatch, getters},
	{id} = {})
{
	let item = state.nodes[id];
	if (!item.children.length){ return false; }
	item.children.forEach(function(child){
		if (item.dueDateParent)
		{
			child.dueDateParent = item.dueDateParent;
			dispatch('updateChildrenDueDate', { id:child.id });
		} else if (item.due_date && item.due_date != '0000-00-00 00:00:00') {
			child.dueDateParent = item.due_date;
			dispatch('updateChildrenDueDate', { id:child.id });
		} else {
			child.dueDateParent = false;
			dispatch('updateChildrenDueDate', { id:child.id });
		}
	}.bind(this))
},
formatDone ({state, commit, dispatch, getters},
	{doneArray} = {})
{
	let doneItemsObject = doneArray.reduce((prev,item) => {
		if (item.done)
		{
		  	let donePropName = moment(item.done_date).format('YYYY/MM/DD');
		  	// if we don't have a slot for thiz date, make one
		  	if (!prev.hasOwnProperty(donePropName))
		  	{
		    	prev[donePropName] = [];
		  	}
			prev[donePropName].push(item);
		}
		return prev;
	},{});
	return Object.keys(doneItemsObject).map(function(k){ 
		let rObj = {};
		rObj['date'] = k;
		rObj['items'] = doneItemsObject[k];
		// rObj['totalUsedTime'] = rObj['items'].reduce((prev, next) => {
		// 	return Utilities.AplusB(prev, next.used_time);
  //   	}, 0);
		return rObj;
	});
},
// Original VM
setCancelThroughKeydown ({state, commit, dispatch, getters})
{
	state.cancelThroughKeydown = true;
	setTimeout(function()
	{
		state.cancelThroughKeydown = false;
	},100);
},
startEdit ({state, commit, dispatch, getters},
	{item, event} = {})
{
	// debugger;
	if (event &&
		(event.srcElement.hasClass('done')
		|| event.srcElement.hasClass('custom-tag')))
	{
		return;
	}
	console.log('startEdit');
	item = (item) ? item : state.nodes[selection.selectedId];
	commit('updateState',{ beforeEditCache_body:item.body });
	commit('updateState',{ beforeEditCache_planned_time:item.planned_time });
	// if ( state.mobile )
	// {
	// 	state.popouts.edit.push(item);
	// 	return;
	// }
	commit('updateState',{ editingItem:item.id });
},
scrollToItemIfNeeded ({state, commit, dispatch, getters},
	{id} = {})
{
	if (!id){ return };
	let el = document.getElementById('item-body-'+id);
	if (!isElementInViewport(el))
	{
		el.scrollIntoView();
	}
},
doneEdit ({state, commit, dispatch, getters},
	{item} = {})
{
	console.log('Done edit!');
	item = (item) ? item : state.nodes[selection.selectedId];
	// if (!state.editingItem)
	// {
	// 	return;
	// }
	commit('updateState',{ editingItem:null });
	commit('updatePopouts',{ edit:[] });
	if (state.editingItemTags)
	{
		commit('updateState',{ editingItemTags:null });
		return;
	}
	if (!item.body)
	{
		commit('updateState',{ id:item.id, body:state.beforeEditCache_body });
	}
	// item.body = item.body.trim();

	if (typeof item.planned_time != 'number' || Number.isNaN(item.planned_time))
	{
		commit('updateState',{ id:item.id, planned_time:0 });
	}
	if (item.planned_time != state.beforeEditCache_planned_time)
	{
		dispatch('patch', { id:item.id, field:'planned_time' });
	}
	if (item.body != state.beforeEditCache_body)
	{
		dispatch('patch', { id:item.id, field:'body' });
		dispatch('copyParentBodyToAllChildren', { parent_id:item.id });
	}
	commit('updateState',{ beforeEditCache_body:null });
	commit('updateState',{ beforeEditCache_planned_time:null });
	// setTimeout(() => this.convertbodyURLtoHTML(),1000);
},
cancelEdit ({state, commit, dispatch, getters},
	{id = selection.selectedId} = {})
{
	if (state.editingItem || state.popouts.edit.length)
	{
		Vue.nextTick(() => {
			console.log("cancel edit. Reverting to: "+state.beforeEditCache_body);
			commit('updateState',{ id, body:state.beforeEditCache_body });
			commit('updateState',{ id, planned_time:state.beforeEditCache_planned_time });
		});
	}
	commit('updateState',{ editingItem:null });
	commit('updateState',{ editingItemTags:null });
	commit('updatePopouts',{ edit:[] });
},
cancelAddNew ({state, commit, dispatch, getters},
	{cancelUnderId} = {})
{
	preventKeydownListener();
	console.log('cancelAddNew');
	state.addingNewUnder = null;
	// state.addingNewEmptyList = false;
	if (selection.selectedId == cancelUnderId || selection.selectedId == null)
	{ // to prevent item being reselected when cancelAddNew through blur because of clicking on another item.
		selection.selectedId = selection.lastSelectedId;
	}
	// Reset newItem to sibling stance.
	state.addingNewAsChild = false;
	// $(':focus').blur();
},
addNew ({state, commit, dispatch, getters},
	{addNextItemAs, newItem, olderSibling, addTags} = {})
{
	store.commit('resetNewItem');
	if (!newItem.body){ return; }
	addTags = (addTags) ? addTags : [];
	if (olderSibling)
	{
		olderSibling = olderSibling;	
	} else if (selection.selectedId) {
		olderSibling = state.nodes[selection.selectedId];
	} else {
		olderSibling = false;
	}
	// Set parent ID and depth & protect against bugs when olderSibling is the root:
	newItem.parent_id = (olderSibling.parent_id) ? olderSibling.parent_id : state.root.id;
	newItem.depth = (olderSibling.depth == 0) ? 1 : olderSibling.depth;

	let OlderSiblingIndex = getters.siblingIndex(olderSibling.id);
	let index = (isNaN(OlderSiblingIndex)) ? 0 : OlderSiblingIndex+1;
	console.log(`
		adding new item[${newItem.body}]
		with parent id = ${newItem.parent_id}
		depth = ${newItem.depth}
		index = ${index}`);
	if (state.addingNewAsChild)
	{
		newItem.depth = olderSibling.depth + 1;
		newItem.parent_id = olderSibling.id;
		index = 0;
	}
	if (selection.view == "journal")
	{
		newItem.done = 1;
		let doneDate = (!olderSibling || olderSibling.depth == 0) ? moment().format() : olderSibling.done_date;
		newItem.done_date = doneDate;
	}
	if ( selection.filter.includes('today')
	   && getters.isTopLvlItemInFilteredRoot(olderSibling.id)
	   && !state.addingNewAsChild )
	{
		newItem.due_date = moment().format();
		addTags = addTags.filter(function(val){
			return val != 'Today';
		});
	}
	console.log('sending newItem:');
	console.log(JSON.parse(JSON.stringify(newItem)));
	console.log('sending tags:');
	console.log(addTags);
	// Send to Root for Ajax call.
	dispatch('addTempNewItem', { item:newItem, index, addNextItemAs, addTags });
	dispatch('postNewItem', { newItem, index, addNextItemAs, addTags, duplication:null });
},
checkFilteredItemsTree ({state, commit, dispatch, getters})
{
	//Go through ALL ITEMS and return those that have the tag AND no parent with the tag.
	objectToArray(state.nodes).forEach(function(item){
		let target;
		let targetHidden;
		let hasParentWithTag;
		let targetToday;
		let topLvlItem;
		if (selection.nothingSelected())
		{
			topLvlItem = (item.depth == 1) ? true : false;
			if (topLvlItem){ return true; }
		} else {
			target = selection.tags.every(tag => getters.hasTag(item.id, tag));
			targetHidden = selection.hiddenTags.some(tag => getters.hasTag(item.id, tag));
			hasParentWithTag = selection.tags.some(tag => getters.hasParentWithTag(item.id, tag));
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
// 	let dd = objectToArray(state.nodes).filter(item => item.done);
// 	dd = sortObjectArrayByTwoProperties(dd,'done_date','parents_bodies','desc','asc');
// 	state.doneData = dd;
// },
// getItemWithVisibleChildren(id)
// {
// 	id = (id) ? id : selection.selectedId;
// 	if (!id){ return; }
// 	let item = state.nodes[id];
// 	if (!item){ return; }
// 	let visibleChildren = [];
// 	item.children.forEach(function(child){
// 		if (!state.hiddenItemIds.includes(child.id))
// 		{
// 			visibleChildren.push(getters.getItemWithVisibleChildren(child.id));
// 		}
// 	}.bind(this));
// 	item.children = visibleChildren;
// 	return item;
// },
// returnDoneChildrenAmount(item){
// 	let x = item.children.reduce(function(prevChild, currChild) {
// 		let y = (currChild.done) ? 1 : 0;
// 		return prevChild + y;
// 	}, 0);
// 	return x;
// },
showChildren ({state, commit, dispatch, getters},
	{id, action} = {})
{
	id = (id) ? id : selection.selectedId;
	let item = state.nodes[id];
	if (!item.children || !item.children.length){ return; }
	if (action == 'show'){
		if (item.show_children) { return; }
		item.show_children = true;
	} else if (action == 'hide') {
		if (!item.show_children) { return; }
		item.show_children = false;
	} else {
		item.show_children = !item.show_children;
	}
	dispatch('patch', { id:id, field:'show_children' });
},
markDone ({state, commit, dispatch, getters},
	{id, markAs} = {})
{
	id = (id) ? id : selection.selectedId;
	if (!id){ return; }
	let item = state.nodes[id];
	if (!item){ return; }
	if (markAs == 'notDone'){
		item.done = false;
		dispatch('prepareDonePatch', {id} );
		return;
	}
	if (item.children.length && !getters.allChildrenDone(id)){
		return;
	}
	if (markAs == 'done') {
		item.done = true;
	} else {
		item.done = !item.done;
	}
	dispatch('prepareDonePatch', {id} );
},
indent ({state, commit, dispatch, getters},
	{id} = {})
{
	id = (id) ? id : selection.selectedId;
	// if (!getters.isTopLvlItemInFilteredRoot(id)){ 
	// 	console.log("can't indent a topLvlItem in filtered list");
	// 	return;
	// }
	let new_parent_id = getters.olderSiblingId(id);
	if (new_parent_id == state.nodes[id].parent_id){ console.log('bump! ceiling!'); return; }
	console.log('new_parent_id / olderSiblingId: '+new_parent_id);
	dispatch('giveNewParent', { id,new_parent_id });
},
unindent ({state, commit, dispatch, getters},
	{id} = {})
{
	id = (id) ? id : selection.selectedId;
	// if (!getters.isTopLvlItemInFilteredRoot(id)){ 
	// 	console.log("can't unindent a topLvlItem in filtered list");
	// 	return;
	// }
	let depth = state.nodes[id].depth;
	let olderSiblingId = getters.olderSiblingId(id);
	let olderSiblingDepth = state.nodes[olderSiblingId].depth;

	while(olderSiblingDepth != depth-1){
		olderSiblingId = getters.olderSiblingId(olderSiblingId);
		olderSiblingDepth = state.nodes[olderSiblingId].depth;
	}
	let new_parent_id = olderSiblingId;
	let new_parent_depth = olderSiblingDepth;
	console.log('new_parent: '+new_parent_id);

	if (!new_parent_id){ console.log('crash! floor!'); return; }
	if (new_parent_depth == 0 && depth == 1){ console.log('crash! floor!'); return; }
	if (new_parent_id == state.nodes[id].parent_id){
		new_parent_id = state.nodes[new_parent_id].parent_id;
	}
	dispatch('giveNewParent', { id, new_parent_id });
},
selectItem ({state, commit, dispatch, getters},
	{id, direction} = {})
{
	id = (id) ? id : selection.selectedId;
	let nextSelectedId;
	if (!direction)
	{
		nextSelectedId = id;
	} else
	if (direction == 'next')
	{
		if (!id || id == state.root.id)
		{
			nextSelectedId = vm.$refs.root.childrenOrder[0];
		} else {
			nextSelectedId = getters.nextItemId(id);
		}
	} else
	if (direction == 'prev') {
		if (!id || id == state.root.id)
		{
			let l = vm.$refs.root.childrenOrder.length;
			nextSelectedId = vm.$refs.root.childrenOrder[l-1];
		} else {
			nextSelectedId = getters.prevItemId(id);
		}
	}
	selection.selectedId = nextSelectedId;
	dispatch('scrollToItemIfNeeded', { id:nextSelectedId });
},
setToday ({state, commit, dispatch, getters},
	{id} = {})
{
	id = (id) ? id : selection.selectedId;
	if (!id){ return; }
	if (getters.hasParentDueToday(id)){ console.log('parent is already due'); return; }
	dispatch('setDueDate', {id});
},
showAddNewItem ({state, commit, dispatch, getters},
	{id, addAs} = {})
{
	id = (id) ? id : (selection.selectedId) ? selection.selectedId : state.root.id ;
	if (!id){ return; }
	console.log('showAddNewItem for ['+state.nodes[id].body+']');
	state.addingNewUnder = id;
	selection.lastSelectedId = id;
	selection.selectedId = null;
	state.addingNewAsFirstChild = (addAs == 'child') ? true : false;
	state.addingNewAsChild = (addAs == 'child') ? true : false;
},
startEditTags ({state, commit, dispatch, getters},
	{id} = {})
{
	id = (id) ? id : selection.selectedId;
	if (!id){ return; }
	state.editingItemTags = id;
},
stopPatching ({state, commit, dispatch, getters})
{
	if (window.stopPatchingIcon){ clearTimeout(window.stopPatchingIcon); }
    window.stopPatchingIcon = setTimeout(function(){ state.patching = false; }.bind(state), 300);
},
startPatching ({state, commit, dispatch, getters})
{
    if (window.stopPatchingIcon){ clearTimeout(window.stopPatchingIcon); }
	state.patching = true;
},
patchRootChildrenOrderWithFilter ({state, commit, dispatch, getters},
	{id} = {})
{
	axios.get('api/items/'+state.root.id).then(function(response){
		let rootChildrenOrder = response.data.children_order;
		rootChildrenOrder = rootChildrenOrder+','+id;
		axios.patch('api/items/'+state.root.id, {'children_order':rootChildrenOrder}).then(function(response){
			let newRootChildrenOrder = response.data.children_order;
			console.log('newRootChildrenOrder = '+newRootChildrenOrder);
		});
	});
},
patch ({state, commit, dispatch, getters},
	{id, field, value} = {})
{
	// if (getters.isTopLvlItemInFilteredRoot(id)){ 
	// 	if (field == 'children_order' || field == 'parent_id'){
	// 		console.log("you can't sync a toplvlItem when filtering");
	// 		return;
	// 	}
	// }
	dispatch('startPatching');
	let patchObj = {};
	let patchVal = (value) ? value : state.nodes[id][field];
	if (field == 'children_order'){
		patchVal = arrayToString(patchVal);
	}
	patchObj[field] = patchVal;
	axios.patch('/api/items/' + id, patchObj, { method: 'PATCH'})
	.then(function(response){
		console.log(`patched ${id}[${state.nodes[id].body}].${field} = ${patchObj[field]}`);
		dispatch('stopPatching');
	}, (response) => {
		state.patching = 'error';
		let errMsg = getters.text.flashes.ajaxError;
		console.log(errMsg);
		dispatch('sendFlash', { type:'ajaxError', msg:errMsg });
		return;
	});
},
patchTag ({state, commit, dispatch, getters},
	{id, tags, requestType} = {})
{
	/* requestType can be:
		'tag': tag item  (default if null)
		'untag': untag item with certain tag
		'retag': delete all tags and retag new ones
	*/
	if (!tags){ return; }
	dispatch('updateItemTagsDom', { id, tags, requestType });
	if (Array.isArray(tags)){
		tags = removeEmptyValuesFromArray(tags);
		if (!tags.length){ return; }
	} else {
		if (!tags.replace(/\s/g, "").length){ return; }
	}
	dispatch('startPatching');
	let patchObj = {};
	patchObj['tags'] = tags;
	patchObj['type'] = requestType;
	axios.patch('/api/itemtags/' + id, patchObj, { method: 'PATCH'})
	.then(function(tagResponse){
		let syncedTags = tagResponse.data.tags;
		console.log('tagged ['+state.nodes[id].body+'] with: '+tagResponse.data.tags+';');
		console.log(tagResponse);
		// Re-Add tags of item
		axios.get('/api/itemtags/' + id, { type: 'tags'})
		// Codementor: Request type doesn't work......
		.then(function(updatedTagList){
			state.nodes[id].tagged = updatedTagList.data;
			console.log('updatedTagList of ['+state.nodes[id].body+'] with: '+updatedTagList.data.map(t => t.tag_name)+';');
		});
		dispatch('stopPatching');
	});
},
patchDueDate ({state, commit, dispatch, getters},
	{id, duedate} = {})
{
	dispatch('startPatching');
	if (duedate == '0000-00-00 00:00:00'){
		axios.patch('/api/items/' + id, {'due_date':duedate})
		.then(function(response){
			dispatch('stopPatching');
		});
		return;
	}
	duedate = moment(duedate).format();
	console.log('PatchDueDate: '+duedate);
	axios.patch('/api/items/' + id, {'due_date':duedate})
	.then(function(response){
		dispatch('stopPatching');
	});
},
patchDone ({state, commit, dispatch, getters},
	{id} = {})
{
	dispatch('startPatching');
	let done_date;
	let doneValue = state.nodes[id].done;
	if (doneValue){
		done_date = moment().format();
	} else {
		done_date = '0000-00-00 00:00:00';
	}
	axios.patch('/api/items/' + id, {'done':doneValue, 'done_date':done_date})
	.then(function(response){
		dispatch('stopPatching');
	});
},
deleteItemDialogue ({state, commit, dispatch, getters},
	{id} = {})
{
	id = (!id) ? selection.selectedId : id ;
	dispatch('popout', { id:id, type:'confirm-delete' });
},
deleteItemApi ({state, commit, dispatch, getters},
	{idOrArray} = {})
{
	dispatch('startPatching');
	if (Array.isArray(idOrArray) && idOrArray.length) {
		let array = idOrArray; // It's an array!
		array.forEach(id => { dispatch('deleteItemApi', { idOrArray:id }); });
	} else {
		let id = idOrArray; // It's an ID!
		if (!id){ return; }
		let item = state.nodes[id];
		axios.delete('/api/items/' + id)
		.then(function(response){
			console.log(`deleted: ${id}[${item.body}]`);
			dispatch('stopPatching');
		});
	}
},
popup ({state, commit, dispatch, getters},
	{id, type} = {})
{
	id = (!id) ? selection.selectedId : id ;
	let item = state.nodes[id];
	let popupExists = state.popups.filter(function (popup) { return popup.item.id === id; })[0];
	if (popupExists){ return; }
	state.popups.push({
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
sendFlash ({state, commit, dispatch, getters},
	{type,msg} = {})
{
	state.flashes.push({type,msg});
},
popout ({state, commit, dispatch, getters},
	{id, type} = {})
{
	id = (!id) ? selection.selectedId : id ;
	if (!id){ return; }
	let item = state.nodes[id];
	// let popoutExists = state.popouts.filter(function (popout) { return popout.item.id === id; })[0];
	// if (!popoutExists){
		// console.log("poppy doesn't exist");
		if (type=='timer'){
			state.popouts.timer.push(item);
			Vue.nextTick(() => {
				console.log('emitting playTimer on Vue.nextTick');
				Vue.bus.$emit('playTimer', item);
			});
			// setTimeout(() => {
			// 	console.log('emitting playTimer after 1 sec');
			// 	eventHub.$emit('playTimer');
			// },1000);
		}
		if (type=='confirm-delete'){
			state.popouts.delete.push(item);
		}
	// }
},
addTimer ({state, commit, dispatch, getters},
	{id = selection.selectedId} = {})
{
	dispatch('popout', { id, type:'timer' });
	return;
},
fetchDone ({state, commit, dispatch, getters},
	{tags, operator} = {})
{
	state.loading = true;
	axios.get('/api/items/fetchdone').then(function(response){
		// debugger;
		state.fetchedDone = true;
		console.log('fetched Done');
		let data = response.data;
		console.log(data);
		if (!data.length){ 
			console.log('no done items...');
			state.loading = false;
			return;
		}
		// clean up and add as nodes
		data.forEach(item => {
			item = getters.setDefaultItemValues(item)
			if (!state.nodes[item.id]){ state.nodes[item.id] = item; }
		});
		// Codementor
		selection.view = null;
		selection.view = 'journal';
		state.loading = false;
	});
},
clipboardSuccess ({dispatch, state, getters})
{
	dispatch('sendFlash', { type:'success', msg:state.keybindings.copyClipboard.success[getters.language] });
},
clipboardError ({dispatch, state, getters})
{
	dispatch('sendFlash', { type:'error', msg:state.keybindings.copyClipboard.error[getters.language] });
},
filterItems ({state, commit, dispatch, getters},
	{keyword, value, event} = {})
{
	if (state.editingItem){ return; }
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
	if (keyword == 'journal' && !state.fetchedDone)
	{
		dispatch('fetchDone', { tags:null, operator:operator });
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
removeFilter ({state, commit, dispatch, getters},
	{tag} = {})
{
	selection.hiddenTags = selection.hiddenTags.filter(x => x !== tag);
},
postNewItem ({state, commit, dispatch, getters},
	{newItem, index, addNextItemAs, addTags, duplication} = {})
{
	dispatch('startPatching');
	// Prepare children_order for sending to DB.
	if (newItem.children_order){
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
	axios.post('/api/items',data) //SEND
	// axios.post('/api/items',newItem) //SEND
	.then(function(response){ //response
		let storedItem = response.data;
		// Revert old item's children_order back to string.
		// storedItem.children_order = (!newItem.children_order) ? [] : newItem.children_order.split(',').map(Number);
		// if (storedItem.constructor === Array){
		// 	console.log(storedItem);
		// 	console.log('storedItem ARRAY');
		// 	storedItem.forEach(item => allItems.addItem(item));
		// 	return;
		// }
		console.log('starting dom update...');
		console.log('Index: ');
		console.log(index);
		dispatch('addItem', { item:storedItem, index, addNextItemAs, addTags, duplication });
		dispatch('stopPatching');
	}, (response) => {
		state.patching = 'error';
		let errMsg = getters.text.flashes.ajaxError;
		console.log(errMsg);
		dispatch('sendFlash', { type:'ajaxError', msg:errMsg });
	});

},
test ({state, commit, dispatch, getters},
	{id} = {})
{
	document.querySelectorAll(".tag-menu a").forEach(el => alert(JSON.stringify(el.style.color)));
	// id = (!id) ? selection.selectedId : id ;
	// id = selection.selectedId;
	// let item = state.nodes[id];
	// this.patchTag(id, 'bloem', 'tag');

},
alert ({state, commit, dispatch, getters},
	{value} = {})
{
	alert(value);
},

};