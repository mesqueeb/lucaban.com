<template>
<div class="c-journal-day">
<!-- day-card-wrapper -->
	<div class="c-journal-date">
		<!-- Codementor: Is this the correct way to format something like this? -->
		<span>{{ customCalendar(day.date) }}</span>
		<span class="c-journal-date__subtitle" v-if="day.date != customCalendar(day.date)">
			{{ day.date }}
		</span>
		<!-- <button
			class="o-btn ml-auto"
			v-btn-effect
			v-clipboard:copy="get.clipboardTextJournal(item)"
			v-clipboard:success="clipboardSuccess"
			v-clipboard:error="clipboardError"
			v-if="true"
		>
			{{ get.text.card.copy }}
		</button> -->
		<!-- <div class="w-100 d-flex" v-if="sec_to_hourmin(get.totalUsedSec(day))">
		RETHINK totalUsedSec(day)
			<span class="c-journal-used-time">{{ get.text.menu.usedTime }}: </span>
			<span class="o-pill--used-time">{{ sec_to_hourmin(get.totalUsedSec(day)) }}</span>
		</div> -->
	</div>
	<!-- _|CHILDREN -->
	<div
		class="c-journal-day__entries"
		v-if="day.items.length && day.items[0].parentBody"
	>
		<!-- :style="(state.addingNewAsFirstChild)?'order:3;':''" -->
		<div
			class="c-journal-entry"
			v-for="parentBodyEntry in sortedParentBodyEntries"
		>
			<div class="c-journal-entry__parent-body" v-if="parentBodyEntry.parentBody != 'null_no_parent_body'">
				{{ parentBodyEntry.parentBody }}
			</div>
			<Card
				class="c-journal-entry__item"
				v-for="item in parentBodyEntry.items"
				:item="item"
				:key="item.id"
			></Card>
		</div>
	</div>
	<div v-else class="c-journal-day__entries">
		<Card
			class="c-journal-entry__item"
			v-for="item in day.items"
			:item="item"
			:key="item.id"
		></Card>
		
	</div>
	<!-- CHILDREN|_ -->
</div>
</template>
<script>
import { format } from 'date-fns/esm'
import { customCalendar, sec_to_hourmin } from '../helpers/valueMorphers2.js'
import { sortObjectArrayByProperty } from '../helpers/globalFunctions.js'
import Card from './Card.vue'

export default {
	props: ['day'],
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
/* \ ============================================== / *\
\* / ============================================== \ */
		sortedParentBodyEntries()
		{
			return sortObjectArrayByProperty(this.day.items, 'parents_bodies', 'desc');
		},
	},
	methods: {
		customCalendar,
		sec_to_hourmin,
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		clipboardSuccess()
		{
			this.dispatch('sendFlash', { type:'success', msg:this.state.keybindings.copyClipboard.success[this.l]+"<br><br>"+itemGetters[this.item.id].clipboardText });
		},
		clipboardError()
		{
			this.dispatch('sendFlash', { type:'error', msg:this.state.keybindings.copyClipboard.error[this.l] });
		},
	},
}
</script>
<style lang="scss">
@import '../css/_variables.scss';
.c-journal-day{
	display: flex;
	flex-wrap: wrap;
    border-bottom: 1px solid #ededed;
    padding-bottom: 0.7rem;
}
.c-journal-date{
    color: $theme-color;
    font-size: 1.2em;
    text-align: left;
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: baseline;
}
.c-journal-date__subtitle{
    color: $light-gray;
    font-size: 0.8em;
    margin-left: 0.5em;
}
.c-journal-entry{
    width: 100%;
}
.c-journal-day__entries{
    width: 100%;
}
.c-journal-entry__parent-body{
    display: initial;
    padding: 0em 0.5em;
    border-top: none;
    border-left: none;
    color: $mid-gray;
}
.c-journal-entry__item{
	margin-left: 1em;
}
.c-journal-used-time{
    @include text-settings();
    margin-right: 0.3em;
}

</style>