<html>
<head>
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
	  <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
	  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
	    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
	    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
	  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
	    C22.32,8.481,24.301,9.057,26.013,10.047z">
	    <animateTransform attributeType="xml"
	      attributeName="transform"
	      type="rotate"
	      from="0 20 20"
	      to="360 20 20"
	      dur="0.5s"
	      repeatCount="indefinite"/>
	    </path>
	  </svg>
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
				:class="{active: selection.tags.includes(tag.slug), 
					'filtered-out': selection.hiddenTags.includes(tag.slug)}"
				@click="filterItems('tag', tag.slug, $event)"
			>@{{ tag.name }}</a>
			<a v-for="tag in selection.hiddenTags"
				class="filtered-out" href="#"
				@click="filterItems('tag', tag, $event)"
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
			<div class="children-amount">@{{ childrenAmount }}</div>
		</div>
		<div>
			@{{ (selection.view != 'journal') ? 'Done' : 'Total' }}
			<div class="done-children-amount">@{{ doneChildrenAmount }}</div>
		</div>
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
<script src="js/items.js"></script>
</body>
</html>