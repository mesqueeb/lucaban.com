<template id="items-card-template">

<div
	v-if="item || listIsEmpty"
	:id="'card-'+item.id"
	:class="{
		'items-card': true,
		'journal-wrapper': journalView
	}"
>
<div
	class="item-card-wrapper"
	v-if="!isHidden || listIsEmpty"
>

	<div
		class="title"
		v-if="journalDate"
	>
		<!-- Codementor: Is this the correct way to format something like this? -->
		<span>{{ momentCalendar(journalDate) }}</span>
		<span class="journal-date-small">{{ journalDate }}</span>
	</div>
		<!-- v-if="journalView && item.depth != 0 && item.parents_bodies" -->
	<div
		class="parent-string"
		v-if="journalParentString"
		@click="selectItem(item)"
	>
		<div>
			{{ journalParentString }}
		</div>
	</div>
	<div 
		v-if="item.depth != 0"
		:class="{
			'item-card': true,
			done: item.done,
			show_children: item.show_children,
			editing: item.id == basis.editingItem,
		}"
	>
		<div
			class="toggle-div"
			v-if="!journalView"
		>
			<input
				class="toggle"
				type="checkbox"
				v-if="item.children_order.length==0 || item.done == true || allChildrenDone"
				v-model="item.done"
				@change="updateDone(item.id)"
			>
			<input
				type="checkbox"
				class="styled-check"
				:id="'show_children_'+item.id"
				v-model="item.show_children"
				@change="updateShowChildren(item.id)"
			>
			<label
				class="arrow"
				:for="'show_children_'+item.id"
				:style="(allChildrenDone) ? 'margin-left: 0.1em; margin-right: -0.5em;':''"
				v-if="item.children_order.length>0"
			></label>
		</div>
		<div
			class=""
			v-if="journalView"
		>・</div>
		<div
			:class="{
				'body-div':true,
				'textarea-wrap':true,
				'selected': item.id == basis.selection.selectedId,
				'project': isProject,
				'updating-tags': item.id == basis.editingItemTags}"
			@dblclick="startEdit(item, $event)"
			@click="selectItem(item)"
		>
			<div
				class="bodybox"
				v-show="item.id != basis.editingItem"
			>
				<div>{{ linkify(item.body) }}</div>
				<div class="completion-notes bodybox"
					v-if="item.completion_memo"
					@click="selectItem(item)"
				>{{ item.completion_memo }}</div>
			</div>

			<!-- For debugging: -->
			<span v-if="false">
				({{item.id}}) D-{{item.depth}})
				<span v-if="item.children_order.length">
					[{{item.children_order}}]
				</span>
			</span>
			<!-- // For debugging: -->

<!-- UPDATE BOX -->
			<form
				action="update"
				class="updatebox"
				:id="'updatebox-'+item.id"
				v-if="item.id == basis.editingItem"
				@submit.prevent="doneEdit(item)"
			>
				<div class="update-body">
					<textarea
						v-focus
						v-autoheight
						class="edititem-body"
						:rows="item.rows"
						v-model="item.body"
						@blur="blurOnEdit(item)"
						@keydown="keydownOnEdit(item, $event, 'body')"
					></textarea>
				</div>
				<div class="update-tags">
					<div
						class="update-planned-time"
						v-show="basis.selection.view != 'journal'"
					>
						Duration:
						<button
							:class="{ currentDuration: item.planned_time == 10, 'planned-time': true }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="10"
						>10 min</button>
						<button
							:class="{ currentDuration: item.planned_time == 15, 'planned-time': true }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="15"
						>15 min</button>
						<button
							:class="{ currentDuration: item.planned_time == 30, 'planned-time': true }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="30"
						>30 min</button>
						<button
							:class="{ currentDuration: item.planned_time == 60, 'planned-time': true }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="60"
						>1 hour</button>
						<div><input
							class="planned-time" 
							type="number"
							v-show="true"
							v-model="item.planned_time"
							@blur="blurOnEdit(item)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
						/>min</div>
					</div>
				</div>
			</form>
<!-- / .UPDATEBOX -->

<!-- ITEM TAGS -->
			<div class="item-tags">
				<div
					class="add-tag-wrapper"
					:id="'add-tag-'+item.id"
					v-if="item.id == basis.editingItem || item.id == basis.editingItemTags"
				>
					<label>
						Add Tag: 
						<input
							type="text"
							class="add-tag"
							v-model="newTag"
							v-autowidth
							v-focus
							@blur="blurOnEdit(item)"
							@keydown="keydownOnEdit(item, $event, 'addTag')"
							placeholder="..."
						>
					</label>
				</div>
				<label
					class="done"
					v-if="item.done
						&& item.id != basis.editingDoneDateItem
						&& !journalView"
				>
					Done {{ momentCalendar(item.done_date) }}
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
						&& !item.done" class="total-duration"
				>
					{{ sec_to_hourminsec(totalSecLeft) }}
				</span>
				<span
					class="duration"
					v-if="item.id != basis.editingItem
						&& secLeft > 0
						&& !item.done
						&& item.id != basis.editingItemTags"
				>
					{{ sec_to_hourminsec(secLeft) }}
				</span>
				
				<span
					v-if="hasDueDate && !item.done
						&& item.id != basis.editingItemTags"
					class="duedate"
				>
					{{ momentCalendar(item.due_date) }}
				</span>
				<span
					v-if="item.dueDateParent && !item.done
					 && item.id != basis.editingItemTags"
					class="duedate-parent"
				>
					{{ momentCalendar(item.dueDateParent) }}
				</span>
				<span
					v-for="tag in item.tagged"
					v-if="item.tagged.length"
					v-show="!parentTags.includes(tag.tag_name)
						|| item.id == basis.editingItem
						|| item.id == basis.editingItemTags"
					class="custom-tag"
					@dblclick.prevent="basis.filterItems('tag', tag.tag_slug, $event)"
				>
					{{ tag.tag_name }}
					<button
						class="delete-tag"
						v-if="
							(item.id == basis.editingItem
							|| item.id == basis.editingItemTags)
							&& !parentTags.includes(tag.tag_name)"
						@click.prevent="deleteTag(item.id, tag.tag_name, $event)"
						@keydown="keydownOnEdit(item, $event, 'delete-tag')"
						:value="tag.tag_name"
					>
						<i class="zmdi zmdi-close-circle"></i>
					</button>
				</span>
			</div>
<!-- / .ITEM-TAGS -->

			<div
				class="item-nav"
				v-if="
					basis.editingItem != item.id
					&& basis.editingItemTags != item.id
					&& basis.selection.selectedId == item.id"
			>
				<button
					v-if="!item.done"
					class="timer"
					@click="addTimer(item)"
				>
					<i class="zmdi zmdi-timer"></i>
				</button>
				<button
					v-if="item.done"
					class="more"
					@click="basis.popup(item.id, 'afterDone')"
				>
					<i class="zmdi zmdi-more"></i>
				</button>
				<!--
				- font icon / woff format [font awesome]
				  material design iconic fonts
				- add svg as background to button
				- or image tag inside button
				- svg tag -> add as pattern
				-->
				<button
					class="delete" 
					v-if="item.children_order.length==0"
					@click="deleteItem(item)"
				>
					<i class="zmdi zmdi-delete"></i>
				</button>
			</div><!-- / .item-nav -->
			
		</div>
	</div>

<!-- CHILDREN -->
	<div class="children"
		v-if="item.children.length"
		v-show="item.show_children"
		:style="(addingNewAsFirstChild)?'order:3;':''"
	>
		<Card v-for="childCard in item.children"
			:item="childCard"
			:key="childCard.id"
		></Card>
	</div>
<!-- / CHILDREN -->

<!-- ADD NEW BOX -->
	<form 
		:class="{'addnewbox':true, 
			'child':addingNewAsChild,
			'first-child':addingNewAsFirstChild,}"
		:id="'new-under-'+ item.id "
		v-if="showAddNewBox || (listIsEmpty && basis.selection.view != 'journal')"
		@submit.prevent
	>
		<div>
			<textarea type="text"
				v-focus
				v-autoheight
				class="newitem-body"
				v-model="newItem.body"
				@blur="blurOnAddNew(item)"
				@keydown="keydownOnNew(item, $event, 'body')"
				placeholder="...　　"
				autocomplete="off"
				autofocus 
				rows="1"
			></textarea>
		</div>
		<div class="update-tags">
			<div class="update-planned-time">
				Duration:
				<button
					:class="{ currentDuration: newItem.planned_time == 10, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="10"
				>10 min</button>
				<button
					:class="{ currentDuration: newItem.planned_time == 15, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="15"
				>15 min</button>
				<button
					:class="{ currentDuration: newItem.planned_time == 30, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"

					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="30"
				>30 min</button>
				<button
					:class="{ currentDuration: newItem.planned_time == 60, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="60"
				>1 hour</button>
				<div><input
					class="planned-time"
					v-if="true"
					type="number"
					v-model="newItem.planned_time"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				/>min</div>
			</div>
			<div class="item-tags prepared-tags">
				<div class="add-prepared-tag-wrapper">
					<label>
						Add Tag: 
						<input type="text"
							class="prepare-tag"
							@keydown="keydownOnNew(item, $event, 'prepare-tag')"
							@blur="blurOnAddNew(item)"
							v-model="newTag"
							v-autowidth
							placeholder="..."
						>
					</label>
				</div>
				<span v-if="preparedPlusComputedTags.length"
					v-for="tag in preparedPlusComputedTags"
					:class="(tag=='Today') ? 'duedate' : 'custom-tag'"
				>{{ tag }}
					<button class="delete-tag"
						v-if="newItem.preparedTags.includes(tag)"
						@click.prevent="deletePreparedTag(tag, item)"
						@keydown="keydownOnNew(item, $event, 'delete-tag')"
						:value="tag"
					>
						<i class="zmdi zmdi-close-circle"></i>
					</button>
				</span>
			</div>
		</div>
	</form>
<!-- / ADD NEW BOX -->

</div>
</div>
</template>
<script>
// import Morph from '../components/valueMorphers.js'
// window.Morph = new Morph();
import { linkify, momentCalendar, sec_to_hourminsec } from '../components/valueMorphers2.js';
import flatPickConfig from '../components/flatPickrOptions.js';
import autosize from 'autosize';
import autosizeInput from 'autosize-input';
import { uniq } from '../components/globalFunctions.js';

export default {
	name: 'Card',
	template:'#items-card-template',
	mounted()
	{
		// this.newItem.preparedTags = JSON.parse(JSON.stringify(this.parentTags));
		this.convertbodyURLtoHTML();
    	eventHub.$on('startEdit', this.startEdit);
    	eventHub.$on('escapeOnEditButtonFocus', this.cancelEdit);
    	eventHub.$on('escapeOnNewButtonFocus', this.cancelAddNew);
	},
	props: ['item'],
	data()
	{
		return {
			newItem: {
				body: '',
				planned_time:0,
				preparedTags:[],
				due_date: '0000-00-00 00:00:00',
				children: '',
			},
			newTag: null,
		};
	},
	// components: { 
	// Flatpickr: Flatpickr,
	// },
	computed: {
		preparedPlusComputedTags()
		{ if(!this.item || !allItems){ return 0; }
			let alltags = this.newItem.preparedTags;
			if (selection.tags.length)
			{
				alltags = alltags.concat(selection.tags.map(tag => allItems.tagSlugToName(tag)));
			}
			if (this.parentTags.length)
			{
				alltags = alltags.concat(this.parentTags);
			}
			if (this.$root.addingNewAsChild)
			{
				let tagz = allItems.returnTagsAsArray(this.item.id);
				alltags = alltags.concat(tagz);
			}
			alltags = uniq(alltags);
			return alltags.sort();
		},
		listIsEmpty()
		{ if(!this.item || !allItems){ return 0; }
			return this.$root.noItems;
		},
		basis()
		{ if(!this.item || !allItems){ return 0; }
			return this.$root;
		},
		totalPlannedMin()
		{ if(!this.item || !allItems){ return 0; }
			// console.log('trying at totalPlannedMin');
			if(!this.item.children.length){ return (this.item.planned_time) ? parseFloat(this.item.planned_time) : 0 ; }
			let childrenArray = allItems.flattenTree(this.item.children);
			let x = childrenArray.reduce((prevVal, child) => prevVal + parseFloat(child.planned_time), parseFloat(this.item.planned_time));
			x = x - this.$root.hiddenItemsTotalPlannedTime;
		    return (x) ? parseFloat(x) : 0;
		},
		totalUsedSec()
		{ if(!this.item || !allItems){ return 0; }
			// console.log('trying at totalUsedSec');
			if(!this.item.children.length){ return (this.item.used_time) ? this.item.used_time : 0 ; }
			let childrenArray = allItems.flattenTree(this.item.children);
			let x = childrenArray.reduce((prevVal, child) => prevVal + child.used_time, this.item.used_time);
		    x = x - this.$root.hiddenItemsTotalUsedTime;
		    return (x) ? x : 0;
		},
		journalView()
		{ if(!this.item || !allItems){ return; }
			if(this.$root.selection.view == 'journal'){
				return true;
			} else { return false; }
		},
		journalDate()
		{ if(!this.item || !allItems){ return; }
			// console.log('run on '+this.item.id+' - '+this.item.body);
			if(this.$root.selection.view != 'journal'){ return false; }
			if(this.journalView){
				if(this.item.depth == 0){ return; }
				let prevId = allItems.prevItemId(this.item.id);
				let prevDoneDate = allItems.nodes[prevId].done_date;
				prevDoneDate = moment(prevDoneDate).format('YYYY/MM/DD');
				let thisDoneDate = moment(this.item.done_date).format('YYYY/MM/DD');
				if (thisDoneDate != prevDoneDate){
					return thisDoneDate;
				}
			}
			return false;
		},
		journalParentString()
		{ if(!this.item || !allItems){ return; }
			// console.log('run on '+this.item.id+' - '+this.item.body);
			if(this.$root.selection.view != 'journal'){ return false; }
			if(this.journalView){
				if(this.item.depth == 0){ return; }
				let prevId = allItems.prevItemId(this.item.id);
				let parentString = this.item.parents_bodies;
				let prevParentString = allItems.nodes[prevId].parents_bodies;

				let prevDoneDate = allItems.nodes[prevId].done_date;
				prevDoneDate = moment(prevDoneDate).format('YYYY/MM/DD');
				let thisDoneDate = moment(this.item.done_date).format('YYYY/MM/DD');

				if (
					parentString
					&& ( parentString != prevParentString
						|| thisDoneDate != prevDoneDate ) )
				{
					return parentString;
				}
			}
			return false;
		},
		totalUsedMin()
		{ if(!this.item || !allItems){ return 0; }
			return this.totalUsedSec/60;
		},
		totalPlannedSec()
		{ if(!this.item || !allItems){ return 0; }
			return this.totalPlannedMin*60;
		},
		totalPlannedHour()
		{ if(!this.item || !allItems){ return 0; }
			return this.totalPlannedMin/60;
		},
		isProject()
		{ if(!this.item || !allItems){ return; }
			// console.log('checking isProject');
			return allItems.isProject(this.item.id);	
		},
		siblingIndex()
		{ if(!this.item || !allItems){ return; }
			return allItems.siblingIndex(this.item.id);
		},
		olderSiblingId()
		{ if(!this.item || !allItems){ return; }
			return allItems.olderSiblingId(this.item.id); 
		},
		parentsChildren_order()
		{ if(!this.item || !allItems){ return; }
			if(this.item.depth == 0){ return allItems.nodes[this.item.id].children_order; }
			return this.$parent.item.children_order;
		},
		showAddNewBox()
		{ if(!this.item || !allItems){ return; }
			if(this.$root.addingNewUnder == this.item.id)
			{ return true; }
			return false;
		},
		addingNewAsFirstChild()
		{ if(!this.item || !allItems){ return; }
			return this.$root.addingNewAsFirstChild;
		},
		addingNewAsChild()
		{ if(!this.item || !allItems){ return; }
			return this.$root.addingNewAsChild;
		},
		hasDueDate()
		{ if(!this.item || !allItems){ return; }
		    return (this.item.due_date && this.item.due_date != '0000-00-00 00:00:00');
		},
		hasDoneDate()
		{ if(!this.item || !allItems){ return; }
		    return (this.item.done_date && this.item.done_date != '0000-00-00 00:00:00');
		},
		hastotalUsedSec()
		{ if(!this.item || !allItems){ return; }
		    return (this.item.children_order.length
		    	&& this.item.totalUsedSec
		    	&& this.item.totalUsedSec != '0'
		    	&& this.item.used_time != this.item.totalUsedSec);
		},
		hasTotalPlannedMin()
		{ if(!this.item || !allItems){ return; }
		    return (this.item.children_order.length
		    	&& this.totalPlannedMin
		    	&& this.totalPlannedMin != '0'
		    	&& this.item.planned_time != this.totalPlannedMin);
		},
		hasPlannedTime()
		{ if(!this.item || !allItems){ return; }
		    return (this.item.planned_time && this.item.planned_time != '0');
		},
		hasUsedTime()
		{ if(!this.item || !allItems){ return; }
		    return (this.item.used_time && this.item.used_time != '0');
		},
		allTags_c()
		{ if(!this.item || !allItems){ return; }
			return this.$root.allTags;
		},
		totalMinLeft()
		{ if(!this.item || !allItems){ return 0; }
			return this.totalPlannedMin-this.totalUsedMin;
		},
		totalSecLeft()
		{ if(!this.item || !allItems){ return 0; }
			return this.totalPlannedSec-this.totalUsedSec;
		},
		secLeft()
		{ if(!this.item || !allItems){ return 0; }
			return this.item.planned_time*60-this.item.used_time;
		},
		minLeft()
		{ if(!this.item || !allItems){ return 0; }
			return this.secLeft/60;
		},
		totalTimeDifferentFromParent()
		{ if(!this.item || !allItems){ return 0; }
			if(!this.item.parent_id){ return true; }
			return this.totalPlannedSec != this.$parent.totalPlannedSec;
		},
		parentTags()
		{ if(!this.item || !allItems || !this.item.parent_id || !this.$parent.item){ return []; }
			return this.$parent.item.tagged.map(obj => obj.tag_name);
		},
		isHidden()
		{ if(!this.item || !allItems){ return true; }
			return this.$root.selection.hiddenItems.includes(this.item.id)
		},
		allChildrenDone()
		{ if(!this.item || !allItems){ return true; }
			return allItems.allChildrenDone(this.item.id);
		},
	},
	methods: {
		linkify,
		momentCalendar,
		sec_to_hourminsec,
		convertbodyURLtoHTML()
		{
			if(!this.item){ return; }
			let bodyboxQS = "#card-"+this.item.id+" > div > .item-card > .body-div > .bodybox > div";
			let a = document.querySelector(bodyboxQS);
			if(!a){ return; }
			a.innerHTML = a.innerHTML.replace("&lt;a href=", "<a href=").replace('target="_blank"&gt;','target="_blank">').replace("&lt;/a&gt;","</a>");
		},
		addTimer(item)
		{
			//Codementor
			this.$root.addTimer(item.id);
		},
		selectItem(item)
		{
			selection.selectedId = item.id;
		},
		newItemIndent()
		{
			if(!this.item.children.length || !this.item.show_children)
			{
        	// If item has no children yet / no visible children
				this.$root.addingNewAsChild = true;
				return;
			}
			let lastChildId = allItems.getLastChildId(this.item.id);
    		vm.$root.showAddNewItem(lastChildId);
		},
		newItemUnindent()
		{
			if(this.$root.addingNewAsChild)
			{
				this.$root.addingNewAsChild = false;
				this.$root.addingNewAsFirstChild = false;
				return;
			}
			if(selection.view == 'journal')
			{
				return;
			}
			vm.$root.showAddNewItem(this.item.parent_id);
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
	        	if(field == 'body')
	        	{
	        		e.preventDefault();
		        	this.newItemUnindent();
		        	return;
		        }
			}
			// TAB
			if (e.keyCode === 9 && !e.shiftKey)
			{
	        	if(field == 'prepare-tag')
	        	{
	        		// e.preventDefault();
		        	// this.newItemIndent();
		        	// return;
		        }
			}
			// Delete / backspace
			if (e.keyCode === 8 || e.keyCode === 46)
			{
	        	if(field == 'delete-tag')
	        	{
	        		let tagName = e.srcElement.value;
					this.deletePreparedTag(item.id, tagName);
	        	}
			}			
			// ENTER
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey && !e.metaKey && !e.ctrlKey)
			{
				e.preventDefault();
				if(field == 'planned-time')
				{
					this.setPlannedTimeNewItem(item, event);
					return;
				}
				if(field == 'prepare-tag' && this.newTag)
				{
					this.prepareTag(item);
					return;
				}
	        	if(field == 'delete-tag')
	        	{
	        		let tagName = e.srcElement.value;
					this.deletePreparedTag(item.id, tagName);
	        	}
			  	if(!this.newItem.body){ return; }
			  	this.addNew();
			  	return;
			}
			else if (e.keyCode === 13 && (e.metaKey || e.ctrlKey))
			{
			// Command ENTER
	        	e.preventDefault();
			  	if(!this.newItem.body){ return; }
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
				if(field == 'planned-time')
				{
					e.preventDefault();
					let plsFocus = '#new-under-'+this.item.id+' .newitem-body';
					document.querySelector(plsFocus).focus();
					return;
				}
				if(field == 'prepare-tag')
				{
					e.preventDefault();
					let plsFocus = '#new-under-'+this.item.id+' .update-planned-time>button';
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
					let plsFocus = '#new-under-'+this.item.id+' .update-planned-time>button';
					document.querySelector(plsFocus).focus();
					return;
				}
				if(field == 'planned-time')
				{
					e.preventDefault();
					let plsFocus = '#new-under-'+this.item.id+' .prepare-tag';
					document.querySelector(plsFocus).focus();
					return;
				}
				if(field == 'prepare-tag' && !this.newItem.body)
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
	    		this.$root.cancelThroughKeydown = true;
		    	setTimeout(function()
		    	{
		    		this.$root.cancelThroughKeydown = false;
		    	}.bind(this),100);
			}
	    },
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
	        	if(field == 'body')
	        	{
	        		e.preventDefault(); return;
		        }
			}
			// TAB
			if (e.keyCode === 9 && !e.shiftKey)
			{
	        	if(field == 'addTag')
	        	{
	        		// e.preventDefault(); return;
	        		// commented out because we want to be able to focus tag-delete buttons.
		        }
			}
			// Delete / backspace
			if (e.keyCode === 8 || e.keyCode === 46)
			{
	        	if(field == 'delete-tag')
	        	{
	        		let tagName = e.srcElement.value;
					this.deleteTag(item.id, tagName);
	        	}
			}
			// ENTER
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey)
			{
				e.preventDefault();
	        	if(field == 'delete-tag')
	        	{
	        		let tagName = e.srcElement.value;
					this.deleteTag(item.id, tagName);
					return;
	        	}
				if(field == 'planned-time')
				{
					this.setPlannedTime(item, event);
					return;
				}
				if(field == 'addTag' && this.newTag)
				{
					this.addTag(item);
					return;
				}
				this.doneEdit();
				return;
			}
			// ArrowUp
			if (e.keyCode === 38)
			{
				if (field == 'body')
				{
		        	return;
				}
				if(field == 'planned-time')
				{
					e.preventDefault();
					let plsFocus = '#updatebox-'+item.id+' .edititem-body';
					document.querySelector(plsFocus).focus();
					return;
				}
				if(field == 'addTag')
				{
					e.preventDefault();
		        	if(vm.editingItemTags){ vm.editingItemTags = null; return; }
					let plsFocus = '#updatebox-'+item.id+' .update-planned-time>button';
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
				if(field == 'planned-time')
				{
					let plsFocus = '#add-tag-'+item.id+' .add-tag';
					document.querySelector(plsFocus).focus();
					return;
				}
				if(field == 'addTag')
				{
		        	if(vm.editingItemTags){ vm.editingItemTags = null; }
		        	return;
				}
			}
			// ESC
			if (e.keyCode === 27)
			{
				this.cancelEdit(item);
	    		this.$root.cancelThroughKeydown = true;
		    	setTimeout(function()
		    	{
		    		this.$root.cancelThroughKeydown = false;
		    	}.bind(this),100);
			}
	    },
	    blurOnEdit(item)
	    {
	    	if(this.$root.cancelThroughKeydown){ return; }
	    	let self = this;
	    	setTimeout(function()
	    	{
		    	if ( document.activeElement.nodeName == 'INPUT'
		    		||  document.activeElement.nodeName == 'TEXTAREA'
		    		||  document.activeElement.nodeName == 'A'
		    		||  document.activeElement.nodeName == 'BUTTON' )
		    	{
	        		return;
				}　else {
			    	console.log('blurring on edit');
					self.doneEdit(item);
				}
	    	},50);
	    	// Codementor: is there any better way than this?
	    },
	    blurOnAddNew(item)
	    {
	    	if(this.$root.cancelThroughKeydown){ return; }
	    	let self = this;
	    	setTimeout(function()
	    	{
		    	if ( document.activeElement.nodeName == 'INPUT'
		    		||  document.activeElement.nodeName == 'TEXTAREA'
		    		||  document.activeElement.nodeName == 'A'
		    		||  document.activeElement.nodeName == 'BUTTON' )
		    	{
	        		return;
				}　else {
					self.cancelAddNew();
				}
	    	},50);
	    },
		updateDone(id)
		{
			allItems.prepareDonePatch(id);
		},
		updateShowChildren(id)
		{
			this.$root.patch(id,'show_children');
		},
		startEdit(item, event)
		{
			if (event &&
				(event.srcElement.hasClass('done')
				|| event.srcElement.hasClass('custom-tag')))
			{
				return;
			}
			console.log('startEdit');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			this.$root.beforeEditCache_body = item.body;
			this.$root.beforeEditCache_planned_time = item.planned_time;
			this.$root.editingItem = item.id;
			// Vue.nextTick(function ()
			// {
			// 	let plsFocus = '#updatebox-'+item.id+' > .update-body > textarea';
			// 	// document.querySelector(plsFocus).focus();
			// });
		},
		doneEdit(item)
		{
			console.log('Done edit!');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			// if (!this.$root.editingItem)
			// {
			// 	return;
			// }
			this.$root.editingItem = null;
			if(this.$root.editingItemTags)
			{
				this.$root.editingItemTags = null;
				return;
			}
			if (!item.body)
			{
				item.body = this.$root.beforeEditCache_body;
			}
			// item.body = item.body.trim();

			if (item.planned_time != this.$root.beforeEditCache_planned_time)
			{
				vm.patch(item.id, 'planned_time');
			}
			if (item.body != this.$root.beforeEditCache_body)
			{
				vm.patch(item.id, 'body');
				allItems.copyParentBodyToAllChildren(item.id);
			}
			this.$root.beforeEditCache_body = null;
			this.$root.beforeEditCache_planned_time = null;
		},
		cancelEdit(item)
		{
			item = (item) ? item : allItems.nodes[selection.selectedId];
			if(this.$root.editingItem)
			{
				console.log("cancel edit. Reverting to:");
				console.log(this.$root.beforeEditCache_body);
				item.body = this.$root.beforeEditCache_body;
				item.planned_time = this.$root.beforeEditCache_planned_time;
			}
			this.$root.editingItem = null;
			this.$root.editingItemTags = null;
		},
		startEditDoneDate(item, event)
		{
			console.log('startEditDoneDate');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			this.$root.beforeEditCache_done_date = item.done_date;
			this.$root.editingDoneDateItem = item.id;
		},
		deleteItem(item)
		{
			let id = item.id;
			this.$root.deleteItem(id);
		},
		addNew(addNextItemAs)
		{
			let newItem;
			let index;
			let addTags;

			newItem = this.newItem;
			newItem.parent_id = (this.item.parent_id) ? this.item.parent_id : allItems.root.id;
			newItem.depth = this.item.depth;

			let OlderSiblingIndex = this.siblingIndex;
			index = (isNaN(OlderSiblingIndex)) ? 0 : OlderSiblingIndex+1;
			
			addTags = this.preparedPlusComputedTags;
			
			if (this.$root.addingNewAsChild || this.listIsEmpty)
			{
				newItem.depth = this.item.depth + 1;
        		newItem.parent_id = this.item.id;
        		index = 0;
				// Add tags
         		// let toBeParentTags = allItems.itemTagArray(this.item.id);
				// Array.prototype.push.apply(addTags, toBeParentTags);
				// ↑　solved wih this.preparedPlusComputedTags
			}
			if(selection.view == "journal")
			{
				newItem.done = 1;
				newItem.done_date = this.item.done_date;
			}
			if (this.newItem.preparedTags.includes('Today') || selection.filter.includes('today'))
			{
				newItem.due_date = moment().format();
				addTags = addTags.filter(function(val){
					return val != 'Today';
				});
			}
			console.log('sending newItem:');			
			console.log(newItem);
			console.log('sending tags:');			
			console.log(addTags);
			// Send to Root for Ajax call.
			this.$root.postNewItem(newItem, index, addNextItemAs, addTags);

			// Reset stuff
			this.newItem.body = '';
			this.newItem.due_date = '0000-00-00 00:00:00';
			this.newItem.planned_time = '';
			this.newItem.preparedTags = [];
		},
		cancelAddNew(lastSelectedId)
		{
			this.newItem.body = '';
			this.$root.addingNewUnder = null;
			selection.selectedId = selection.lastSelectedId;
			// Reset newItem to sibling stance.
			this.$root.addingNewAsChild = false;			
			$(':focus').blur();
		},
		addTag(item)
		{
			let id = (item) ? item.id : selection.selectedId;
			let tag = this.newTag;
			allItems.tagItem(id, tag);
			this.newTag = null;
		},
		prepareTag(item)
		{
			let id = (item) ? item.id : selection.selectedId;
			let tag = this.newTag;
			if(tag=='t' || tag=='T' || tag=='today' || tag=='Today')
			{
				tag = 'Today';
			}
			this.newItem.preparedTags.push(tag);
			this.newTag = null;
		},
		deleteTag(id, tagName, event)
		{
			let plsFocus = '#add-tag-'+id+' .add-tag';
			document.querySelector(plsFocus).focus();
			this.$root.patchTag(id, tagName, 'untag');
		},
		deletePreparedTag(tag, item)
		{
			let plsFocus = '#new-under-'+this.item.id+' .prepare-tag';
			document.querySelector(plsFocus).focus();
			let tagIndex = this.newItem.preparedTags.indexOf(tagIndex);
			this.newItem.preparedTags.splice(tagIndex, 1)
		},
		setPlannedTime(item, event)
		{
			item.planned_time = (event.srcElement.value) ? parseFloat(event.srcElement.value) : 0 ;
			let plsFocus = '#add-tag-'+item.id+' .add-tag';
			Vue.nextTick(function ()
			{
				console.log('returning to editting: '+plsFocus);
				document.querySelector(plsFocus).focus();
			});
		},
		setPlannedTimeNewItem(item, event)
		{
			this.newItem.planned_time = (event.srcElement.value) ? parseFloat(event.srcElement.value) : 0 ;
			let plsFocus = "#new-under-"+item.id+" .prepare-tag";
			Vue.nextTick(function ()
			{
				console.log('returning to : '+plsFocus);
				document.querySelector(plsFocus).focus();
	    	});
		},
	},
	directives: {
		focus: {
			inserted(el)
			{
				Vue.nextTick(function ()
				{
					el.focus();
				});
			}
		},
		autoheight: {
			inserted(el, binding)
			{
				Vue.nextTick(function ()
				{
					autosize(el);
				});
			}
		},
		autowidth: {
			inserted(el, binding)
			{
				Vue.nextTick(function ()
				{
					autosizeInput(el);
				});
			}
		},
	},
}
</script>