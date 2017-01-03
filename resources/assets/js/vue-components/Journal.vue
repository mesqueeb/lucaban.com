<template id="items-journal-template">
 	<div class="done-card"
		v-for="day in recordsPerDate"
 	>
 		<div class="title">
 			<span>{{ day.date | momentCalendar }}</span>
 			<span class="journal-date-small">{{ day.date }}</span>
 		</div>
 		<div class="item-wrapper">
			<div class="item" 
				v-for="item in day.items"
			>
				<div class="parent-string">{{ item.parents_bodies }}</div>
				<div class="main">
					<span>・</span>
					<div class="">{{{ item.body }}}</div>
					<div class="item-tags"
					>
						<span v-if="item.used_time" class="duration">
							{{ item.used_time | hourminsec }}
						</span>
						<span v-if="item.tagged.length"
							class="custom-tag"
							v-for="tag in item.tagged"
							@click.prevent="this.$root.filterItems('tag', tag.tag_slug)"
						>{{ tag.tag_name }}
							<button class="delete-tag"
								v-if="item.id == this.$root.editingItem"
								@click.prevent="deleteTag(item.id, tag.tag_name, $event)"
							>
								<i class="zmdi zmdi-close-circle"></i>
							</button>
						</span>
						<label class="done"
							v-if="item.done && item.id != this.$root.editingDoneDateItem"
						>change done date
							<input class="flatpickr"
								id="done-date-edit-{{ item.id }}"
								v-model="item.done_date"
							>
						</label>
					</div>
				</div>
				<div class="completion-notes bodybox">{{ item.completion_memo }}</div>
			</div>
		</div><!-- End item-wrapper -->
		<div class="total time"
			v-if="day.totalUsedTime"
		>used: {{ day.totalUsedTime | hourminsec }}</div>
	</div>
</template>


<script>

export default {
	name: 'Journal',
	template:'#items-journal-template',
	created(){
	},
	ready(){
	},
	computed: {
		hasUsedTime(){
		    return;
		},
	},
	methods:{

	},
	props: ['records-per-date'],
	http: {
		root: '/root',
		headers: {
			'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value'),
		},
    },
}
</script>