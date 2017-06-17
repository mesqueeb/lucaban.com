<template>
<form
	action="update"
	:class="{
		'updatebox':true,
		'c-updatebox':true,
		'c-updatebox--mobile':(mobile),
		'c-updatebox--updating-tags': tagsBeingEdited
		}"
	:id="'updatebox-'+item.id"
	v-if="beingEdited || tagsBeingEdited"
	@submit.prevent="doneEdit(item)"
	@click="clickOnEditCurtain(item, $event)"
>
	<div :class="{
		'c-updatebox__body':true,
		'c-updatebox__body--mobile':(mobile)
		}"
		v-if="!tagsBeingEdited"
	>
		<textarea
			class="js-edititem-body c-updatebox__textarea"
			v-focus v-autoheight
			v-model="item.body"
			@blur="blurOnEdit(item)"
			@keydown="keydownOnEdit(item, $event, 'body')"
		></textarea>
	</div>
	<div :class="{ 'c-update-tags':true,
		'c-updatebox__lower-body--mobile':(mobile)}"
	>
		<div
			:class="{ 'c-update-planned-time':true,
				'c-update-planned-time--mobile':(mobile)}"
			v-show="state.selection.view != 'journal'"
			v-if="!tagsBeingEdited"
		>
			{{ text.card.duration }}
			<button
				:class="{ 'o-btn':true,
					'c-update-planned-time__button':true,
					'js-update-planned-time__button':true,
					'c-update-planned-time__currentDuration': item.planned_time == 10 }"
				@click.prevent="setPlannedTime(item, $event)"
				@keydown="keydownOnEdit(item, $event, 'planned-time')"
				@blur="blurOnEdit(item)"
				value="10"
			>10{{ (mobileSmall) ? text.global.m : text.global.min }}</button>
			<button
				v-if="!mobileSmall"
				:class="{ 'o-btn':true,
					'c-update-planned-time__button':true,
					'c-update-planned-time__currentDuration': item.planned_time == 15 }"
				@click.prevent="setPlannedTime(item, $event)"
				@keydown="keydownOnEdit(item, $event, 'planned-time')"
				@blur="blurOnEdit(item)"
				value="15"
			>15{{ (mobileSmall) ? text.global.m : text.global.min }}</button>
			<button
				:class="{ 'o-btn':true,
					'c-update-planned-time__button':true,
					'c-update-planned-time__currentDuration': item.planned_time == 30 }"
				@click.prevent="setPlannedTime(item, $event)"
				@keydown="keydownOnEdit(item, $event, 'planned-time')"
				@blur="blurOnEdit(item)"
				value="30"
			>30{{ (mobileSmall) ? text.global.m : text.global.min }}</button>
			<button
				:class="{ 'o-btn':true,
					'c-update-planned-time__button':true,
					'c-update-planned-time__currentDuration': item.planned_time == 60 }"
				@click.prevent="setPlannedTime(item, $event)"
				@keydown="keydownOnEdit(item, $event, 'planned-time')"
				@blur="blurOnEdit(item)"
				value="60"
			>1{{ (mobileSmall) ? text.global.h : text.global.hour }}</button>
			<div><input
				class="c-update-planned-time__input" 
				v-show="true"
				v-model="item.planned_time"
				@blur="blurOnEdit(item)"
				@keydown="keydownOnEdit(item, $event, 'planned-time')"
				type="number"
			/>{{ text.global.min }}</div>
		</div>
		<div :class="{'c-item-tags':true,
			'c-updatebox__item-tags':true,
			'c-updatebox__item-tags--mobile':(mobile)}"
			v-if="beingEdited || tagsBeingEdited"
		>
			<div
				class="c-add-tag__wrapper"
				:id="'add-tag-'+item.id"
			>
				<label>
					{{ text.card.addTag }}
					<input
						class="c-add-tag__input js-add-tag"
						v-model="newTag" placeholder="..."
						@blur="blurOnEdit(item, 'add-tag')"
						@keydown="keydownOnEdit(item, $event, 'add-tag')"
						type="text" v-autowidth v-focus.noMobile
					>
				</label>
			</div>
			<span
				v-for="tag in item.tagged"
				v-if="item.tagged.length"
				v-show="!parentTags.includes(tag.tag_name)
					|| beingEdited
					|| tagsBeingEdited"
				class="o-pill--custom-tag"
				style="cursor:default"
			>
				{{ tag.tag_name }}
				<button
					class="delete-tag o-btn"
					v-if="
						(beingEdited
						|| tagsBeingEdited)
						&& !parentTags.includes(tag.tag_name)"
					@click.prevent="deleteTag(item.id, tag.tag_name, $event)"
					@keydown="keydownOnEdit(item, $event, 'delete-tag')"
					:value="tag.tag_name"
				>
					<i class="zmdi zmdi-close-circle"></i>
				</button>
			</span>
			<button v-if="mobile" class="c-mobile-edit-save-btns o-btn" @click="doneEdit(item)">
				{{ text.global.save }}
			</button>
		</div>
	</div>
</form>
</template>

<script>
export default {
	data () {
		return {
			newTag: null,
		}
	},
	props:['item'],
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		text(){ return this.get.text },
		mobile(){ return this.get.mobile },
		mobileSmall(){ return this.get.mobileSmall },
		id(){ return this.item.id },
		parentTags(){ return this.get.tagsArray(this.item.parent_id) },
		beingEdited(){ return (this.id == this.state.editingItem) },
		tagsBeingEdited(){ return (this.id == this.state.editingItemTags) },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		doneEdit(payload){ this.$store.dispatch('doneEdit', payload) },
		keydownOnEdit(item, e, field)
		{
			if (field == 'planned-time'){ item.planned_time = parseFloat(item.planned_time); }

			preventKeydownListener();
			// console.log('Keydown on edit: '+field);
			if (this.newTag && this.newTag.substring(0,1) != ' ')
			{
				this.newTag = ' '+this.newTag;
			}
			// SHIFT-TAB
			if (e.keyCode === 9 && e.shiftKey)
			{
	        	if (field == 'body')
	        	{
	        		e.preventDefault(); return;
		        }
			}
			// TAB
			if (e.keyCode === 9 && !e.shiftKey)
			{
	        	if (field == 'add-tag')
	        	{
	        		// e.preventDefault(); return;
	        		// commented out because we want to be able to focus tag-delete buttons.
		        }
			}
			// Delete / backspace
			if (e.keyCode === 8 || e.keyCode === 46)
			{
	        	if (field == 'delete-tag')
	        	{
	        		let tagName = e.srcElement.value;
					this.deleteTag(item.id, tagName);
	        	}
			}
			// ENTER
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey)
			{
				console.log(`Keydown on edit: ${field} - ${e.keyCode}`);
				if (this.get.mobile && field == 'body'){ return; }
				e.preventDefault();
	        	if (field == 'delete-tag')
	        	{
	        		let tagName = e.srcElement.value;
					this.deleteTag(item.id, tagName);
					return;
	        	}
				if (field == 'planned-time')
				{
					this.setPlannedTime(item, event);
					return;
				}
				if (field == 'add-tag' && this.newTag)
				{
					this.addTag(item);
					return;
				}
				this.doneEdit(item);
				return;
			}
			// ArrowUp
			if (e.keyCode === 38)
			{
				if (field == 'body')
				{
		        	return;
				}
				if (field == 'planned-time')
				{
					e.preventDefault();
					let plsFocus = '#updatebox-'+item.id+' .js-edititem-body';
					document.querySelector(plsFocus).focus();
					return;
				}
				if (field == 'add-tag')
				{
					e.preventDefault();
		        	if (this.state.editingItemTags){
		        		this.dispatch('updateState', {editingItemTags:null }); 
		        		return;
		        	}
					let plsFocus = '#updatebox-'+item.id+' .js-update-planned-time__button';
					document.querySelector(plsFocus).focus();
					return;
				}
			}
			// ArrowDown
			if (e.keyCode === 40)
			{
				if (field == 'body')
				{
					return;		        	
				}
				e.preventDefault();
				if (field == 'planned-time')
				{
					let plsFocus = '#add-tag-'+item.id+' .js-add-tag';
					document.querySelector(plsFocus).focus();
					return;
				}
				if (field == 'add-tag')
				{
		        	if (this.state.editingItemTags){
		        		this.dispatch('updateState', {editingItemTags:null }); 
		        	}
		        	return;
				}
			}
			// ESC
			if (e.keyCode === 27)
			{
	        	this.dispatch('setCancelThroughKeydown');
				this.dispatch('cancelEdit', {id:item.id});
			}
	    },
	    blurOnEdit(item, field)
	    {
	    	if (this.state.cancelThroughKeydown){ return; }
	    	if (this.get.mobile && field == 'add-tag')
	    	{
				this.addTag(item);
				return;
	    	}
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
    				if (self.get.mobile){ return; }
			    	console.log('blurring on edit');
					self.doneEdit(item);
				}
	    	},50);
	    	// Codementor: is there any better way than this?
	    },
		setPlannedTime(item, event)
		{
			item.planned_time = (event.srcElement.value) ? parseFloat(event.srcElement.value) : 0 ;
			let plsFocus = '#add-tag-'+item.id+' .js-add-tag';
			Vue.nextTick(function ()
			{
				console.log('returning to editting: '+plsFocus);
				document.querySelector(plsFocus).focus();
			});
		},
		addTag(item)
		{
			let id = (item) ? item.id : this.state.selection.selectedId;
			let tag = this.newTag;
			this.dispatch('tagItem', {id, tags:tag});
			this.newTag = null;
		},
		deleteTag(id, tagName, event)
		{
			let plsFocus = '#add-tag-'+id+' .js-add-tag';
			document.querySelector(plsFocus).focus();			
			this.dispatch('patchTag',{id, tags:tagName, requestType:'untag'});
		},
		clickOnEditCurtain(item, event)
		{
			if (!this.get.mobile){ return; }
			if (event && event.srcElement.nodeName != 'FORM'){ return; }
			this.doneEdit(item);
		},
	},
}
</script>

<style lang="scss">

</style>