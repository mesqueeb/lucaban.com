import initialState from './state.js'
import ItemComputedProperties from './ItemComputedProperties.js'

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
	let t0 = performance.now( );
	vm.$set(state.nodes,item.id,item);
	itemGetters[item.id] = new Vue({
	    store,
	    data: {
	        item: store.state.nodes[item.id],
	    },
	    computed: ItemComputedProperties,
	});
	let t1 = performance.now( );
	console.log("			Call to addNode took " + (t1 - t0) + " milliseconds.")
},
addChild(state, { newParentId, index, item })
{
	if (!state.nodes[newParentId].children){ state.nodes[newParentId].children = []; }
	if (!state.nodes[newParentId].children_order){ state.nodes[newParentId].children_order = []; }
	if (!index && index != 0)
	{
 		state.nodes[newParentId].children.push(item);
		state.nodes[newParentId].children_order.push(item.id)
		return;
	}
	state.nodes[newParentId].children.splice(index,0,item);
	state.nodes[newParentId].children_order.splice(index,0,item.id);
},
addOrDeleteTempTag(state, {id, tagObject, requestType = 'tag'} = {})
{
	console.log(`${requestType}ging items tempor ${id} with "${tagObject.tag_name}"`);
	if (requestType == 'tag')
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
deleteTag(state, {id, tagObjs})
{
	if (!state.nodes[id]){
		console.log(`trying to tag an unexisting item`);
		return;
	}
	tagObjs.forEach(tagObj => state.nodes[id].tagged = state.nodes[id].tagged.filter(t => t.tag_slug != tagObj.tag_slug));
},
addTagTemporarely(state, {id, tagObjs})
{
	let t0 = performance.now( );
	if (!Array.isArray(tagObjs)){
		tagObjs = [tagObjs];
	}
	if (!state.nodes[id]){
		console.log(`trying to tag an unexisting item`);
		return;
	}
	console.log(`tagging items tempor ${id} with... "${tagObjs.map(t => t.tag_name)}"`);
	// this isn't reactive
	// state.nodes[id].tagged = Object.assign(state.nodes[id].tagged, tagObjs);
	tagObjs.forEach(tag => state.nodes[id].tagged.push(tag));
	let t1 = performance.now( );
	console.log("			Call to commit addTagTemporarely took " + (t1 - t0) + " milliseconds.")
},
deleteTempItem(state, { item })
{
	let parent = state.nodes[item.parent_id];
	state.nodes[item.parent_id].children = parent.children.filter(i => !i.temp);
	state.nodes[item.parent_id].children_order = parent.children_order.filter(i => !i.toString().includes('tempItem'));
	Object.keys(state.nodes).forEach(k => {
		if (k.toString().includes('tempItem'))
		{
			vm.$delete(state.nodes,k);
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