import React, { useState } from 'react';
import ShoppingBag from './ShoppingBag';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

import './style.css';

export default function IconBag({bagList, setBagList, bagProductList,setBagProductList}){
    const [isBagVisible, setIsBagVisible] = useState(false);
    const handleMouseClick = () => {
        if(isBagVisible){
            setIsBagVisible(false);
        }else{
            setIsBagVisible(true);
        }
      };
  
    //const [productCount, setProducCount]  = useState( bagList ? bagList.length : 0 );
    
    
    // setProducCount(
    //     () =>{
    //         let data = Stores.get("data");
    //         let itemData = data ? JSON.parse(data) : []
    //         return itemData.length
    //     }
    // );
    return(
        <>
            <div  onClick={handleMouseClick} className='iconbag cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7ed321" strokeWidth="2" strokeLinejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/></svg>
                <span className="badge text-white">{bagList} itens</span>
            </div>
            {isBagVisible && (
                <div>
                    <ShoppingBag 
                        isBagVisible={isBagVisible} 
                        setIsBagVisible={setIsBagVisible} 
                        bagProductList={bagProductList}
                        setBagProductList={setBagProductList}
                        bagList={bagList}
                        setBagList={setBagList}
                    />
                </div>
            )}            
        </>
    )
}