import {
	arrayToString, removeEmptyValuesFromArray
} from '../../helpers/globalFunctions.js'
import organizeData from '../fetchedDataOrganizer.js'
import axios from 'axios'
import ItemComputedProperties from '../ItemComputedProperties.js'
import Vue from 'vue'

import { date, Toast } from 'quasar'
const { getDateDiff } = date;

export default {
	state:
	{
		token: null,
		tokenTimeStamp: null,
		syncStack: {
			items:[],
			deleteItems:[],
			tags:[],
		},
	},
	mutations:
	{
		destroyToken(state)
		{
			localStorage.removeItem('token');
			localStorage.removeItem('tokenTimeStamp');
			window.axios.defaults.headers.common = {
			    'X-Requested-With': 'XMLHttpRequest',
				'Authorization': "Bearer " + '' ,
			};
			state.token = null;
			state.tokenTimeStamp = null;
		},
		setToken(state, {token})
		{
			// console.log(localStorage);
			localStorage.setItem('token', token);
			localStorage.setItem('tokenTimeStamp', new Date());
			window.axios.defaults.headers.common = {
			    'X-Requested-With': 'XMLHttpRequest',
				'Authorization': "Bearer " + token ,
			};
			state.token = token;
			state.tokenTimeStamp = new Date();
		},
	},
	actions:
	{
		refreshToken({commit, state})
		{
			let token = JSON.parse(JSON.stringify(state.token));
			axios.post(apiBaseURL+'refreshToken', {token})
			.then(({data}) => {
				console.log('refreshed token:');
				console.log(data);
				commit('setToken', {token:data});
			});
		},
		logout ({commit, dispatch, getters, rootState, state})
		{
			commit('updateState',{loading:true});
			if (state.token)
			{
				let token = JSON.parse(JSON.stringify(state.token));
				axios.post(apiBaseURL+'logout', {token})
				.then(({data}) => {
					console.log(data);
				});
				commit('destroyToken');
			}
			dispatch('resetStore').then(()=>{
				commit('updateState',{loading:false});
			});
		},
		login ({commit, dispatch, getters, rootState},
			credentials)
		{
			dispatch('resetStore');
			commit('updateState',{loading:true});
			// let self = this;
			axios.post(apiBaseURL+'auth', credentials)
			.then(({data}) => {
				commit('setToken', {token:data.token});
				dispatch('fetchListo');
				router.push('/');
			}).catch(({response})=>{
				let serverError = response.data;
				commit('updateState',{loading:false});
				console.log(serverError);
				let errors = Object.keys(serverError).map((k)=>{
					return serverError[k];
				}).map((e, i) => e[i]).join('<br>');
				Toast.create(errors);
			});
		},
		register ({commit, dispatch, getters, rootState},
			credentials)
		{
			commit('updateState',{loading:true});
			// let self = this;
			axios.post(apiBaseURL+'register', credentials)
			.then(({data}) => {
				console.log(data);
				commit('setToken', {token:data});
				dispatch('fetchListo');
				router.push('/');
			}).catch(({response})=>{
				let serverError = response.data;
				commit('updateState',{loading:false});
				console.log(serverError);
				let errors = Object.keys(serverError).map((k)=>{
					return serverError[k];
				}).map((e, i) => e[i]).join('<br>');
				Toast.create(errors);
			});
		},
		fetchListo ({commit, dispatch})
		{
			commit('updateState', { loading:true } );
			dispatch('getUser');
			// dispatch('fetchAllTags');
			console.log('start fetching all items');
			console.log(axios.defaults.headers.common);
			/*/ ～～～～～～～～～～～～～～～～～～～～～～～　\*\		*/
			axios.get(apiBaseURL+'items').then(({data}) => { 			/*
			\*\ ～～～～～～～～～～～～～～～～～～～～～～～　/*/
				console.log('fetched all items');
				dispatch('initializeState', {data})
				.then(() => {
					commit('updateState', { loading:false } );
				}).catch((error) => {
					console.log(`ERROR: ${error}`);
				});
			}).catch((error) => {
				console.log(`ERROR: ${error}`);
			});
		},
		initializeState ({dispatch, commit},
			{data})
		{
			let userData = organizeData(data);
			// window.userData = userData;
			Object.keys(userData.nodes).forEach(id => {
			    itemGetters[id] = new Vue({
			        store,
			        data: {
			            item: userData.nodes[id],
			        },
			        computed: ItemComputedProperties,
			        // hasParentWithTag: {},
			    });
			});
			commit('updateState', { source:userData.source });
			commit('updateState', { orphans:userData.orphans });
			commit('updateState', { root:userData.root });
			commit('updateState', { nodes:userData.nodes });
			// dispatch('addFetchedNodes', { nodes: userData.nodes });
			dispatch('sortAllChildren');
		},
		getUser ({dispatch, commit})
		{
			axios.get(apiBaseURL+'user').then(({data}) => {
				console.log(data);
				commit('user/updateState', {user:data.user});
				Toast.create({
					html: `Hello ${data.user.name}!`,
					timeout: 5000
				})
			}).catch((error) => {
				console.log(`ERROR: ${error.response}`);
			});
		},
		queueItemPatch ({state, dispatch}, payload = [])
		{
			payload = (Array.isArray(payload)) ? payload : [payload];
			if (!payload.length){ return }
			payload.forEach(patchRequest => state.syncStack.items.push(patchRequest));
			console.log(`pushed to syncStack! ${state.syncStack.items.length}`);
			if (window.bulkPatchQueue){ clearTimeout(window.bulkPatchQueue) }
		    window.bulkPatchQueue = setTimeout(function(){
		    	console.log('dispatching bulkSendPatches');
		    	dispatch('bulkSendPatches', state.syncStack.items);
		    	state.syncStack.items = [];
		    }.bind(dispatch), 750);
		},
		bulkSendPatches ({state, dispatch, commit}, payload = [])
		{
			console.log('starting bulkSendPatches');
			dispatch('startPatching');
			// Refresh the token if nessesary;
			let diff = getDateDiff(new Date(), state.tokenTimeStamp, 'minutes');
			console.log(`diff = ${diff}`);
			let tokenLifeSpan = 4300; // Three days - 20 min
			if (diff > tokenLifeSpan)
			{
				if (window.refreshingToken)
				{ 
					console.log('refreshingToken...');
					return;
				}
				window.refreshingToken = true;
				console.log(`old Token: ${state.token}`);
				console.log(`old Token Date: ${state.tokenTimeStamp}`);
				axios.post(apiBaseURL+'refreshToken', {token:state.token})
				.then(({data}) => {
					console.log('refreshed token:');
					console.log(data);
					window.axios.defaults.headers.common = {
					    'X-Requested-With': 'XMLHttpRequest',
						'Authorization': "Bearer " + data ,
					};
					state.token = data;
					state.tokenTimeStamp = new Date();
					localStorage.setItem('token', data);
					localStorage.setItem('tokenTimeStamp', new Date());
					
					console.log(`new Token: ${state.token}`);
					console.log(`new Token Date: ${state.tokenTimeStamp}`);
					window.refreshingToken = false;
					dispatch('patch', {id, field, value});
				});
				console.log('stop here');
				return;
			}
			// End refresh token
			console.log('patching the syncStack:');
			console.log(state.syncStack.items);
			axios.patch(apiBaseURL+'items/bulkPatch', payload, { method: 'PATCH'})
			.then(function(response){
				dispatch('stopPatching');
			}, (response) => {
				commit('updateState', {patching:'error'});
				let errMsg = getters.text.flashes.ajaxError;
				Toast.create(errMsg);
				return;
			});
		},
		patch ({dispatch, getters, rootState},
			{id, field, value} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			if (id.toString().includes('tempItem')) { return; console.log('not patching temp items...'); }
			// if (getters.isTopLvlItemInFilteredRoot(id)){ 
			// 	if (field == 'children_order' || field == 'parent_id'){
			// 		console.log("you can't sync a toplvlItem when filtering");
			// 		return;
			// 	}
			// }
			let patchObj = {};
			let patchVal = (value) ? value : rootState.nodes[id][field];
			if (field == 'children_order'){
				patchVal = arrayToString(patchVal);
			}
			patchObj[field] = patchVal;
			patchObj['id'] = id;
			dispatch('queueItemPatch', patchObj);
		},
		patchTag ({rootState, dispatch},
			{id, tags, requestType} = {})
		{
			/* requestType can be:
				'tag': tag item  (default if null)
				'untag': untag item with certain tag
				'retag': delete all tags and retag new ones
			*/
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			if (id.toString().includes('tempItem')) { return; console.log('not patching temp items...'); }
			dispatch('startPatching');
			let patchObj = {};
			patchObj['tags'] = tags;
			patchObj['type'] = requestType;
			patchObj['id'] = id;
			dispatch('queueTagPatch', patchObj);
		},
		queueTagPatch ({state, dispatch}, payload = [])
		{
			payload = (Array.isArray(payload)) ? payload : [payload];
			if (!payload.length){ return }
			payload.forEach(patchRequest => state.syncStack.tags.push(patchRequest));
			if (window.bulkTagPatchQueue){ clearTimeout(window.bulkTagPatchQueue) }
		    window.bulkTagPatchQueue = setTimeout(function(){
				axios.patch(apiBaseURL+'itemtags/bulkTag', state.syncStack.tags)
				.then(function(tagResponse){
					console.log(tagResponse);
					dispatch('stopPatching');
				});
		    	state.syncStack.tags = [];
		    }.bind(dispatch), 750);
		},
		patchDueDate ({dispatch, rootState},
			{id, duedate} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			if (id.toString().includes('tempItem')) { return; console.log('not patching temp items...'); }
			duedate = (duedate == '0000-00-00 00:00:00') ? '0000-00-00 00:00:00' : new Date(duedate.replace(/-/g, "/"));
			dispatch('queueItemPatch', {id, due_date:duedate});
		},
		patchDone ({rootState, dispatch},
			{id} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			if (id.toString().includes('tempItem')) { return; console.log('not patching temp items...'); }
			let done_date;
			let done = rootState.nodes[id].done;
			if (done){
				done_date = new Date();
			} else {
				done_date = '0000-00-00 00:00:00';
			}
			dispatch('queueItemPatch', {id, done, done_date});
		},
		deleteItemApi ({rootState, dispatch, state},
			{idOrArray} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			dispatch('startPatching');
			if (!Array.isArray(idOrArray)) {
				idOrArray = [idOrArray];
			}
			let array = idOrArray.filter(id => !id.toString().includes('tempItem'));
			if (!array.length){ return }
			
			array.forEach(id => state.syncStack.deleteItems.push(id));
			if (window.bulkDeleteQueue){ clearTimeout(window.bulkDeleteQueue) }
		    window.bulkDeleteQueue = setTimeout(function(){
		    	console.log('dispatching bulkSendPatches');
				axios.patch(apiBaseURL+'items/bulkDestroy', state.syncStack.deleteItems)
				.then(function(response){
					console.log(`deleted: ${array.toString()}`);
					dispatch('stopPatching');
				});
		    	state.syncStack.deleteItems = [];
		    }.bind(dispatch), 750);
		},
		fetchAllTags ({rootState, dispatch, getters, commit})
		{
			// if (!rootState.user.user) { console.log('not Logged in'); return; }
			rootState.patching = true;
			axios.get(apiBaseURL+'allTags')
			.then(({data}) => {
				commit('updateState', { allTags:data });
				rootState.patching = false;
			});
		},
		fetchDone ({rootState, dispatch, getters, rootGetters},
			{tags, operator} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			rootState.loading = true;
			axios.get(apiBaseURL+'items/fetchdone').then(({data}) => {
				rootState.fetchedDone = true;
				console.log('fetched Done');
				if (!data.length){ 
					console.log('no done items...');
					rootState.loading = false;
					return;
				}
				
				let doneData = organizeData(data);
				Object.keys(doneData.nodes).forEach(id => {
				    itemGetters[id] = new Vue({
				        store,
				        data: {
				            item: doneData.nodes[id],
				        },
				        computed: ItemComputedProperties,
				        // hasParentWithTag: {},
				    });
				});

				// Todo, leave your knowledge somewhere on Stack Overflow:
				
				// Doesn't work:
				// 1. Directly assigning the new object inside the old:
				// rootState.nodes = Object.assign(rootState.nodes, doneData.nodes);
				// or just:
				// Object.assign(rootState.nodes, doneData.nodes);
				// 2. Assigning the new object directly:
				// let newItems = Object.assign(rootState.nodes, doneData.nodes);
				// rootState.nodes = newItems;

				// The answer:
				// let allItems = Object.assign(rootState.nodes, doneData.nodes);
				// rootState.nodes = Object.assign({}, allItems);
				// If this is the answer, I'm not sure why option 2 won't work...

				
				// console.log(Object.keys(rootState.nodes).length);
				// console.log(Object.keys(rootGetters.nodesArray).length);
				let allItems = Object.assign(rootState.nodes, doneData.nodes);
				rootState.nodes = Object.assign({}, allItems);
				// console.log(Object.keys(rootState.nodes).length);
				// console.log(Object.keys(rootGetters.nodesArray).length);
				rootState.loading = false;
			});
		},

		postNewItem ({rootState, dispatch, getters},
			{newItem, index, addNextItemAs, addTags, duplication} = {})
		{
			console.log(`posting newItem...`);
			console.log(newItem);
			if (!rootState.user.user) {
				console.log('not Logged in');
				return;
			}
			dispatch('startPatching');
			// Prepare children_order for sending to DB.
			if (newItem.children_order){
				newItem.children_order = arrayToString(newItem.children_order);
			}
			let data = newItem;

			axios.post(apiBaseURL+'items',data) //SEND
			// axios.post(apiBaseURL+'items',newItem) //SEND
			.then(function(response){ //response
				let storedItem = response.data;
				console.log('starting dom update...');
				console.log('Index: ');
				console.log(index);
				dispatch('addItem', { item:storedItem, index, addNextItemAs, addTags, duplication });
				dispatch('stopPatching');
			}, (response) => {
				rootState.patching = 'error';
				let errMsg = getters.text.flashes.ajaxError;
				Toast.create(errMsg);
			});
		},
		// UNUSED:
		patchRootChildrenOrderWithFilter ({rootState, dispatch},
			{id} = {})
		{
			if (!rootState.user.user) { console.log('not Logged in'); return; }
			if (id.toString().includes('tempItem')) { return; console.log('not patching temp items...'); }
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