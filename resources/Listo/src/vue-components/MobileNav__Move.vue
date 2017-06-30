<template>
<div class="playstation-controller">
	<button id=""
		@click="dispatch('unindent')"
		:class="{
			'o-btn':true,
			'u-disabled':(get.filteredIdsTree.includes(selection.selectedId))}"
		:disabled="get.filteredIdsTree.includes(selection.selectedId)"
	>
		<q-icon name="ion-android-arrow-dropleft-circle" />
	</button>
	<div>
		<button id=""
			@click="dispatch('moveItem', {direction:'up'})"
			:class="{
				'o-btn':true,
				'u-disabled':(get.firstItem == selection.selectedId)}"
			:disabled="get.firstItem == selection.selectedId"
		>
			<q-icon name="ion-android-arrow-dropup-circle" />
		</button>
		<button id=""
			@click="dispatch('moveItem', {direction:'down'})"
			:class="{
				'o-btn':true,
				'u-disabled':(get.lastItems.includes(selection.selectedId))}"
			:disabled="get.lastItems.includes(selection.selectedId)"
		>
			<q-icon name="ion-android-arrow-dropdown-circle" />
		</button>
	</div>
	<button id=""
		@click="dispatch('indent')"
		:class="{
			'o-btn':true,
			'u-disabled':(get.isFirstItem(selection.selectedId))}"
		:disabled="get.isFirstItem(selection.selectedId)"
	>
		<q-icon name="ion-android-arrow-dropright-circle" />
	</button>
</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		selection(){ return this.state.selection },
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
.playstation-controller{
    color: $theme-color;
    display: flex;
    align-items: center;
    button{
        margin: 2px 0;
        background-color: white;
        font-size: 3em;
        height: 0.8em;
        border-radius: 1em !important;
        i{
            position: relative;
            top: -0.1em;
        }
    }
    >div{
        display: flex;
        flex-wrap: wrap;
        width: 2.5em;
    }
}
</style>