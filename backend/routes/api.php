<?php

use App\Http\Controllers\GalleryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::group(['prefix' => 'v1'],function () {
    Route::get('produtos/{page?}/{search?}', [GalleryController::class, 'index'])->name('produtos.index');

    Route::post('login', [UserController::class, 'login'])->name('users.login');
    Route::post('register', [UserController::class, 'register'])->name('users.register');
});

//rotas protegidas por autenticação
Route::group(['prefix' => 'v1', 'middleware' => 'jwt.verify'],function () {
    Route::post('order', [OrderController::class, 'create'])->name('order.create');
    Route::post('logout', [UserController::class, 'logout'])->name('users.logout');
    Route::post('user', [UserController::class, 'getUser'])->name('users.user');
});