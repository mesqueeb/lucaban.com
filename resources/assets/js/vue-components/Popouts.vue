<template id="popouts-template">
<div id="popouts-mask"
	v-if="popoutExists"
	@click="maskClick($event)"
>
<!-- 	<Popout-Confirmation
		v-if="popouts.delete.length"
		v-for="item in popouts.delete"
		:item="item"
	></Popout-Confirmation> -->

<!-- Popout DELETE -->
	<div v-if="popouts.delete.length"
		v-for="item in popouts.delete"
		class="popout"
	>
		<div 
			class="delete"
		>
			<div class="bodybox">{{ basis.text.popouts.reallyDelete }}「{{ item.body }}」<strong v-if="item.children.length" style="padding-left:0 0.3em;"> {{ basis.text.popouts.andAllChildren }}</strong>?
			</div>
			<div class="nav">
				<button class="btn-cancel" 
					@click="popoutCall('confirm-cancel', item)"
				>{{ basis.text.global.cancel }}</button>
				<button
					class="btn-ok btn-warning"
					v-focus
					@click="popoutCall('confirm-ok', item)"
				>{{ basis.text.global.delete }}</button>
			</div>
		</div>
	</div>
<!-- Popout /DELETE -->
<!-- Popout GUIDE -->
	<div v-if="popouts.guide"
		class="popout"
	>
		<div 
			class="guide"
		>
			<div class="bodybox">
				<table>
					<tr>
						<th>{{ basis.text.guide.action }}</th><th>{{ basis.text.guide.key }}</th>
					</tr>
					<tr v-for="row in basis.text.guide.keybindings">
						<td v-html="row.note"></td><td>{{ row.key }}</td>
					</tr>
				</table>
			</div>
			<div class="nav">
				<button
					class="btn-ok"
					v-focus
					@click="this.clearAll"
				>{{ basis.text.popouts.ok }}</button>
			</div>
		</div>
	</div>
<!-- Popout /GUIDE -->
<!-- Popout TIMER -->
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
					{{ sec_to_hhmmss(item.used_time) }}
				</div>
				<div
					v-if="item.planned_time"
					:class="{
						'timer-time':true,
						'countdown':true,
						'overtime':item.used_time>item.planned_time*60,
					}"
				>
					<div
						v-if="item.used_time>item.planned_time*60"
						class="overtime-notice"
					>
						{{ basis.text.popouts.overtime }}
					</div>
					<div>
						{{ countdownTimer(item.used_time,item.planned_time) }}
					</div>
				</div>
				<div
					v-if="item.used_time>item.planned_time*60 && item.planned_time"
				>
					{{ basis.text.popouts.total }}  {{ sec_to_hhmmss(item.used_time) }}
				</div>
				<!-- {{ item.used_time }}</div> -->
			</div>
			<div class="nav">
				<button
					class="play btn btn-dipclick"
					v-show="!timerRunning"
					@click="timerNav('play', item)"
				><i class="zmdi zmdi-play"></i>
				</button>
				<button
					class="pause btn btn-dipclick"
					v-show="timerRunning"
					@click="timerNav('pause', item)"
				><i class="zmdi zmdi-pause"></i>
				</button>
				<button
					class="forward btn btn-dipclick"
					@click="timerNav('forward', item, 1)"
				>
				<span v-if="item.planned_time && item.used_time<item.planned_time*60"
				>-</span><span v-else>+</span>
				1 {{ basis.text.global.min }}
				</button>
				<button
					class="forward btn btn-dipclick"
					@click="timerNav('forward', item, 5)"
				>
				<span v-if="item.planned_time && item.used_time<item.planned_time*60"
				>-</span><span v-else>+</span>
				5 {{ basis.text.global.min }}
				</button>
				<button
					class="reset btn btn-dipclick"
					@click="timerNav('reset', item)"
				>{{ basis.text.popouts.reset }}</button>
				<button
					class="btn-ok"
					@click="timerNav('close', item)"
				>{{ basis.text.popouts.ok }}</button>
			</div>
		</div>
	</div>
<!-- Popout /TIMER -->
<!-- Popout EDIT -->
	<div v-if="popouts.edit.length"
		v-for="item in popouts.edit"
		class="popout"
	>
		<div>
			<div class="body">
				<form
					action="update"
					class="updatebox"
					:id="'updatebox-'+item.id"
					
					@submit.prevent="card.doneEdit(item)"
				>
					<div class="update-body">
						<textarea
							v-focus
							v-autoheight
							class="edititem-body"
							v-model="item.body"
							@blur="card.blurOnEdit(item)"
							@keydown="card.keydownOnEdit(item, $event, 'body')"
						></textarea>
					</div>
					<div class="update-tags">
						<div
							class="update-planned-time"
						>
							<span>{{ basis.text.card.duration }}</span>
							<button
								:class="{ currentDuration: item.planned_time == 10, 'planned-time': true }"
								@click.prevent="card.setPlannedTime(item, $event)"
								@keydown="card.keydownOnEdit(item, $event, 'planned-time')"
								@blur="card.blurOnEdit(item)"
								value="10"
							>10 {{ basis.text.global.min }}</button>
							<button
								:class="{ currentDuration: item.planned_time == 15, 'planned-time': true }"
								@click.prevent="card.setPlannedTime(item, $event)"
								@keydown="card.keydownOnEdit(item, $event, 'planned-time')"
								@blur="card.blurOnEdit(item)"
								value="15"
							>15 {{ basis.text.global.min }}</button>
							<button
								:class="{ currentDuration: item.planned_time == 30, 'planned-time': true }"
								@click.prevent="card.setPlannedTime(item, $event)"
								@keydown="card.keydownOnEdit(item, $event, 'planned-time')"
								@blur="card.blurOnEdit(item)"
								value="30"
							>30 {{ basis.text.global.min }}</button>
							<button
								:class="{ currentDuration: item.planned_time == 60, 'planned-time': true }"
								@click.prevent="card.setPlannedTime(item, $event)"
								@keydown="card.keydownOnEdit(item, $event, 'planned-time')"
								@blur="card.blurOnEdit(item)"
								value="60"
							>1 {{ basis.text.global.hour }}</button>
							<div><input
								class="planned-time" 
								type="number"
								v-show="true"
								v-model="item.planned_time"
								@blur="card.blurOnEdit(item)"
								@keydown="card.keydownOnEdit(item, $event, 'planned-time')"
							/>{{ basis.text.global.min }}</div>
						</div>
					</div>
				</form>
			</div>
			<div class="nav">
				<button
					class="btn"
					@click="card.cancelEdit(item)"
				>{{ basis.text.global.cancel }}</button>
				<button
					class="btn"
					@click="card.doneEdit(item)"
				>{{ basis.text.global.save }}</button>
			</div>
		</div>
	</div>
<!-- Popout /EDIT -->
</div>
</template>
<script>
// import PopoutConfirmation from './PopoutConfirmation.vue';
import { sec_to_hhmmss, momentCalendar } from '../components/valueMorphers2.js'
import autosize from 'autosize';

export default {
    name: 'Popouts',
    template: '#popouts-template',
    props: ['popouts'],
	data(){
		return {
			timerRunning: true,
		};
	},
	mounted()
	{
		eventHub.$on('playTimer', this.playTimer);
		eventHub.$on('clearAll', this.clearAll);
	},
	computed: {
		card()
		{
			return this.$root.$refs.root;
		},
		basis()
		{
			return this.$root;
		},
		popoutExists()
		{
			return ( this.popouts.timer.length
					|| this.popouts.delete.length
					|| this.popouts.edit.length
					|| this.popouts.guide );
		},
	},
    methods: {
    	sec_to_hhmmss, momentCalendar,
    	countdownTimer(used_time, planned_time)
    	{
    		let secondsLeft = planned_time*60-used_time;
    		if(secondsLeft>0){
	    		return this.sec_to_hhmmss(secondsLeft);
    		} else {
	    		return this.sec_to_hhmmss(used_time-planned_time*60);
    		}
    	},
        removePopout(item)
        {
            this.timerRunning = false;
        	let index = this.$root.popouts.timer.indexOf(item);
        	if(index == -1){
	        	index = this.$root.popouts.delete.indexOf(item);
	            this.$root.popouts.delete.splice(index, 1);
	            return;
        	}
            this.$root.popouts.timer.splice(index, 1);
        },
        popoutCall(msg, item)
        {
        	eventHub.$emit(msg, item.id);
        	this.removePopout(item);
        },
        maskClick(event)
        {
        	if(event.target.id == 'popouts-mask')
        	{
        		this.clearAll();
        	}
        },
        clearAll(event)
        {
        	vm.popouts.delete = [];
        	vm.popouts.timer.forEach(item => this.closeTimer(item));
        	vm.popouts.edit.forEach(item => vm.cancelEdit(item));
        	vm.popouts.guide = false;
        	window.timers = {};
        },
        updateDone(item)
        {
        	this.pauseTimer(item);
        	allItems.prepareDonePatch(item.id);
        	document.querySelector('.btn-ok').focus();
        },
        timerNav(button, item, value)
        {
        	if(button == 'play'){ this.playTimer(item); }
			if(button == 'pause'){ this.pauseTimer(item); }
			if(button == 'forward'){ this.forwardTimer(item, value); }
			if(button == 'reset'){ this.resetTimer(item); }
			if(button == 'close'){ this.closeTimer(item); }
        },
        playTimer(item)
        {
        	// console.log(item);
        	console.log("timer started: "+moment().format('HH:mm:ss'));
        	this.timerRunning = true;
			let update = function(){
				if(item.planned_time>0)
				{
					item.used_time = ++item.used_time;
				} else {
					item.used_time = ++item.used_time;
				}
			}
			window.timers = (!window.timers) ? {} : timers;
			if(timers[item.id]){ return; }
			timers[item.id] = setInterval(update,1000);
		},
		pauseTimer(item)
		{
        	console.log("timer paused: "+moment().format('HH:mm:ss'));
			this.timerRunning = false;
			if (!window.timers) { return; }
			if (!window.timers[item.id]) { return; }
			clearInterval(window.timers[item.id]);
			delete window.timers[item.id];
			vm.patch(item.id, 'used_time');
		},
		forwardTimer(item, time)
		{
			time = time*60;
			item.used_time = item.used_time+time;
		},
		resetTimer(item)
		{
        	console.log("timer reset: "+moment().format('HH:mm:ss'));
			item.used_time = 0;
			vm.patch(item.id, 'used_time');
		},
		closeTimer(item)
		{
        	console.log("timer closed: "+moment().format('HH:mm:ss'));
			if (window.timers && window.timers[item.id])
			{
				clearInterval(window.timers[item.id]);
				delete window.timers[item.id];
			}
			if(item.used_time < 5)
			{
				item.used_time = 0;
			} else {
				vm.patch(item.id, 'used_time');
			}
			this.removePopout(item);
		},
    },
}
</script>