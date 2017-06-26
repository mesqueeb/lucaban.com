<template>
<q-layout ref="layout" view="hhh LpR FFF" v-cloak>

<!-- HEADER -->
<div slot="header" :class="{'mobile':get.mobile}">
	<Loading-Spinner></Loading-Spinner>
	<Flashes></Flashes>
	<Popups></Popups>
	<Popouts></Popouts>
</div>

<!-- BODY -->
<router-view></router-view>

<!-- FOOTER -->
<div slot="footer">
	<Panel-Nav></Panel-Nav>
	
</div>

<q-fixed-position corner="bottom-right" :offset="[18, 18]"
	v-if="$route.path == '/' && get.mobile"
>
	<Mobile-Nav-Add></Mobile-Nav-Add>
</q-fixed-position>
<q-fixed-position corner="bottom-left" :offset="[18, 15]"
	v-if="$route.path == '/' && get.mobile && state.selection.view != 'journal' && get.itemAmount && state.selection.selectedId"
>
	<Mobile-Nav-Move></Mobile-Nav-Move>
</q-fixed-position>

</q-layout>
</template>

<script>
/*
 * Root component
 */
// components:
import Popups from '../vue-components/Popups.vue'
import Popouts from '../vue-components/Popouts.vue'
import Flashes from '../vue-components/Flashes.vue'
import LoadingSpinner from '../vue-components/LoadingSpinner.vue'
import PanelNav from '../vue-components/PanelNav.vue'
import MobileNavMove from '../vue-components/MobileNav__Move.vue'
import MobileNavAdd from '../vue-components/MobileNav__Add.vue'

export default {
	store,
	components: {
		PanelNav,
		Popups,
		Popouts,
		Flashes,
		LoadingSpinner,
		MobileNavMove,
		MobileNavAdd,
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

</style>