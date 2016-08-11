<template id="items-card-template">
	<div class="items-card"
	>
		<div class="card-title"
			v-if="item.depth == 0"
		>
			{{ item.body }} [{{ item.children_order }}]
		</div>
		<div 
			class="item-card"
			v-if="item.lft != 1"
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
				@click="select(
				item)"
				@enter="console.log('yarrr')"
			>
				<span class="bodybox"
					v-show="item != editedItem"
				>{{ item.id }} (d: {{ item.depth }})- {{ item.body }}: [{{ item.children_order }}]</span>
				<form action="update"
					class="updatebox"
					@submit.prevent="doneEdit(item)"
				>
					<textarea name="item_body"
						rows="<!-- {{ item.rows }} -->"
						v-model="item.body"
						v-autosize="item.body"
						v-item-focus="item == editedItem"
						@blur="doneEdit(item)"
						@keyup.esc="cancelEdit(item)"
					>{{ item.body }}</textarea>
				</form>
				<div class="item-nav">
					<button
						@click="deleteItem(item)"
					>✗</button>
				</div>
			</div>
		</div>
		<form action=""
			v-if="this.$root.editing == item.id"
			@submit.prevent
			id="new-under-{{item.id}}"
		><!-- Will hide this later, only show when clicking enter on task. -->
			<textarea type="text"
				class="add-item"
				name="body"
				v-model="newItem.body"
				v-autosize="newItem.body"
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
		let vm = this;
        let form = "#new-under-"+this.item.id+">textarea";
      	window.addEventListener('keydown', function(e) {
	        if ( $(form+':focus').length > 0 ) {
	          // INPUT AREAS IN FOCUS
			  switch(e.keyCode) { 
			  	case 13:
			  		if (e.shiftKey){
			  			console.log('shift enter');
			  			break;
			  		}
		  			console.log('normal enter');
			  		e.preventDefault();
			  		vm.addNew();
			  		break;
			  } // end switch
			}
		});
	},
	props: ['item'],
	data: function(){
		return {
			editedItem: null,
			newItem: {
				body: '',
				parent_id: (this.item.parent_id) ? this.item.parent_id : 1 ,
				older_sibling_id: this.item.id,
				depth: (this.item.depth == 0) ? 1 : this.item.depth,
			},
		};
	},
	computed: {
		nodeIndex(){ return allItems.nodeIndex(this.item.id); },
		olderSiblingId(){ return allItems.olderSiblingId(this.item.id); },
		parentsChildren_order(){
			let pId = this.item.parent_id;
			if(this.item.depth == 0){ return allItems.nodes[this.item.id].children_order; }
			return allItems.nodes[pId].children_order;
		},
	},
	methods: {
		select(item){
			selection.selectedId = item.id;
		},
		move(direction){

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
			this.$http.patch('/api/items/' + id, item, { method: 'PATCH'});
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
				let OlderSiblingIndex = this.nodeIndex;
				let index = OlderSiblingIndex+1;
				allItems.addItem(storedItem, index);
				this.$root.editing = storedItem.id;
				console.log("#new-under-"+storedItem.id+">textarea");
				setTimeout(function(){$("#new-under-"+storedItem.id+">textarea").focus();},10);
				this.patchChildren_order(storedItem.parent_id);
			});
		},
		patchChildren_order(id){
			let childrenArray = allItems.nodes[id].children_order;
			let c_o = '';
			childrenArray.forEach(function(entry) {
			    c_o = c_o+','+entry;
			});
			c_o = c_o.substring(1);
			console.log(c_o);
			this.$http.patch('/api/items/' + id, { children_order: c_o }, { method: 'PATCH'})
			.then(function(response){
				console.log('patched children_order');
			});
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