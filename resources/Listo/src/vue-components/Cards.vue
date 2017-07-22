<template>
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
	<!-- _|CHILDREN -->
	<div
		class="l-children"
		v-if="item.children.length"
		v-show="item.show_children"
	>
		<Card
			v-if="state.selection.view != 'journal'"
			v-for="childCard in get.filteredItemsTree"
			:item="childCard"
			:key="childCard.id"
		></Card>
		<Journal-Day
			v-if="state.selection.view == 'journal'"
			v-for="childCard in get.filteredItemsJournal"
			:day="childCard"
		></Journal-Day>
	</div>
	<!-- CHILDREN|_ -->
	<Add-Item-Tease
		v-if="state.addingNewUnder != state.root.id && !listIsEmpty || (listIsEmpty && get.mobile)"
	></Add-Item-Tease>
	<Item-Edit-Add-Wrapper :item="item"></Item-Edit-Add-Wrapper>

</div>
</div>
</template>
<script>
import ItemEditAddWrapper from './ItemEditAddWrapper.vue'
import AddItemTease from './AddItemTease.vue'
import JournalDay from './JournalDay.vue'
import Card from './Card.vue'

export default {
	props: ['item'],
	components: {
		ItemEditAddWrapper, JournalDay, Card, AddItemTease
	},
	data(){ return {} },
	computed: {
		id(){ return this.item.id },
 /* \ ============================================== / *\
| ◉  |	FROM THE STORE 								|  ◉ |
 \* / ============================================== \ */
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
/* \ ============================================== / *\
\* / ============================================== \ */
		listIsEmpty()
		{
			if (!this.get.filteredItemsTree.length){ return true; }
		},
		showingEditAddBox()
		{
			return ((this.state.addingNewUnder == this.item.id)
				|| (this.listIsEmpty && !this.mobile && this.state.selection.view != 'journal'));
		},
	},
	methods: {
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
	},
}
</script>
<style lang="scss">
.l-children{
    width: 100%;
}
.journal-wrapper {
    .l-children {
        margin-left: 0;
    }
}
</style>