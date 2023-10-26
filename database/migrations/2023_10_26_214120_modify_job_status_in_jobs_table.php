<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyJobStatusInJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->enum('job_status', ['NEW', 'IN PROGRESS', 'COMPLETED', 'CANCELLED'])
                  ->default('NEW')
                  ->change();
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
            $table->enum('job_status', ['NEW', 'IN PROGRESS', 'COMPLETED'])
                  ->default('NEW')
                  ->change();
        });
    }
}
