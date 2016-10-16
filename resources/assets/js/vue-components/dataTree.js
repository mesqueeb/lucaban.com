export default class Tree {
	constructor(items){
		// properties
		this.source		= items;
		this.nodes 		= {}; // →　"id":{ task obj };
		this.orphans	= [];
		this.filteredTagItems = null;
		// process items
		window.itemsProcessed = 0;
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
		itemsProcessed++;
	    if(itemsProcessed === this.source.length) {
	    	$.each(this.nodes, function(index, node) {
			    let id = node.id;
			    this.sortChildren(id);
			    this.updateChildrenDueDate(id);
				// this.attachParentBody(id);　//Maybe I should only do this when pressing DONE
			    if (!node.children.length && (node.used_time || node.planned_time)){
				    this.calculateTotalTime(id);
			    }
			    window.allItemsBackup = this.root.children;
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
	addItem(item, index, addNextItemAs, addTags)
	{
		item.show_children = (!item.show_children) ? 1 : item.show_children;
		item.children_order = (!item.children_order) ? [] : item.children_order.split(',').map(Number);
		item.children = (!item.children) ? [] : item.children;
		let parent = allItems.nodes[item.parent_id];
		// console.log('item.parent_id in additem');
		// console.log(item.parent_id);
		if (!parent.children_order){
			parent.children_order = [];
		}
		item.due_date = "0000-00-00 00:00:00";
		item.done_date = "0000-00-00 00:00:00";
		item.done = false;
		item.used_time = 0;
		item.tagged = [];
		//Actually ADD the item!
		parent.children.splice(index, 0, item);
		parent.children_order.splice(index, 0, item.id);
		this.nodes[item.id] = item;

		// Patches etc.
	    selection.selectedId = item.id;
	    vm.patch(item.parent_id, 'children_order');
	    vm.patchTag(item.id, addTags);
		this.attachParentBody(item.id);
		this.autoCalculateDoneState(item.parent_id);
	    if (item.used_time || item.planned_time){
		    this.calculateTotalTime(item.id);
	    }
	    // Don't show adding a new task dialogue when Duplicating!
	    let siblingId = this.olderSiblingId(item.id);
	    let siblingBody = this.nodes[siblingId].body;
	    if(siblingBody != item.body){
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
	siblingIndex(id)
	{
		let parent_id = allItems.nodes[id].parent_id;
		if(!parent_id){ return; }
		let siblingsArr = allItems.nodes[parent_id].children_order;
		return siblingsArr.indexOf(id);
	}
	olderSiblingId(id)
	{
		let parent_id = allItems.nodes[id].parent_id;
		if(!parent_id){ return; }
		let siblingsArr = allItems.nodes[parent_id].children_order;
		if(siblingsArr.length <= 1 || allItems.siblingIndex(id) == 0){
			return parent_id;
		}
		let siblingIndex = siblingsArr.indexOf(id);
		return allItems.nodes[parent_id].children_order[siblingIndex-1];
	}
	nextItemId(id)
	{
		let item = allItems.nodes[id];
		// first check if item has children, if so select the first child.
		if (item.show_children && item.children.length > 0){
			return item.children_order[0];
		}
		// if no children look at parent node's children order.
		let parent_id = item.parent_id;
		if(!parent_id){ return; }
		let siblingsArr = allItems.nodes[parent_id].children_order;

		if(allItems.siblingIndex(id)+1 == siblingsArr.length){
			// console.log('this was the last node');
			return this.nextItemRecursion(id,parent_id);
		}
		let siblingIndex = siblingsArr.indexOf(id);
		return allItems.nodes[parent_id].children_order[siblingIndex+1];
	}
	nextSiblingOrParentsSiblingId(id)
	{
		let parent_id = allItems.nodes[id].parent_id;
		let children_order = allItems.nodes[parent_id].children_order;
		let nextIndex = this.siblingIndex(id)+1;
		if (nextIndex == children_order.length){
			return this.nextSiblingOrParentsSiblingId(parent_id);
		} else {
			return children_order[nextIndex];
		}
	}
	prevItemId(id)
	{
		let parent_id = allItems.nodes[id].parent_id;
		if(!parent_id){ return; }
		let siblingsArr = allItems.nodes[parent_id].children_order;
		if(allItems.siblingIndex(id) == 0){
			return parent_id;
		}
		let siblingIndex = siblingsArr.indexOf(id);
		let prevItemId = allItems.nodes[parent_id].children_order[siblingIndex-1];
		// check if upper sibling item has children
		prevItemId = this.prevItemRecursion(prevItemId);
		return prevItemId;
	}
	prevItemRecursion(id)
	{
		let item = allItems.nodes[id];
		let childrenLength = item.children.length;
		// console.log('childrenLength: '+childrenLength+' // id: '+id);
		if(item.show_children && childrenLength>0){
			id = allItems.nodes[id].children[childrenLength-1].id;
			// console.log('childrenLength: '+childrenLength+' // id: '+id);
			return this.prevItemRecursion(id);
		} else {
			// console.log('last cycle id: '+id);//THIS VALUE LOOKS FINE
			return id;
		}
	}
	nextItemRecursion(id,parent_id){
		var nextIndex = allItems.siblingIndex(id)+1;
		if(nextIndex != allItems.nodes[parent_id].children_order.length){
			return allItems.nodes[parent_id].children_order[nextIndex];
		}
		else {
			return this.nextItemRecursion(parent_id,allItems.nodes[parent_id].parent_id);
		}
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
	giveNewParent(id, new_parent_id, specificNewIndex)
	{
		console.log('giving new parent');
		let parent_id = allItems.nodes[id].parent_id;
		let targetItem = allItems.nodes[id];
		let newParent = allItems.nodes[new_parent_id];
			console.log('newParent ↓ ');
			console.log(newParent);
		let prevParent = allItems.nodes[parent_id];
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
		let targetChildren = allItems.nodes[id].children;
		if (!(targetChildren || targetChildren.length)){ return false; }
		targetChildren.forEach(function(child){
			console.log(child);
			child.depth = allItems.nodes[child.parent_id].depth+1;
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
		if (this.nodes[id].body.slice(-1) == ':'){
			return true;
		} else {
			return false;
		}
	}
	deleteItem(id)
	{
		let item = allItems.nodes[id];
		let newSelectedId = this.olderSiblingId(id);
		// Delete all children as well!
		if (Array.isArray(item.children) && item.children.length) {
			let allChildrenIds = this.getAllChildrenIds(id);
			vm.deleteItemApi(allChildrenIds);
		}
		// Delete items attached to previous parent
		let parent_id = item.parent_id;
		let prevParent = allItems.nodes[parent_id];
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
		let item = allItems.nodes[id];
		vm.patchTag(id, tags);
	}
	prepareTag(id, tags)
	{
		let item = allItems.nodes[id];

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
		let children = allItems.nodes[id].children;
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
			item.children_order.forEach(item => { return this.getAllChildrenIdsRecursive(item, allChildrenIds) });
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
		let pId = allItems.nodes[id].parent_id;
		console.log('checkValParentTree pId: '+checkValParentTree);
		if (!pId){ return false; }
		let checkVal = allItems.nodes[pId].item[val];
		console.log('checkValParentTree checkVal: '+checkVal);
		if (checkVal){
			return checkVal;
		} else {
			return allItems.checkValParentTree(pId, val);
		}
	}
	AplusB(a, b)
	{
	    return parseFloat(a) + parseFloat(b);
	}
	moveItem(id, direction)
	{
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
		let oriDueDate = allItems.nodes[id].due_date;
		let diff = moment(oriDueDate).diff(dd, 'days');
		if (diff == 0){ dd = '0000-00-00 00:00:00'; }
		allItems.nodes[id].due_date = dd;
		vm.patchDueDate(id, dd);
		allItems.updateChildrenDueDate(id);
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
		let pId = allItems.nodes[id].parent_id;
		if (!pId){ return; }
		pArr.push(allItems.nodes[pId].body);
		this.getParentsRecursive(pId, pArr);
	}
	getLastChildId(id)
	{
		let l = this.nodes[id].children.length;
		if(!l){ return false; }
		let n = this.nodes[id].children[l-1];
		return n.id;
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
	filter(keyword, value)
	{
    	window.filteredItems = [];
		if (keyword == 'duedate'){
			if (value == 'today'){
		    	$.each(this.nodes, function(index, item) {
		    		let diff = moment(item.due_date).diff(moment(), 'days');
					if (diff <= 0){
						filteredItems.push(item);
					}
			    });
			}
		}
		if (keyword == 'all'){
			filteredItems = allItemsBackup;
		}
		// if (keyword == 'done'){
	 //    	$.each(this.nodes, function(index, item) {
		// 		if (item.done){
		// 			filteredItems.push(item);
		// 		}
		//     });
		// }
		allItems.root.children = filteredItems;
	}
	getFilteredFlat(keyword)
	{
		if (keyword == 'done'){
			let nodes = this.nodes;
			let keys = Object.keys(nodes);
			let doneItemsObject = keys.reduce((prev,item) => {
				if(nodes[item].done){
				  	let donePropName = moment(nodes[item].done_date).format('YYYY/MM/DD');
				  	// if we don't have a slot for this date, make one
				  	if(!prev.hasOwnProperty(donePropName)){
				    	prev[donePropName] = [];
				  	}
					prev[donePropName].push(nodes[item]);
				}
        		return prev;
			},{});
			return Object.keys(doneItemsObject).map(function(k){ 
			   let rObj = {};
			   rObj['date'] = k;
			   rObj['items'] = doneItemsObject[k];
			   return rObj;
			});
	  	}
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
	getDoneTasksRecursively(childrenArray, prev)
	{
		if (!prev){ prev = {}; }
		// let prev = (!prev) ? {} : prev;
		return childrenArray.reduce(function (prev,item) {
			// console.log('item in getDoneTasksRecursively:');
			// console.log(item);
			if(item.done){
				console.log('item: '+item.body+' ; done = '+item.done);
			  	let donePropName = moment(item.done_date).format('YYYY/MM/DD');
			  	// if we don't have a slot for this date, make one
			  	if(!prev.hasOwnProperty(donePropName)){
			    	prev[donePropName] = [];
			  	}
				prev[donePropName].push(item);
			} else {
				// if (!prev){ return; }
				this.getDoneTasksRecursively(item.children, prev); 
			}
    		return prev;
		}.bind(this),prev);
	}
	getFiltered(keyword)
	{
		if (keyword == 'done'){
			let firstItem = this.root.children;
			let doneItemsObject = this.getDoneTasksRecursively(firstItem);
			console.log(doneItemsObject);
			return Object.keys(doneItemsObject).map(function(k){ 
			   let rObj = {};
			   rObj['date'] = k;
			   rObj['items'] = doneItemsObject[k];
			   return rObj;
			});
	  	}
	}

}

