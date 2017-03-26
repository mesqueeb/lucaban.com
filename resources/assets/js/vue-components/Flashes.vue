<template id="flash-template">
<div id="flashes-mask">
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
	.bodybox {
		display: flex;
		flex-direction: row;
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
						<div class="bodybox">{{ flash.msg }}
							<span v-if="flash.type=='ajaxError'">{{ countDown }}</span>
						</div>
						<button class="close" @click="close">✗</button>
				</div>
    		`,
		    props: ['flash', 'index'],
		    data(){
		    	return { countDown: 4, }
		    },
		    // computed: {
		    // 	countDown()
		    // 	{
		    // 		return this.countDownIni;
		    // 	},
		    // },
    		mounted(){
    			if(this.flash.type=='ajaxError')
    			{
		    		window.timers['flash-'+this.index] = window.setInterval(function(){
			    		this.countDown--;
			    		if(this.countDown == 0){ location.reload(); }
		    		}.bind(this), 1000);
    				return;
    			}
    			window.timers['flash-'+this.index] = setTimeout(function() {
	    			this.close();
    			}.bind(this), 2000);
    		},
    		methods:{
		        close()
		        {
		        	if(window.timers['flash-'+this.index])
		        	{
		        		clearInterval(window.timers['flash-'+this.index]);
		        		delete window.timers['flash-'+this.index];
			        }
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
		if(!window.timers){ window.timers = {}; }
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