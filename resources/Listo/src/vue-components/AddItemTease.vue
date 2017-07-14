<template>
<div class="c-addtease-wrapper__outer">
<div class="c-addtease-wrapper">
	<div
		:class="[
			'c-addteasebox__body',
			{'c-addteasebox__body--mobile':(mobile)}]"
	>
		{{ text.card.addNew }}
	</div>
</div>
<div class="c-addteasebox__cloak" @click="dispatch('showAddNewItem', {id:state.root.id})"></div>
</div>
</template>

<script>
export default {
	data () { return {} },
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		text(){ return this.get.text },
		mobile(){ return this.get.mobile },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-addteasebox__cloak{
	width: 100%;
    height: 3em;
    position: relative;
    margin-top: -2.5em;
    background: rgba(255, 255, 255, 0.60);
    cursor: pointer;
    &:hover{
	    background: rgba(255, 255, 255, 0.20);
    }
}
.c-addtease-wrapper__outer{
	width: 100%;
	margin-top: 0.3em;
}
.c-addtease-wrapper{
	width: 100%;
	margin-top: 0.3em;
    display: flex;
    align-items: center;
    padding-left: 2em;
}
.c-addteasebox__body{
	width: 100%;
    padding: 0.3em;
    border-bottom: $border-gray solid thin;
}
</style>