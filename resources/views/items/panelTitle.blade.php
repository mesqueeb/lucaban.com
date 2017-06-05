{{-- NEEDS TO BE ADDED BACK IN: c-panel__title- -scrolled-down --}}
<div class="c-panel-title">
	<div class="c-panel-title__top-row">
		<span v-if="selection.filter.length" v-for="sel in selectionFilter">@{{ sel }}</span>
		<span v-if="selection.tags.length" v-for="sel in selectionTags">@{{ sel }}</span>
		<span v-if="selection.view != 'journal'">
			<button
				class="o-btn"
				v-btn-effect
				v-clipboard:copy="clipboardText(root.id)"
				v-clipboard:success="clipboardSuccess"
				v-clipboard:error="clipboardError"
			>
				@{{ text.card.copy }}
			</button>
		</span>
	</div>
	<div class="c-panel-title__hidden-tags">
		<span v-if="selection.hiddenTags.length" v-for="hidden in selectionHiddenTags">@{{ hidden }}</span>
	</div>
</div>