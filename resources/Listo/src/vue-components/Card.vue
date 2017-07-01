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
		v-if="(item.id != state.editingItem && item.id != state.editingItemTags) || get.mobile"
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
				}"
			@dblclick="dblclick($event)"
			@click="selectItem"
		>
			<div
				:class="{ 'c-body-text': true,
					'c-body-text--project':isProject,
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
</style>