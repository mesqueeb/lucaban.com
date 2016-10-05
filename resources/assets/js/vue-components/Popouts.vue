<template id="popouts-template">
<div class="popouts" v-if="popouts.length">
	<div v-for="popout in popouts"
		class="popout"
	>
		<div class="body bodybox">{{ popout.title }}</div>
		<div class="nav">
			<a href="#"
				@click="popoutCall('confirm-cancel', popout)"
			>Cancel</a>
			<a href="#"
				@click="popoutCall('confirm-ok', popout)"
			>OK</a>
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
    },

}
</script>