<form method="POST" action="/post/1">
	{{ csrf_field()	}}
	<input type="text" name="body">
	<button type="submit"></button>
</form>

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