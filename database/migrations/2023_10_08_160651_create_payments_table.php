<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            // Defining the Columns
            $table->id('payment_id');  // Primary Key
            $table->bigInteger('customer_id');
            $table->bigInteger('job_id')->nullable();
            $table->string('payment_intent_id')->unique();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3);
            $table->enum('status', ['succeeded', 'pending', 'failed']);
            $table->timestamps();  // Adds created_at and updated_at
            $table->timestamp('deleted_at')->nullable();  // Soft delete column

            // Defining Foreign Keys
            $table->foreign('customer_id')->references('customer_id')->on('customers')->onDelete('cascade');
            $table->foreign('job_id')->references('job_id')->on('jobs')->onDelete('set null');

            // Indexes for better query performance
            $table->index(['customer_id', 'job_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
