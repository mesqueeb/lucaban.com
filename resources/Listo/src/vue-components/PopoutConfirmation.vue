<template id="popout-confirmation-template">
<div :class="popout.type">
	<div class="bodybox">Really delete「{{ popout.item.body }}」<strong v-if="popout.item.children.length" style="padding-left:0 0.3em;"> and all children</strong>?
	</div>
	<div class="nav">
		<button class="btn-cancel" 
			@click="popoutCall('confirm-cancel', popout)"
		>Cancel</button>
		<button class="btn-ok" 
			@click="popoutCall('confirm-ok', popout)"
		>OK</button>
	</div>
</div>
</template>
<script>
export default {
	template: '#popout-confirmation-template',
	name: 'Popout-Confirmation',
	props: ['item'],
}
</script>