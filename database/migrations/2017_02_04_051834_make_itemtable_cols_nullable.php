<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeItemtableColsNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
$table->text('children_order')->nullable()->change();
$table->text('body')->nullable()->change();
$table->text('memo')->nullable()->change();
$table->text('parents_bodies')->nullable()->change();
$table->integer('planned_time')->nullable()->change();
$table->integer('used_time')->nullable()->change();
$table->decimal('completion_rate', 5, 4)->nullable()->change();
$table->dateTime('due_date')->nullable()->change();
$table->dateTime('done_date')->nullable()->change();
$table->boolean('done')->nullable()->change();
$table->text('completion_memo')->nullable()->change();
$table->boolean('show_children')->nullable()->change();
$table->integer('created_by')->nullable()->change();
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            //
        });
    }
}
