<template>
<div class="c-panel">
	<!-- Add Item Modal -->
	<q-modal ref="add-item-modal" position="top" @close="dispatch('doneEditOrCancelNew')">
		<Item-Edit-Add-Box :item="state.newItem"></Item-Edit-Add-Box>
	</q-modal>
	<!-- /Add Item Modal -->
	<Tags-Nav></Tags-Nav>
	<div class="u-line"></div>	
	<Stats-Nav></Stats-Nav>
	<div class="layout-view c-content-wrapper">
		<Cards :item="state.root"
			ref="root"
		></Cards>
 	</div>
	
	<div class="c-bottom-hint"
		v-show="!get.itemAmount"
		v-if="get.mobile"
	>{{ get.text.guide.hints.addItemHint }}<br>➘</div>

</div>
</template>

<script>
// components:
import Cards from '../vue-components/Cards.vue'
import TagsNav from '../vue-components/TagsNav.vue'
import StatsNav from '../vue-components/StatsNav.vue'
import ItemEditAddBox from '../vue-components/ItemEditAddBox.vue'

export default {
	components: {
		TagsNav,
		StatsNav,
		ItemEditAddBox,
		Cards,
	},
	mounted() {
		if (!store.$refs) { store.$refs = {} }
		Object.assign(store.$refs, this.$refs);
		console.log(`Mounted 'add-item-modal'`);
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
	},
}
</script>

<style lang="scss">
.c-panel{
    background: white;
    padding: 1rem;
    margin-bottom: 6.5rem;
}
.c-content-wrapper{
    max-width: 50rem;
    margin: 0 auto;
}
.c-bottom-hint{
    position: fixed;
    right: 4rem;
    bottom: 4.5rem;
    z-index: -1;
    text-align: right;
    font-size: 1.4rem;
    color: #acacac;
}
</style>