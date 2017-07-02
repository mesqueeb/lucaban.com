import initialState from './state.js'

export default {
resetStateData(state)
{
	let newState = initialState();
	state = Object.assign(state, newState);
},
updateState(state, payload) // { id, field, value } or other
{
	let key = payload.field;
	let val = payload.value;
	if (!key && !val)
	{
		key = Object.keys(payload).filter(k => k != 'id')[0];
		val = payload[key];
	}
	if (payload.id)
	{
		state.nodes[payload.id][key] = val;
        return;
	}
    state[key] = val;
},
updatePopouts(state, payload) // { field, value } or other
{
		let key = payload.field;
		let val = payload.value;
        if (!key && !val)
        {
			key = Object.keys(payload)[0];
	        val = payload[key];
        }
        state.popouts[key] = val;
},
updatePopups(state, payload) // { field, value } or other
{
		let key = payload.field;
		let val = payload.value;
        if (!key && !val)
        {
			key = Object.keys(payload)[0];
	        val = payload[key];
        }
        state.popups[key] = val;
},
removePopout(state, { type, index })
{
	state.popouts[type].splice(index, 1);
},
removePopup(state, { index })
{
	state.popups.splice(index, 1);
},
addPopup(state, { popup })
{
	state.popups.push(popup);
},
pushFlash(state, payload)
{
	state.flashes.push(payload);
},
resetNewItem(state)
{
	state.newItem.body = '';
	state.newItem.due_date = '0000-00-00 00:00:00';
	state.newItem.done_date = '0000-00-00 00:00:00';
	state.newItem.done = false;
	state.newItem.planned_time = '';
	state.newItem.preparedTags = [];
},
addNode(state, { item })
{
	vm.$set(state.nodes,item.id,item);
},
addChild(state, { newParentId, index, item })
{
	if (!state.nodes[newParentId].children){ state.nodes[newParentId].children = []; }
	if (!state.nodes[newParentId].children_order){ state.nodes[newParentId].children_order = []; }
	if (!index)
	{
 		state.nodes[newParentId].children.push(item);
		state.nodes[newParentId].children_order.push(item.id)
		return;
	}
	state.nodes[newParentId].children.splice(index,0,item);
	state.nodes[newParentId].children_order.splice(index,0,item.id);
},
addTempTag (state, {id, tagObject, requestType} = {})
{
	if (requestType == 'tag' || !requestType)
	{
		console.log(state.nodes[id].tagged);
		state.nodes[id].tagged.push(tagObject);
		console.log(state.nodes[id].tagged);
	}
	if (requestType == 'untag')
	{
		state.nodes[id].tagged = state.nodes[id].tagged.filter(t => t.tag_slug != tagObject.tag_slug);
	}
},
deleteTempItem(state, { item })
{
	let parent = state.nodes[item.parent_id];
	state.nodes[item.parent_id].children = parent.children.filter(i => !i.temp);
	state.nodes[item.parent_id].children_order = parent.children_order.filter(i => !i.toString().includes('tempItem'));
	Object.keys(state.nodes).forEach(k => {
		if (k.toString().includes('tempItem'))
		{
			delete state.nodes[k];
		}
	});
},
deleteChild(state, { index, id })
{
	state.nodes[id].children.splice(index,1);
	state.nodes[id].children_order.splice(index,1);
},
closeFlash(state, { flash })
{
	state.flashes = state.flashes.filter(f => f != flash);
}
};