<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->index();
            $table->string('lang', 255)->nullable();
            $table->string('planned_time', 255)->nullable();
            $table->string('durations', 255)->nullable();
            $table->boolean('journal_show_parent_bodies')->nullable();
            $table->string('copy_item_format', 255)->nullable();
            $table->string('copy_journal_format', 255)->nullable();
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
        Schema::dropIfExists('user_settings');
    }
}
