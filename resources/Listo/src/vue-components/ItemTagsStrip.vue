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
		{{ customCalendar(item.due_date) }}
	</span>
	<span
		v-if="item.dueDateParent && !item.done
		 && item.id != state.editingItemTags"
		class="o-pill--duedate-parent"
	>
		{{ customCalendar(item.dueDateParent) }}
	</span>
	<span
		v-if="tagArray"
		v-for="(tag, index) in tagArray"
		class="o-pill--custom-tag"
		@dblclick.prevent="tagDblClick(tag,$event)"
	>
		{{ tag }}
		<button
			class="o-btn delete-tag"
			v-if="deletableTag(tag)"
			@blur="dispatch('blurOnEditOrAdd', { id:item.id })"
			@click.prevent="deleteTag(item.id, tag, $event)"
			@keydown.delete.prevent="deleteTag(item.id, tag, $event)"
			@keydown.enter.prevent="deleteTag(item.id, tag, $event)"
			@keydown.space.prevent="deleteTag(item.id, tag, $event)"
			@keydown.tab="tab(index, $event)"
		>
			<q-icon name="ion-close-circled" />
		</button>
	</span>
</div>
</template>

<script>
import { customCalendar, sec_to_hourminsec } from '../helpers/valueMorphers2.js';
import { Utilities, uniq } from '../helpers/globalFunctions.js'

export default {
	props:['item'],
	data () {
		return {}
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		parentTags(){
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
		mobileEditing(){
			if (!this.get.mobile) { return false; }
			if (this.state.editingItem == this.item.id || this.item.newItem){ return true; }
		},
	},
	methods:
	{
		customCalendar, sec_to_hourminsec,
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		tab(index, e)
		{
			if (index+1 == this.tagArray.length && !e.shiftKey){
				e.preventDefault();
			}
		},
		tagDblClick(tag, event){
			if(this.state.editingItem || this.state.editingItemTags || this.state.addingNewUnder){ return; }
			this.dispatch('filterItems',{keyword:'tag', value:Utilities.tagNameToSlug(tag), event});
		},
		deleteTag(id, tag, event)
		{
			this.dispatch('blockBlur');
			let plsFocus = `#card-${this.get.editingOrAddingId} .js-add-tag`;
			document.querySelector(plsFocus).focus();	
			if (this.state.editingItemTags || this.state.editingItem)
			{
				let plsHide = this.getTagPillElement(event.srcElement);
				console.log(plsHide);
				plsHide.hidden = true;
				this.dispatch('tagItem',{id, tags:tag, requestType:'untag'});
			}
			else if (this.item.newItem)
			{
				this.commit('newItem/deleteTag', {tag});
			}
		},
		deletableTag(tag)
		{
			if ((this.state.editingItem == this.item.id || this.state.editingItemTags == this.item.id)
				&& !this.parentTags.includes(tag))
			{
				return true;
			}
			else if (this.item.newItem && this.state.newItem.preparedTags.includes(tag))
			{
				return true;
			}
			return false;
		},
		getTagPillElement(element)
		{
			if (element.nodeName == 'BUTTON')
			{
				return element.parentNode;
			} else {
				return this.getTagPillElement(element.parentNode);
			}
		},
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