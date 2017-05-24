export default {
updateState (state, { id, field, value })
{
	if (!id)
	{
        state[field] = value;
        return;
	}
	state.nodes[id][field] = value;
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
}
};