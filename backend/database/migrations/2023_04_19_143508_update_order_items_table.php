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
        Schema::table('order_items', function (Blueprint $table) {
            $table->unsignedBigInteger('fornecedor_id')->nullable()->change();
            $table->text('descricao')->nullable()->change();
            $table->string('categoria')->nullable()->change();
            $table->string('imagem')->nullable()->change();
            $table->string('material')->nullable()->change();
            $table->string('departamento')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
