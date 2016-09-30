<template id="items-journal-template">
 	<div class="done-card"
		v-for="day in recordsPerDate"
 	>
 		<div class="title">{{ day.date }}</div>
 		<div class="item-wrapper">
			<div class="item" 
				v-for="item in day.items"
			>
				<div class="parent-string"></div>
				<span>・</span>
				<span class="body bodybox">{{{ item.body }}}</span>
				<div class="completion-notes bodybox">{{ item.completion_memo }}</div>
				<div class="item-tags"
				>
					<span v-if="item.planned_time" class="duration">
						{{ item.planned_time }} min
					</span>
				</div>
			</div>
<!--    <div 
			class="item-card"
			v-if="item.depth != 0"
			:class="{
				done: item.done,
				editing: item.id == this.$root.editingItem,
			}"
		>
			<div class="toggle-div">
				<input class="toggle"
					type="checkbox"
					v-if="item.children_order.length==0 || item.done == true"
					v-model="item.done"
					@change="markDone(item.id)"
				>
			</div>
			<div class="body-div"
				:class="{ selected: item.id == this.$root.selection.selectedId, }"
				@dblclick="startEdit(item)"
				@click="select(item)"
				@enter="console.log('yarrr')"
			>
				<span class="bodybox"
					v-show="item.id != this.$root.editingItem"
				>{{ item.body }}</span>
				
				<span v-show="false"> ({{item.id}}) D-{{item.depth}}) [{{item.children_order}}]</span>
				
				<form action="update"
					class="updatebox"
					v-show="item.id == this.$root.editingItem"
					@submit.prevent="doneEdit(item)"
				>
					<textarea name="item_body"
						rows="{{ item.rows }}"
						v-model="item.body"
						v-autosize="item.body"
						v-item-focus="item.id == this.$root.editingItem"
						@blur="blurOnEdit(item)"
						@keyup.esc="cancelEdit(item)"
						@keydown.enter="enterOnEdit"
					>{{ item.body }}</textarea>
					<span>
						<label for="planned_time">duration:</label>
						<input name="planned_time"
							type="number"
							v-model="item.planned_time"
							@blur="blurOnEdit(item)"
							@keyup.esc="cancelEdit(item)"
							@keydown.enter="doneEdit(item)"
						/>
					</span>
				</form>
				<div class="item-tags"
					v-show="this.$root.editingItem != item.id"
				>
					<span v-if="item.done" class="done">
						done {{ item.done_date | momentRelative }}
					</span>
					
					<span v-if="hasTotalTime" class="total-duration">
						total {{ calcTotalTime }} min
					</span>

					<span v-if="hasPlannedTime" class="duration">
						{{ item.planned_time }} min
					</span>

					<span v-if="hasDueDate" class="duedate">
						{{ item.due_date | momentCalendar }}
					</span>

					<span v-if="item.dueDateParent" class="duedate-parent">
						{{ item.dueDateParent | momentCalendar }}
					</span>

				</div>
				<div class="item-nav"
					v-show="this.$root.editingItem != item.id"
				>
					<button 
						v-if="item.children_order.length==0"
						@click="deleteItem(item)"
					>✗</button>
				</div>
			</div>
		</div> 
-->

<!--
 		<form class="addnewbox" 
			id="new-under-{{ item.id }}"
			v-if="showAddNewBox"
			@submit.prevent
		>
			<textarea type="text"
				class="add-item"
				name="body"
				v-model="newItem.body"
				v-autosize="newItem.body"
				@blur="blurOnAddNew(item)"
				@keyup.esc="cancelAddNew"
				@keydown="keydownOnNew"
				placeholder="..."
				autocomplete="off"
				autofocus 
				rows="1"
			></textarea>
			<span>
				<label for="planned_time">duration:</label>
				<input name="planned_time"
					type="number"
					v-model="newItem.planned_time"
					@blur="blurOnAddNew(item)"
					@keyup.esc="cancelAddNew"
					@keydown="keydownOnNew"
				/>
			</span>
		</form> -->
		</div><!-- End item-wrapper -->
		<div class="total time">Total time: {{ day.totalTime }}</div>
		<hr>
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
		hasPlannedTime(){
		    return (this.item.planned_time && this.item.planned_time != '0');
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