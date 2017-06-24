<template>
<div :class="{'mobile':get.mobile}">

<Loading-Spinner></Loading-Spinner>
<Flashes></Flashes>
<Popups></Popups>
<Popouts></Popouts>

<div class="c-panel" v-cloak>

	
	<div class="u-line"></div>	

<q-layout ref="layout">
<!-- view="hhh LpR fff"> -->
	<!-- Header -->
	<Stats-Nav slot="header"></Stats-Nav>
<!-- 	<q-toolbar slot="header">
	</q-toolbar>
 -->
	<!-- Navigation -->
<!-- 	<q-tabs slot="navigation">
		<q-route-tab slot="title" icon="view_quilt" to="/test-layout/about" replace hide="icon" label="About" />
		<q-route-tab slot="title" icon="view_day" to="/test-layout/toolbar" replace hide="icon" label="Toolbar" />
		<q-route-tab slot="title" icon="view_day" to="/test-layout/tabs" replace label="Tabs" />
		<q-route-tab slot="title" icon="input" to="/test-layout/drawer" replace label="Drawer" />
	</q-tabs>
 -->
<!-- 	<Panel-Nav slot="navigation"></Panel-Nav>
 -->	<!-- Left Side Panel -->
<!-- 	<div slot="left">
		<q-list no-border link inset-separator>
			<q-list-header>Essential Links</q-list-header>
			<q-item>
				<q-item-side icon="school" />
				<q-item-main label="Docs" sublabel="quasar-framework.org" />
			</q-item>
			<q-item>
				<q-item-side icon="record_voice_over" />
				<q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
			</q-item>
			<q-item>
				<q-item-side icon="chat" />
				<q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
			</q-item>
			<q-item>
				<q-item-side icon="rss feed" />
				<q-item-main label="Twitter" sublabel="@quasarframework" />
			</q-item>
		</q-list>
	</div> -->

	<!-- Right Side Panel -->
<!-- 	<div slot="right">
		Right Side of Layout
	</div> -->

	<!-- sub-routes get injected here: -->
	<!-- <router-view /> -->
	<!-- _|PANEL__DATA -->
	<div class="layout-view c-content-wrapper"
	>
		<Card :item="state.root"
			ref="root"
		></Card>
 	</div>
	<!-- PANEL__DATA|_ -->

	<!-- Footer -->
<!-- 	<q-toolbar slot="footer">
		<q-toolbar-title>
			Layout Footer
		</q-toolbar-title>
	</q-toolbar> -->
	<Panel-Nav slot="footer"></Panel-Nav>

</q-layout>



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

import { mapMutations, mapGetters, mapState, mapActions } from 'vuex'

export default {
	store,
	components: {
		PanelNav,
		StatsNav,
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
    },
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
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