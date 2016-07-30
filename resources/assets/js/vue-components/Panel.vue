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
			newThing: { body: '' },
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
	ready(){
    	this.dispatchChildMeta();
	},
	methods: {
		dispatchChildMeta(){ // send child's `lft:id` to parent
			var lft = this.thing.lft;
			var id = this.thing.id;
			var childMeta = {};
			childMeta[lft] = id;
			this.$dispatch('childMetaSent', childMeta);
		},
		getLft(direction){
			var vm = this.$root.$children[0];
			var fd = this.$root.$children[0].flatData;
			var allLfts = Object.keys(fd);
			var currLftInd = allLfts.indexOf(vm.selectedLft.toString());
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
			var vm = this.$root.$children[0];
			if(!vm.selectedId){ return; };
			if(!vm.selectedLft == 2){ return; }
			
			// In case previous thing is not sibling:
			// Make last child of PREVIOUS sibling.
			// In case previous thing is sibling:
			// Make child of previous thing.

			var fd = this.$root.$children[0].flatData;
			var allLfts = Object.keys(fd);
			var currLftInd = allLfts.indexOf(vm.selectedLft.toString());
			var prevLft = allLfts[currLftInd-1];
			var prevThing = vm.flatData[prevLft];
			if(prevThing.depth == vm.selectedDepth){
			// CASE: previous things is a sibling
				var targetId = prevThing.id;
			} else {
			// CASE: previous things is NOT a sibling
				//Find previous sibling with while-loop
				var climb_x = 0;
				while(prevThing.depth != vm.selectedDepth){
					var climb_x = climb_x+1;
					var prevLft = allLfts[currLftInd-climb_x];
					var prevThing = vm.flatData[prevLft];
					var targetId = prevThing.id;
					console.log('cycling through previous ids: '+targetId);
				}
			}
			console.log('target_id: '+targetId);
			var id = vm.selectedId;
			this.$http.patch('/api/things/'+id+'/makeChildOf', {'target_id':targetId});
			this.$root.fetchAll();
		},
		unindent(){
			var vm = this.$root.$children[0];
			if(!vm.selectedId){ return; };
			if(!vm.selectedLft == 2){ return; }
			var id = vm.selectedId;
			this.$http.patch('/api/things/'+id+'/makeSiblingOf');
			this.$root.fetchAll();
		},
		markDone(thing){
			if(!thing){
				var thing = this.thing[this.selectedIndex]
				thing.done = !thing.done;
			}
			this.$http.patch('/api/things/' + thing.id, {'done':thing.done});
		},
		startEdit(thing){
			var thing = (thing) ? thing : this.thing[this.selectedIndex];
			this.beforeEditCache = thing.body;
			this.editedThing = thing;
		},
		doneEdit(thing) {
			var thing = (thing) ? thing : this.thing[this.selectedIndex];
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
			this.thing.$remove(thing);
		},
		fetchThis(thing){
			this.$http.get('/api/things/'+thing.id).then(function(data) {
				var data = data.json();
				// var nl = data['body'].split(/\r\n|\r|\n/).length;
				// data['rows'] = nl;
				// var el_ind = (this.selectedIndex) ? this.selectedIndex : this.getIndexOfId(thing.id);
				// console.log('fetched index = '+el_ind);
				// this.thing[el_ind] = data;
  			});
		},
		addNew(){
			var thing = this.newThing; // get input
			if (!thing.body){ return; }
			this.newThing = {body:''}; // clear input
			this.$http.post('/api/things',thing) //SEND
				.then(function(response){ //response
				response = response.json();
				console.log(response.id);
				this.fetchThis(response);
				this.fetchAll();
			});
		},
	},
	events: {
    	arrowDown() { this.selectNext(); },
    	arrowUp() { this.selectPrevious(); },
    	spaceBar() { this.markDone(); },
    	tab() { this.indent(); },
    	shift_tab() { this.unindent(); },
    	enter() { this.startEdit(); },
    	enterOnFocussedInput() {
			if ( $('#add-thing:focus').length > 0 ) {
				this.addNew();
			} else {
				this.doneEdit();
			}
    	},
	 //    selectedId(x){ console.log('climb'); this.selectedId = x; },
		// selectedLft(x){ this.selectedLft = x; },
		// selectedDepth(x){ this.selectedDepth = x; },
		childMetaSent(x){ 
			var lft = Object.keys(x)[0].toString();
			var id = x[lft];
			this.childrenMeta[lft] = id;
		},
		// parentMetaSent(x){
		// 	//if(this.thing.lft == 1){ return; }
		// 	var lft = Object.keys(x)[0].toString();
		// 	console.log(lft);
		// 	var id = x[lft];
		// 	console.log('current sel-lft = '+this.selectedLft);
		// 	this.selectedLft = lft;
		// 	this.selectedId = id;
		// 	console.log('new sel-lft = '+this.selectedLft);
		// },
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