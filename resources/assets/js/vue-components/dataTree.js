export default class Tree {
	constructor(items){
		// properties
		this.source		= items;
		this.nodes 		= {}; // →　"id" = { task obj };
		// this.nodesArr	= []; // →　{ task obj }, ...;
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
		// register nodesArr
		// this.nodesArr.push(node);
		itemsProcessed++;
	    if(itemsProcessed === this.source.length) {
	    	$.each(this.nodes, function(index, value) {
			    // console.log(this.sortChildren());
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
	addThing(item)
	{

	}
	nodeIndex(id){
		let parent_id = allThings.nodes[id].parent_id;
		if(!parent_id){ return; }
		let siblingsArr = allThings.nodes[parent_id].children_order;
		return siblingsArr.indexOf(id);
	}
	olderSiblingId(id){
		let parent_id = allThings.nodes[id].parent_id;
		if(!parent_id){ return; }
		let siblingsArr = allThings.nodes[parent_id].children_order;
		if(siblingsArr.length <= 1 || allThings.nodeIndex(id) == 0){
			return parent_id;
		}
		let nodeIndex = siblingsArr.indexOf(id);
		return allThings.nodes[parent_id].children_order[nodeIndex-1];
	}
	sortChildren(item)
	{
		let order = item.children_order;
		let things = item.children;
		if (order instanceof Array){
			item.children = order.map(id => things.find(t => t.id === id));
		}
	}
	giveNewParent(id, new_parent_id)
	{
		let parent_id = allThings.nodes[id].parent_id;
		let targetThing = allThings.nodes[id];
		let newParent = allThings.nodes[new_parent_id];
		console.log('newParent ↓ ');
		console.log(newParent);
		let prevParent = allThings.nodes[parent_id];
		console.log('prevParent ↓ ');
		console.log(prevParent);
		let nodeIndex = this.nodeIndex(id);
		prevParent.children.splice(nodeIndex,1);
		prevParent.children_order.splice(nodeIndex,1);
		
		targetThing.parent_id = new_parent_id;
		targetThing.depth = newParent.depth+1;
		if (!newParent.children_order){
			newParent.children_order = [];
		}
		if(prevParent.depth-1 == newParent.depth){
			// when unindenting
			let newIndex = this.nodeIndex(prevParent.id)+1;
			newParent.children_order.splice(newIndex,0,id);
			newParent.children.splice(newIndex,0,targetThing);
		}else{
			// when indenting
			newParent.children_order.push(id)
			newParent.children.push(targetThing);
		}

		// allThings.recalcChildren_order(prevParent);
		// allThings.recalcChildren_order(newParent);
	}
	// recalcChildren_order(item){
	// 	let theItem = allThings.nodes['1'];
	// 	let result = theItem.children.map(function(a) {return a.id;});
	// 	theItem.children_order = result;
	// }

}

