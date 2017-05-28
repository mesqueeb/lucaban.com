<template id="items-card-template">
<div
	v-if="item || listIsEmpty"
	:id="'card-'+item.id"
	:class="{
		'items-card': true,
		'journal-wrapper': journalView
	}"
>
<!-- item-card-wrapper -->
<div 
	class="d-flex flex-wrap"
	v-if="!isHidden || listIsEmpty"
>
	<div
		class="c-section-head"
		v-if="journalDate && item.journalDate"
	>
		<!-- Codementor: Is this the correct way to format something like this? -->
		<span>{{ momentCalendar(journalDate) }}</span>
		<span class="c-section-head__subtitle" v-if="journalDate != momentCalendar(journalDate)">
			{{ journalDate }}
		</span>
		<button
			class="o-btn btn btn-dipclick ml-auto"
			v-clipboard:copy="basis.$store.getters.clipboardTextJournal(item)"
			v-clipboard:success="clipboardSuccess"
			v-clipboard:error="clipboardError"
			v-if="true || !basis.mobile"
		>
			{{ basis.text.card.copy }}
		</button>
		<div class="w-100 d-flex" v-if="sec_to_hourmin(get.totalUsedSec(item))">
			<span class="c-journal-used-time">{{ basis.text.menu.usedTime }}: </span>
			<span class="o-pill--used-time">{{ sec_to_hourmin(get.totalUsedSec(item)) }}</span>
		</div>
	</div>
		<!-- v-if="journalView && item.depth != 0 && item.parents_bodies" -->
	<div
		class="c-subsection-head"
		v-if="journalParentString"
		@click="selectItem(item)"
	>
		<div class="c-subsection-head__text">
			{{ journalParentString }}
		</div>
	</div>
	<div 
		v-if="item.depth != 0 && !(journalView && journalDate)"
		:id="'item-body-'+item.id"
		:class="{
			'c-item-card': true,
			'show_children': item.show_children,
		}"
	>
		<!-- ITEM TOGGLES -->
		<item-toggles :item="item"></item-toggles>
		<!-- / ITEM TOGGLES -->
		<div
			:class="{
				'c-body-div':true,
				'c-body-div--editing':(!basis.mobile && item.id == basis.editingItem),
				'textarea-wrap':true,
				'u-selected': item.id == basis.selection.selectedId,
				'u-selected--editing':(!basis.mobile && item.id == basis.editingItem),
				'c-body-div--updating-tags': item.id == basis.editingItemTags
				}"
			@dblclick="startEdit(item, $event)"
			@click="selectItem(item)"
		>
			<div
				:class="{ 'c-body-text': true,
					'js-body-text': true,
					'c-body-text--project':isProject,
					'c-body-text--updating-tags': item.id == basis.editingItemTags
					}"
				v-show="item.id != basis.editingItem || basis.mobile"
			>
				<div :class="{
					'u-lightgray':item.temp,
					'c-body-text--done': item.done
					}"
				>{{ item.body }}</div>
				<div class="l-completion-notes c-completion-notes bodybox"
					v-if="item.completion_memo"
					@click="selectItem(item)"
				>{{ item.completion_memo }}</div>
			</div>

			<!-- For debugging: -->
			<span v-if="basis.debug" class="d-inline-flex">
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
				:class="{
					'updatebox':true,
					'c-updatebox':true,
					'c-updatebox--mobile':(basis.mobile),
					'c-updatebox--updating-tags': item.id == basis.editingItemTags
					}"
				:id="'updatebox-'+item.id"
				v-if="item.id == basis.editingItem"
				@submit.prevent="doneEdit(item)"
				@click="clickOnEditCurtain(item, $event)"
			>
				<div :class="{
					'c-updatebox__body':true,
					'c-updatebox__body--mobile':(basis.mobile)
					}"
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
					'c-updatebox__lower-body--mobile':(basis.mobile)}"
				>
					<div
						:class="{ 'c-update-planned-time':true,
							'c-update-planned-time--mobile':(basis.mobile)}"
						v-show="basis.selection.view != 'journal'"
					>
						{{ basis.text.card.duration }}
						<button
							:class="{ 'o-btn':true,
								'c-update-planned-time__button':true,
								'js-update-planned-time__button':true,
								'c-update-planned-time__currentDuration': item.planned_time == 10 }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="10"
						>10{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
						<button
							v-if="!basis.mobileSmall"
							:class="{ 'o-btn':true,
								'c-update-planned-time__button':true,
								'c-update-planned-time__currentDuration': item.planned_time == 15 }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="15"
						>15{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
						<button
							:class="{ 'o-btn':true,
								'c-update-planned-time__button':true,
								'c-update-planned-time__currentDuration': item.planned_time == 30 }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="30"
						>30{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
						<button
							:class="{ 'o-btn':true,
								'c-update-planned-time__button':true,
								'c-update-planned-time__currentDuration': item.planned_time == 60 }"
							@click.prevent="setPlannedTime(item, $event)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							@blur="blurOnEdit(item)"
							value="60"
						>1{{ (basis.mobileSmall) ? basis.text.global.h : basis.text.global.hour }}</button>
						<div><input
							class="c-update-planned-time__input" 
							v-show="true"
							v-model="item.planned_time"
							@blur="blurOnEdit(item)"
							@keydown="keydownOnEdit(item, $event, 'planned-time')"
							type="number"
						/>{{ basis.text.global.min }}</div>
					</div>
					<div :class="{'c-item-tags':true,
						'c-updatebox__item-tags':true,
						'c-updatebox__item-tags--mobile':(basis.mobile)}"
						v-if="basis.mobile && (item.id == basis.editingItem || item.id == basis.editingItemTags)"
					>
						<div
							class="c-add-tag__wrapper"
							:id="'add-tag-'+item.id"
						>
							<label>
								{{ basis.text.card.addTag }}
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
								|| item.id == basis.editingItem
								|| item.id == basis.editingItemTags"
							class="o-pill--custom-tag"
							@dblclick.prevent="basis.filterItems({keyword:'tag', value:tag.tag_slug, event:$event})"
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
						<button v-if="basis.mobile" class="c-mobile-edit-save-btns o-btn" @click="doneEdit(item)">
							{{ basis.text.global.save }}
						</button>
					</div>
				</div>
			</form>
<!-- / .UPDATEBOX -->

<!-- ITEM TAGS -->
			<div :class="{
				'c-item-tags':true,
				'c-item-card__item-tags':true,
				'c-item-tags--updating-tags': item.id == basis.editingItemTags
				}"
			>
				<div
					class="c-add-tag__wrapper"
					:id="'add-tag-'+item.id"
					v-if="!basis.mobile && (item.id == basis.editingItem || item.id == basis.editingItemTags)"
				>
					<label>
						{{ basis.text.card.addTag }}
						<input
							class="c-add-tag__input js-add-tag"
							type="text" v-autowidth v-focus.noMobile
							v-model="newTag" placeholder="..."
							@keydown="keydownOnEdit(item, $event, 'add-tag')"
							@blur="blurOnEdit(item, 'add-tag')"
						>
					</label>
				</div>
				<label
					class="o-pill--done"
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
						&& !item.done"
					class="o-pill--total-duration"
				>
					{{ sec_to_hourminsec(totalSecLeft) }}
				</span>
				<span
					class="o-pill--duration"
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
					class="o-pill--duedate"
				>
					{{ momentCalendar(item.due_date) }}
				</span>
				<span
					v-if="item.dueDateParent && !item.done
					 && item.id != basis.editingItemTags"
					class="o-pill--duedate-parent"
				>
					{{ momentCalendar(item.dueDateParent) }}
				</span>
				<span
					v-for="tag in item.tagged"
					v-if="item.tagged.length"
					v-show="!parentTags.includes(tag.tag_name)
						|| item.id == basis.editingItem
						|| item.id == basis.editingItemTags"
					class="o-pill--custom-tag"
					@dblclick.prevent="basis.filterItems({keyword:'tag', value:tag.tag_slug, event:$event})"
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
			<item-nav
				:item="item"
			></item-nav>
			<!-- / .ITEM-NAV -->
		</div>
	</div>

<!-- CHILDREN -->
	<div
		class="l-children"
		v-if="item.children.length"
		v-show="item.show_children"
		:style="(addingNewAsFirstChild)?'order:3;':''"
	>
		<Card
			v-if="!item.journalDate"
			v-for="childCard in visibleDirectChildren"
			:item="childCard"
			:key="childCard.id"
			:parent-tags="tagsArray"
		></Card>
		<Card
			v-if="item.journalDate"
			v-for="childCard in item.children"
			:item="childCard"
			:key="childCard.id"
			:parent-tags="tagsArray"
		></Card>
			<!-- :new-item="newItem" -->
	</div>
<!-- / CHILDREN -->

<!-- ADD NEW BOX -->
	<form 
		:class="{
			'addnewbox':true, 
			'c-addnewbox':true, 
			'c-addnewbox--mobile':(basis.mobile),
			'child':addingNewAsChild,
			'first-child':addingNewAsFirstChild,}"
		:id="'new-under-'+ item.id "
		v-if=" showAddNewBox
			|| (listIsEmpty && !basis.mobile && basis.selection.view != 'journal')"
		@submit.prevent
		@click="clickOnAddNewCurtain($event)"
	>
		<div :class="{
			'c-addnewbox__body':true,
			'c-addnewbox__body--mobile':(basis.mobile),
			'flex-wrap':true,
			}"
		>
			<div class="c-language-picker w-100" v-if="listIsEmpty && basis.mobile">
				<a href="#"
					class="c-language-picker__a" 
					@click="basis.$store.commit('updateState',{setLanguage:'ja'})"
					v-if="basis.language != 'ja'"
				>日本語</a>
				<a href="#"
					class="c-language-picker__a" 
					@click="basis.$store.commit('updateState',{setLanguage:'en'})"
					v-if="basis.language != 'en'"
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
			'c-addnewbox__lower-body--mobile':(basis.mobile),
			}"
		>
			<div class="c-update-planned-time">
				{{ basis.text.card.duration }}
				<button
					:class="{ 'o-btn':true,
						'c-update-planned-time__button':true,
						'js-update-planned-time__button':true,
						'c-update-planned-time__currentDuration': newItem.planned_time == 10 }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="10"
				>10{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
				<button
					v-if="!basis.mobileSmall"
					:class="{ 'o-btn':true,
						'c-update-planned-time__button':true,
						'c-update-planned-time__currentDuration': newItem.planned_time == 15 }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="15"
				>15{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
				<button
					:class="{ 'o-btn':true,
						'c-update-planned-time__button':true,
						'c-update-planned-time__currentDuration': newItem.planned_time == 30 }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"

					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="30"
				>30{{ (basis.mobileSmall) ? basis.text.global.m : basis.text.global.min }}</button>
				<button
					:class="{ 'o-btn':true,
						'c-update-planned-time__button':true,
						'c-update-planned-time__currentDuration': newItem.planned_time == 60 }"
					@click.prevent="setPlannedTimeNewItem(item, $event)"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
					value="60"
				>1{{ (basis.mobileSmall) ? basis.text.global.h : basis.text.global.hour }}</button>
				<div><input
					class="c-update-planned-time__input"
					v-if="true"
					type="number"
					v-model="newItem.planned_time"
					@keydown="keydownOnNew(item, $event, 'planned-time')"
					@blur="blurOnAddNew(item)"
				/>{{ basis.text.global.min }}</div>
			</div>
			<div :class="{ 'c-item-tags':true,
				'c-addnewbox__item-tags':true,
				'c-prepared-tags--mobile':(basis.mobile) }"
			>
				<div class="c-prepare-tag__wrapper">
					<label>
						{{ basis.text.card.addTag }}
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
			<div class="c-mobile-buttonrow" v-if="basis.mobile">
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
import { linkify, momentCalendar, sec_to_hourminsec, sec_to_hourmin } from '../components/valueMorphers2.js';
// import flatPickConfig from '../components/flatPickrOptions.js';
import { uniq, Utilities } from '../components/globalFunctions.js';
import Clipboard from 'clipboard';
import itemNav from './itemNav.vue';
import itemToggles from './itemToggles.vue';

export default {
	name: 'Card',
	template:'#items-card-template',
	components: { itemNav, itemToggles },
	mounted()
	{
		// this.newItem.preparedTags = JSON.parse(JSON.stringify(this.parentTags));
		// this.convertbodyURLtoHTML();
		if (this.listIsEmpty){ this.$root.addingNewEmptyList = true; }
	},
	props: ['item', 'parentTags'],
	data()
	{
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
			showItemMenu: false,
			newTag: null,
		};
	},
	// components: { 
	// Flatpickr: Flatpickr,
	// },
	computed: {
		listIsEmpty()
		{
			if (!this.item || !this.$store.state.root){ return false; }
			if (this.item.id != this.$store.state.root.id){ return false; }
			if (!this.visibleDirectChildren.length){ return true; }
		},
		basis(){ return this.$root; },
		thebody(){ return this.item.body },
 /* \ ============================================== / *\
| ◉ |	FROM THE STORE 								| ◉	 |
 \* / ============================================== \ */
		get(){ return this.$store.getters },
		id(){ return this.item.id },
		visibleDirectChildren(){ return this.get.visibleDirectChildren(this.id) },
		allVisibleChildItems(){ return this.get.allVisibleChildItems(this.id) },
		childrenOrder(){ return this.get.childrenOrder(this.id) },
		childrensDeepestChildren(){ return this.get.childrensDeepestChildren(this.id) },
		totalMinLeft(){ return this.get.totalMinLeft(this.id) },
		totalSecLeft(){ return this.get.totalSecLeft(this.id) },
		secLeft(){ return this.get.secLeft(this.id) },
		minLeft(){ return this.get.minLeft(this.id) },
		allChildrenDone(){ return this.get.allChildrenDone(this.id) },
		totalTimeDifferentFromParent(){ return this.get.totalTimeDifferentFromParent(this.id) },
		tagsArray(){ return this.get.tagsArray(this.id) },
		totalPlannedMin(){ return this.get.totalPlannedMin(this.id) },
		totalUsedSec(){ return this.get.totalUsedSec(this.id) },
		totalUsedMin(){ return this.get.totalUsedMin(this.id) },
		totalPlannedSec(){ return this.get.totalPlannedSec(this.id) },
		totalPlannedHour(){ return this.get.totalPlannedHour(this.id) },
		isProject(){ return this.get.isProject(this.id) },
		siblingIndex(){ return this.get.siblingIndex(this.id) },
		olderSiblingId(){ return this.get.olderSiblingId(this.id) },
		addingNewAsFirstChild(){ return this.$store.state.addingNewAsFirstChild; },
		addingNewAsChild(){ return this.$store.state.addingNewAsChild; },
		journalDate(){ return this.get.journalDate(this.item) },
/* \ ============================================== / *\
\* / ============================================== \ */
		preparedPlusComputedTags()
		{ if (!this.item){ return []; }
			if (this.item.id == this.$store.state.root.id){ return []; }
			let alltags = this.newItem.preparedTags;
			if (selection.tags.length)
			{
				alltags = alltags.concat(selection.tags.map(tag => Utilities.tagSlugToName(tag)));
			}
			if (this.parentTags.length)
			{
				alltags = alltags.concat(this.parentTags);
			}
			if (this.$store.state.addingNewAsChild)
			{
				let tagz = this.$store.getters.returnTagsAsArray(this.item.id);
				alltags = alltags.concat(tagz);
			}
			if (this.$store.getters.isTopLvlItemInFilteredRoot(this.item.id))
			{
				if (this.$store.state.nodes[this.item.parent_id])
				{
					let tagzies = this.$store.getters.returnTagsAsArray(this.item.parent_id);
					alltags = alltags.concat(tagzies);
				}
			}
			alltags = uniq(alltags);
			return alltags.sort();
		},
		journalView()
		{ if (!this.item){ return; }
			if (this.$root.selection.view == 'journal'){
				return true;
			} else { return false; }
		},
		journalParentString()
		{ if (!this.item){ return; }
			// console.log('run on '+this.item.id+' - '+this.item.body);
			if (this.$root.selection.view != 'journal'){ return false; }
			if (this.journalView && !this.item.journalDate){
				if (this.item.depth == 0){ return; }
				let prevId = this.visiblePrevItemId;
				let parentString = this.item.parents_bodies;
				if (!this.$store.state.nodes[prevId]){ return; }
				let prevParentString = this.$store.state.nodes[prevId].parents_bodies;

				let prevDoneDate = this.$store.state.nodes[prevId].done_date;
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
		visiblePrevItemId()
		{
			if (!this.item){ return; }
			let parentId = this.item.parent_id;
			if (!parentId || this.$store.state.nodes[parentId]){ return; }
			
			let index = this.get.childrenOrder(parentId).indexOf(this.item.id);
			if (index == 0){ return this.root.id; }
			let prevId = this.get.childrenOrder(parentId)[index-1];
			if(prevId != this.get.prevItemId(this.item.id))
			{
				console.info(`getters.prevItemId(${this.item.id}) != visiblePrevItemId
					visiblePrevItemId = ${prevId}
					prevItemId = ${this.get.prevItemId(this.item.id)}
					`);
			}
			return prevId;
		},
		showAddNewBox()
		{ if (!this.item){ return; }
			if (!this.$store.state.addingNewUnder){ return false; }
			if (this.$store.state.addingNewUnder == this.item.id)
			{ return true; }
			return false;
		},
		hasDueDate()
		{ if (!this.item){ return; }
		    return (this.item.due_date && this.item.due_date != '0000-00-00 00:00:00');
		},
		hasDoneDate()
		{ if (!this.item){ return; }
		    return (this.item.done_date && this.item.done_date != '0000-00-00 00:00:00');
		},
		hastotalUsedSec()
		{ if (!this.item){ return; }
		    return (this.item.children_order.length
		    	&& this.item.totalUsedSec
		    	&& this.item.totalUsedSec != '0'
		    	&& this.item.used_time != this.item.totalUsedSec);
		},
		hasTotalPlannedMin()
		{ if (!this.item){ return; }
		    return (this.item.children_order.length
		    	&& this.totalPlannedMin
		    	&& this.totalPlannedMin != '0'
		    	&& this.item.planned_time != this.totalPlannedMin);
		},
		hasPlannedTime()
		{ if (!this.item){ return; }
		    return (this.item.planned_time && this.item.planned_time != '0');
		},
		hasUsedTime()
		{ if (!this.item){ return; }
		    return (this.item.used_time && this.item.used_time != '0');
		},
		isHidden()
		{ if (!this.item){ return true; }
			// console.log('allVisibleChildItems');
			return this.$store.getters.hiddenItemIds.includes(this.item.id)
		},
	},
	methods: {
		linkify,
		momentCalendar,
		sec_to_hourminsec,
		sec_to_hourmin,

		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },

		addTimer(item){ this.dispatch('addTimer', {id:item.id}) },
		selectItem(item){ this.dispatch('selectItem', {id:item.id}) },
		updateDone(id){ this.dispatch('prepareDonePatch', {id}) },
		updateShowChildren(id){ this.dispatch('patch', {id,field:'show_children'}) },
		cancelEdit(id){ this.dispatch('cancelEdit', {id}) },
		startEdit(item, event){ this.dispatch('startEdit', {item, event}) },
		doneEdit(item){ this.dispatch('doneEdit', {item}) },
		setToday(id){ this.dispatch('setToday', {id}) },
		deleteItemDialogue(id){ this.dispatch('deleteItemDialogue', {id}) },
		
		clipboardSuccess()
		{
			this.$store.dispatch('sendFlash', { type:'success', msg:this.$root.keybindings.copyClipboard.success[this.l] });
		},
		clipboardError()
		{
			this.$store.dispatch('sendFlash', { type:'error', msg:this.$root.keybindings.copyClipboard.error[this.l] });
		},
		convertbodyURLtoHTML()
		{
			// console.log('converting');
			if (!this.item || this.item.depth == 0){ return; }
			let bodyboxQS = '#'+this.$el.id+' .js-body-text';
			let a = document.querySelector(bodyboxQS);
			if (!a || !a.innerHTML.includes('a href')){ return; }
			a.innerHTML = a.innerHTML.replace("&lt;a href=", "<a href=").replace('target="_blank"&gt;','target="_blank">').replace("&lt;/a&gt;","</a>");
		},
		clickOnAddNewCurtain(event)
		{
			if (!this.$store.getters.mobile){ return; }
			if (event && event.srcElement.nodeName != 'FORM'){ return; }
			this.$root.cancelAddNew();
		},
		clickOnEditCurtain(item, event)
		{
			if (!this.$store.getters.mobile){ return; }
			if (event && event.srcElement.nodeName != 'FORM'){ return; }
			this.doneEdit(item);
		},
		newItemIndent()
		{
			if (!this.item.children.length || !this.item.show_children)
			{ // If item has no children yet / no visible children
				this.$store.state.addingNewAsChild = true;
				return;
			}
			let lastChildId = this.$store.getters.getLastChildId(this.item.id);
    		this.$root.showAddNewItem(lastChildId);
		},
		newItemUnindent()
		{
			if (this.$store.state.addingNewAsChild)
			{
				this.$store.state.addingNewAsChild = false;
				this.$store.state.addingNewAsFirstChild = false;
				return;
			}
			if (selection.view == 'journal')
			{
				return;
			}
			this.$root.showAddNewItem({ id:this.item.parent_id });
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
			  	if (this.$root.mobile && field == 'body'){ return; }
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
	        	this.$root.setCancelThroughKeydown();
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
				if (this.$root.mobile && field == 'body'){ return; }
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
		        	if (this.$root.editingItemTags){ this.$root.editingItemTags = null; return; }
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
		        	if (this.$root.editingItemTags){ this.$root.editingItemTags = null; }
		        	return;
				}
			}
			// ESC
			if (e.keyCode === 27)
			{
	    		this.$root.setCancelThroughKeydown();
				this.cancelEdit(item.id);
			}
	    },
	    blurOnEdit(item, field)
	    {
	    	if (this.$root.cancelThroughKeydown){ return; }
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
    				if (self.$root.mobile){ return; }
			    	console.log('blurring on edit');
					self.doneEdit(item);
				}
	    	},50);
	    	// Codementor: is there any better way than this?
	    },
	    blurOnAddNew(item, field)
	    {
	    	if (this.$root.cancelThroughKeydown){ return; }
	    	if (this.$root.mobile && field == 'prepare-tag')
	    	{
				this.prepareTag(item);
				return;
	    	}
	    	if (this.$root.mobile){ return; }
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
			    	// if (self.$root.mobile){ self.addNew('stop'); return; }
			    	console.log('bluring on Add New');
			    	if (self.$root.mobile){ return; }
					self.cancelAddNew();
				}
	    	},50);
	    },
		startEditDoneDate(item, event)
		{
			console.log('startEditDoneDate');
			item = (item) ? item : this.$store.state.nodes[selection.selectedId];
			this.$root.beforeEditCache_done_date = item.done_date;
			this.$root.editingDoneDateItem = item.id;
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
			this.$root.cancelAddNew({cancelUnderId});
		},
		addTag(item)
		{
			let id = (item) ? item.id : selection.selectedId;
			let tag = this.newTag;
			this.dispatch('tagItem', {id, tags:tag});
			this.newTag = null;
		},
		prepareTag(item)
		{
			let id = (item) ? item.id : selection.selectedId;
			let tag = this.newTag;
			if (tag=='t' || tag=='T' || tag=='today' || tag=='Today')
			{
				tag = 'Today';
			}
			this.newItem.preparedTags.push(tag);
			this.newTag = null;
		},
		deleteTag(id, tagName, event)
		{
			let plsFocus = '#add-tag-'+id+' .js-add-tag';
			document.querySelector(plsFocus).focus();			
			this.$root.patchTag({id:id, tags:tagName, requestType:'untag'});
		},
		deletePreparedTag(tag, item)
		{
			let plsFocus = '#new-under-'+this.item.id+' .js-prepare-tag';
			document.querySelector(plsFocus).focus();
			let tagIndex = this.newItem.preparedTags.indexOf(tagIndex);
			this.newItem.preparedTags.splice(tagIndex, 1)
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