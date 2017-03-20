<html>
<head>

    @include('config.analytics')

	<meta charset="UTF-8">
	<meta name="csrf-token" id="csrf-token" content="{{ csrf_token() }}">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" href="/css/items.css">
	{{-- <link rel="stylesheet" href="/css/fonts/material-design-iconic-font.min.css"> --}}

	<title>LIST</title>

</head>
<body>
<div style="position: fixed; height:100%; width:100%; top:0; left:0;">
<div style="height:calc(100% - 1px); width:100%; z-index: 1; overflow-y: scroll; -webkit-overflow-scrolling: touch;">
{{-- <a href="{{route('home')}}">Go home</a> --}}
<div id="items-app" :class="{'mobile':mobile}">

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
			@{{ text.menu.usedTime }}
			<div class="used-time">@{{ totalUsedHourMin }}</div>
		</div>
		<div v-show="totalHourMinLeft && selection.view != 'journal'">
			@{{ text.menu.timeLeft }}
			<div class="time-left">@{{ totalHourMinLeft }}</div>
		</div>
		<div v-show="selection.view != 'journal'">
			@{{ text.menu.items }}
			<div class="children-amount">@{{ itemAmount }}</div>
		</div>
		<div>
			@{{ (selection.view != 'journal') ? text.menu.done : text.menu.total }}
			<div class="done-children-amount">@{{ doneItemAmount }}</div>
		</div>
	</div>
{{-- DATA --}}
	<div class="items-wrapper"
	>
		<Card :item="allData"
			ref="root"
			{{-- :alltags="allTags" --}}
		></Card>
	</div>
{{-- / DATA --}}
	<div id="mobile-item-nav" v-if="mobile">
		<div class="playstation-controller">
			<button id=""
				@click="unindent()"
				v-show="selection.selectedId && selection.view != 'journal'"
				:class="{'disabled':(topLvlItems.includes(selection.selectedId))}"
				:disabled="topLvlItems.includes(selection.selectedId)"
			>
				<i class="zmdi zmdi-caret-left-circle"></i>
			</button>
			<div>
				<button id=""
					@click="moveItem('up')"
					v-show="selection.selectedId && selection.view != 'journal'"
					:class="{'disabled':(firstItem == selection.selectedId)}"
					:disabled="firstItem == selection.selectedId"
				>
					<i class="zmdi zmdi-caret-up-circle"></i>
				</button>
				<button id=""
					@click="moveItem('down')"
					v-show="selection.selectedId && selection.view != 'journal'"
					:class="{'disabled':(lastItems.includes(selection.selectedId))}"
					:disabled="lastItems.includes(selection.selectedId)"
				>
					<i class="zmdi zmdi-caret-down-circle"></i>
				</button>
			</div>
			<button id=""
				@click="indent()"
				v-show="selection.selectedId && selection.view != 'journal'"
				:class="{'disabled':(isFirstItem(selection.selectedId))}"
				:disabled="isFirstItem(selection.selectedId)"
			>
				<i class="zmdi zmdi-caret-right-circle"></i>
			</button>
		</div>
		<button id="floating-add-btn" @click="showAddNewItem()">
			<i class="zmdi zmdi-plus-circle"></i>
		</button>
	</div>
</div>


</div>{{-- /Items App --}}
</div>{{-- /Inner Wrapper  --}}
</div>{{-- /Outer Wrapper  --}}
<script src="js/items.js"></script>
</body>
</html>