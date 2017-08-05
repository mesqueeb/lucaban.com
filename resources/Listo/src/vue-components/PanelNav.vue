<template>
<div class="c-panel__navigation">
	<a href="#"
		:class="{'active':
			get['selection/noFiltersSelected']
			&& selection.view == 'tree'
			&& $route.path == '/'
		}"
		@click="openMenu('All', $event)"
		v-noClickFocus
	>{{ get.text.menu.all }} CAORHERCAOHERAOEH</a>
	<a href="#"
		:class="{'active':
			get['selection/dueItemsFiltered']
			&& $route.path == '/'
		}"
		@click="openMenu('Today', $event)"
		v-noClickFocus
	>{{ get.text.menu.today }}</a>
	<a href="#"
		:class="{'active':
				selection.view == 'journal'
				&& $route.path == '/',
			'filtered-out': selection.hiddenBookmarks.includes('journal')}"
		@click="openMenu('Journal', $event)"
		v-noClickFocus
	>{{ get.text.menu.journal }}</a>
	<a href="#"
		@click="commit('updatePopouts', { guide:true })"
		v-if="!get.mobile"
	>?</a>
	<button
		@click="commit('updateState', { setLanguage:'ja' })"
		v-if="get.language != 'ja'"
		v-noClickFocus
	>日本語</button>
	<button
		@click="commit('updateState', { setLanguage:'en' })"
		v-if="get.language != 'en'"
		v-noClickFocus
	>English</button>
	<router-link :to="'login'"
		:class="{'active':
			$route.path.includes('login')
		}"
		v-if="!get['user/loggedIn']"
		v-noClickFocus
	>{{ get.text.user.login }}</router-link>
	<router-link :to="'register'"
		:class="{'active':
			$route.path.includes('register')
		}"
		v-if="!get['user/loggedIn']"
		v-noClickFocus
	>{{ get.text.user.register }}</router-link>
	<a href="#"
		@click="dispatch('logout')"
		v-if="get['user/loggedIn']"
		v-noClickFocus
	>{{ get.text.user.logout }}</a>
	<a href="#"
		id="js-copy__1068"
		@click="test"
		v-if="state.debug && DEV"
		v-noClickFocus
	>TEST</a>
	<a href="#"
		id="js-copy__1063"
		:style="(state.debug) ? 'color:red !important; border: thin solid; padding: 0 0.2em; margin: auto;' : ''"
		@click="state.debug = !state.debug"
		v-if="DEV"
		v-noClickFocus
	>Debug</a>
	<q-spinner-oval
		v-if="state.computing"
		v-noClickFocus
		class="c-panel-navigation__spinner" size="1.5em"
	/>
	
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
		DEV(){ return DEV },
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
			if (this.$route.path != '/')
			{
				router.push('/');
			}
			if (menu == 'All')
			{
				this.dispatch('filterItems', { keyword:'all', event})
			}
			else if (menu == 'Today')
			{
				this.dispatch('filterItems', { keyword:'duedate', value:new Date(), event})
			}
			else if (menu == 'Journal')
			{
				this.dispatch('filterItems', { keyword:'journal', value:new Date(), event})
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
    align-items: center;
    padding: 0.1em 0.3em;
    background-color: rgba(255, 255, 255, 0.95);
}
.c-panel__navigation{
    a, button{
        transition: all 0.35s;
        text-decoration: none;
        color: #4d4d4d !important;
        margin: 0em 0.2em;
        padding: 0.3em;
        background: none;
        border: none;
    	color:$text-gray;
    }
    a:hover, button:hover{
        color:$theme-color !important;
    }
    a:focus, button:focus{
    	outline: none;
    }
    .active, .router-link-active{
        color: $theme-color !important;
    }
    .filtered-out{
        text-decoration: line-through;
        color: $duedate-color;
    }
}
.c-panel-navigation__spinner{
	color: $theme-color;
	margin-left: auto;
	margin-right: 0.1em;
}
</style>
