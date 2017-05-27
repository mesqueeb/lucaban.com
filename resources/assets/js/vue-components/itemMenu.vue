<template id="item-menu-template">
<div class="o-popmenu">
	<div class="o-popmenu__body">
		<div class="o-popmenu__item">
			<div class="o-popmenu__itembody">Assign</div>
			<div class="o-popmenu__itemkey">Ctrl + A</div>
		</div>
		<div class="o-popmenu__item">
			<div class="o-popmenu__itembody">Assign</div>
			<div class="o-popmenu__itemkey">Ctrl + A</div>
		</div>
		<div class="o-popmenu__item">
			<div class="o-popmenu__itembody">Assign</div>
			<div class="o-popmenu__itemkey">Ctrl + A</div>
		</div>
	</div>
</div>
</template>
<style>

</style>
<script>
export default {
    name: 'itemMenu',
    template: '#item-menu-template',
    props: ['item'],
    // data(){},
    computed:
    {},
    methods:
    {},
}
</script>