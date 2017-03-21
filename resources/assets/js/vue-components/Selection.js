export default class Selection {
	constructor()
	{
		this.selectedId = null;
		this.si = this.getSelectedId();
		this.lastSelectedId = null;
		this.filter = ['all'];
		this.tags = [];
		this.hiddenTags = [];
		this.hiddenItems = [];
		this.hiddenBookmarks = [];
		this.view = 'tree';
	}
	clear()
	{
		this.filter = [];
		this.tags = [];
		this.hiddenTags = [];
		this.hiddenItems = [];
		this.hiddenBookmarks = [];
	}
	reset()
	{
		this.filter = ['all'];
		this.tags = [];
		this.hiddenTags = [];
		this.hiddenItems = [];
		this.hiddenBookmarks = [];
	}
	getSelectedId()
	{
		return this.selectedId;
	}
	nothingSelected()
	{
		let n = (  !this.tags.length
				&& !this.hiddenTags.length
				&& !this.hiddenItems.length
				&& !this.hiddenBookmarks.length
				&&  (
					  ( this.filter.length == 1
						&& this.filter.includes('all')
					  ) || (!this.filter.length)
					)
				);
		return n;
	}
	noFilterOrTag()
	{
		let n = (  !this.tags.length
				&&  (
					  ( this.filter.length == 1
						&& this.filter.includes('all')
					  ) || (!this.filter.length)
					)
				);
		return n;
	}
	addKeywords(keyword,value,operator){
		if (keyword == 'tag')
		{
			if (operator == 'NOT')
			{
				if (this.hiddenTags.includes(value)){ return; }
				this.hiddenTags.push(value);
				this.tags = this.tags.filter(tag => tag !== value);
			} else {
				if (this.tags.includes(value)){ return; }
				this.tags.push(value);
				this.hiddenTags = this.hiddenTags.filter(tag => tag !== value);
			}
		} else {
			if (operator == 'NOT' && keyword == 'journal')
			{
				this.hiddenBookmarks.push(keyword);
				return;
			}
			if(keyword == 'journal')
			{
				if (this.view == 'journal'){ return; }
				this.view = 'journal';
			} else if (value) {
				this.view = 'tree';
				if (this.filter.includes(value)){ return; }
				this.filter.push(value);
			}
		}
		Vue.nextTick(()=>{
			if (!vm.filteredItemsFlat.map(i => i.id).includes(this.selectedId))
			{
				this.selectedId = null;
			}
		});
	}
	getHiddenItemsTotalUsedTime()
	{
		if(!this.hiddenItems.length){ return 0; }
		return this.hiddenItems.reduce(function(a,id){
			let b = allItems.nodes[id].used_time;
			console.log(b);
			return a + b;
		}, 0);
	}
	getHiddenItemsTotalPlannedTime()
	{
		if(!this.hiddenItems.length){ return 0; }		
		return this.hiddenItems.reduce(function(a,id){
			let b = allItems.nodes[id].planned_time;
			console.log(b);
			return a + b;
		}, 0);
	}
	selectPrevious(){

	}


	
}