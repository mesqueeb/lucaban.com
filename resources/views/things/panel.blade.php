

<template id="things-panel-template">
	<div class="things-panel">
		<div class="thing-card"
			v-for="thing in list"
		>
			@{{ thing.body }}
		</div>


		<div class="alert alert-danger"
			{{-- v-show="!validation.body" --}}
			v-if="!isValid"
		>Please type something.
		</div>
		<form action="/things/add"
			method="POST"
			@submit.prevent="addNew"
		>
			<div class="form-group">
				{{-- {{ csrf_field() }} --}}
				<label for="">Add</label>
				<input type="text"
					name="body"
					id="task-body"
					class="form-control"
					v-model="newThing.body"
				>
				<button :disabled="!isValid"
					class="btn btn-primary"
					type="submit"
				>Add</button>
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
				// _token: $('meta[name=_token]').attr('content'),
			},

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
	methods:{
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
});

new Vue({
	el:'body',		
});
</script>