export default function setDefaultItemValues(item)
{
	let t0 = performance.now( );
	// item.parent_id_backup = item.parent_id;
	if (!item) { console.log('item undefffff') }
	item.depth = Number(item.depth);
	if (item.show_children == null)	{ item.show_children = 1 		 		 }
	if (!item.children)				{ item.children = []					 }
	if (!item.due_date)				{ item.due_date = "0000-00-00 00:00:00"	 }
	if (!item.done_date)			{ item.done_date = "0000-00-00 00:00:00" }
	if (!item.done)					{ item.done = false 					 }
	if (!item.planned_time)			{ item.planned_time = 0					 }
	if (!item.used_time)			{ item.used_time = 0 					 }
	if (!item.tagged)				{ item.tagged = []	 					 }
	if (!item.children_order)		{ item.children_order = []			 	 }
	else if (typeof item.children_order === 'string')
	{
		item.children_order = item.children_order.split(',').map(Number);
	}
	let t1 = performance.now( );
	console.log("			Call to setDefaultItemValues took " + (t1 - t0) + " milliseconds.")
	return item;
}