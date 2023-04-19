<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'order_id',
        'fornecedor_id',
        'origin_id',
        'nome',
        'descricao',
        'categoria',
        'imagem',
        'material',
        'departamento',
        'preco',
        'qtd',
        'subtotal',
    ];
}
