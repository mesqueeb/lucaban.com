export default class Tree {
	constructor(items){
		// properties
		this.source		= items;
		this.nodes 		= {}; // →　"id" = { task obj };
		// this.nodesArr	= []; // →　{ task obj }, ...;
		this.orphans	= [];
		// process items
		items.forEach(this.initialize.bind(this));
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
}