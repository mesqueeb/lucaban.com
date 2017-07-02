<template>
<button
	class="o-btn c-floating-add-btn"
	@click="dispatch('showAddNewItem')"
>
	<q-icon name="ion-plus-circled" />
</button>
</template>

<script>
export default {
	data () { return {} },
	methods:
	{
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-floating-add-btn{
    color: $theme-color;
    background-color: white;
    font-size: 3em;
    height: 0.8em;
    border-radius: 1em !important;
    i{
        position: relative;
        top: -0.1em;
    }
}
</style>