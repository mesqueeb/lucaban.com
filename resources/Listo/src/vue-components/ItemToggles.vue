<template>
	<div>
		<div
			v-if="state.selection.view != 'journal'"
			:class="{'o-toggle-div':true,
				'l-toggle-div':true,
				'o-toggle-div--both':item.children_order.length>0
					&&(item.done == true || allChildrenAreDone )
			}"
		>
			<input
				type="checkbox"
				class="o-toggle__arrow-helper"
				:id="'show_children_'+item.id"
				v-model="item.show_children"
				@change="dispatch('patch',{ id:item.id, field:'show_children' })"
			>
			<label
				class="o-toggle__arrow"
				:for="'show_children_'+item.id"
				v-if="item.children_order.length>0"
			></label>
			<input
				class="o-toggle__check"
				type="checkbox"
				v-if="item.children_order.length==0
					|| item.done == true || allChildrenAreDone"
				v-model="item.done"
				@click="dispatch('prepareDonePatch',{ id:item.id })"
			>
				<!-- 
				@change="test('change')"
				TODO (codementor)
				@change doesn't get run when having this:
				ITEM (tag: 'a')
					ITEM
					⤷　click on this item's togglebox to mark done.
						In the case that the list is filtered on tag 'a', the item disappears before the @change is applied...
				-->
		</div>
		<div
			class=""
			v-if="state.selection.view == 'journal'"
		></div>
	</div>
</template>
<script>
export default {
	name: 'itemToggles',
	props: ['item'],
	computed:
	{
		state(){ return this.$store.state },
		get(){ return this.$store.getters },
		allChildrenAreDone(){ return itemGetters[this.item.id].allChildrenAreDone },
	},
	methods:
	{
		// commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		test(val){ 
			Vue.nextTick(function ()
			{
				console.log('it works!');
			});
		},
	},
}
</script>
<style lang="scss">
// @import '../css/_variables.scss';
.l-toggle-div{
    margin-right: 0.3em;
}
.o-toggle-div{
    display: flex;
}
.o-toggle__check{
    height: auto;
    width: 1.6em;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none !important;
    background-color: transparent !important;
    margin-top: 0 !important;
}
.o-toggle__check:after{
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 104 104" ><circle cx="50" cy="50" r="50" fill="none" stroke="#ababab" stroke-width="3"/></svg>');
}
.o-toggle__check:checked:after{
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 104 104"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
}
.o-toggle__arrow-helper{
    display: none; 
    cursor: pointer;
}
.o-toggle__arrow-helper + .o-toggle__arrow:before{
    position: absolute;
    content: "";
    display: block;
    top: 25%;
    left: 30%;
    border-left: black 1px solid;
    border-bottom: black 1px solid;
    transform: rotateZ(-135deg);
    width: 0.5em;
    height: 0.5em;
    transition: transform 0.3s ease-in-out;
}
.o-toggle__arrow-helper:checked + .o-toggle__arrow:before{
    transform: rotateZ(-45deg);
}
.o-toggle__arrow{
  display: block;
  position: relative;
  height: 1.6em;
  width: 1.6em;
  cursor: pointer;
}
.o-toggle-div--both{
    margin-left: -1.5em;
    .o-toggle__check{
        margin-left: 0.4em;
    }
    .o-toggle__arrow{
        margin-top: 0.1em;
        margin-left: 0.1em;
        margin-right: -0.5em;
    }
}
</style>