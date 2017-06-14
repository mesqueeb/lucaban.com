<template>
<div>
	<div class="c-panel-title">
		<!-- NEEDS TO BE ADDED BACK IN: c-panel__title- -scrolled-down -->
		<div class="c-panel-title__top-row">
			<span v-if="selection.filter.length" v-for="sel in get.selectionFilter">{{ sel }}</span>
			<span v-if="selection.tags.length" v-for="sel in get.selectionTags">{{ sel }}</span>
			<span v-if="selection.view != 'journal'">
				<button
					class="o-btn"
					v-btn-effect
					v-clipboard:copy="get.clipboardText(state.root.id)"
					v-clipboard:success="dispatch('clipboardSuccess')"
					v-clipboard:error="dispatch('clipboardError')"
				>
					{{ text.card.copy }}
				</button>
			</span>
		</div>
		<div class="c-panel-title__hidden-tags">
			<span v-if="selection.hiddenTags.length" v-for="hidden in get.selectionHiddenTags">{{ get.hidden }}</span>
		</div>
	</div>
	<!-- PANEL__TITLE|_ -->

	<!-- _|PANEL__STATS -->
	<div class="c-panel__stats">
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
</div>
</template>

<script>
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
.c-panel-title__hidden-tags{
    text-decoration: line-through;
}
.c-panel-title--scrolled-down{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    width: 100vw;
    align-content: inherit;
    z-index: 4;
}
.c-panel-title__top-row{
    display: flex;
    span{
        margin-left: auto;
    }
}
.c-panel__stats{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 1px $border-gray solid;
    padding: 0.4em;
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
.c-panel__stats--scrolled-down{
    margin-top: 26px;
}
</style>