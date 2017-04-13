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
		class="title flex--wrap"
		v-if="journalDate && item.journalDate"
	>
		<!-- Codementor: Is this the correct way to format something like this? -->
		<span>{{ momentCalendar(journalDate) }}</span>
		<span class="journal-date-small" v-if="journalDate != momentCalendar(journalDate)">
			{{ journalDate }}
		</span>
		<button
			class="o-btn copy-contents-button btn btn-dipclick copy-contents-button-journal"
			:id="'journal-card-'+item.done_date+'-copy'"
			v-if="true || !basis.mobile"
		>
			{{ basis.text.card.copy }}
		</button>
		<div class="l-fullwidth used-time" v-if="totalUsedMin">
			{{ basis.text.menu.usedTime }}: <span class="pill-small">{{ sec_to_hourmin(totalUsedSec) }}</span>
		</div>
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
		v-if="item.depth != 0 && !(journalView && journalDate)"
		:id="'item-body-'+item.id"
		:class="{
			'item-card': true,
			'done': item.done,
			'show_children': item.show_children,
			'editing': (!basis.mobile && item.id == basis.editingItem),
		}"
	>
		<div
			class=""
			v-if="!journalView"
			:class="{'toggle-div':true, 'both':item.children_order.length>0&&(item.done == true || allChildrenDone)}"
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
			<input
				class="toggle"
				type="checkbox"
				v-if="item.children_order.length==0 || item.done == true || allChildrenDone"
				v-model="item.done"
				@change="updateDone(item.id)"
			>
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
				v-show="item.id != basis.editingItem || basis.mobile"
			>
				<div :class="{'u-lightgray':item.temp}"
				>{{ linkify(item.body) }}</div>
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
				<span>
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
				@click="clickOnEditCurtain(item, $event)"
			>
				<div class="update-body">
					<textarea
						v-focus
						v-autoheight
						class="edititem-body"
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
						{{ basis.text.card.duration }}
						<button
							:class="{ currentDuration: item.planned_time == 10, 'planned-time': true, 'o-btn':true }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="10"
						>10{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
						<button
							v-if="!basis.mobileSmall"
							:class="{ currentDuration: item.planned_time == 15, 'planned-time': true, 'o-btn':true }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="15"
						>15{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
						<button
							:class="{ currentDuration: item.planned_time == 30, 'planned-time': true, 'o-btn':true }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="30"
						>30{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
						<button
							:class="{ currentDuration: item.planned_time == 60, 'planned-time': true, 'o-btn':true }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="60"
						>1{{ (basis.mobileSmall) ? basis.text.global.h : basis.text.global.hour }}</button>
						<div><input
							class="planned-time" 
							type="number"
							v-show="true"
							v-model="item.planned_time"
							@blur="blurOnEdit(item)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
						/>{{ basis.text.global.min }}</div>
					</div>
					<div class="item-tags"
						v-if="basis.mobile && (item.id == basis.editingItem || item.id == basis.editingItemTags)"
					>
						<div
							class="add-tag-wrapper"
							:id="'add-tag-'+item.id"
						>
							<label>
								{{ basis.text.card.addTag }}
								<input
									type="text"
									class="add-tag"
									v-model="newTag"
									v-autowidth
									v-focus
									@blur="blurOnEdit(item, 'add-tag')"
									@keydown="keydownOnEdit(item, $event, 'add-tag')"
									placeholder="..."
								>
							</label>
						</div>
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
								class="delete-tag o-btn"
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
						<button v-if="basis.mobile" class="mobile-edit-save o-btn" @click="doneEdit(item)">
							{{ basis.text.global.save }}
						</button>
					</div>
				</div>
			</form>
<!-- / .UPDATEBOX -->

<!-- ITEM TAGS -->
			<div class="item-tags">
				<div
					class="add-tag-wrapper"
					:id="'add-tag-'+item.id"
					v-if="!basis.mobile && (item.id == basis.editingItem || item.id == basis.editingItemTags)"
				>
					<label>
						{{ basis.text.card.addTag }}
						<input
							type="text"
							class="add-tag"
							v-model="newTag"
							v-autowidth
							v-focus
							@keydown="keydownOnEdit(item, $event, 'add-tag')"
							@blur="blurOnEdit(item, 'add-tag')"
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
					{{ basis.text.tags.done }} {{ momentCalendar(item.done_date) }}
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
						class="delete-tag o-btn"
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

<!-- ITEM-NAV -->
			<div
				class="item-nav"
				v-if="
					basis.editingItem != item.id
					&& basis.editingItemTags != item.id
					&& basis.selection.selectedId == item.id"
			>
				<button
					class="o-btn copy-contents-button btn btn-dipclick"
					:id="'card-'+item.id+'-copy'"
					v-if="!basis.mobile && basis.selection.view != 'journal'"
				>
					{{ basis.text.card.copy }}
				</button>
				<button
					v-if="basis.mobile"
					class="o-btn edit"
					@click="startEdit(item)"
				>
					{{ basis.text.card.edit }}
				</button>
				<button
					v-if="basis.mobile && basis.selection.view != 'journal'"
					class="o-btn setToday"
					@click="setToday(item.id)"
				>
					{{ basis.text.card.setToday }}
				</button>
				<button
					v-if="!item.done"
					class="o-btn timer"
					@click="addTimer(item)"
				>
					<i class="zmdi zmdi-timer"></i>
				</button>
				<button
					v-if="item.done"
					class="o-btn more"
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
					class="o-btn delete" 
					v-if="true || item.children_order.length==0"
					@click="deleteItem(item)"
				>
					<i class="zmdi zmdi-delete"></i>
				</button>
			</div>
<!-- / .ITEM-NAV -->
		</div>
	</div>

<!-- CHILDREN -->
	<div class="children"
		v-if="item.children.length"
		v-show="item.show_children"
		:style="(addingNewAsFirstChild)?'order:3;':''"
	>
		<Card v-for="childCard in visibleChildren"
			:item="childCard"
			:key="childCard.id"
			:parentsChildrenOrder="childrenOrder"
			:parentTags="tagsArray"
		></Card>
	</div>
<!-- / CHILDREN -->

<!-- ADD NEW BOX -->
	<form 
		:class="{'addnewbox':true, 
			'child':addingNewAsChild,
			'first-child':addingNewAsFirstChild,}"
		:id="'new-under-'+ item.id "
		v-if=" showAddNewBox
			|| (listIsEmpty && !basis.mobile && basis.selection.view != 'journal')"
		@submit.prevent
		@click="clickOnAddNewCurtain($event)"
	>
		<div class="flex flex--wrap">
			<div class="c-language-picker l-w100" v-if="listIsEmpty && basis.mobile">
				<a href="#"
					class="c-language-picker__a" 
					@click="basis.setLanguage = 'ja'"
					v-if="basis.language != 'ja'"
				>日本語</a>
				<a href="#"
					class="c-language-picker__a" 
					@click="basis.setLanguage = 'en'"
					v-if="basis.language != 'en'"
				>English</a>
			</div>
			<textarea type="text"
				v-focus.mobile
				v-autoheight
				class="newitem-body"
				v-model="newItem.body"
				@blur="blurOnAddNew(item)"
				@keydown="keydownOnNew(item, $event, 'body')"
				placeholder="...　　"
				autocomplete="off"
				rows="1"
			></textarea>
		</div>
		<div class="update-tags">
			<div class="update-planned-time">
				{{ basis.text.card.duration }}
				<button
					:class="{ 'o-btn':true, currentDuration: newItem.planned_time == 10, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="10"
				>10{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
				<button
					v-if="!basis.mobileSmall"
					:class="{ 'o-btn':true, currentDuration: newItem.planned_time == 15, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="15"
				>15{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
				<button
					:class="{ 'o-btn':true, currentDuration: newItem.planned_time == 30, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"

					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="30"
				>30{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
				<button
					:class="{ 'o-btn':true, currentDuration: newItem.planned_time == 60, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="60"
				>1{{ (basis.mobileSmall) ? basis.text.global.h : basis.text.global.hour }}</button>
				<div><input
					class="planned-time"
					v-if="true"
					type="number"
					v-model="newItem.planned_time"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				/>{{ basis.text.global.min }}</div>
			</div>
			<div class="item-tags prepared-tags">
				<div class="add-prepared-tag-wrapper">
					<label>
						{{ basis.text.card.addTag }}
						<input type="text"
							class="prepare-tag"
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
					:class="(tag=='Today') ? 'duedate' : 'custom-tag'"
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
			<div class="buttonrow" v-if="basis.mobile">
				<button class="o-btn" @click="cancelAddNew" v-if="!listIsEmpty">{{ basis.text.global.cancel }}</button>
				<button class="o-btn" @click="addNew">{{ basis.text.card.addAndContinue }}</button>
				<button class="o-btn" @click="addNew('stop')">{{ basis.text.card.addAndClose }}</button>
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
import { linkify, momentCalendar, sec_to_hourminsec, sec_to_hourmin } from '../components/valueMorphers2.js';
import flatPickConfig from '../components/flatPickrOptions.js';
import autosize from 'autosize';
import autosizeInput from 'autosize-input';
import { uniq } from '../components/globalFunctions.js';
import Clipboard from 'clipboard';

export default {
	name: 'Card',
	template:'#items-card-template',
	mounted()
	{
		let copyElPath = "#card-"+this.item.id+"-copy";
		let self = this;
		new Clipboard(copyElPath, {
		    text: function(trigger) {
		    	console.log(trigger);
		    	let spaceVariable = parseFloat(self.item.depth);
		        let allChildren = self.allVisibleChildItems.reduce(function(all, val){
					let spacesVal = parseFloat(val.depth)-spaceVariable;
					let spaces = '　　'.repeat(spacesVal);
					return `${all}
${spaces}・${val.body}`;
				}, `${self.item.body}`);
		        return allChildren;
		    }
		}).on('success', function(e) {
		    // console.info('Action:', e.action);
		    // console.info('Text:', e.text);
		    // console.info('Trigger:', e.trigger);
		    e.clearSelection();
		});
		if (this.journalView && this.item.journalDate)
		{
			let copyElPath_Journal = "#journal-card-"+this.item.done_date+"-copy";
			new Clipboard(copyElPath_Journal, {
			    text: function(trigger) {
			    	console.log(trigger);
			    	console.log(self);
			    	let usedT = (self.totalUsedMin) ? `
${self.basis.text.menu.usedTime}: ${self.sec_to_hourmin(self.totalUsedSec)}` : '';
			    	let journalDateTxt = `${self.journalDate}
==========${usedT}` ;
			        let allChildren = self.allVisibleChildItems.reduce(function(all, val){
			        	let pb = (!all.includes(`【${val.parents_bodies}】`)) ? `
【${val.parents_bodies}】` :`` ;
return `${all}${pb}
・${val.body}`;
}, journalDateTxt);
			        return allChildren;
			    }
			}).on('success', function(e) {
			    // console.info('Action:', e.action);
			    // console.info('Text:', e.text);
			    // console.info('Trigger:', e.trigger);
			    e.clearSelection();
			});
		}
		// this.newItem.preparedTags = JSON.parse(JSON.stringify(this.parentTags));
		this.convertbodyURLtoHTML();
		if(this.listIsEmpty){ this.$root.addingNewEmptyList = true; }
	},
	props: ['item','parentsChildrenOrder', 'parentTags'],
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
		visibleChildren()
		{ if(!this.item || !this.item.children.length || !allItems){ return []; }
			if(typeof parseFloat(this.item.id) != 'number' || this.item.id == 'x')
			{
				// return [];
			}
			// console.log(this.item);
			return this.item.children.filter(child => !this.$root.hiddenItemIds.includes(child.id));
		},
		allVisibleChildItems()
		{ if(!this.item || !this.item.children.length || !allItems){ return []; }
			let flattenedTree = allItems.flattenTree(this.item.children);
			let visibleChildren = flattenedTree.filter(item => !this.$root.hiddenItemIds.includes(item.id));
			return visibleChildren;
		},
		preparedPlusComputedTags()
		{ if(!this.item || !allItems){ return []; }
			if(this.item.id == allItems.root.id){ return []; }
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
			if (allItems.isTopLvlItemInFilteredRoot(this.item.id))
			{
				if(allItems.nodes[this.item.parent_id])
				{
					let tagzies = allItems.returnTagsAsArray(this.item.parent_id);
					alltags = alltags.concat(tagzies);
				}
			}
			alltags = uniq(alltags);
			return alltags.sort();
		},
		listIsEmpty()
		{
			if(!this.item || !allItems){ return false; }
			if(this.item.id != allItems.root.id){ return false; }
			if(!this.visibleChildren.length){ return true; }
		},
		basis()
		{ if(!this.item || !allItems){ return 0; }
			return this.$root;
		},
		totalPlannedMin()
		{ if(!this.item || !allItems){ return 0; }
			let selfValue = (this.item.planned_time) ? parseFloat(this.item.planned_time) : 0;
			let childrenArray = this.allVisibleChildItems;
			if (!childrenArray || !childrenArray.length) { return selfValue; }
			let x = childrenArray.reduce(function(prevVal, child){
				return prevVal + parseFloat(child.planned_time);
			}, selfValue);
		    return (x) ? parseFloat(x) : 0;
		},
		totalUsedSec()
		{ if(!this.item || !allItems){ return 0; }
			let selfValue = (this.item.used_time) ? parseFloat(this.item.used_time) : 0;
			let childrenArray = this.allVisibleChildItems;
			if (!childrenArray || !childrenArray.length) { return selfValue; }
			let x = childrenArray.reduce(function(prevVal, child){
				return prevVal + parseFloat(child.used_time);
			}, selfValue);
		    return (x) ? x : 0;
		},
		journalView()
		{ if(!this.item || !allItems){ return; }
			if(this.$root.selection.view == 'journal'){
				return true;
			} else { return false; }
		},
		visiblePrevItemId()
		{ if(!this.item || !allItems){ return; }
			let index = this.parentsChildrenOrder.indexOf(this.item.id);
			if (index == 0){ return allItems.root.id; }
			return this.parentsChildrenOrder[index-1];
		},
		journalDate()
		{ if(!this.item || !allItems){ return; }
			// console.log('run on '+this.item.id+' - '+this.item.body);
			if ( this.$root.selection.view != 'journal'
			  || !this.journalView
			  || !this.item.journalDate )
			{
				return false;
			}
			return moment(this.item.done_date,'YYYYMMDD').format('YYYY/MM/DD');
			// JOURNAL REWRITE. original:
			// if(this.item.depth == 0){ return; }
			// let prevId = this.visiblePrevItemId;
			// let prevDoneDate = allItems.nodes[prevId].done_date;
			// prevDoneDate = moment(prevDoneDate).format('YYYY/MM/DD');
			// let thisDoneDate = moment(this.item.done_date).format('YYYY/MM/DD');
			// if (thisDoneDate != prevDoneDate){
			// 	return thisDoneDate;
			// }

		},
		journalParentString()
		{ if(!this.item || !allItems){ return; }
			// console.log('run on '+this.item.id+' - '+this.item.body);
			if(this.$root.selection.view != 'journal'){ return false; }
			if(this.journalView){
				if(this.item.depth == 0){ return; }
				let prevId = this.visiblePrevItemId;
				let parentString = this.item.parents_bodies;
				let prevParentString = allItems.nodes[prevId].parents_bodies;

				let prevDoneDate = allItems.nodes[prevId].done_date;
				// console.log('moment dates');
				// console.log(prevDoneDate);
				// console.log(this.item.done_date);
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
			return Math.floor(this.totalUsedSec/60);
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
		childrenOrder()
		{ if(!this.item || !allItems){ return 0; }
			if (this.$root.selection.view == 'journal' && this.item.id == allItems.root.id)
			{
				return this.item.children.reduce((a, c) => a.concat(c.children), []).map(child => child.id);
			}
			return this.visibleChildren.map(child => child.id);
		},
		// deepestChild()
		// { if(!this.item || !allItems){ return; }
		// 	let dc;
		// 	if (!this.childrenOrder.length)
		// 	{
		// 		return this.item.id;
		// 	} else {
		// 		let i = this.visibleChildren.length;
		// 		return this.visibleChildren[i-1].deepestChild;
		// 	}
		// },
		childrensDeepestChildren()
		{ if(!this.item || !allItems){ return; }
			return this.visibleChildren.map(function(item){
				return {
					'id':item.id,
					'deepestChild':this.$root.findDeepestVisibleChild(item.id)
				};
			}.bind(this));
		},
		showAddNewBox()
		{ if(!this.item || !allItems){ return; }
			if(!this.$root.addingNewUnder){ return false; }
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
		tagsArray()
		{ if(!this.item || !allItems){ return true; }
			return this.item.tagged.map(obj => obj.tag_name);
		},
		isHidden()
		{ if(!this.item || !allItems){ return true; }
			return this.$root.hiddenItemIds.includes(this.item.id)
		},
		allChildrenDone()
		{ if(!this.item || !allItems){ return true; }
			return allItems.allChildrenDone(this.item.id);
		},
		thebody(){ return this.item.body },
	},
	methods: {
		linkify,
		momentCalendar,
		sec_to_hourminsec,
		sec_to_hourmin,
		convertbodyURLtoHTML()
		{
			// console.log('converting');
			if(!this.item || this.item.depth == 0){ return; }
			let bodyboxQS = '#'+this.$el.id+' .bodybox';
			let a = document.querySelector(bodyboxQS);
			if(!a || !a.innerHTML.includes('a href')){ return; }
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
		clickOnAddNewCurtain(event)
		{
			if(!vm.mobile){ return; }
			if(event && event.srcElement.nodeName != 'FORM'){ return; }
			this.$root.cancelAddNew();
		},
		clickOnEditCurtain(item, event)
		{
			if(!vm.mobile){ return; }
			if(event && event.srcElement.nodeName != 'FORM'){ return; }
			this.doneEdit(item);
		},
		newItemIndent()
		{
			if(!this.item.children.length || !this.item.show_children)
			{ // If item has no children yet / no visible children
				this.$root.addingNewAsChild = true;
				return;
			}
			let lastChildId = allItems.getLastChildId(this.item.id);
    		vm.showAddNewItem(lastChildId);
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
			vm.showAddNewItem(this.item.parent_id);
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
			  	if(vm.mobile && field == 'body'){ return; }
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
	        	if(field == 'add-tag')
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
				if(vm.mobile && field == 'body'){ return; }
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
				if(field == 'add-tag' && this.newTag)
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
				if(field == 'add-tag')
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
				if(field == 'add-tag')
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
	    blurOnEdit(item, field)
	    {
	    	console.log('Blur on Edit');
	    	if(this.$root.cancelThroughKeydown){ return; }
	    	if (this.$root.mobile && field == 'add-tag')
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
				}　else {
    				if(vm.mobile){ return; }
			    	console.log('blurring on edit');
					self.doneEdit(item);
				}
	    	},50);
	    	// Codementor: is there any better way than this?
	    },
	    blurOnAddNew(item, field)
	    {
	    	if(this.$root.cancelThroughKeydown){ return; }
	    	console.log('Blur on Add New');
	    	if (this.$root.mobile && field == 'prepare-tag')
	    	{
				this.prepareTag(item);
				return;
	    	}
	    	if(vm.mobile){ return; }
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
			    	// if(vm.mobile){ self.addNew('stop'); return; }
			    	if(vm.mobile){ return; }
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
		cancelEdit(item)
		{
			this.$root.cancelEdit(item);
		},
		startEdit(item, event)
		{
			this.$root.startEdit(item, event);
		},
		doneEdit(item)
		{
			this.$root.doneEdit(item);
		},
		startEditDoneDate(item, event)
		{
			console.log('startEditDoneDate');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			this.$root.beforeEditCache_done_date = item.done_date;
			this.$root.editingDoneDateItem = item.id;
		},
		setToday(id)
		{
			this.$root.setToday(id);
		},
		deleteItem(item)
		{
			let id = item.id;
			this.$root.deleteItem(id);
		},
		addNew(addNextItemAs)
		{
			let addTags = this.preparedPlusComputedTags;
			let olderSibling = this.item;
			let newItem = this.newItem;
			// debugger;
			this.$root.addNew(addNextItemAs, newItem, olderSibling, addTags)
			// Reset stuff
			this.newItem.body = '';
			this.newItem.due_date = '0000-00-00 00:00:00';
			this.newItem.done_date = '0000-00-00 00:00:00';
			this.newItem.done = false;
			this.newItem.planned_time = '';
			this.newItem.preparedTags = [];
		},
		cancelAddNew()
		{
			this.newItem.body = '';
			let cancelUnderId = this.item.id;
			this.$root.cancelAddNew(cancelUnderId);
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
}
</script>