<template>
<div class="c-panel__navigation">
	<a href="#"
		:class="{'active':
			!selection.filter.length
			&& selection.view == 'tree'
			&& $route.path == '/'
		}"
		@click="openMenu('All', $event)"
	>{{ get.text.menu.all }}</a>
	<a href="#"
		:class="{'active':
			selection.filter.includes('today')
			&& $route.path == '/'
		}"
		@click="openMenu('Today', $event)"
	>{{ get.text.menu.today }}</a>
	<a href="#"
		:class="{'active':
				selection.view == 'journal'
				&& $route.path == '/',
			'filtered-out': selection.hiddenBookmarks.includes('journal')}"
		@click="openMenu('Journal', $event)"
	>{{ get.text.menu.journal }}</a>
	<a href="#"
		@click="commit('updatePopouts', { guide:true })"
		v-if="!get.mobile"
	>?</a>
	<a href="#"
		@click="commit('updateState', { setLanguage:'ja' })"
		v-if="get.language != 'ja'"
	>日本語</a>
	<a href="#"
		@click="commit('updateState', { setLanguage:'en' })"
		v-if="get.language != 'en'"
	>English</a>
	<router-link :to="'login'"
		:class="{'active':
			$route.path.includes('login')
		}"
		v-if="!state.user.user"
	>{{ get.text.user.login }}</router-link>
	<a href="#"
		id="js-copy__1068"
		@click="test"
		v-if="state.debug"
	>TEST</a>
</div>
</template>

<script>
import { Utilities } from '../helpers/globalFunctions.js'

export default {
	data () {
		return {}
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		selection(){ return this.state.selection },
		router(){ return router },
	},
	methods:
	{
		test(){
			console.log(this.$route);
		},
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		openMenu(menu, event)
		{
			if (router.currentRoute.path.includes('login'))
			{
				router.push('/');
			}
			if (menu == 'All')
			{
				this.dispatch('filterItems', { keyword:'all', event})
			}
			if (menu == 'Today')
			{
				this.dispatch('filterItems', { keyword:'duedate', value:'today', event})
			}
			if (menu == 'Journal')
			{
				this.dispatch('filterItems', { keyword:'journal', event})
			}

		},
	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-panel__navigation{
    display: flex;
    flex-wrap: wrap;
    padding: 0.1em 0.3em;
    background-color: rgba(255, 255, 255, 0.95);
}
.c-panel__navigation{
    a{
        transition: all 0.35s;
        text-decoration: none;
        color: #4d4d4d !important;
        margin: 0em 0.2em;
        padding: 0.3em;
        &:hover{
            color:$theme-color;
        }
    }
    .active, .router-link-active{
        color: $theme-color !important;
    }
    .filtered-out{
        text-decoration: line-through;
        color: $duedate-color;
    }
}
</style>
