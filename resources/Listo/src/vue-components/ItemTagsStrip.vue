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
			&& state.selection.view != 'journal'"
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
<!-- 		<br>sec_to_hourminsec(totalSecLeft): {{ sec_to_hourminsec(totalSecLeft) }}
		<br>totalSecLeft: {{ totalSecLeft }}
		<br>secLeft: {{secLeft}}
		<br>totalTimeDifferentFromParent: {{totalTimeDifferentFromParent}}
		<br>!item.done: {{!item.done}}
		<br>totalPlannedSec: {{totalPlannedSec}}
		<br>get.totalPlannedSec(item.parent_id): {{get.totalPlannedSec(item.parent_id)}}
 -->
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
		{{ sec_to_hourminsec(secLeft) }}
	
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
		v-if="tagArray"
		v-for="tag in tagArray"
		class="o-pill--custom-tag"
		@dblclick.prevent="tagDblClick(tag,$event)"
	>
		{{ tag }}
		<button
			class="o-btn delete-tag"
			v-if="deletableTag(tag)"
			@blur="dispatch('blurOnEditOrAdd', { id:item.id })"
			@click.prevent="deleteTag(item.id, tag, $event)"
			@keydown.delete="deleteTag(item.id, tag, $event)"
			@keydown.enter="deleteTag(item.id, tag, $event)"
		>
			<!-- v-if="newItem.preparedTags.includes(tag)" -->
			<i class="zmdi zmdi-close-circle"></i>
		</button>
	</span>
</div>
</template>

<script>
import { momentCalendar, sec_to_hourminsec } from '../helpers/valueMorphers2.js';
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
				return this.get.tagsArray(this.get['newItem/parent_id']);
			} else {
				return this.get.tagsArray(this.item.parent_id);
			}
		},
		// totalSecLeft(){ return this.get.totalSecLeft(this.item.id) },
		totalSecLeft(){ return this.totalPlannedSec-this.totalUsedSec; },
		totalPlannedSec(){
			return this.totalPlannedMin*60;
		},
		totalPlannedMin(){
			let item = this.item;
			if (!item){ return 0; }

			let selfValue = (item.planned_time) ? parseFloat(item.planned_time) : 0;
			let childrenArray = this.get.allVisibleChildItems(this.item.id);
			if (!childrenArray || !childrenArray.length) { return selfValue; }
			let x = childrenArray.reduce(function(prevVal, child){
				return prevVal + parseFloat(child.planned_time);
			}, selfValue);
		    return (x) ? parseFloat(x) : 0;
		},
		totalUsedSec(){
			let item = this.item;
			let childrenArray = this.get.allVisibleChildItems(this.item.id);
			if (!item){ return 0; }

			let selfValue = (item.used_time) ? parseFloat(item.used_time) : 0;
			if (!childrenArray || !childrenArray.length) { return selfValue; }
			
			let x = childrenArray.reduce(function(prevVal, child){
				return prevVal + parseFloat(child.used_time);
			}, selfValue);
		    return (x) ? x : 0;
		},
		secLeft(){
			if (!this.item){ return 0; }
			return this.item.planned_time*60-this.item.used_time;
		},
		// totalTimeDifferentFromParent(){ return this.get.totalTimeDifferentFromParent(this.item.id) },
		totalTimeDifferentFromParent(){
			if (!this.item.parent_id){ return true; }
			return this.totalPlannedSec != this.get.totalPlannedSec(this.item.parent_id);
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
			return this.item.tagged.map(t => t.tag_name).filter(t => !this.parentTags.includes(t));
		},
	},
	methods:
	{
		momentCalendar, sec_to_hourminsec,
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		tagDblClick(tag, event){
			if(this.state.editingItem || this.state.editingItemTags || this.state.addingNewUnder){ return; }
			this.dispatch('filterItems',{keyword:'tag', value:Utilities.tagNameToSlug(tag), event});
		},
		deleteTag(id, tag, event)
		{
			let plsFocus = '.js-add-tag';
			document.querySelector(plsFocus).focus();	
			if (this.state.editingItemTags || this.state.editingItem)
			{
				let plsHide = this.getSrcButton(event.srcElement);
				plsHide.hidden = true;
				this.dispatch('patchTag',{id, tags:tag, requestType:'untag'});
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
		getSrcButton(element)
		{
			if (element.nodeName == 'BUTTON')
			{
				return element;
			} else {
				return this.getSrcButton(element.parentNode);
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
}
.c-item-tags--updating-tags{
    margin-top: 0.3em;
}
</style>