<template id="items-card-template">
	<div class="items-card">
		<div class="card-title"
			v-if="item.depth == 0"
		>
			{{ item.body }}
		</div>
		<div 
			class="item-card"
			v-if="item.depth != 0"
			:class="{
				done: item.done,
				editing: item.id == this.$root.editingItem,
			}"
		>
			<div class="toggle-div">
				<input class="toggle"
					type="checkbox"
					v-if="item.children_order.length==0 || item.done == true"
					v-model="item.done"
					@change="markDone(item.id)"
				>
			</div>
			<div class="body-div"
				:class="{ selected: item.id == this.$root.selection.selectedId, }"
				@dblclick="startEdit(item)"
				@click="select(item)"
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
						@keydown.enter="enterOnEdit"
					>{{ item.body }}</textarea>
					<span>
						<label for="planned_time">duration:</label>
						<input name="planned_time"
							type="number"
							v-model="item.planned_time"
							@blur="blurOnEdit(item)"
							@keyup.esc="cancelEdit(item)"
							@keydown.enter="doneEdit(item)"
						/>
					</span>
				</form>
				<div class="item-tags"
					v-show="this.$root.editingItem != item.id"
				>
					<span v-if="item.done" class="done">
						done {{ item.done_date | mm/dd }}
					</span>
					
					<span v-if="hasPlannedTime"
						:class="{
							'duration':!item.children.length,
							'total-duration':item.children.length,
						}"
					>{{ calcPlannedTime }}</span>

					<span v-if="hasDueDate" class="duedate">
						{{ item.due_date | mm/dd }}
					</span>
				</div>
				<div class="item-nav"
					v-show="this.$root.editingItem != item.id"
				>
					<button 
						v-if="item.children_order.length==0"
						@click="deleteItem(item)"
					>✗</button>
				</div>
			</div>
		</div>
		<form v-if="addneww"
			@submit.prevent
			id="new-under-{{ item.id }}"
		>
			<textarea type="text"
				class="add-item"
				name="body"
				v-model="newItem.body"
				v-autosize="newItem.body"
				@blur="cancelAddNew"
				@keyup.esc="cancelAddNew"
				@keydown.enter="enterOnNew"
				placeholder="..."
				autocomplete="off"
				autofocus 
				rows="1"
			></textarea>
		</form>

		<div class="children" v-if="item.children">
			<Card v-for="childCard in item.children"
				:item="childCard"
			></Card>
		</div>
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
				body: '',
				parent_id: (this.item.parent_id) ? this.item.parent_id : 1,
				depth: (this.item.depth == 0) ? 1 : this.item.depth,
				older_sibling_id: this.item.id,
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
		addneww(){
			if(this.$root.addingNewUnder == this.item.id || this.item.depth == 0){ return true; } else { return null; }
		},
		calcPlannedTime(){
			let a = allItems.calculateDuration(this.item);
			return a.totalTime;
		},
		hasDueDate(){
		    return this.item.due_date != '0000-00-00 00:00:00';
		},
		hasDoneDate(){
		    return this.item.done_date != '0000-00-00 00:00:00';
		},
		hasPlannedTime(){
		    return this.calcPlannedTime != '0';
		},
	},
	methods: {
		select(item){
			selection.selectedId = item.id;
		},
		enterOnNew(e) {
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey) {
	        	e.preventDefault();
			  	this.addNew();
			}
	    },
		enterOnEdit(e) {
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey) {
	        	e.preventDefault();
				this.doneEdit();
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
		markDone(id){
			allItems.updateDoneState(id);
		},
		startEdit(item){
			console.log('startEdit');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			console.log(item);
			this.beforeEditCache = item.body;
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
			$(':focus').blur();
		},
		cancelEdit(item) {
			this.$root.editingItem = null;
			console.log("cancel edit. Reverting to:");
			console.log(this.beforeEditCache);
			item.body = this.beforeEditCache;
		},
		deleteItem(item){
			let id = item.id;
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
		cancelAddNew(){
			this.newItem.body = '';
			this.$root.addingNewUnder = '';
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