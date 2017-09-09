<template>
<div
	:class="['full-width',{'order-last':(showAddNewBox && !state.addingNewAsChild)}]"
>
	<div class="c-popouts-mask js-popouts-mask"
		v-if="get.mobile && (showEditBox || showAddNewBox)"
		@click="clickOnEditOrAddCurtain($event)"
	></div>
		<!-- v-if="(showEditBox || showAddNewBox) && !get.mobile" -->
	<div
		v-if="(showEditBox || showAddNewBox) && get.mobile"
		:class="['c-item-card', 
				{ 'c-editadd-wrapper--child':state.addingNewAsChild }]"
	>
<!-- 
		<Item-Toggles v-if="showEditBox" :item="item"></Item-Toggles>
		<span 		  v-if="showEditBox" class="c-mobile-toggle-preview__body">Editing item...</span>
 -->
		<Item-Toggles v-if="showAddNewBox" :item="state.newItem"></Item-Toggles>
		<div class="c-body-div textarea-wrap u-selected" v-if="showAddNewBox">
			<div class="c-body-text">{{ get.text.card.addingNewItem }}</div>
		</div>
		<!-- <span 		   class="c-mobile-toggle-preview__body">Adding new item...</span> -->
	</div>
	<div
		v-if="(showEditBox || showAddNewBox)"
		:style="style"
		:class="['c-editadd-wrapper', {
			'c-editadd-wrapper--child':state.addingNewAsChild && !get.mobile,
			'c-editadd-wrapper--mobile':get.mobile,
			'shadow-5':get.mobile,
			}]"
	>
		<Item-Toggles v-if="showEditBox && !get.mobile" :item="item"></Item-Toggles>
		<Item-Edit-Add-Box v-if="showEditBox" :item="item"></Item-Edit-Add-Box>

		<Item-Toggles v-if="showAddNewBox && !get.mobile" :item="state.newItem"></Item-Toggles>
		<Item-Edit-Add-Box v-if="showAddNewBox" :item="state.newItem"></Item-Edit-Add-Box>
	</div>

<!-- 	<q-modal :ref="'edit-item-modal-'+item.id" class="absolute-full" position="top" @close="dispatch('doneEditOrCancelNew')">
		<div v-if="get.mobile">
			<Item-Edit-Add-Box v-if="showEditBox" :item="item"></Item-Edit-Add-Box>
		</div>
	</q-modal> -->
</div>

</template>

<script>
import ItemToggles from './ItemToggles.vue'
import ItemEditAddBox from './ItemEditAddBox.vue'
export default {
	props: ['item'],
	components: {
		ItemToggles, ItemEditAddBox,
	},
	data () {
		return {}
	},
	mounted()
	{
		// console.log(`Mounted: ${this.item.id}`);
		if (!store.$refs)
		{
			store.$refs = {};
		}
		store.$refs = Object.assign(store.$refs, this.$refs);
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		showAddNewBox()
		{
			return   ( this.state.addingNewUnder
					&& this.state.addingNewUnder == this.item.id);
		},
		showEditBox()
		{
			return (this.state.editingItem
					&& this.item.id == this.state.editingItem)
				|| (this.state.editingItemTags
					&& this.item.id == this.state.editingItemTags);
		},
		style()
		{
			let d = itemGetters[this.item.id].relativeDepth;
			let x = (d && d>0) ? d*1.8 : 0;
				x = x+1;
			let s = `width: 100vw !important;
					 margin-left: -${x}rem !important;`
			return (this.get.mobile) ? s : '';
		},
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		clickOnEditOrAddCurtain(event)
		{
			if (!this.get.mobile){ return; }
			if (event && !event.srcElement.className.includes('js-popouts-mask')){ return; }
			this.dispatch('doneEditOrCancelNew');
		},
	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-editadd-wrapper{
	margin-top: 0.3em;
    display: flex;
    align-items: baseline;
    z-index: 100;
    position: relative;
    background-color: white;
	&--child{
	    margin-left: 1.8em;
	}
	&--mobile{
		border-top: thin solid $light-gray;
		margin-bottom: 0.5em;		
	}
}
.c-mobile-toggle-preview{
	// padding-top: 0.3em;
	// padding-bottom: 0.3em;
	// display: flex;
	// align-items: center;
}
.c-mobile-toggle-preview__body{
	// padding:0.3em;
}
</style>
