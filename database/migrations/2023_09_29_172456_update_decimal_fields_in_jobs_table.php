<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDecimalFieldsInJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->decimal('callout_fee', 10, 2)->default(0)->change();
            $table->decimal('total_cost', 10, 2)->change();
            $table->decimal('technician_fee', 10, 2)->change();
            $table->decimal('admin_fee', 10, 2)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            // If you want to reverse the changes in the future, specify the original column types here.
            $table->decimal('callout_fee')->default(0)->change();
            $table->decimal('total_cost')->change();
            $table->decimal('technician_fee')->change();
            $table->decimal('admin_fee')->change();
        });
    }
}
