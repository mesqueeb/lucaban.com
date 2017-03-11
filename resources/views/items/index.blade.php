<html>
<head>

    @include('config.analytics')

	<meta charset="UTF-8">
	<meta name="csrf-token" id="csrf-token" content="{{ csrf_token() }}">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="/css/items.css">
	{{-- <link rel="stylesheet" href="/css/fonts/material-design-iconic-font.min.css"> --}}

	<title>Items</title>

</head>
<body>
{{-- <a href="{{route('home')}}">Go home</a> --}}
<div id="items-app">

<div id="loading-icon">
	<div class="loader loader--style1" title="loading" alt="Loading"
		v-show="patching || loading"
	>
		@include('components.svg_loader')
	</div>
	<div class="patching-error" v-show="patching == 'error'" v-cloak>Error!</div>
</div>
<Popups :popups="popups"></Popups>
<Popouts :popouts="popouts"></Popouts>



<div class="panel-body" v-cloak>

	<div class="navigation">
		<div class="menu">
			<a href="#"
				:class="{active: selection.filter.includes('all')}"
				@click="filterItems('all', 'all')"
			>All</a>
			<a href="#"
				:class="{active: selection.filter.includes('today')}"
				@click="filterItems('duedate','today', $event)"
			>Today</a>
			<a href="#"
				:class="{active: selection.view.includes('journal'),
					'filtered-out': selection.hiddenBookmarks.includes('journal')}"
				@click="filterItems('journal', 'journal', $event)"
			>Journal</a>
			<a href="#"
				@click="popouts.guide = true"
			>?</a>
		</div>
		<div class="tag-menu">

			<a v-for="tag in allTagsComputed"
				href="#"
				:class="{active: selection.tags.includes(tag.slug)}"
				@click="filterItems('tag', tag.slug, $event)"
			>@{{ tag.name }}</a>
			<a v-for="tag in selection.hiddenTags"
				class="filtered-out" href="#"
				@click.prevent="removeFilter(tag)"
			>@{{ tagSlugToName(tag) }}</a>
			
		</div>
	</div>
	<div class="line"></div>
	<div class="panel-title"
	>
		<div>
			<span v-if="selection.filter.length" v-for="sel in selectionFilter">@{{ sel }}</span>
			<span v-if="selection.tags.length" v-for="sel in selectionTags">@{{ sel }}</span>
		</div>
		<div class="hidden-tags">
			<span v-if="selection.hiddenTags.length" v-for="hidden in selectionHiddenTags">@{{ hidden }}</span>
		</div>
	</div>
	{{-- STATS --}}
	<div class="stats"
		v-show="true"
	>
		<div v-show="totalUsedHourMin && selection.view != 'journal'">
			Used time
			<div class="used-time">@{{ totalUsedHourMin }}</div>
		</div>
		<div v-show="totalHourMinLeft && selection.view != 'journal'">
			Time left
			<div class="time-left">@{{ totalHourMinLeft }}</div>
		</div>
		<div v-show="selection.view != 'journal'">
			Items
			<div class="children-amount">@{{ itemAmount }}</div>
		</div>
		<div>
			@{{ (selection.view != 'journal') ? 'Done' : 'Total' }}
			<div class="done-children-amount">@{{ doneItemAmount }}</div>
		</div>
	</div>
	<!-- DATA -->
	<div class="items-wrapper"
	>
		<Card :item="allData"
			ref="root"
			{{-- :alltags="allTags" --}}
		></Card>
	</div>
	<button id="floating-add-btn" v-if="true" @click="showAddNewItem()">
		<i class="zmdi zmdi-plus-circle"></i>
	</button>
</div>


</div>
<script src="js/items.js"></script>
</body>
</html>