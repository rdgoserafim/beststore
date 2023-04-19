Desenvolvido por Rodrigo Serafim  rdgo.serafim@gmail.com | +55 43 991214420

ESTE É APENAS UM PROJETO DE APRESENTAÇÃO, COM RECURSOS LIMITADOS. DESENVOLVIDO EM RESPOSTA AOS OBJETIVOS DECLARADOS NO ARQUIVO ./Devnology - Teste Desenvolvedor(a) Fullstack .pdf


Processo de desenvolvimento

    - requisitos do projeto:
        - e-commerce em react + laravel
        - listar, filtrar e pesquisar produtos de dois fornecedores
            - listas consumirão API de cada fornecedor (atualmente 2)
            fornecedor 1
                http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider
                http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/1

            fornecedor 2
                http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider
                http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/1


        - usuário pode adicionar itens a carrinho de compras
        - finalizar compra com dados do cliente e dos itens comprados

    - Definição de parametros básicos
        nome da loja: BestStore, paleta gerados automaticamente

    - Construção dos ambientes laravel e react dentro da pasta do projeto principal: 
            ./beststore

    - Modelagem básica da base de dados:
            mysql
            tabelas:
                (tabelas default do laravel)
                customer -> agregar informações do user e outras informações de consumidor
                order -> informaçẽos do pedido
                order_items -> detalhamento dos itens do pedido

	- Padronização do response dos fornecedores em uma collection com a finalidade de aproveitar os recursos do laravel (pequena documentação ao final do deste ReadMe)

	- Uso o JWT para gerenciamento de usuários e autenticação

	TODO:
		- melhorar design e UI-UX
		- criar rotas e telas de meus pedidos, login, register, sobre, pagamentos
		- melhoar armazenamento de carrinho de compras, atualmente está em localstorage. basta alterar a funções em src/services/Store.js
		- Criar navegação de paginação (os links ja estão disponiveis)
		- criar filtros de categoria, material etc em barra de topo ou lateral


How to Install

Ambiente de desenvolvimento
	-PHP 8.1.18 (cli) (built: Apr 14 2023 04:39:46) (NTS)
	-NPM 9.6.3
	-Composer version 2.5.1 2022-12-22 15:33:54
	-Laravel Framework 10.7.1
	-React 18.2.0

1. descompacte os arquivos em seu ambiente de trabalho
2. configurações back-end:
	- configure o back-end, acesso a baco de dados etc em  /beststore/backend/.env
	- acesse /beststore/backend/ e execute:
		composer install
		php artisan migrate
		php artisan db:seed
	
3. configurações front-end:
	- configure o front-end, baseURL padrao para o Axios.js em /beststore/frontend/src/services/api.js (padrão "http://localhost:8000")
	- acesse /beststore/frontend/ e execute:
	    npm install
	    npm start

4. se não ocorrer nenhum erro a aplicação estará rodando

--------------------------------------------------------------------------------------

padronização de campos de produto
		{
			"hasDiscount": false,
			"name": "Licensed Soft Towels",
			"gallery": [
				"http:\/\/placeimg.com\/640\/480\/nightlife",
				"http:\/\/placeimg.com\/640\/480\/city",
				"http:\/\/placeimg.com\/640\/480\/business",
				"http:\/\/placeimg.com\/640\/480\/city"
			],
			"description": "The Football Is Good For Training And Recreational Purposes",
			"price": "874.00",
			"discountValue": "0.05",
			"details": {
				"adjective": "Unbranded",
				"material": "Frozen",
                "category": "",
                "departamento": ""
			},
			"id": "22"
		},

european:
{
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
}
brasilian:
{
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
}

