{{-- NEEDS TO BE ADDED BACK IN: c-panel__title- -scrolled-down --}}
<div class="c-panel__title">
	<div>
		<span v-if="selection.filter.length" v-for="sel in selectionFilter">@{{ sel }}</span>
		<span v-if="selection.tags.length" v-for="sel in selectionTags">@{{ sel }}</span>
	</div>
	<div class="c-panel__title__hidden-tags">
		<span v-if="selection.hiddenTags.length" v-for="hidden in selectionHiddenTags">@{{ hidden }}</span>
	</div>
</div>