<template id="items-card-template">

<div
	v-if="item"
	:id="'card-'+item.id"
	:class="{
		'items-card': true,
		'journal-wrapper': journalView
	}"
>

<div v-if="!isHidden">
	<div class="title"
	v-if="journalDate"
	>
		<!-- <span>{{ journalDate | momentCalendar }}</span> -->
		<span>{{ momentCalendar(journalDate) }}</span>
		<span class="journal-date-small">{{ journalDate }}</span>
	</div>
	<div class="parent-string"
	v-if="journalView && item.depth != 0"
	@click="selectItem(item)"
	>{{ item.parents_bodies }}:</div>
	<div 
		v-if="item.depth != 0"
		:class="{
			'item-card': true,
			done: item.done,
			show_children: item.show_children,
			editing: item.id == basis.editingItem,
		}"
	>
		<div class="toggle-div"
			v-if="!journalView"
		>
			<input class="toggle"
				type="checkbox"
				v-if="item.children_order.length==0 || item.done == true"
				v-model="item.done"
				@change="updateDone(item.id)"
			>
			<input type="checkbox"
				class="styled-check"
				:id="'show_children_'+item.id"
				v-model="item.show_children"
				@change="updateShowChildren(item.id)"
			>
			<label class="arrow"
				:for="'show_children_'+item.id"
				v-if="item.children_order.length>0"
			></label>

			<!-- <input class="show_children_toggle"
				:id="'show_children_' + item.id"
				type="checkbox"
				v-if="item.children_order.length>0"
				v-model="item.show_children"
				@change="updateShowChildren(item.id)"
			>
			<label class="show_children_svg" 
				:for="'show_children_' + item.id">
				//// This label is not yet used!
			</label> -->
		</div>
		<div class=""
			v-if="journalView"
		>・</div>
		<div class="body-div textarea-wrap"
			:class="{ selected: item.id == this.$root.selection.selectedId,
				project: isProject,
				'updating-tags': item.id == basis.editingItemTags}"
			@dblclick="startEdit(item, $event)"
			@click="selectItem(item)"
			@enter="console.log('yarrr')"
		>
			<div class="bodybox"
				v-show="item.id != basis.editingItem"
			>
				<!-- <div>{{ item.body | linkify }}</div> -->
				<div>{{ linkify(item.body) }}</div>
				<div class="completion-notes bodybox"
					v-if="item.completion_memo"
					@click="selectItem(item)"
				>{{ item.completion_memo }}</div>
			</div>
			<!-- <div class="hidden-sizer">{{item.body + "|"}}</div> -->
			
			<!-- For debugging: -->
			<span v-if="false"> ({{item.id}}) D-{{item.depth}}) [{{item.children_order}}]</span>
			
			<form action="update"
				class="updatebox"
				:id="'updatebox-'+item.id"
				v-show="item.id == basis.editingItem || item.id == basis.editingItemTags"
				@submit.prevent="doneEdit(item)"
			>
				<div class="update-body" v-show="item.id != basis.editingItemTags">
					<textarea
						v-focus
						class="edititem-body"
						:rows="item.rows"
						v-model="item.body"
						@blur="blurOnEdit(item)"
						@keydown="keydownOnEdit(item, $event, 'body')"
					></textarea>
				</div>
				<div class="update-tags">
					<div class="update-planned-time" v-show="item.id != basis.editingItemTags">
						Duration:
						<button
							:class="{ currentDuration: item.planned_time == 10, 'planned-time': true }"
							@click.prevent="setPlannedTime(item, 10, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
						>10 min</button>
						<button
							:class="{ currentDuration: item.planned_time == 15, 'planned-time': true }"
							@click.prevent="setPlannedTime(item, 15, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
						>15 min</button>
						<button
							:class="{ currentDuration: item.planned_time == 30, 'planned-time': true }"
							@click.prevent="setPlannedTime(item, 30, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
						>30 min</button>
						<button
							:class="{ currentDuration: item.planned_time == 60, 'planned-time': true }"
							@click.prevent="setPlannedTime(item, 60, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
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
					<div class="update-custom-tags">
						<label>
							Add Tag: 
							<input type="text"
								class="add-tag"
								@blur="blurOnEdit(item)"
								v-model="newTag"
								@keydown="keydownOnEdit(item, $event, 'addTag')"
							>
						</label>
						<div class="tag-suggestions" v-if="false">
						<!-- UNDER CONSTRUCTION -->
							<label v-for="tag in allTags_c"
								:class="'tag'"
								@click="this.$root.patchTag(item.id, tag)"
							>{{ tag.name }}
							</label>
						</div>
					</div>
				</div>
			</form>
			<div class="item-tags">
				<label class="done"
					v-if="item.done && item.id != basis.editingDoneDateItem && !journalView"
				>
				<!-- Done {{ item.done_date | momentCalendar }} -->
				Done {{ momentCalendar(item.done_date) }}
					<input class="flatpickr"
						:id="'done-date-edit-' + item.id"
						v-model="item.done_date"
					>
				</label>
				<!-- <span class="total-duration">ttuc {{ totalUsedSec | sec-to-hourminsec }}</span> -->
				<span v-if="
					totalSecLeft > 0
					&& totalSecLeft > secLeft
					&& totalTimeDifferentFromParent
					&& !item.done" class="total-duration">
					<!-- {{ totalSecLeft | sec-to-hourminsec }} -->
					{{ sec_to_hourminsec(totalSecLeft) }}
					</span>

				<span v-if="
					item.id != basis.editingItem
					&& secLeft > 0
					
					&& !item.done" class="duration"
				>
					<!-- {{ secLeft | sec-to-hourminsec }} -->
					{{ sec_to_hourminsec(secLeft) }}
				</span>
				
				<span v-if="hasDueDate && !item.done"
					class="duedate"
				>
				<!-- {{ item.due_date | momentCalendar }}</span> -->
				{{ momentCalendar(item.due_date) }}</span>

				<span v-if="item.dueDateParent && !item.done"
					class="duedate-parent"
				>
				<!-- {{ item.dueDateParent | momentCalendar }}</span> -->
				{{ momentCalendar(item.dueDateParent) }}</span>

				<span v-for="tag in item.tagged"
					v-if="item.tagged.length"
					v-show="!parentTags.includes(tag.tag_name)
						|| item.id == basis.editingItem"
					class="custom-tag"
					@dblclick.prevent="this.$root.filterItems('tag', tag.tag_slug, $event)"
				>{{ tag.tag_name }}
					<button class="delete-tag"
						v-if="item.id == basis.editingItem
						&& !parentTags.includes(tag.tag_name)"
						@click.prevent="deleteTag(item.id, tag.tag_name, $event)"
					>
						<i class="zmdi zmdi-close-circle"></i>
					</button>
				</span>

			</div>
			<div class="item-nav"
				v-if="basis.editingItem != item.id && this.$root.selection.selectedId == item.id"
			>
				
				<button v-if="!item.done"
					class="timer"
					@click="addTimer(item)"
				><i class="zmdi zmdi-timer"></i>
				</button>
				<button v-if="item.done"
					class="more"
					@click="this.$root.popup(item.id, 'afterDone')"
				><i class="zmdi zmdi-more"></i>
				</button>
				<!--
				- font icon / woff format [font awesome]
				  material design iconic fonts
				- add svg as background to button
				- or image tag inside button
				- svg tag -> add as pattern
				-->
				<button class="delete" 
					v-if="item.children_order.length==0"
					@click="deleteItem(item)"
				><i class="zmdi zmdi-delete"></i>
				</button>
			</div>
			
		</div>
	</div>

	<form 
		:class="['addnewbox-firstchild', 'addnewbox', 'child']"
		:id="'new-firstchild-of-'+item.id"
		v-if="showAddNewBoxFirstChild"
		@submit.prevent
	>
		<div>
			<textarea type="text"
				v-focus
				class="newitem-body"
				v-model="newItem.body"
				@blur="blurOnAddNew(item)"
				@keydown="keydownOnNew(item, $event, 'body')"
				placeholder="..."
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
					@click.prevent="setPlannedTimeNewItem(item, 10, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				>10 min</button>
				<button
					:class="{ currentDuration: newItem.planned_time == 15, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, 15, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				>15 min</button>
				<button
					:class="{ currentDuration: newItem.planned_time == 30, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, 30, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				>30 min</button>
				<button
					:class="{ currentDuration: newItem.planned_time == 60, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, 60, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				>1 hour</button>
				<div><input
					class="planned-time" 
					type="number"
					v-show="true"
					v-model="newItem.planned_time"
					@blur="blurOnAddNew(item)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
				/>min</div>
			</div>
			<div class="update-custom-tags">
				<label>
					Add Tag: 
					<input type="text"
						class="prepare-tag"
						@keydown="keydownOnNew(item, $event, 'addTag')"
						@blur="blurOnAddNew(item)"
						v-model="newTag"
					>
				</label>
			</div>
			<div class="item-tags prepared-tags">
				<span v-if="newItem.preparedTags.length"
					v-for="tag in newItem.preparedTags"
					:class="(tag=='Today') ? 'duedate' : 'custom-tag'"
				>{{ tag }}
					<button class="delete-tag"
						v-if="!parentTags.includes(tag)"
						@click.prevent="deletePreparedTag(tag, item)"
					>
						<i class="zmdi zmdi-close-circle"></i>
					</button>
				</span>
			</div>
		</div>
	</form>


	<div class="children"
		v-if="item.children"
		v-show="item.show_children"
	>
		<Card v-for="childCard in item.children"
			:item="childCard"
			:key="childCard.id"
		></Card>
	</div>

	<form 
		:class="['addnewbox']"
		:id="'new-under-'+ item.id "
		v-if="showAddNewBox"
		@submit.prevent
	>
		<div>
			<textarea type="text"
				v-focus
				class="newitem-body"
				v-model="newItem.body"
				@blur="blurOnAddNew(item)"
				@keydown="keydownOnNew(item, $event, 'body')"
				placeholder="..."
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
					@click.prevent="setPlannedTimeNewItem(item, 10, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				>10 min</button>
				<button
					:class="{ currentDuration: newItem.planned_time == 15, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, 15, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				>15 min</button>
				<button
					:class="{ currentDuration: newItem.planned_time == 30, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, 30, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				>30 min</button>
				<button
					:class="{ currentDuration: newItem.planned_time == 60, 'planned-time': true }"
					@click.prevent="setPlannedTimeNewItem(item, 60, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
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
			<div class="update-custom-tags">
				<label>
					Add Tag: 
					<input type="text"
						class="prepare-tag"
						@keydown="keydownOnNew(item, $event, 'addTag')"
						@blur="blurOnAddNew(item)"
						v-model="newTag"
					>
				</label>
			</div>
			<div class="item-tags prepared-tags">
				<span v-if="newItem.preparedTags.length"
					v-for="tag in newItem.preparedTags"
					:class="(tag=='Today') ? 'duedate' : 'custom-tag'"
				>{{ tag }}
					<button class="delete-tag"
						v-if="!parentTags.includes(tag)"
						@click.prevent="deletePreparedTag(tag, item)"
					>
						<i class="zmdi zmdi-close-circle"></i>
					</button>
				</span>
			</div>
		</div>
	</form>
	<!-- <Flatpickr /> -->
</div>
</div>
</template>
<script>
// import Morph from '../components/valueMorphers.js'
// window.Morph = new Morph();
import { linkify, momentCalendar, sec_to_hourminsec } from '../components/valueMorphers2.js';

export default {
	name: 'Card',
	template:'#items-card-template',
	mounted(){
		this.newItem.preparedTags = this.parentTags;
		this.convertbodyURLtoHTML();
    	eventHub.$on('startEdit', this.startEdit);
    	eventHub.$on('escapeOnEditButtonFocus', this.cancelEdit);
    	eventHub.$on('escapeOnNewButtonFocus', this.cancelAddNew);
	},
	props: ['item'],
	data(){
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
		basis(){
			return this.$root;
		},
		totalPlannedMin(){ if(!this.item || !allItems){ return 0; }
			// console.log('trying at totalPlannedMin');
			if(!this.item.children.length){ return (this.item.planned_time) ? this.item.planned_time : 0 ; }
			let childrenArray = allItems.flattenTree(this.item.children);
			let x = childrenArray.reduce((prevVal, child) => prevVal + child.planned_time, this.item.planned_time);
		    return (x) ? x : 0;
		},
		totalUsedSec(){ if(!this.item || !allItems){ return 0; }
			// console.log('trying at totalUsedSec');
			if(!this.item.children.length){ return (this.item.used_time) ? this.item.used_time : 0 ; }
			let childrenArray = allItems.flattenTree(this.item.children);
			let x = childrenArray.reduce((prevVal, child) => prevVal + child.used_time, this.item.used_time);
		    return (x) ? x : 0;
		},
		journalView(){ if(!this.item || !allItems){ return; }
			if(this.$root.selection.view == 'journal'){
				return true;
			} else { return false; }
		},
		journalDate(){ if(!this.item || !allItems){ return; }
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
		totalUsedMin(){ if(!this.item || !allItems){ return 0; }
			return this.totalUsedSec/60;
		},
		totalPlannedSec(){ if(!this.item || !allItems){ return 0; }
			return this.totalPlannedMin*60;
		},
		totalPlannedHour(){ if(!this.item || !allItems){ return 0; }
			return this.totalPlannedMin/60;
		},
		isProject(){ if(!this.item || !allItems){ return; }
			// console.log('checking isProject');
			return allItems.isProject(this.item.id);	
		},
		siblingIndex(){ if(!this.item || !allItems){ return; }
			return allItems.siblingIndex(this.item.id);
		},
		olderSiblingId(){ if(!this.item || !allItems){ return; }
			return allItems.olderSiblingId(this.item.id); 
		},
		parentsChildren_order(){ if(!this.item || !allItems){ return; }
			let pId = this.item.parent_id;
			if(this.item.depth == 0){ return allItems.nodes[this.item.id].children_order; }
			return allItems.nodes[pId].children_order;
		},
		showAddNewBox(){ if(!this.item || !allItems){ return; }
			if((this.$root.addingNewUnder == this.item.id && !this.$root.addingNewAsFirstChild) || (this.item.depth == 0 && allItems.root.children_order.length == 0)){
				return true;
			} else { return false; }
		},
		showAddNewBoxFirstChild(){ if(!this.item || !allItems){ return; }
			if(this.$root.addingNewUnder == this.item.id && this.$root.addingNewAsFirstChild){
				return true;
			} else { return false; }
		},
		hasDueDate(){ if(!this.item || !allItems){ return; }
		    return (this.item.due_date && this.item.due_date != '0000-00-00 00:00:00');
		},
		hasDoneDate(){ if(!this.item || !allItems){ return; }
		    return (this.item.done_date && this.item.done_date != '0000-00-00 00:00:00');
		},
		hastotalUsedSec(){ if(!this.item || !allItems){ return; }
		    return (this.item.children_order.length
		    	&& this.item.totalUsedSec
		    	&& this.item.totalUsedSec != '0'
		    	&& this.item.used_time != this.item.totalUsedSec);
		},
		hasTotalPlannedMin(){ if(!this.item || !allItems){ return; }
		    return (this.item.children_order.length
		    	&& this.totalPlannedMin
		    	&& this.totalPlannedMin != '0'
		    	&& this.item.planned_time != this.totalPlannedMin);
		},
		hasPlannedTime(){ if(!this.item || !allItems){ return; }
		    return (this.item.planned_time && this.item.planned_time != '0');
		},
		hasUsedTime(){ if(!this.item || !allItems){ return; }
		    return (this.item.used_time && this.item.used_time != '0');
		},
		allTags_c(){ if(!this.item || !allItems){ return; }
			return this.$root.allTags;
		},
		totalMinLeft(){ if(!this.item || !allItems){ return 0; }
			return this.totalPlannedMin-this.totalUsedMin;
		},
		totalSecLeft(){ if(!this.item || !allItems){ return 0; }
			return this.totalPlannedSec-this.totalUsedSec;
		},
		secLeft(){ if(!this.item || !allItems){ return 0; }
			return this.item.planned_time*60-this.item.used_time;
		},
		minLeft(){ if(!this.item || !allItems){ return 0; }
			return this.secLeft/60;
		},
		totalTimeDifferentFromParent(){ if(!this.item || !allItems){ return 0; }
			if(!this.item.parent_id){ return true; }
			return this.totalPlannedSec != this.$parent.totalPlannedSec;
		},
		parentTags(){ if(!this.item || !allItems || !this.item.parent_id){ return []; }
			return allItems.returnTagsAsArray(this.item.parent_id);
		},
		isHidden(){ if(!this.item || !allItems){ return true; }
			return this.$root.selection.hiddenItems.includes(this.item.id)
		},
	},
	methods: {
		linkify,
		momentCalendar,
		sec_to_hourminsec,
		convertbodyURLtoHTML(){
			if(!this.item){ return; }
			let bodyboxQS = "#card-"+this.item.id+" > div > .item-card > .body-div > .bodybox > div";
			let a = document.querySelector(bodyboxQS);
			if(!a){ return; }
			a.innerHTML = a.innerHTML.replace("&lt;a href=", "<a href=").replace('target="_blank"&gt;','target="_blank">').replace("&lt;/a&gt;","</a>");
		},
		addTimer(item){
			//Codementor
			this.$root.addTimer(item.id);
		},
		selectItem(item){
			selection.selectedId = item.id;
		},
		newItemIndent(){
			let lastChild = allItems.getLastChildId(this.item.id);
        	if (lastChild){
        	// If item already has children
        		console.log("Adding instead under: ["+allItems.nodes[lastChild].body+']');
        		vm.$root.showAddNewItem(lastChild);
        	} else {
        	// If item has no children yet
				this.$root.addingNewAsChild = true;
        		document.querySelector("#new-under-"+this.item.id+" textarea").focus();
        	}
		},
		newItemUnindent(){
			if(this.$root.addingNewAsChild){
				this.$root.addingNewAsChild = false;
				return;
			}
			vm.$root.showAddNewItem(this.item.parent_id);
		},
		keydownOnNew(item, e, field) {
			console.log('keydown on new: '+e.keyCode);
			console.log(e);

			// SHIFT-TAB
			if (e.keyCode === 9 && e.shiftKey) {
	        	if(field == 'body'){
	        		e.preventDefault();
		        	this.newItemUnindent();
		        	return;
		        }
			}
			// TAB
			if (e.keyCode === 9 && !e.shiftKey) {
	        	if(field == 'addTag'){
	        		e.preventDefault();
		        	this.newItemIndent();
		        	return;
		        }
			}
			// ENTER
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey && !e.metaKey && !e.ctrlKey) {
				if(field == 'planned-time'){
					if(e.srcElement.nodeName == 'INPUT'){
						e.preventDefault();
						let plsFocus = '.addnewbox .prepare-tag';
						document.querySelector(plsFocus).focus();
						if(!this.item.planned_time){
							this.item.planned_time = 0;
						}
					}
					return;
				}
				e.preventDefault();
				if(field == 'addTag' && this.newTag){
					this.prepareTag(item);
					return;
				}
			  	if(!this.newItem.body){ return; }
			  	this.addNew();
			  	return;
			} else if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
			// Command ENTER
	        	e.preventDefault();
			  	if(!this.newItem.body){ return; }
			  	let addNextItemAs = 'child';
			  	this.addNew(addNextItemAs);
			  	return;
			}
			// ArrowLeft
			if (e.keyCode === 37){
				// If in an EMPTY BODY
				if (field != 'body' || (field == 'body' && !this.newItem.body)) {
					e.preventDefault();
		        	this.newItemUnindent();
		        	return;
				}
			}
			// ArrowRight
			if (e.keyCode === 39){
				// If in an EMPTY BODY
				if (field != 'body' || (field == 'body' && !this.newItem.body)) {
					e.preventDefault();
		        	this.newItemIndent();
		        	return;
				}
			}
			// ArrowUp
			if (e.keyCode === 38) {
				// If body is empty!
				if (field == 'body' && !this.newItem.body) {
		        	e.preventDefault();
		        	this.cancelAddNew();
		        	return;
				}
				if(field == 'planned-time'){
					e.preventDefault();
					let plsFocus = '.addnewbox .newitem-body';
					document.querySelector(plsFocus).focus();
					return;
				}
				if(field == 'addTag'){
					e.preventDefault();
					let plsFocus = '.addnewbox .update-planned-time>button';
					document.querySelector(plsFocus).focus();
					return;
				}
			}
			// ArrowDown
			if (e.keyCode === 40) {
				// If body is empty!
				if (field == 'body' && !this.newItem.body) {
		        	e.preventDefault();
					let plsFocus = '.addnewbox .update-planned-time>button';
					document.querySelector(plsFocus).focus();
					return;		        	
				}
				if(field == 'planned-time'){
					e.preventDefault();
					let plsFocus = '.addnewbox .prepare-tag';
					document.querySelector(plsFocus).focus();
					return;
				}
				if(field == 'addTag' && !this.newItem.body){
					e.preventDefault();
		        	this.cancelAddNew();
		        	return;
				}
			}
			// ESC
			if (e.keyCode === 27){
			   	e.preventDefault();
	        	this.cancelAddNew();
	        	return;
			}
	    },
		keydownOnEdit(item, e, field) {
			// SHIFT-TAB
			if (e.keyCode === 9 && e.shiftKey) {
	        	if(field == 'body'){
	        		e.preventDefault(); return;
		        }
			}
			// TAB
			if (e.keyCode === 9 && !e.shiftKey) {
	        	if(field == 'addTag'){
	        		e.preventDefault(); return;
		        }
			}
			// ENTER
			if (e.keyCode === 13 && !e.shiftKey && !e.altKey) {
				if(field == 'planned-time'){
					if(e.srcElement.nodeName == 'INPUT'){
						e.preventDefault();
						let plsFocus = '#updatebox-'+item.id+' .add-tag';
						document.querySelector(plsFocus).focus();
						if(!this.item.planned_time){
							this.item.planned_time = 0;
						}		
					}
					return;
				}
	        	e.preventDefault();
				if(field == 'addTag' && this.newTag){
					this.addTag(item);
					return;
				}
				this.doneEdit();
				return;
			}
			// ArrowUp
			if (e.keyCode === 38) {
				if (field == 'body') {
		        	return;
				}
				if(field == 'planned-time'){
					e.preventDefault();
					let plsFocus = '#updatebox-'+item.id+' .edititem-body';
					document.querySelector(plsFocus).focus();
					return;
				}
				if(field == 'addTag'){
					e.preventDefault();
					let plsFocus = '#updatebox-'+item.id+' .update-planned-time>button';
					document.querySelector(plsFocus).focus();
					return;
				}
			}
			// ArrowDown
			if (e.keyCode === 40) {
				if (field == 'body') {
					return;		        	
				}
				if(field == 'planned-time'){
					e.preventDefault();
					let plsFocus = '#updatebox-'+item.id+' .add-tag';
					document.querySelector(plsFocus).focus();
					return;
				}
				if(field == 'addTag'){
					e.preventDefault();
		        	
		        	return;
				}
			}
			if (e.keyCode === 27) {
				this.cancelEdit(item);
			}
	    },
	    blurOnEdit(item) {
	    	let component = this;
	    	setTimeout(function(){
		    	if ( $('.updatebox input:focus').length > 0
		    		||  $('.updatebox textarea:focus').length > 0
		    		||  $('.updatebox a:focus').length > 0
		    		||  $('.updatebox button:focus').length > 0
		    	) {
	        		return;
				}　else {
			    	console.log('blurring on edit');
					component.doneEdit(item);
				}
	    	},50);
	    	// Codementor: is there any better way than this?
	    },
	    blurOnAddNew(item) {
	    	let component = this;
	    	setTimeout(function(){
		    	if ( $('.addnewbox input:focus').length > 0
		    		||  $('.addnewbox textarea:focus').length > 0
		    		||  $('.addnewbox a:focus').length > 0
		    		||  $('.addnewbox button:focus').length > 0
		    	) {
	        		return;
				}　else {
					component.cancelAddNew();
				}
	    	},50);
	    },
		updateDone(id){
			allItems.prepareDonePatch(id);
		},
		updateShowChildren(id){
			this.$root.patch(id,'show_children');
		},
		startEdit(item, event){
			if (event &&
				(event.srcElement.hasClass('done')
				|| event.srcElement.hasClass('custom-tag'))){
				return;
			}
			console.log('startEdit');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			this.$root.beforeEditCache_body = item.body;
			this.$root.beforeEditCache_planned_time = item.planned_time;
			this.$root.editingItem = item.id;
			Vue.nextTick(function () {
				let plsFocus = '#updatebox-'+item.id+' > .update-body > textarea';
				document.querySelector(plsFocus).focus();
			});
		},
		doneEdit(item) {
			item = (item) ? item : allItems.nodes[selection.selectedId];
			// if (!this.$root.editingItem) {
			// 	return;
			// }
			this.$root.editingItem = null;
			if(this.$root.editingItemTags){
				this.$root.editingItemTags = null;
				return;
			}
			if (!item.body) {
				item.body = this.$root.beforeEditCache_body;
			}
			item.body = item.body.trim();

			if (item.planned_time != this.$root.beforeEditCache_planned_time){
				vm.patch(item.id, 'planned_time');
			}
			if (item.body != this.$root.beforeEditCache_body){
				vm.patch(item.id, 'body');
				allItems.copyParentBodyToAllChildren(item.id);
			}
			this.$root.beforeEditCache_body = null;
			this.$root.beforeEditCache_planned_time = null;
		},
		cancelEdit(item) {
			item = (item) ? item : allItems.nodes[selection.selectedId];
			if(this.$root.editingItem){
				console.log("cancel edit. Reverting to:");
				console.log(this.$root.beforeEditCache_body);
				item.body = this.$root.beforeEditCache_body;
				item.planned_time = this.$root.beforeEditCache_planned_time;
			}
			this.$root.editingItem = null;
			this.$root.editingItemTags = null;
		},
		startEditDoneDate(item, event){
			console.log('startEditDoneDate');
			item = (item) ? item : allItems.nodes[selection.selectedId];
			this.$root.beforeEditCache_done_date = item.done_date;
			this.$root.editingDoneDateItem = item.id;
			setTimeout(function(){
				let el = "done-date-edit-"+item.id;
				document.getElementById(el).flatpickr();
				// window.flatpickr(event.target);
	    	},20);
		},
		deleteItem(item){
			let id = item.id;
			this.$root.deleteItem(id);
		},
		addNew(addNextItemAs){
			console.log('sending newItem:');
			let newItem = this.newItem;
			newItem.parent_id = (this.item.parent_id) ? this.item.parent_id : allItems.root.id;
			newItem.depth = this.item.depth;

			let OlderSiblingIndex = this.siblingIndex;
			let index = (isNaN(OlderSiblingIndex)) ? 0 : OlderSiblingIndex+1;
			
			if (this.$root.addingNewAsChild){
				newItem.depth = this.item.depth + 1;
        		newItem.parent_id = this.item.id;
        		index = 0;
			}
			let todayTagIndex = this.newItem.preparedTags.indexOf('Today');
			if (todayTagIndex != -1){
				this.newItem.preparedTags.splice(todayTagIndex, 1);
				newItem.due_date = moment().format();
			}
			let addTags = this.newItem.preparedTags;
			
			console.log(newItem);
			// Send to Root for Ajax call.
			this.$root.postNewItem(newItem, index, addNextItemAs, addTags);

			// Reset stuff
			this.newItem.body = '';
			this.newItem.due_date = '0000-00-00 00:00:00';
			this.newItem.planned_time = '';
			this.newItem.preparedTags = this.parentTags;
		},
		cancelAddNew(lastSelectedId){
			this.newItem.body = '';
			this.$root.addingNewUnder = null;
			selection.selectedId = selection.lastSelectedId;
			// Reset newItem to sibling stance.
			this.$root.addingNewAsChild = false;			
			$(':focus').blur();
		},
		addTag(item){
			let id = (item) ? item.id : selection.selectedId;
			let tag = this.newTag;
			allItems.tagItem(id, tag);
			this.newTag = null;
		},
		prepareTag(item){
			let id = (item) ? item.id : selection.selectedId;
			let tag = this.newTag;
			if(tag=='t' || tag=='T' || tag=='today' || tag=='Today'){
				tag = 'Today';
			}
			this.newItem.preparedTags.push(tag);
			this.newTag = null;
		},
		deleteTag(id, tagName, event){
			let plsFocus = '#updatebox-'+id+' .edititem-body';
			document.querySelector(plsFocus).focus();
			this.$root.patchTag(id, tagName, 'untag');
		},
		deletePreparedTag(tag, item){
			let plsFocus = ".addnewbox .prepare-tag";
			// let plsFocus;
			// if(this.showAddNewBox == true){ plsFocus = "#new-under-"+item.id+" .prepare-tag"; }
			// if(this.showAddNewBoxFirstChild == true){ plsFocus = "#new-firstchild-of-"+item.id+" .prepare-tag"; }
			document.querySelector(plsFocus).focus();
			let tagIndex = this.newItem.preparedTags.indexOf(tagIndex);
			this.newItem.preparedTags.splice(tagIndex, 1)
		},
		setPlannedTime(item, time, event){
			let plsFocus = '#updatebox-'+item.id+' .add-tag';
			setTimeout(function(){
				console.log('returning to editting: '+plsFocus);
				document.querySelector(plsFocus).focus();
	    	},30);
			item.planned_time = time;
		},
		setPlannedTimeNewItem(item, time, event){
			let plsFocus = ".addnewbox .prepare-tag";
			setTimeout(function(){
				console.log('returning to : '+plsFocus);
				document.querySelector(plsFocus).focus();
	    	},30);
			this.newItem.planned_time = time;
		},
	},
	directives: {
		// My old directive:
		// 'item-focus': function (value) {
		// 	if (!value) {
		// 		return;
		// 	}
		// 	let el = this.el;
		// 	Vue.nextTick(function () {
		// 		el.focus();
		// 	});
		// }
		focus: {
			inserted(el) {
				Vue.nextTick(function () {
					el.focus();
				});
			}
		},
	},
	// http: {
	// 	// base: '/base',
	// 	headers: {
	// 		'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value'),
	// 	},
 //    },
}
</script>