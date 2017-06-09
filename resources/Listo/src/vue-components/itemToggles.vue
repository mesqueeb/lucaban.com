<template>
	<div>
		<div
			v-if="state.selection.view != 'journal'"
			:class="{'o-toggle-div':true,
				'l-toggle-div':true,
				'o-toggle-div--both':item.children_order.length>0
					&&(item.done == true || get.allChildrenDone(item.id) )
			}"
		>
			<input
				type="checkbox"
				class="o-toggle__arrow-helper"
				:id="'show_children_'+item.id"
				v-model="item.show_children"
				@change="dispatch('patch',{ id:item.id, field:'show_children' })"
			>
			<label
				class="o-toggle__arrow"
				:for="'show_children_'+item.id"
				v-if="item.children_order.length>0"
			></label>
			<input
				class="o-toggle__check"
				type="checkbox"
				v-if="item.children_order.length==0
					|| item.done == true || get.allChildrenDone(item.id)"
				v-model="item.done"
				@change="dispatch('prepareDonePatch',{ id:item.id })"
			>
		</div>
		<div
			class=""
			v-if="state.selection.view == 'journal'"
		>・</div>
	</div>
</template>
<script>
export default {
	name: 'itemToggles',
	props: ['item'],
	computed:
	{
		state(){ return this.$store.state; },
		get(){ return this.$store.getters; },
	},
	methods:
	{
		// commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },
	},
}
</script>