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
			@submit.prevent="addNew(this)"
			v-if="true"
		><!-- Will hide this later, only show when clicking enter on task. -->
			<input type="text"
				class="add-thing"
				name="body"
				v-model="newThing.body"
				placeholder="..."
				autocomplete="off"
				autofocus 
			>
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
	},
	props: ['thing'],
	data: function(){
		return {
			editedThing: null,
			newThing: { body: '', parent_id: '' },
		};
	},
	computed: {
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
		addNew(thing){
			console.log(thing, this);		
			// this.$http.post('/api/things',thing) //SEND
			// 	.then(function(response){ //response
			// });
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
    	enterOnFocussedInput() {
			if ( $('.add-thing:focus').length) {
				console.log('run addnew');
				console.log(this);
				console.log('↑ this in event');
				this.addNew();
			} else {
				this.doneEdit();
			}
    	},
		childMetaSent(x){
			let lft = Object.keys(x)[0].toString();
			let id = x[lft];
			this.childrenMeta[lft] = id;
		},
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