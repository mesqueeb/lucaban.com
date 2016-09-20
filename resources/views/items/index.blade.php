<html>
<head>
	<meta charset="UTF-8">
	<meta name="token" id="token" value="{{ csrf_token() }}">
	<title>THINGS</title>
	<link rel="stylesheet" href="/css/app.css">
	{{-- <link rel="stylesheet" href="/css/fonts/material-design-iconic-font.min.css"> --}}

</head>
<body>
<a href="{{route('home')}}">Go home</a>

{{-- @include('elements.menu') --}}
<img id="loading-icon"
	src="/css/icons/loading_64x64.gif"
	alt="Loading"
	v-show="patching"
/>
<Popups :popups="popups"></Popups>
<button class="button success" @click="popupAddUsedTime">test popup</button>
<div class="panel-body">
	<Timer></Timer>
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
			@click="clickDone()"
		>Done</a>
	</div>
	<div class="panel-title">
		@{{ selection.filter | capitalize }}
	</div>
	{{-- DATA --}}
	<div class="items-wrapper"
		v-show="selection.filter != 'done'"
	>
		<Card :item="allData"></Card>
	</div>
	{{-- JOURNAL --}}
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