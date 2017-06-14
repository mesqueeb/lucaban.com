<template>
<div :class="{'c-spinner':true, 'c-spinner--fullscreen':state.loading}">
	<div class="c-spinner__svg-wrapper" title="loading" alt="Loading"
		v-show="state.patching || state.loading"
	>
	<!-- _|LOADER__SVG -->
		<svg version="1.1"
			id="loader-1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px" y="0px"
			viewBox="0 0 40 40"
			nable-background="new 0 0 40 40"
			xml:space="preserve"
		>
			<path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
			s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
			c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
			<path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
			C22.32,8.481,24.301,9.057,26.013,10.047z">
			<animateTransform attributeType="xml"
				attributeName="transform"
				type="rotate"
				from="0 20 20"
				to="360 20 20"
				dur="0.5s"
				repeatCount="indefinite"
			/>
			</path>
		</svg>
		<!-- LOADER__SVG|_ -->
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
.c-spinner{
    z-index: 6;
    position: fixed;
    right: 1em;
    top: 1em;
}
.c-spinner__svg-wrapper{
	svg{
		width:40px;
		height:40px;
	}
    svg path,
    svg rect{
      fill: $theme-color !important;
    }
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
