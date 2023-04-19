<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('fornecedor_id');
            $table->string('origin_id');
            $table->string('nome');
            $table->text('descricao');
            $table->string('categoria');
            $table->string('imagem');
            $table->string('material');
            $table->string('departamento');
            $table->decimal('preco');
            $table->integer('qtd');
            $table->decimal('subtotal');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('order_id')->references('id')->on('orders');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign('order_items_user_id_foreign');
            $table->dropForeign('order_items_order_id_foreign');    
        });
        Schema::dropIfExists('order_items');
    }
};
