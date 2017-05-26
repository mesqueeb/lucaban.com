<template id="item-menu-template">
<div class="o-menu">
	<div class="o-menu__body">
		<div class="o-menu__item">
			<div class="o-menu__itembody">Assign</div>
			<div class="o-menu__itemkey">Ctrl + A</div>
		</div>
		<div class="o-menu__item">
			<div class="o-menu__itembody">Assign</div>
			<div class="o-menu__itemkey">Ctrl + A</div>
		</div>
		<div class="o-menu__item">
			<div class="o-menu__itembody">Assign</div>
			<div class="o-menu__itemkey">Ctrl + A</div>
		</div>
	</div>
</div>
</template>
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