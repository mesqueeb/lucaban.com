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
				editing: item == editedItem,
			}"
		>
			<input class="toggle"
				type="checkbox"
				v-model="item.done"
				@change="markDone(item)"
			>
			<div class="body-div"
				:class="{ selected: item.id == this.$root.selection.selectedId, }"
				@dblclick="startEdit(item)"
				@click="select(item)"
				@enter="console.log('yarrr')"
			>
				<span class="bodybox"
					v-show="item != editedItem"
				>{{ item.body }}</span>
				<span v-show="true"> ({{item.id}}) D-{{item.depth}}) [{{item.children_order}}]</span>
				<form action="update"
					class="updatebox"
					@submit.prevent="doneEdit(item)"
				>
					<textarea name="item_body"
						rows="{{ item.rows }}"
						v-model="item.body"
						v-autosize="item.body"
						v-item-focus="item == editedItem"
						@blur="doneEdit(item)"
						@keyup.esc="cancelEdit(item)"
						@keydown.enter="enterOnEdit"
					>{{ item.body }}</textarea>
				</form>
				<div class="item-nav">
					<button
						@click="deleteItem(item)"
					>✗</button>
				</div>
			</div>
		</div>
		<form v-if="addneww"
			@submit.prevent
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
			editedItem: null,
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
		markDone(item){
			this.$http.patch('/api/items/' + item.id, {'done':item.done});
		},
		startEdit(item){
			console.log('startEdit');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			console.log(item);
			this.beforeEditCache = item.body;
			this.editedItem = item;
		},
		doneEdit(item) {
			item = (item) ? item : allItems.nodes[selection.selectedId];
			if (!this.editedItem) {
				return;
			}
			this.editedItem = null;
			item.body = item.body.trim();
			if (!item.body) {
				this.deleteItem(item);
			}
			let id = item.id;
			this.$http.patch('/api/items/' + id, { body: item.body}, { method: 'PATCH'});
			$(':focus').blur();
		},
		cancelEdit(item) {
			this.editedItem = null;
			console.log(this.beforeEditCache);
			item.body = this.beforeEditCache;
		},
		deleteItem(item){
			this.$http.delete('/api/items/' + item.id);
			// ↓ DOESN'T WORK!!!
			this.item.$remove(item);
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