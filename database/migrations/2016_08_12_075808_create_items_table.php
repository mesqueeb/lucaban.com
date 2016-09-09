<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    Schema::create('items', function (Blueprint $table) {
        $table->increments('id');
        $table->integer('parent_id')->nullable()->index();
        $table->integer('depth')->nullable();
        $table->text('children_order');
        $table->string('body');
        $table->text('memo');
        $table->integer('planned_time')->default(0);
        $table->integer('used_time')->default(0);
        $table->decimal('completion_rate', 5, 4);
        $table->dateTime('due_date');
        $table->dateTime('done_date');
        $table->boolean('done');
        $table->text('completion_memo');
        $table->boolean('show_children')->default(1);
        $table->softDeletes();
        $table->morphs('taggable');
        $table->integer('created_by')->unsigned()->index();     
        // To assign things see table: link_things_u        
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('items');
    }
}
