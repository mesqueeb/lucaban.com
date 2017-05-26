export default class
{
constructor()
{
	this.invokeKeydownListenerPause();
	this.invokeKeyBindingListener();
}
keystroke(k)
{
	if(selection.view == 'journal' &&
		// Disable keystrokes when in the journal.
		(  k == 'arrowRight'
		|| k == 'arrowLeft'
		|| k == 'meta_arrowUp'
		|| k == 'meta_arrowDown'
		|| k == 'meta_arrowRight'
		|| k == 'meta_arrowLeft'
		|| k == 'spaceBar'
		|| k == 'tab'
		|| k == 'shift_tab'
		|| k == 't'
		|| k == 's' ))
	{
		console.log('cannot use '+k+' in journal mode');
		let errMsg = store.getters.text.flashes.cannotDoThisInJournal;
		console.log(errMsg);
		store.dispatch('sendFlash', { type:'warning', msg:errMsg });
		return;
	}
	console.log(k);
	if(k == 'arrowUp'){ store.dispatch('selectItem', { direction:'prev' }) } else
	if(k == 'arrowDown'){ store.dispatch('selectItem', { direction:'next' }) } else
	if(k == 'arrowRight'){ store.dispatch('showChildren', { action:'show' }) } else
	if(k == 'arrowLeft'){ store.dispatch('showChildren', { action:'hide' }) } else
	if(k == 'meta_arrowUp'){ store.dispatch('moveItem', { direction:'up' }) } else
	if(k == 'meta_arrowDown'){ store.dispatch('moveItem', { direction:'down' }) } else
	if(k == 'meta_arrowRight'){ store.dispatch('indent') } else
	if(k == 'meta_arrowLeft'){ store.dispatch('unindent') } else
	if(k == 'spaceBar'){ store.dispatch('markDone') } else
	if(k == 'tab'){ store.dispatch('indent') } else
	if(k == 'shift_tab'){ store.dispatch('unindent') } else
	if(k == 'enter'){ store.dispatch('showAddNewItem') } else
	if(k == 'shift_enter'){ store.dispatch('showAddNewItem', { addAs:'child' }) } else
	if(k == 'meta_enter'){ store.dispatch('startEdit') } else
	if(k == 'ctrl_u'){ store.dispatch('startEdit') } else
	if(k == 't'){ store.dispatch('setToday') } else
	if(k == 'shift_t'){ store.dispatch('startEditTags') } else
	if(k == 's'){ store.dispatch('addTimer') } else
	if(k == 'meta_shift_d'){ store.dispatch('duplicate') } else
	if(k == 'meta_backspace'){ store.dispatch('deleteItemDialogue') } else
	if(k == 'backspace'){ store.dispatch('deleteItemDialogue') } else
	if(k == 'delete'){ store.dispatch('deleteItemDialogue') }
}
invokeKeydownListenerPause()
{
	//Codementor: crappy hack down here.
	window.keydownListenerPaused = false;
	window.preventKeydownListener = function(){
		console.log('preventing keydown listener');
		window.keydownListenerPaused = true;
		setTimeout(function(){ window.keydownListenerPaused = false; }.bind(this), 500);
	};
}
invokeKeyBindingListener()
{
	let self = this;
	window.addEventListener('keydown', function(e){
		if (keydownListenerPaused)
		{ 
			// console.log('keydownListenerPaused'); 
			return;
		}
        let x = e.keyCode;
       	if(document.activeElement.className == "flatpickr-days")
       	{
			if(x == 9)
			{ // Tab
				console.log('hiya!');
				e.preventDefault();
				return;
				// This stops the event listener when a flatpickr dialogue is open.
			}
		}
    	if (store.state.popouts.delete.length || store.state.popouts.timer.length)
    	{
    		if(x == 27)
    		{ // escape
				e.preventDefault();
				eventHub.$emit('clearAll');
				console.log('Escape');
			}
			if(x == 9)
			{ // TAB
				e.preventDefault();
				if (e.shiftKey)
				{
					$(".btn-cancel").focus();
				} else {
					$(".btn-ok").focus();
				}
	  		}
			if(x == 37)
			{ // arrow left
				e.preventDefault();
				$(".btn-cancel").focus();
			}
			if(x == 39)
			{ // arrow right
				e.preventDefault();
				$(".btn-ok").focus();
			}
		}
		else if(vm.editingItem || vm.addingNewUnder || vm.editingItemTags)
		{
			if(document.activeElement.nodeName != 'BUTTON')
			{
				return;
		    }
			if(e.keyCode == 27)
			{ // Escape
				if(vm.editingItem)
				{
					vm.cancelEdit();
					console.log('escapeOnEditButtonFocus');
				}
				else if(vm.addingNewUnder)
				{
					vm.cancelAddNew();
					console.log('escapeOnNewButtonFocus');
				}
			}
		}
		else if ( document.activeElement.nodeName == 'INPUT'
        	   || document.activeElement.nodeName == 'TEXTAREA'
        	   || document.activeElement.nodeName == 'A'
        	   || document.activeElement.nodeName == 'BUTTON' )
		{
			console.log('inputs or buttons are focussed!');
        	return;
		}
		else
		{ 
			// console.log('keydown event: NO inputs or buttons are focussed!');
		  // INPUT AREAS NOT IN FOCUS
          switch(e.keyCode)
          { 
			case 37: // arrowLeft
				e.preventDefault();
				if (e.ctrlKey || e.metaKey)
				{
		  			self.keystroke('meta_arrowLeft');
		  			break;
		  		}
				self.keystroke('arrowLeft');
				break;
			case 39: // arrowRight
				e.preventDefault();
				if (e.ctrlKey || e.metaKey)
				{
		  			self.keystroke('meta_arrowRight');
		  			break;
		  		}
				self.keystroke('arrowRight');
				break;
			case 38: // arrowUp
				e.preventDefault();
				if (e.ctrlKey || e.metaKey)
				{
		  			self.keystroke('meta_arrowUp');
		  			break;
		  		}
				self.keystroke('arrowUp');
				break;
			case 40: // arrowDown
				e.preventDefault();
				if (e.ctrlKey || e.metaKey)
				{
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
				if (e.shiftKey)
				{
		  			self.keystroke('shift_tab');
		  			break;
		  		}
				self.keystroke('tab');
				break;
			case 13: // enter
				e.preventDefault();
				if (e.ctrlKey || e.metaKey)
				{
		  			self.keystroke('meta_enter');
		  		} else if (e.shiftKey)
		  		{
					self.keystroke('shift_enter');
		  		} else {
					self.keystroke('enter');
		  		}
				break;
			case 84: // key t
				e.preventDefault();
				if (e.ctrlKey || e.metaKey || e.shiftKey)
				{
		  			self.keystroke('shift_t');
		  		} else {
					self.keystroke('t');
		  		}
				break;
			case 83: // key s
				self.keystroke('s');
				break;
			case 85: // key u
				if (e.ctrlKey)
				{
					self.keystroke('ctrl_u');
		  			break;
		  		}
				self.keystroke('u');
				break;
			case 68: // key d
				e.preventDefault();
				if ((e.ctrlKey || e.metaKey) && e.shiftKey)
				{
					self.keystroke('meta_shift_d');
		  			break;
		  		}
				break;
			case 8: // DELETE (backspace)
				e.preventDefault();
				if (e.ctrlKey || e.metaKey)
				{
					self.keystroke('meta_backspace');
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

}// END default CLASS