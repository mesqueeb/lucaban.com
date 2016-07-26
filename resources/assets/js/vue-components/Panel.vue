
<div>
	<task>Go shopping</task>
	<children>
		<div>
			<task>Mall</task>
			<children>...</children>
		</div>
		<div>
			<task>Supermarket</task>
			<children>...</children>
		</div>
	</children>
</div>

<template id="things-panel-template">
	<div class="things-panel">
		<div 
			class="thing-card"
			:class="{
				done: thing.done,
				selected: thing.id == selectedId,
				editing: thing == editedThing,
				}"
		>
			<input class="toggle"
				type="checkbox"
				v-model="thing.done"
				@change="markDone(thing)"
			>
			<div
				@dblclick="startEdit(thing)"
				@click="select(thing)"
			>
				<span class="bodybox"
					v-show="thing != editedThing"
				>{{ thing.body }}</span>
				<form action="update"
					class="updatebox"
					@submit.prevent="doneEdit(thing)"
				>
					<textarea name="thing_body"
						rows="{{ thing.rows }}"
						v-model="thing.body"
						v-autosize="thing.body"
						v-thing-focus="thing == editedThing"
						@blur="doneEdit(thing)"
						@keyup.esc="cancelEdit(thing)"
					>{{ thing.body }}</textarea>
				</form>
				<span
					@click="deleteThing(thing)"
				>✗</span>
			</div>
		</div>
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
	// props: {
	// 	list: Array,
	// },
	props: ['thing'],
	data: function(){
		return {
			newThing: {
				body: '',
			},
			editedThing: null,
			// selectedThing: null,
			selectedIndex: null,
			selectedId: null,
			visibility: 'all',
			// list: null,
		};
	},
	computed: {

	},
	methods: {
		getIndexOfId(x){
			// ARRAYの場合
			return this.list.map(function(obj){
				return obj.id;
			}).indexOf(x);
			// OBJECTの場合
			// return Object.keys(this.list).indexOf(x.toString());
		},
		select(thing){
			this.selectedId = thing.id;
			this.selectedIndex = this.getIndexOfId(thing.id);
		},
		selectNext(){
			if (this.selectedIndex == null){
				this.selectedIndex = 0;
			} else if (this.selectedIndex == this.list.length-1) {
				return;
			} else {
				this.selectedIndex = this.selectedIndex+1;
			}
			this.selectedId = this.list[this.selectedIndex].id;
		},
		selectPrevious(){
			if (!this.selectedIndex){
				this.selectedIndex = 0;
			} else {
				this.selectedIndex = this.selectedIndex-1;
			}
			this.selectedId = this.list[this.selectedIndex].id;
		},
		indent(){
			var thing = this.list[this.selectedIndex];
			console.log('indent: '+thing);
			if (!thing){ return; }
			if (this.selectedIndex == 0){ return; }
			var prevThingId = this.list[this.selectedIndex-1].id;
			var id = thing.id;
			console.log('parent: '+prevThingId+" // thing: "+id);
			this.$http.patch('/api/things/'+id+'/indent', {'parent_id':prevThingId});
		},
		markDone(thing){
			if(!thing){
				var thing = this.list[this.selectedIndex]
				thing.done = !thing.done;
			}
			this.$http.patch('/api/things/' + thing.id, {'done':thing.done});
		},
		startEdit(thing){
			var thing = (thing) ? thing : this.list[this.selectedIndex];
			this.beforeEditCache = thing.body;
			this.editedThing = thing;
		},
		doneEdit(thing) {
			var thing = (thing) ? thing : this.list[this.selectedIndex];
			if (!this.editedThing) {
				return;
			}
			this.editedThing = null;
			thing.body = thing.body.trim();
			if (!thing.body) {
				this.deleteThing(thing);
			}
			var id = thing.id;
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
			this.list.$remove(thing);
		},
		fetchThis(thing){
			this.$http.get('/api/things/'+thing.id).then(function(data) {
				var data = data.json();
				var nl = data['body'].split(/\r\n|\r|\n/).length;
				data['rows'] = nl;
				var el_ind = (this.selectedIndex) ? this.selectedIndex : this.getIndexOfId(thing.id);
				console.log('fetched index = '+el_ind);
				this.list[el_ind] = data;
  			});
		},
		addNew(){
			var thing = this.newThing; // get input
			if (!thing.body){ return; }
			this.newThing = {body:''}; // clear input
			this.$http.post('/api/things',thing); // send
			this.fetchAll();
		},
	},
	events: {
    	arrowDown() { this.selectNext(); },
    	arrowUp() { this.selectPrevious(); },
    	spaceBar() { this.markDone(); },
    	tab() { this.indent(); },
    	unindent() { this.unindent(); },
    	enter() { this.startEdit(); },
    	enterOnFocussedInput() {
			if ( $('#add-thing:focus').length > 0 ) {
				this.addNew();
			} else {
				this.doneEdit();
			}
    	},
	},
	directives: {
		'thing-focus': function (value) {
			if (!value) {
				return;
			}
			var el = this.el;
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