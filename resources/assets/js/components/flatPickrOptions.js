
export default {
	dateFormat: 'Y-m-d H:i:S',
	maxDate: 'today',
	// enableTime: true,
	time_24hr: true,
	onOpen(dateObj, dateStr, instance)
	{
		// console.log(instance);
		let id = instance.element.name;
		if(!vm.$root.beforeEditCache_doneDate){
			vm.$root.beforeEditCache_doneDate = {};
		}
		console.log('flatPickr[onOpen] id: '+id+'.    dateStr: '+dateStr);
		vm.$root.beforeEditCache_doneDate[id] = dateStr;
	},
	onClose(dateObj, dateStr, instance)
	{
		let id = instance.element.name;
		console.log('flatPickr[onClose] id: '+id+'.    dateStr: '+dateStr);
		console.log('vm.$root.beforeEditCache_doneDate[id] = '+vm.$root.beforeEditCache_doneDate[id]);
		if (vm.$root.beforeEditCache_doneDate[id] == dateStr){ return; }
		vm.patch(id, 'done_date', dateStr);
		delete vm.$root.beforeEditCache_doneDate[id];
	},
}