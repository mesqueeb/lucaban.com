<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateThingsTable extends Migration {

  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('things', function(Blueprint $table) {
      // These columns are needed for Baum's Nested Set implementation to work.
      // Column names may be changed, but they *must* all exist and be modified
      // in the model.
      // Take a look at the model scaffold comments for details.
      // We add indexes on parent_id, lft, rgt columns by default.
      $table->increments('id');
      $table->integer('parent_id')->nullable()->index();
      $table->integer('lft')->nullable()->index();
      $table->integer('rgt')->nullable()->index();
      $table->integer('depth')->nullable();
      // Add needed columns here (f.ex: name, slug, path, etc.)
      // $table->string('name', 255);
      $table->string('body');
      $table->text('memo');
      $table->time('planned_time');
      $table->time('total_used_time');
      $table->decimal('completion_rate', 5, 4);
      $table->dateTime('due_date');
      $table->dateTime('done_date');
      $table->boolean('done');
      $table->text('completion_memo');
      $table->softDeletes();
      $table->integer('created_by')->unsigned()->index();

      // To assign things see table: link_things_users

      $table->timestamps();

    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::drop('things');
  }

}
