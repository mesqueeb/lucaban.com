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
	v-if="listIsEmpty"
>

	<div
		class="c-section-head"
		v-if="journalDate && item.journalDate"
	>
		<!-- Codementor: Is this the correct way to format something like this? -->
		<span>{{ customCalendar(journalDate) }}</span>
		<span class="c-section-head__subtitle" v-if="journalDate != customCalendar(journalDate)">
			{{ journalDate }}
		</span>
		<button
			class="o-btn ml-auto"
			v-btn-effect
			v-clipboard:copy="get.clipboardTextJournal(item)"
			v-clipboard:success="dispatch('clipboardSuccess')"
			v-clipboard:error="dispatch('clipboardError')"
			v-if="true"
		>
			{{ get.text.card.copy }}
		</button>
		<div class="w-100 d-flex" v-if="sec_to_hourmin(get.totalUsedSec(item))">
			<span class="c-journal-used-time">{{ get.text.menu.usedTime }}: </span>
			<span class="o-pill--used-time">{{ sec_to_hourmin(get.totalUsedSec(item)) }}</span>
		</div>
	</div>
		<!-- v-if="journalView && item.depth != 0 && item.parents_bodies" -->
	<div
		class="c-subsection-head"
		v-if="journalParentString"
		@click="selectItem"
	>
		<div class="c-subsection-head__text">
			{{ journalParentString }}
		</div>
	</div>
	<div 
		v-if="item.depth != 0 && !(journalView && journalDate)"
		v-show="item.id != state.editingItem || get.mobile"
		:id="'item-body-'+item.id"
		:class="{
			'c-item-card': true,
			'show_children': item.show_children,
		}"
	>
		<!-- _|ITEM-TOGGLES -->
		<Item-Toggles :item="item"></Item-Toggles>
		<!-- ITEM-TOGGLES|_ -->
		<div
			:class="{
				'c-body-div':true,
				'textarea-wrap':true,
				'u-selected': item.id == state.selection.selectedId,
				'c-body-div--updating-tags': item.id == state.editingItemTags
				}"
			@dblclick="dblclick($event)"
			@click="selectItem"
		>
			<div
				:class="{ 'c-body-text': true,
					'js-body-text': true,
					'c-body-text--project':isProject,
					'c-body-text--updating-tags': item.id == state.editingItemTags
					}"
			>
				<div :class="{
					'u-lightgray':item.temp,
					'c-body-text--done': item.done
					}"
				>{{ item.body }}</div>
				<div class="l-completion-notes c-completion-notes bodybox"
					v-if="item.completion_memo"
					@click="selectItem"
				>{{ item.completion_memo }}</div>
			</div>

			<!-- For debugging: -->
			<span v-if="state.debug" class="d-inline-flex">
				({{item.id}}) D-{{item.depth}})
				<span v-if="item.children_order.length">[{{item.children_order}}]</span>
			</span>
			<!-- // For debugging: -->
			
			<Item-Add-Tag v-if="item.id == state.editingItemTags" :item="item"></Item-Add-Tag>
			<Item-Tags-Strip v-if="item.id != state.editingItem" :item="item" style="padding:0.2em"></Item-Tags-Strip>
			<Item-Nav :item="item"></Item-Nav>
		</div>
	</div>
	<Item-Edit-Add-Wrapper :item="item"></Item-Edit-Add-Wrapper>
	<!-- _|CHILDREN -->
	<div
		class="l-children"
		v-if="item.children.length"
		v-show="item.show_children"
	>
		<!-- :style="(state.addingNewAsFirstChild)?'order:3;':''" -->
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
	</div>
	<!-- CHILDREN|_ -->

</div>
</div>
</template>
<script>
import { format } from 'date-fns/esm'
import { customCalendar, sec_to_hourmin } from '../helpers/valueMorphers2.js';
// import flatPickConfig from '../components/flatPickrOptions.js';
import { uniq, Utilities } from '../helpers/globalFunctions.js';
import Clipboard from 'clipboard';
import ItemNav from './ItemNav.vue';
import ItemToggles from './ItemToggles.vue';
import ItemEditAddWrapper from './ItemEditAddWrapper.vue';
import ItemEditAddBox from './ItemEditAddBox.vue';
import ItemAddTag from './ItemAddTag.vue';
import ItemTagsStrip from './ItemTagsStrip.vue';

export default {
	name: 'Card',
	template:'#items-card-template',
	props: ['item'],
	components: {
		ItemNav, ItemToggles, ItemEditAddWrapper, ItemEditAddBox, ItemTagsStrip, ItemAddTag
	},
	data(){ return {} },
	mounted()
	{
		// this.convertbodyURLtoHTML();
		if (this.listIsEmpty){ this.commit( 'updateState', { addingNewEmptyList:true }); }
	},
	computed: {
		id(){ return this.item.id },
 /* \ ============================================== / *\
| ◉  |	FROM THE STORE 								|  ◉ |
 \* / ============================================== \ */
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		l(){ return this.get.language },
		visibleDirectChildren(){ return this.get.visibleDirectChildren(this.id) },
		childrenOrder(){ return this.get.childrenOrder(this.id) },
		isProject(){ return this.get.isProject(this.id) },
		journalDate(){ return this.get.journalDate(this.item) },
		tagsArray(){ return this.get.tagsArray(this.id) },
		parentTags(){ return this.get.tagsArray(this.item.parent_id) },
/* \ ============================================== / *\
\* / ============================================== \ */
		listIsEmpty()
		{
			if (!this.item || !this.state.root){ return false; }
			if (this.item.id != this.state.root.id){ return false; }
			if (!this.visibleDirectChildren.length){ return true; }
		},
		showAddNewBox()
		{
			return ((this.state.addingNewUnder == this.item.id)
				|| (this.listIsEmpty && !this.mobile && this.state.selection.view != 'journal'));
		},
		journalView()
		{ if (!this.item){ return; }
			if (this.state.selection.view == 'journal'){
				return true;
			} else { return false; }
		},
		journalParentString()
		{ if (!this.item){ return; }
			// console.log('run on '+this.item.id+' - '+this.item.body);
			if (this.state.selection.view != 'journal'){ return false; }
			if (this.journalView && !this.item.journalDate){
				if (this.item.depth == 0){ return; }
				let prevId = this.visiblePrevItemId;
				let parentString = this.item.parents_bodies;
				if (!this.state.nodes[prevId]){ return; }
				let prevParentString = this.state.nodes[prevId].parents_bodies;

				let prevDoneDate = this.state.nodes[prevId].done_date;
				prevDoneDate = format(new Date(prevDoneDate), 'YYYY/MM/DD');
				let thisDoneDate = format(new Date(this.item.done_date), 'YYYY/MM/DD');

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
			if (!parentId || this.state.nodes[parentId]){ return; }
			
			let index = this.get.childrenOrder(parentId).indexOf(this.item.id);
			if (index == 0){ return this.state.root.id; }
			let prevId = this.get.childrenOrder(parentId)[index-1];
			// if(prevId != this.get.prevItemId(this.item.id))
			// {
			// 	console.info(`getters.prevItemId(${this.item.id}) != visiblePrevItemId
			// 		visiblePrevItemId = ${prevId}
			// 		prevItemId = ${this.get.prevItemId(this.item.id)}
			// 		`);
			// }
			return prevId;
		},
	},
	methods: {
		customCalendar,
		sec_to_hourmin,
		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },
		
		selectItem(){ this.dispatch('selectItem', {id:this.item.id}) },
		dblclick(e)
		{
			if (e.target.nodeName == 'I' || e.target.nodeName == 'BUTTON'){ return; }
			this.dispatch('startEdit', {item:this.item});
		},
		// convertbodyURLtoHTML()
		// {
		// 	// console.log('converting');
		// 	if (!this.item || this.item.depth == 0){ return; }
		// 	let bodyboxQS = '#'+this.$el.id+' .js-body-text';
		// 	let a = document.querySelector(bodyboxQS);
		// 	if (!a || !a.innerHTML.includes('a href')){ return; }
		// 	a.innerHTML = a.innerHTML.replace("&lt;a href=", "<a href=").replace('target="_blank"&gt;','target="_blank">').replace("&lt;/a&gt;","</a>");
		// },
	},
}
</script>
<style lang="scss">
@import '../css/_variables.scss';
.l-children{
    width: 100%;
}
.l-children .l-children{
    margin-left: 2em;
}
.c-item-card{
    width: 100%;
    margin: 0 0 0 0;
    display: flex;
    align-items: center;
}
.c-section-head{
    border-top: 1px solid #ededed;
    color: #46c5b6;
    font-size: 1.2em;
    text-align: left;
    padding: 0.5em 0;
    margin-top: 0.7em;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: baseline;
}
.c-section-head__subtitle{
    color: #dadada;
    font-size: 0.8em;
    margin-left: 0.5em;
}
.c-subsection-head{
    margin-bottom: 1px;
}
.c-subsection-head__text{
    border: 1px solid;
    display: initial;
    padding: 0em 0.5em;
    border-top: none;
    border-left: none;
}
.c-body-div{
    border-bottom: thin solid $border-gray;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0.3em;
	&--updating-tags{
	    flex-wrap: wrap;
	    background: none;
	    border-bottom: thin solid rgba(245, 215, 110, 0.7);
	}
}
.c-body-text{
    padding: 0.2em;
    display: inline-block;
    white-space: pre-line;
    word-break: break-word;
    display: flex;
    flex-direction: column;
	&--project{
	    font-weight: 600;
	}
	&--updating-tags{
	    width: 100%;
	    background: $selection-color;
	}
	&--done{
	    color: $gray;
	    text-decoration: line-through;
	}
}
.c-journal-used-time{
    @include text-settings();
    margin-right: 0.3em;
}
.l-completion-notes{
    padding: 2px 0 0 2em;
    width: 100%;
}
.c-completion-notes{
    color: #a2999a;
    background: none !important;
}
.journal-wrapper {
    >div>.l-children>div:first-child .c-section-head {
        border-top: none;
        margin-top: 0;
    }
    .l-children {
        margin-left: 0;
    }
    .c-item-card {
        align-items: baseline;
    }
    .c-body-text--done{
        color: inherit;
        text-decoration: none;
    }
    .c-body-div{
        border-bottom:none;
    }
    .c-completion-notes {
        color: #a2999a;
        padding: 2px 0 0 2em;
    }
}

</style>