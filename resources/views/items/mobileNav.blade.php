<div id="mobile-item-nav" v-if="mobile">
	<div class="playstation-controller">
		<button id=""
			@click="unindent()"
			v-show="selection.selectedId && selection.view != 'journal'"
			:class="{'disabled':(topLvlItems.includes(selection.selectedId))}"
			:disabled="topLvlItems.includes(selection.selectedId)"
		>
			<i class="zmdi zmdi-caret-left-circle"></i>
		</button>
		<div>
			<button id=""
				@click="moveItem('up')"
				v-show="selection.selectedId && selection.view != 'journal'"
				:class="{'disabled':(firstItem == selection.selectedId)}"
				:disabled="firstItem == selection.selectedId"
			>
				<i class="zmdi zmdi-caret-up-circle"></i>
			</button>
			<button id=""
				@click="moveItem('down')"
				v-show="selection.selectedId && selection.view != 'journal'"
				:class="{'disabled':(lastItems.includes(selection.selectedId))}"
				:disabled="lastItems.includes(selection.selectedId)"
			>
				<i class="zmdi zmdi-caret-down-circle"></i>
			</button>
		</div>
		<button id=""
			@click="indent()"
			v-show="selection.selectedId && selection.view != 'journal'"
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