<template id="items-card-template">
	<div class="items-card"
		:id="'card-'+item.id"
	>
		<div 
			v-if="item.depth != 0"
			class="item-card"
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
					:id="'show_children_'+item.id"
					v-model="item.show_children"
					@change="updateShowChildren(item.id)"
				>
				<label class="arrow"
					:for="'show_children_'+item.id"
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
			<div class="body-div textarea-wrap"
				:class="{ selected: item.id == this.$root.selection.selectedId, project: isProject}"
				@dblclick="startEdit(item, $event)"
				@click="selectItem(item)"
				@enter="console.log('yarrr')"
			>
				<div class="bodybox"
					v-show="item.id != this.$root.editingItem"
				>{{{ item.body | linkify }}}</div>
				<!-- <div class="hidden-sizer">{{item.body + "|"}}</div> -->
				
				<!-- For debugging: -->
				<span v-show="false"> ({{item.id}}) D-{{item.depth}}) [{{item.children_order}}]</span>
				
				<form action="update"
					class="updatebox"
					:id="'updatebox-'+item.id"
					v-show="item.id == this.$root.editingItem"
					@submit.prevent="doneEdit(item)"
				>
					<div class="update-body">
						<textarea name="item_body"
							:rows="item.rows"
							v-model="item.body"
							v-autosize="item.body"
							v-item-focus="item.id == this.$root.editingItem"
							@blur="blurOnEdit(item)"
							@keyup.esc="cancelEdit(item)"
							@keydown.tab="tabOnFirstInput"
							@keydown="keydownOnEdit"
						>{{ item.body }}</textarea>
					</div>
					<div class="update-tags">
						<div class="update-planned-time">
							Duration:
							<button
								:class="{ currentDuration: item.planned_time == 10 }"
								@click.prevent="setPlannedTime(item, 10, $event)"
								@blur="blurOnEdit(item)"
							>10 min</button>
							<button
								:class="{ currentDuration: item.planned_time == 15 }"
								@click.prevent="setPlannedTime(item, 15, $event)"
								@blur="blurOnEdit(item)"
							>15 min</button>
							<button
								:class="{ currentDuration: item.planned_time == 30 }"
								@click.prevent="setPlannedTime(item, 30, $event)"
								@blur="blurOnEdit(item)"
							>30 min</button>
							<button
								:class="{ currentDuration: item.planned_time == 60 }"
								@click.prevent="setPlannedTime(item, 60, $event)"
								@blur="blurOnEdit(item)"
							>1 hour</button>
							<input name="planned_time"
								type="number"
								v-show="false"
								v-model="item.planned_time"
								@blur="blurOnEdit(item)"
								@keyup.esc="cancelEdit(item)"
								@keydown="keydownOnEdit"
							/>
						</div>
						<div class="update-custom-tags">
							<label>
								Add Tag: 
								<input type="text"
									name="add_tag"
									class="add-tag"
									@blur="blurOnEdit(item)"
									v-model="newTag"
									@keyup.esc="cancelEdit(item)"
									@keydown.tab="tabOnLastInput"
									@keydown.enter.prevent="enterOnAddTag(item, 'editItem', $event)"
								>
							</label>
							<div class="tag-suggestions" v-if="false">
							<!-- UNDER CONSTRUCTION -->
								<label v-for="tag in allTags_c"
									:class="'tag'"
									@click="this.$root.patchTag(item.id, tag)"
								>{{ tag.name }}
								</label>
							</div>
						</div>
					</div>
				</form>
				<div class="item-tags">
					<label class="done"
						v-if="item.done && item.id != this.$root.editingDoneDateItem"
					>Done {{ item.done_date | momentCalendar }}
						<input class="flatpickr"
							id="done-date-edit-{{ item.id }}"
							v-model="item.done_date"
						>
					</label>
					
					<span v-if="(hasTotalUsedTime || hasTotalPlannedTime) && !item.done" class="total-duration">
						<span>Total </span>
						<span v-if="hasTotalUsedTime"> used {{ item.totalUsedTime | hourminsec }}</span>
						<span v-if="(hasTotalUsedTime && hasTotalPlannedTime)">/</span>
						<span v-if="hasTotalPlannedTime">{{ item.totalPlannedTime | hourmin }}</span>
 					</span>

					<span v-if="
						(item.id != this.$root.editingItem || hasUsedTime)
						&& (hasPlannedTime || hasUsedTime)
						&& !item.done" class="duration"
					>
						<span v-if="hasUsedTime">Used {{ item.used_time | hourminsec }}</span>
						<span v-if="(hasPlannedTime && hasUsedTime)">/</span>
						<span v-if="hasPlannedTime">{{ item.planned_time | hourmin }}</span>
					</span>
					
					<span v-if="hasDueDate && !item.done"
						class="duedate"
					>{{ item.due_date | momentCalendar }}</span>

					<span v-if="item.dueDateParent && !item.done"
						class="duedate-parent"
					>{{ item.dueDateParent | momentCalendar }}</span>

					<span v-if="item.tagged.length && !item.done"
						class="custom-tag"
						v-for="tag in item.tagged"
					>{{ tag.tag_name }}
						<button class="delete-tag"
							v-if="item.id == this.$root.editingItem"
							@click.prevent="deleteTag(item.id, tag.tag_name, $event)"
						>
							<i class="zmdi zmdi-close-circle"></i>
						</button>
					</span>

				</div>
				<div class="item-nav"
					v-if="this.$root.editingItem != item.id && this.$root.selection.selectedId == item.id"
				>
					
					<button v-if="!item.done"
						class="timer"
						@click="addTimer(item)"
					><i class="zmdi zmdi-timer"></i>
					</button>
					<button v-if="item.done"
						class="more"
						@click="this.$root.popup(item.id, 'afterDone')"
					><i class="zmdi zmdi-more"></i>
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
			:class="['addnewbox-firstchild', 'addnewbox', 'child']"
			:id="'new-firstchild-of-'+item.id"
			v-if="showAddNewBoxFirstChild"
			@submit.prevent
		>
			<div>
				<textarea type="text"
					class="add-item"
					name="body"
					v-model="newItem.body"
					v-autosize="newItem.body"
					@blur="blurOnAddNew(item)"
					@keydown="keydownOnNew"
					placeholder="..."
					autocomplete="off"
					autofocus 
					rows="1"
				></textarea>
			</div>
			<div class="update-tags">
				<div class="update-planned-time">
					Duration:
					<button
						:class="{ currentDuration: newItem.planned_time == 10 }"
						@click.prevent="setPlannedTimeNewItem(item, 10, $event)"
						@blur="blurOnAddNew(item)"
					>10 min</button>
					<button
						:class="{ currentDuration: newItem.planned_time == 15 }"
						@click.prevent="setPlannedTimeNewItem(item, 15, $event)"
						@blur="blurOnAddNew(item)"
					>15 min</button>
					<button
						:class="{ currentDuration: newItem.planned_time == 30 }"
						@click.prevent="setPlannedTimeNewItem(item, 30, $event)"
						@blur="blurOnAddNew(item)"
					>30 min</button>
					<button
						:class="{ currentDuration: newItem.planned_time == 60 }"
						@click.prevent="setPlannedTimeNewItem(item, 60, $event)"
						@blur="blurOnAddNew(item)"
					>1 hour</button>
					<input name="planned_time"
						type="number"
						v-show="false"
						v-model="newItem.planned_time"
						@blur="blurOnAddNew(item)"
						@keydown="keydownOnNew"
					/>
				</div>
				<div class="update-custom-tags">
					<label>
						Add Tag: 
						<input type="text"
							class="prepare-tag"
							name="add_tag"
							@keydown="keydownOnNew"
							@blur="blurOnAddNew(item)"
							v-model="newTag"
							@keydown.enter.prevent="enterOnAddTag(item, 'newItem', $event)"
						>
					</label>
				</div>
				<div class="item-tags prepared-tags">
					<span v-if="newItem.preparedTags.length"
						v-for="tag in newItem.preparedTags"
						:class="(tag=='Today') ? 'duedate' : 'custom-tag'"
					>{{ tag }}
						<button class="delete-tag"
							@click.prevent="deletePreparedTag(tag, item)"
						>
							<i class="zmdi zmdi-close-circle"></i>
						</button>
					</span>
				</div>
			</div>
		</form>


		<div class="children"
			v-if="item.children"
			v-show="item.show_children"
		>
			<Card v-for="childCard in item.children"
				:item="childCard"
				:key="childCard.id"
			></Card>
		</div>

		<form 
			:class="{addnewbox: true, child: this.$root.addingNewAsChild}"
			:id="'new-under-'+ item.id "
			v-if="showAddNewBox"
			@submit.prevent
		>
			<div>
				<textarea type="text"
					class="add-item"
					name="body"
					v-model="newItem.body"
					v-autosize="newItem.body"
					@blur="blurOnAddNew(item)"
					@keydown="keydownOnNew"
					placeholder="..."
					autocomplete="off"
					autofocus 
					rows="1"
				></textarea>
			</div>
			<div class="update-tags">
				<div class="update-planned-time">
					Duration:
					<button
						:class="{ currentDuration: newItem.planned_time == 10 }"
						@click.prevent="setPlannedTimeNewItem(item, 10, $event)"
						@blur="blurOnAddNew(item)"
					>10 min</button>
					<button
						:class="{ currentDuration: newItem.planned_time == 15 }"
						@click.prevent="setPlannedTimeNewItem(item, 15, $event)"
						@blur="blurOnAddNew(item)"
					>15 min</button>
					<button
						:class="{ currentDuration: newItem.planned_time == 30 }"
						@click.prevent="setPlannedTimeNewItem(item, 30, $event)"
						@blur="blurOnAddNew(item)"
					>30 min</button>
					<button
						:class="{ currentDuration: newItem.planned_time == 60 }"
						@click.prevent="setPlannedTimeNewItem(item, 60, $event)"
						@blur="blurOnAddNew(item)"
					>1 hour</button>
					<input name="planned_time"
						v-if="false"
						type="number"
						v-model="newItem.planned_time"
						@keydown="keydownOnNew"
						@blur="blurOnAddNew(item)"
					/>
				</div>
				<div class="update-custom-tags">
					<label>
						Add Tag: 
						<input type="text"
							name="add_tag"
							class="prepare-tag"
							@keydown="keydownOnNew"
							@blur="blurOnAddNew(item)"
							v-model="newTag"
							@keydown.enter.prevent="enterOnAddTag(item, 'newItem', $event)"
						>
					</label>
				</div>
				<div class="item-tags prepared-tags">
					<span v-if="newItem.preparedTags.length"
						v-for="tag in newItem.preparedTags"
						:class="(tag=='Today') ? 'duedate' : 'custom-tag'"
					>{{ tag }}
						<button class="delete-tag"
							@click.prevent="deletePreparedTag(tag, item)"
						>
							<i class="zmdi zmdi-close-circle"></i>
						</button>
					</span>
				</div>
			</div>
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
	props: ['item', 'alltags'],
	data: function(){
		return {
			newItem: {
				body: '',
				planned_time:0,
				parent_id: (this.item.parent_id) ? this.item.parent_id : allItems.root.id,
				depth: (this.item.depth == 0) ? 1 : this.item.depth,
				preparedTags: [],
				due_date: '0000-00-00 00:00:00',
			},
			newTag: null,
		};
	},
	computed: {
		isProject(){
			console.log('checking isProject');
			return allItems.isProject(this.item.id);			
		},
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
		hasTotalUsedTime(){
		    return (this.item.children_order.length
		    	&& this.item.totalUsedTime
		    	&& this.item.totalUsedTime != '0'
		    	&& this.item.used_time != this.item.totalUsedTime);
		},
		hasTotalPlannedTime(){
		    return (this.item.children_order.length
		    	&& this.item.totalPlannedTime
		    	&& this.item.totalPlannedTime != '0'
		    	&& this.item.planned_time != this.item.totalPlannedTime);
		},
		hasPlannedTime(){
		    return (this.item.planned_time && this.item.planned_time != '0');
		},
		hasUsedTime(){
		    return (this.item.used_time && this.item.used_time != '0');
		},
		allTags_c(){
			return this.$root.allTags;
		},
	},
	methods: {
		addTimer(item){
			//Codementor
			this.$root.addTimer(item.id);
		},
		selectItem(item){
			selection.selectedId = item.id;
		},
		enterOnNew(e) {
	    },
		makeNewItemAChild(){
			let lastChild = allItems.getLastChildId(this.item.id);
        	if (lastChild){
        	// If item already has children
        		console.log("Adding instead under: ["+allItems.nodes[lastChild].body+']');
        		vm.$root.showAddNewItem(lastChild);
        	} else {
        	// If item has no children yet
				this.$root.addingNewAsChild = true;
        		document.querySelector("#new-under-"+this.item.id+" textarea").focus();
        	}
		},
		keydownOnNew(e) {
			console.log(e.srcElement);
			// SHIFT-TAB on body
			if (e.srcElement.name == 'body' && e.keyCode === 9 && e.shiftKey) {
	        	e.preventDefault();
	        	vm.$root.showAddNewItem(this.item.parent_id);
			}
			// TAB on planned_time
			if (e.srcElement.name == 'add_tag' && e.keyCode === 9 && !e.shiftKey) {
	        	e.preventDefault();
	        	this.makeNewItemAChild();
			}
			// ENTER
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey && !e.metaKey && !e.ctrlKey) {
	        	e.preventDefault();
			  	if(!this.newItem.body){ return; }
			  	this.addNew();
			} else if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
			// Command ENTER
	        	e.preventDefault();
			  	if(!this.newItem.body){ return; }
			  	let addNextItemAs = 'child';
			  	this.addNew(addNextItemAs);
			}
			// ArrowLeft
			if (e.keyCode === 37){
				// If in an EMPTY BODY
				if (e.srcElement.name != 'body' || (e.srcElement.name == 'body' && !this.newItem.body)) {
					e.preventDefault();
		        	vm.$root.showAddNewItem(this.item.parent_id);
				}
			}
			// ArrowRight
			if (e.keyCode === 39){
				// If in an EMPTY BODY
				if (e.srcElement.name != 'body' || (e.srcElement.name == 'body' && !this.newItem.body)) {
					e.preventDefault();
		        	this.makeNewItemAChild();
				}
			}
			// ArrowUp or ArrowDown
			if (e.keyCode === 38 || e.keyCode === 40) {
				// If body is empty!
				if (!this.newItem.body) {
		        	e.preventDefault();
		        	this.cancelAddNew();
				}
			}
			// ESC
			if (e.keyCode === 27){
			   	e.preventDefault();
	        	this.cancelAddNew();
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
	    blurOnEdit(item) {
	    	let component = this;
	    	setTimeout(function(){
		    	if ( $('.updatebox input:focus').length > 0
		    		||  $('.updatebox textarea:focus').length > 0
		    		||  $('.updatebox a:focus').length > 0
		    		||  $('.updatebox button:focus').length > 0
		    	) {
	        		return;
				}　else {
			    	console.log('blurring on edit');
					component.doneEdit(item);
				}
	    	},50);
	    	// Codementor: is there any better way than this?
	    },
	    blurOnAddNew(item) {
	    	let component = this;
	    	setTimeout(function(){
		    	if ( $('.addnewbox input:focus').length > 0
		    		||  $('.addnewbox textarea:focus').length > 0
		    		||  $('.addnewbox a:focus').length > 0
		    		||  $('.addnewbox button:focus').length > 0
		    	) {
	        		return;
				}　else {
					component.cancelAddNew();
				}
	    	},50);
	    },
		updateDone(id){
			allItems.prepareDonePatch(id);
		},
		updateShowChildren(id){
			this.$root.patch(id,'show_children');
		},
		startEdit(item, event){
			if (event && event.srcElement.hasClass('done')){
				return;
			}
			console.log('startEdit');
			item = (item) ? item : allItems.nodes[selection.selectedId];
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
			vm.patch(item.id, 'body');
			vm.patch(item.id, 'planned_time');
			allItems.copyParentBodyToAllChildren(item.id);
			allItems.calculateTotalTime(item.id);
		},
		cancelEdit(item) {
			this.$root.editingItem = null;
			console.log("cancel edit. Reverting to:");
			console.log(this.$root.beforeEditCache_body);
			item.body = this.$root.beforeEditCache_body;
			item.planned_time = this.$root.beforeEditCache_planned_time;
		},
		startEditDoneDate(item, event){
			console.log('startEditDoneDate');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			this.$root.beforeEditCache_done_date = item.done_date;
			this.$root.editingDoneDateItem = item.id;
			setTimeout(function(){
				let el = "done-date-edit-"+item.id;
				document.getElementById(el).flatpickr();
				// window.flatpickr(event.target);
	    	},20);
		},
		deleteItem(item){
			let id = item.id;
			// if (confirm("Do you really want to delete: "+item.body+"?") == false) {
		 //        return;
		 //    }
			this.$root.deleteItem(id);
		},
		addNew(addNextItemAs){
			console.log('sending newItem:');
			let newItem = this.newItem;
			if (this.$root.addingNewAsChild){
				newItem.depth++;
        		newItem.parent_id = this.item.id;
			}
			if (this.newItem.preparedTags.indexOf('Today') != -1){
				this.newItem.preparedTags.$remove('Today');
				newItem.due_date = moment().format();
			}
			console.log(newItem);
			this.$http.post('/api/items',newItem) //SEND
			.then(function(response){ //response
				console.log('starting dom update...');
				let storedItem = response.data;
				let OlderSiblingIndex = this.siblingIndex;
				let index = (!OlderSiblingIndex) ? 0 : OlderSiblingIndex+1;
				let addTags = this.newItem.preparedTags;
				allItems.addItem(storedItem, index, addNextItemAs, addTags);
				// Reset stuff
				this.newItem.body = '';
				this.newItem.due_date = '0000-00-00 00:00:00';
				this.newItem.planned_time = '';
				this.newItem.preparedTags = '';
			});
		},
		cancelAddNew(lastSelectedId){
			this.newItem.body = '';
			this.$root.addingNewUnder = null;
			selection.selectedId = selection.lastSelectedId;
			// Reset newItem to sibling stance.
			this.$root.addingNewAsChild = false;			
			$(':focus').blur();
		},
		enterOnAddTag(item, additionType, event){
			console.log('enterOnAddTag');
			// additionType can be 'newItem' or 'editItem'
			if(additionType == 'editItem'){
				if (!this.newTag || event.metaKey || event.ctrlKey){
					this.doneEdit();
				} else {
					this.addTag(item);
				}
			}
			if(additionType == 'newItem'){
				if (!this.newTag || event.metaKey || event.ctrlKey){
					if(!this.newItem.body){ return; }
				  	this.addNew();
				} else {
					this.prepareTag(item);
				}
			}
		},
		addTag(item){
			let id = (item) ? item.id : selection.selectedId;
			let tag = this.newTag;
			allItems.tagItem(id, tag);
			this.newTag = null;
		},
		prepareTag(item){
			let id = (item) ? item.id : selection.selectedId;
			let tag = this.newTag;
			if(tag=='t' || tag=='T' || tag=='today' || tag=='Today'){
				tag = 'Today';
			}
			this.newItem.preparedTags.push(tag);
			this.newTag = null;
		},
		deleteTag(id, tagName, event){
			let plsFocus = '#updatebox-'+id+' textarea';
			document.querySelector(plsFocus).focus();
			this.$root.patchTag(id, tagName, 'untag');
		},
		deletePreparedTag(tag, item){
			let plsFocus;
			if(this.showAddNewBox == true){ plsFocus = "#new-under-"+item.id+" .prepare-tag"; }
			if(this.showAddNewBoxFirstChild == true){ plsFocus = "#new-firstchild-of-"+item.id+" .prepare-tag"; }
			document.querySelector(plsFocus).focus();
			this.newItem.preparedTags.$remove(tag);
		},
		setPlannedTime(item, time, event){
			let plsFocus = '#updatebox-'+item.id+' .add-tag';
			setTimeout(function(){
				console.log('returning to editting: '+plsFocus);
				document.querySelector(plsFocus).focus();
	    	},30);
			item.planned_time = time;
		},
		setPlannedTimeNewItem(item, time, event){
			let plsFocus;
			if(this.showAddNewBox == true){ plsFocus = "#new-under-"+item.id+" .prepare-tag"; }
			if(this.showAddNewBoxFirstChild == true){ plsFocus = "#new-firstchild-of-"+item.id+" .prepare-tag"; }
			setTimeout(function(){
				console.log('returning to : '+plsFocus);
				document.querySelector(plsFocus).focus();
	    	},30);
			this.newItem.planned_time = time;
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