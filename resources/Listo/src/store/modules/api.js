import {
	Utilities, hasClass, mobilecheck, isElementInViewport, objectToArray, uniqBy, uniq, arrayToString, sortObjectArrayByProperty, sortObjectArrayByTwoProperties, removeEmptyValuesFromArray
} from '../../helpers/globalFunctions.js';
import { initializeState } from '../stateInitializer.js';
import axios from 'axios';

export default {
	state:
	{
		// user: null,
	},
	actions:
	{
		login ({commit, dispatch, getters, rootState},
			credentials)
		{
			commit('updateState',{loading:true});
			// let self = this;
			axios.post(apiBaseURL+'auth', credentials).then(({data}) => {
				dispatch('setToken', {token:data.token});
				dispatch('fetchListo');
				router.push('/');
			});
		},
		setToken({state}, {token})
		{
			window.axios.defaults.headers.common = {
			    'X-Requested-With': 'XMLHttpRequest',
				'Authorization': "Bearer " + token ,
			};
			console.log('token set!');
		},
		fetchListo ({commit, dispatch})
		{
			commit('updateState', { loading:true } );
			console.log('start fetching all items');
			console.log(axios.defaults.headers.common);
			/*/ ～～～～～～～～～～～～～～～～～～～～～～～　\*\		*/
			axios.get(apiBaseURL+'items').then(({data}) => { 			/*
			\*\ ～～～～～～～～～～～～～～～～～～～～～～～　/*/
				console.log('fetched all items');
				let userData = initializeState(data);
				commit('updateState', { source:userData.source });
				commit('updateState', { orphans:userData.orphans });
				commit('updateState', { nodes:userData.nodes });
				commit('updateState', { root:userData.root });
				dispatch('sortAllChildren');
				commit('updateState', { loading:false } );
				dispatch('getUser');
			}).catch((error) => {
				console.log(`ERROR: ${error}`);
			});
		},
		getUser ({dispatch, commit})
		{
			axios.get(apiBaseURL+'user').then(({data}) => {
				console.log(data);
				commit('updateUser', {user:data.user});
				dispatch('sendFlash',{msg:`Hello ${data.user.name}!`})
			});
		},
		patch ({commit, dispatch, getters, rootState},
			{id, field, value} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			// if (getters.isTopLvlItemInFilteredRoot(id)){ 
			// 	if (field == 'children_order' || field == 'parent_id'){
			// 		console.log("you can't sync a toplvlItem when filtering");
			// 		return;
			// 	}
			// }
			dispatch('startPatching');
			let patchObj = {};
			let patchVal = (value) ? value : rootState.nodes[id][field];
			if (field == 'children_order'){
				patchVal = arrayToString(patchVal);
			}
			patchObj[field] = patchVal;
			axios.patch(apiBaseURL+'items/' + id, patchObj, { method: 'PATCH'})
			.then(function(response){
				console.log(`patched ${id}[${rootState.nodes[id].body}].${field} = ${patchObj[field]}`);
				dispatch('stopPatching');
			}, (response) => {
				commit('updateState', {patching:'error'});
				let errMsg = getters.text.flashes.ajaxError;
				console.log(errMsg);
				dispatch('sendFlash', { type:'ajaxError', msg:errMsg });
				return;
			});
		},
		patchTag ({rootState, dispatch},
			{id, tags, requestType} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			/* requestType can be:
				'tag': tag item  (default if null)
				'untag': untag item with certain tag
				'retag': delete all tags and retag new ones
			*/
			if (!tags){ return; }
			dispatch('updateItemTagsDom', { id, tags, requestType });
			if (Array.isArray(tags)){
				tags = removeEmptyValuesFromArray(tags);
				if (!tags.length){ return; }
			} else {
				if (!tags.replace(/\s/g, "").length){ return; }
			}
			dispatch('startPatching');
			let patchObj = {};
			patchObj['tags'] = tags;
			patchObj['type'] = requestType;
			axios.patch(apiBaseURL+'itemtags/' + id, patchObj, { method: 'PATCH'})
			.then(function(tagResponse){
				let syncedTags = tagResponse.data.tags;
				console.log('tagged ['+rootState.nodes[id].body+'] with: '+tagResponse.data.tags+';');
				console.log(tagResponse);
				// Re-Add tags of item
				axios.get(apiBaseURL+'itemtags/' + id, { type: 'tags'})
				// Codementor: Request type doesn't work......
				.then(function(updatedTagList){
					rootState.nodes[id].tagged = updatedTagList.data;
					console.log('updatedTagList of ['+rootState.nodes[id].body+'] with: '+updatedTagList.data.map(t => t.tag_name)+';');
				});
				dispatch('stopPatching');
			});
		},
		patchDueDate ({dispatch, rootState},
			{id, duedate} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			dispatch('startPatching');
			if (duedate == '0000-00-00 00:00:00'){
				axios.patch(apiBaseURL+'items/' + id, {'due_date':duedate})
				.then(function(response){
					dispatch('stopPatching');
				});
				return;
			}
			duedate = moment(duedate).format();
			console.log('PatchDueDate: '+duedate);
			axios.patch(apiBaseURL+'items/' + id, {'due_date':duedate})
			.then(function(response){
				dispatch('stopPatching');
			});
		},
		patchDone ({rootState, dispatch},
			{id} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			dispatch('startPatching');
			let done_date;
			let doneValue = rootState.nodes[id].done;
			if (doneValue){
				done_date = moment().format();
			} else {
				done_date = '0000-00-00 00:00:00';
			}
			axios.patch(apiBaseURL+'items/' + id, {'done':doneValue, 'done_date':done_date})
			.then(function(response){
				dispatch('stopPatching');
			});
		},
		deleteItemApi ({rootState, dispatch},
			{idOrArray} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			dispatch('startPatching');
			if (Array.isArray(idOrArray) && idOrArray.length) {
				let array = idOrArray; // It's an array!
				array.forEach(id => { dispatch('deleteItemApi', { idOrArray:id }); });
			} else {
				let id = idOrArray; // It's an ID!
				if (!id){ return; }
				let item = rootState.nodes[id];
				axios.delete(apiBaseURL+'items/' + id)
				.then(function(response){
					console.log(`deleted: ${id}[${item.body}]`);
					dispatch('stopPatching');
				});
			}
		},
		fetchDone ({rootState, dispatch, getters},
			{tags, operator} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			rootState.loading = true;
			axios.get(apiBaseURL+'items/fetchdone').then(function(response){
				// debugger;
				rootState.fetchedDone = true;
				console.log('fetched Done');
				let data = response.data;
				console.log(data);
				if (!data.length){ 
					console.log('no done items...');
					rootState.loading = false;
					return;
				}
				// clean up and add as nodes
				data.forEach(item => {
					item = getters.setDefaultItemValues(item)
					if (!rootState.nodes[item.id]){ rootState.nodes[item.id] = item; }
				});
				// Codementor
				rootState.selection.view = null;
				rootState.selection.view = 'journal';
				rootState.loading = false;
			});
		},
		postNewItem ({rootState, dispatch, getters},
			{newItem, index, addNextItemAs, addTags, duplication} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			dispatch('startPatching');
			// Prepare children_order for sending to DB.
			if (newItem.children_order){
				newItem.children_order = arrayToString(newItem.children_order);
			}
			// let data = {
			// 	newItemArray: [newItem, newItem]
			// }
			let data = newItem;
			// newItem.id = 99999999;
			// index = 0;
			// allItems.addItem(newItem, index);
			// return;

			// let data = newItem;
			// data = JSON.stringify(data);
			axios.post(apiBaseURL+'items',data) //SEND
			// axios.post(apiBaseURL+'items',newItem) //SEND
			.then(function(response){ //response
				let storedItem = response.data;
				// Revert old item's children_order back to string.
				// storedItem.children_order = (!newItem.children_order) ? [] : newItem.children_order.split(',').map(Number);
				// if (storedItem.constructor === Array){
				// 	console.log(storedItem);
				// 	console.log('storedItem ARRAY');
				// 	storedItem.forEach(item => allItems.addItem(item));
				// 	return;
				// }
				console.log('starting dom update...');
				console.log('Index: ');
				console.log(index);
				dispatch('addItem', { item:storedItem, index, addNextItemAs, addTags, duplication });
				dispatch('stopPatching');
			}, (response) => {
				rootState.patching = 'error';
				let errMsg = getters.text.flashes.ajaxError;
				console.log(errMsg);
				dispatch('sendFlash', { type:'ajaxError', msg:errMsg });
			});
		},
		patchRootChildrenOrderWithFilter ({rootState, dispatch},
			{id} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			axios.get(apiBaseURL+'items/'+rootState.root.id).then(function(response){
				let rootChildrenOrder = response.data.children_order;
				rootChildrenOrder = rootChildrenOrder+','+id;
				axios.patch(apiBaseURL+'items/'+rootState.root.id, {'children_order':rootChildrenOrder}).then(function(response){
					let newRootChildrenOrder = response.data.children_order;
					console.log('newRootChildrenOrder = '+newRootChildrenOrder);
				});
			});
		},
	},
	getters:
	{
		someGetter: (state, getters, rootState, rootGetters) =>
		(id) => {
			getters.someOtherGetter // -> 'foo/someOtherGetter'
			rootGetters.someOtherGetter // -> 'someOtherGetter'
		},
	},
}