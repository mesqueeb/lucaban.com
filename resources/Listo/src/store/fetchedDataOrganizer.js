import setDefaultItemValues from './setDefaultItemValues.js'

function makeNode (item, returnedObject)
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
export default function organizeData (fetchedData)
{
	console.log(`organizeData() with fetchedData ↓`);
	console.log(fetchedData);
	if (!fetchedData){ return; }

	let returnedObject = {}
	returnedObject.source = fetchedData;
	returnedObject.orphans = [];
	returnedObject.nodes = {};
	returnedObject.root = {};
	fetchedData.forEach(item => makeNode(item, returnedObject));

	return returnedObject;
}