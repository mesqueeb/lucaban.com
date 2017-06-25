<template>
<!-- root node required -->
<div>		
	<div class="layout-padding">
		<form action="" @submit.prevent="login">
			<div class="field">
				<label class="label">Email Address</label>
				<p class="control">
					<input required
						class="full-width input"
						type="email"
						v-model.trim="email"
					>
						<!-- @input="$v.name.$touch()" -->
				</p>
			</div>
			<div class="floating-label field">
				<label class="label">Password</label>
				<p class="control">
					<input required
						class="full-width input"
						type="password"
						v-model.trim="password"
					>
						<!-- @input="$v.name.$touch()" -->
				</p>
			</div>
			<q-btn loader @click="login" class="button is-primary" type="submit">
				Login
				<q-spinner-oval slot="loading" size="20px" />
			</q-btn>
<!-- 			
			<button class="button is-primary" type="submit"
				@click="login"
			>Login</button>
 -->				<!-- @click="" -->
		</form>
	</div>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
	data () {
		return {
			email: '',
			password: '',
		}
	},
	validations:
	{
		email: {
			required,
		},
		password: {
			required,
		}
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload); },
		dispatch(action, payload){ this.$store.dispatch(action, payload); },
		login(){ this.dispatch('login', this.$data) },
	},
}
</script>

<style lang="scss">
	@import "node_modules/bulma/sass/utilities/_all";
	@import "node_modules/bulma/sass/elements/button";
	@import "node_modules/bulma/sass/elements/form";
	.layout-padding{
		margin: 2rem;
	}
	.button{
		color:white !important;
	}
</style>
