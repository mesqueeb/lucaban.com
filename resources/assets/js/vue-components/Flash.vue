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
		card()
		{
			return this.$root.$refs.root;
		},
		basis()
		{
			return this.$root;
		},
	},
    methods: {
        close()
        {
        	this.$root.closeFlash({flash:this.flash});
        },
        maskClick(event)
        {
        	if(event.target.id == 'flashes-mask')
        	{
        	}
        },
        clearAll(event)
        {
        	vm.flashes = [];
        	window.timers = {};
        },
    },
}
</script>