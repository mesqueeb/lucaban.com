<template id="things-panel-template">
	<div class="things-panel">
		<div class="panel-title"
			v-if="thing.lft == 1"
		>
			{{ thing.body }}
		</div>
		<div 
			class="thing-card"
			v-if="thing.lft != 1"
			:class="{
				done: thing.done,
				selected: thing.id == this.$root.$children[0].selectedId,
				editing: thing == editedThing,
				}"
		>
			<input class="toggle"
				type="checkbox"
				v-model="thing.done"
				@change="markDone(thing)"
			>
			<div class="body-div"
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
			@submit.prevent="addNew"
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
    	this.dispatchChildMeta();
	},
	props: ['thing'],
	data: function(){
		return {
			newThing: { body: '', parent_id: '' },
			editedThing: null,
			selectedId: null,
			selectedLft: null,
			selectedDepth: null,
			childrenMeta: {}, // shows `lft:id` per child
			visibility: 'all',
			flatData: null,
		};
	},
	computed: {
	},
	methods: {
		dispatchChildMeta(){ // send child's `lft:id` to parent
			let lft = this.thing.lft;
			let id = this.thing.id;
			let childMeta = {};
			childMeta[lft] = id;
			this.$dispatch('childMetaSent', childMeta);
		},
		getLft(direction){
			let vm = this.$root.$children[0];
			let fd = this.$root.$children[0].flatData;
			let allLfts = Object.keys(fd);
			let currLftInd = allLfts.indexOf(vm.selectedLft.toString());
			if(direction == 'next'){
				if(currLftInd+1 >= allLfts.length){ return; }
				var nextLft =  allLfts[currLftInd+1];
			} else if (direction == 'previous'){ 
				if(currLftInd-1 < 1){ return; }
				var nextLft =  allLfts[currLftInd-1];
			}
			vm.selectedLft = nextLft;
			vm.selectedId = vm.flatData[nextLft].id;
		},
		select(thing){
			var vm = this.$root.$children[0];
			vm.selectedId = thing.id;
			vm.selectedLft = thing.lft;
			vm.selectedDepth = thing.depth;
		},
		selectNext(){
			this.getLft('next');
		},
		selectPrevious(){
			this.getLft('previous');
		},
		indent(){
			let vm = this.$root.$children[0];
			if(!vm.selectedId){ return; };
			if(!vm.selectedLft == 2){ return; }
			
			// In case previous thing is not sibling:
			// Make last child of PREVIOUS sibling.
			// In case previous thing is sibling:
			// Make child of previous thing.

			let fd = this.$root.$children[0].flatData;
			let allLfts = Object.keys(fd);
			let currLftInd = allLfts.indexOf(vm.selectedLft.toString());
			let prevLft = allLfts[currLftInd-1];
			let prevThing = vm.flatData[prevLft];
			if(prevThing.depth == vm.selectedDepth){
			// CASE: previous things is a sibling
				var targetId = prevThing.id;
			} else {
			// CASE: previous things is NOT a sibling
				//Find previous sibling with while-loop
				let climb_x = 0;
				while(prevThing.depth != vm.selectedDepth){
					climb_x = climb_x+1;
					prevLft = allLfts[currLftInd-climb_x];
					prevThing = vm.flatData[prevLft];
					var targetId = prevThing.id;
					console.log('cycling through previous ids: '+targetId);
				}
			}
			console.log('target_id: '+targetId);
			let id = vm.selectedId;
			this.$http.patch('/api/things/'+id+'/makeChildOf', {'target_id':targetId});
			this.$root.fetchAll();
		},
		unindent(){
			let vm = this.$root.$children[0];
			if(!vm.selectedId){ return; };
			if(!vm.selectedLft == 2){ return; }
			let id = vm.selectedId;
			this.$http.patch('/api/things/'+id+'/makeSiblingOf');
			this.$root.fetchAll();
		},
		move(direction){
			let vm = this.$root.$children[0];
			let id = vm.selectedId;
			this.$http.patch('/api/things/'+id+'/moveThing', {'direction':direction});
			this.$root.fetchAll();
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
		fetchThis(thing){
			this.$http.get('/api/things/'+thing.id).then(function(data) {
				var data = data.json();
				// UNDER CONSTRUCTION. Just messing around a bit down below.

				// let nl = data['body'].split(/\r\n|\r|\n/).length;
				// data['rows'] = nl;
				// let el_ind = (this.selectedIndex) ? this.selectedIndex : this.getIndexOfId(thing.id);
				// console.log('fetched index = '+el_ind);
				// this.thing[el_ind] = data;
  			});
		},
		addNew(thing){
			console.log(thing);

			// UNDER CONSTRUCTION. I really don't know how to get the correct 'parent_id'...

			// let vm = this.$root.$children[0];
			// let sel_id = vm.selectedId;
			// let nbody = this.newThing.body;
			// console.log('pid '+sel_id+' // body '+nbody);
			// let thing = this.newThing; // get input

			// this.newThing.parent_id = this.$root.selectedId;
			// if (!this.newThing.body){ return; }
			// this.newThing = {body:''}; // clear input

			console.log('added this thing...');
			console.log(thing);
			// this.$http.post('/api/things',thing) //SEND
			// 	.then(function(response){ //response
			// 	// response = response.json();
			// 	// console.log(response.id);
			// 	this.$root.fetchAll();
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