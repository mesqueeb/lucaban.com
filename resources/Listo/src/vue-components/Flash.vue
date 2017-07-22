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
		<q-progress class="o-flash__countdown" :percentage="countDown" color="teal-3"/>

</div>
</template>

<script>
export default {
    props: ['flash', 'index'],
    data(){
    	return {
    		countDown: 100,
    	}
    },
    computed: {
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		countDownPercentage()
		{
			// console.log(this.countDown);
    		return 40/this.countDown*100;
		},
    },
	mounted(){
		let self = this;
		if(this.flash.type=='ajaxError')
		{
    		window.timers['flash-'+self.index] = window.setInterval(function(){
	    		self.countDown--;
	    		if(self.countDown == 0){ self.closeSelf(); }
    		}, 100);
			return;
		}
		window.timers['flash-'+self.index] = window.setInterval(function(){
    		self.countDown = self.countDown-0.5;
    		if(self.countDown == 0){ self.closeSelf(); }
		}, 15);
	},
	methods:{
		commit(action, payload){ this.$store.commit(action, payload) },
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
    flex-wrap: wrap;
    justify-content: space-between;
	-webkit-transition: all 0.35s;
	transition: all 0.35s;
}
.o-flash__button {
    padding: 0 0.5rem;
}
.o-flash__countdown{
	width:100%;
	height: 2px;
	transform: rotate(180deg);
}
.o-flash__body {
	display: flex;
	flex-direction: row;
	padding: 0.5em;
    white-space: pre;
}
.o-flash--success{
}
.o-flash--error{
}
</style>