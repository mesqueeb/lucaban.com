

function organizeAfterInitialization()
{
	console.log('run organizeAfterInitialization');
	Object.keys(store.nodes).forEach(function (id) {
	    store.dispatch('sortChildren', {id});
	    store.dispatch('updateChildrenDueDate', {id});
	}.bind(this));
}
function setDefaultItemValues(item)
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
function makeNode (item)
{
	let node = JSON.parse(JSON.stringify(item));
	let parent = returnedObject.nodes[node.parent_id];
	// assign extra item values
	node = setDefaultItemValues(node);
	// Register and organize nodes:
	if(node.depth == 0) { returnedObject.root = node; console.log('root-node');}
	else if (parent) { parent.children.push(node); }
	else { returnedObject.orphans.push(node); }
	returnedObject.nodes[node.id] = node;
}
function initializeState (fetchedData)
{
	console.log(`initializeState`);
	console.log(`fetchedData ↓`);
	console.log(fetchedData);
	if (!fetchedData){ return; }

	let returnedObject = {}
	returnedObject.source = fetchedData;
	returnedObject.orphans = [];
	returnedObject.nodes = {};
	returnedObject.root = {};
	fetchedData.forEach(item => makeNode(item));	

	// organizeAfterInitialization();
	console.log(`returnedObject: ${returnedObject}`);
	return returnedObject;
}
export { initializeState };