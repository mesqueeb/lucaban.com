<template>
<div class="c-add-tag__wrapper">
	<label>{{ text.card.addTag }}
		<input
			class="c-add-tag__input js-add-tag"
			v-model="state.newTag" placeholder="..."
			@blur="dispatch('blurOnEditOrAdd', { field:'add-tag' })"
			@keydown.esc="dispatch('cancelEditOrAdd')"
			@keydown.enter.prevent="addTag"
			@keydown.up="arrow('up',$event)"
			@keydown.down="arrow('down',$event)"
			@keydown.tab="tab($event)"
			type="text" v-autowidth v-focus="state.editingItemTags"
		>
	</label>
</div>
</template>

<script>
export default {
	props:['item'],
	data () {
		return {}
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		text(){ return this.get.text },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		addTag()
		{
			preventKeydownListener();
			if (this.state.newTag){ this.state.newTag = this.state.newTag.trim() }
			if (!this.state.newTag){ this.commit('updateState', { editingItemTags:null }); return; }
			if (this.item.newItem)
			{
				this.dispatch('prepareTag');
				return;
			}
			this.dispatch('tagItem', { id:this.item.id, tags:this.state.newTag });
		},
		tab(e)
		{
			if (this.state.editingItemTags && e.shiftKey){
				e.preventDefault();
			}
		},
		arrow(direction, e)
		{
			if (this.state.newTag){ return; }
			e.preventDefault();
			if (this.state.editingItemTags)
			{
	    		this.commit('updateState', { editingItemTags:null });
        		return;
        	}
			if (direction == 'up'){ this.up(e); }
			if (direction == 'down'){ this.down(e); }
		},
		up(e)
		{
			if(this.store.editingItemTags){ return; }
			this.dispatch('focusElement',{ el:'.js-update-planned-time__button' })
		},
		down(e)
		{
			if(this.store.editingItemTags){ return; }
			if (this.item.newItem && !this.state.newTag)
			{
	        	this.dispatch('cancelEditOrAdd');
	        	return;
			}
			this.dispatch('focusElement',{ el:'.js-edit-body' })
		},
	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-add-tag__wrapper>label {
    display: flex;
    align-items: baseline;
    // font-size: 0.85em;
    // margin-left: 0.3em;
}
// .c-add-tag__wrapper--mobile{
// 	& label:first-child{
// 	    margin: 0;
// 	    font-size: 14px;
// 	}
//     span{
//         font-size: 16px;
//     }
// }
.c-add-tag__input{
    // @include pill($theme-color);
    border-bottom: thin solid $theme-color;
    margin: 0 0.3em;
    min-width: 2em;
    outline: 0px !important;
    // font-size: 0.6rem !important;
    // font-size: 1em !important;
    // padding: 0.5em;
}
.c-add-tag__input::-webkit-input-placeholder {
    color: white;
}
</style>