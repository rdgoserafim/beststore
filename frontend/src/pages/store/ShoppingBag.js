import { useRef, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import './style.css';

import CheckoutCard from './CheckoutCard';
import api from '../../services/api';
import Stores from '../../services/Stores';

export default function ShoppingBag({isBagVisible, setIsBagVisible, bagProductList,setBagProductList, bagList, setBagList}){
    
    const inputName = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();
    const inputRePassword = useRef();

    const [reponseForm, setResponseForm ] = useState(false);
    const [showForm, setShowForm ] = useState(true);

    const handleMouseClick = () => {
        setIsBagVisible( () => {return isBagVisible ? false : true} )
      };
    const cleanBag = () =>{
        setBagProductList([]);
        setBagList(0);
        setShowForm(true)
        Stores.remove('bag');
    }
    const cartItens = Stores.get('bag')? JSON.parse( Stores.get('bag') ) : [];
    
    const subtotal = () => {
        let sum = 0
        cartItens.map( (item,index) => {
            return sum += parseFloat( item.price );
        })
        return sum;
    };

    const logout = () => {
        const token = Stores.get('token')
        api.post('api/v1/logout',{
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(function (response) {
            Stores.remove('token')
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    const endOrder = () => {
        cleanBag()
        logout()
        // inputName.current.reset()
        // inputEmail.current.reset()
        // inputPassword.current.reset()
        // inputRePassword.current.reset()
        setShowForm(false)
    }

    const makeOrder = () => {
        const token = Stores.get('token')
        const order = new FormData()
        
        order.set('items', Stores.get('bag'));
        order.set('total', subtotal());
        order.set('token', token);
        
        api.post('api/v1/order', order, {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(function (response) {
            endOrder()
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    const [responseError, setResponseError] = useState(false);
    const makeSend = () => {
        setResponseForm(true)
        if(Stores.get('token')){
            makeOrder()
        }else{
            const form = new FormData()
            form.set('name',  inputName.current.value);
            form.set('email', inputEmail.current.value);
            form.set('password',   inputPassword.current.value);
            form.set('repassword',inputRePassword.current.value);

            api.post('api/v1/register', form, {
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            })
            .then(function (response) {
                setResponseError()
                if(response.data.token){
                    Stores.set('token', response.data.token)
                    makeOrder()
                }else{
                    setResponseError("Erro ao realizar login");
                }
            })
            .catch(function (error) {
                console.log(error)
                if(error.request.response){
                    setResponseError(JSON.parse( error.request.response ).message)
                }else{
                    setResponseError(error.message)
                }
                
            });
        }
    }
    return (
        <section className="shopping-bag">
        <div className="container py-2 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col shadow">
                <div className="card">
                <div className="card-body p-4">

                {showForm && (
                    <div className="row">
                    <div className="col-lg-7">
                        <h5 className="mb-3"><a href="#!" onClick={handleMouseClick}  className="text-body">Continuar Comprando</a></h5>
                        <hr></hr>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div><p className="mb-1">Minhas Compras</p>Você tem {bagList} itens</div>
                            <div onClick={cleanBag} className='cursor-pointer text-danger'>
                                Limpar Cesta
                            </div>
                        </div>
                        <div className="overflow-y-scroll shopping-bag-container">

                            {cartItens.map( (product,index) =>{
                                return(
                                    <div key={index}>
                                    <CheckoutCard 
                                    product={product} 
                                    index={index}
                                    setBagProductList={setBagProductList} 
                                    setBagList={setBagList}
                                    bagList={bagList}
                                    />
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="card bg-secondary text-white rounded-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="mb-0">Card details</h5>
                            </div>

                            <form >
                            <div className="form-outline form-white mb-4">
                                <input 
                                    ref={inputName}
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    placeholder="Nome Completo" 
                                    />
                                <label className="form-label" >Seu Nome</label>
                            </div>

                            <div className="form-outline form-white mb-4">
                                <input 
                                    ref={inputEmail}
                                    type="email" 
                                    className="form-control form-control-lg" 
                                    placeholder="user@email.com" 
                                    />
                                <label className="form-label" >Seu E-Mail</label>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6">
                                <div className="form-outline form-white">
                                    <input 
                                        ref={inputPassword}
                                        type="password" 
                                        className="form-control form-control-lg"
                                        minLength="8" 
                                        placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                                    />
                                    <label className="form-label" >Senha</label>
                                </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-outline form-white">
                                    <input 
                                        ref={inputRePassword}
                                        type="password" 
                                        className="form-control form-control-lg"
                                        minLength="8" 
                                        placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                                    />
                                    <label className="form-label" >Confirme a Senha</label>
                                </div>
                                </div>
                            </div>

                            </form>

                            <hr className="my-4"></hr>

                            <div className="d-flex justify-content-between mb-3">
                            <p className="mb-2">Total do Pedido</p>
                            <p className="mb-2 fw-bold fs-3">$ {subtotal()}</p>
                            </div>

                            { responseError && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Erro!</strong> {responseError}
                                    <button type="button" onClick={() => setResponseError()}  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}

                            <button type="button" 
                            className={`btn btn-info btn-block btn-lg ${!bagList ? "disabled" : ""} ${reponseForm ? "disabled" : ""}` }
                            onClick={makeSend}
                             >
                            <div className="d-flex justify-content-between">
                                {reponseForm && (
                                    <svg id="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none"><path id="track" fill="#C6CCD2" d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"/><path id="section" fill="#3F4850" d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z"/></g></svg>
                                )}
                                <span className='mx-2'>Finalizar</span>
                            </div>
                            </button>

                        </div>
                        </div>

                    </div>
                    </div>
                    )}
                    {!showForm && (
                        <div className="row">
                            <div className="col-lg-12 w-100 h-100">

                                <div className='container' >
                                    <div className="d-flex card mb-3 shadow bg-light">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 24 24" fill="none" stroke="#00d23e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                            </div>
                                            <div className="ms-3">
                                            <h5>Muito Obrigado</h5>
                                            <p className="small mb-0 text-truncate">Seu pedido foi recebeido!</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div className='shopping-bag-lb'>
                                                <h5 className="fw-normal mb-0"> </h5>
                                            </div>
                                            <button onClick={handleMouseClick} className="btn btn-primary">Fechar</button>    
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    </div>

                            </div>
                        </div>
                    )}
                    

                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}