export default class Tree {
	constructor(items){
		// properties
		this.source		= items;
		this.nodes 		= {}; // →　"id":{ task obj };
		this.orphans	= [];
		this.filteredItemRoot = {
			children_order:[], children:[], body:"",
			totalPlannedTime:0, totalUsedTime:0,
			planned_time:0, used_time:0,
		};
		this.rootChildrenBackup = []; // replace with root later on
		// process items
		this.itemsProcessed = 0;
		items.forEach(this.initialize.bind(this))
	}
	initialize(item, index) 
	{
		// variables
		let node 	= this.makeNode(item);
		let parent 	= this.getNode(node.parent_id);
		// assign extra item values
		if(node.children_order){
			node.children_order = node.children_order.split(',').map(Number);
		} else {
			node.children_order = [];
		}
		node.children = [];
			// assign total Time to nodes with no children:
		if (!node.children.length){
	    	node['totalPlannedTime'] = (!item.done && node.planned_time) ? parseFloat(item.planned_time) : 0 ;
			node['totalUsedTime'] = (!item.done && node.used_time) ? parseFloat(item.used_time) : 0 ;
		}

		// Register and organize nodes:
		if(index === 0) { this.root = node; }
		else if (parent) { parent.children.push(node); }
		else { this.orphans.push(node); }
		this.nodes[node.id] = node;

		//Sort all nodes after making sure you got all of them.
		this.itemsProcessed++;
	    if(this.itemsProcessed === this.source.length) {
	    	$.each(this.nodes, function(index, node) {
			    let id = node.id;
			    this.sortChildren(id);
			    this.updateChildrenDueDate(id);
				// this.attachParentBody(id);　//Maybe I should only do this when pressing DONE
			    if (!node.children.length && (node.used_time || node.planned_time)){
				    this.calculateTotalTime(id);
			    }
			    this.rootChildrenBackup = this.root.children;
			}.bind(this));
	    }
	}
	makeNode(item)
	{
		return JSON.parse(JSON.stringify(item));
	}
	getNode(id)
	{
		return this.nodes[id];
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
		if(!item.show_children)		{ item.show_children = 1 		 }
		if(!item.children)	{ item.children = []					 }
		if(!item.due_date)	{ item.due_date = "0000-00-00 00:00:00"	 }
		if(!item.done_date)	{ item.done_date = "0000-00-00 00:00:00" }
		if(!item.done)		{ item.done = false 					 }
		if(!item.used_time)	{ item.used_time = 0 					 }
		if(!item.tagged)	{ item.tagged = []	 					 }
		if(!item.children_order){ item.children_order = [];			 }
		else if (typeof item.children_order === 'string'){
			item.children_order = item.children_order.split(',').map(Number);
		}
		return item;
	}
	addAndCleanNodesRecursively(item)
	{
		this.setDefaultItemValues(item);
		this.nodes[item.id] = item;
		if(item.children){
			item.children.forEach(function(child) {
				return allItems.addAndCleanNodesRecursively(child);
			});
		}
	}
	addItem(item, index, addNextItemAs, addTags, duplication)
	{
		this.addAndCleanNodesRecursively(item);
		const parent = this.nodes[item.parent_id];
		if(!parent.children_order)	{ parent.children_order = [] 	 }
		//Actually ADD the item!
		parent.children.splice(index, 0, item);
		parent.children_order.splice(index, 0, item.id);

		// Patches etc.
	    selection.selectedId = item.id;
	    vm.patch(item.parent_id, 'children_order');
	    if(addTags){ vm.patchTag(item.id, addTags); }
		this.attachParentBody(item.id);
		this.autoCalculateDoneState(item.parent_id);
	    if (item.used_time || item.planned_time){
		    this.calculateTotalTime(item.id);
	    }
	    if(!duplication){
		    vm.showAddNewItem(item.id, addNextItemAs);
	    }
	}
	arrayToString(arr)
	{
		let c_o = '';
		arr.forEach(function(entry) {
		    c_o = c_o+','+entry;
		});
		return c_o.substring(1);
	}
	hasTag(id, tags)
	{
		let item = this.nodes[id];
		if (!item.tagged.length){ return false; }
		let hasTags;
		if (tags instanceof Array){
			tags.forEach(function (tag) {
				let tagExists = item.tagged.find(itemTags => itemTags.tag_slug == tag);
				if(tagExists){ hasTags = true; }
			});
		} else {
			let tagExists = item.tagged.find(itemTags => itemTags.tag_slug == tags);
			if(tagExists){ hasTags = true; }
		}
		return hasTags;
	}
	hasParentWithTag(id, tags)
	{
		let item = this.nodes[id];
		let parent_id = this.nodes[id].parent_id;
		if(!parent_id){ return false; }
		
		let parentHasTag = this.hasTag(parent_id, tags);
		if (parentHasTag){
			return true;
		} else {
			return this.hasParentWithTag(parent_id, tags);
		}
	}
	parentIdWithTag(id, tags)
	{
		debugger;
		let item = this.nodes[id];
		console.log('id & body = '+item.id+" - "+item.body);
		let parent_id = this.nodes[id].parent_id;
		if(!parent_id){ return false; }
		
		let parentHasTag = this.hasTag(parent_id, tags);
		console.log('parentHasTag');
		console.log(parentHasTag);
		if (parentHasTag){
			return parent_id;
		} else {
			return this.parentIdWithTag(parent_id, tags);
		}
	}
	siblingIndex(id)
	{
		let parent_id = this.nodes[id].parent_id;
		if(!parent_id){ return; }
		let siblingsArray = this.nodes[parent_id].children_order;
		return siblingsArray.indexOf(id);
	}
	olderSiblingId(id)
	{
		let parent_id = this.nodes[id].parent_id;
		if(!parent_id){ return; }
		let siblingsArray = this.nodes[parent_id].children_order;
		if(siblingsArray.length <= 1 || this.siblingIndex(id) == 0){
			return parent_id;
		}
		let siblingIndex = siblingsArray.indexOf(id);
		return this.nodes[parent_id].children_order[siblingIndex-1];
	}
	nextItemId(id)
	{
		let item = this.nodes[id];
		// Select first child if any.
		if (item.show_children && item.children.length > 0){
			return item.children_order[0];
	 	}
		return this.nextItemRecursion(id);
	}
	nextSiblingOrParentsSiblingId(id)
	{
		let parent_id = this.nodes[id].parent_id;
		let children_order = this.nodes[parent_id].children_order;
		let nextIndex = this.siblingIndex(id)+1;
		if (nextIndex == children_order.length){
			return this.nextSiblingOrParentsSiblingId(parent_id);
		} else {
			return children_order[nextIndex];
		}
	}
	prevItemId(id)
	{
		let item = this.nodes[id];
		let parent_id = item.parent_id;
		let index = this.siblingIndex(id);
		let tagsSelected = selection.tags.length;
		let prevItemId;
		if (index == 0){
			prevItemId = parent_id;
		} else {
			prevItemId = this.nodes[parent_id].children_order[index-1];
			prevItemId = this.getDeepestLastChildId(prevItemId);
		}
		let prevItem = this.nodes[prevItemId];
		console.log('prevItem: ['+prevItemId+'] '+prevItem.body);
		let prevItemChildrenCount = prevItem.children.length;

		// if(tagsSelected){ 
		// 	if(this.isTopLvlItemInFilteredRoot(id)){
		// 		let prevFilteredItemId = this.prevFilteredItemId(id);
		// 		return this.getDeepestLastChildId(prevFilteredItemId);				
		// 	}
		// 	let prevItemHasParentWithSelectedTag = this.hasParentWithTag(prevItemId, selection.tags);
		// 	console.log('prevItem has Parent With Selected Tag = '+prevItemHasParentWithSelectedTag);
		// 	if(prevItemHasParentWithSelectedTag){
		// 		return prevItemId;
		// 	}
		// }
		return prevItemId;
	}
	nextItemRecursion(id)
	{
		// debugger;
		let nextIndex = this.siblingIndex(id)+1;
		let item = this.nodes[id];
		let parent_id = item.parent_id;
		let itemIsLastSibling = (nextIndex == this.nodes[parent_id].children_order.length);
		let tagsSelected = selection.tags.length;
		
		// if(!tagsSelected){ 
			console.log('itemIsLastSibling '+itemIsLastSibling);
			if(itemIsLastSibling){
				return this.nextItemRecursion(parent_id);
			}
			let nextItemId = this.nodes[parent_id].children_order[nextIndex];
			return nextItemId;
		
		// }
		// else if (tagsSelected) {
		// 	let itemHasSelectedTag = this.hasTag(id, selection.tags);
		// 	if(itemHasSelectedTag){
		// 		return this.nextFilteredItemId(id);
		// 	}

		// 	let parentHasSelectedTag = this.hasTag(parent_id, selection.tags);
		// 	if(itemIsLastSibling && parentHasSelectedTag){
		// 		console.log('this is the top lvl item with the filtered tag: ['+parent_id+'] '+this.nodes[parent_id].body);
		// 		return this.nextFilteredItemId(parent_id);
		// 	}
		// 	if(itemIsLastSibling && !parentHasSelectedTag){
		// 		return this.nextItemRecursion(parent_id);
		// 	}
		// 	return this.nodes[parent_id].children_order[nextIndex];					
		// }
	}
	isTopLvlItemInFilteredRoot(id)
	{
		if(selection.filter == 'all'){ return false; }
		if (this.root.children_order.includes(id)){
			return true;
		} else {
			return false;
		}
	}
	nextFilteredItemId(id)
	{
		let index = this.root.children_order.indexOf(id);
		return this.root.children_order[index+1];
	}
	prevFilteredItemId(id)
	{
		let index = this.root.children_order.indexOf(id);
		return this.root.children_order[index-1];
	}
	sortChildren(id)
	{
		let item = this.nodes[id];
		item.children_order = item.children_order.filter(id => ~item.children.indexOf(this.nodes[id]));
		let order = item.children_order;
		let items = item.children;
		if (order instanceof Array){
			item.children = order.map(id => items.find(t => t.id === id));
		}
	}
	resetChildrenOrder(id)
	{
		let item = this.nodes[id];
		let resetChildrenOrder = item.children.map(function(child){
		   return child.id;
		});
		this.nodes[id].children_order = resetChildrenOrder;
	}
	giveNewParent(id, new_parent_id, specificNewIndex)
	{
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
		if (!newParent.children_order){
			newParent.children_order = [];
		}
		if (specificNewIndex || specificNewIndex == 0) {
			newParent.children.splice(specificNewIndex,0,targetItem);
			newParent.children_order.splice(specificNewIndex,0,id);
		} else if (prevParent.depth-1 == newParent.depth && new_parent_id == prevParent.parent_id) {
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
		this.calculateTotalTime(new_parent_id);
		this.calculateTotalTime(parent_id);
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
	attachParentBody(id)
	{
		if (!id){ return; }
		let item = this.nodes[id];
		if (!item.parent_id){ return; }
		let parentBody = this.nodes[item.parent_id].body;
		item.parents_bodies = parentBody;
		vm.patch(id, 'parents_bodies');
	}
	isProject(id)
	{
		if(!id){ return false; }
		if (this.nodes[id].body.slice(-1) == ':'){
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
		if (Array.isArray(item.children) && item.children.length) {
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
	    this.calculateTotalTime(parent_id);
	    selection.selectedId = newSelectedId;
	}
	tagItem(id, tags)
	{
		let item = this.nodes[id];
		vm.patchTag(id, tags);
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
		if(item.done){
			vm.popup(id, 'afterDone');
		}
		this.autoCalculateDoneState(item.parent_id);
		if (item.done){ // IF DONE:
			//Add parent's body
			this.attachParentBody(id);
			//Add Flatpickr
			setTimeout(function(){
				let fpId = "done-date-edit-"+id;
				let fpEl = document.getElementById(fpId);
				fpEl.flatpickrify();
			},100);
		}
	}
	autoCalculateDoneState(id)
	{
		if (this.nodes[id].depth == 0){ return; }
		if (this.allChildrenDone(id) == true && !this.isProject(id)){
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
		if(children.length == doneAmount){
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
		if (!(Array.isArray(item.children) && item.children.length)) {
			return;
		} else {
			item.children_order.forEach(item => { allChildrenIds.push(item); });
			item.children_order.forEach(item => { return allItems.getAllChildrenIdsRecursive(item, allChildrenIds) });
		}
	}
	calculateTotalTime(id)
	{
		let item = this.nodes[id];
		// console.log('item in calculateTotalTime ↓ ['+item.id+']'+item.body);
		// console.log(id);
		// console.log(item);
		let totalPlannedTime;
		let totalUsedTime;
	    if (!(Array.isArray(item.children) && item.children.length)) {
	    	// if we don't have children, do nothing, leave the time as-is
			totalPlannedTime = (!item.done) ? parseFloat(item.planned_time) : 0 ;
			totalUsedTime = (!item.done) ? parseFloat(item.used_time) : 0 ;
	    } else {
			// add up all the times of our direct children
		    totalPlannedTime = item.children.reduce((prev, next) => {
		        // return this.AplusB(prev, next.totalPlannedTime);
		        return prev+parseFloat(next.totalPlannedTime);
		    }, (!item.done) ? parseFloat(item.planned_time) : 0 );
		    totalUsedTime = item.children.reduce((prev, next) => {
		        // return this.AplusB(prev, next.totalUsedTime);
		        return prev+parseFloat(next.totalUsedTime);
		    }, (!item.done) ? parseFloat(item.used_time) : 0 );
	    }
	    // console.log('totalPlannedTime = '+parseFloat(totalPlannedTime));
	    item['totalPlannedTime'] = parseFloat(totalPlannedTime);
		// console.log('totalUsedTime = '+parseFloat(totalUsedTime));
	    item['totalUsedTime'] = parseFloat(totalUsedTime);
	    //call this on PARENT -> climb up the parent tree
	    if (item.parent_id){
		    this.calculateTotalTime(item.parent_id);
	    }
	}
	checkValParentTree(id, val)
	{
		let pId = this.nodes[id].parent_id;
		console.log('checkValParentTree pId: '+checkValParentTree);
		if (!pId){ return false; }
		let checkVal = this.nodes[pId].item[val];
		console.log('checkValParentTree checkVal: '+checkVal);
		if (checkVal){
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
		if(this.isTopLvlItemInFilteredRoot(id)){ return; }
		clearTimeout(window.patchDelay);
		let pId = this.nodes[id].parent_id;
		let parent = this.nodes[pId];
		let index = this.siblingIndex(id);
		if(direction == 'up')
		{
			if(index == 0){
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
			if( index+1 == parent.children_order.length ){
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
	}
	flushDoneItems() // Do not use yet. Not sure how to best implement this...
	{
		let nodes = this.nodes;
		let keys = Object.keys(nodes);
		let doneItemsObject = keys.reduce((prev,id) => {
			if(nodes[id].done){
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
		if(childrenCount && item.show_children){
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
		if(item.children.length && item.show_children){
			return this.getDeepestLastChildId(lastChildId);
		}
		return lastChildId;
	}
	updateChildrenDueDate(id)
	{
		let item = this.nodes[id];
		if (!item.children.length){ return false; }
		item.children.forEach(function(child){
			if (item.dueDateParent){
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
	filterItems(keyword, value, operator)
	{
		// debugger;
		if (keyword == 'all'){
			this.root.children = this.rootChildrenBackup;
			//Why can't I do this?
			// this.root = this.rootBackup;
		}
		else {
			this.filteredItemRoot.children = [];
			this.root.children = this.filteredItemRoot.children;
	    	//Why can't I do this?
			// this.root = this.filteredItemRoot;
		}
		if (keyword == 'duedate'){
			if (value == 'today'){
				Object.keys(this.nodes).forEach(function (key) {
					let item = this.nodes[key];
		    		let diff = moment(item.due_date).diff(moment(), 'days');
					if (diff <= 0){
						this.filteredItemRoot.children.push(item);
					}
			    }.bind(this));
			}
		}
		if (keyword == 'tag'){
	    	let filteredTag = value;
	    	Object.keys(this.nodes).forEach(function (key) {
				let item = this.nodes[key];
				let hasTag = item.tagged.find(actualTags => actualTags.tag_slug == filteredTag);
	    		if (hasTag){
					this.filteredItemRoot.children.push(item);
	    		}
			}.bind(this));
		}
		this.calculateTotalTime(this.root.id);
		this.resetChildrenOrder(this.root.id);
		this.rebindParentIds();
	}
	rebindParentIds()
	{
		this.root.children_order.forEach(function(id){
			this.nodes[id].parent_id_backup = this.nodes[id].parent_id;
			this.nodes[id].parent_id = this.root.id;
		}.bind(this));
	}
	formatDone(doneArray)
	{
		let doneItemsObject = doneArray.reduce((prev,item) => {
			if(item.done){
			  	let donePropName = moment(item.done_date).format('YYYY/MM/DD');
			  	// if we don't have a slot for this date, make one
			  	if(!prev.hasOwnProperty(donePropName)){
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
			rObj['totalTime'] = rObj['items'].reduce((prev, next) => {
				return allItems.AplusB(prev, next.planned_time);
	    	}, 0);
			return rObj;
		});
	}

}

