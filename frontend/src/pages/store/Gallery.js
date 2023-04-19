import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

import './style.css';
import api from '../../services/api';
import Card from './Cards';
import IconBag from './IconBag';

export default function Gallery() {
    const [productList, setProductList]  = useState([]);
    const [bagList, setBagList]  = useState(0);
    const [bagProductList, setBagProductList]  = useState([]);
    const [searchTerm, setSearchTerm]  = useState();
    const handleSearch = event => {
        setSearchTerm(event.target.value);
        console.log('value is:', event.target.value);
      };
    useEffect(() => {
        const term = (!searchTerm) ? '' : '?search=' + searchTerm;
        api.get('api/v1/produtos' + term)
        .then(function (response) {
            setProductList(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[searchTerm]);


    return (
            <>
                <IconBag 
                    bagList={bagList} 
                    setBagList={setBagList} 
                    bagProductList={bagProductList} 
                    setBagProductList={setBagProductList}
                />
                <div className="gal container text-center pt-3">
                <div className='row mx-3'>
                    <div className="input-group rounded bg-transparent w-25">
                    <input type="search" onBlur={handleSearch} onReset={handleSearch} className="form-control rounded" placeholder="Buscar" aria-label="Buscar" aria-describedby="search-addon" />
                    <span className="input-group-text border-0 bg-transparent cursor-pointer" id="search-addon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f9f9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </span>
                    </div>
                </div>
                <div className="row">
                    {productList.map((product, index) => {
                        return (
                            <div className="col-3 m-3" key={index} >
                                <Card 
                                    product={ product } 
                                    key={index} 
                                    bagList={bagList} 
                                    setBagList={setBagList} 
                                    bagProductList={bagProductList} 
                                    setBagProductList={setBagProductList}
                                ></Card>
                            </div>        
                        )
                    })}
                </div>
                </div>        
            </>
        );
  }
  
