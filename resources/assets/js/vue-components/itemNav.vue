<template>
<div
	class="c-item-nav"
	v-if="
		basis.editingItem != item.id
		&& basis.editingItemTags != item.id
		&& basis.selection.selectedId == item.id"
>
	<button
		class="o-btn"
		v-if="basis.mobile && basis.selection.view != 'journal'"
		@click="basis.setToday({id:item.id})"
	>
		{{ basis.keybindings.setToday.name[l] }}
	</button>
	<button
		v-if="!item.done"
		class="o-btn c-item-nav__icon btn btn-dipclick"
		@click="basis.addTimer({item})"
	>
		<i class="zmdi zmdi-timer"></i>
	</button>
	<button
		class="o-btn c-item-nav__icon"
	>
		<i class="zmdi zmdi-more"></i>
		<q-popover ref="popover" class="o-popmenu">
		<!--
		  The DOM element(s)
		-->
		<div class="o-popmenu__body">
			<div
				class="o-popmenu__item"
				v-clipboard:copy="basis.$store.getters.clipboardText(item.id)"
				v-clipboard:success="clipboardSuccess"
				v-clipboard:error="clipboardError"
			>
				<div :class="{ 'u-color-success':copySuccess }" v-html="basis.keybindings.copyClipboard.popmenu[l]"></div>
				<div v-if="!basis.mobile"></div>
			</div>
			<div
				class="o-popmenu__item"
				v-if="basis.mobile && basis.selection.view != 'journal'"
				@click="basis.setToday({id:item.id}), $refs.popover.close()"
			>
				<div v-html="basis.keybindings.setToday.popmenu[l]"></div>
				<div v-if="!basis.mobile">{{ basis.keybindings.setToday[oS] }}</div>
			</div>
			<div
				class="o-popmenu__item"
				v-if="basis.mobile"
				@click="basis.startEdit({item}), $refs.popover.close()"
			>
				<div v-html="basis.keybindings.edit.popmenu[l]"></div>
				<div v-if="!basis.mobile">{{ basis.keybindings.edit[oS] }}</div>
			</div>
			<div
				class="o-popmenu__item"
				v-if="item.done"
				@click="basis.popup({ id:item.id, type:'afterDone' }), $refs.popover.close()"
			>
				<div>{{ basis.text.popups.journalNotes }}</div>
				<div v-if="!basis.mobile"></div>
			</div>
			<div
				class="o-popmenu__item"
				@click="basis.deleteItemDialogue({ id:item.id }), $refs.popover.close()"
			>
				<div><i class="zmdi zmdi-delete"></i> {{ basis.keybindings.delete.popmenu[l] }}</div>
				<div v-if="!basis.mobile">{{ basis.keybindings.delete[oS] }}</div>
			</div>
		</div>
		</q-popover>
	</button>
	<!--
	- font icon / woff format [font awesome]
	  material design iconic fonts
	- add svg as background to button
	- or image tag inside button
	- svg tag -> add as pattern
	-->
</div>
</template>
<script>
import Clipboard from 'clipboard';
export default{
	props:['item','clipboardTextJournal'],
	data(){
		return { copySuccess: false }
	},
	computed:
	{
		basis()
		{ if(!this.item){ return 0; }
			return this.$root;
		},
		l()
		{
			return this.$root.language;
		},
		oS()
		{
			return this.$root.oS;
		},
	},
	methods:
	{
		hello(){
			console.log('hello');
		},
		clipboardSuccess()
		{
			this.$store.dispatch('sendFlash', { type:'success', msg:this.$root.keybindings.copyClipboard.success[this.l] });
			this.copySuccess = true;
		},
		clipboardError()
		{
			this.$store.dispatch('sendFlash', { type:'error', msg:this.$root.keybindings.copyClipboard.error[this.l] });
		},
	},
}
</script>