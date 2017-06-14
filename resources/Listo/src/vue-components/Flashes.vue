<template id="flash-template">
<div id="c-flashes-mask">
<transition-group name="fade">
	<Flash
		v-for="(flash, index) in flashes"
		:flash="flash"
		:index="index"
		:key="'flash-'+index"
	>
	</Flash>
</transition-group>
</div>
</template>

<script>
import Flash from './Flash.vue'
export default {
    name: 'Flashes',
    template: '#flash-template',
    components: {
    	Flash,
    },
	data(){
		return {
			timerRunning: true,
		};
	},
	mounted()
	{
		if(!window.timers){ window.timers = {}; }
		eventHub.$on('clearAll', this.clearAll);
	},
	computed: {
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		flashes(){ return this.state.flashes },
	},
    methods: {
		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },
        maskClick(event)
        {
        	if(event.target.id == 'c-flashes-mask')
        	{
        	}
        },
        clearAll(event)
        {
        	this.commit('updateState', { flashes:[] });
        	window.timers = {};
        },
    },
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
#c-flashes-mask{
	position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
}
.o-flash {
    margin: 0.5rem;
    background-color: rgba(255, 255, 255, 1);
    // border: solid thin rgba(0,0,0,0.1);
    box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.5);
    display: flex;
    justify-content: space-between;
	-webkit-transition: all 0.35s;
	transition: all 0.35s;
}
.o-flash__button {
    padding: 0 0.5rem;
}
.o-flash__body {
	display: flex;
	flex-direction: row;
	padding: 0.5em;
}
.o-flash--success{
}
.o-flash--error{
}
</style>