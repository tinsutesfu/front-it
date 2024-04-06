import { Link } from 'react-router-dom';
import '../styles/pages/checkout/checkout-header.css';
import '../styles/pages/checkout/checkout.css'
import { useEffect } from 'react';


const Checkout = ({cart ,cartQuantity,products,setCartQuantity,setCart}) => {
  
  
  
  useEffect(() => {
    // Update cart quantity when cart items change
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cart]);

 
  const removeFromCart = (productId) => {
    const newCart = cart.filter(cartItem => cartItem.productId !== productId);
    setCart(newCart);
    
  };

  return (
    <>
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
         
        <Link to="/">
            <img className="amazon-logo" src="images/amazon-logo.png"/>
            <img className="amazon-mobile-logo" src="images/amazon-mobile-logo.png"/>
          </Link>
          
        </div>
        
        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/">{cartQuantity} items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png"/>
        </div>
      </div>
    </div>

    <div className="main">
      <div className="page-title">Review your order</div>
    
      <div className="checkout-grid">
      <div class="order-summary js-order-summary">
        {(!cart || cart.length === 0) ? <p>Your cart is empty.</p> :
        cart.map((item)=>
        
        
         
          
          <div className="cart-item-container" key={item.productId}>
            <div className="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={products.find((p) => p.id === item.productId)?.image} />

              <div className="cart-item-details">
                <div className="product-name">
                {products.find((p) => p.id === item.productId)?.name}
                </div>
                <div className="product-price">
                ${((products.find((p) => p.id === item.productId)?.priceCents)/100).toFixed(2) }
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{item.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary" onClick={()=>removeFromCart(item.productId)}>
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div className="delivery-option">
                  <input type="radio" className="delivery-option-input"
                    name={`delivery-option-${item.productId}`}/>
                  <div>
                    <div className="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div className="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div className="delivery-option">
                  <input type="radio" checked className="delivery-option-input"
                    name={`delivery-option-${item.productId}`}/>
                  <div>
                    <div className="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div className="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div className="delivery-option">
                  <input type="radio" className="delivery-option-input"
                    name={`delivery-option-${item.productId}`}/>
                  <div>
                    <div className="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div className="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        
)}
</div>
        <div className="payment-summary">
          <div className="payment-summary-title">
            Order Summary
          </div>

          <div className="payment-summary-row">
            <div>Items ({cartQuantity}):</div>
            <div className="payment-summary-money">$42.75</div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">$4.99</div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">$47.74</div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">$4.77</div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">$52.51</div>
          </div>

          <button className="place-order-button button-primary">
            Place your order
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Checkout
