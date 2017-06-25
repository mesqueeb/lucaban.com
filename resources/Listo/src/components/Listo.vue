<template>
<div :class="{'mobile':get.mobile}">

<Loading-Spinner></Loading-Spinner>
<Flashes></Flashes>
<Popups></Popups>
<Popouts></Popouts>

<div class="c-panel" v-cloak>

	<!-- Add Item Modal -->
	<q-modal ref="add-item-modal" position="top" @close="dispatch('doneEditOrCancelNew')">
		<Item-Edit-Add-Box :item="state.newItem"></Item-Edit-Add-Box>
	</q-modal>
	<!-- /Add Item Modal -->

	<Panel-Nav></Panel-Nav>
	<div class="u-line"></div>	
	<Stats-Nav></Stats-Nav>
	<div class="layout-view c-content-wrapper">
		<Card :item="state.root"
			ref="root"
		></Card>
 	</div>


<!-- <q-layout ref="layout" view="hhh LpR fff">
	<Stats-Nav slot="header"></Stats-Nav>
	<div class="layout-view c-content-wrapper">
		<Card :item="state.root"
			ref="root"
		></Card>
 	</div>
	<Panel-Nav slot="footer"></Panel-Nav>
</q-layout>
 -->


</div>
<Mobile-Nav></Mobile-Nav>

</div>
</template>

<script>
/*
 * Root component
 */
// components:
import Card from '../vue-components/Card.vue'
import Popups from '../vue-components/Popups.vue'
import Popouts from '../vue-components/Popouts.vue'
import Flashes from '../vue-components/Flashes.vue'
import LoadingSpinner from '../vue-components/LoadingSpinner.vue'
import MobileNav from '../vue-components/MobileNav.vue'
import PanelNav from '../vue-components/PanelNav.vue'
import StatsNav from '../vue-components/StatsNav.vue'
import ItemEditAddBox from '../vue-components/ItemEditAddBox.vue'

export default {
	store,
	components: {
		PanelNav,
		StatsNav,
		ItemEditAddBox,
		Card,
		Popups,
		Popouts,
		Flashes,
		LoadingSpinner,
		MobileNav,
	},
	mounted() {
		let self = this;
        eventHub.$on('confirm-ok', function(id) {
            console.log(`computer says "ok"... {$id}`);
            self.$store.dispatch('deleteItem', {id});
        });
        eventHub.$on('confirm-cancel', function(id) {
            console.log(`computer says "no"... {$id}`); return;
        });
        this.$store.dispatch('sortAllChildren');
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
		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },
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
</style>