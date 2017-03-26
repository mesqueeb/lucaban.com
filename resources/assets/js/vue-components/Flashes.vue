<template id="flash-template">
<div id="flashes-mask">
<transition-group name="fade">
	<Flash
		v-for="(flash, index) in flashes"
		:flash="flash"
		:key="'flash-'+index"
	>
	</Flash>
</transition-group>
</div>
</template>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
#flashes-mask{
	position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
}
.flash {
    margin: 0.5rem;
    background-color: rgba(255, 255, 255, 1);
    // border: solid thin rgba(0,0,0,0.1);
    box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.5);
    display: flex;
    justify-content: space-between;
	-webkit-transition: all 0.35s;
	transition: all 0.35s;
	button {
	    padding: 0 0.5rem;
	}
}
</style>
<script>
export default {
    name: 'Flashes',
    template: '#flash-template',
    props: ['flashes'],
    components: {
    	'Flash': {
    		template: `
				<div
					class="flash"
					:class="flash.type"
				>
						<div class="bodybox">{{ flash.msg }}</div>
						<button class="close" @click="close">✗</button>
				</div>
    		`,
		    props: ['flash'],
    		mounted(){
    			setTimeout(function() {
	    			this.close();
    			}.bind(this), 2000);
    		},
    		methods:{
		        close()
		        {
		        	this.$root.flashes = this.$root.flashes.filter(f => f != this.flash);
		        },
    		},
    	},
    },
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
        maskClick(event)
        {
        	if(event.target.id == 'flashes-mask')
        	{
        	}
        },
        clearAll(event)
        {
        	this.$root.flashes = [];
        	window.timers = {};
        },
    },
}
</script>