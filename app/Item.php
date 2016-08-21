<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
	protected $table = 'items';
	protected $fillable = ['done','done_date','body','children_order','parent_id','depth','planned_time','due_date'];
}
