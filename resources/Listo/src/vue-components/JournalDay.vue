<template>
<div
	:class="{
		'items-card': true,
		'journal-wrapper': journalView
	}"
>
<!-- day-card-wrapper -->
<div 
	class="d-flex flex-wrap"
>
	<div class="c-section-head">
		<!-- Codementor: Is this the correct way to format something like this? -->
		<span>{{ customCalendar(journalDate) }}</span>
		<span class="c-section-head__subtitle" v-if="journalDate != customCalendar(journalDate)">
			{{ journalDate }}
		</span>
		<button
			class="o-btn ml-auto"
			v-btn-effect
			v-clipboard:copy="get.clipboardTextJournal(item)"
			v-clipboard:success="dispatch('clipboardSuccess')"
			v-clipboard:error="dispatch('clipboardError')"
			v-if="true"
		>
			{{ get.text.card.copy }}
		</button>
		<div class="w-100 d-flex" v-if="sec_to_hourmin(get.totalUsedSec(item))">
			<span class="c-journal-used-time">{{ get.text.menu.usedTime }}: </span>
			<span class="o-pill--used-time">{{ sec_to_hourmin(get.totalUsedSec(item)) }}</span>
		</div>
	</div>
	<div
		class="c-subsection-head"
		v-if="journalParentString"
		@click="selectItem"
	>
		<div class="c-subsection-head__text">
			{{ journalParentString }}
		</div>
	</div>
	<!-- _|CHILDREN -->
	<div
		class="l-journal-day-children"
		v-if="item.children.length"
		v-show="item.show_children"
	>
		<!-- :style="(state.addingNewAsFirstChild)?'order:3;':''" -->
		<Card
			v-if="item.journalDate"
			v-for="childCard in item.children"
			:item="childCard"
			:key="childCard.id"
			:parent-tags="[]"
		></Card>
	</div>
	<!-- CHILDREN|_ -->

</div>
</div>
</template>
<script>
import { format } from 'date-fns/esm'
import { customCalendar, sec_to_hourmin } from '../helpers/valueMorphers2.js';
import Card from './Card.vue';

export default {
	props: ['item'],
	components: {
		Card
	},
	data(){ return {} },
	computed: {
 /* \ ============================================== / *\
| ◉  |	FROM THE STORE 								|  ◉ |
 \* / ============================================== \ */
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		journalDate(){ return this.get.journalDate(this.item) },
/* \ ============================================== / *\
\* / ============================================== \ */
		journalView()
		{ if (!this.item){ return; }
			if (this.state.selection.view == 'journal'){
				return true;
			} else { return false; }
		},
		journalParentString()
		{ if (!this.item){ return; }
			// console.log('run on '+this.item.id+' - '+this.item.body);
			if (this.state.selection.view != 'journal'){ return false; }
			if (this.journalView && !this.item.journalDate){
				if (this.item.depth == 0){ return; }
				let prevId = null;
				let parentString = this.item.parents_bodies;
				if (!this.state.nodes[prevId]){ return; }
				let prevParentString = this.state.nodes[prevId].parents_bodies;

				let prevDoneDate = this.state.nodes[prevId].done_date;
				prevDoneDate = format(new Date(prevDoneDate), 'YYYY/MM/DD');
				let thisDoneDate = format(new Date(this.item.done_date), 'YYYY/MM/DD');

				if (
					parentString
					&& ( parentString != prevParentString
						|| thisDoneDate != prevDoneDate ) )
				{
					return parentString;
				}
			}
			return false;
		},
	},
	methods: {
		customCalendar,
		sec_to_hourmin,
		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },
		selectItem(){ this.dispatch('selectItem', {id:this.item.id}) },
	},
}
</script>
<style lang="scss">
@import '../css/_variables.scss';
.l-journal-day-children{
    width: 100%;
    margin-left: 0;
}
.c-section-head{
    border-top: 1px solid #ededed;
    color: #46c5b6;
    font-size: 1.2em;
    text-align: left;
    padding: 0.5em 0;
    margin-top: 0.7em;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: baseline;
}
.c-section-head__subtitle{
    color: #dadada;
    font-size: 0.8em;
    margin-left: 0.5em;
}
.c-subsection-head{
    margin-bottom: 1px;
}
.c-subsection-head__text{
    border: 1px solid;
    display: initial;
    padding: 0em 0.5em;
    border-top: none;
    border-left: none;
}
.c-journal-used-time{
    @include text-settings();
    margin-right: 0.3em;
}

</style>