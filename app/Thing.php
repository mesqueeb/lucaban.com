<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thing extends Model
{
	
	protected $fillable = ['body', 'done'];
	// protected $body;
	// public function savenew($body){
	// 	$this->body = $body;
	// 	$this->save();
	// }

}
