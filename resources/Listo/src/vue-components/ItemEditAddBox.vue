<template>
<form 
	:class="[
		'c-editaddbox', {
			'c-editaddbox--mobile':(mobile)}]"
	@submit.prevent
>
	<div :class="[
		'c-editaddbox__body',
		{'c-editaddbox__body--mobile':(mobile)}]"
	>
		<div class="c-language-picker w-100" v-if="listIsEmpty && mobile">
			<a href="#"
				class="c-language-picker__a" 
				@click="commit('updateState',{setLanguage:'ja'})"
				v-if="get.language != 'ja'"
			>日本語</a>
			<a href="#"
				class="c-language-picker__a" 
				@click="commit('updateState',{setLanguage:'en'})"
				v-if="get.language != 'en'"
			>English</a>
		</div>
		<textarea
			class="js-edit-body c-editaddbox__textarea"
			v-focus v-autoheight
			v-model="item.body"
			@blur="dispatch('blurOnEditOrAdd')"
			@keydown.esc="dispatch('cancelEditOrAdd')"
			@keydown.enter="enter"
			@keydown.up="arrow('up',$event)"
			@keydown.down="arrow('down',$event)"
			@keydown.right="arrow('right',$event)"
			@keydown.left="arrow('left',$event)"
			placeholder="...　　" rows="1"
			autocomplete="off"
		></textarea>
	</div>
	<div :class="{
		'c-editaddbox__lower-body':true,
		'c-editaddbox__lower-body--mobile':(mobile),
		}"
	>
		<Item-Update-Planned-Time
			:item="item"
			v-if="state.selection.view != 'journal'"
		></Item-Update-Planned-Time>

		<div :class="{ 'c-item-tags':true,
			'c-editaddbox__item-tags':true,
			'c-editaddbox__item-tags--mobile':(mobile) }"
		>
			<Item-Add-Tag :item="item"></Item-Add-Tag>
			<Item-Tags-Strip :item="item"></Item-Tags-Strip>
		</div>

		<div class="c-mobile-buttonrow" v-if="mobile">
			<button v-if="!listIsEmpty" class="o-btn" @click="dispatch('cancelEditOrAdd')">{{ text.global.cancel }}</button>
			<button v-if="item.newItem" class="o-btn" @click="dispatch('addNew')">{{ text.card.addAndContinue }}</button>
			<button v-if="item.newItem" class="o-btn" @click="dispatch('addNew', { addNextItemAs:'stop' })">{{ text.card.addAndClose }}</button>
			<button v-if="!item.newItem" class="o-btn" @click="dispatch('doneEdit')">{{ text.global.save }}</button>
		</div>
	</div>
</form>
</template>

<script>
import ItemUpdatePlannedTime from './ItemUpdatePlannedTime.vue'
import ItemTagsStrip from './ItemTagsStrip.vue';
import ItemAddTag from './ItemAddTag.vue';

import { uniq, Utilities } from '../helpers/globalFunctions.js'
export default {
	props:['item'],
	components: { ItemUpdatePlannedTime, ItemTagsStrip, ItemAddTag },
	data () {
		return {
			newItem: {
		        body: '',
		        due_date: '0000-00-00 00:00:00',
		        done_date: '0000-00-00 00:00:00',
		        done: false,
		        planned_time: '',
		        preparedTags: [],
		        children: '',
		    },
			newTag: null,
		}
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		text(){ return this.get.text },
		mobile(){ return this.get.mobile },
		listIsEmpty(){ return this.$parent.listIsEmpty },
		itemAddingUnder(){ return this.state.nodes[this.state.addingNewUnder] },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		clickOnEditOrAddCurtain(item, event)
		{
			if (!this.get.mobile){ return; }
			if (event && event.srcElement.nodeName != 'FORM'){ return; }
			if (!this.item.newItem){ this.dispatch('doneEdit'); }
			this.dispatch('cancelAddNew');
		},
		newItemIndent()
		{
			if (!this.item.newItem){ return; }
			if (!this.itemAddingUnder.children.length || !this.itemAddingUnder.show_children)
			{ // If item has no children yet / no visible children
				this.commit('updateState', {addingNewAsChild:true});
				return;
			}
			let lastChildId = this.get.getLastChildId(this.state.addingNewUnder);
    		this.dispatch('showAddNewItem', { id:lastChildId });
		},
		newItemUnindent()
		{
			if (!this.item.newItem){ return; }
			if (this.state.addingNewAsChild)
			{
				this.commit('updateState', {addingNewAsChild:false});
				this.commit('updateState', {addingNewAsFirstChild:false});
				return;
			}
			if (this.state.selection.view == 'journal')
			{
				return;
			}
			this.dispatch('showAddNewItem', { id:this.itemAddingUnder.parent_id });
		},
		enter(e)
		{
			if (!e.shiftKey && !e.altKey && !e.metaKey && !e.ctrlKey)
			{
			  	if (this.get.mobile){ return; }
				e.preventDefault();
			  	if (!this.item.body){ return; }
			  	if (this.item.newItem)
			  	{
				  	this.dispatch('addNew');
			  	} else {
					this.dispatch('doneEdit');
			  	}				
			  	return;
			}
			else if (e.metaKey || e.ctrlKey)
			{
			// Command ENTER
	        	e.preventDefault();
			  	if (!this.item.body){ return; }
			  	this.dispatch('addNew', { addNextItemAs:'child' });
			  	return;
			}
		},
		arrow(direction, e)
		{
			if (this.item.body){ return; }
			e.preventDefault();
			preventKeydownListener();
			if (direction == 'up'){ this.dispatch('cancelEditOrAdd') }
			if (direction == 'down'){ this.dispatch('focusElement',{ el:'.js-update-planned-time__button' }) }
			if (direction == 'right'){ this.newItemIndent() }
			if (direction == 'left'){ this.newItemUnindent() }
		},
	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-editaddbox{
	width: 100%;

	font-size: 0.8em;
    padding: 0.5em;
	border: $selection-color solid thin;
	&--mobile{
		font-size: 14px;
		padding: 1.5em;
		border: none;
	}
}
.c-editaddbox__body{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: $border-gray solid thin;
}
.c-editaddbox__textarea{
    width: 100%;
    outline: 0px !important;
    padding: 0.5em;
    resize: none;
}
.c-editaddbox__lower-body{
    display: flex;
    flex-direction: column;
    align-items: baseline;    
    >div{
        padding: 0.3em;
    }
}
.c-language-picker{
    width: 100%;
    text-align: end;
}
.c-language-picker__a {
    text-decoration: none;
    color: $theme-color;
}
.c-mobile-buttonrow{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.3em;
    padding-bottom: 0 !important;
    button{
        font-size:1.2em;
    }
}
</style>