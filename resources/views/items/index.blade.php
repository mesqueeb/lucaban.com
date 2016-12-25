<html>
<head>
	<meta charset="UTF-8">
	<meta name="token" id="token" value="{{csrf_token()}}">
	<title>THINGS</title>
	<link rel="stylesheet" href="/css/app.css">
	{{-- <link rel="stylesheet" href="/css/fonts/material-design-iconic-font.min.css"> --}}

</head>
<body class="">
<div id="body">
<a href="{{route('home')}}">Go home</a>

{{-- @include('elements.menu') --}}
<div id="loading-icon">
	<img
		src="/css/icons/loading_64x64.gif"
		alt="Loading"
		v-show="patching"
	/>
	<div class="patching-error" v-show="patching == 'error'">Error!</div>
</div>

<Popups :popups="popups"></Popups>
<Popouts :popouts="popouts"
	
></Popouts>
<div class="panel-body">
	<div class="navigation">
		<div class="menu">
			<a href="#"
				:class="{active: selection.filter == 'all'}"
				@click="filterItems('all')"
			>All</a>
			<a href="#"
				:class="{active: selection.filter == 'today'}"
				@click="filterItems('today')"
			>Today</a>
			<a href="#"
				:class="{active: selection.filter == 'done'}"
				@click="clickDone()"
			>Done</a>
		</div>
		<div class="tag-menu">

			<a v-for="tag in allTags"
				href="#"
				:class="{active: selection.tags.includes(tag.slug)}"
				@click="filterItems('tag', tag.slug)"
			>@{{ tag.name }}</a>
			
		</div>
	</div>
	<div class="panel-title">
		@{{ selection.filter | capitalize }}
	</div>
	{{-- STATS --}}

	<div class="stats">
		<div><span>Total time:</span>@{{ allData.totalPlannedTime | hourmin }} / @{{ allData.totalUsedTime | hourmin }}</div>
	</div>
	{{-- DATA --}}
	<div class="items-wrapper"
		v-show="selection.filter != 'done'"
	>
		<Card :item="allData"
			:alltags="allTags"
		></Card>
	</div>
	{{-- JOURNAL --}}
	<div class="journal-wrapper"
		v-show="selection.filter == 'done'"
	>
		<Journal :records-per-date="doneData"></Journal>
	</div>
</div>

{{-- <script src="https://unpkg.com/vue@2.0.1/dist/vue.js"></script> --}}
<script src="js/vendor.js"></script>
<script src="js/main.js"></script>
</div>
</body>
</html>