<!-- 
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
</div> -->

<template id="things-panel-template">
	<div class="things-panel">
		<div v-for="thing in list"
			class="thing-card"
			:class="{
				done: thing.done,
				editing: thing == editedThing,
				selected: thing == selectedThing,
				child: thing.parent_id > 0,
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
			<textarea type="text"
				name="body"
				id="add-thing"
				v-model="newThing.body"
				v-autosize="newThing.body"
				rows="1" 
				placeholder="I can't forget to..."
				autocomplete="off"
				autofocus 
			>{{ newThing.body }}</textarea>
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
			selectedThing: null,
			selectedThingIndex: null,
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
			this.selectedThing = thing;
			thing.selected = true;
			var el_ind = this.getIndexOfId(thing.id);
			this.selectedThingIndex = el_ind;
		},
		selectNext(){
			if (!this.selectedThing){
				this.selectedThing = this.list[0];
				return;
			}
			var el_i = this.getIndexOfId(this.selectedThing.id);
			this.selectedThing = this.list[el_i+1];
			this.selectedThingIndex++;
		},
		selectPrevious(){
			if (!this.selectedThing){
				this.selectedThing = this.list[0];
				return;
			}
			var el_i = this.getIndexOfId(this.selectedThing.id);
			this.selectedThing = this.list[el_i-1];
			this.selectedThingIndex--;
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
			var thing = (thing) ? thing : this.selectedThing;
			console.log('thing...');
			console.log(thing);
			console.log('thing.done = '+thing.done);
			console.log('!thing.done = '+!thing.done);
			this.$http.patch('/api/things/' + thing.id, {'done':!thing.done}).then(
				this.fetchThis(thing)
				//thing.done = !thing.done
			);
			var msg = (thing.done) ? 'done → undo' : 'not done → done!' ;
			console.log(msg);
		},
		startEdit(thing){
			var thing = (thing) ? thing : this.selectedThing;
			this.beforeEditCache = thing.body;
			this.editedThing = thing;
		},
		doneEdit(thing) {
			var thing = (thing) ? thing : this.selectedThing;
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
				var abcd = JSON.stringify(data);
				console.log(abcd);
  				$.each(data, function(k, v) {
  					var nl = v['body'].split(/\r\n|\r|\n/).length;
  					v['rows'] = nl;
				});
				this.list = data;
				console.log('fetchAll');

				// function getParents(obj) {
				// 	if ('id' in obj && typeof(obj.id) === 'number' && !isNaN(obj.id)) {
				//     return true;
				//   } else {
				//     invalidEntries++;
				//     return false;
				//   }
				// }
				

				// // find all parent objects, keep only those.
				// var parents = data.map(function(obj){ 
				// 	var nl = obj['body'].split(/\r\n|\r|\n/).length;
				// 	obj['rows'] = nl;
				// 	if(obj.parent_id == 0){
				// 		var children = data.filter(function(c_obj){
				// 			if(obj.id == c_obj.parent_id){
				// 				console.log('obj.parent_id .. '+obj.parent_id);
				// 				return true;
				// 			} else { return false; }
				// 		});
				// 		obj['children'] = children;
				// 		return obj;
				// 	}
				// });
				// for each parent object find the children and keep those.
				// var parentsWithChildren = parents.map(function(obj){ 
				// 	if (obj){
				// 	var p_id = obj.id;
				// 	var children = {};
				// 	var children = data.map(function(c_obj){ 
				// 		if(c_obj.parent_id == p_id){
				// 			return c_obj;
				// 		}
				// 	});
				// 	obj['children'] = children;
				// 	}
				// });
				// var abc = JSON.stringify(parents);
				// console.log(abc);


				
				//console.log(JSON.stringify(data));
			});
		},
		fetchThis(thing){
			var thing = (thing) ? thing : this.selectedThing;
			this.$http.get('/api/things/'+thing.id).then(function(data) {
				var data = data.json();
				var nl = data['body'].split(/\r\n|\r|\n/).length;
				data['rows'] = nl;
				var el_ind = (this.selectedThingIndex) ? this.selectedThingIndex : this.getIndexOfId(thing.id);
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
			console.log('addNew♡');
		},
	},
	events: {
    	downArrow() { this.selectNext(); },
    	upArrow() { this.selectPrevious(); },
    	spaceBar() { this.markDone(); },
    	tab() { this.indent(); },
    	// unindent() { this.unindent(); },
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