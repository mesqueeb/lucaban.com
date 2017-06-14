<template>
<div :class="{
	'c-item-tags':true,
	'c-item-card__item-tags':true,
	'c-item-tags--updating-tags': item.id == state.editingItemTags
	}"
>
	<label
		class="o-pill--done"
		v-if="item.done
			&& item.id != state.editingDoneDateItem
			&& !journalView"
	>
		{{ get.text.tags.done }} {{ momentCalendar(item.done_date) }}
		<input
			v-flatpicky
			:id="'done-date-edit-'+item.id"
			class="flatpickr"
			:name="item.id"
			v-model="item.done_date"
		>
	</label>
	<span
		v-if="totalSecLeft > 0
			&& totalSecLeft > secLeft
			&& totalTimeDifferentFromParent
			&& !item.done"
		class="o-pill--total-duration"
	>
		{{ sec_to_hourminsec(totalSecLeft) }}
	</span>
	<span
		class="o-pill--duration"
		v-if="item.id != state.editingItem
			&& secLeft > 0
			&& !item.done
			&& item.id != state.editingItemTags"
	>
		{{ sec_to_hourminsec(secLeft) }}
	</span>
	
	<span
		v-if="hasDueDate && !item.done
			&& item.id != state.editingItemTags"
		class="o-pill--duedate"
	>
		{{ momentCalendar(item.due_date) }}
	</span>
	<span
		v-if="item.dueDateParent && !item.done
		 && item.id != state.editingItemTags"
		class="o-pill--duedate-parent"
	>
		{{ momentCalendar(item.dueDateParent) }}
	</span>
	<span
		v-for="tag in item.tagged"
		v-if="item.tagged.length"
		v-show="!parentTags.includes(tag.tag_name)
			&& item.id != state.editingItem
			&& item.id != state.editingItemTags"
		class="o-pill--custom-tag"
		@dblclick.prevent="dispatch('filterItems',{keyword:'tag', value:tag.tag_slug, event:$event})"
	>
		{{ tag.tag_name }}
	</span>
</div>
</template>

<script>
import { momentCalendar, sec_to_hourminsec } from '../helpers/valueMorphers2.js';

export default {
	props:['item'],
	data () {
		return {}
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		parentTags(){ return this.get.tagsArray(this.item.parent_id) },
		totalSecLeft(){ return this.get.totalSecLeft(this.id) },
		secLeft(){ return this.get.secLeft(this.id) },
		totalTimeDifferentFromParent(){ return this.get.totalTimeDifferentFromParent(this.id) },
		hasDueDate()
		{ if (!this.item){ return; }
		    return (this.item.due_date && this.item.due_date != '0000-00-00 00:00:00');
		},
		journalView()
		{ if (!this.item){ return; }
			if (this.state.selection.view == 'journal'){
				return true;
			} else { return false; }
		},

	},
	methods:
	{
		momentCalendar, sec_to_hourminsec,
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
	},
}
</script>
<style lang="scss">
.c-item-tags{
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    button{
        color: white;
        margin-left: 0.5em;
        padding: 0;
    }
}
</style>