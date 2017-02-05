<html>
<head>
	<meta charset="UTF-8">
	<meta name="token" id="token" value="{{csrf_token()}}">
	<title>THINGS</title>
	<link rel="stylesheet" href="/css/app.css">
	{{-- <link rel="stylesheet" href="/css/fonts/material-design-iconic-font.min.css"> --}}

</head>
<body>
{{-- <a href="{{route('home')}}">Go home</a> --}}
<div id="items-app">

<div id="loading-icon">
	<img
		src="/css/icons/loading_64x64.gif"
		alt="Loading"
		v-show="patching"
	/>
	<div class="patching-error" v-show="patching == 'error'">Error!</div>
</div>
<Popups :popups="popups"></Popups>
<Popouts :popouts="popouts"></Popouts>



<div class="panel-body" v-cloak>

	<div class="navigation">
		<div class="menu">
			<a href="#"
				:class="{active: (selection.filter.length == 0 && selection.tags.length == 0 && selection.view == 'tree')}"
				@click="filterItems('all')"
			>All</a>
			<a href="#"
				:class="{active: selection.filter.includes('today')}"
				@click="filterItems('duedate','today', $event)"
			>Today</a>
			<a href="#"
				:class="{active: selection.view.includes('journal'),
					'filtered-out': selection.hiddenBookmarks.includes('journal')}"
				@click="filterItems('journal', null, $event)"
			>Journal</a>
		</div>
		<div class="tag-menu">

			<a v-for="tag in allTagsComputed"
				href="#"
				:class="{active: selection.tags.includes(tag.slug), 
					'filtered-out': selection.hiddenTags.includes(tag.slug)}"
				@click="filterItems('tag', tag.slug, $event)"
			>@{{ tag.name }}</a>
			
		</div>
	</div>
	<div class="line"></div>
	<div class="panel-title"
	>
		<div>
			<span v-if="selection.filter.length">@{{ selection.filter }}</span>
			<span v-if="selection.tags.length">@{{ selection.tags }}</span>
		</div>
		<div class="hidden-tags">
			<span v-if="selection.hiddenTags.length">@{{ selection.hiddenTags }}</span>
		</div>
	</div>
	{{-- STATS --}}
	<div class="stats"
		v-show="true"
	>
		<div>Used time <div class="used-time">@{{ totalUsedHourMin }}</div></div>
		<div
			v-show="!selection.filter.includes('done')"
		>Time left <div class="time-left">@{{ totalHourMinLeft }}</div></div>
		<div>Items <div class="children-amount">@{{ childrenAmount }}</div></div>
		<div>Done <div class="done-children-amount">@{{ doneChildrenAmount }}</div></div>
	</div>
	<!-- DATA -->
	<div class="items-wrapper"
	>
		<Card :item="allData"
			{{-- :alltags="allTags" --}}
		></Card>
	</div>
</div>


</div>
<script src="js/main.js"></script>
</body>
</html>