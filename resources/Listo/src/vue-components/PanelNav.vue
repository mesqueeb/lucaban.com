<template>
<div class="c-panel__navigation">
	<div class="c-navigation__menu">
		<a href="#"
			:class="{'active': selection.filter.includes('all')}"
			@click="dispatch('filterItems', { keyword:'all', value:'all', event:$event})"
		>{{ get.text.menu.all }}</a>
		<a href="#"
			:class="{'active': selection.filter.includes('today')}"
			@click="dispatch('filterItems', { keyword:'duedate', value:'today', event:$event})"
		>{{ get.text.menu.today }}</a>
		<a href="#"
			:class="{'active': selection.view.includes('journal'),
				'filtered-out': selection.hiddenBookmarks.includes('journal')}"
			@click="dispatch('filterItems', { keyword:'journal', value:'journal', event:$event})"
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
			v-if="!state.user.user"
		>Login</router-link>
		<a href="#"
			id="js-copy__1068" 
			@click="dispatch('test')"
			v-if="state.debug"
		>TEST</a>
	</div>
	<div class="c-navigation__tag-menu">
		<a v-for="tag in get.allTagsComputed"
			href="#"
			:class="{'active': selection.tags.includes(tag.slug)}"
			:value="tag.slug"
			@click="dispatch('filterItems', { keyword:'tag', value:tag.slug, event:$event })"
		>{{ tag.name }}</a>
		<a v-for="tag in selection.hiddenTags"
			class="filtered-out" href="#"
			@click.prevent="dispatch('removeFilter', {tag})"
		>{{ tagSlugToName(tag) }}</a>
		
	</div>
</div>
</template>

<script>
import { Utilities } from '../helpers/globalFunctions.js'
let tagSlugToName = Utilities.tagSlugToName;

export default {
	data () {
		return {}
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		selection(){ return this.state.selection },

	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		tagSlugToName,

	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-panel__navigation{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.2em;
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
    .active{
        color: $theme-color !important;
    }
    .filtered-out{
        text-decoration: line-through;
        color: $duedate-color;
    }
}
.c-navigation__menu{
    display: flex;
}
.c-navigation__tag-menu{
    margin-left: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
}
</style>
