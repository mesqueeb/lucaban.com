<template id="popouts-template">
<div id="popouts-mask"
	v-if="popouts.timer.length || popouts.delete.length"
	@click="clearAll($event)"
>
<!-- 	<Popout-Confirmation
		v-if="popouts.delete.length"
		v-for="item in popouts.delete"
		:item="item"
	></Popout-Confirmation> -->

	<div v-if="popouts.delete.length"
		v-for="item in popouts.delete"
		class="popout"
	>
		<div 
			class="delete"
		>
			<div class="bodybox">Really delete「{{ item.body }}」<strong v-if="item.children.length" style="padding-left:0 0.3em;"> and all children</strong>?
			</div>
			<div class="nav">
				<button class="btn-cancel" 
					@click="popoutCall('confirm-cancel', item)"
				>Cancel</button>
				<button class="btn-ok" 
					@click="popoutCall('confirm-ok', item)"
				>OK</button>
			</div>
		</div>
	</div>
	<div v-if="popouts.timer.length"
		v-for="item in popouts.timer"
		class="popout"
	>

		<div 
			:class="{
				done: item.done,
				timer: true,
			}"
		>
			<div class="body">
				<div class="bodybox">
					<div class="toggle-div">
						<input class="toggle"
							type="checkbox"
							v-if="item.children_order.length==0 || item.done == true"
							v-model="item.done"
							@change="updateDone(item)"
						>
					</div>{{ item.body }}
				</div>
				<div v-if="!item.planned_time"
					class="timer-time" 
				>
				<!-- {{ item.used_time | hhmmss }}</div> -->
				{{ sec_to_hhmmss(item.used_time) }}</div>
				<div v-if="item.planned_time"
					:class="{
						'timer-time':true,
						'countdown':true,
						'overtime':item.used_time>item.planned_time*60,
					}"
				>
					<div v-if="item.used_time>item.planned_time*60" class="overtime-notice">overtime</div>
					<div>{{ countdownTimer(item.used_time,item.planned_time) }}</div>
				</div>
				<!-- {{ item.used_time }}</div> -->
			</div>
			<div class="nav">
				<button class="play btn btn-dipclick"
					v-show="!timerRunning"
					@click="timerNav('play', item)"
				><i class="zmdi zmdi-play"></i>
				</button>
				<button class="pause btn btn-dipclick"
					v-show="timerRunning"
					@click="timerNav('pause', item)"
				><i class="zmdi zmdi-pause"></i>
				</button>
				<button class="forward btn btn-dipclick"
					@click="timerNav('forward', item)"
				>+1 min
				</button>
				<button class="reset btn btn-dipclick"
					@click="timerNav('reset', item)"
				>Reset</button>
				<button class="btn-ok"
					@click="timerNav('close', item)"
				>OK</button>
			</div>
		</div>
	</div>
</div>
</template>
<script>
// import PopoutConfirmation from './PopoutConfirmation.vue';
import { sec_to_hhmmss, momentCalendar } from '../components/valueMorphers2.js'

export default {
    name: 'Popouts',
    template: '#popouts-template',
    props: ['popouts'],
    // components: {
    // 	PopoutConfirmation
    // },
	data(){
		return {
			timerRunning: true,
		};
	},
	mounted(){
		eventHub.$on('playTimer', this.playTimer);
		eventHub.$on('clearAll', this.clearAll);
	},
    methods: {
    	sec_to_hhmmss, momentCalendar,
    	countdownTimer(used_time, planned_time){
    		let secondsLeft = planned_time*60-used_time;
    		if(secondsLeft>0){
	    		return this.sec_to_hhmmss(secondsLeft);
    		} else {
	    		return this.sec_to_hhmmss(used_time);
    		}
    	},
        removePopout(item) {
            this.timerRunning = false;
        	let index = this.$root.popouts.timer.indexOf(item);
        	if(index == -1){
	        	index = this.$root.popouts.delete.indexOf(item);
	            this.$root.popouts.delete.splice(index, 1);
	            return;
        	}
            this.$root.popouts.timer.splice(index, 1);
        },
        popoutCall(msg, item){
        	eventHub.$emit(msg, item.id);
        	this.removePopout(item);
        },
        clearAll(event){
        	if(!event || event.target.id == 'popouts-mask'){
	        	vm.popouts.timer.forEach(function(item) {
					this.closeTimer(item);
	        	}.bind(this));
	        	vm.popouts.delete.forEach(function(item) {
					this.removePopout(item);
	        	}.bind(this));
        	}
        },
        updateDone(item){
        	this.pauseTimer(item);
        	allItems.prepareDonePatch(item.id);
        	document.querySelector('.btn-ok').focus();
        },
        timerNav(button, item){
        	if(button == 'play'){ this.playTimer(item); }
			if(button == 'pause'){ this.pauseTimer(item); }
			if(button == 'forward'){ this.forwardTimer(item); }
			if(button == 'reset'){ this.resetTimer(item); }
			if(button == 'close'){ this.closeTimer(item); }
        },
        playTimer(item){
        	// console.log(item);
        	console.log("timer started: "+moment().format('HH:mm:ss'));
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
        	console.log("timer paused: "+moment().format('HH:mm:ss'));
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
        	console.log("timer reset: "+moment().format('HH:mm:ss'));
			item.used_time = 0;
			vm.patch(item.id, 'used_time');
			allItems.calculateTotalTime(item.id);
		},
		closeTimer(item){
        	console.log("timer closed: "+moment().format('HH:mm:ss'));
			if (window.timers && window.timers[item.id]){
				clearInterval(window.timers[item.id]);
				delete window.timers[item.id];
			}
			if(item.used_time < 5){
				item.used_time = 0;
			} else {
				vm.patch(item.id, 'used_time');
			}
			this.removePopout(item);
		},
    },
 //    ready() {
	// 	var vm = this;		
	// 	window.addEventListener('keydown', function(e) {

	// 	});
	// },
}
</script>