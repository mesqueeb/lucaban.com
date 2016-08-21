<html>
<head>
	<meta charset="UTF-8">
	<meta name="token" id="token" value="{{ csrf_token() }}">
	<title>THINGS</title>
	<link rel="stylesheet" href="/css/app.css">
</head>
<body>
<a href="{{route('home')}}">Go home</a>
	{{-- @include('elements.menu') --}}
	
	<div class="panel-body">
		<div class="navigation">
			<a href="#"
				:class="{active: selection.filter == 'all'}"
				@click="filter('all')"
			>All</a>
			<a href="#"
				:class="{active: selection.filter == 'today'}"
				@click="filter('today')"
			>Today</a>
			<a href="#"
				:class="{active: selection.filter == 'done'}"
				@click="selection.filter = 'done'"
			>Done</a>
		</div>
		<div class="panel-title">
			@{{ selection.filter | capitalize }}
			<span v-show="false">[@{{allData.children_order}}]</span>
		</div>
		<div class="items-wrapper"
			v-show="selection.filter != 'done'"
		>
			<Card :item="allData"></Card>
		</div>
		<div class="journal-wrapper"
			v-show="selection.filter == 'done'"
		>
			<Journal :records-per-date="doneData"></Journal>
		</div>
	</div>


<script src="js/vendor.js"></script>
<script src="js/main.js"></script>
</body>
</html>