<template>
<div>
	<div class="c-panel-title">
		<div class="c-panel-title__tags">
			<span v-if="get['selection/noFilterOrTag']">{{ text.menu.all }}</span>
			<span v-if="get['selection/dueTodayFiltered']">{{ text.menu.today }}</span>
			<span
				class="c-panel-title__tag"
				v-if="selection.tags.length"
				v-for="(tag, index) in selection.tags"
				@click="dispatch('filterItems', { keyword:'tag', value:tag, event:$event })"
			>
				{{ tagSlugToName(tag) }}<span v-if="index+1 != selection.tags.length" class="c-panel-title__selection-divider">, </span>
			</span>
		</div>
		<div class="c-panel-title__hidden-tags">
			<span
				class="c-panel-title__hidden-tag"
				v-if="selection.hiddenTags.length"
				v-for="(hiddenTag, index) in selection.hiddenTags"
				@click="dispatch('removeHiddenTag', { tag:hiddenTag })"
			>
				{{ tagSlugToName(hiddenTag) }}<span v-if="index+1 != selection.hiddenTags.length" class="c-panel-title__selection-divider">, </span>
			</span>
		</div>
	</div>
	<!-- PANEL__TITLE|_ -->

	<!-- _|PANEL__STATS -->
	<div class="c-panel__stats">
		<div style="width:2rem"></div>
		<div class="c-stats">
			<div v-show="get.totalUsedHourMin(state.root.id) && selection.view != 'journal'">
				{{ text.menu.usedTime }}
				<div class="c-stats__used-time">{{ get.totalUsedHourMin(state.root.id) }}</div>
			</div>
			<div v-show="get.totalHourMinLeft(state.root.id) && selection.view != 'journal'">
				{{ text.menu.timeLeft }}
				<div class="c-stats__time-left">{{ get.totalHourMinLeft(state.root.id) }}</div>
			</div>
			<div v-show="selection.view != 'journal'">
				{{ text.menu.items }}
				<div class="c-stats__children-amount">{{ get.itemAmount }}</div>
			</div>
			<div v-if="get.doneItemAmount">
				{{ (selection.view != 'journal') ? text.menu.done : text.menu.total }}
				<div class="c-stats__done-children-amount">{{ get.doneItemAmount }}</div>
			</div>
		</div>
		<div style="min-width:2rem">
			<button
				v-if="selection.view != 'journal' && this.get.filteredIdsFlat.length"
				class="o-btn c-stats__copy-btn"
				v-btn-effect
				v-clipboard:copy="get.clipboardText(state.root.id)"
				v-clipboard:success="clipboardSuccess"
				v-clipboard:error="clipboardError"
			>
				{{ text.card.copy }}
			</button>
		</div>
	</div>
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
		text(){ return this.get.text },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		tagSlugToName(tag)
		{
			return Utilities.tagSlugToName(tag);
		},
		clipboardSuccess()
		{
			this.dispatch('sendFlash', { type:'success', msg:`${this.state.keybindings.copyClipboard.success[this.get.language]}

${this.get.clipboardText(this.state.root.id)}` });
		},
		clipboardError()
		{
			this.dispatch('sendFlash', { type:'error', msg:`${this.state.keybindings.copyClipboard.error[this.get.language]}` });
		},
	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-panel-title{
    text-align: center;
    font-size: 1.2em;
    padding: 6px 0 0;
}
.c-panel-title__tags{

}
.c-panel-title__tag{
	cursor:pointer;
}
.c-panel-title__tag:hover{
    color:$dark-gray;
}
.c-panel-title__hidden-tags{
}
.c-panel-title__hidden-tag{
    text-decoration: line-through;
	cursor:pointer;
}
.c-panel-title__hidden-tag:hover{
    text-decoration: none;
    color:$dark-gray;
}
.c-panel__stats{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px $border-gray solid;
    padding: 0.4em;
}
.c-stats{
    display: flex;
    flex-wrap: wrap;
    >div{
	    margin: 0.2em;
	}
	>div>div{
	    position: relative;
	    padding: 0.2em 0.5em;
	    border-radius: 0.3em;
	    color: white;
	    font-size: 0.9em;
	}
}
.c-stats__used-time{
    background-color: $used-time-color;
}
.c-stats__time-left{
    background-color: $duration-color-dark;
}
.c-stats__children-amount{
    background-color: $theme-color;
}
.c-stats__done-children-amount{
    background-color: $done-color;
}
.c-stats__copy-btn{
	padding-top: 0.18em;
}
.c-panel-title__selection-divider{
	padding-right: 0.2em;
}
</style>