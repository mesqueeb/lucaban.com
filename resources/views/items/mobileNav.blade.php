<div id="bottom-hint"
	v-show="!itemAmount"
	v-if="mobile"
>@{{ text.guide.hints.addItemHint }}<br>➘</div>

<div id="mobile-item-nav" v-if="mobile">
	<div class="playstation-controller"
		v-if="selection.view != 'journal'"
		v-show="itemAmount && selection.selectedId"
	>
		<button id=""
			@click="unindent()"
			:class="{'disabled':(topLvlItems.includes(selection.selectedId))}"
			:disabled="topLvlItems.includes(selection.selectedId)"
		>
			<i class="zmdi zmdi-caret-left-circle"></i>
		</button>
		<div>
			<button id=""
				@click="moveItem('up')"
				:class="{'disabled':(firstItem == selection.selectedId)}"
				:disabled="firstItem == selection.selectedId"
			>
				<i class="zmdi zmdi-caret-up-circle"></i>
			</button>
			<button id=""
				@click="moveItem('down')"
				:class="{'disabled':(lastItems.includes(selection.selectedId))}"
				:disabled="lastItems.includes(selection.selectedId)"
			>
				<i class="zmdi zmdi-caret-down-circle"></i>
			</button>
		</div>
		<button id=""
			@click="indent()"
			:class="{'disabled':(isFirstItem(selection.selectedId))}"
			:disabled="isFirstItem(selection.selectedId)"
		>
			<i class="zmdi zmdi-caret-right-circle"></i>
		</button>
	</div>
	<button id="floating-add-btn" @click="showAddNewItem()">
		<i class="zmdi zmdi-plus-circle"></i>
	</button>
</div>