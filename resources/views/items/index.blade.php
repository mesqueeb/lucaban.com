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

	<div class="panel-body">
		<div id="timer-area" class=""
			v-show="timerItems.length"
		>
			<div class="timer" id="timer-@{{ item.id }}"
				v-for="item in timerItems"
			>
				<div class="toggle-div">
					<input class="toggle"
						type="checkbox"
						v-if="item.children_order.length==0 || item.done == true"
						v-model="item.done"
						@click.prevent="markDone(item)"
					>

				</div>
				<span class="body">@{{ item.body }}</span>
				<span class="timer-time">@{{ item.used_time | hhmmss }}</span>
				<span class="nav">
					<button class="play btn btn-dipclick"
						@click="playTimer(item)"
					><i class="zmdi zmdi-play"></i>
					</button>
					<button class="pause btn btn-dipclick"
						@click="pauseTimer(item)"
					><i class="zmdi zmdi-pause"></i>
					</button>
					<button class="reset btn btn-dipclick"
						@click="resetTimer(item)"
					><i class="zmdi zmdi-time-restore"></i>
					</button>
					<button class="stop btn btn-dipclick"
						@click="removeTimer(item)"
					><i class="zmdi zmdi-close"></i>
					</button>
				</span>
			</div>
		</div>
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