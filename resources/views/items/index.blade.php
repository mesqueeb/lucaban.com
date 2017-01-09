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

{{-- <Vuelistmaster></Vuelistmaster> --}}
{{-- @include('elements.menu') --}}

{{-- <script src="https://unpkg.com/vue@2.0.1/dist/vue.js"></script> --}}

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
				:class="{active: (selection.filter.length == 0 && selection.tags.length == 0)}"
				@click="filterItems('all')"
			>All</a>
			<a href="#"
				:class="{active: selection.filter.includes('today')}"
				@click="filterItems('duedate','today')"
			>Today</a>
			<a href="#"
				:class="{active: selection.filter.includes('done')}"
				@click="filterItems('done')"
			>Done</a>
		</div>
		<div class="tag-menu">

			<a v-for="tag in allTagsComputed"
				href="#"
				:class="{active: selection.tags.includes(tag.slug), 
					hidden: selection.hiddenTags.includes(tag.slug)}"
				@click="filterItems('tag', tag.slug, $event)"
			>@{{ tag.name }}</a>
			
		</div>
	</div>
	<div class="line"></div>
	<div class="panel-title"
	>
		<div>
			@{{ selection.filter | capitalize }}
			@{{ selection.tags | capitalize }}
		</div>
		<div class="hidden-tags">
			@{{ selection.hiddenTags | capitalize }}
		</div>
	</div>
	{{-- STATS --}}
	<div class="stats"
		v-show="true"
	>
		<div>Used time <div class="used-time">@{{ allData.totalUsedTime | hourmin }}</div></div>
		<div
			v-show="!selection.filter.includes('done')"
		>Time left <div class="time-left">@{{ allData.totalPlannedTime*60-allData.totalUsedTime | hourmin }}</div></div>
		<div>Items <div class="children-amount">@{{ childrenAmount }}</div></div>
		<div>Done <div class="done-children-amount">@{{ doneChildrenAmount }}</div></div>
	</div>
	<!-- DATA -->
	<div class="items-wrapper"
		v-show="!selection.filter.includes('done2')"
	>
		<Card :item="allData"
			:alltags="allTags"
		></Card>
	</div>
	<!-- JOURNAL -->
	<div class="journal-wrapper"
		v-show="selection.filter.includes('done2')"
	>
		<Journal :records-per-date="doneData"></Journal>
	</div>
</div>


<script src="js/vendor.js"></script>
<script src="js/main.js"></script>
</div>
</body>
</html>