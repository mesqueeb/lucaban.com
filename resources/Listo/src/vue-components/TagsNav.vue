<template>
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
.c-navigation__tag-menu{
    margin-left: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-bottom: 0.2em;
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
</style>
