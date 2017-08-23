<template>
<div :class="
	['c-item-tags', 'js-item-tags',
	{ 'c-item-tags--updating-tags': item.id == state.editingItemTags,
	'c-item-tags--mobile-editing': mobileEditing }]"
>
	<label
		class="o-pill--done"
		v-if="item.done
			&& item.id != state.editingDoneDateItem
			&& state.selection.view != 'journal'"
	>
		{{ get.text.tags.done }} {{ customCalendar(item.done_date) }}
		<input
			v-model="item.done_date"
			:id="'done-date-edit-'+item.id"
			class="flatpickr"
			:name="item.id"
			v-flatpicky
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
		{{ customCalendar(item.due_date) }}
	</span>
	<span
		v-if="item.dueDateParent && !item.done
		 && item.id != state.editingItemTags"
		class="o-pill--duedate-parent"
	>
		{{ customCalendar(item.dueDateParent) }}
	</span>
	<tag-pill
		v-if="tagArray"
		v-for="(tag, index) in tagArray"
		:tag="tag" :item="item" :tagArray="tagArray" :parentTags="parentTags"
		:index="index" :key="item.id+'_'+tag"
	></tag-pill>
</div>
</template>

<script>
import { customCalendar, sec_to_hourminsec } from '../helpers/valueMorphers2.js'
import { Utilities, uniq } from '../helpers/globalFunctions.js'
import TagPill from './TagPill.vue'

export default {
	props:['item'],
	data () {
		return {}
	},
	components: { TagPill },
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		parentTags()
		{
			if (this.item.newItem)
			{
				return itemGetters[this.get['newItem/parent_id']].tagsArray;
			} else {
				if (this.get.filteredIdsFlat.includes(this.item.parent_id))
				{
					if (!itemGetters[this.item.parent_id]){ return [] }
					return itemGetters[this.item.parent_id].tagsArray;
				}
				return [];
			}
		},
		secLeft()
		{
			if (this.item.newItem){ return 0 }
			return itemGetters[this.item.id].secLeft
		},
		totalTimeDifferentFromParent()
		{
			if (this.item.newItem){ return 0 }
			return itemGetters[this.item.id].totalTimeDifferentFromParent
		},
		totalSecLeft()
		{
			if (this.item.newItem){ return 0 }
			return itemGetters[this.item.id].totalSecLeft
		},
		hasDueDate()
		{
		    return (this.item.due_date && this.item.due_date != '0000-00-00 00:00:00');
		},
		tagArray()
		{
			if (this.item.newItem)
			{
				return this.get['newItem/preparedPlusComputedTags'];
			}
			return this.item.tagged
					.map(t => t.tag_name)
					.filter(t => {
						return (itemGetters[this.item.id].isTopLvlItemInFilteredRoot || !this.parentTags.includes(t))
					});
		},
		mobileEditing()
		{
			if (!this.get.mobile) { return false; }
			if (this.state.editingItem == this.item.id || this.item.newItem){ return true; }
		},
	},
	methods:
	{
		customCalendar, sec_to_hourminsec,
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
	&--updating-tags{
	    margin: 0.3em 0;
	}
	&--mobile-editing span{
		font-size: 0.8em;
	}
}
</style>