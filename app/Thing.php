<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;

// class Thing extends Model

use Baum\Node;

/**
* Thing
*/
class Thing extends Node 
{
	protected $table = 'things';
	protected $fillable = ['done','body','parent_id','depth'];
	// protected $body;
	// public function savenew($body){
	// 	$this->body = $body;
	// 	$this->save();
	// }

}
