<template>
<div :class="{'c-spinner__wrapper':true, 'c-spinner--fullscreen':state.loading}">
	<div class="c-spinner__svg-wrapper" title="loading" alt="Loading"
		v-show="state.patching || state.loading"
	>
		<q-spinner-oval class="c-spinner" size="2.5rem" />
	</div>
	<div class="c-spinner__patching-error" v-show="state.patching == 'error'" v-cloak>Error!</div>
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
.c-spinner__wrapper{
    z-index: 6;
    position: fixed;
    right: 1em;
    top: 1em;
}
.c-spinner{
	color: $theme-color;
}
.c-spinner__patching-error{
    color: rgba(230, 94, 77, 1);
    font-weight: 600;
}
.c-spinner--fullscreen {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
	svg{
		width:50vw;
		height:auto;
	}
}
</style>
