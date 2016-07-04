<html>
<head>
	<meta charset="UTF-8">
	<title>Playground</title>

	
</head>
<body>

<div id="app">
	<div v-for='plan in plans'>
		<plan :plan='plan'></plan>
	</div>

	@{{ $data | json }}

</div>

<template id="plan-temp">
	<span >@{{ plan.name }}</span>
	<span>@{{ plan.price }}/month</span>
	<button @click='setActivePlan'>upgrade</button>
</template>

<script src="http://cdn.jsdelivr.net/vue/1.0.26/vue.js"></script>
<script>
	var data = {
		plans: [
			{ name: 'Enterprise', price:100},
			{ name: 'Pro', price:50},
			{ name: 'Personal', price:10},
			{ name: 'Free', price:0},
		],
	}
	new Vue({
		el: '#app',
		data: data,
		components: {
			plan: {
				template: '#plan-temp',
				props:['plan'],
				data:function () {
					return {
						active:false,
					};
				},
				methods: {
					setActivePlan: function	(){
						this.active = this.plan;
					}
				},
			}
		}
	});
</script>
</body>
</html>