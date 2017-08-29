import { format, formatRelative, differenceInCalendarDays, addDays } from 'date-fns/esm'
import { hasClass, scrollToElementIfNeeded, scrollToElement, removeEmptyValuesFromArray, makeTagObject } from '../helpers/globalFunctions.js'
import setDefaultItemValues from './setDefaultItemValues.js'

// we import all of `date`
import { date } from 'quasar'
// destructuring to keep only what is needed
const { addToDate } = date;
// import { sec_to_hourmin } from '../../components/valueMorphers2.js';

export default {
resetStore({commit})
{
	commit('newItem/resetStateData');
	commit('selection/resetStateData');
	commit('userSettings/resetStateData');
	commit('user/resetStateData');
	commit('resetStateData');
},
giveNewParent ({state, commit, dispatch, getters},
	{ id, new_parent_id, specificNewIndex } = {})
{
	if (itemGetters[id].isTopLvlItemInFilteredRoot)
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
	let siblingIndex = itemGetters[id].siblingIndex;
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
		let newIndex = itemGetters[prevParent.id].siblingIndex+1;
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
	let tags = itemGetters[new_parent_id].itemTagArray;
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
duplicate ({state, dispatch},
	{id} = {})
{
	id = (!id) ? state.selection.selectedId : id ;
	let item = state.nodes[id];
	let index = itemGetters[id].siblingIndex+1;
	let dupe = JSON.parse(JSON.stringify(item));
	// state.nodes[item.parent_id].children.splice(index, 0, dupe);

	let addNextItemAs = null;
	let addTags = dupe.tagged.map(tagObj => tagObj.tag_name);
	let duplication = true;
	dispatch('postNewItem', { newItem:dupe, index, addNextItemAs, addTags, duplication });
},
addAndCleanNodesRecursively ({commit, dispatch, getters},
	{item} = {})
{
		let t0 = performance.now( );
	// console.info('adding this item as node ↓');
	// console.log(item);
	item = setDefaultItemValues(item);
		let t0__a = performance.now( );
	commit('addNode',{item});
		let t1__a = performance.now( );
	console.log("			call to addAndCleanNodesRecursively part A took " + (t1__a - t0__a) + " milliseconds.")
	if (item.children.length)
	{
		item.children.forEach(function(child) {
			return dispatch('addAndCleanNodesRecursively', { item:child });
		});
	}
		let t1 = performance.now( );
	console.log("			call to addAndCleanNodesRecursively took " + (t1 - t0) + " milliseconds.")
},
addFetchedNodes ({commit},
	{nodes})
{
	Object.keys(nodes).forEach(id => {
		commit('addNode', {item: nodes[id]});
	});
},
addItem ({state, commit, dispatch, getters},
	{item, index, addNextItemAs, addTags, duplication} = {})
{
	let t0 = performance.now( );
	console.log(`addItem to DOM`);
	console.log(item);
	// Remove the Temp item.
	if (getters['user/loggedIn'] && !item.id.toString().includes('tempItem'))
	{
		console.log('deleting temp item');
		commit('deleteTempItem', {item});
	}
	// Add item to nodes.
	dispatch('addAndCleanNodesRecursively', {item} )
	.then(()=>{
		// Add item to parent node:
		commit('addChild',{ newParentId:item.parent_id, index, item })
		// Add tags
	    if (addTags){ dispatch('tagItem', { id:item.id, tags:addTags }); }
		// calculate done state of parent. (if it was done, make undone because a new item is added)
		dispatch('autoCalculateDoneState', { id:item.parent_id });
		
	
		// this is done at "SHOW ADD NEW ITEM"
		// =========================
		// // Patches etc.
		// state.selection.selectedId = item.id;
		// // addingNewUnder:
		// commit('updateState',{ addingNewUnder:item.id });
		// =========================

		// if ( itemGetters[item.id].isTopLvlItemInFilteredRoot
		// 	&& item.parent_id == state.root.id )
		// {
		// 	getters.backups.rootChildren.push(item);
		// 	vm.patchRootChildrenOrderWithFilter(item.id);
		// } else {
			if (!item.id.toString().includes('tempItem'))
			{
				console.log('patching parent order: '+item.parent_id);
			    dispatch('patch', { id:item.parent_id, field:'children_order' });
			}
		    // console.log('this is when we patch the parents children_order');
		    // console.log('parent node:');
		    // console.log(state.nodes[item.parent_id]);
		// }

		// Refresh the filter to update for new item.
		// MAYBE NOT NEEDED ANYMORE
		// =========================
		// if (state.selection.view == 'journal')
		// {
		// 	state.selection.view = null;
		// 	state.selection.view = 'journal';
		// }
		// if (getters['selection/dueItemsFiltered'])
		// {
		// 	state.selection.filter.dueDate.to = null;
		// 	state.selection.filter.dueDate.to = new Date();
		// }
		// if (state.selection.tags.length)
		// {
		// 	let tags = state.selection.tags;
		// 	state.selection.tags = [];
		// 	state.selection.tags = tags;
		// }
		// ========================
		console.log('showing state.selection.selectedId');
		console.log(state.selection.selectedId);
		if (duplication || addNextItemAs == 'stop' || state.selection.selectedId != null)
	    {
	    	state.addingNewUnder = null;
	    } else {
		    dispatch('showAddNewItem', { id:item.id, addAs:addNextItemAs });
	    }
	    if (state.selection.selectedId && state.selection.selectedId.includes('tempItem'))
	    {
	    	state.selection.selectedId = item.id;
	    }
		Vue.nextTick(()=> dispatch('scrollToItemIfNeeded', { id:item.id }));
		let t1 = performance.now( );
		console.log("			call to addItem took " + (t1 - t0) + " milliseconds.")
	});
},
hideTaggedNodes ({state, getters},
	{tag} = {})
{
	Object.keys(state.nodes).forEach(function(id) {
		id = parseFloat(id);
		if (getters.hasTag(id, tag))
		{
			if (!state.selection.hiddenItems.includes(id))
			{
				state.selection.hiddenItems.push(id);
			}
		}
	});
},
hideDoneNodes ({state})
{
	Object.keys(state.nodes).forEach(id => {
		id = parseFloat(id);
		if (state.nodes[id].done){
			if (!state.selection.hiddenItems.includes(id)){
				state.selection.hiddenItems.push(id);
			}
		}
	});
},
sortAllChildren ({state, dispatch})
{
	if(!state.root.children || !state.root.children.length){ return; }
	console.log('sorting all items');
	Object.keys(state.nodes).forEach(id => {
	    dispatch('sortChildren', {id});
	    dispatch('updateChildrenDueDate', {id});
	});
},
sortChildren ({state, commit, dispatch},
	{id} = {})
{
	let item = state.nodes[id];
	item.children_order = item.children_order.filter(id => item.children.includes(state.nodes[id]));

	let order = item.children_order;
	let items = item.children;
	if (order instanceof Array && order.length)
	{
		item.children = order.map(id => items.find(t => t.id === id));
	}
},
updateChildrenDepth ({state, commit, dispatch},
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
	})
},
copyParentBodyToAllChildren ({state, commit, dispatch},
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
attachParentBody ({state, commit, dispatch},
	{id} = {})
{
	if (!id){ return; }
	let item = state.nodes[id];
	if (!item.parent_id){ return; }
	let parent = state.nodes[item.parent_id];
	if (!parent){ return; }
	commit('updateState', {id, parents_bodies:parent.body});
	dispatch('patch', { id:id, field:'parents_bodies' });
},
deleteItem ({state, commit, dispatch, getters},
	{id} = {})
{
	if (!id){ console.log('item id not specified at deleteItem'); }
	let item = state.nodes[id];
	let previousItemId = (itemGetters[id].prevItemId) ? itemGetters[id].prevItemId : null;
	// Delete all children as well!
	if (Array.isArray(item.children) && item.children.length)
	{
		let allChildrenIds = itemGetters[id].allVisibleChildIds;
		dispatch('deleteItemApi', { idOrArray:allChildrenIds });
		allChildrenIds.forEach((id)=>{
			vm.$delete(state.nodes, id);
		});
	}
	// Delete items attached to previous parent
	let parent_id = item.parent_id;
	let prevParent = state.nodes[parent_id];
	if (prevParent)
	{
		let siblingIndex = itemGetters[id].siblingIndex;
		prevParent.children.splice(siblingIndex,1);
		prevParent.children_order.splice(siblingIndex,1);
		// Patch and recalculate
		dispatch('patch', { id:parent_id, field:'children_order' });
	}
    dispatch('deleteItemApi', { idOrArray:id });
	// dispatch('autoCalculateDoneState', { id:parent_id });
	if (state.selection.view == 'journal')
	{
		state.selection.view = null;
		state.selection.view = 'journal';
	}
	if (state.selection.view == 'tree')
	{
		state.selection.view = 'journal';
		state.selection.view = 'tree';
	}
	if (getters['selection/dueItemsFiltered'])
	{
		state.selection.filter.dueDate.to = null;
		state.selection.filter.dueDate.to = new Date();
	}
	let newSelectedId = (itemGetters[previousItemId].nextItemId) ? itemGetters[previousItemId].nextItemId : null;
	console.log(`new selected ID is: ${newSelectedId}`);
    state.selection.selectedId = newSelectedId;
	vm.$delete(state.nodes, id);
},
tagItem ({state, commit, dispatch, getters},
	{id = state.selection.selectedId, tags = state.newTag, requestType = 'tag'} =
	{id:state.selection.selectedId, tags:state.newTag, requestType:'tag'})
{
	let t0 = performance.now( );
	// console.log(`tagItem`);
	/* requestType can be:
		'tag': tag item  (default if null)
		'untag': untag item with certain tag
		'retag': delete all tags and retag new ones
	*/
	if (!tags){ return; }
	tags = JSON.parse(JSON.stringify(tags));
	state.newTag = null;
	if (!Array.isArray(tags))
	{
		tags = [tags];
	}
	tags = removeEmptyValuesFromArray(tags);
	if (requestType == 'tag')
	{
		tags = tags.filter(t => !getters.hasTag(id,t));
	}
	if (!tags.length){ return; }
		let t0__a = performance.now( );
	dispatch('tagItemTemporarely', { id, tags, requestType });
		let t1__a = performance.now( );
		console.log("			A point in tagItem call took " + (t1__a - t0__a) + " milliseconds.")
		let t0__b = performance.now( );
	dispatch('patchTag', { id, tags, requestType });
		let t1__b = performance.now( );
		console.log("			B point in tagItem call took " + (t1__b - t0__b) + " milliseconds.")

	let item = state.nodes[id];
	if (!item){ return; }
	if (item.children.length)
	{
		item.children_order.forEach(function(childId){
			dispatch('tagItem', { id:childId, tags:tags });
		});
	}
	let t1 = performance.now( );
	console.log("			Call to tagItem took " + (t1 - t0) + " milliseconds.")
},
tagItemTemporarely ({state, commit, dispatch, getters},
	{id, tags, requestType = 'tag'} = {id:null, tags:null, requestType:'tag'})
{
	let t0a = performance.now( );
	if (!tags){ return; }
	if (!Array.isArray(tags)){
		tags = [tags];
	}
	tags = tags.map(tag => makeTagObject(tag));
	if (requestType == 'untag')
	{
		commit('deleteTag', {id, tags});
	} else {
		commit('addTagTemporarely', {id, tags});
	}
	tags.forEach((tag) => {
		if (!state.allTags.find(t => t.tag == tag.tag_slug))
		{
			state.allTags.push(tag.tag)
		}
	});
	let t1a = performance.now( );
	console.log("			Call to dispatch tagItemTemporarely took " + (t1a - t0a) + " milliseconds.")
},
prepareDonePatch ({state, commit, dispatch},
	{id} = {})
{
	console.log(`preparingDonePatch for ${id}`);
	let item = state.nodes[id];
	if (!item){ return; }
	// console.log(`item.done = ${item.done}`);
	// if (item.done)
	// {
		let done_date = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
		console.log(done_date);
		commit('updateState', {id, done_date});
	// }
	// else
	// {
	// 	commit('updateState', {id, done_date: '0000-00-00 00:00:00'});
	// }
	dispatch('patchDone', {id} );
	if (item.done)
	{
		dispatch('popup', { id:id, type:'afterDone' });
		dispatch('attachParentBody',{ id: id });
	}
	// dispatch('autoCalculateDoneState', { id:item.parent_id });
},
autoCalculateDoneState ({state, commit, dispatch},
	{id} = {})
{
	if (state.nodes[id].depth == 0){ return; }
	// console.log('auto calculating done state');
	if (itemGetters[id].allChildrenAreDone == true && !itemGetters[id].isProject)
	{
		// dispatch('markDone', {id, markAs:'done' });
	} else {
		dispatch('markDone', {id, markAs:'notDone' });
	}
},
moveItem ({state, commit, dispatch, getters},
	{id, direction} = {})
{
	id = (!id) ? state.selection.selectedId : id ;
	if (itemGetters[id].isTopLvlItemInFilteredRoot)
	{ 
		let errMsg = getters.text.flashes.moveTopLvlItem;
		console.log(errMsg);
		dispatch('sendFlash', { type:'warning', msg:errMsg });
		return; 
	}
	clearTimeout(window.patchDelay);
	let pId = state.nodes[id].parent_id;
	let parent = state.nodes[pId];
	let index = itemGetters[id].siblingIndex;
	if (direction == 'up')
	{
		if (index == 0)
		{
			if (parent.depth == 0){ console.log('ceiling!'); return; }
			// Jump to last child of previous Sibling
			let parentOlderSiblingId = itemGetters[pId].olderSiblingId;
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
			let new_parent_id = itemGetters[id].nextSiblingOrParentsSiblingId;
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
flushDoneItems ({state, commit, dispatch})
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
updateChildrenDueDate ({state, commit, dispatch},
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
	})
},
formatDone ({state, commit, dispatch},
	{doneArray} = {})
{
	let doneItemsObject = doneArray.reduce((prev,item) => {
		if (item.done)
		{
		  	let donePropName = format(item.done_date, 'YYYY/MM/DD');
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
blockBlur ({state, commit, dispatch})
{
	state.blockBlur = true;
	setTimeout(function()
	{
		state.blockBlur = false;
	},500);
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
	item = (item) ? item : state.nodes[state.selection.selectedId];
	commit('updateState',{ beforeEditCache_body:item.body });
	commit('updateState',{ beforeEditCache_planned_time:item.planned_time });
	// if ( state.mobile )
	// {
	// 	state.popouts.edit.push(item);
	// 	return;
	// }
	commit('updateState',{ editingItem:item.id });
	// if (getters.mobile) { store.$refs['edit-item-modal-'+item.id].open() }
	if (getters.mobile)
	{ 
		Vue.nextTick(() => {
			let el = document.querySelector('.js-editaddbox');
			scrollToElement(el);
		});
	}
},
scrollToItemIfNeeded ({state, commit, dispatch},
	{id} = {})
{
	if (!id){ return };
	let el = document.getElementById('item-body-'+id);
	scrollToElementIfNeeded(el);
},
doneEdit ({state, commit, dispatch, getters},
	{id = state.editingItem} = { id: state.editingItem })
{
	console.log('Done edit!');
	dispatch('blockBlur');
	preventKeydownListener();
	// if (getters.mobile){ store.$refs['edit-item-modal-'+id].close(); }
	let item = state.nodes[id];
	commit('updateState',{ editingItem:null });
	commit('updatePopouts',{ edit:[] });
	if (state.editingItemTags)
	{
		commit('updateState',{ editingItemTags:null });
		return;
	}
	if (!item.body)
	{
		commit('updateState',{ id, body:state.beforeEditCache_body });
	}
	// item.body = item.body.trim();

	if (typeof item.planned_time != 'number' || Number.isNaN(item.planned_time))
	{
		commit('updateState',{ id, planned_time:0 });
	}
	if (item.planned_time != state.beforeEditCache_planned_time)
	{
		dispatch('patch', { id, field:'planned_time' });
	}
	if (item.body != state.beforeEditCache_body)
	{
		dispatch('patch', { id, field:'body' });
		dispatch('copyParentBodyToAllChildren', { parent_id:id });
	}
	commit('updateState',{ beforeEditCache_body:null });
	commit('updateState',{ beforeEditCache_planned_time:null });
	// setTimeout(() => this.convertbodyURLtoHTML(),1000);
},
cancelEdit ({state, commit, dispatch, getters})
{
	let id = (state.editingItem) ? state.editingItem : state.editingItemTags;
	if (!id) { return; }
	// if (getters.mobile){ store.$refs['edit-item-modal-'+id].close() };
	if (state.editingItem)
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
cancelEditOrAdd ({state, commit, dispatch})
{
	// why do i need this?
	// preventKeydownListener(); // see window object. initialized at ListAppKeyBindings.js
	dispatch('blockBlur');
	if (state.addingNewUnder)
	{
		dispatch('cancelAddNew');
	}
	else if (state.editingItem || state.editingItemTags)
	{
		dispatch('cancelEdit');
	}
},
cancelAddNew ({state, commit, dispatch, getters})
{
	// if (getters.mobile){ store.$refs['add-item-modal'].close() };
	console.log('cancelAddNew');
	if (state.selection.selectedId == state.addingNewUnder || state.selection.selectedId == null)
	{ // to prevent item being reselected when cancelAddNew through blur because of clicking on another item.
		state.selection.selectedId = state.selection.lastSelectedId;
		dispatch('scrollToItemIfNeeded', {id:state.selection.lastSelectedId});
	}
	// Reset newItem to sibling stance.
	state.addingNewUnder = null;
	state.addingNewAsChild = false;
	// state.addingNewAsFirstChild = false;
},
addNew ({state, commit, dispatch, getters},
	{addNextItemAs} = {addNextItemAs:null})
{
	dispatch('blockBlur');
	// if (getters.mobile && addNextItemAs == 'stop'){ store.$refs['add-item-modal'].close() };
	console.log('addingNew');
	let newItem = JSON.parse(JSON.stringify(state.newItem));
	let olderSiblingId = state.addingNewUnder;
	let addTags = getters['newItem/preparedPlusComputedTags'];
	commit('newItem/resetStateData');
	newItem.newItem = null; // important to prevent bugs with temp items
	if (!newItem.body){ return; }
	if (!olderSiblingId && state.selection.selectedId)
	{
		olderSiblingId = state.selection.selectedId;
	} else if (!olderSiblingId && !state.selection.selectedId) {
		olderSiblingId = state.root.id;
	}
	let olderSibling = state.nodes[olderSiblingId];
	// Set parent ID and depth & protect against bugs when olderSibling is the root:
	newItem.parent_id = (olderSibling.parent_id) ? olderSibling.parent_id : state.root.id;
	newItem.depth = (!olderSibling.depth) ? 1 : olderSibling.depth;

	let OlderSiblingIndex = itemGetters[olderSibling.id].siblingIndex;
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
	if (state.selection.view == "journal")
	{
		newItem.done = 1;
		let doneDate = (!olderSibling || olderSibling.depth == 0) ? format(new Date(), 'YYYY-MM-DD HH:mm:ss') : olderSibling.done_date;
		newItem.done_date = doneDate;
	}
	if ( getters['selection/dueItemsFiltered']
	   && itemGetters[olderSibling.id].isTopLvlItemInFilteredRoot
	   && !state.addingNewAsChild )
	{
		newItem.due_date = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
		addTags = addTags.filter(function(val){
			return val != 'Today';
		});
	}
	console.log('sending newItem:');
	console.log(JSON.parse(JSON.stringify(newItem)));
	console.log('sending tags:');
	console.log(addTags);
	// Send to Root for Ajax call.
	commit('resetNewItem');
	dispatch('addItem', {item:newItem, index, addNextItemAs, addTags}) // this is the temporary item
	.then(()=> dispatch('postNewItem', { newItem, index, addNextItemAs, addTags, duplication:null }));
},
showChildren ({state, commit, dispatch},
	{id, action} = {})
{
	id = (id) ? id : state.selection.selectedId;
	let item = state.nodes[id];
	if (!item.children || !item.children.length){ return; }
	if (action == 'show'){
		if (item.show_children) { return; }
		commit('updateState', {id, show_children:true});
	} else if (action == 'hide') {
		if (!item.show_children) { return; }
		commit('updateState', {id, show_children:false});
	} else {
		commit('updateState', {id, show_children:!item.show_children});
	}
	dispatch('patch', { id:id, field:'show_children' });
},
markDone ({state, commit, dispatch},
	{id, markAs} = {})
{
	id = (id) ? id : state.selection.selectedId;
	if (!id){ return; }
	let item = state.nodes[id];
	if (!item){ return; }
	if (markAs == 'notDone'){
		if (!item.done){ return; }
		commit('updateState', {id, done:false});
		dispatch('prepareDonePatch', {id} );
		return;
	}
	if (item.children.length && !itemGetters[id].allChildrenAreDone){
		return;
	}
	if (markAs == 'done') {
		if (item.done){ return; }
		commit('updateState', {id, done:true});
	} else {
		commit('updateState', {id, done:!item.done});
	}
	dispatch('prepareDonePatch', {id} );
},
indent ({state, commit, dispatch},
	{id} = {})
{
	id = (id) ? id : state.selection.selectedId;
	// if (!itemGetters[id].isTopLvlItemInFilteredRoot){ 
	// 	console.log("can't indent a topLvlItem in filtered list");
	// 	return;
	// }
	let new_parent_id = itemGetters[id].olderSiblingId;
	if (new_parent_id == state.nodes[id].parent_id){ console.log('bump! ceiling!'); return; }
	console.log('new_parent_id / olderSiblingId: '+new_parent_id);
	dispatch('giveNewParent', { id,new_parent_id });
},
unindent ({state, commit, dispatch},
	{id} = {})
{
	id = (id) ? id : state.selection.selectedId;
	// if (!itemGetters[id].isTopLvlItemInFilteredRoot){ 
	// 	console.log("can't unindent a topLvlItem in filtered list");
	// 	return;
	// }
	let depth = state.nodes[id].depth;
	let olderSiblingId = itemGetters[id].olderSiblingId;
	let olderSiblingDepth = state.nodes[olderSiblingId].depth;

	while(olderSiblingDepth != depth-1){
		olderSiblingId = itemGetters[olderSiblingId].olderSiblingId;
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
	{id = state.selection.selectedId, direction} = {id:state.selection.selectedId})
{
	if (getters.mobile){ state.editingItem = state.addingNewUnder = null }
	let nextSelectedId;
	if (!direction)
	{
		nextSelectedId = id;
	}
	else if (direction == 'next')
	{
		if (!id || id == state.root.id)
		{
			nextSelectedId = getters.filteredIdsTree[0];
		} else {
			nextSelectedId = itemGetters[id].nextItemId;
		}
	}
	else if (direction == 'prev') {
		if (!id || id == state.root.id)
		{
			let toplvlItems = getters.filteredIdsTree;
			nextSelectedId = toplvlItems[toplvlItems.length-1];
		} else {
			nextSelectedId = itemGetters[id].prevItemId;
		}
	}
	state.selection.selectedId = nextSelectedId;
	dispatch('scrollToItemIfNeeded', { id:nextSelectedId });
},
setToday ({state, commit, dispatch},
	{id} = {})
{
	id = (id) ? id : state.selection.selectedId;
	if (!id){ return; }
	let item = state.nodes[id];
	if (!item){ return; }
	if (itemGetters[id].hasParentDueToday
		&& item.due_date == '0000-00-00 00:00:00')
	{
		console.log('parent is already due');
		return;
	}
	dispatch('setDueDate', {id});
},
setTomorrow ({state, commit, dispatch},
	{id} = {})
{
	id = (id) ? id : state.selection.selectedId;
	if (!id){ return; }
	// let duedate = addDays(new Date(), 1).format("YYYY-MM-DD HH:mm:ss");
	let duedate = addToDate(new Date(), { days: 1 });
	duedate = format(duedate, "YYYY-MM-DD HH:mm:ss");
	dispatch('setDueDate', {id, duedate});
},
setDueDate ({state, commit, dispatch, getters},
	{id, duedate} = {duedate:false})
{
	let dd = (duedate) ? new Date(duedate) : new Date();
	let oriDueDate = new Date(state.nodes[id].due_date.replace(/-/g, "/"));
	let diff = differenceInCalendarDays(oriDueDate, dd);
	dd = (diff == 0) ? '0000-00-00 00:00:00' : format(dd, 'YYYY-MM-DD hh:mm:ss');
	state.nodes[id].due_date = dd;
	if (diff == 0 && getters['selection/dueItemsFiltered'])
	{
		state.selection.selectedId = itemGetters[id].nextItemId;
	}
	dispatch('patchDueDate', {id, duedate:dd });
	dispatch('updateChildrenDueDate', { id:id });
},
showAddNewItem ({state, commit, dispatch, getters},
	{id = state.selection.selectedId, addAs} = {id: state.selection.selectedId})
{
	// if (getters.mobile){ store.$refs['add-item-modal'].open() };
	id = (id) ? id : state.root.id ;
	console.log(`showing add new item for id: ${id}`);
	if (!id){ return; }
	state.addingNewUnder = id;
	state.selection.lastSelectedId = id;
	state.selection.selectedId = null;
	// state.addingNewAsFirstChild = (addAs == 'child') ? true : false;
	state.addingNewAsChild = (addAs == 'child') ? true : false;
	Vue.nextTick(()=>{
		let el = document.querySelector('.js-editaddbox');
		console.log(el);
		if (getters.mobile)
		{
			scrollToElement(el);
			return;
		}
		scrollToElementIfNeeded(el);
	});
	// if (getters.mobile){ 
		// Vue.nextTick(()=>{
		// 	document.querySelector('.js-edit-body').focus();
		// });
	// };
},
startEditTags ({state, commit, dispatch},
	{id} = {})
{
	id = (id) ? id : state.selection.selectedId;
	if (!id){ return; }
	state.editingItemTags = id;
},
stopPatching ({state, commit, dispatch})
{
	if (window.stopPatchingIcon){ clearTimeout(window.stopPatchingIcon); }
    window.stopPatchingIcon = setTimeout(function(){ state.patching = false; }.bind(state), 300);
},
startPatching ({state, commit, dispatch})
{
    if (window.stopPatchingIcon){ clearTimeout(window.stopPatchingIcon); }
	state.patching = true;
},
deleteItemDialogue ({state, commit, dispatch},
	{id} = {})
{
	id = (!id) ? state.selection.selectedId : id ;
	dispatch('popout', { id:id, type:'confirm-delete' });
},
popup ({state, commit, dispatch},
	{id, type} = {})
{
	id = (!id) ? state.selection.selectedId : id ;
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
sendFlash ({state, commit, dispatch},
	payload = {})
{
	commit('pushFlash', payload);
},
popout ({state, commit, dispatch},
	{id, type} = {})
{
	id = (!id) ? state.selection.selectedId : id ;
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
addTimer ({state, commit, dispatch},
	{id = state.selection.selectedId} = {id: state.selection.selectedId})
{
	dispatch('popout', { id, type:'timer' });
	return;
},
copyProgrammatic ({dispatch, state, getters},
	{text = itemGetters[state.selection.selectedId].clipboardText} = {text: itemGetters[state.selection.selectedId].clipboardText})
{
	let textArea = document.createElement("textarea");
	// *** This styling is an extra step which is likely not required. ***
	//
	// Why is it here? To ensure:
	// 1. the element is able to have focus and selection.
	// 2. if element was to flash render it has minimal visual impact.
	// 3. less flakyness with selection and copying which **might** occur if
	//    the textarea element is not visible.
	//
	// The likelihood is the element won't even render, not even a flash,
	// so some of these are just precautions. However in IE the element
	// is visible whilst the popup box asking the user for permission for
	// the web page to copy to the clipboard.

	// Place in top-left corner of screen regardless of scroll position.
	textArea.style.position = 'fixed';
	textArea.style.top = 0;
	textArea.style.left = 0;

	// Ensure it has a small width and height. Setting to 1px / 1em
	// doesn't work as this gives a negative w/h on some browsers.
	textArea.style.width = '2em';
	textArea.style.height = '2em';

	// We don't need padding, reducing the size if it does flash render.
	textArea.style.padding = 0;

	// Clean up any borders.
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';

	// Avoid flash of white box if rendered for any reason.
	textArea.style.background = 'transparent';

	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.select();
	try {
	    let successful = document.execCommand('copy');
	    let msg = successful ? 'successful' : 'unsuccessful';
	    // dispatch('clipboardSuccess');
	    // console.log('Copying text command was ' + msg);
	    dispatch('sendFlash', { type:'success', msg:`${state.keybindings.copyClipboard.success[getters.language]}

${text}` });
	} catch (err) {
	    // dispatch('clipboardError');
	    // console.log('Oops, unable to copy');
	    console.log(err);
	    dispatch('sendFlash', { type:'error', msg:`${state.keybindings.copyClipboard.error[getters.language]}` });
	}
	document.body.removeChild(textArea);
},
prepareTag ({state})
{
	if (!state.newTag || !state.newTag.trim()){ return; }
	state.newItem.preparedTags.push(state.newTag);
	state.newTag = null;
},
blurOnEditOrAdd ({dispatch, commit, state, getters},
	{ field } = { field:null })
{
	if (state.addingNewUnder)
	{
		let npt = (!state.newItem.planned_time) ? 0 : parseFloat(state.newItem.planned_time);
		commit('newItem/updateState', { planned_time: npt });
	}
	if (state.blockBlur){ return; }
	if (getters.mobile && field == 'add-tag')
	{
	    	if (state.editingItem)
			{
				dispatch('tagItem', { id:state.editingItem, tags:state.newTag });
				return;
			}
			if (state.addingNewUnder)
			{
				dispatch('prepareTag');
				return;
			}
	}
	if (getters.mobile){ return; }
	setTimeout(function()
	{
    	if ( (  document.activeElement.nodeName == 'INPUT'
    		||  document.activeElement.nodeName == 'TEXTAREA'
    		||  document.activeElement.nodeName == 'A'
    		||  document.activeElement.nodeName == 'BUTTON' )
    		&& !document.activeElement.className.includes('js-popup__completion_memo__txtarea')
    		&& !document.activeElement.className.includes('js-toggle')
    	   )
    	{
    		return;
		} else {
	    	if (state.editingItem)
			{
		    	console.log('blurring on edit');
				dispatch('doneEdit');
			}
	    	if (state.editingItemTags)
			{
		    	console.log('blurring on edit tags');
				commit('updateState', { editingItemTags:null });
			}
			if (state.addingNewUnder)
			{
		    	console.log('bluring on Add New');
				dispatch('cancelAddNew');
			}
		}
	},50);
},
doneEditOrCancelNew({state, dispatch}) // this is to use with modals
{
	if (state.editingItem)
	{
    	console.log('blurring on edit');
		dispatch('doneEdit');
	}
	if (state.addingNewUnder)
	{
    	console.log('bluring on Add New');
		dispatch('cancelAddNew');
	}
	// not yet available with modals:
	// if (state.editingItemTags)
	// {
 //    	console.log('blurring on edit tags');
	// 	commit('updateState', { editingItemTags:null });
	// }
},
doneEditOrAddNew({state, dispatch, commit})
{
	if (state.editingItemTags)
	{
		commit('updateState', { editingItemTags:null });
	}
	else if (state.editingItem)
	{
		dispatch('doneEdit');
	}
	else if (state.addingNewUnder)
	{
		dispatch('addNew');
	}
},
focusElement({state},
	{el})
{
	console.log('trying to focus: '+el);
	document.querySelector(el).focus();
},
filterItems ({state, commit, dispatch},
	{keyword, value, event} = {})
{
	commit('updateState', {computing:true});
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
	if (keyword == 'journal' && !state.fetchedDone)
	{
		dispatch('fetchDone', { tags:null, operator:operator });
	}
	dispatch('selection/addKeywords', { keyword, value, operator })
	.then(()=> commit('updateState', {computing:false}) );
},
removeHiddenTag ({state, commit, dispatch},
	{tag} = {})
{
	state.selection.hiddenTags = state.selection.hiddenTags.filter(x => x !== tag);
},
test ({state, commit, dispatch},
	{id} = {})
{
	document.querySelectorAll(".tag-menu a").forEach(el => alert(JSON.stringify(el.style.color)));
	// id = (!id) ? state.selection.selectedId : id ;
	// id = state.selection.selectedId;
	// let item = state.nodes[id];
	// this.patchTag(id, 'bloem', 'tag');

},
alert ({state, commit, dispatch},
	{value} = {})
{
	alert(value);
},

};