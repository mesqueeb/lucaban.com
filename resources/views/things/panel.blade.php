<template id="things-panel-template">
	<div class="things-panel">
		<div v-for="thing in list"
			class="thing-card"
			:class="{completed: thing.completed, editing: thing == editedThing}"
		>
			<input class="toggle"
				type="checkbox"
				v-model="thing.completed"
			>
			<div @dblclick="startEdit(thing)">
				@{{ thing.body }}
			</div>
			<form action="update"
				@submit.prevent="doneEdit(thing)"
			>
				<input type="hidden" name="_method" value="PATCH">
				<input type="text"
					v-model="thing.body"
					v-thing-focus="thing == editedThing"
					@blur="doneEdit(thing)"
					@keyup.esc="cancelEdit(thing)"
				>
			</form>
		</div>

		<form action=""
			@submit.prevent="addNew"
		>
			<input type="text"
				name="body"
				id="task-body"
				class=""
				v-model="newThing.body"
				placeholder="I can't forget to..."
				autocomplete="off"
				autofocus 
			>
		</form>
	</div>
</template>


<script>

Vue.component('things',{
	template:'#things-panel-template',
	http: {
		root: '/root',
		headers: {
			'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value'),
		},
    },
	data: function(){
		return {
			list: [],
			newThing: {
				body: '',
			},
			editedThing: null,
			visibility: 'all',
		};
	},
	
	created(){
		this.fetchAll();
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
  				this.list = data.json();
			});
		},
		addNew(){
			var thing = this.newThing; // get input
			this.newThing = {body:''}; // clear input
			this.$http.post('/api/things',thing); // send
			this.fetchAll();
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
});

new Vue({
	el:'body',		
});
</script>