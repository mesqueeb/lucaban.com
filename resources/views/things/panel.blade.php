<template id="things-panel-template">
	<div class="things-panel">
		<div v-for="thing in list" @click="startEdit(thing)">
			<div class="thing-card"
				
			>
				@{{ thing.body }}
			</div>
			<input type="text"
				v-model="thing.body"
				v-bind:class="[thing.editMode ? 'edit-mode' : 'view-mode']"
			>
		</div>

		<form action="/things/add"
			method="POST"
			@submit.prevent="addNew"
		>
			<div class="">
				<input type="text"
					name="body"
					id="task-body"
					class=""
					v-model="newThing.body"
					placeholder="I can't forget to..."
					autocomplete="off"
				>
			</div>
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
			// doneEdit: function (todo) {
			// 	if (!this.editedTodo) {
			// 		return;
			// 	}
			// 	this.editedTodo = null;
			// 	todo.title = todo.title.trim();
			// 	if (!todo.title) {
			// 		this.removeTodo(todo);
			// 	}
			// },

		startEdit(thing){
			console.log('click registered');
			// this.beforeEditCache = thing.body;
			// this.editedThing = thing;
			thing.editMode = true;
		},
		// cancelEdit: function (thing) {
		// 	this.editedThing = null;
		// 	thing.title = this.beforeEditCache;
		// },
		// deleteThing(thing){
		// 	this.list.$remove(thing);
		// },
		fetchAll(){
			this.$http.get('/api/things').then(function(data) {
  				this.list = data.json();
  				this.list.forEach(function (obj) {
  					obj.editMode = false;
				});
			});
		},
		addNew(){
			var thing = this.newThing; // get input
			this.newThing = {body:''}; // clear input
			this.$http.post('/api/things',thing); // send
			this.fetchAll();
		},
		edit(){

		},
	},
});

new Vue({
	el:'body',		
});
</script>