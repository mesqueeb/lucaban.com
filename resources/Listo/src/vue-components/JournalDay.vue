<template>
<div
	:class="{
		'items-card': true,
		'journal-wrapper': state.selection.view == 'journal'
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
	<!-- _|CHILDREN -->
	<div
		class="c-journal-day-children"
		v-if="item.children.length"
		v-show="item.show_children"
	>
		<!-- :style="(state.addingNewAsFirstChild)?'order:3;':''" -->
		<Card
			v-if="item.journalDate"
			v-for="childCard in item.children"
			:item="childCard"
			:key="childCard.id"
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
.c-journal-day-children{
    width: 100%;
    margin-left: 0;
    border-bottom: 1px solid #ededed;
    padding-bottom: 0.7rem;
}
.c-section-head{
    color: #46c5b6;
    font-size: 1.2em;
    text-align: left;
    margin-top: 1rem;
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
.c-journal-used-time{
    @include text-settings();
    margin-right: 0.3em;
}

</style>