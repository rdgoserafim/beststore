<?php

namespace App\Collections;

use App\Models\Supplier;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class Product extends Collection
{
    private $collection;

    static public function fetch()
    {
        $product = new self();
        
        $products_avaiable = [];
        $supliers = Supplier::all();

        foreach($supliers as $supplier){
            $response = Http::get($supplier->endpoint);

            $standardized = $product->compose($response->collect(),$supplier);
            
            if($response->successful()){
                $products_avaiable = array_merge( $products_avaiable, (array) $standardized->all() );
            }
        }
        return $product->concat($products_avaiable);
    }

    public function paginate(
        $perPage = 15,
        $page = null, 
        $baseUrl = null, 
        $options = []
    )
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);

        $lap = new LengthAwarePaginator(
                            $this->forPage($page, $perPage),
                            $this->count(),
                            $perPage,
                            $page,
                            $options
                        );

        if ($baseUrl) {
            $lap->setPath($baseUrl);
        }

        return $lap;
    }

    // padroniza os campos json que chegam via API
    public function compose($collection, Supplier $supplier)
    {
        return $collection->map(function($item) use ($supplier){
                    $newItem = [];
                    foreach($supplier->composition as $for => $from){
                        if(isset($item[$from]) and !is_null($item[$from])){
                            if($for == "gallery"){
                                $value = is_array($item[$from]) ? $item[$from] : [$item[$from]];
                            }else{
                                if(str_contains($from, ".")){
                                    $from_tb = explode('.',$from);
                                    if(isset($from_tb[1])){
                                        $value = $item[$from_tb[0]][$from_tb[1]];
                                    }else{
                                        $value = $item[$from_tb[0]];
                                    }
                                }else{
                                    $value = $item[$from];
                                }
                            }
                        }else{
                            $value = null;
                        }                
                        
                        $newItem[$for] = $value;
                    }
                    $newItem['supplier'] = $supplier->id;
                    return $newItem;
                });
    }
}