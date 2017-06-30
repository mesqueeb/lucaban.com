<template id="popouts-template">
<div id="js-popouts-mask"
	class="c-popouts-mask" 
	v-if="popoutExists"
	@click="maskClick($event)"
>
<!-- Popout DELETE -->
	<div v-if="popouts.delete.length"
		v-for="item in popouts.delete"
		class="c-popout"
	>
		<div 
			class="c-popout__delete"
		>
			<div class="c-popout__bodybox">{{ get.text.popouts.reallyDelete }}「{{ item.body }}」<strong v-if="item.children.length" style="padding-left:0 0.3em;"> {{ get.text.popouts.andAllChildren }}</strong>?
			</div>
			<div class="c-popout__nav">
				<button class="o-btn btn-cancel" 
					@click="popoutCall('confirm-cancel', item)"
				>{{ get.text.global.cancel }}</button>
				<button
					class="o-btn o-btn--warning btn-ok js-btn-ok"
					v-focus.noMobile
					@click="popoutCall('confirm-ok', item)"
				>{{ get.text.global.delete }}</button>
			</div>
		</div>
	</div>
<!-- Popout /DELETE -->
<!-- Popout GUIDE -->
	<div v-if="popouts.guide"
		class="c-popout"
	>
		<div 
			class="c-guide"
		>
			<div class="c-popout__bodybox">
				<table class="c-guide__table">
					<tr>
						<th>{{ get.text.guide.action }}</th><th>{{ get.text.guide.key }}</th>
					</tr>
					<tr v-for="k in guide">
						<td v-html="state.keybindings[k].guide[get.language]"></td><td v-html="stringToKeyboardKeys(state.keybindings[k][get.oS])"></td>
					</tr>
				</table>
			</div>
			<div class="c-popout__nav">
				<button
					class="o-btn btn-ok js-btn-ok"
					v-focus.noMobile
					@click="this.clearAll"
				>{{ get.text.popouts.ok }}</button>
			</div>
		</div>
	</div>
<!-- Popout /GUIDE -->
<!-- Popout TIMER -->
	<div v-if="popouts.timer.length"
		v-for="item in popouts.timer"
		class="c-popout"
	>
		<div 
			:class="{
				'c-timer': true,
			}"
		>
			<div class="c-timer__body">
				<div class="c-popout__bodybox">
					<div class="l-toggle-div--popout o-toggle-div">
						<input class="o-toggle__check"
							type="checkbox"
							v-if="item.children_order.length==0 || item.done == true"
							v-model="item.done"
							@change="updateDone(item)"
						>
					</div>
					<span :class="{'c-popout--done': item.done}"></span>{{ item.body }}
				</div>
				<div v-if="!item.planned_time"
					 class="c-timer__time" 
				>
					{{ sec_to_hhmmss(item.used_time) }}
				</div>
				<div
					v-if="item.planned_time"
					:class="{
						'c-timer__time':true,
						'countdown':true,
						'c-timer__time--overtime':item.used_time>item.planned_time*60,
					}"
				>
					<div
						v-if="item.used_time>item.planned_time*60"
						class="c-timer__overtime-notice"
					>
						{{ get.text.popouts.overtime }}
					</div>
					<div>
						{{ countdownTimer(item.used_time,item.planned_time) }}
					</div>
				</div>
				<div
					v-if="item.used_time>item.planned_time*60 && item.planned_time"
				>
					{{ get.text.popouts.total }}  {{ sec_to_hhmmss(item.used_time) }}
				</div>
				<!-- {{ item.used_time }}</div> -->
			</div>
			<div class="c-popout__nav">
				<button
					class="o-btn play"
					v-btn-effect
					v-show="!timerRunning"
					@click="timerNav('play', item)"
				><q-icon name="ion-ios-play" />
				</button>
				<button
					class="o-btn pause"
					v-btn-effect
					v-show="timerRunning"
					@click="timerNav('pause', item)"
				><q-icon name="ion-ios-pause" />
				</button>
				<button
					class="o-btn forward"
					v-btn-effect
					@click="timerNav('forward', item, 1)"
				>
					<q-icon name="ion-ios-fastforward" />
					<span v-if="false && item.planned_time && item.used_time<item.planned_time*60"
					>-</span><span v-else></span>
				1 {{ get.text.global.min }}
				</button>
				<button
					class="o-btn forward"
					v-btn-effect
					@click="timerNav('forward', item, 5)"
				>
					<q-icon name="ion-ios-fastforward" />
					<span v-if="false && item.planned_time && item.used_time<item.planned_time*60"
					>-</span><span v-else></span>
				5 {{ get.text.global.min }}
				</button>
				<button
					class="o-btn reset"
					v-btn-effect
					@click="timerNav('reset', item)"
				>{{ get.text.popouts.reset }}</button>
				<button
					class="o-btn btn-ok js-btn-ok"
					@click="timerNav('close', item)"
				>{{ get.text.popouts.ok }}</button>
			</div>
		</div>
	</div>
<!-- Popout /TIMER -->
<!-- Popout EDIT -->
	<!-- <div v-if="popouts.edit.length"
		v-for="item in popouts.edit"
		class="popout"
	>
Deleted
	</div> -->
<!-- Popout /EDIT -->
</div>
</template>
<script>
// import PopoutConfirmation from './PopoutConfirmation.vue';
// we import all of `date`
import { date } from 'quasar'
// destructuring to keep only what is needed
const { formatDate } = date;
import { sec_to_hhmmss, customCalendar } from '../helpers/valueMorphers2.js'
import autosize from 'autosize';
import {stringToKeyboardKeys} from '../helpers/globalFunctions.js'

export default {
    name: 'Popouts',
    template: '#popouts-template',
	data(){
		return {
			timerRunning: true,
		};
	},
	created()
	{
		this.$bus.$on('playTimer', this.playTimer);
		this.$bus.$on('clearAll', this.clearAll);
	},
	computed: {
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		popouts(){ return this.state.popouts },
		popoutExists()
		{
			return ( this.popouts.timer.length
					|| this.popouts.delete.length
					|| this.popouts.edit.length
					|| this.popouts.guide );
		},
		guide()
		{
			return Object.keys(this.state.keybindings).filter(k => this.state.keybindings[k][this.get.oS]);
		},
	},
    methods: {
		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },
    	sec_to_hhmmss, customCalendar, stringToKeyboardKeys,
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
        	let index = this.state.popouts.timer.indexOf(item);
        	if(index == -1){
	        	index = this.state.popouts.delete.indexOf(item);
	            this.commit('removePopout', { type:'delete', index });
	            return;
        	}
            this.commit('removePopout', { type:'timer', index });
        },
        popoutCall(msg, item)
        {
        	Vue.bus.$emit(msg, item.id);
        	this.removePopout(item);
        },
        maskClick(event)
        {
        	if(event.target.id == 'js-popouts-mask')
        	{
        		this.clearAll();
        	}
        },
        clearAll(event)
        {
        	this.commit('updatePopouts', { delete:[]});
        	this.state.popouts.timer.forEach(item => this.closeTimer(item));
        	// vm.popouts.edit.forEach(item => vm.cancelEdit(item));
        	this.commit('updatePopouts', { guide:false});
        	window.timers = {};
        },
        updateDone(item)
        {
        	this.pauseTimer(item);
        	this.dispatch('prepareDonePatch', {id:item.id});
        	document.querySelector('.js-btn-ok').focus();
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
        	item = (item) ? item : (this.timer[0]) ? this.timer[0] : null ;
        	if(!item){ console.log('no timer item'); return; }
        	// console.log(item);
        	console.log("timer started: "+formatDate(new Date(),'HH:mm:ss'));
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
        	console.log("timer paused: "+formatDate(new Date(), 'HH:mm:ss'));
			this.timerRunning = false;
			if (!window.timers) { return; }
			if (!window.timers[item.id]) { return; }
			clearInterval(window.timers[item.id]);
			delete window.timers[item.id];
			this.dispatch('patch', {id:item.id, field:'used_time'});
		},
		forwardTimer(item, time)
		{
			time = time*60;
			item.used_time = item.used_time+time;
		},
		resetTimer(item)
		{
        	console.log("timer reset: "+formatDate(new Date(), 'HH:mm:ss'));
			item.used_time = 0;
			this.dispatch('patch', {id:item.id, field:'used_time'});
		},
		closeTimer(item)
		{
        	console.log("timer closed: "+formatDate(new Date(), 'HH:mm:ss'));
			if (window.timers && window.timers[item.id])
			{
				clearInterval(window.timers[item.id]);
				delete window.timers[item.id];
			}
			if(item.used_time < 5)
			{
				item.used_time = 0;
			} else {
				this.dispatch('patch', {id:item.id, field:'used_time'});
			}
			this.removePopout(item);
		},
    },
}
</script>
<style lang="scss">
@import '../css/_variables.scss';
.c-popouts-mask, .turnofflights {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;   
    top: -100px;
    left: -100px;
    box-sizing: content-box;
    padding: 100px;
}
.c-guide__table tr>td:first-child {
    border-right: thin solid lightgrey;
}
.c-guide__table td, th {
    border-bottom: thin lightgrey solid;
    padding: 0.2rem 0.3rem;
}
.c-popout {
    box-sizing: border-box;
    z-index: 5;
    background: white;
    border-radius: 0.3em;
    margin: 1em;
}
.c-popout__bodybox {
    border-bottom: 1px solid #e3e3e3;
    align-items: center;
    font-size: 1.1em;
    padding: 1em;
    width: 100%;
}
.c-popout__nav {
    padding: 0.6em 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.c-timer__body{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.c-timer__time {
    font-size: 4em;
    margin: 0 auto;
    padding: 0.3em 0.8em 0;
    line-height: normal;
}
.c-timer__overtime-notice{
    color: $duedate-color;
    font-size: 0.3em;
    width: 100%;
}
.c-timer__time--overtime{
    color: $duedate-color;
}
.l-toggle-div--popout{
    margin-top: -0.2em;
    margin-right: 0.5em;
}
.c-popout{
    button {
        font-size: 1.1em;
        padding: 0 0.4em;
        margin: 0 0.3em;
    }
    button.play, button.pause {
        font-size: 1.3em;
    }
}
.c-popout--done{
    color: $gray;
    text-decoration: line-through;    
}

</style>