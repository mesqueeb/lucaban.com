<template>
	<div class="c-navigation__tag-menu">
		<a
			v-for="tag in get.allTagsComputed"
			href="#"
			:class="['c-tag-menu__tag', {'c-tag-menu--active': selection.tags.includes(tag.slug)}]"
			:value="tag.slug"
			@click.prevent="dispatch('doneEditOrCancelNew'); state.computing = true; dispatch('filterItems', { keyword:'tag', value:tag.slug, event:$event }); doc.activeElement.blur()"
		>{{ tag.name }}</a>
		<a v-for="tag in selection.hiddenTags"
			class="c-tag-menu--filtered-out" href="#"
			@click.prevent="dispatch('removeHiddenTag', {tag})"
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
		doc(){ return document },
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
	// keeping the 'a' here is important for css bugs
	a{
	    text-decoration: none;
	    color: $text-gray;
	    transition: all 0.35s;
	    margin: 0em 0.2em;
	    padding: 0.3em;
	}
}
.c-tag-menu__tag{
    &:hover{
        color:$theme-color !important;
    }
}
.c-tag-menu--active{
    color: $theme-color !important;
    &:hover{
        color:$text-gray !important;
    }
}
.c-tag-menu--filtered-out{
    text-decoration: line-through !important;
    color: $duedate-color !important;
    &:hover{
    	color: $text-gray !important;
	    text-decoration: none !important;
    }
}
</style>
