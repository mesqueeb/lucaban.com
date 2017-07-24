<template>
</template>

<script>
import { Utilities } from '../helpers/globalFunctions.js'

export default {
	props:['tag', 'item'],
	data () {
		return {}
	},
	created()
	{
		if (!window.itemGetters[this.item.id].hasParentWithTag)
		{
			window.itemGetters[this.item.id].hasParentWithTag = {};
		}
		if (!window.itemGetters[this.item.id].hasParentWithTag[this.tag.tag_slug])
		{
			window.itemGetters[this.item.id].hasParentWithTag[this.tag.tag_slug] = {};
		}
		window.itemGetters[this.item.id].hasParentWithTag[this.tag.tag_slug] = this.hasParentWithTag;
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		hasParentWithTag(){
			console.log('running hasParentWithTag...');
			let item = this.item;
			let tags = this.tag.tag_slug;
			let parentId = item.parent_id;
			if (!parentId){ return false; }
			if (!this.state.nodes[parentId]){
				// console.log('Parent of ('+id+')['+item.body+'] is non existant.');
				return false;
			}
			let parentHasTag = this.get.hasTag(parentId, tags);
			if (parentHasTag)
			{
				return true;
			} else {
				return this.get.hasParentWithTag(parentId, tags);
			}
		},
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
	},
	methods:
	{
		// commit(action, payload){ this.$store.commit(action, payload) },
		// dispatch(action, payload){ this.$store.dispatch(action, payload) },
		// tab(index, e)
		// {
		// 	if (index+1 == this.tagArray.length && !e.shiftKey){
		// 		e.preventDefault();
		// 	}
		// },
		// tagDblClick(tag, event){
		// 	if(this.state.editingItem || this.state.editingItemTags || this.state.addingNewUnder){ return; }
		// 	this.dispatch('filterItems',{keyword:'tag', value:Utilities.tagNameToSlug(tag), event});
		// },
		// deleteTag(id, tag, event)
		// {
		// 	this.dispatch('blockBlur');
		// 	let plsFocus = `#card-${this.get.editingOrAddingId} .js-add-tag`;
		// 	document.querySelector(plsFocus).focus();	
		// 	if (this.state.editingItemTags || this.state.editingItem)
		// 	{
		// 		let plsHide = this.getTagPillElement(event.srcElement);
		// 		console.log(plsHide);
		// 		plsHide.hidden = true;
		// 		this.dispatch('tagItem',{id, tags:tag, requestType:'untag'});
		// 	}
		// 	else if (this.item.newItem)
		// 	{
		// 		this.commit('newItem/deleteTag', {tag});
		// 	}
		// },
		// deletableTag(tag)
		// {
		// 	if ((this.state.editingItem == this.item.id || this.state.editingItemTags == this.item.id)
		// 		&& !this.parentTags.includes(tag))
		// 	{
		// 		return true;
		// 	}
		// 	else if (this.item.newItem && this.state.newItem.preparedTags.includes(tag))
		// 	{
		// 		return true;
		// 	}
		// 	return false;
		// },
		// getTagPillElement(element)
		// {
		// 	if (element.nodeName == 'BUTTON')
		// 	{
		// 		return element.parentNode;
		// 	} else {
		// 		return this.getTagPillElement(element.parentNode);
		// 	}
		// },
	},
}
</script>
<style lang="scss">
</style>