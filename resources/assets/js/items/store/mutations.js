export default {
updateState (state, payload) // { id, field, value } or other
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
updatePopouts (state, payload) // { field, value } or other
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
updatePopups (state, payload) // { field, value } or other
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
resetNewItem (state)
{
	state.newItem.body = '';
	state.newItem.due_date = '0000-00-00 00:00:00';
	state.newItem.done_date = '0000-00-00 00:00:00';
	state.newItem.done = false;
	state.newItem.planned_time = '';
	state.newItem.preparedTags = [];
},
addChild (state, { newParentId, index, item })
{
	if (!index)
	{
 		state.nodes[newParentId].children.push(item);
		state.nodes[newParentId].children_order.push(item.id)
		return;
	}
	state.nodes[newParentId].children.splice(index,0,item);
	state.nodes[newParentId].children_order.splice(index,0,item.id);
},
deleteChild (state, { index, id })
{
	state.nodes[id].children.splice(index,1);
	state.nodes[id].children_order.splice(index,1);
},
closeFlash (state, { flash })
{
	state.flashes = state.flashes.filter(f => f != flash);
}
};