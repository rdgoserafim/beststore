import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

import './style.css';
import Stores from '../../services/Stores';

export default function CheckoutCard({product, index, setBagProductList, setBagList, bagList }){
    const removeItem = (id) => {
        console.log(id)
        let data = Stores.get("bag");
        let itemData = data ? JSON.parse(data) : [];
        let newItems = itemData.filter( (item) => {
            return item.id !== id;
        })
        Stores.set('bag', JSON.stringify(newItems))
        setBagProductList(newItems);
        setBagList(bagList -1);
    }

    return(
        <div className='container' key={index}>
        <div className="d-flex card mb-3 shadow bg-light">
        <div className="card-body">
            <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
                <div>
                <img
                    src={product.gallery[0]}
                    className="img-fluid rounded-3 shopping-bag-image" alt="Shopping item"></img>
                </div>
                <div className="ms-3">
                <h5>{product.name}</h5>
                <p className="small mb-0 text-truncate">{product.category}</p>
                </div>
            </div>
            <div className="d-flex flex-row align-items-center">
                <div className='shopping-bag-lb'>
                    <h5 className="fw-normal mb-0"> </h5>
                </div>
                <div className='shopping-bag-lb-value'>
                <h5 className="mb-0 small fw-bold">${product.price}</h5>
                </div>
                <div onClick={e => removeItem(product.id) } className='shopping-bag-link text-danger cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d90000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </div>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}