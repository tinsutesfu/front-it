import { Link } from 'react-router-dom';
import '../styles/pages/checkout/checkout-header.css';
import '../styles/pages/checkout/checkout.css'
import { useState } from 'react';
import dayjs from 'dayjs'; 


const Checkout = ({cart ,cartQuantity,products,setCart,saveToStorage,updatequantity}) => {
  
  const [updateModes, setUpdateModes] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item.productId]: false }), {})
  );
const [selectedDelivery, setSelectedDelivery] = useState({});
  
 updatequantity()

 
  const removeFromCart = (productId) => {
    const newCart = cart.filter(cartItem => cartItem.productId !== productId);
    setCart(newCart);
    saveToStorage()
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity) || newQuantity <= 0) {
      return; // Handle invalid input (optional: display error message)
    }

    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    saveToStorage(); // Call saveToStorage here or within a separate function
  };

  const toggleUpdateMode = (productId) => {
    setUpdateModes((prevModes) => ({
      ...prevModes,
      [productId]: !prevModes[productId],
    }));
  };

 
  

  const handleDeliveryChange = (productId, optionId) => {
    setSelectedDelivery({ ...selectedDelivery, [productId]: optionId });
  };

  const selectedDeliveryDays = cart.map(( item) => {
    const selectedOption = item.deliveryoption?.find(
      (option) => option.id === selectedDelivery[item.productId]
    );
    return selectedOption?.deliveryDays; // Return first found value
    saveToStorage();
  } );



  const totalItemPrice = cart.reduce((acc, item) => {
    const product = products.find(p => p.id === item.productId);
    return acc + ((product?.priceCents || 0) / 100) * item.quantity;
  }, 0);

  // Calculate total shipping cost based on selected delivery option
  const totalShippingCost = cart.reduce((acc, item) => {
    const selectedOption = item.deliveryoption?.find(option => option.id === selectedDelivery[item.productId]);
    return acc + (selectedOption?.priceCents || 0) / 100;
  }, 0);

  // Calculate subtotal (item price + shipping)
  const subtotalPrice = totalItemPrice + totalShippingCost;

  // Calculate tax (10% of subtotal)
  const taxAmount = subtotalPrice * 0.1;

  // Calculate order total (subtotal + tax)
  const orderTotal = subtotalPrice + taxAmount;
  
  
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

    <div className="maine">
      <div className="page-title">Review your order</div>
    
      <div className="checkout-grid">
      <div class="order-summary js-order-summary">
        {(!cart || cart.length === 0) ? <p>Your cart is empty.</p> :
        cart.map((item,optionId)=>
         
        
         
          
          <div className="cart-item-container" key={item.productId}>
            <div className="delivery-date">
               {selectedDeliveryDays[optionId]
                      ? `Delivery date: ${dayjs().add(selectedDeliveryDays[optionId], 'day').format('dddd, MMMM D')}`
                      : (
                        // Display default message if no delivery selected yet
                        <span>Select a delivery option to see estimated delivery date.</span>
                      )}
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
                  {updateModes[item.productId] ? (
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          className="quantity-input"
                          type="number"
                          min="1" // Set minimum quantity to 1
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, e)}
                        />
                        <button type="button" className="save-quantity-link link-primary" onClick={() => toggleUpdateMode(item.productId)}>
                          Save
                        </button>
                      </form>
                    ) : (
                      <span className="update-quantity-link link-primary" onClick={() => toggleUpdateMode(item.productId)}>
                        Update
                      </span>
                    )}
                  <span className="delete-quantity-link link-primary" onClick={()=>removeFromCart(item.productId)}>
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>


                {item.deliveryoption?.map((option) => (
              <div className="delivery-option" key={option.id}>
                <input
                  type="radio"
                  className="delivery-option-input"
                  name={`delivery-option-${item.productId}`}
                  checked={selectedDelivery[item.productId] === option.id}
                  onChange={() => handleDeliveryChange(item.productId, option.id)}
                />
                <div>
                  <div className="delivery-option-date">
                    {dayjs().add(option.deliveryDays, 'day').format('dddd, MMMM D')}
                  </div>
                  <div className="delivery-option-price">
                      {option.priceCents === 0 ? (
                      <span>Free </span>
                    ) : (
                      `${(option.priceCents/100)}`
                    )}-Shipping.
                  </div>
                </div>
              </div>
            ))}
               
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
            <div className="payment-summary-money">${totalItemPrice.toFixed(2)}</div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">${totalShippingCost.toFixed(2)}</div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">${subtotalPrice.toFixed(2)}</div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">${taxAmount.toFixed(2)}</div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">${orderTotal.toFixed(2)}</div>
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
