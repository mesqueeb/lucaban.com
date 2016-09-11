<template id="items-card-template">
	<div class="items-card" id="card-{{ item.id }}">
		<div 
			class="item-card"
			v-if="item.depth != 0"
			:class="{
				done: item.done,
				show_children: item.show_children,
				editing: item.id == this.$root.editingItem,
			}"
		>
			<div class="toggle-div">
				<input class="toggle"
					type="checkbox"
					v-if="item.children_order.length==0 || item.done == true"
					v-model="item.done"
					@change="updateDone(item.id)"
				>
				<input type="checkbox"
					class="styled-check"
					id="show_children_{{item.id}}"
					v-model="item.show_children"
					@change="updateShowChildren(item.id)"
				>
				<label class="arrow"
					for="show_children_{{item.id}}"
					v-if="item.children_order.length>0"
				></label>

				<!-- <input class="show_children_toggle"
					id="show_children_{{item.id}}"
					type="checkbox"
					v-if="item.children_order.length>0"
					v-model="item.show_children"
					@change="updateShowChildren(item.id)"
				>
				<label class="show_children_svg" 
					for="show_children_{{item.id}}">
					//// This label is not yet used!
				</label> -->
			</div>
			<div class="body-div"
				:class="{ selected: item.id == this.$root.selection.selectedId, }"
				@dblclick="startEdit(item)"
				@click="selectItem(item)"
				@enter="console.log('yarrr')"
			>
				<span class="bodybox"
					v-show="item.id != this.$root.editingItem"
				>{{ item.body }}</span>
				<!-- For debugging: -->
				<span v-show="false"> ({{item.id}}) D-{{item.depth}}) [{{item.children_order}}]</span>
				
				<form action="update"
					class="updatebox"
					v-show="item.id == this.$root.editingItem"
					@submit.prevent="doneEdit(item)"
				>
					<textarea name="item_body"
						rows="{{ item.rows }}"
						v-model="item.body"
						v-autosize="item.body"
						v-item-focus="item.id == this.$root.editingItem"
						@blur="blurOnEdit(item)"
						@keyup.esc="cancelEdit(item)"
						@keydown.tab="tabOnFirstInput"
						@keydown="keydownOnEdit"
					>{{ item.body }}</textarea>
					<span>
						<label for="planned_time">duration:</label>
						<input name="planned_time"
							type="number"
							v-model="item.planned_time"
							@blur="blurOnEdit(item)"
							@keyup.esc="cancelEdit(item)"
							@keydown.tab="tabOnLastInput"
							@keydown="keydownOnEdit"
						/>
					</span>
				</form>
				<div class="item-tags"
					v-show="this.$root.editingItem != item.id"
				>
					<span v-if="item.done" class="done">
						Done {{ item.done_date | momentCalendar }}
					</span>
					
					<span v-if="hasTotalTime && !item.done" class="total-duration">
						Total {{ calcTotalTime }} min
					</span>

					<span v-if="(hasPlannedTime || hasUsedTime) && !item.done" class="duration">
						<span v-if="hasUsedTime">Used {{ item.used_time | hourminsec }}</span>
						<span v-if="(hasPlannedTime && hasUsedTime)">/</span>
						<span v-if="hasPlannedTime">
							{{ item.planned_time | hourmin }}
						</span>
					</span>
						
					<span v-if="hasDueDate && !item.done" class="duedate">
						{{ item.due_date | momentCalendar }}
					</span>

					<span v-if="item.dueDateParent && !item.done" class="duedate-parent">
						{{ item.dueDateParent | momentCalendar }}
					</span>

				</div>
				<div class="item-nav"
					v-if="this.$root.editingItem != item.id && this.$root.selection.selectedId == item.id"
				>
					
					<button class="timer"
						@click="addTimer(item)"
					><i class="zmdi zmdi-timer"></i>
					</button>
					<!--
					- font icon / woff format [font awesome]
					  material design iconic fonts
					- add svg as background to button
					- or image tag inside button
					- svg tag -> add as pattern
					-->
					<button class="delete" 
						v-if="item.children_order.length==0"
						@click="deleteItem(item)"
					><i class="zmdi zmdi-delete"></i>
					</button>
				</div>
			</div>
		</div>

		<form 
			:class="['addnewbox-firstchild']"
			id="new-firstchild-of-{{ item.id }}"
			v-if="showAddNewBoxFirstChild"
			@submit.prevent
		>
			<textarea type="text"
				class="add-item"
				name="body"
				v-model="newItem.body"
				v-autosize="newItem.body"
				@blur="blurOnAddNew(item)"
				@keydown.tab="tabOnFirstInputNew"
				@keydown="keydownOnNew"
				placeholder="..."
				autocomplete="off"
				autofocus 
				rows="1"
			></textarea>
			<span>
				<label for="planned_time">duration:</label>
				<input name="planned_time"
					type="number"
					v-model="newItem.planned_time"
					@blur="blurOnAddNew(item)"
					@keydown="keydownOnNew"
				/>
			</span>
		</form>


		<div class="children"
			v-if="item.children"
			v-show="item.show_children"
		>
			<Card v-for="childCard in item.children"
				:item="childCard"
			></Card>
		</div>

		<form 
			:class="['addnewbox', this.newItem.as]"
			id="new-under-{{ item.id }}"
			v-if="showAddNewBox"
			@submit.prevent
		>
			<textarea type="text"
				class="add-item"
				name="body"
				v-model="newItem.body"
				v-autosize="newItem.body"
				@blur="blurOnAddNew(item)"
				@keydown.tab="tabOnFirstInputNew"
				@keydown="keydownOnNew"
				placeholder="..."
				autocomplete="off"
				autofocus 
				rows="1"
			></textarea>
			<span>
				<label for="planned_time">duration:</label>
				<input name="planned_time"
					type="number"
					v-model="newItem.planned_time"
					@blur="blurOnAddNew(item)"
					@keydown.tab="tabOnLastInputNew"
					@keydown="keydownOnNew"
				/>
			</span>
		</form>
	</div>
</template>


<script>

export default {
	name: 'Card',
	template:'#items-card-template',
	created(){
	},
	ready(){
	},
	props: ['item'],
	data: function(){
		return {
			newItem: {
				as: 'sibling',
				body: '',
				planned_time:0,
				parent_id: (this.item.parent_id) ? this.item.parent_id : allItems.root.id,
				depth: (this.item.depth == 0) ? 1 : this.item.depth,
			},
		};
	},
	computed: {
		siblingIndex(){ return allItems.siblingIndex(this.item.id); },
		olderSiblingId(){ return allItems.olderSiblingId(this.item.id); },
		parentsChildren_order(){
			let pId = this.item.parent_id;
			if(this.item.depth == 0){ return allItems.nodes[this.item.id].children_order; }
			return allItems.nodes[pId].children_order;
		},
		showAddNewBox(){
			if((this.$root.addingNewUnder == this.item.id && !this.$root.addingNewAsFirstChild) || (this.item.depth == 0 && allItems.root.children_order.length == 0)){
				return true;
			} else { return false; }
		},
		showAddNewBoxFirstChild(){
			if(this.$root.addingNewUnder == this.item.id && this.$root.addingNewAsFirstChild){
				return true;
			} else { return false; }
		},
		calcTotalTime(){
			// let a = allItems.calculateDuration(this.item);
			// return a.totalTime;
			// console.log("runCalc");
			// if(this.$children.length === 0){
			// 	return this.item.planned_time ? this.item.planned_time : 0;
			// } else {
			// 	return this.$children.reduce(function(prev,curr){
			// 		return prev+ curr.calcTotalTime
			// 	},0)
			// }
		},
		hasDueDate(){
		    return (this.item.due_date && this.item.due_date != '0000-00-00 00:00:00');
		},
		hasDoneDate(){
		    return (this.item.done_date && this.item.done_date != '0000-00-00 00:00:00');
		},
		// hasTotalTime(){
		//     return (this.item.children_order.length && this.calcTotalTime != '0' && this.item.planned_time != this.calcTotalTime);
		// },
		hasPlannedTime(){
		    return (this.item.planned_time && this.item.planned_time != '0');
		},
		hasUsedTime(){
		    return (this.item.used_time && this.item.used_time != '0');
		},
	},
	methods: {
		addTimer(item){
			this.$root.timerItems.push(item);
			this.$root.playTimer(item);
		},
		selectItem(item){
			selection.selectedId = item.id;
		},
		enterOnNew(e) {
	    },
		keydownOnNew(e) {
			// console.log('run keydownOnNew:');
			// console.log(e);
			// ENTER
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey) {
	        	e.preventDefault();
			  	if(!this.newItem.body){ return; }
			  	this.addNew();
			}
			// ArrowUp or ArrowDown or Esc
			if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 27) {
				if (!this.newItem.body) {
		        	e.preventDefault();
		        	this.cancelAddNew();
				}
			}
	    },
		keydownOnEdit(e) {
			// Enter
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey) {
	        	e.preventDefault();
				this.doneEdit();
			}
	    },
	    tabOnFirstInput(e){
			// Tab
			if (e.keyCode === 9 && e.shiftKey) {
	        	e.preventDefault();
	        	return;
			}
	    },
	    tabOnLastInput(e){
			// Tab
			if (e.keyCode === 9 && !e.shiftKey) {
	        	e.preventDefault();
	        	return;
			}
	    },
	    tabOnFirstInputNew(e){
			// Tab
			if (e.keyCode === 9 && e.shiftKey) {
	        	e.preventDefault();
	        	if (this.newItem.depth == 1){ return; }
	        	vm.$root.showAddNewItem(this.item.parent_id);
	        	return;
			}
	    },
	    tabOnLastInputNew(e){
			// Tab
			if (e.keyCode === 9 && !e.shiftKey) {
	        	e.preventDefault();
	        	let lastChild = allItems.getLastChildId(this.item.id);
	        	if (lastChild){
	        		console.log("tab -- parent's lastChild: "+lastChild);
	        		vm.$root.showAddNewItem(lastChild);
	        	} else {
					if (this.newItem.as == 'child'){ return; }
					this.newItem.depth++;
	        		this.newItem.parent_id = this.item.id;
	        		this.newItem.as = 'child';
	        		$("#new-under-"+this.item.id+" textarea").focus();
	        	}
        		return;
			}
	    },
	    blurOnEdit(item) {
	    	let component = this;
	    	setTimeout(function(){
		    	if ( $('.updatebox input:focus').length > 0 ||  $('.updatebox textarea:focus').length > 0 ) {
	        		return;
				}　else {
					component.doneEdit(item);
				}
	    	},20);
	    	// Codementor: is there any better way than this?
	    },
	    blurOnAddNew(item) {
	    	let component = this;
	    	setTimeout(function(){
		    	if ( $('.addnewbox input:focus').length > 0 ||  $('.addnewbox textarea:focus').length > 0 ) {
	        		return;
				}　else {
					component.cancelAddNew();
				}
	    	},20);
	    },
		updateDone(id){
			allItems.prepareDonePatch(id);
		},
		updateShowChildren(id){
			allItems.patchShowChildren(id);
		},
		startEdit(item){
			console.log('startEdit');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			console.log(item);
			this.$root.beforeEditCache_body = item.body;
			this.$root.beforeEditCache_planned_time = item.planned_time;
			this.$root.editingItem = item.id;
		},
		doneEdit(item) {
			item = (item) ? item : allItems.nodes[selection.selectedId];
			if (!this.$root.editingItem) {
				return;
			}
			this.$root.editingItem = null;
			item.body = item.body.trim();
			if (!item.body) {
				this.deleteItem(item);
			}
			let id = item.id;
			let body = item.body;
			let planned_time = item.planned_time;
			this.$http.patch('/api/items/' + id, { body: body, planned_time: planned_time }, { method: 'PATCH'});
		},
		cancelEdit(item) {
			this.$root.editingItem = null;
			console.log("cancel edit. Reverting to:");
			console.log(this.$root.beforeEditCache_body);
			item.body = this.$root.beforeEditCache_body;
			item.planned_time = this.$root.beforeEditCache_planned_time;
		},
		deleteItem(item){
			let id = item.id;
			if (confirm("Do you really want to delete: "+item.body) == false) {
		        return;
		    }
			allItems.deleteItem(id);
			this.$http.delete('/api/items/' + id);
		},
		addNew(){
			console.log('sending newItem:');
			console.log(this.newItem);
			this.$http.post('/api/items',this.newItem) //SEND
			.then(function(response){ //response
				this.newItem.body = '';
				let storedItem = response.data;
				console.log('starting dom update...');
				let OlderSiblingIndex = this.siblingIndex;
				let index = OlderSiblingIndex+1;
				allItems.addItem(storedItem, index);
			});
		},
		cancelAddNew(lastSelectedId){
			this.newItem.body = '';
			this.$root.addingNewUnder = null;
			console.log('sid: '+selection.selectedId);
			selection.selectedId = selection.lastSelectedId;
			console.log('sid: '+selection.selectedId);
			// Reset newItem to sibling stance.
			this.newItem.as = 'sibling';
       		this.newItem.parent_id = (this.item.parent_id) ? this.item.parent_id : allItems.root.id;
			this.newItem.depth = (this.item.depth == 0) ? 1 : this.item.depth;
			
			$(':focus').blur();
		},
	},
	events: {
    	startEdit() { this.startEdit(); },
	},
	directives: {
		'item-focus': function (value) {
			if (!value) {
				return;
			}
			let el = this.el;
			Vue.nextTick(function () {
				el.focus();
			});
		}
	},
	http: {
		root: '/root',
		headers: {
			'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value'),
		},
    },
}
</script>