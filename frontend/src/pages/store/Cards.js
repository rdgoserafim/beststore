import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

import './style.css';
import Stores from '../../services/Stores';
import Slide from '../../components/slide';

export default function Card({product, id, bagList, setBagList, bagProductList, setBagProductList}) {

    const InsertItem = (item) =>{
        let data = Stores.get("bag");
        let itemData = data ? JSON.parse(data) : []
        
        itemData.push(JSON.parse(item));
        Stores.set('bag', JSON.stringify(itemData))

        setBagProductList(prevBag => [...prevBag, JSON.parse(item)]);
        setBagList( parseInt(bagList) + 1);
    }

    return (
        <div className="card shopping-bag-card" key={id}>
            {/* <img src={product.gallery[0]} className="card-img-top" alt="..."></img> */}
            <Slide Images={product.gallery} Key={id} />
            <div className="card-body">
                <h5 className="card-title text-dark">{product.name}</h5>
                <p className="card-text text-sm text-secondary text-truncate">{product.description}</p>
                <div className="d-flex justify-content-between">
                    <span className="text-bold text-success mx-1">R$ {product.price}</span>
                    <button onClick={e => InsertItem(e.target.value) } value={JSON.stringify(product)} className="btn btn-primary">Comprar</button>    
                </div>
            </div>
        </div>
        );
  }