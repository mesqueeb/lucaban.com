<template id="flash-template">
<div
	class="flash"
	:class="flash.type"
>
		<div class="bodybox">{{ flash.msg }}</div>
		<button class="close" @click="close">✗</button>
</div>
</template>
<style>
.flash{
	display: flex;
}
</style>
<script>
export default {
    name: 'Flash',
    template: '#flash-template',
    props: ['flash'],
    // components: {
    // 	'Minimal-Flash': {
		  //   name: 'Minimal-Flash',
		  //   props: ['flash'],
    // 		mounted(){
    // 			console.log('ab');
    // 		},
    // 	},
    // },
	data(){
		return {
			timerRunning: true,
		};
	},
	mounted()
	{
		console.log('DDD');
		eventHub.$on('playTimer', this.playTimer);
		eventHub.$on('clearAll', this.clearAll);
	},
	computed: {
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
	},
    methods: {
		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },
        close()
        {
        	this.commit('closeFlash', {flash:this.flash});
        },
        maskClick(event)
        {
        	if(event.target.id == 'flashes-mask')
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