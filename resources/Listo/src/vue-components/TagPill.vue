<template>
<span
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
		@keydown.esc.prevent="dispatch('cancelEditOrAdd')"
		@keydown.tab="tab(index, $event)"
	>
		<q-icon name="ion-close-circled" />
	</button>
</span>
</template>

<script>
import { Utilities } from '../helpers/globalFunctions.js'

export default {
	props:['tag', 'index', 'item', 'tagArray', 'parentTags'],
	data(){ return {} },
	created(){},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
	},
	methods:
	{
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
</style>