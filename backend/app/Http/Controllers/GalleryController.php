<?php

namespace App\Http\Controllers;

use App\Collections\Product;
use App\Http\Resources\GalleryCollection;
use App\Http\Resources\GalleryResouce;
use App\Models\Supplier;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if(array_key_exists("search",$request->query())){
            $result = Product::fetch()
                        ->filter(function ($item) use ($request){
                            return str_contains( strtolower($item['name']),strtolower($request->query()["search"]));
                        })
                        ->paginate(18,null,route('produtos.index'));
        }else{
            $result = Product::fetch()->paginate(18,null,route('produtos.index'));
        }
                
        
        //dd(new GalleryCollection( $result ));
        return new GalleryCollection( $result );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
