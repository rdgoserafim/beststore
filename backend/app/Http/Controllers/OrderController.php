<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderItems;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    public function create(Request $request)
    {
        $itens = json_decode($request->items,true);
        $order = new Order([
            'user_id' => auth()->user()->id,
            'qtd_items' => count($itens),
            'total' => $request->total,
        ]);
        $order->save();

        foreach($itens as $item){
            $i = new OrderItems([
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'fornecedor_id' => $item['supplier'],
                'origin_id' => $item['id'],
                'nome' => $item['name'],
                'descricao' => $item['description'],
                'categoria' => $item['category'],
                'imagem' => $item['gallery'][0],
                'material' => $item['material'],
                //'departamento' => $item[''],
                'preco' => $item['price'],
                'qtd' => 1,
                'subtotal' => $item['price'],
            ]);
            $i->save();
        }

        return new OrderResource(
            [
                'success' => true, 
                'order' => $order, 
                'it' => $itens,
                'request' => $request->all(),
                'user_id' => auth()->user(),
            ]
        );
    }
}
