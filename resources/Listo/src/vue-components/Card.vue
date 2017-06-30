<template id="items-card-template">
<div
	v-if="item || listIsEmpty"
	:id="'card-'+item.id"
	:class="{
		'items-card': true,
		'journal-wrapper': state.selection.view == 'journal'
	}"
>
<!-- item-card-wrapper -->
<div 
	class="d-flex flex-wrap"
>
	<div
		class="c-subsection-head"
		v-if="journalParentString && state.selection.view == 'journal'"
		@click="selectItem"
	>
		<div class="c-subsection-head__text">
			{{ journalParentString }}
		</div>
	</div>
	<div 
		v-if="item.depth != 0"
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
					'u-lightgray':(item.temp && get.loggedIn),
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
			v-if="state.selection.view != 'journal'"
			v-for="childCard in visibleDirectChildren"
			:item="childCard"
			:key="childCard.id"
		></Card>
	</div>
	<!-- CHILDREN|_ -->

</div>
</div>
</template>
<script>
import ItemNav from './ItemNav.vue';
import ItemToggles from './ItemToggles.vue';
import ItemEditAddWrapper from './ItemEditAddWrapper.vue';
import ItemAddTag from './ItemAddTag.vue';
import ItemTagsStrip from './ItemTagsStrip.vue';
import JournalDay from './JournalDay.vue';

export default {
	name: 'Card',
	template:'#items-card-template',
	props: ['item'],
	components: {
		ItemNav, ItemToggles, ItemEditAddWrapper, ItemTagsStrip, ItemAddTag, JournalDay
	},
	data(){ return {} },
	computed: {
		id(){ return this.item.id },
 /* \ ============================================== / *\
| ◉  |	FROM THE STORE 								|  ◉ |
 \* / ============================================== \ */
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		visibleDirectChildren(){ return this.get.visibleDirectChildren(this.id) },
		isProject(){ return this.get.isProject(this.id) },
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
		journalParentString()
		{
			return this.item.parents_bodies;
			// console.log('run on '+this.item.id+' - '+this.item.body);
			if (this.state.selection.view != 'journal'){ return false; }
			if (this.journalView && !this.item.journalDate){
				if (this.item.depth == 0){ return; }
				let prevId = null;
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
	},
	methods: {
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
.l-completion-notes{
    padding: 2px 0 0 2em;
    width: 100%;
}
.c-completion-notes{
    color: #a2999a;
    background: none !important;
}
.journal-wrapper {
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
</style>