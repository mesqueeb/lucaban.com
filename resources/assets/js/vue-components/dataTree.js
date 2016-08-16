export default class Tree {
	constructor(items){
		// properties
		this.source		= items;
		this.nodes 		= {}; // →　"id" = { task obj };
		this.orphans	= [];
		// process items
		window.itemsProcessed = 0;
		items.forEach(this.initialize.bind(this))
	}
	initialize(item, index) 
	{
		// variables
		let node 	= this.makeNode(item);
		let parent 	= this.getNode(node.parent_id);
		// assign
		if(node.children_order){
			node.children_order = node.children_order.split(',').map(Number);
		}
		node.children = [];
		if(index === 0) { this.root = node; }
		else if (parent) { parent.children.push(node); }
		else { this.orphans.push(node); }
		// register node
		this.nodes[node.id] = node;

		// Add amount of rows
		let nl = node.body.split(/\r\n|\r|\n/).length;
		node['rows'] = nl;
		//Sort all nodes after making sure you got all of them.
		itemsProcessed++;
	    if(itemsProcessed === this.source.length) {
	    	$.each(this.nodes, function(index, value) {
			    this.sortChildren(value);
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
	calcAllPlannedTime()
	{
		let obj = allItems.nodes;
		let arr = Object.keys( obj ).map(function ( key ) { return obj[key].depth; });
		let max = Math.max.apply( null, arr );
		let depthStep;
for (depthStep = max; depthStep > 0; depthStep--) {
	// get all tasks with depth = depthStep
	// foreach(){}
	// if has children{
		//make 'total time' = sum of all 'total time' on children + 'own time'
	// } else if no childern {
		//make 'total time' = 'own time'
	//}
	//if all done, end the loop and decrement depthStep
}
	}
	addItem(item, index)
	{
		item.children_order = (!item.children_order) ? [] : item.children_order;
		item.children = (!item.children) ? [] : item.children;
		let parent = allItems.nodes[item.parent_id];
		console.log('item.parent_id in additem');
		console.log(item.parent_id);
		if (!parent.children_order){
			parent.children_order = [];
		}
		parent.children.splice(index, 0, item);
		parent.children_order.splice(index, 0, item.id);
	    allItems.nodes[item.id] = item;
	    vm.patchChildren_order(item.parent_id, item.id);
	    // vm.showAddNewItem(item.id);
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
		// first check if item has children, if so select the first child.
		if (allItems.nodes[id].children.length > 0){
			return allItems.nodes[id].children_order[0];
		}
		// if no children look at parent node's children order.
		let parent_id = allItems.nodes[id].parent_id;
		if(!parent_id){ return; }
		let siblingsArr = allItems.nodes[parent_id].children_order;

		if(allItems.siblingIndex(id)+1 == siblingsArr.length){
			console.log('this was the last node');
			return this.nextItemRecursion(id,parent_id);
		}
		let siblingIndex = siblingsArr.indexOf(id);
		return allItems.nodes[parent_id].children_order[siblingIndex+1];
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
		let childrenLength = allItems.nodes[id].children.length;
		console.log('childrenLength: '+childrenLength+' // id: '+id);
		if(childrenLength>0){
			id = allItems.nodes[id].children[childrenLength-1].id;
			console.log('childrenLength: '+childrenLength+' // id: '+id);
			return this.prevItemRecursion(id);
		} else {
			console.log('last cycle id: '+id);//THIS VALUE LOOKS FINE
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
	sortChildren(item)
	{
		let order = item.children_order;
		let items = item.children;
		if (order instanceof Array){
			item.children = order.map(id => items.find(t => t.id === id));
		}
	}
	giveNewParent(id, new_parent_id)
	{
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
		if(prevParent.depth-1 == newParent.depth){
			// when unindenting
			let newIndex = this.siblingIndex(prevParent.id)+1;
			newParent.children.splice(newIndex,0,targetItem);
			newParent.children_order.splice(newIndex,0,id);
		}else{
			// when indenting
			newParent.children.push(targetItem);
			newParent.children_order.push(id)
		}
		// Delete items attached to previous parent
		prevParent.children.splice(siblingIndex,1);
		prevParent.children_order.splice(siblingIndex,1);
		// update children recursively
		vm.patchDepth(id);
		vm.patchParent_id(id);
		vm.patchChildren_order(new_parent_id);
		vm.patchChildren_order(parent_id);
		this.updateChildrenDepth(targetItem.id);
	}
	updateChildrenDepth(id)
	{
		let targetChildren = allItems.nodes[id].children;
		targetChildren.forEach(function(child){
			console.log(child);
			child.depth = allItems.nodes[child.parent_id].depth+1;
			vm.patchDepth(child.id);
			this.updateChildrenDepth(child.id);
			return true;
		}.bind(this))
	}
	deleteItem(id)
	{
		let parent_id = allItems.nodes[id].parent_id;
		let targetItem = allItems.nodes[id];
		let prevParent = allItems.nodes[parent_id];
		let siblingIndex = this.siblingIndex(id);
		// Delete items attached to previous parent
		prevParent.children.splice(siblingIndex,1);
		prevParent.children_order.splice(siblingIndex,1);
		vm.patchChildren_order(parent_id);
	}
	updateDoneState(id)
	{
		let done_date = new Date();
		allItems.nodes[id].done_date = done_date;
		vm.patchDone(id);
	}
	calculateDuration(item)
	{
	    // if we don't have children, do nothing, leave the time as-is
	    if (!(Array.isArray(item.children) && item.children.length)) {
	      item['totalTime'] = item.planned_time;
	      return item;
	    }
	    //recursively call this on children
	    item.children = item.children.map(this.calculateDuration);
	    // add up all the times of our direct children (they'll already have been reconciled)
	    item['totalTime'] = item.children.reduce((prev, next) => {
	        return allItems.addTime(prev, next.totalTime);
	    }, item.planned_time);
	    return item;
	}
	addTime(a, b)
	{
	    return parseFloat(a) + parseFloat(b);
	}
	// recalcChildren_order(item)
	// {
	// 	let theItem = allItems.nodes['1'];
	// 	let result = theItem.children.map(function(a) {return a.id;});
	// 	theItem.children_order = result;
	// }

}

