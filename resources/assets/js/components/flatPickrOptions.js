// problem with exporting:
// Cannot find "openFlatPickr = null;"
// because of the IIFE on top lvl.

export default {
	openFlatPickr: null,
	dateFormat: 'Y-m-d H:i:S',
	maxDate: 'today',
	enableTime: true,
	time_24hr: true,
	onValueUpdate : null,
	onOpen(dateObj, dateStr, instance){
		console.log(instance);
		if(!vm.$root.beforeEditCache_doneDate){
			vm.$root.beforeEditCache_doneDate = {};
		}
		let elId = instance.element.id;
		let id = elId.replace('done-date-edit-', '');
		id = id.replace('-popup', '');
		console.log('opening for '+id);
		vm.$root.beforeEditCache_doneDate[id] = dateStr;
		this.openFlatPickr = instance;
	},
	onClose: function(dateObj, dateStr, instance){
		let elId = instance.element.id;
		let id = elId.replace('done-date-edit-', '');
		id = id.replace('-popup', '');
		console.log('vm.$root.beforeEditCache_doneDate[id] = '+vm.$root.beforeEditCache_doneDate[id]);
		if (vm.$root.beforeEditCache_doneDate[id] == dateStr){ return; }
		console.log('patching done_date of: '+id)
		vm.patch(id, 'done_date');
		delete vm.$root.beforeEditCache_doneDate[id];
		console.log('flatPicker on close');
		this.openFlatPickr = null;
	},
}