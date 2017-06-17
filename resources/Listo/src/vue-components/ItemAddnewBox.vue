<template>
<form 
	:class="{
		'addnewbox':true, 
		'c-addnewbox':true, 
		'c-addnewbox--mobile':(mobile),
		'child':state.addingNewAsChild,
		'first-child':state.addingNewAsFirstChild,}"
	:id="'new-under-'+ item.id "
	v-if=" showAddNewBox
		|| (listIsEmpty && !mobile && state.selection.view != 'journal')"
	@submit.prevent
	@click="clickOnAddNewCurtain($event)"
>
	<div :class="{
		'c-addnewbox__body':true,
		'c-addnewbox__body--mobile':(mobile),
		'flex-wrap':true,
		}"
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
		<textarea type="text"
			v-focus
			v-autoheight
			class="js-newitem-body c-addnewbox__textarea"
			v-model="newItem.body"
			@blur="blurOnAddNew(item)"
			@keydown="keydownOnNew(item, $event, 'body')"
			placeholder="...　　"
			autocomplete="off"
			rows="1"
		></textarea>
	</div>
	<div :class="{
		'c-update-tags':true,
		'c-addnewbox__lower-body--mobile':(mobile),
		}"
	>
		<div class="c-update-planned-time">
			{{ text.card.duration }}
			<button
				:class="{ 'o-btn':true,
					'c-update-planned-time__button':true,
					'js-update-planned-time__button':true,
					'c-update-planned-time__currentDuration': newItem.planned_time == 10 }"
				@click.prevent="setPlannedTimeNewItem(item, $event)"
				@keydown="keydownOnNew(item, $event, 'planned-time')"
				@blur="blurOnAddNew(item)"
				value="10"
			>10{{ (mobileSmall) ? text.global.m : text.global.min }}</button>
			<button
				v-if="!mobileSmall"
				:class="{ 'o-btn':true,
					'c-update-planned-time__button':true,
					'c-update-planned-time__currentDuration': newItem.planned_time == 15 }"
				@click.prevent="setPlannedTimeNewItem(item, $event)"
				@keydown="keydownOnNew(item, $event, 'planned-time')"
				@blur="blurOnAddNew(item)"
				value="15"
			>15{{ (mobileSmall) ? text.global.m : text.global.min }}</button>
			<button
				:class="{ 'o-btn':true,
					'c-update-planned-time__button':true,
					'c-update-planned-time__currentDuration': newItem.planned_time == 30 }"
				@click.prevent="setPlannedTimeNewItem(item, $event)"

				@keydown="keydownOnNew(item, $event, 'planned-time')"
				@blur="blurOnAddNew(item)"
				value="30"
			>30{{ (mobileSmall) ? text.global.m : text.global.min }}</button>
			<button
				:class="{ 'o-btn':true,
					'c-update-planned-time__button':true,
					'c-update-planned-time__currentDuration': newItem.planned_time == 60 }"
				@click.prevent="setPlannedTimeNewItem(item, $event)"
				@keydown="keydownOnNew(item, $event, 'planned-time')"
				@blur="blurOnAddNew(item)"
				value="60"
			>1{{ (mobileSmall) ? text.global.h : text.global.hour }}</button>
			<div><input
				class="c-update-planned-time__input"
				v-if="true"
				type="number"
				v-model="newItem.planned_time"
				@keydown="keydownOnNew(item, $event, 'planned-time')"
				@blur="blurOnAddNew(item)"
			/>{{ text.global.min }}</div>
		</div>
		<div :class="{ 'c-item-tags':true,
			'c-addnewbox__item-tags':true,
			'c-prepared-tags--mobile':(mobile) }"
		>
			<div class="c-prepare-tag__wrapper">
				<label>
					{{ text.card.addTag }}
					<input type="text"
						class="js-prepare-tag c-prepare-tag__input"
						@keydown="keydownOnNew(item, $event, 'prepare-tag')"
						@blur="blurOnAddNew(item, 'prepare-tag')"
						v-model="newTag"
						v-autowidth
						placeholder="..."
					>
				</label>
			</div>
			<span v-if="preparedPlusComputedTags.length"
				v-for="tag in preparedPlusComputedTags"
				:class="(tag=='Today') ? 'o-pill--duedate' : 'o-pill--custom-tag'"
				style="cursor:default"
			>{{ tag }}
				<button class="o-btn delete-tag"
					v-if="newItem.preparedTags.includes(tag)"
					@click.prevent="deletePreparedTag(tag, item)"
					@keydown="keydownOnNew(item, $event, 'delete-tag')"
					:value="tag"
				>
					<i class="zmdi zmdi-close-circle"></i>
				</button>
			</span>
		</div>
		<div class="c-mobile-buttonrow" v-if="mobile">
			<button class="o-btn" @click="cancelAddNew" v-if="!listIsEmpty">{{ text.global.cancel }}</button>
			<button class="o-btn" @click="addNew">{{ text.card.addAndContinue }}</button>
			<button class="o-btn" @click="addNew('stop')">{{ text.card.addAndClose }}</button>
		</div>
	</div>
</form>
</template>

<script>
import { uniq, Utilities } from '../helpers/globalFunctions.js';
export default {
	props:['item'],
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
		mobileSmall(){ return this.get.mobileSmall },
		id(){ return this.item.id },
		parentTags(){ return this.get.tagsArray(this.item.parent_id) },
		listIsEmpty()
		{
			if (!this.item || !this.state.root){ return false; }
			if (this.item.id != this.state.root.id){ return false; }
			if (!this.get.visibleDirectChildren(this.id).length){ return true; }
		},
		preparedPlusComputedTags()
		{ if (!this.item){ return []; }
			if (this.item.id == this.state.root.id){ return []; }
			let alltags = this.newItem.preparedTags;
			if (this.state.selection.tags.length)
			{
				alltags = alltags.concat(this.state.selection.tags.map(tag => Utilities.tagSlugToName(tag)));
			}
			if (this.parentTags.length)
			{
				alltags = alltags.concat(this.parentTags);
			}
			if (this.state.addingNewAsChild)
			{
				let tagz = this.get.returnTagsAsArray(this.item.id);
				alltags = alltags.concat(tagz);
			}
			if (this.get.isTopLvlItemInFilteredRoot(this.item.id))
			{
				if (this.state.nodes[this.item.parent_id])
				{
					let tagzies = this.get.returnTagsAsArray(this.item.parent_id);
					alltags = alltags.concat(tagzies);
				}
			}
			alltags = uniq(alltags);
			return alltags.sort();
		},
		showAddNewBox()
		{ if (!this.item){ return; }
			if (!this.state.addingNewUnder){ return false; }
			if (this.state.addingNewUnder == this.item.id)
			{ return true; }
			return false;
		},

	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		clickOnAddNewCurtain(event)
		{
			if (!this.get.mobile){ return; }
			if (event && event.srcElement.nodeName != 'FORM'){ return; }
			this.dispatch('cancelAddNew');
		},
		newItemIndent()
		{
			if (!this.item.children.length || !this.item.show_children)
			{ // If item has no children yet / no visible children
				this.commit('updateState', {addingNewAsChild:true});
				return;
			}
			let lastChildId = this.get.getLastChildId(this.item.id);
    		this.dispatch('showAddNewItem', lastChildId);
		},
		newItemUnindent()
		{
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
			this.dispatch('showAddNewItem', { id:this.item.parent_id });
		},
		keydownOnNew(item, e, field)
		{
			if (this.newTag && this.newTag.substring(0,1) != ' ')
			{
				this.newTag = ' '+this.newTag;
			}
			if (field == 'planned-time'){ this.newItem.planned_time = parseFloat(this.newItem.planned_time); }
			console.log(e);
			console.log('↑　keydown on new: '+e.keyCode+' - '+field);
			// SHIFT-TAB
			if (e.keyCode === 9 && e.shiftKey)
			{
	        	if (field == 'body')
	        	{
	        		e.preventDefault();
		        	this.newItemUnindent();
		        	return;
		        }
			}
			// TAB
			if (e.keyCode === 9 && !e.shiftKey)
			{
	        	if (field == 'prepare-tag')
	        	{
	        		// e.preventDefault();
		        	// this.newItemIndent();
		        	// return;
		        }
			}
			// Delete / backspace
			if (e.keyCode === 8 || e.keyCode === 46)
			{
	        	if (field == 'delete-tag')
	        	{
	        		let tagName = e.srcElement.value;
					this.deletePreparedTag(item.id, tagName);
	        	}
			}
			// ENTER
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey && !e.metaKey && !e.ctrlKey)
			{
			  	if (this.get.mobile && field == 'body'){ return; }
				e.preventDefault();
				if (field == 'planned-time')
				{
					this.setPlannedTimeNewItem(item, event);
					return;
				}
				if (field == 'prepare-tag' && this.newTag)
				{
					this.prepareTag(item);
					return;
				}
	        	if (field == 'delete-tag')
	        	{
	        		let tagName = e.srcElement.value;
					this.deletePreparedTag(item.id, tagName);
	        	}
			  	if (!this.newItem.body){ return; }
			  	this.addNew();
			  	return;
			}
			else if (e.keyCode === 13 && (e.metaKey || e.ctrlKey))
			{
			// Command ENTER
	        	e.preventDefault();
			  	if (!this.newItem.body){ return; }
			  	let addNextItemAs = 'child';
			  	this.addNew(addNextItemAs);
			  	return;
			}
			// ArrowLeft
			if (e.keyCode === 37)
			{
				// If in an EMPTY BODY
				if ((field != 'body' && field != 'prepare-tag') || (field == 'body' && !this.newItem.body))
				{
					e.preventDefault();
		        	// console.log('this.newItemUnindent();');
		        	this.newItemUnindent();
		        	return;
				}
			}
			// ArrowRight
			if (e.keyCode === 39)
			{
				// If in an EMPTY BODY
				if ((field != 'body' && field != 'prepare-tag') || (field == 'body' && !this.newItem.body))
				{
					e.preventDefault();
		        	// console.log('this.newItemIndent();');
		        	this.newItemIndent();
		        	return;
				}
			}
			// ArrowUp
			if (e.keyCode === 38)
			{
				// If body is empty!
				if (field == 'body' && !this.newItem.body)
				{
		        	e.preventDefault();
		        	this.cancelAddNew();
		        	return;
				}
				if (field == 'planned-time')
				{
					e.preventDefault();
					let plsFocus = '#new-under-'+this.item.id+' .js-newitem-body';
					document.querySelector(plsFocus).focus();
					return;
				}
				if (field == 'prepare-tag')
				{
					e.preventDefault();
					let plsFocus = '#new-under-'+this.item.id+' .js-update-planned-time__button';
					document.querySelector(plsFocus).focus();
					return;
				}
			}
			// ArrowDown
			if (e.keyCode === 40)
			{
				// If body is empty!
				if (field == 'body' && !this.newItem.body)
				{
		        	e.preventDefault();
					let plsFocus = '#new-under-'+this.item.id+' .js-update-planned-time__button';
					document.querySelector(plsFocus).focus();
					return;
				}
				if (field == 'planned-time')
				{
					e.preventDefault();
					let plsFocus = '#new-under-'+this.item.id+' .js-prepare-tag';
					document.querySelector(plsFocus).focus();
					return;
				}
				if (field == 'prepare-tag' && !this.newItem.body)
				{
					e.preventDefault();
		        	this.cancelAddNew();
		        	return;
				}
			}
			// ESC
			if (e.keyCode === 27)
			{
			   	e.preventDefault();
	        	this.cancelAddNew();
	        	this.dispatch('setCancelThroughKeydown');
			}
	    },
	    blurOnAddNew(item, field)
	    {
	    	if (this.state.cancelThroughKeydown){ return; }
	    	if (this.get.mobile && field == 'prepare-tag')
	    	{
				this.prepareTag(item);
				return;
	    	}
	    	if (this.get.mobile){ return; }
	    	let self = this;
	    	setTimeout(function()
	    	{
		    	if ( document.activeElement.nodeName == 'INPUT'
		    		||  document.activeElement.nodeName == 'TEXTAREA'
		    		||  document.activeElement.nodeName == 'A'
		    		||  document.activeElement.nodeName == 'BUTTON' )
		    	{
	        		return;
				} else {
			    	// if (self.$root.mobile){ self.addNew('stop'); return; }
			    	console.log('bluring on Add New');
			    	if (self.get.mobile){ return; }
					self.cancelAddNew();
				}
	    	},50);
	    },
		addNew(addNextItemAs)
		{
			let addTags = this.preparedPlusComputedTags;
			let olderSibling = this.item;
			let newItem = JSON.parse(JSON.stringify(this.newItem));
			this.newItem.body = '';
			this.newItem.due_date = '0000-00-00 00:00:00';
			this.newItem.done_date = '0000-00-00 00:00:00';
			this.newItem.done = false;
			this.newItem.planned_time = '';
			this.newItem.preparedTags = [];
			// this.$store.commit('resetNewItem');
			// debugger;
			this.dispatch('addNew', { addNextItemAs, newItem, olderSibling, addTags });
			// Reset stuff
		},
		cancelAddNew()
		{
			this.newItem.body = '';
			let cancelUnderId = this.item.id;
			this.dispatch('cancelAddNew',{cancelUnderId});
		},
		prepareTag(item)
		{
			let id = (item) ? item.id : this.state.selection.selectedId;
			let tag = this.newTag;
			if (tag=='t' || tag=='T' || tag=='today' || tag=='Today')
			{
				tag = 'Today';
			}
			this.newItem.preparedTags.push(tag);
			this.newTag = null;
		},
		deletePreparedTag(tag, item)
		{
			let plsFocus = '#new-under-'+this.item.id+' .js-prepare-tag';
			document.querySelector(plsFocus).focus();
			let tagIndex = this.newItem.preparedTags.indexOf(tagIndex);
			this.newItem.preparedTags.splice(tagIndex, 1)
		},
		setPlannedTimeNewItem(item, event)
		{
			this.newItem.planned_time = (event.srcElement.value) ? parseFloat(event.srcElement.value) : 0 ;
			let plsFocus = "#new-under-"+item.id+" .js-prepare-tag";
			Vue.nextTick(function ()
			{
				console.log('returning to : '+plsFocus);
				document.querySelector(plsFocus).focus();
	    	});
		},
	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-language-picker{
    width: 100%;
    text-align: end;
}
.c-language-picker__a {
    text-decoration: none;
    color: $theme-color;
}
</style>