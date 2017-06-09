<!-- <router-link to="/HELLO">HELLO</router-link>
<router-link to="/">IT'S ME</router-link>
<router-link to="/index">indexxxxxxxsexxxx</router-link>
<router-view></router-view> -->
<template>
<div id="q-app" :class="{'mobile':mobile}">


	<!-- _|LOADER -->
	<div id="loading-icon">
		<div class="loader loader--style1" title="loading" alt="Loading"
			v-show="patching || loading"
		>
		<!-- _|LOADER__SVG -->
			<svg version="1.1"
				id="loader-1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px" y="0px"
				width="40px" height="40px"
				viewBox="0 0 40 40"
				nable-background="new 0 0 40 40"
				xml:space="preserve"
			>
				<path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
				s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
				c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
				<path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
				C22.32,8.481,24.301,9.057,26.013,10.047z">
				<animateTransform attributeType="xml"
					attributeName="transform"
					type="rotate"
					from="0 20 20"
					to="360 20 20"
					dur="0.5s"
					repeatCount="indefinite"
				/>
				</path>
			</svg>
			<!-- LOADER__SVG|_ -->
		</div>
		<div class="patching-error" v-show="patching == 'error'" v-cloak>Error!</div>
	</div>
	<!-- LOADER|_ -->

<Popups :popups="popups"></Popups>
<Flashes :flashes="flashes"></Flashes>
<Popouts :popouts="popouts"></Popouts>

<!-- _|ITEMS-APP__PANEL -->
<div class="c-panel" v-cloak>
	<!-- _|PANEL__NAV -->
	<div class="c-panel__navigation">
		<div class="c-navigation__menu">
			<a href="#"
				:class="{'active': selection.filter.includes('all')}"
				@click="filterItems({ keyword:'all', value:'all', event:$event})"
			>{{ text.menu.all }}</a>
			<a href="#"
				:class="{'active': selection.filter.includes('today')}"
				@click="filterItems({ keyword:'duedate', value:'today', event:$event})"
			>{{ text.menu.today }}</a>
			<a href="#"
				:class="{'active': selection.view.includes('journal'),
					'filtered-out': selection.hiddenBookmarks.includes('journal')}"
				@click="filterItems({ keyword:'journal', value:'journal', event:$event})"
			>{{ text.menu.journal }}</a>
			<a href="#"
				@click="updatePopouts({ guide:true })"
				v-if="!mobile"
			>?</a>
			<a href="#"
				@click="updateState({ setLanguage:'ja'})"
				v-if="language != 'ja'"
			>日本語</a>
			<a href="#"
				@click="updateState({ setLanguage:'en'})"
				v-if="language != 'en'"
			>English</a>
			<a href="#"
				id="js-copy__1068" 
				@click="test()"
				v-if="debug"
			>TEST</a>
		</div>
		<div class="c-navigation__tag-menu">
			<a v-for="tag in allTagsComputed"
				href="#"
				:class="{'active': selection.tags.includes(tag.slug)}"
				:value="tag.slug"
				@click="filterItems({ keyword:'tag', value:tag.slug, event:$event })"
			>{{ tag.name }}</a>
			<a v-for="tag in selection.hiddenTags"
				class="filtered-out" href="#"
				@click.prevent="removeFilter({tag})"
			>{{ tagSlugToName(tag) }}</a>
			
		</div>
	</div>
	<!-- PANEL__NAV|_ -->
	<div class="u-line"></div>
	
	<!-- _|PANEL__TITLE -->
		<!-- NEEDS TO BE ADDED BACK IN: c-panel__title- -scrolled-down -->
	<div class="c-panel-title">
		<div class="c-panel-title__top-row">
			<span v-if="selection.filter.length" v-for="sel in selectionFilter">{{ sel }}</span>
			<span v-if="selection.tags.length" v-for="sel in selectionTags">{{ sel }}</span>
			<span v-if="selection.view != 'journal'">
				<button
					class="o-btn"
					v-btn-effect
					v-clipboard:copy="clipboardText(root.id)"
					v-clipboard:success="clipboardSuccess"
					v-clipboard:error="clipboardError"
				>
					{{ text.card.copy }}
				</button>
			</span>
		</div>
		<div class="c-panel-title__hidden-tags">
			<span v-if="selection.hiddenTags.length" v-for="hidden in selectionHiddenTags">{{ hidden }}</span>
		</div>
	</div>
	<!-- PANEL__TITLE|_ -->

	<!-- _|PANEL__STATS -->
	<div class="c-panel__stats"
		v-show="true"
	>
		<div v-show="totalUsedHourMin() && selection.view != 'journal'">
			{{ text.menu.usedTime }}
			<div class="c-stats__used-time">{{ totalUsedHourMin() }}</div>
		</div>
		<div v-show="totalHourMinLeft() && selection.view != 'journal'">
			{{ text.menu.timeLeft }}
			<div class="c-stats__time-left">{{ totalHourMinLeft() }}</div>
		</div>
		<div v-show="selection.view != 'journal'">
			{{ text.menu.items }}
			<div class="c-stats__children-amount">{{ itemAmount }}</div>
		</div>
		<div v-if="doneItemAmount">
			{{ (selection.view != 'journal') ? text.menu.done : text.menu.total }}
			<div class="c-stats__done-children-amount">{{ doneItemAmount }}</div>
		</div>
	</div>
	<!-- PANEL__STATS|_ -->

	<!-- _|PANEL__DATA -->
	<div class="c-items-wrapper"
	>
		<Card :item="root"
			ref="root"
			:parents-children-order="[]"
			:parent-tags="[]"
			:new-item="newItem"
		></Card>
 	</div>
	<!-- PANEL__DATA|_ -->

</div>
<!-- ITEMS-APP__PANEL|_ -->

<!-- _|ITEMS-APP__MOBILE-NAV -->
<div id="bottom-hint"
	v-show="!itemAmount"
	v-if="mobile"
>{{ text.guide.hints.addItemHint }}<br>➘</div>

<div id="mobile-item-nav" v-if="mobile">
	<div class="playstation-controller"
		v-if="selection.view != 'journal'"
		v-show="itemAmount && selection.selectedId"
	>
		<button id=""
			@click="unindent()"
			:class="{
				'o-btn':true,
				'u-disabled':(topLvlItems.includes(selection.selectedId))}"
			:disabled="topLvlItems.includes(selection.selectedId)"
		>
			<i class="zmdi zmdi-caret-left-circle"></i>
		</button>
		<div>
			<button id=""
				@click="moveItem({direction:'up'})"
				:class="{
					'o-btn':true,
					'u-disabled':(firstItem == selection.selectedId)}"
				:disabled="firstItem == selection.selectedId"
			>
				<i class="zmdi zmdi-caret-up-circle"></i>
			</button>
			<button id=""
				@click="moveItem({direction:'down'})"
				:class="{
					'o-btn':true,
					'u-disabled':(lastItems.includes(selection.selectedId))}"
				:disabled="lastItems.includes(selection.selectedId)"
			>
				<i class="zmdi zmdi-caret-down-circle"></i>
			</button>
		</div>
		<button id=""
			@click="indent()"
			:class="{
				'o-btn':true,
				'u-disabled':(isFirstItem(selection.selectedId))}"
			:disabled="isFirstItem(selection.selectedId)"
		>
			<i class="zmdi zmdi-caret-right-circle"></i>
		</button>
	</div>
	<button class="o-btn" id="floating-add-btn" @click="showAddNewItem()">
		<i class="zmdi zmdi-plus-circle"></i>
	</button>
</div>
<!-- ITEMS-APP__MOBILE-NAV|_ -->

</div>
</template>

<script>
/*
 * Root component
 */
// components:
import Card from './vue-components/Card.vue';
import Popups from './vue-components/Popups.vue';
import Popouts from './vue-components/Popouts.vue';
import Flashes from './vue-components/Flashes.vue';
import { mapMutations, mapGetters, mapState, mapActions } from 'vuex';
import { Utilities } from './helpers/globalFunctions.js';
let tagSlugToName = Utilities.tagSlugToName;

export default {
	store,
	components: {
		Card,
		Popups,
		Popouts,
		Flashes
	},
	mounted() {
		console.info(this);
        eventHub.$on('confirm-ok', function(id) {
            console.log('computer says "ok"...');
            console.log(id);
            store.dispatch('deleteItem', {id});
        });
        eventHub.$on('confirm-cancel', function(id) {
            console.log('computer says "no"...');
            console.log(id);
            return;
        });
        this.sortAllChildren();
    },
	computed:
	{
		...mapState([
			'nodes',
			'root',
			'orphans',
			'source',
			'languageContents',
			'selection',
			'debug',
			'doneData',
			'addingNewUnder',
			'addingNewAsChild',
			'addingNewAsFirstChild',
			'editingItem',
			'editingItemTags',
			'editingDoneDateItem',
			'loading',
			'patching',
			'popups',
			'popouts',
			'flashes',
			'timerItems',
			'beforeEditCache_body',
			'beforeEditCache_planned_time',
			'fetchedDone',
			'cancelThroughKeydown',
			'manualMobile',
			'newItem',
			'newTag',
			'setLanguage',
			'keybindings',
		]),
		...mapGetters([
			'oS',
			'hasTag',
			'hasParentWithTag',
			'parentIdWithTag',
			'returnTagsAsArray',
			'siblingIndex',
			'olderSiblingId',
			'nextItemId',
			'nextSiblingOrParentsSiblingId',
			'deepestChild',
			'topLvlParentOfDeepestChild',
			'prevItemId',
			'nextItemRecursion',
			'isTopLvlItemInFilteredRoot',
			'hasParentDueToday',
			'isDueToday',
			'isProject',
			'itemTagArray',
			'allChildrenDone',
			'getAllChildrenIds',
			'getAllChildrenIdsRecursive',
			'calTotalPlannedTime',
			'calTotalUsedTime',
			'checkValParentTree',
			'getParentsAsArray',
			'getParentsRecursive',
			'getLastChildId',
			'getDeepestLastChildId',
			'setDefaultItemValues',
			'flattenTree',
			'itIsADeepestChild',
			'countChildren',
			'countDoneChildren',
			'findDeepestVisibleChild',
			'visibleDirectChildren',
			'allVisibleChildItems',
			'isFirstItem',
			'language',
			'text',
			'clipboardText',
			'clipboardTextJournal',
			'mobile',
			'mobileSmall',
			'noItems',
			'filteredItems',
			'filteredItemsJournal',
			'journalDates',
			'filteredItemsFlat',
			'filteredItemsTree',
			'hiddenItemIds',
			'selectionFilter',
			'selectionTags',
			'selectionHiddenTags',
			'allTagsComputed',
			'allTagsComputed_2',
			'allTagsComputed_3',
			'allTagsComputed_1b',
			'itemAmount',
			'doneItemAmount',
			'totalPlannedMin',
			'totalPlannedSec',
			'totalUsedSec',
			'totalSecLeft',
			'totalUsedHourMin',
			'totalHourMinLeft',
			'lastItems',
			'firstItem',
			'topLvlItems',
		]),
	},
	methods:
	{
		tagSlugToName,
		...mapMutations([
			'updateState',
			'resetNewItem',
			'addChild',
			'deleteChild',
			'closeFlash',
			'updatePopouts',
			'updatePopups'
	    ]),
	    ...mapActions([
	    	'giveNewParent',
	    	'clipboardSuccess',
	    	'clipboardError',
			'duplicate',
			'addAndCleanNodesRecursively',
			'addItem',
			'addTempNewItem',
			'hideTaggedNodes',
			'hideDoneNodes',
			'sortAllChildren',
			'sortChildren',
			'updateChildrenDepth',
			'copyParentBodyToAllChildren',
			'attachParentBody',
			'deleteItem',
			'deleteItemDialogue',
			'tagItem',
			'prepareTag',
			'prepareDonePatch',
			'autoCalculateDoneState',
			'updateItemTagsDom',
			'moveItem',
			'flushDoneItems',
			'setDueDate',
			'updateChildrenDueDate',
			'formatDone',
			'setCancelThroughKeydown',
			'startEdit',
			'scrollToItemIfNeeded',
			'doneEdit',
			'cancelEdit',
			'cancelAddNew',
			'addNew',
			'checkFilteredItemsTree',
			'showChildren',
			'markDone',
			'indent',
			'unindent',
			'selectItem',
			'setToday',
			'showAddNewItem',
			'startEditTags',
			'stopPatching',
			'startPatching',
			'patchRootChildrenOrderWithFilter',
			'patch',
			'patchTag',
			'patchDueDate',
			'patchDone',
			'deleteItem',
			'deleteItemApi',
			'popup',
			'sendFlash',
			'popout',
			'addTimer',
			'fetchDone',
			'filterItems',
			'removeFilter',
			'postNewItem',
			'test',
			'alert',
	    ]),
	},
	http: {
		headers: {
			'X-CSRF-TOKEN': document.querySelector('#csrf-token').getAttribute('content'),
		},
    },
}
</script>

<style></style>
