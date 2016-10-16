<template id="popouts-template">
<div id="popouts-mask"
	v-if="popouts.length"
	@click="clearAll($event)"
>
	<div v-for="popout in popouts"
		class="popout"
	>
		<div v-if="popout.type=='confirm-delete'"
			:class="popout.type"
		>
			<div class="body bodybox">Really delete
				<i style="padding: 0 0.3em;">{{ popout.item.body }}</i>
				<span v-if="popout.item.children.length"><strong style="padding-left:0 0.3em;"> and all children</strong></span>?
			</div>
			<div class="nav">
				<button class="btn-cancel" 
					@click="popoutCall('confirm-cancel', popout)"
				>Cancel</button>
				<button class="btn-ok" 
					@click="popoutCall('confirm-ok', popout)"
				>OK</button>
			</div>
		</div>
		
		<div v-if="popout.type=='timer'"
			:class="{
				done: popout.item.done,
				timer: popout.type=='timer',
			}"
		>
			<div class="body">
				<div class="toggle-div">
					<input class="toggle"
						type="checkbox"
						v-if="popout.item.children_order.length==0 || popout.item.done == true"
						v-model="popout.item.done"
						@change="updateDone(popout.item)"
					>
				</div>
				<div class="bodybox">{{ popout.item.body }}</div>
				<div v-if="!popout.item.planned_time"
					class="timer-time" 
				>{{ popout.item.used_time | hhmmss }}</div>
				<div v-if="popout.item.planned_time"
					class="timer-time countdown"
				>{{ popout.item.id | countdown }}</div>
			</div>
			<div class="nav">
				<button class="play btn btn-dipclick"
					v-show="!timerRunning"
					@click="timerNav('play', popout)"
				><i class="zmdi zmdi-play"></i>
				</button>
				<button class="pause btn btn-dipclick"
					v-show="timerRunning"
					@click="timerNav('pause', popout)"
				><i class="zmdi zmdi-pause"></i>
				</button>
				<button class="forward btn btn-dipclick"
					@click="timerNav('forward', popout)"
				>+1 min
				</button>
				<button class="reset btn btn-dipclick"
					@click="timerNav('reset', popout)"
				>Reset</button>
				<button class="btn-ok"
					@click="timerNav('close', popout)"
				>OK</button>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
    name: 'Popouts',
    template: '#popouts-template',
    props: ['popouts'],
	data: function(){
		return {
			timerRunning: true,
		};
	},
    methods: {
        removePopout(popout) {
            this.$root.popouts.$remove(popout);
            this.timerRunning = false;
        },
        popoutCall(msg, popout){
        	this.$dispatch(msg, popout.item.id);
        	this.removePopout(popout);
        },
        clearAll(event){
        	if(!event || event.target.id == 'popouts-mask'){
	        	vm.popouts.forEach(function(popout) {
					if(popout.type == 'timer'){
						this.closeTimer(popout);
					} else {
						this.removePopout(popout);
					}
	        	}.bind(this));
        	}
        },
        updateDone(item){
        	this.pauseTimer(item);
        	allItems.prepareDonePatch(item.id);
			$(".btn-ok").focus();
        },
        timerNav(button, popout){
        	let item = popout.item;
        	if(button == 'play'){ this.playTimer(item); }
			if(button == 'pause'){ this.pauseTimer(item); }
			if(button == 'forward'){ this.forwardTimer(item); }
			if(button == 'reset'){ this.resetTimer(item); }
			if(button == 'close'){ this.closeTimer(popout); }
        },
        playTimer(item){
        	this.timerRunning = true;
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
			this.timerRunning = false;
			if (!window.timers) { return; }
			if (!window.timers[item.id]) { return; }
			clearInterval(window.timers[item.id]);
			delete window.timers[item.id];
			vm.patch(item.id, 'used_time');
			allItems.calculateTotalTime(item.id);
		},
		forwardTimer(item){
			item.used_time = item.used_time+60;
		},
		resetTimer(item){
			item.used_time = 0;
			vm.patch(item.id, 'used_time');
			allItems.calculateTotalTime(item.id);
		},
		closeTimer(popout){
			let item = popout.item;
			if (window.timers && window.timers[item.id]){
				clearInterval(window.timers[item.id]);
				delete window.timers[item.id];
			}
			if(item.used_time < 5){
				item.used_time = 0;
			} else {
				vm.patch(item.id, 'used_time');
				allItems.calculateTotalTime(item.id);
			}
			this.removePopout(popout);
		},
    },
 //    ready() {
	// 	var vm = this;		
	// 	window.addEventListener('keydown', function(e) {

	// 	});
	// },
}
</script>