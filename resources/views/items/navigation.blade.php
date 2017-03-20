<div class="navigation">
	<div class="menu">
		<a href="#"
			:class="{active: selection.filter.includes('all')}"
			@click="filterItems('all', 'all')"
		>@{{ text.menu.all }}</a>
		<a href="#"
			:class="{active: selection.filter.includes('today')}"
			@click="filterItems('duedate','today', $event)"
		>@{{ text.menu.today }}</a>
		<a href="#"
			:class="{active: selection.view.includes('journal'),
				'filtered-out': selection.hiddenBookmarks.includes('journal')}"
			@click="filterItems('journal', 'journal', $event)"
		>@{{ text.menu.journal }}</a>
		<a href="#"
			@click="popouts.guide = true"
			v-if="!mobile"
		>?</a>
		<a href="#"
			@click="setLanguage = 'ja'"
			v-if="language != 'ja'"
		>日本語</a>
		<a href="#"
			@click="setLanguage = 'en'"
			v-if="language != 'en'"
		>English</a>
		<a href="#"
			@click="test()"
			v-if="false"
		>TEST</a>
	</div>
	<div class="tag-menu">
		<a v-for="tag in allTagsComputed"
			href="#"
			:class="{active: selection.tags.includes(tag.slug)}"
			:value="tag.slug"
			@click="filterItems('tag', tag.slug, $event)"
		>@{{ tag.name }}</a>
		<a v-for="tag in selection.hiddenTags"
			class="filtered-out" href="#"
			@click.prevent="removeFilter(tag)"
		>@{{ tagSlugToName(tag) }}</a>
		
	</div>
</div>