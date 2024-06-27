import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/orders.css";
import dayjs from "dayjs";
import Modal from 'react-modal';
import axios from "../api/axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Added for accessing passed data
import { datacontext } from "../context/Context";

const Orders = () => {
  const {token,products}=useContext(datacontext);
  const location = useLocation();
  const {cart,  selectedDelivery, orderTotal, deliveryId } =
    location.state || {}; // Destructure from state
const [data,setdata]=useState({
  firstname:'',
lastname:'',
email:'',street:'',city:'',state:'',
zipcode:'',country:'',phone:''
})

const navigate=useNavigate()

 useEffect(() => {
    console.log("Orders component received cart:", cart);
    console.log(
      "Orders component received selectedDelivery:",
      selectedDelivery
    );
  }, [cart, selectedDelivery]);
const onchangehanndler=(e)=>{
  const name=e.target.name;
  const value=e.target.value;
  setdata(data=>({...data,[name]:value}))
}

const submitorder = async (e) => {
  e.preventDefault();

  // 1. Validate Delivery Selection (optional):
  // You can add validation similar to the improved response in the previous explanation.

  // 2. Prepare Order Data:
  const orderItems = cart.map((item) => {
    return {
      productId: item.productId,
      quantity: item.quantity,
      deliveryOptionId: selectedDelivery[item.productId], // Use selectedDelivery from props
    };
  });
console.log(orderItems)
  const orderData = {
    address:data,
    items:orderItems,
   amount: orderTotal, // Use orderTotal from props
    deliveryInformation: {
      // ... extract delivery information from user-entered data (data state)
    },
    deliveryId, // Include newDeliveryId if applicable
  };
console.log(orderData)
try {
  // Send order to backend using axios
  const response = await axios.post('/api/place/order', orderData, {
    headers: 
      {token}, // Include token in Authorization header
       });
       if (response.data.success){
        navigate('/tracking')
       }
    
} catch (error) {
  console.error("Error placing order:", error);
  // Handle errors gracefully (e.g., display an error message to the user)

}
};

useEffect(()=>{
  if (!token ) {
    navigate('/signin')
  } else if (orderTotal===0) {
    navigate('/amazon')
  } 
},[token])


  return (
    <>
      <form onSubmit={submitorder} className="place-order">
        <div className="place-order-left">
          <p className="title">delivery information</p>
          <div className="multi-field">
            <input  name="firstname" onChange={onchangehanndler} value={data.firstname} type="text" placeholder="first name" />
            <input  name="lastname" onChange={onchangehanndler} value={data.lastname} type="text" placeholder="last name" />
          </div>
          <div className="multi-field">
            <input  name="email" onChange={onchangehanndler} value={data.email} type="email" placeholder="email address" />
            <input  name="street" onChange={onchangehanndler} value={data.street} type="text" placeholder="street" />
          </div>
          <div className="multi-field">
            <input  name="city" onChange={onchangehanndler} value={data.city} type="text" placeholder="city" />
            <input  name="state" onChange={onchangehanndler} value={data.state} type="text" placeholder="state" />
          </div>
          <div className="multi-field">
            <input  name="zipcode" onChange={onchangehanndler} value={data.zipcode} type="text" placeholder="zip code" />
            <input  name="country" onChange={onchangehanndler} value={data.country} type="text" placeholder="country" />
          </div>
          <div className="multi-field">
            <input  name="phone" onChange={onchangehanndler} value={data.phone} type="text" placeholder="phone" />
          </div>
         
        </div>

        <div className="place-order-right">
          <div className="title"> your order</div>

          <div className="orders-grid">
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-total">
                 <span className="order-header-label"> Order total</span>:${orderTotal?.toFixed(2) || 0}
                  {/* Handle potential undefined orderTotal */}
                </div>
              </div>

              <p className="order-header-right-section">
                <span className="order-header-label">deliveryID:</span>{deliveryId}
              </p>
            </div>
            <div className="order-summary js-order-summary">
              {!cart || cart.length === 0 ? (
                <p>PLACE YOUR ORDER.</p>
              ) : (
                cart.map((item, optionId) => (
                  <div className="cart-item-container" key={item.productId}>
                    <div className="delivery-date">
                      {selectedDelivery[item.productId] ? ( // Use selectedDelivery from props
                        `Delivery date: ${dayjs()
                          .add(
                            // Find the selected delivery option for this item
                            item.deliveryoption?.find(
                              (option) =>
                                option._id === selectedDelivery[item.productId]
                            )?.deliveryDays,
                            "day"
                          )
                          .format("dddd, MMMM D")}`
                      ) : (
                        <span>Delivery option not selected yet.</span>
                      )}
                    </div>

                    <div className="order-details-grid">
                      <img
                        className="product-image"
                        src={'http://localhost:3500/images/'+
                          products.find((p) => p._id === item.productId)?.image
                        }
                        alt={
                          products.find((p) => p._id === item.productId)?.name
                        } // Added alt text for accessibility
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
                          <span className="quantity-label">
                            Quantity: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
           
          </div> 
          <div className="multi-field">
          
    <button type="submit">Proceed to Payment</button>
   
  

          </div>
        </div>
        
      </form>
    </>
  );
};

export default Orders;
