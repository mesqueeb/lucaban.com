// problem with exporting:
// Cannot find "openFlatPickr = null;"
// because of the IIFE on top lvl.

export default {
	dateFormat: 'Y-m-d H:i:S',
	maxDate: 'today',
	enableTime: true,
	time_24hr: true,
	onOpen(dateObj, dateStr, instance){
		if(!vm.$root.beforeEditCache_doneDate){
			vm.$root.beforeEditCache_doneDate = {};
		}
		let elId = instance.element.id;
		let id = elId.replace('done-date-edit-', '');
		console.log('opening for '+id);
		id = id.replace('-popup', '');
		vm.$root.beforeEditCache_doneDate[id] = dateStr;
		openFlatPickr = instance;
	},
	onChange: function(dateObj, dateStr, instance){
		let el = instance.element.id;
		instance.element.focus();
		console.log('flatPicker on change');
	},
	onClose: function(dateObj, dateStr, instance){
		let elId = instance.element.id;
		let id = elId.replace('done-date-edit-', '');
		id = id.replace('-popup', '');
		console.log('vm.$root.beforeEditCache_doneDate[id] = '+vm.$root.beforeEditCache_doneDate[id]);
		// This doesn't even work...
		if (vm.$root.beforeEditCache_doneDate[id] == dateStr){ return; }
		console.log('patching: '+id)
		vm.patch(id, 'done_date');
		delete vm.$root.beforeEditCache_doneDate[id];
		console.log('flatPicker on close');
		openFlatPickr = null;
	},
}