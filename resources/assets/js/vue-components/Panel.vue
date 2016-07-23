
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
		<div v-for="thing in list"
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
			</div>
		</div>

		<form action=""
			@submit.prevent="addNew"
		>
			<input type="text"
				name="body"
				id="add-thing"
				v-model="newThing.body"
				placeholder="I can't forget to..."
				autocomplete="off"
				autofocus 
			>
		</form>
	</div>
</template>


<script>

export default {
	template:'#things-panel-template',
	created(){
		this.fetchAll();

	},
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
			list: [],
		};
	},
	computed: {
		validation(){
			return {
				body: !!this.newThing.body.trim(),
			};
		},
		isValid(){
			var validation = this.validation;
			return Object.keys(validation).every(function(key){
				return validation[key]
			});
		},

	},
	methods: {
		getIndexOfId(x){
			return this.list.map(function(obj){
					return obj.id;
				}).indexOf(x);
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
			var thing = this.selectedThing;
			if (!thing){ return; }
			var el_i = this.list.map(function(obj){
					return obj.id;
				}).indexOf(thing.id);
			if (el_i == 0){ return; }
			var prevThingId = this.list[el_i-1].id;
			this.$http.patch('/api/things/' + thing.id, {'parent_id':prevThingId});
			this.fetchThis(thing);
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
			this.list.$remove(thing);
		},
		fetchAll(){
			this.$http.get('/api/things').then(function(data) {
  				var data = data.json();
  				$.each(data, function(k, v) {
  					var nl = v['body'].split(/\r\n|\r|\n/).length;
  					v['rows'] = nl;
				});
				this.list = data;
				var abcd = JSON.stringify(data);
				console.log(abcd);
				console.log('fetchedAll');
			});
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
    	enterOnInputFocus() { this.doneEdit(); },
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