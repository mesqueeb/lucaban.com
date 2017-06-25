<template>
<div
	:class="{ 'c-update-planned-time': true,
		'c-update-planned-time--mobile': (mobile)}"
>
	{{ text.card.duration }}
	<button
		v-for="dur in state.userSettings.plannedDurations"
		:class="[
			'o-btn', 'c-update-planned-time__button', 'js-update-planned-time__button',
			{'c-update-planned-time__currentDuration': item.planned_time == dur }]"
		@click.prevent="setPlannedTime(item, $event, dur)"
		@blur="dispatch('blurOnEditOrAdd')"
		@keydown.esc="dispatch('cancelEditOrAdd')"
		@keydown.enter="setPlannedTime(item, $event, dur)"
		@keydown.up="dispatch('focusElement',{ el:'.js-edit-body' })"
		@keydown.down="dispatch('focusElement',{ el:'.js-add-tag' })"
	>{{ dur }} {{ (mobileSmall) ? text.global.m : text.global.min }}</button>
	<div>
		<input
			class="c-update-planned-time__input" 
			v-show="true"
			v-model="item.planned_time"
			@blur="dispatch('blurOnEditOrAdd')"
			@keydown.esc="dispatch('cancelEditOrAdd')"
			@keydown.enter="setPlannedTime(item, $event)"
			@keydown.up="dispatch('focusElement',{ el:'.js-edit-body' })"
			@keydown.down="dispatch('focusElement',{ el:'.js-add-tag' })"
			type="number"
		/>{{ text.global.min }}
	</div>
</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	props:['item'],
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		text(){ return this.get.text },
		mobile(){ return this.get.mobile },
		mobileSmall(){ return this.get.mobileSmall },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		setPlannedTime(item, event, newTime)
		{
			this.dispatch('blockBlur');
			event.preventDefault();
			console.log(`launching setPlannedTime with ${newTime}`);

			if (newTime)
			{
				this.item.planned_time = newTime;
			}
			let npt = (!this.item.planned_time) ? 0 : parseFloat(this.item.planned_time);
			this.item.planned_time = npt;

			let plsFocus = '.js-add-tag';
			Vue.nextTick(function ()
			{
				if (this.get.mobile)
				{
					document.querySelector(plsFocus).focus();
				} else {
					document.querySelectorAll(plsFocus)[1].focus();
				}
				console.log('returning to editting: '+plsFocus);
			}.bind(this));
		},

	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
.c-update-planned-time{
    display: flex;
    align-items: baseline;
    >div:last-child{
        margin-left: 0.2em;
    }
}
.c-update-planned-time__input{
    outline: 0px !important;
    border-bottom: 1px solid $duration-color;
    width: 2em;
    text-align: center;
    padding: 0;
}
.c-update-planned-time__label:after {
    content: 'min';
    position: absolute;
    margin-left: -2em;
}
.c-update-planned-time__button{
    color: $duration-color;
    // font-size: 1em;
    padding: 0 0.2em;
    min-height: 2.1em;
}
.c-update-planned-time__currentDuration{
    background: $duration-color;
    padding: 0.1em 0.5em;
    margin: 0.1em;
    border-radius: 0.3em;
    color: white;
}
.c-update-planned-time--mobile{
    // font-size: 14px;
}
</style>