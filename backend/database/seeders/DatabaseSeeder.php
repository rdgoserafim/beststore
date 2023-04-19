<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Supplier::create(
            [
                'name'=> 'brazilian_provider',
                'endpoint'=>'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider',
                'composition' => '{
                    "hasDiscount": null,
                    "name": "nome",
                    "gallery": "imagem",
                    "description": "descricao",
                    "price": "preco",
                    "discountValue": null,
                    "adjective": null,
                    "material": "material",
                    "category": "departamento",
                    "id": "id"
                    }',
            ],
        );
        \App\Models\Supplier::create(
            [
                'name'=> 'european_provider',
                'endpoint' =>'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider',
                'composition' => '{
                    "hasDiscount": "hasDiscount",
                    "name": "name",
                    "gallery": "gallery",
                    "description": "description",
                    "price": "price",
                    "discountValue": "discountValue",
                    "adjective": "details.adjective",
                    "material": "details.material",
                    "category": "details.category",
                    "id": "id"
                    }',
            ],            
        );

        
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
