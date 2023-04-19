import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

export default function Slide({Images, Id}){
    return (
        <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
            { Images.map( (img,index) => {
                const isfirst = index == 0 ? true : false;
                return (
                    <div className={`carousel-item ${isfirst ? "active": ""}`}>
                        <img src={img} key={Id + '_' + index} className="d-block w-100" alt="..."></img>
                    </div>
                )
            })}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>        
    )
}