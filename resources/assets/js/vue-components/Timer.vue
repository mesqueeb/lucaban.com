<template id="timer-template">
<div id="timer-area" class=""
	v-show="timerItems.length"
>
	<div class="timer" id="timer-{{ item.id }}"
		v-for="item in timerItems"
	>
		<div class="toggle-div">
			<input class="toggle"
				type="checkbox"
				v-if="item.children_order.length==0 || item.done == true"
				v-model="item.done"
				@click.prevent="markDone(item)"
			>

		</div>
		<span class="body">{{ item.body }}</span>
		<span v-if="!item.planned_time"
			class="timer-time" 
		>{{ item.used_time | hhmmss }}</span>
		<span v-if="item.planned_time"
			class="timer-time countdown"
		>{{ item.id | countdown }}</span>
		<span class="nav">
			<button class="play btn btn-dipclick"
				@click="playTimer(item)"
			><i class="zmdi zmdi-play"></i>
			</button>
			<button class="pause btn btn-dipclick"
				@click="pauseTimer(item)"
			><i class="zmdi zmdi-pause"></i>
			</button>
			<button class="forward btn btn-dipclick"
				@click="forwardTimer(item)"
			><i class="zmdi zmdi-forward-10"></i>
			</button>
			<button class="reset btn btn-dipclick"
				@click="resetTimer(item)"
			><i class="zmdi zmdi-time-restore"></i>
			</button>
			<button class="stop btn btn-dipclick"
				@click="removeTimer(item)"
			><i class="zmdi zmdi-close"></i>
			</button>
		</span>
	</div>
</div>
</template>
<script>
export default {
	name: 'Timer',
	template:'#timer-template',
	data (){
		return {
			timerItems: [],
		};
	},
	methods: {
		btnEffect(id, identifier){
			let $el = $('#timer-'+id+' .'+identifier);
			$el.addClass("btn--click");
			setTimeout(function(){
				$el.removeClass("btn--click");
			}, 400);
		},
		addTimer(id){
			id = (!id) ? selection.selectedId : id ;
			let item = allItems.nodes[id];
			let timerExists = this.timerItems.filter(function (item) { return item.id === id; })[0];
			if (!timerExists){
				this.timerItems.push(item);
				this.playTimer(item);
			}
		},
		playTimer(item){
			this.btnEffect(item.id, 'play');
			let update = function(){
				if(item.planned_time>0){
					item.used_time = ++item.used_time;
				} else {
					item.used_time = ++item.used_time;
				}

			}
			window.timers = (!window.timers) ? {} : timers;
			if(timers[item.id]){ return; }
			timers[item.id] = setInterval(update,1000);
		},
		pauseTimer(item){
			this.btnEffect(item.id, 'pause');
			clearInterval(window.timers[item.id]);
			delete window.timers[item.id];
			vm.patch(item.id, 'used_time');
			allItems.calculateTotalTime(item.id);
		},
		forwardTimer(item){
			this.btnEffect(item.id, 'forward');
			item.used_time = item.used_time+60;
		},
		resetTimer(item){
			this.btnEffect(item.id, 'reset');
			item.used_time = 0;
			vm.patch(item.id, 'used_time');
			allItems.calculateTotalTime(item.id);
		},
		removeTimer(item){
			this.btnEffect(item.id, 'close');
			clearInterval(window.timers[item.id]);
			delete window.timers[item.id];
			if(item.used_time < 5){
				item.used_time = 0;
			} else {
				vm.patch(item.id, 'used_time');
				allItems.calculateTotalTime(item.id);
			}
			document.getElementById('timer-'+item.id).className += ' fade-out';
			setTimeout(function(){ this.timerItems.$remove(item) }.bind(this),1000);
		},
	},
}
</script>