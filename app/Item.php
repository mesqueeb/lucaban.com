<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Conner\Tagging\Taggable;

class Item extends Model
{
	use Taggable;
	protected $table = 'items';
	protected $fillable = [
		'parent_id',
		'created_by',
		'depth',
		'children_order',
		'body',
		'memo',
		'planned_time',
		'used_time',
		'completion_rate',
		'due_date',
		'done_date',
		'done',
		'completion_memo',
		'show_children',
		'deleted_at',
		'parents_bodies',
	];

	public function users()
	{
		return $this->belongsToMany('App\User');
	}
	public function childItems()
	{
		return $this->hasMany(Item::class, 'parent_id');
	}
	public function scopeUserItems($query)
    {
    	$query->where('created_by', '=', auth()->id());
        // Retrieve all posts with at least one comment containing words like foo%
        // $query->whereHas('users', function ($query) {
        // 	$query->where('id', '=', auth()->id());
        // });
    }
	// Class - Instruction Manual/Description of an Object
	// Instance - Actual thing, based on a class
	// Methods - Done to the thing, described in the class
	// Static Method - Is a thing that is to do with the class but doesn't need an instance of it
	public static function saveItemTree($itemData,$parent_id = null){
		$userid = auth()->id();
		$itemData['created_by'] = $userid;
		// dd($itemData);
	    if(!is_null($parent_id)){
	      $itemData['parent_id'] = $parent_id;
	    }
	    // $itemData['id'] = null; // possibly not necessary if you set fillables correctly
	    $item = new Item($itemData);
	    unset($item['children']);
	    unset($item['children_order']);
	   	$item->save();

	    $children = [];
	    if(!empty($itemData['children'])){
		    foreach($itemData['children'] as $child){
		      $children[] = self::saveItemTree($child,$item['id']);
		    }
		    $children_order = collect($children)->implode('id',','); // converts Array into a laravel Collection
		    $item['children_order'] = $children_order;
		}
	   	$item->save();
	   	$item->users()->attach($userid);
	   	$item['children'] = $children;
	    return $item;
	}

	// public function tags($value='')
	// {
	// 	# code...
	// }
}
