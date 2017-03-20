import {removeEmptyValuesFromArray} from '../components/globalFunctions.js';
export default class {
constructor(items)
{
	// properties
	if (!items){ return; }
	this.source		= items;
	this.nodes 		= {}; // →　"id":{ task obj };
	this.orphans	= [];
	// this.doneitems	= [];
	this.filteredItemRoot = {
		children_order:[], children:[], body:"",
		// totalPlannedTime:0, totalUsedTime:0,
		planned_time:0, used_time:0,
	};
	this.backups = {};
	this.backups.rootChildren = []; // replace with root later on
	// process items
	this.itemsProcessed = 0;
	this.firstInitialization();
}
firstInitialization()
{
	console.log('run first initialization at source-length: '+this.source.length);
	this.source.forEach(function(item){
		this.initialize(item);
		//Sort all nodes after making sure you got all of them.
		// console.log('this.itemsProcessed = '+this.itemsProcessed);
	    if(this.itemsProcessed === this.source.length) {
	    	this.organizeAfterInitialization();
	    }
	}.bind(this));
}
initialize(item, index) 
{
	console.log('run node initialization');
	// variables
	let node 	= JSON.parse(JSON.stringify(item));
	let parent 	= this.nodes[node.parent_id];

	// assign extra item values
	node = this.setDefaultItemValues(node);
	// node.parent_id_backup = node.parent_id;
	// Register and organize nodes:
	if(node.depth == 0) { this.root = node; console.log('root-node');}
	else if (parent) { parent.children.push(node); }
	else { this.orphans.push(node); }
	this.nodes[node.id] = node;
	this.itemsProcessed++;
}
organizeAfterInitialization()
{
	console.log('run organizeAfterInitialization');
	Object.keys(this.nodes).forEach(function (id) {
	    this.sortChildren(id);
	    this.updateChildrenDueDate(id);
	    let item = this.nodes[id];
		// this.attachParentBody(id);　//Maybe I should only do this when pressing DONE
	}.bind(this));
	if(this.root)
	{
		this.backups.rootChildren = this.root.children;
	}
}
duplicate(id)
{
	let item = this.nodes[id];
	let index = this.siblingIndex(id)+1;
	let dupe = JSON.parse(JSON.stringify(item));
	// this.nodes[item.parent_id].children.splice(index, 0, dupe);

	let addNextItemAs = null;
	let addTags = dupe.tagged.map(tagObj => tagObj.tag_name);
	let duplication = true;
	vm.postNewItem(dupe, index, addNextItemAs, addTags, duplication);
}
setDefaultItemValues(item)
{
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
}
addAndCleanNodesRecursively(item)
{
	this.setDefaultItemValues(item);
	this.nodes[item.id] = item;
	if(item.children)
	{
		item.children.forEach(function(child) {
			return allItems.addAndCleanNodesRecursively(child);
		});
	}
}
addItem(item, index, addNextItemAs, addTags, duplication)
{
	// debugger;
	this.addAndCleanNodesRecursively(item);
	const parent = this.nodes[item.parent_id];
	if(!parent.children_order)	{ parent.children_order = [] 	 }
	//Remove the Temp item
	parent.children = parent.children.filter(i => !i.temp);
	parent.children_order = parent.children_order.filter(i => i != 'x');
	//Actually ADD the item!
	parent.children.splice(index, 0, item);
	parent.children_order.splice(index, 0, item.id);

	// Patches etc.
    selection.selectedId = item.id;
	// if ( this.isTopLvlItemInFilteredRoot(item.id)
	// 	&& item.parent_id == this.root.id )
	// {
	// 	this.backups.rootChildren.push(item);
	// 	vm.patchRootChildrenOrderWithFilter(item.id);
	// } else {
	    vm.patch(item.parent_id, 'children_order');
	// }
    if(addTags){ this.tagItem(item.id, addTags); }
	this.attachParentBody(item.id);
	this.autoCalculateDoneState(item.parent_id);
    if (duplication || addNextItemAs == 'stop')
    {
    	vm.addingNewUnder = null;
    	Vue.nextTick(()=> vm.scrollToItemIfNeeded(item.id));
    } else {
	    vm.showAddNewItem(item.id, addNextItemAs);
    }
}
addTempNewItem(item, index, addNextItemAs, addTags)
{
	item = JSON.parse(JSON.stringify(item));
	console.log('temp item.body');
	console.log(item.body);
	item.id = 'x';
	item.temp = true;
	this.addAndCleanNodesRecursively(item);
	console.log(item.body);
	const parent = this.nodes[item.parent_id];
	if(!parent.children_order)	{ parent.children_order = [] 	 }
	//Actually ADD the item!
	parent.children.splice(index, 0, item);
	parent.children_order.splice(index, 0, item.id);
    if (addNextItemAs == 'stop')
    {
    	vm.addingNewUnder = null;
    	Vue.nextTick(()=> vm.scrollToItemIfNeeded(item.id));
	}
}
tagNameToSlug(tag)
{
	if(!tag || typeof tag != 'string'){ return; }
	return tag.split(' ').join('-').toLowerCase();
}
tagSlugToName(tag)
{
	tag = tag.replace(/-/g, ' ');
	tag = tag.split(' ').map ( ([h, ...t]) => h.toUpperCase() + t.join('').toLowerCase() ).join(' ');
	return tag;
}
hasTag(id, tags)
{
	let item = this.nodes[id];
	if(!item){ console.log("[hasTag(id, tags)] what is this shit... id:"+id); return false;}
	if (!item.tagged || !item.tagged.length){ return false; }
	let hasTags;
	if (tags instanceof Array)
	{
		tags.forEach(function (tag) {
			tag = this.tagNameToSlug(tag);
			let tagExists = item.tagged.find(itemTags => itemTags.tag_slug == tag);
			if(tagExists){ hasTags = true; }
		}.bind(this));
	} else {
		let tag = this.tagNameToSlug(tags);
		let tagExists = item.tagged.find(itemTags => itemTags.tag_slug == tag);
		if(tagExists){ hasTags = true; }
	}
	return hasTags;
}
hasParentWithTag(id, tags)
{
	if(!id){ return false; }
	let item = this.nodes[id];
	let parent_id = this.nodes[id].parent_id;
	if(!parent_id){ return false; }
	if(!this.nodes[parent_id]){
		// console.log('Parent of ('+id+')['+item.body+'] is non existant.');
		return false;
	}
	let parentHasTag = this.hasTag(parent_id, tags);
	if (parentHasTag)
	{
		return true;
	} else {
		return this.hasParentWithTag(parent_id, tags);
	}
}
parentIdWithTag(id, tags)
{
	// debugger;
	let item = this.nodes[id];
	console.log('id & body = '+item.id+" - "+item.body);
	let parent_id = this.nodes[id].parent_id;
	if(!parent_id){ return false; }
	
	let parentHasTag = this.hasTag(parent_id, tags);
	console.log('parentHasTag');
	console.log(parentHasTag);
	if (parentHasTag)
	{
		return parent_id;
	} else {
		return this.parentIdWithTag(parent_id, tags);
	}
}
returnTagsAsArray(id)
{
	return this.nodes[id].tagged.map(obj => obj.tag_name);
}
hideTaggedNodes(tag)
{
	Object.keys(this.nodes).forEach(function(id) {
		id = parseFloat(id);
		if(this.hasTag(id, tag))
		{
			if(!selection.hiddenItems.includes(id))
			{
				selection.hiddenItems.push(id);
			}
		}
	}.bind(this));
}
hideDoneNodes()
{
	Object.keys(this.nodes).forEach(function(id) {
		id = parseFloat(id);
		if(this.nodes[id].done){
			if(!selection.hiddenItems.includes(id)){
				selection.hiddenItems.push(id);
			}
		}
	}.bind(this));
}
siblingIndex(id)
{
	let item = this.nodes[id];
	if(!item){ return; }
	let parent_id = item.parent_id;
	if(!parent_id){ return; }
	let siblingsArray = this.nodes[parent_id].children_order;
	return siblingsArray.indexOf(id);
}
olderSiblingId(id)
{
	let item = this.nodes[id];
	if(!item){ return; }
	let parent_id = item.parent_id;
	if(!parent_id){ return; }
	let siblingsArray = this.nodes[parent_id].children_order;
	if(siblingsArray.length <= 1 || this.siblingIndex(id) == 0)
	{
		return parent_id;
	}
	let siblingIndex = siblingsArray.indexOf(id);
	return this.nodes[parent_id].children_order[siblingIndex-1];
}
nextItemId(id, debug)
{
	if(debug){ debugger; }
	if(!id){ return; }
	let item = this.nodes[id];
	if(!item){ return; }
	let nextItemId;
	// Select next item on top level.
	if ( this.isTopLvlItemInFilteredRoot(id) && !item.show_children
	  || selection.view == 'journal' )
	{
		let ind = vm.$refs.root.childrenOrder.indexOf(id);
		return vm.$refs.root.childrenOrder[ind+1];
	}
	// Select first child if any.
	if (item.show_children && item.children.length)
	{
		nextItemId = item.children_order[0];
		if(vm.hiddenItemIds.includes(nextItemId))
	 	{
	 		nextItemId = this.nextItemRecursion(nextItemId);
	 	}
 	} else {
		nextItemId = this.nextItemRecursion(id);
 	}
 	return nextItemId;
}
// nextVisibleItemId(id)
// {
// 	let item = this.nodes[id];
// 	let nextItemId;
// 	// Select first child if any.
// 	if (item.show_children && item.children.length > 0)
// 	{
// 		nextItemId = item.children_order[0];
//  	} else {
// 		nextItemId = this.nextItemRecursion(id);
//  	}
//  	if(vm.hiddenItemIds.includes(nextItemId))
//  	{
// 	 	return this.nextVisibleItemId(nextItemId);
//  	} else {
// 	 	return nextItemId;
//  	}
// }
nextSiblingOrParentsSiblingId(id)
{
	let item = this.nodes[id];
	if(!item){ return; }
	let parent_id = item.parent_id;
	if(!parent_id){ return; }
	let children_order = this.nodes[parent_id].children_order;
	let nextIndex = this.siblingIndex(id)+1;
	if (nextIndex == children_order.length)
	{
		return this.nextSiblingOrParentsSiblingId(parent_id);
	} else {
		return children_order[nextIndex];
	}
}
deepestChild(id)
{
	return vm.$refs.root.childrensDeepestChildren.find(obj => (obj.id == id)).deepestChild;
}
topLvlParentOfDeepestChild(id)
{
	return vm.$refs.root.childrensDeepestChildren.find(obj => (obj.deepestChild == id)).id;
}
prevItemId(id, debug)
{
	if(debug){ debugger; }
	if(!id){ return false; }
	let item = this.nodes[id];
	if(item.depth == 0){ return false; }
	let parent_id = item.parent_id;
	let prevItemId;
	let index;
	// Select next item on top level.
	if (this.isTopLvlItemInFilteredRoot(id) || selection.view == 'journal')
	{
		let childrenIds = vm.$refs.root.childrenOrder;
		index = childrenIds.indexOf(id);
		if (index == 0) {
			return this.deepestChild(childrenIds[childrenIds.length-1]);
		}
		prevItemId = childrenIds[index-1];
		prevItemId = this.deepestChild(prevItemId);
	} else {
		index = this.siblingIndex(id);
		if (index == 0) {
			prevItemId = parent_id;
		} else {
			prevItemId = this.nodes[parent_id].children_order[index-1];
			prevItemId = this.getDeepestLastChildId(prevItemId);
		}
	}
 	if (vm.hiddenItemIds.includes(prevItemId))
 	{
	 	return this.prevItemId(prevItemId);
 	} else {
	 	return prevItemId;
 	}
}
nextItemRecursion(id)
{
	// debugger;
	let nextIndex = this.siblingIndex(id)+1;
	let item = this.nodes[id];
	let parent_id = item.parent_id;
	// let tagsSelected = selection.tags.length;

	if (vm.itIsADeepestChild(id))
	{
		let topLvlItemId = this.topLvlParentOfDeepestChild(id);
		let topLvlChildrenIds = vm.$refs.root.childrenOrder;
		let ind = topLvlChildrenIds.indexOf(topLvlItemId);
		if (ind+1 == topLvlChildrenIds.length){ return topLvlChildrenIds[0]; }
		return topLvlChildrenIds[ind+1];
	}
	let parentsChildrenOrder = this.nodes[parent_id].children_order;
	let itemIsLastSibling = (nextIndex == parentsChildrenOrder.length);
	if(itemIsLastSibling)
	{
		if(parent_id == this.root.id){ return; }
		return this.nextItemRecursion(parent_id);
	}
	let nextItemId = this.nodes[parent_id].children_order[nextIndex];
	if (vm.hiddenItemIds.includes(nextItemId))
	{
		return this.nextItemRecursion(nextItemId);
	}
	return nextItemId;
}
// nextVisibleItemRecursion(id)
// {
// 	// debugger;
// 	let nextIndex = this.siblingIndex(id)+1;
// 	let item = this.nodes[id];
// 	let parent_id = item.parent_id;
// 	let parentsChildrenOrder = this.nodes[parent_id].children_order;
// 	let itemIsLastSibling = (nextIndex == parentsChildrenOrder.length);	
// 	if(itemIsLastSibling)
// 	{
// 		if(parent_id == this.root.id){ return; }
// 		return this.nextItemRecursion(parent_id);
// 	}
// 	let nextItemId = this.nodes[parent_id].children_order[nextIndex];
// 	return nextItemId;
// }
isTopLvlItemInFilteredRoot(id)
{
	let s = selection;
	if (selection.nothingSelected() && selection.view == 'tree')
	{
		// console.log('the root is not filtered');
		return false;
	}
	if (id == this.root.id)
	{
		return true;
	} else if (vm.$refs.root.childrenOrder.includes(id)) {
		return true;
	} else {
		return false;
	}
}
// nextFilteredItemId(id)
// {
// 	let index = this.root.children_order.indexOf(id);
// 	return this.root.children_order[index+1];
// }
// prevFilteredItemId(id)
// {
// 	let index = this.root.children_order.indexOf(id);
// 	return this.root.children_order[index-1];
// }
sortChildren(id)
{
	console.log('sortingChildren');
	let item = this.nodes[id];
	item.children_order = item.children_order.filter(function(id){
		let child = this.nodes[id];
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
}
// resetChildrenOrder(id)
// {
// 	let item = this.nodes[id];
// 	let resetChildrenOrder = item.children.map(function(child){
// 	   return child.id;
// 	});
// 	this.nodes[id].children_order = resetChildrenOrder;
// }
giveNewParent(id, new_parent_id, specificNewIndex)
{	
	if(this.isTopLvlItemInFilteredRoot(id))
	{ 
		console.log("can't give new parent to topLvlItem in filtered list");
		return;
	}
	console.log('giving new parent');
	let parent_id = this.nodes[id].parent_id;
	let targetItem = this.nodes[id];
	let newParent = this.nodes[new_parent_id];
		console.log('newParent ↓ ');
		console.log(newParent);
	let prevParent = this.nodes[parent_id];
		console.log('prevParent ↓ ');
		console.log(prevParent);
	let siblingIndex = this.siblingIndex(id);
	targetItem.parent_id = new_parent_id;
	targetItem.depth = newParent.depth+1;
	if (!newParent.children_order)
	{
		newParent.children_order = [];
	}
	if (specificNewIndex || specificNewIndex == 0)
	{
		newParent.children.splice(specificNewIndex,0,targetItem);
		newParent.children_order.splice(specificNewIndex,0,id);
	}
	else if (prevParent.depth-1 == newParent.depth && new_parent_id == prevParent.parent_id)
	{
		// when unindenting
		let newIndex = this.siblingIndex(prevParent.id)+1;
		newParent.children.splice(newIndex,0,targetItem);
		newParent.children_order.splice(newIndex,0,id);
	} else {
		// when indenting
		newParent.children.push(targetItem);
		newParent.children_order.push(id)
	}
	// Open newParent show_children if closed
	newParent.show_children = 1;

	// Delete items attached to previous parent
	prevParent.children.splice(siblingIndex,1);
	prevParent.children_order.splice(siblingIndex,1);
	// Fix bug where item would still show if it prevParent has an array of 0 and the moved child was originally the last child...
	if(prevParent.children.length == 0){ prevParent.children = []; }

	// Patches etc.
	this.attachParentBody(id);
	let tags = this.itemTagArray(new_parent_id);
	this.tagItem(id, tags);
	vm.patch(id, 'depth');
	vm.patch(id, 'parent_id');
	vm.patch(new_parent_id, 'children_order');
	vm.patch(new_parent_id, 'show_children');
	vm.patch(parent_id, 'children_order');
	this.updateChildrenDepth(targetItem.id);
	this.updateChildrenDueDate(new_parent_id);
	this.updateChildrenDueDate(parent_id);
	this.autoCalculateDoneState(new_parent_id);
	this.autoCalculateDoneState(parent_id);
}
updateChildrenDepth(id)
{
	let targetChildren = this.nodes[id].children;
	if (!(targetChildren || targetChildren.length)){ return false; }
	targetChildren.forEach(function(child){
		console.log(child);
		child.depth = this.nodes[child.parent_id].depth+1;
		vm.patch(child.id, 'depth');
		this.updateChildrenDepth(child.id);
		return true;
	}.bind(this))
}
copyParentBodyToAllChildren(parent_id)
{
	if (!parent_id){ return; }
	let item = this.nodes[parent_id];
	if (!item.children_order.length){ return; }
	let b = item.body;
	item.children_order.forEach(childId => {
		let child = this.nodes[childId];
		child.parents_bodies = b;
		if (!vm){ return; }
		vm.patch(child.id, 'parents_bodies');
	});
}
hasParentDueToday(id)
{
	id = (id) ? id : selection.selectedId;
	let item = this.nodes[id];
	if (!item.parent_id){ return false; }
	let parent = this.nodes[item.parent_id];
	if (!parent){ return false; }
	let diff = moment(parent.due_date).diff(moment(), 'days');
	if (diff <= 0)
	{
		return true;
	} else {
		return this.hasParentDueToday(item.parent_id);
	}
}
isDueToday(id)
{
	id = (id) ? id : selection.selectedId;
	let item = this.nodes[id];
	let diff = moment(item.due_date).diff(moment(), 'days');
	if (diff <= 0) { return true; }
	return false;
}
attachParentBody(id)
{
	if (!id){ return; }
	let item = this.nodes[id];
	if (!item.parent_id){ return; }
	let parent = this.nodes[item.parent_id];
	if (!parent){ return; }
	item.parents_bodies = parent.body;
	vm.patch(id, 'parents_bodies');
}
isProject(id)
{
	if(!id){ return false; }
	if (this.nodes[id].body.slice(-1) == ':')
	{
		return true;
	} else {
		return false;
	}
}
deleteItem(id)
{
	let item = this.nodes[id];
	let newSelectedId = this.nextItemId(id);
	// Delete all children as well!
	if (Array.isArray(item.children) && item.children.length)
	{
		let allChildrenIds = this.getAllChildrenIds(id);
		vm.deleteItemApi(allChildrenIds);
	}
	// Delete items attached to previous parent
	let parent_id = item.parent_id;
	let prevParent = this.nodes[parent_id];
	let siblingIndex = this.siblingIndex(id);
	prevParent.children.splice(siblingIndex,1);
	prevParent.children_order.splice(siblingIndex,1);
	// Patch and recalculate
	vm.patch(parent_id, 'children_order');
    vm.deleteItemApi(id);
	this.autoCalculateDoneState(parent_id);
    selection.selectedId = newSelectedId;
	delete this.nodes[id];
}
tagItem(id, tags)
{
	console.log(tags);
	if(!tags){ return; }
	if(Array.isArray(tags))
	{
		tags = removeEmptyValuesFromArray(tags);
		tags = tags.filter(function(t){
			return !this.hasTag(id,t);
		}.bind(this));
		if(!tags.length){ return; }
	} else {
		if(!tags.replace(/\s/g, "").length){ return; }
		if(this.hasTag(id, tags))
		{
			console.log('NG! Has the tag already!!');
			return;
		}
	}
	vm.patchTag(id, tags);
	let item = this.nodes[id];
	if(item.children.length)
	{
		item.children_order.forEach(function(childId){
			this.tagItem(childId, tags);
		}.bind(this));
	}
}
itemTagArray(id)
{
	let item = this.nodes[id];
	return item.tagged.map(function(tagObj){
		return tagObj.tag_name;
	});
}
prepareTag(id, tags)
{
	let item = this.nodes[id];

}
prepareDonePatch(id)
{
	let item = this.nodes[id];
	let done_date = moment().format();
	item.done_date = done_date;
	vm.patchDone(id);
	if(item.done)
	{
		vm.popup(id, 'afterDone');
	}
	// this.autoCalculateDoneState(item.parent_id);
	if (item.done)
	{ // IF DONE:
		//Add parent's body
		this.attachParentBody(id);
	}
}
autoCalculateDoneState(id)
{
	if (this.nodes[id].depth == 0){ return; }
	if (this.allChildrenDone(id) == true && !this.isProject(id))
	{
		vm.markDone(id, 'done');
	} else {
		vm.markDone(id, 'notDone');
	}
}
allChildrenDone(id)
{
	let children = this.nodes[id].children;
	if (!children.length){ return false; }
	let doneAmount = children.reduce(function (prev, child){
		let a = (child.done) ? 1 : 0 ;
		return this.AplusB(a,prev);
	}.bind(this), 0);
	if(children.length == doneAmount)
	{
		return true;
	} else {
		return false;
	}
}
getAllChildrenIds(id)
{
	let allChildrenIds = [];
	this.getAllChildrenIdsRecursive(id, allChildrenIds);		
	return allChildrenIds;
}
getAllChildrenIdsRecursive(id, allChildrenIds)
{
	let item = this.nodes[id];
	if (!(Array.isArray(item.children) && item.children.length))
	{
		return;
	} else {
		item.children_order.forEach(item => { allChildrenIds.push(item); });
		item.children_order.forEach(item => { return allItems.getAllChildrenIdsRecursive(item, allChildrenIds) });
	}
}

updateItemTagsDom(id, tags, requestType)
{
	/* requestType can be:
		'tag': tag item  (default if null)
		'untag': untag item with certain tag
		'retag': delete all tags and retag new ones
	*/
	if(!tags){ return; }
	if(Array.isArray(tags)){
		tags.forEach(t => this.updateItemTagsDom(id, t, requestType));
		return;
	}
	let tagName = tags.trim();
	let tagSlug = this.tagNameToSlug(tagName);
	let tempTag = { 'temp':'temp',
		'tag_name':tagName,
		'tag_slug':tagSlug,
		'tag':{
			'name':tagName,
			'slug':tagSlug
		}};
	if(requestType == 'tag' || !requestType)
	{
		console.log(this.nodes[id].tagged);
		this.nodes[id].tagged.push(tempTag);
		console.log(this.nodes[id].tagged);
	}
	if(requestType == 'untag')
	{
		this.nodes[id].tagged = this.nodes[id].tagged.filter(t => t.tag_slug != tagSlug);
	}
}
// calculateTotalTime(id)
// {
// 	let item = this.nodes[id];
//     //call this on PARENT -> climb up the parent tree
//     if (item.parent_id){
// 	    this.calculateTotalTime(item.parent_id);
//     }
// }
calTotalPlannedTime(id)
{
	let item = this.nodes[id];
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
}
calTotalUsedTime(id)
{
	let item = this.nodes[id];
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
}
checkValParentTree(id, val)
{
	let pId = this.nodes[id].parent_id;
	console.log('checkValParentTree pId: '+checkValParentTree);
	if (!pId){ return false; }
	let checkVal = this.nodes[pId].item[val];
	console.log('checkValParentTree checkVal: '+checkVal);
	if (checkVal)
	{
		return checkVal;
	} else {
		return this.checkValParentTree(pId, val);
	}
}
AplusB(a, b)
{
    return parseFloat(a) + parseFloat(b);
}
moveItem(id, direction)
{
	if(this.isTopLvlItemInFilteredRoot(id))
	{ 
		console.log("can't move a TopLvlItemInFilteredRoot");
		return; 
	}
	clearTimeout(window.patchDelay);
	let pId = this.nodes[id].parent_id;
	let parent = this.nodes[pId];
	let index = this.siblingIndex(id);
	if(direction == 'up')
	{
		if(index == 0)
		{
			if(parent.depth == 0){ console.log('ceiling!'); return; }
			// Jump to last child of previous Sibling
			let parentOlderSiblingId = this.olderSiblingId(pId);
			let newInd = (parentOlderSiblingId == parent.parent_id) ? 0 : null;
			this.giveNewParent(id, parentOlderSiblingId, newInd);
		} else { // When moving through siblings
			parent.children_order.splice(index,1);
			parent.children_order.splice(index-1, 0, id);
			this.sortChildren(pId);
			window.patchDelay = setTimeout(function(){ vm.patch(pId, 'children_order'); },1000);
		}
	}
	else if (direction == 'down')
	{
		if( index+1 == parent.children_order.length )
		{
			if(parent.depth == 0){ console.log('floor!'); return; }
			// Jump to First child of next Sibling
			let new_parent_id = this.nextSiblingOrParentsSiblingId(id);
			console.log('new_parent_id: '+new_parent_id);
			this.giveNewParent(id, new_parent_id, 0);
		} else { // When moving through siblings
			parent.children_order.splice(index,1);
			parent.children_order.splice(index+1, 0, id);
			this.sortChildren(pId);
			window.patchDelay = setTimeout(function(){ vm.patch(pId, 'children_order'); },1000);
		}
	}
	Vue.nextTick(()=> vm.scrollToItemIfNeeded(id));
}
flushDoneItems() // Do not use yet. Not sure how to best implement this...
{
	let nodes = this.nodes;
	let keys = Object.keys(nodes);
	let doneItemsObject = keys.reduce((prev,id) => {
		if(nodes[id].done)
		{
			this.deleteItem(id);
		}
	});
}
setDueDate(id, duedate)
{
	let dd = (!duedate) ? moment().format() : duedate;
	let oriDueDate = this.nodes[id].due_date;
	let diff = moment(oriDueDate).diff(dd, 'days');
	if (diff == 0){ dd = '0000-00-00 00:00:00'; }
	this.nodes[id].due_date = dd;
	vm.patchDueDate(id, dd);
	this.updateChildrenDueDate(id);
}
getParentsAsArray(id)
{
	let pArr = [];
	this.getParentsRecursive(id, pArr);
	pArr.reverse().shift();
	return pArr;
}
getParentsRecursive(id, pArr)
{
	let pId = this.nodes[id].parent_id;
	if (!pId){ return; }
	pArr.push(this.nodes[pId].body);
	this.getParentsRecursive(pId, pArr);
}
getLastChildId(id)
{
	let item = this.nodes[id];
	let childrenCount = item.children.length;
	if(childrenCount && item.show_children)
	{
		let lastChild = item.children[childrenCount-1];
		return lastChild.id;
	}
	return id;
}
getDeepestLastChildId(id)
{
	// debugger;
	let lastChildId = this.getLastChildId(id);
	let item = this.nodes[lastChildId];
	if(item.children.length && item.show_children)
	{
		return this.getDeepestLastChildId(lastChildId);
	}
	return lastChildId;
}
updateChildrenDueDate(id)
{
	let item = this.nodes[id];
	if (!item.children.length){ return false; }
	item.children.forEach(function(child){
		if (item.dueDateParent)
		{
			child.dueDateParent = item.dueDateParent;
			this.updateChildrenDueDate(child.id);
		} else if (item.due_date && item.due_date != '0000-00-00 00:00:00') {
			child.dueDateParent = item.due_date;
			this.updateChildrenDueDate(child.id);
		} else {
			child.dueDateParent = false;
			this.updateChildrenDueDate(child.id);
		}
	}.bind(this))
}
// FILTER REWRITE
// filterItems(keyword, value, operator)
// {
// 	// debugger;
// 	// Start by resetting the parent id's to their original state
// 	this.root.children.forEach(function(item){
// 		item.parent_id = item.parent_id_backup;
// 	});
// 	if (operator == 'NOT' && keyword == 'journal')
// 	{
// 		this.hideDoneNodes();
// 		selection.addKeywords(keyword,value,operator);
// 		return;
// 	}
// 	else if (operator == 'NOT' && keyword == 'tag')
// 	{
// 		this.hideTaggedNodes(value);
// 		selection.addKeywords(keyword,value,operator);
// 		return;
// 	}

// 	let arrayToFilter;
// 	if (operator == 'AND'
// 	 // || (selection.view == 'journal' && selection.nothingSelected())
// 	 )
// 	{
// 		console.log('filterItems: a');
// 		arrayToFilter = this.flattenTree(this.root.children);
// 	}
// 	else if (selection.view == 'journal')
// 	{
// 		console.log('filterItems: b');
// 		selection.clear();
// 		arrayToFilter = vm.doneData;
// 	}
// 	else
// 	{
// 		console.log('filterItems: c');
// 		selection.clear();
// 		arrayToFilter = this.flattenTree(this.backups.rootChildren);
// 	}
// 	selection.addKeywords(keyword,value,operator);

// 	let filteredArray = [];
// 	if (keyword == 'all')
// 	{
// 		filteredArray = this.backups.rootChildren;
// 	}
// 	if (keyword == 'journal')
// 	{
// 		vm.resetDoneData();
// 		filteredArray = vm.doneData;
// 	}
// 	if (keyword == 'duedate')
// 	{
// 		let dueDateFilterResults = this.arrayFilterDate(arrayToFilter, value, operator);
// 		Array.prototype.push.apply(filteredArray, dueDateFilterResults);
// 	}
// 	if (keyword == 'tag')
// 	{
// 		let tagFilterResults = this.arrayFilterTag(arrayToFilter, value, operator);
// 		Array.prototype.push.apply(filteredArray, tagFilterResults);
// 	}
// 	filteredArray.forEach(function(item){
// 		item.parent_id = this.root.id;
// 	}.bind(this));
// 	this.root.children = filteredArray;
// 	this.resetChildrenOrder(this.root.id);
// }
// arrayFilterTag(array, tags)
// {
// 	let filteredArray = [];
// 	array.forEach(function (item) {
// 		let id = item.id;
// 		let target = this.hasTag(id, tags);
// 		if ( selection.view == 'tree'
// 			&& target
// 			&& this.hasParentWithTag(id, tags) )
// 		{
// 			target = false;
// 		}
// 		// console.log(id+" - "+item.body+" →　hasTag["+tags+"]　=　"+hasTag);
// 		// console.log(id+" - "+item.body+" →　hasParentWithTag["+tags+"] =　"+hasParentWithTag);
// 		if(target)
// 		{
// 			item.show_children = 1;
// 			filteredArray.push(item);
// 		}
// 	}.bind(this));
// 	return filteredArray;
// }
// arrayFilterDone(array, operator)
// {
// 	let filteredArray = [];
// 	array.forEach(function (item) {
// 		if(item.done)
// 		{
// 			item.show_children = 1;
// 			filteredArray.push(item);
// 		}
// 	}.bind(this));
// 	return filteredArray;
// }
// arrayFilterDate(array, date, operator)
// {
// 	let filteredArray = [];
// 	if(date == 'today')
// 	{
// 		array.forEach(function (item) {
// 			let diff = moment(item.due_date).diff(moment(), 'days');
// 			if (diff <= 0){
// 				filteredArray.push(item);
// 			}
// 		}.bind(this));
// 	}
// 	return filteredArray;
// }
// hideItem(id)
// {
// 	if(!selection.hiddenItems.includes(id))
// 	{
// 		selection.hiddenItems.push(id);
// 	}
// 	this.nodes[id].children.forEach(function(child) {
// 		this.hideItem(child.id)
// 	}.bind(this));
// }
flattenTree(array)
{
	let flattenedTree = [];
	array.forEach(function(item){
		flattenedTree.push(item);
		if(item.children.length)
		{
			Array.prototype.push.apply(flattenedTree, this.flattenTree(item.children));
		}
	}.bind(this));
	return flattenedTree;
}
// rebindArrayParentIds(array, newParentId)
// {
// 	if(newParentId == 'backup')
// 	{
// 		array.forEach(function(item){
// 			item.parent_id = item.parent_id_backup;
// 		});
// 	} else {
// 		array.forEach(function(item){
// 			item.parent_id = newParentId;
// 		});
// 	}
// }
formatDone(doneArray)
{
	let doneItemsObject = doneArray.reduce((prev,item) => {
		if(item.done)
		{
		  	let donePropName = moment(item.done_date).format('YYYY/MM/DD');
		  	// if we don't have a slot for this date, make one
		  	if(!prev.hasOwnProperty(donePropName))
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
		// 	return allItems.AplusB(prev, next.used_time);
  //   	}, 0);
		return rObj;
	});
}

}

