<template id="popouts-template">
<div id="popouts-mask"
	v-if="popouts.length"
	@click="clearAll"
>
	<div v-for="popout in popouts"
		class="popout"
	>
		<div class="body bodybox">{{ popout.title }}</div>
		<div class="nav">
			<button class="btn-cancel" 
				@click="popoutCall('confirm-cancel', popout)"
			>Cancel</button>
			<button class="btn-ok" 
				@click="popoutCall('confirm-ok', popout)"
			>OK</button>
		</div>
	</div>
</div>
</template>
<script>
export default {
    name: 'Popouts',
    template: '#popouts-template',
    props: ['popouts'],
    methods: {
        removePopout(popout) {
            clearTimeout(popout.timer);
            this.$root.popouts.$remove(popout);
        },
        popoutCall(msg, popout){
        	this.$dispatch(msg, popout.item.id);
        	this.removePopout(popout);
        },
        clearAll(){
        	vm.popouts = [];
        },
    },
 //    ready() {
	// 	var vm = this;		
	// 	window.addEventListener('keydown', function(e) {

	// 	});
	// },
}
</script>