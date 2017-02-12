export default class
{
constructor()
{
	let self = this;
	window.addEventListener('keydown', function(e) {
        let x = e.keyCode;
       	if(document.activeElement.className == "flatpickr-days"){
			if(x == 9){
				console.log('hiya!');
				e.preventDefault();
				return;
				// This stops the event listener when a flatpickr dialogue is open.
			}
		}
    	if (vm.popouts.delete.length || vm.popouts.timer.length){
    		if(x == 27) { // escape
				e.preventDefault();
				eventHub.$emit('clearAll');
				console.log('Escape');
			}
			if(x == 9){ // TAB
				e.preventDefault();
				if (e.shiftKey){
					$(".btn-cancel").focus();
				} else {
					$(".btn-ok").focus();
				}
	  		}
			if(x == 37){ // arrow left
				e.preventDefault();
				$(".btn-cancel").focus();
			}
			if(x == 39){ // arrow right
				e.preventDefault();
				$(".btn-ok").focus();
			}
		} else if(vm.editingItem || vm.addingNewUnder){
			if(document.activeElement.nodeName != 'BUTTON'){
				return;
		    }
			if(e.keyCode == 27){ // Escape
				if(vm.editingItem)
				{
					eventHub.$emit('escapeOnEditButtonFocus');
				}
				else if(vm.addingNewUnder)
				{
					eventHub.$emit('escapeOnNewButtonFocus');
				}
			}
		}
		else if ( 
			document.activeElement.nodeType == 'INPUT'
        	|| document.activeElement.nodeType == 'TEXTAREA'
        	|| document.activeElement.nodeType == 'A'
        	|| document.activeElement.nodeType == 'BUTTON' )
		{
        	return;
		}
		else
		{ 
		  // INPUT AREAS NOT IN FOCUS
          switch(e.keyCode) { 
			case 37: // arrowLeft
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
		  			self.keystroke('meta_arrowLeft');
		  			break;
		  		}
				self.keystroke('arrowLeft');
				break;
			case 39: // arrowRight
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
		  			self.keystroke('meta_arrowRight');
		  			break;
		  		}
				self.keystroke('arrowRight');
				break;
			case 38: // arrowUp
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
		  			self.keystroke('meta_arrowUp');
		  			break;
		  		}
				self.keystroke('arrowUp');
				break;
			case 40: // arrowDown
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
		  			self.keystroke('meta_arrowDown');
		  			break;
		  		}
				self.keystroke('arrowDown');
				break;
			case 32: // spaceBar
				e.preventDefault();
				self.keystroke('spaceBar');
				break;
			case 9: // tab
				e.preventDefault();
				if (e.shiftKey){
		  			self.keystroke('shift_tab');
		  			break;
		  		}
				self.keystroke('tab');
				break;
			case 13: // enter
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
		  			self.keystroke('meta_enter');
		  		} else if (e.shiftKey) {
					self.keystroke('shift_enter');
		  		} else {
					self.keystroke('enter');
		  		}
				break;
			case 84: // key t
				e.preventDefault();
				if (e.ctrlKey || e.metaKey || e.shiftKey){
		  			self.keystroke('shift_t');
		  		} else {
					self.keystroke('t');
		  		}
				break;
			case 83: // key s
				self.keystroke('s');
				break;
			case 85: // key u
				if (e.ctrlKey){
					self.keystroke('ctrl_u');
		  			break;
		  		}
				self.keystroke('u');
				break;
			case 68: // key d
				e.preventDefault();
				if ((e.ctrlKey || e.metaKey) && e.shiftKey){
					self.keystroke('meta_shift_d');
		  			break;
		  		}
				break;
			case 8: // DELETE (backspace)
				e.preventDefault();
				if (e.ctrlKey || e.metaKey){
					self.keystroke('meta_delete');
		  			break;
		  		}
				self.keystroke('backspace');
				break;
			case 46: // DELETE (real delete)
				e.preventDefault();
				self.keystroke('delete');
				break;
          } // end switch
    	} // END INPUT AREAS NOT IN FOCUS
    });
}
keystroke(k)
{
	if(selection.view == 'journal' && (
		// Disable keystrokes when in the journal.
		k == 'arrowRight' ||
		k == 'arrowLeft' ||
		k == 'meta_arrowUp' ||
		k == 'meta_arrowDown' ||
		k == 'meta_arrowRight' ||
		k == 'meta_arrowLeft' ||
		k == 'spaceBar' ||
		k == 'tab' ||
		k == 'shift_tab' ||
		k == 't' ||
		k == 's' ))
	{
		console.log('cannot use '+k+' in journal mode');
		return;
	}
	console.log(k);
	if(k == 'arrowUp'){ vm.selectItem('prev')} else
	if(k == 'arrowDown'){ vm.selectItem('next')} else
	if(k == 'arrowRight'){ vm.showChildren(null, 'show')} else
	if(k == 'arrowLeft'){ vm.showChildren(null, 'hide')} else
	if(k == 'meta_arrowUp'){ vm.moveItem('up')} else
	if(k == 'meta_arrowDown'){ vm.moveItem('down')} else
	if(k == 'meta_arrowRight'){ vm.indent()} else
	if(k == 'meta_arrowLeft'){ vm.unindent()} else
	if(k == 'spaceBar'){ vm.markDone()} else
	if(k == 'tab'){ vm.indent()} else
	if(k == 'shift_tab'){ vm.unindent()} else
	if(k == 'enter'){ vm.showAddNewItem()} else
	if(k == 'shift_enter'){ vm.showAddNewItem(null, 'child')} else
	if(k == 'meta_enter'){ eventHub.$emit('startEdit')} else
	if(k == 'ctrl_u'){ eventHub.$emit('startEdit')} else
	if(k == 't'){ vm.setToday()} else
	if(k == 'shift_t'){ vm.startEditTags()} else
	if(k == 's'){ vm.addTimer()} else
	if(k == 'meta_shift_d'){ vm.duplicate()} else
	if(k == 'meta_delete'){ vm.deleteItem()} else
	if(k == 'backspace'){ vm.deleteItem()} else
	if(k == 'delete'){ vm.deleteItem()}
}

}// END default CLASS