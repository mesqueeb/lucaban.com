<template>
<div
	class="o-flash"
	:class="'o-flash--'+flash.type"
>
		<div class="o-flash__body" v-html="flash.msg">
			<span v-if="flash.type=='ajaxError'">{{ countDown }}</span>
		</div>
		<button v-if="flash.type == 'ajaxError'" class="o-btn o-flash__button ml-auto" @click="reload">{{ get.text.global.reload }}</button>
		<button class="o-btn o-flash__button" @click="closeSelf">✗</button>
</div>
</template>

<script>
export default {
    props: ['flash', 'index'],
    data(){
    	return {
    		countDown: 4,
    	}
    },
    computed: {
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
    },
	mounted(){
		let self = this;
		if(this.flash.type=='ajaxError')
		{
    		window.timers['flash-'+self.index] = window.setInterval(function(){
	    		self.countDown--;
	    		if(self.countDown == 0){ self.closeSelf(); }
    		}, 1000);
			return;
		}
		window.timers['flash-'+self.index] = setTimeout(function() {
			self.closeSelf();
		}, 2000);
	},
	methods:{
		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
        closeSelf()
        {
        	if(window.timers['flash-'+this.index])
        	{
        		clearInterval(window.timers['flash-'+this.index]);
        		delete window.timers['flash-'+this.index];
	        }
        	this.commit('closeFlash', {flash:this.flash});
        },
        reload()
        {
	        location.reload();
        },
	},
}
</script>

<style lang="scss">
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