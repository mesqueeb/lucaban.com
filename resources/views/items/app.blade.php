<div id="items-app" :class="{'mobile':mobile}">
{{-- LOADER --}}
@include('items.loading')
<Popups :popups="popups"></Popups>
<Flashes :flashes="flashes"></Flashes>
<Popouts :popouts="popouts"></Popouts>
<div class="panel-body" v-cloak>
	{{-- NAV --}}
	@include('items.navigation')
	<div class="u-line"></div>
	@include('items.panelTitle')
	{{-- STATS --}}
	@include('items.stats')
	{{-- DATA --}}
	<div class="items-wrapper"
	>
		<Card :item="allData"
			ref="root"
			:parents-children-order="[]"
			:parent-tags="[]"
			{{-- :alltags="allTags" --}}
		></Card>
{{-- 
	<div v-for="date in journalDates">
			<div>@{{ date }}</div>
			<Card
				v-for=""
			></Card>
		</div>
 --}}
 	</div>
</div>
{{-- Mobile NAV --}}
@include('items.mobileNav')

</div>{{-- /Items App --}}