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
	addItem(item, index)
	{
		let parent = allItems.nodes[item.parent_id];
		if (!parent.children_order){
			parent.children_order = [];
		}
		parent.children.splice(index, 0, item);
		parent.children_order.splice(index, 0, item.id);
	    allItems.nodes[item.id] = item;
	}
	nodeIndex(id)
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
		if(siblingsArr.length <= 1 || allItems.nodeIndex(id) == 0){
			return parent_id;
		}
		let nodeIndex = siblingsArr.indexOf(id);
		return allItems.nodes[parent_id].children_order[nodeIndex-1];
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

		if(allItems.nodeIndex(id)+1 == siblingsArr.length){
			console.log('this was the last node');
			return this.nextItemRecursion(id,parent_id);
		}
		let nodeIndex = siblingsArr.indexOf(id);
		return allItems.nodes[parent_id].children_order[nodeIndex+1];
	}
	nextItemRecursion(id,parent_id){
		var nextIndex = allItems.nodeIndex(id)+1;
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
		let nodeIndex = this.nodeIndex(id);
		targetItem.parent_id = new_parent_id;
		targetItem.depth = newParent.depth+1;
		if (!newParent.children_order){
			newParent.children_order = [];
		}
		if(prevParent.depth-1 == newParent.depth){
			// when unindenting
			let newIndex = this.nodeIndex(prevParent.id)+1;
			newParent.children.splice(newIndex,0,targetItem);
			newParent.children_order.splice(newIndex,0,id);
		}else{
			// when indenting
			newParent.children.push(targetItem);
			newParent.children_order.push(id)
		}
		// Delete items attached to previous parent
		prevParent.children.splice(nodeIndex,1);
		prevParent.children_order.splice(nodeIndex,1);
		// update children recursively
		this.updateChildrenDepth(targetItem);
	}
	updateChildrenDepth(targetItem)
	{
		targetItem.children.forEach(function(child){
			// console.log(child);
			child.depth = allItems.nodes[child.parent_id].depth+1;
			this.updateChildrenDepth(child);
			return true;
		}.bind(this))
	}

	// recalcChildren_order(item){
	// 	let theItem = allItems.nodes['1'];
	// 	let result = theItem.children.map(function(a) {return a.id;});
	// 	theItem.children_order = result;
	// }

}

