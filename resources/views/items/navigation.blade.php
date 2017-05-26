<div class="c-panel__navigation">
	<div class="c-navigation__menu">
		<a href="#"
			:class="{active: selection.filter.includes('all')}"
			@click="filterItems({ keyword:'all', value:'all', event:$event})"
		>@{{ text.menu.all }}</a>
		<a href="#"
			:class="{active: selection.filter.includes('today')}"
			@click="filterItems({ keyword:'duedate', value:'today', event:$event})"
		>@{{ text.menu.today }}</a>
		<a href="#"
			:class="{active: selection.view.includes('journal'),
				'filtered-out': selection.hiddenBookmarks.includes('journal')}"
			@click="filterItems({ keyword:'journal', value:'journal', event:$event})"
		>@{{ text.menu.journal }}</a>
		<a href="#"
			@click="updatePopouts({ guide:true })"
			v-if="!mobile"
		>?</a>
		<a href="#"
			@click="updateState({ setLanguage:'ja'})"
			v-if="language != 'ja'"
		>日本語</a>
		<a href="#"
			@click="updateState({ setLanguage:'en'})"
			v-if="language != 'en'"
		>English</a>
		<a href="#"
			@click="test()"
			v-if="debug"
		>TEST</a>
	</div>
	<div class="c-navigation__tag-menu">
		<a v-for="tag in allTagsComputed"
			href="#"
			:class="{active: selection.tags.includes(tag.slug)}"
			:value="tag.slug"
			@click="filterItems({ keyword:'tag', value:tag.slug, event:$event })"
		>@{{ tag.name }}</a>
		<a v-for="tag in selection.hiddenTags"
			class="filtered-out" href="#"
			@click.prevent="removeFilter({tag})"
		>@{{ tagSlugToName(tag) }}</a>
		
	</div>
</div>