import { format } from 'date-fns/esm'
import { Platform } from 'quasar'
import {
	Utilities,objectToArray,uniq,uniqBy,sortObjectArrayByProperty,sortObjectArrayByTwoProperties
} from '../helpers/globalFunctions.js'
import { sec_to_hourmin } from '../helpers/valueMorphers2.js'
import clipboardFormat from '../helpers/clipboardFormat.js'

export default {
filteredItemsUsedSec: (state, getters) => {
	return itemGetters[state.root.id].totalVisibleUsedSec
},
filteredItemsSecLeft: (state, getters) => {
	return itemGetters[state.root.id].totalVisibleSecLeft
},
hasTag: (state, getters) =>
(id, tags) => {
	console.log('running hasTag...');
	let item = state.nodes[id];
	if (!item){ console.log("[hasTag(id, tags)] what is state shit... id:"+id); return false }
	if (!item.tagged || !item.tagged.length){ return false }
	let hasTags;
	if (!Array.isArray(tags)){ tags = [tags] }
	tags.forEach(function (tag) {
		tag = Utilities.tagNameToSlug(tag);
		let tagExists = item.tagged.find(itemTags => itemTags.tag_slug == tag);
		if (tagExists){ hasTags = true; }
	});
	return hasTags;
},
hasAllTags: (state, getters) =>
(id, tags) => {
	let item = state.nodes[id];
	if (!item){ return false }
	if (!item.tagged || !item.tagged.length){ return false }
	if (!Array.isArray(tags)){ tags = [tags] }
	let hasAllTags = tags.every(tag => {
		return (item.tagged.filter(itemTagObject => {
					return itemTagObject.tag_slug == Utilities.tagNameToSlug(tag)
				}).length)
	})
	return hasAllTags;
},
hasParentWithTag: (state, getters) =>
(id, tags) => {
	console.log('running getters.hasParentWithTag...');
	if (!id){ return false; }
	let item = state.nodes[id];
	let parentId = state.nodes[id].parent_id;
	if (!parentId){ return false }
	if (!state.nodes[parentId]){
		// console.log('Parent of ('+id+')['+item.body+'] is non existant.');
		return false;
	}
	let parentHasTag = getters.hasTag(parentId, tags);
	return parentHasTag;
		// return getters.hasParentWithTag(parentId, tags); // recursive check
		// ↑
		// IF there is a parent with tag, each item would have this, so it only requires to check the nearest parent.
},
parentIdWithTag: (state, getters) =>
(id, tags) => {
	console.log('running parentIdWithTag...');
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
checkValParentTree: (state, getters) =>
(id, val) => {
	console.log('running checkValParentTree...');
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
clipboardTextJournal: (state, getters) =>
(item) => {
	console.log('running clipboardTextJournal...');
	// let usedT = (itemGetters[item].totalUsedMin) ? `
	let usedT = (false) ? `
${getters.text.menu.usedTime}: ${sec_to_hourmin(itemGetters[item].totalUsedSec)}` : '';
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
	console.log('running journalDate...');
	if ( !item || state.selection.view != 'journal'
	  || !item.journalDate )
	{
		return false;
	}
	return item.done_date;
},
// Computed properties
filteredItemsTreeDeepestChildren: (state, getters) => {
	console.log('running filteredItemsTreeDeepestChildren...');
	return getters.filteredIdsTree.map(id => {
		let deepestChild = (!itemGetters[id]) ? id : itemGetters[id].findDeepestVisibleChild;
		return { id, deepestChild }
	});
},
oS: (state, getters) => {
	console.log('running oS...');
	return Platform.is.platform;
},
language: (state, getters) => {
	console.log('running language...');
	if (state.setLanguage){ return state.setLanguage; }
	else if (defaultLanguage) { return defaultLanguage; }
	else { return 'en'; }
},
text: (state, getters) => {
	console.log('running text...');
	return state.languageContents[getters.language];
},
desktop: (state, getters) => {
	console.log('running desktop...');
	return Platform.is.desktop;
},
mobile: (state, getters) => {
	console.log('running mobile...');
	if (state.manualMobile){
		return true;
	}
	return Platform.is.mobile;
},
mobileSmall: (state, getters) => {
	console.log('running mobileSmall...');
	if (window.innerWidth < 385){ return true; }
},
noItems: (state, getters) => {
	console.log('running noItems...');
	if (!itemGetters[state.root.id].visibleDirectChildren.length){ 
		return true;
	}
	return false;
},
editingOrAddingId(state, getters)
{
	if (state.editingItemTags)
	{
		return state.editingItemTags;
	}
	else if (state.editingItem)
	{
		return state.editingItem;
	}
	else if (state.addingNewUnder)
	{
		return state.addingNewUnder;
	}
},
filteredItemsJournal: (state, getters) => {
	console.log('running filteredItemsJournal...');
	if (state.selection.view != 'journal'){ return []; }
	let dates = {};
	getters.filteredItemsFlat.forEach(function(item){
		if (!item.done){ return; }
		let dd = format(item.done_date, 'YYYY-MM-DD');
		if (!dates[dd])
		{
			dates[dd] = {date:dd, items:[]};
		}
		if (!state.userSettings.journalShowParentBodies)
		{
			dates[dd].items.push(item);
			return;
		}
		let parentBody = (!item.parents_bodies) ? 'null_no_parent_body' : item.parents_bodies;
		let entry = dates[dd].items.find(entry => entry.parentBody == parentBody)
		if (!entry)
		{
			dates[dd].items.push({parentBody, items:[item]});
		}
		else
		{
			entry.items.push(item);
		}
	});
	return Object.keys(dates).map(dd => dates[dd]);
},
journalDates: (state, getters) => {
	console.log('running journalDates...');
	return Object.keys(getters.filteredItemsJournal);
},
nodesArray: (state) => {
	return Object.keys(state.nodes).filter(id => id != state.root.id).map(id => state.nodes[id])
},
// ==================
// DONE ITEMS
// ==================
doneItemsFlat: (state, getters) => {
	let items = getters.nodesArray;
	let result = items.filter(item => item.done);
	// let result = sortObjectArrayByProperty(result, 'done_date');
	return result;
},
doneIdsFlat: (state, getters) => {
	return getters.doneItemsFlat.map(item => item.id)
},
doneItemsCountFlat: (state, getters) => {
	return getters.doneItemsFlat.length
},
// ==================
// DUE ITEMS
// ==================
dueIdsFlat: (state) => {
	let allIds = Object.keys(state.nodes);
	let result = allIds.filter(id => itemGetters[id].isDueFlat);
	return result;
},
dueItemsFlat: (state, getters) => {
	return getters.dueIdsFlat.map(id => state.nodes[id])
},
dueItemsCountFlat: (state, getters) => {
	return getters.dueIdsFlat.length
},
dueIdsTree: (state) => {
	let allIds = Object.keys(state.nodes);
	let result = allIds.filter(id => itemGetters[id].isDueToday);
	return result;
},
dueItemsTree: (state, getters) => {
	return getters.dueIdsTree.map(id => state.nodes[id])
},
dueItemsCountTree: (state, getters) => {
	return getters.dueIdsTree.length
},
// ==================
// ITEMS WITH SELECTED TAGS
// ==================
itemsWithSelectedTagsTree: (state, getters) => {
	let tagFilters = state.selection.tags;
	if (!tagFilters.length){ return [] }

	let items = tagFilters.map(tagSlug => itemsByTag(tagSlug).tree);
	items = items.reduce((items, array) => {
		return items.concat(array)
	}, []);
	items = items.filter(item => getters.hasAllTags(item.id, tagFilters));
	items = uniq(items);
	return items;
},
itemsWithSelectedTagsFlat: (state, getters) => {
	let tagFilters = state.selection.tags;
	if (!tagFilters.length){ return [] }

	let items;
	if (tagFilters.length == 1)
	{
		items = itemsByTag(tagFilters[0]).flat;
	}
	else if (tagFilters.length > 1)
	{
		let tagFiltersCounts = tagFilters.map(tagSlug => itemsByTag(tagSlug).countFlat);
		let smallestResult = Math.min(...tagFiltersCounts);
		let startTag = tagFilters.find(tagSlug => itemsByTag(tagSlug).countFlat == smallestResult);
		let remainingTags = tagFilters.filter(tagSlug => tagSlug != startTag);
		items = itemsByTag(startTag).flat;
		items = items.filter(item => getters.hasAllTags(item.id, remainingTags));
	}
	return items;
},
// ==================
// FILTERED ITEMS
// ==================
// filteredIdsFlatOLD: (state, getters) => {
// 	console.log('WHY IS THIS RUNNING');
// 	debugger;
// 	console.log('running filteredIdsFlat OLD...');
// 	let t0 = performance.now( );
// 	if (state.loading){ return []; }
// 	let ids = [];
// 	console.log('running filteredIdsFlat');
// 	let allNodes = Object.keys(state.nodes)
// 						 .map(k => (Number(k)) ? Number(k) : k);
// 	if (getters['selection/noFilterOrTag'])
// 	{
// 		ids = allNodes.filter(id => id != state.root.id);
// 	}
// 	else
// 	{
// 		ids = allNodes.filter(id => {
// 			if (id == state.root.id){ return false }
// 			return getters['selection/testAgainstAllSelection'](id, { flat:true })
// 		});
// 	}
// 	let t1 = performance.now( );
// 	console.log('WHY DID THIS RUN?');
// 	console.log("			call to filteredItemsFlat OLD took " + (t1 - t0) + " milliseconds.")
// 	return ids;
// },
// filteredItemsFlatOLD: (state, getters) => {
// 	console.log('running filteredItemsFlat...');
// 	let children = getters.filteredIdsFlat
// 						  .map(id => state.nodes[id])
// 						  .filter(child => child !== undefined);
// 	if (state.selection.view == 'journal')
// 	{
// 		children = sortObjectArrayByTwoProperties(children,'done_date','parents_bodies','desc','asc');
// 	}
// 	return children;
// },
// filteredItemsTreeOLD: (state, getters) => {
// 	console.log('running filteredItemsTree...');
// 	let t0 = performance.now( );
// 	if (state.loading){ return []; }
// 	let ids = [];
// 	if (getters['selection/noFilterOrTag'])
// 	{
// 		ids = state.root.children_order;
// 	}
// 	else
// 	{
// 		ids = Object.keys(state.nodes)
// 					.map(k => (Number(k)) ? Number(k) : k)
// 					.filter(id => {
// 						if (id == state.root.id){ return false }
// 						return getters['selection/testAgainstAllSelection'](id, { flat:false })
// 					});
// 	}
// 	console.log('Filtered Items Tree, IDs:');
// 	console.log(ids);
// 	let children = ids.map(id => state.nodes[id]);
// 	// .filter(item => item !== undefined);
// 	// SORTING !!
// 	// Sort the children by children_order if there's no selected tag or filter
// 	// if (getters['selection/noFilterOrTag'])
// 	// {
// 	// 	if (ids.length)
// 	// 	{
// 	// 		children = ids.map(id => children.find(child => child.id === id));
// 	// 	}
// 	// }
// 	// Sort children by done_date if dueDate is filtered
// 	if ( getters['selection/dueItemsFiltered'] )
// 	{
// 		children = sortObjectArrayByTwoProperties(children, 'done_date', 'due_date', 'asc', 'desc');
// 	}
// 	else if ( state.selection.view == 'journal' )
// 	{
// 		children = sortObjectArrayByTwoProperties(children, 'done_date', 'parents_bodies', 'desc', 'asc');
// 	}
// 	let t1 = performance.now( );
// 	console.log("			call to filteredItemsTree took " + (t1 - t0) + " milliseconds.");
// 	return children;
// },
filteredItemsTree: (state, getters) => {
	console.log('			running filteredItemsTree 2...');
	let t0 = performance.now();
	state.computing = true;
	let items;

	if (state.selection.view == 'journal')
	{
		return getters.filteredItemsFlat;
	}
	if (getters['selection/noFilterOrTag'])
	{
		items = state.root.children;
	}
	let tagFilters = state.selection.tags;
	if (tagFilters.length && !getters['selection/dueItemsFiltered'])
	{
		items = getters.itemsWithSelectedTagsTree;
	}
	if (getters['selection/dueItemsFiltered'] && !tagFilters.length)
	{
		items = getters.dueItemsTree;
	}
	if (getters['selection/dueItemsFiltered'] && tagFilters.length)
	{
		items = getters.dueItemsFlat;
		items = items.filter(item => getters.hasAllTags(item.id, tagFilters)
									&& !(
										getters.hasAllTags(item.parent_id, tagFilters)
										&& itemGetters[item.id].hasParentDueToday
									)
							);
		// items = uniq(items);
	}
	let t1 = performance.now();
	console.log("			call to filteredItemsTree 2 took " + (t1 - t0) + " milliseconds.");
	state.computing = false;
	return items;
},
filteredIdsTree: (state, getters) => {
	console.log(getters.filteredItemsTree);
	return getters.filteredItemsTree.map(item => item.id)
},
filteredItemsFlat: (state, getters) => {
	console.log('			running filteredItemsFlat 2...');
	let t0 = performance.now();

	let items;
	if (getters['selection/noFilterOrTag'])
	{
		items = getters.nodesArray;
	}
	let tagFilters = state.selection.tags;
	let taggedItems = [];
	if (tagFilters.length)
	{
		taggedItems = getters.itemsWithSelectedTagsFlat;
		items = taggedItems;
	}
	let dueItems = [];
	if (getters['selection/dueItemsFiltered'])
	{
		dueItems = getters.dueItemsFlat;
		items = dueItems;
	}
	if (taggedItems.length && dueItems.length)
	{
		let smallestResult = Math.min(dueItems.length, taggedItems.length);
		if (taggedItems.length == smallestResult)
		{
			items = taggedItems.filter(item => itemGetters[item.id].isDueFlat)
		} else {
			items = dueItems.filter(item => getters.hasAllTags(item.id, tagFilters))
		}
	}
	if (state.selection.view == 'journal'
		&& (taggedItems.length || dueItems.length))
	{
		items = items.filter(item => item.done);
		items = sortObjectArrayByProperty(items, 'done_date', 'desc');
	}
	if (state.selection.view == 'journal'
		&& !taggedItems.length && !dueItems.length)
	{
		items = getters.doneItemsFlat;
		items = sortObjectArrayByProperty(items, 'done_date', 'desc');
	}
	let t1 = performance.now();
	console.log("			call to filteredItemsFlat 2 took " + (t1 - t0) + " milliseconds.");
	return items;
},
filteredIdsFlat: (state, getters) => {
	return getters.filteredItemsFlat.map(item => item.id)
},
itemCount: (state, getters) => {
	console.log('running itemCount...');
	return getters.filteredIdsFlat.length;
},
// ==================
// ALL TAGS COMPUTED
// ==================
allTagsComputed: (state, getters) => {
	console.log('running allTagsComputed...');
	let t0 = performance.now( );
	let items = getters.filteredItemsFlat;
	if (!items.length){ return []; }

	let allTagsObj = {};
	const allTagsObjAdd = function(taggedObj){
		if (!taggedObj.tag || !taggedObj.tag.name){ return; }
		allTagsObj[taggedObj.tag_slug] = taggedObj.tag;
	};
	items.forEach(item => item.tagged.forEach(allTagsObjAdd));
	let allTagsArray = Object.keys(allTagsObj).map(k => allTagsObj[k]);
	allTagsArray = sortObjectArrayByProperty(allTagsArray, 'name');

	let t1 = performance.now( );
	console.log("			call to allTagsComputed 1c took " + (t1 - t0) + " milliseconds.");
	return allTagsArray;
},
lastItems: (state, getters) => {
	console.log('running lastItems...');
	if (getters.noItems ){ return []; }
	let lastChild = getters.filteredIdsTree[getters.filteredIdsTree.length-1];
	let deepestChild = itemGetters[lastChild].findDeepestVisibleChild;
	return [lastChild, deepestChild];
},
firstItem: (state, getters) => {
	console.log('running firstItem...');
	if (getters.noItems){ return null; }
	return getters.filteredIdsTree[0];
},
clipboardTextDue: (state, getters) => {
	console.log('running clipboardTextDue...');
	return `◆ Today
`+clipboardFormat(getters.filteredItemsTree, {first:true});
},




}