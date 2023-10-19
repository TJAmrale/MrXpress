<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('stock_audit', function (Blueprint $table) {
            $table->bigIncrements('stock_audit_id'); 
            $table->BigInteger('stock_id'); 
            $table->BigInteger('user_id'); 
            $table->text('changes'); 
            $table->timestamps(); 

            $table->foreign('stock_id')->references('stock_id')->on('stock')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_audit');
    }

};



