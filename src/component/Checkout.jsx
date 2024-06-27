import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/checkout/checkout-header.css";
import "../styles/pages/checkout/checkout.css";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "../api/axios";
import { datacontext } from "../context/Context";

const Checkout = ({
 
}) => {

  const navigate=useNavigate()
  const { products,  cart,token,selectedDeliveryDays,
  cartQuantity, handleAddToCart,
  setCart,
  updatequantity} = useContext(datacontext);
 // const [updateModes, setUpdateModes] = useState(
   // cart.reduce((acc, item) => ({ ...acc, [item.productId]: false }), {})
  //);
  const [selectedDelivery, setSelectedDelivery] = useState(
    // Initialize with delivery selection from local storage
    JSON.parse(localStorage.getItem("selectedDelivery")) || {}
  );

  useEffect(() => {
    // Save selected delivery options to local storage on change
    localStorage.setItem("selectedDelivery", JSON.stringify(selectedDelivery));
  }, [selectedDelivery]);

 
 

  updatequantity();

  const removeFromCart = async (productId) => {
    // Find the cart item
    const cartItem = cart.find((item) => item.productId === productId);
    
    // Decrease quantity by 1 if more than 1, otherwise remove from cart
    if (cartItem && cartItem.quantity > 1) {
      const newCart = cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(newCart);
    } else {
      const newCart = cart.filter((item) => item.productId !== productId);
      setCart(newCart);
    }
  
    // Update backend
    if (token) {
      await axios.post('/api/cart/remove', { productId }, { headers: { token } });
    }
  };
  

  
   const handleDeliveryChange = (productId, optionId) => {
    setSelectedDelivery({ ...selectedDelivery, [productId]: optionId });
    // Persist selected delivery option in local storage
    localStorage.setItem(`selectedDelivery-${productId}`, JSON.stringify(optionId));
  };


  

 

  
  const totalItemPrice = cart.reduce((acc, item) => {
    const product = products.find((p) => p._id === item.productId);
    return acc + ((product?.priceCents || 0) / 100) * item.quantity;
  }, 0);

  
  // Calculate total shipping cost based on selected delivery option
  const totalShippingCost = cart.reduce((acc, item) => {
    const selectedOption = item.deliveryoption?.find(
      (option) => option.id === selectedDelivery[item.productId]
    );
    return acc + (selectedOption?.priceCents || 0) / 100;
  }, 0);

  // Calculate subtotal (item price + shipping)
  const subtotalPrice = totalItemPrice + totalShippingCost;

  // Calculate tax (10% of subtotal)
  const taxAmount = subtotalPrice * 0.1;

  // Calculate order total (subtotal + tax)
  const orderTotal = subtotalPrice + taxAmount;

  
  
  const generateUniqueDeliveryId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.abs(Date.now()).toString(36).substring(2)
    );
  };
  const deliveryId = generateUniqueDeliveryId();

const filterCartWithDeliverySelection = () => {
    // Filter cart items based on selected delivery options
    const filteredCart = cart.filter(
      (item) => selectedDelivery[item.productId] !== undefined
    );
    return filteredCart;
  };

  const handlePlaceOrder = () => {
    const filteredCart = filterCartWithDeliverySelection();
    navigate('/orders', { state: { cart: filteredCart, selectedDelivery,products,orderTotal,deliveryId } });
  };
  return (
    <>
      <div className="checkout-header">
        <div className="Header-content">
          <div className="checkout-header-left-section">
            <Link to="/amazon">
              <img className="amazon-logo" src="images/t-logo.jpg" />
              <img
                className="amazon-mobile-logo"
                src="images/amazon-mobile-logo.png"
              />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/amazon">
              {cartQuantity} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="maine">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div class="order-summary js-order-summary">
            {!cart || cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item, optionId) => (
                <div className="cart-item-container" key={item.productId}>
                  <div className="delivery-date">
                    {selectedDeliveryDays[optionId] ? (
                      `Delivery date: ${dayjs()
                        .add(selectedDeliveryDays[optionId], "day")
                        .format("dddd, MMMM D")}`
                    ) : (
                      // Display default message if no delivery selected yet
                      <span>
                        Select a delivery option to see estimated delivery date.
                      </span>
                    )}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={'http://localhost:3500/images/'+products.find((p) => p._id === item.productId)?.image}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {products.find((p) => p._id === item.productId)?.name}
                      </div>
                      <div className="product-price">
                        $
                        {(
                          products.find((p) => p._id === item.productId)
                            ?.priceCents / 100
                        ).toFixed(2)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity:
                          <span className="quantity-label">
                            {item.quantity}
                          </span>
                        </span>
                       
                          <span
                            className="update-quantity-link link-primary" 
                            onClick={() => handleAddToCart(item.productId)}>
                            Update
                          </span>
                        
                        <span
                          className="delete-quantity-link link-primary"
                          onClick={() => removeFromCart(item.productId)}>
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
                            checked={
                              selectedDelivery[item.productId] === option.id
                            }
                            onChange={() =>
                              handleDeliveryChange(item.productId, option.id)
                            }
                          />
                          <div>
                            <div className="delivery-option-date">
                              {dayjs()
                                .add(option.deliveryDays, "day")
                                .format("dddd, MMMM D")}
                            </div>
                            <div className="delivery-option-price">
                              {option.priceCents === 0 ? (
                                <span>Free </span>
                              ) : (
                                `$${option.priceCents / 100}`
                              )}
                              -Shipping.
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="payment-summary">
            <div className="payment-summary-title">Order Summary</div>

            <div className="payment-summary-row">
              <div>Items ({cartQuantity}):</div>
              <div className="payment-summary-money">
                ${totalItemPrice.toFixed(2)}
              </div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">
                ${totalShippingCost.toFixed(2)}
              </div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">
                ${subtotalPrice.toFixed(2)}
              </div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">
                ${taxAmount.toFixed(2)}
              </div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">
                ${orderTotal.toFixed(2)}
              </div>
            </div>

            <button onClick={handlePlaceOrder} className="place-order-button button-primary">
                Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;