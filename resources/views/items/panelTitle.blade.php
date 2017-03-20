<div class="panel-title">
	<div>
		<span v-if="selection.filter.length" v-for="sel in selectionFilter">@{{ sel }}</span>
		<span v-if="selection.tags.length" v-for="sel in selectionTags">@{{ sel }}</span>
	</div>
	<div class="hidden-tags">
		<span v-if="selection.hiddenTags.length" v-for="hidden in selectionHiddenTags">@{{ hidden }}</span>
	</div>
</div>