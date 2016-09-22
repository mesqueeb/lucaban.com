<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Conner\Tagging\Taggable;

class Item extends Model
{
	use Taggable;
	protected $table = 'items';
	protected $fillable = ['done','done_date','body','children_order','parent_id','depth','planned_time','used_time','due_date', 'show_children', 'completion_memo'];

	// public function tags($value='')
	// {
	// 	# code...
	// }
}
