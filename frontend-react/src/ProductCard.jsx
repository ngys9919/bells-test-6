import React from 'react';
import { useCart } from './CartStore';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';

const ProductCard = (props) => {

  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();

  const handleAddToCart = () => {
    addToCart(props);
    showMessage('Item added to cart', 'success');
    setLocation('/cart');
  }

  return (
    // <div className="card">
    //   <img
    //     src={props.imageUrl}
    //     className="card-img-top"
    //     alt={props.productName}
    //   />
    //   <div className="card-body">
    //     <h5 className="card-title">{props.productName}</h5>
    //     <p className="card-text">${props.price}</p>
    //     <button className="btn btn-primary" onClick={handleAddToCart}>
    //       Add to Cart
    //     </button>
    //   </div>
    // </div>


    <div className="col mb-5">
      <div className="card h-100">
        {/* Sale badge */}
        <div className="badge bg-primary text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>{props.productBadge}</div>
        {/* Product image */}
        <img className="card-img-left" src={props.imageUrl} alt={props.productName} />
        {/* Product details */}
        <div className="card-body p-4">
          <div className="text-center">
            {/* Product name */}
            <h5 className="fw-bolder">{props.promotionName}</h5>
            <h5 className="fw-bolder">{props.productName}</h5>
            {/* Product reviews */}
            <div className="d-flex justify-content-center small text-warning mb-2">
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
            </div>
            {/* Product price */}
            {props.discount === props.price ? (
              <p className="card-text">${props.price}</p>
            ) : ( 
              <> <span className="text-muted text-decoration-line-through">${props.price}</span>
              ${props.discount} 
              </>
            )}
          </div>
        </div>
        {/* Product actions */}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#" onClick={handleAddToCart}>Add to cart</a></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
