<template>
<div
	class="c-item-nav"
	v-if="
		state.editingItem != item.id
		&& state.editingItemTags != item.id
		&& state.selection.selectedId == item.id"
>
	<button
		class="o-btn"
		v-if="get.mobile && state.selection.view != 'journal'"
		@click="dispatch('setToday',{id:item.id})"
	>
		{{ state.keybindings.setToday.name[l] }}
	</button>
	<button
		v-if="!item.done"
		class="o-btn c-item-nav__icon btn btn-dipclick"
		@click="dispatch('addTimer',{id:item.id})"
	>
		<i class="zmdi zmdi-timer"></i>
	</button>
	<button
		class="o-btn c-item-nav__icon"
	>
		<i class="zmdi zmdi-more"></i>
		<q-popover ref="popover" class="o-popmenu" anchor="bottom right" self="top right">
		<!--
		  The DOM element(s)
		-->
		<div class="o-popmenu__body">
			<div
				class="o-popmenu__item"
				v-clipboard:copy="get.clipboardText(item.id)"
				v-clipboard:success="clipboardSuccess"
				v-clipboard:error="clipboardError"
			>
				<div :class="{ 'u-color-success':copySuccess }" v-html="state.keybindings.copyClipboard.popmenu[l]"></div>
				<div v-if="!get.mobile"></div>
			</div>
			<div
				class="o-popmenu__item"
				v-if="get.mobile"
				@click="dispatch('startEdit', {item}), $refs.popover.close()"
			>
				<div v-html="state.keybindings.edit.popmenu[l]"></div>
				<div v-if="!get.mobile" v-html="stringToKeyboardKeys(state.keybindings.edit[oS])"></div>
			</div>
			<div
				class="o-popmenu__item"
				v-if="item.done"
				@click="dispatch('popup', { id:item.id, type:'afterDone' }), $refs.popover.close()"
			>
				<div>{{ get.text.popups.journalNotes }}</div>
				<div v-if="!get.mobile"></div>
			</div>
			<div
				class="o-popmenu__item"
				v-if="state.selection.view != 'journal'"
				@click="dispatch('setToday', {id:item.id}), $refs.popover.close()"
			>
				<div v-html="state.keybindings.setToday.popmenu[l]"></div>
				<div v-if="!get.mobile" v-html="stringToKeyboardKeys(state.keybindings.setToday[oS])"></div>
			</div>
			<div
				class="o-popmenu__item"
				@click="dispatch('deleteItemDialogue', { id:item.id }), $refs.popover.close()"
			>
				<div><i class="zmdi zmdi-delete"></i> {{ state.keybindings.delete.popmenu[l] }}</div>
				<div v-if="!get.mobile" v-html="stringToKeyboardKeys(state.keybindings.delete[oS])"></div>
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
import {stringToKeyboardKeys} from '../helpers/globalFunctions.js'
export default{
	name: 'itemNav',
	props: ['item','clipboardTextJournal'],
	data(){
		return { copySuccess: false }
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		l(){ return this.get.language },
		oS(){ return this.get.oS },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },
		stringToKeyboardKeys,
		hello(){
			console.log('hello');
		},
		clipboardSuccess()
		{
			this.dispatch('sendFlash', { type:'success', msg:this.state.keybindings.copyClipboard.success[this.l] });
			this.copySuccess = true;
		},
		clipboardError()
		{
			this.dispatch('sendFlash', { type:'error', msg:this.state.keybindings.copyClipboard.error[this.l] });
		},
	},
}
</script>
<style lang="scss">
// @import '../css/_variables.scss';
.c-item-nav{
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.c-item-nav button{
    margin: 0.3rem 0.5rem;
}
.c-item-nav__icon{
    font-size: 1.5em;
}
.c-item-nav__delete{
    color: rgba(231, 76, 60, 0.3);
}
</style>