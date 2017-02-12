export default class Selection {
	constructor()
	{
		this.selectedId = null;
		this.lastSelectedId = null;
		this.filter = [];
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
	addKeywords(keyword,value,operator){
		if(keyword == 'tag'){
			if(operator == 'NOT'){
				if(this.hiddenTags.includes(value)){ return; }
				this.hiddenTags.push(value);
				return;
			} else {
				if(this.tags.includes(value)){ return; }
				this.tags.push(value);
			}
		} else {
			if(operator == 'NOT' && keyword == 'journal'){
				this.hiddenBookmarks.push(keyword);
				return;
			}
			if(keyword == 'journal'){
				if(this.view.includes('journal')){ return; }
				this.view = 'journal';
			} else if(value){
				this.view = 'tree';
				if(this.filter.includes(value)){ return; }
				this.filter.push(value);
			}
		}
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