<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterJobsTableAndDropPayments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Adding new columns to jobs table
        Schema::table('jobs', function (Blueprint $table) {
            $table->string('payment_intent_id')->unique()->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('currency', 3)->nullable();
            $table->enum('payment_status', ['succeeded', 'pending', 'failed'])->default('pending');
        });

        // Dropping payments table
        Schema::dropIfExists('payments');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Reverting the changes made in the 'up' method
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn(['payment_intent_id', 'amount', 'currency', 'payment_status']);
        });

        // Recreating payments table (you can copy-paste the content of up method from create_payments_table migration)
    }
}
