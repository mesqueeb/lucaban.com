<template>
<div>
	<div id="bottom-hint"
		v-show="!get.itemAmount"
		v-if="get.mobile"
	>{{ get.text.guide.hints.addItemHint }}<br>➘</div>

	<div id="mobile-item-nav" v-if="get.mobile">
		<div class="playstation-controller"
			v-if="selection.view != 'journal'"
			v-show="get.itemAmount && selection.selectedId"
		>
			<button id=""
				@click="dispatch('unindent')"
				:class="{
					'o-btn':true,
					'u-disabled':(get.topLvlItems.includes(selection.selectedId))}"
				:disabled="get.topLvlItems.includes(selection.selectedId)"
			>
				<i class="zmdi zmdi-caret-left-circle"></i>
			</button>
			<div>
				<button id=""
					@click="dispatch('moveItem', {direction:'up'})"
					:class="{
						'o-btn':true,
						'u-disabled':(get.firstItem == selection.selectedId)}"
					:disabled="get.firstItem == selection.selectedId"
				>
					<i class="zmdi zmdi-caret-up-circle"></i>
				</button>
				<button id=""
					@click="dispatch('moveItem', {direction:'down'})"
					:class="{
						'o-btn':true,
						'u-disabled':(get.lastItems.includes(selection.selectedId))}"
					:disabled="get.lastItems.includes(selection.selectedId)"
				>
					<i class="zmdi zmdi-caret-down-circle"></i>
				</button>
			</div>
			<button id=""
				@click="dispatch('indent')"
				:class="{
					'o-btn':true,
					'u-disabled':(get.isFirstItem(selection.selectedId))}"
				:disabled="get.isFirstItem(selection.selectedId)"
			>
				<i class="zmdi zmdi-caret-right-circle"></i>
			</button>
		</div>
		<button class="o-btn" id="floating-add-btn" @click="dispatch('showAddNewItem')">
			<i class="zmdi zmdi-plus-circle"></i>
		</button>
	</div>
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
#mobile-item-nav{
    >div:first-child{    
        position: fixed;
        left: 1rem;
        bottom: 1rem;
        z-index: 4;
    }
    >button:last-child{
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 4;
    }
    color: $theme-color;
    button{
        background-color: white;
        font-size: 3em;
        height: 0.8em;
        border-radius: 1em !important;
        i{
            position: relative;
            top: -0.1em;
        }
    }
}
.playstation-controller{
    display: flex;
    align-items: center;
    button{
        margin: 2px 0;
    }
    >div{
        display: flex;
        flex-wrap: wrap;
        width: 2.5em;
    }
}
#bottom-hint{
    position: fixed;
    right: 4rem;
    bottom: 3rem;
    z-index: -1;
    text-align: right;
    font-size: 1.4rem;
    color: #acacac;
}
</style>