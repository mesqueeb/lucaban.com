<div class="stats"
	v-show="true"
>
	<div v-show="totalUsedHourMin && selection.view != 'journal'">
		@{{ text.menu.usedTime }}
		<div class="used-time">@{{ totalUsedHourMin }}</div>
	</div>
	<div v-show="totalHourMinLeft && selection.view != 'journal'">
		@{{ text.menu.timeLeft }}
		<div class="time-left">@{{ totalHourMinLeft }}</div>
	</div>
	<div v-show="selection.view != 'journal'">
		@{{ text.menu.items }}
		<div class="children-amount">@{{ itemAmount }}</div>
	</div>
	<div>
		@{{ (selection.view != 'journal') ? text.menu.done : text.menu.total }}
		<div class="done-children-amount">@{{ doneItemAmount }}</div>
	</div>
</div>