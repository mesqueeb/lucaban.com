<template id="things-panel-template">
	<div class="things-panel"
	>
		<div class="panel-title"
			v-if="thing.depth == 0"
		>
			{{ thing.body }}
		</div>
		<div 
			class="thing-card"
			v-if="thing.lft != 1"
			:class="{
				done: thing.done,
				editing: thing == editedThing,
				}"
		>
			<input class="toggle"
				type="checkbox"
				v-model="thing.done"
				@change="markDone(thing)"
			>
			<div class="body-div"
				:class="{ selected: thing.id == this.$root.selection.selectedId, }"
				@dblclick="startEdit(thing)"
				@click="select(thing)"
				@enter="console.log('yarrr')"
			>
				<span class="bodybox"
					v-show="thing != editedThing"
				>{{ thing.id }} - {{ thing.body }}</span>
				<form action="update"
					class="updatebox"
					@submit.prevent="doneEdit(thing)"
				>
					<textarea name="thing_body"
						rows="<!-- {{ thing.rows }} -->"
						v-model="thing.body"
						v-autosize="thing.body"
						v-thing-focus="thing == editedThing"
						@blur="doneEdit(thing)"
						@keyup.esc="cancelEdit(thing)"
					>{{ thing.body }}</textarea>
				</form>
				<div class="thing-nav">
					<button
						@click="deleteThing(thing)"
					>✗</button>
				</div>
			</div>
		</div>
		<form action=""
			v-if="true"
			@submit.prevent
			id="new-under-{{thing.id}}"
		><!-- Will hide this later, only show when clicking enter on task. -->
			<textarea type="text"
				class="add-thing"
				name="body"
				v-model="newThing.body"
				v-autosize="newThing.body"
				placeholder="..."
				autocomplete="off"
				autofocus 
				rows="1"
			></textarea>
		</form>

		<div class="children" v-if="thing.children">
			<Panel v-for="childPanel in thing.children"
				:thing="childPanel"
			></Panel>
		</div>
	</div>
</template>


<script>

export default {
	name: 'Panel',
	template:'#things-panel-template',
	created(){
	},
	ready(){
		let vm = this;
        let form = "#new-under-"+this.thing.id+">textarea";
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
	props: ['thing'],
	data: function(){
		return {
			editedThing: null,
			newThing: {
				body: '',
				parent_id: this.thing.parent_id,
				older_sibling_id: this.thing.id,
				depth: this.thing.depth,
			},
		};
	},
	computed: {
		nodeIndex(){
			let pId = this.thing.parent_id;
			if(!pId){ return; }
			let siblingsArr = allThings.nodes[pId].children_order;
			let id = this.thing.id;
			let ni = siblingsArr.indexOf(id);
			return ni;
		},
		parentsChildren_order(){
			let pId = this.thing.parent_id;
			if(!pId){ return; }
			return allThings.nodes[pId].children_order;
		},
	},
	methods: {
		select(thing){
			selection.selectedThing = thing;
			selection.selectedId = thing.id;
			selection.selectedLft = thing.lft;
			selection.selectedDepth = thing.depth;
			// let ind = allThings.nodesArr.indexOf(selection.selectedThing);
			// console.log(ind);
		},
		indent(){

		},
		unindent(){

		},
		move(direction){

		},
		markDone(thing){
			if(!thing){
				// ↓ out dated because of recursiveness: "this" is not recognised properly...
				var thing = this.thing[this.selectedIndex]
				thing.done = !thing.done;
			}
			this.$http.patch('/api/things/' + thing.id, {'done':thing.done});
		},
		startEdit(thing){
			// ↓ out dated because of recursiveness: "this" is not recognised properly...
			var thing = (thing) ? thing : this.thing[this.selectedIndex];
			this.beforeEditCache = thing.body;
			this.editedThing = thing;
		},
		doneEdit(thing) {
			// ↓ out dated because of recursiveness: "this" is not recognised properly...
			var thing = (thing) ? thing : this.thing[this.selectedIndex];
			if (!this.editedThing) {
				return;
			}
			this.editedThing = null;
			thing.body = thing.body.trim();
			if (!thing.body) {
				this.deleteThing(thing);
			}
			let id = thing.id;
			this.$http.patch('/api/things/' + id, thing, { method: 'PATCH'});
			$(':focus').blur();
		},
		cancelEdit(thing) {
			this.editedThing = null;
			console.log(this.beforeEditCache);
			thing.body = this.beforeEditCache;
		},
		deleteThing(thing){
			this.$http.delete('/api/things/' + thing.id);
			// ↓ DOESN'T WORK!!!
			this.thing.$remove(thing);
		},
		addNew(){
			console.log('sending newThing:');
			console.log(this.newThing);
			this.$http.post('/api/things',this.newThing) //SEND
			.then(function(response){ //response
				let storedThing = response.data;
				this.patchParentChildren_order(storedThing);
			});
		},
		patchParentChildren_order(storedThing){
			console.log('starting patchParentChildren_order...');
			let OlderSiblingIndex = this.nodeIndex;
			let index = OlderSiblingIndex+1;
			console.log('newTaskIndex');
			console.log(index);
			let oldChildren_order = this.parentsChildren_order;
			console.log('oldChildren_order');
			console.log(oldChildren_order);
			console.log('storedThing.id');
			console.log(storedThing.id);
			// let newChildren_order = oldChildren_order.splice(index, 0, storedThing.id);
			let newChildren_order = oldChildren_order.splice(index, 0, storedThing.id).toString();
			console.log('newChildren_order');
			console.log(newChildren_order);
			this.$http.patch('/api/things/' + storedThing.parent_id, { children_order: newChildren_order }, { method: 'PATCH'})
			.then(function(response){
			// 	this.updateDOM(storedThing, newChildren_order);
			});
		},
		updateDOM(storedThing, newChildren_order){
			let parent = allThings.nodes[storedThing.parent_id];
			parent.children.push(storedThing);
		    this.nodes[storedThing.id] = storedThing;
		    parent.children_order = newChildren_order;
		},
	},
	events: {
    	arrowDown() { this.selectNext(); },
    	arrowUp() { this.selectPrevious(); },
    	spaceBar() { this.markDone(); },
    	tab() { this.indent(); },
    	shift_tab() { this.unindent(); },
    	meta_arrowUp() { this.move('up'); },
    	meta_arrowDown() { this.move('down'); },
    	enter() { this.startEdit(); },
	},
	directives: {
		'thing-focus': function (value) {
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