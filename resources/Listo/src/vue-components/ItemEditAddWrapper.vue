<template>
<div
	:class="['full-width',{'order-last':(showAddNewBox && !state.addingNewAsChild)}]"
>
	<div
		v-if="(showEditBox || showAddNewBox) && !get.mobile"
		:class="['c-editadd-wrapper', {
			'c-editadd-wrapper--child':state.addingNewAsChild,
			}]"
	>
		<Item-Toggles v-if="item.id == state.editingItem" :item="item"></Item-Toggles>
		<Item-Edit-Add-Box v-if="item.id == state.editingItem" :item="item"></Item-Edit-Add-Box>

		<Item-Toggles v-if="showAddNewBox" :item="state.newItem"></Item-Toggles>
		<Item-Edit-Add-Box v-if="showAddNewBox" :item="state.newItem"></Item-Edit-Add-Box>
	</div>

	<q-modal :ref="'edit-item-modal-'+item.id" position="top" @close="dispatch('doneEditOrCancelNew')">
		<div v-if="get.mobile">
			<Item-Edit-Add-Box v-if="item.id == state.editingItem" :item="item"></Item-Edit-Add-Box>
		</div>
	</q-modal>
</div>

</template>

<script>
import ItemToggles from './ItemToggles.vue';
import ItemEditAddBox from './ItemEditAddBox.vue';
export default {
	props: ['item'],
	components: {
		ItemToggles, ItemEditAddBox,
	},
	data () {
		return {}
	},
	mounted()
	{
		// console.log(`Mounted: ${this.item.id}`);
		if (!store.$refs)
		{
			store.$refs = {};
		}
		Object.assign(store.$refs, this.$refs);
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		showAddNewBox()
		{
			return (
				(this.state.addingNewUnder
					&& this.state.addingNewUnder == this.item.id)
				|| (!this.get.filteredIdsFlat.length && !this.mobile && this.state.selection.view != 'journal'));
		},
		showEditBox()
		{
			return (this.state.editingItem
				&& this.item.id == this.state.editingItem)
		},

	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },

	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-editadd-wrapper{
	margin-top: 0.3em;
    display: flex;
    align-items: baseline;
	&--child{
	    margin-left: 1.8em;
	}
}
</style>
