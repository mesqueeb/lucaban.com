<div id="loading-icon">
	<div class="loader loader--style1" title="loading" alt="Loading"
		v-show="patching || loading"
	>
		@include('components.svg_loader')
	</div>
	<div class="patching-error" v-show="patching == 'error'" v-cloak>Error!</div>
</div>