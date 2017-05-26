function setDefaultItemValues(item){
	// item.parent_id_backup = item.parent_id;
	item.depth = Number(item.depth);
	if(item.show_children == null){ item.show_children = 1 		 }
	if(!item.children)	{ item.children = []					 }
	if(!item.due_date)	{ item.due_date = "0000-00-00 00:00:00"	 }
	if(!item.done_date)	{ item.done_date = "0000-00-00 00:00:00" }
	if(!item.done)		{ item.done = false 					 }
	if(!item.used_time)	{ item.used_time = 0 					 }
	if(!item.tagged)	{ item.tagged = []	 					 }
	if(!item.children_order){ item.children_order = [];			 }
	else if (typeof item.children_order === 'string')
	{
		item.children_order = item.children_order.split(',').map(Number);
	}
	return item;
}

export { setDefaultItemValues };