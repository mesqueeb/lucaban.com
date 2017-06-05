{{-- NEEDS TO BE ADDED BACK IN: c-panel__stats- -scrolled-down --}}
<div class="c-panel__stats"
	v-show="true"
>
	<div v-show="totalUsedHourMin() && selection.view != 'journal'">
		@{{ text.menu.usedTime }}
		<div class="c-stats__used-time">@{{ totalUsedHourMin() }}</div>
	</div>
	<div v-show="totalHourMinLeft() && selection.view != 'journal'">
		@{{ text.menu.timeLeft }}
		<div class="c-stats__time-left">@{{ totalHourMinLeft() }}</div>
	</div>
	<div v-show="selection.view != 'journal'">
		@{{ text.menu.items }}
		<div class="c-stats__children-amount">@{{ itemAmount }}</div>
	</div>
	<div v-if="doneItemAmount">
		@{{ (selection.view != 'journal') ? text.menu.done : text.menu.total }}
		<div class="c-stats__done-children-amount">@{{ doneItemAmount }}</div>
	</div>
</div>