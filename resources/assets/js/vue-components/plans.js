var data = {
	plans: [
		{ name: 'Enterprise', price:100},
		{ name: 'Pro', price:50},
		{ name: 'Personal', price:10},
		{ name: 'Free', price:0},
	],
	active: {},
};
new Vue({
	el: '#app',
	data: data,
	components: {
		plan: {
			template: '#plan-temp',
			props:['plan','active'],
			computed:{
				isUpgrade: function(){
					return this.plan.price > this.active.price;
				}
			},
			methods: {
				setActivePlan: function	(){
					this.active = this.plan;
				}
			},
		}
	}
});