<div id="alerts-app">
	<alert type='success'>Sucsex!</alert>
	<alert type='error'>Yarr!</alert>
</div>

<template id="alerts-template">
	<div :class="alertClasses"
		v-show='show'
	>
		<slot></slot>
		<button class="alert__close"
			@click="show = false"
		>
			X
		</button>
	</div>
</template>