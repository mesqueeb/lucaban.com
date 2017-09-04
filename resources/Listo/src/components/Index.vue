<template>
<q-layout ref="layout" view="HHH LpR FFF" v-cloak class="gradient1">

<!-- HEADER -->
<div slot="header" :class="{'mobile':get.mobile}">
	<Loading-Spinner></Loading-Spinner>
	<Flashes></Flashes>
	<Popups></Popups>
	<Popouts></Popouts>
	<Panel-Nav v-if="!get.mobile"></Panel-Nav>
</div>

<!-- BODY -->
<router-view></router-view>

<!-- FOOTER -->
<div slot="footer" v-if="get.mobile" v-show="!get.editingOrAddingId">
	<Panel-Nav></Panel-Nav>
</div>

<q-fixed-position corner="bottom-right" :offset="[18, 18]"
	v-if="$route.path == '/' && get.mobile"
	v-show="!get.editingOrAddingId"
>
	<Mobile-Nav-Add></Mobile-Nav-Add>
</q-fixed-position>
<q-fixed-position corner="bottom-left" :offset="[18, 15]"
	v-if="$route.path == '/' && get.mobile && state.selection.view != 'journal'
			&& get.itemCount && state.selection.selectedId"
	v-show="!get.editingOrAddingId"
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

		let localToken = localStorage.getItem('token');
		if (localToken)
		{
			console.log(`old Token: ${localToken}`);
			console.log(`old Token Date: ${localStorage.getItem('tokenTimeStamp')}`);
			axios.post(apiBaseURL+'refreshToken', {token:localToken})
			.then(({data}) => {
				console.log('refreshed token:');
				console.log(data);
				window.axios.defaults.headers.common = {
				    'X-Requested-With': 'XMLHttpRequest',
					'Authorization': "Bearer " + data ,
				};
				store.state.api.token = data;
				store.state.api.tokenTimeStamp = new Date();
				localStorage.setItem('token', data);
				localStorage.setItem('tokenTimeStamp', new Date());
				console.log(`new Token: ${store.state.token}`);
				console.log(`new Token Date: ${store.state.tokenTimeStamp}`);
				store.dispatch('fetchListo');
			});
		}

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
.gradient1{
	// background: linear-gradient(45deg,#FFE9D0,#FD7153);
}
.layout-header {
    box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2),
    			0 4px 5px rgba(0,0,0,0.04),
    			0 1px 10px rgba(0,0,0,0.02) !important;
}
.layout-footer {
    box-shadow: 0 -2px 4px -1px rgba(0,0,0,0.2),
    			0 -4px 5px rgba(0,0,0,0.04),
    			0 -1px 10px rgba(0,0,0,0.02) !important;
}
</style>