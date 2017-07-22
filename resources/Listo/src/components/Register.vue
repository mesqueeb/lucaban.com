<template>
<!-- root node required -->
<div>
	<div class="layout-padding">
		<form action="" @submit.prevent="register">
			<div class="field">
				<label class="label">{{ get.text.user.email }}</label>
				<p class="control">
					<input required
						class="full-width input"
						type="email"
						v-model.trim="form.email"
					>
						<!-- @input="$v.name.$touch()" -->
				</p>
			</div>
			<div class="floating-label field">
				<label class="label">{{ get.text.user.password }}</label>
				<p class="control">
					<input required
						class="full-width input"
						type="password"
						v-model.trim="form.password"
					>
					<div class="c-password-doublecheckbox" v-if="form.password">
						
						<span class="c-password-visible"
							v-if="passwordShown">{{ form.password }}
						</span>

						<span
							class="c-password-showhide"
							@click="passwordShown = !passwordShown"
						>
							<q-icon
								class="c-password-showhide__icon"
								v-if="passwordShown"
								name="ion-eye-disabled"
							/>
							<span
								v-if="!passwordShown"
							>{{ get.text.user.showpassword }}</span>
							<q-icon
								class="c-password-showhide__icon"
								v-if="!passwordShown"
								name="ion-eye"
							/>
						</span>
					</div>
						<!-- @input="$v.name.$touch()" -->
				</p>
			</div>
			<div class="field">
				<label class="label">{{ get.text.user.passwordConfirm }}</label>
				<p class="control">
					<input required
						class="full-width input"
						type="password"
						v-model.trim="form.password_confirmation"
					>
						<!-- @input="$v.name.$touch()" -->
				</p>
			</div>
			<div class="field">
				<label class="label">{{ get.text.user.name }}</label>
				<p class="control">
					<input required
						class="full-width input"
						type="text"
						v-model.trim="form.name"
					>
						<!-- @input="$v.name.$touch()" -->
				</p>
			</div>
			<q-btn loader class="button is-primary" type="submit">
				{{ get.text.user.register }}
				<q-spinner-oval slot="loading" size="20px" />
			</q-btn>
		</form>
	</div>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
	data () {
		return {
			form:{
				email: '',
				password: '',
				password_confirmation: '',
				name: '',
			},
			passwordShown: true,
		}
	},
	validations:
	{
		email: {
			required,
		},
		password: {
			required,
		},
		name: {
			required,
		},
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
		register(){ this.dispatch('register', this.$data.form) },
	},
}
</script>

<style lang="scss">
@import "node_modules/bulma/sass/utilities/_all";
@import "node_modules/bulma/sass/elements/button";
@import "node_modules/bulma/sass/elements/form";
@import '../css/_variables.scss';
.layout-padding{
	margin: 2rem;
}
.button{
	color:white !important;
}
.c-password-doublecheckbox{
	margin-top: -1em;
}
.c-password-visible{
	color: $mid-gray;
}
.c-password-showhide:hover{
	color: $theme-color !important;
	cursor: pointer;
}
.c-password-showhide__icon{
	padding: 1em;
}
</style>
