<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Conner\Tagging\Taggable;

class Item extends Model
{
	use Taggable;
	protected $table = 'items';
	protected $fillable = ['done','done_date','body','children_order','parent_id','depth','planned_time','used_time','due_date', 'children', 'show_children', 'completion_memo', 'parents_bodies', 'memo'];


	public function childItems() {
		return $this->hasMany(Item::class);
	}
	// Class - Instruction Manual/Description of an OBject
	// Instance - Actual thing, based on a class
	// Methods - Done to the thing, described in the class
	// Static Method - Is a thing that is to do with the class but doesn't need an instance of it
	public static function saveItemTree($itemData,$parent_id = null){
	    if(!is_null($parent_id)){
	      $itemData['parent_id'] = $parent_id;
	      $itemData['memo'] = 'blueblubelubeluble';
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
	   	$item['children'] = $children;
	    return $item;
	}

	// public function tags($value='')
	// {
	// 	# code...
	// }
}
