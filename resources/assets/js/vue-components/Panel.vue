<template id="things-panel-template">
	<div class="things-panel">
		<div v-for="thing in list"
			class="thing-card"
			:class="{
				done: thing.done,
				editing: thing == editedThing,
				selected: thing == selectedThing,
				}"
		>
			<input class="toggle"
				type="checkbox"
				v-model="thing.done"
				@click="markDone(thing)"
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
			list: [],
			newThing: {
				body: '',
			},
			editedThing: null,
			selectedThing: null,
			visibility: 'all',
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
		select(thing){
			this.selectedThing = thing;
		},
		selectNext(){
			if (!this.selectedThing){
				this.selectedThing = this.list[0];
				return;
			}
			var el_i = this.list.map(function(obj){
					return obj.id;
				}).indexOf(this.selectedThing.id);
			this.selectedThing = this.list[el_i+1];
		},
		selectPrevious(){
			if (!this.selectedThing){
				this.selectedThing = this.list[0];
				return;
			}
			var el_i = this.list.map(function(obj){
					return obj.id;
				}).indexOf(this.selectedThing.id);
			this.selectedThing = this.list[el_i-1];
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
			fetchAll();
		},
		markDone(thing){
			var thing = (thing) ? thing : this.selectedThing;
			console.log(thing);
			console.log('thing.done = '+thing.done);
			this.$http.patch('/api/things/' + thing.id, {'done':!thing.done});
			thing.done = !thing.done;
		},
		startEdit(thing){
			console.log(thing.body);
			this.beforeEditCache = thing.body;
			this.editedThing = thing;
		},
		doneEdit(thing) {
			if (!this.editedThing) {
				return;
			}
			this.editedThing = null;
			thing.body = thing.body.trim();
			if (!thing.body) {
				this.deleteThing(thing);
			}
			var id = thing.id;
			this.$http.patch('/api/things/' + id, thing, { method: 'PATCH'}).then((response) => {
		        // get status
		        response.status;
		        console.log(response);
			}, (response) => {
				// error callback
				console.log(response);
			});
		},
		cancelEdit(thing) {
			this.editedThing = null;
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
    	selectNext() { this.selectNext(); },
    	selectPrevious() { this.selectPrevious(); },
    	markDone() { this.markDone(); },
    	indent() { this.indent(); },
    	unindent() { this.unindent(); },
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