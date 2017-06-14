
export default {
	dateFormat: 'Y-m-d H:i:S',
	maxDate: 'today',
	// enableTime: true,
	time_24hr: true,
	onOpen(dateObj, dateStr, instance)
	{
		// console.log(instance);
		let id = instance.element.name;
		if(!store.state.beforeEditCache_doneDate){
			store.state.beforeEditCache_doneDate = {};
		}
		console.log('flatPickr[onOpen] id: '+id+'.    dateStr: '+dateStr);
		store.state.beforeEditCache_doneDate[id] = dateStr;
	},
	onClose(dateObj, dateStr, instance)
	{
		let id = instance.element.name;
		console.log('flatPickr[onClose] id: '+id+'.    dateStr: '+dateStr);
		console.log('store.state.beforeEditCache_doneDate[id] = '+store.state.beforeEditCache_doneDate[id]);
		if (store.state.beforeEditCache_doneDate[id] == dateStr){ return; }
		store.dispatch('patch', { id, field:'done_date', value:dateStr });
		delete store.state.beforeEditCache_doneDate[id];
	},
}