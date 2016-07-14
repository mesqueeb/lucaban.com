<div id="app">
	<div v-for="plan in plans　| orderBy 'price' | limitBy 4">
		<plan :plan='plan' :active.sync='active'></plan>
	</div>
</div>

<template id="plan-temp">
	<span >@{{ plan.name | uppercase }}</span>
	<span>   @{{ plan.price | currency '¥' 0 }}   /   month</span>
	<button @click='setActivePlan' v-show='plan.name !== active.name'>
		@{{ isUpgrade ? 'Upgrade' : 'dg' }}
	</button>
	<span v-else>
		√
	</span>
</template>
