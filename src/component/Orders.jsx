import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/orders.css";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Added for accessing passed data

const Orders = () => {
  const location = useLocation();
  const { cart, selectedDelivery, products, orderTotal, newDeliveryId } =
    location.state || {}; // Destructure from state

  // No need for the context or updatequantity() function here

  useEffect(() => {
    console.log("Orders component received cart:", cart);
    console.log(
      "Orders component received selectedDelivery:",
      selectedDelivery
    );
  }, [cart, selectedDelivery]);

  return (
    <>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">delivery information</p>
          <div className="multi-field">
            <input type="text" placeholder="first name" />
            <input type="text" placeholder="last name" />
          </div>
          <div className="multi-field">
            <input type="email" placeholder="email address" />
            <input type="text" placeholder="street" />
          </div>
          <div className="multi-field">
            <input type="text" placeholder="city" />
            <input type="text" placeholder="state" />
          </div>
          <div className="multi-field">
            <input type="text" placeholder="zip code" />
            <input type="text" placeholder="country" />
          </div>
          <div className="multi-field">
            <input type="text" placeholder="phone" />
          </div>
          <div className="multi-field">
            <input type="button" value='proceed to payment' className="input-button" />
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
                <span className="order-header-label">deliveryID:</span>{newDeliveryId}
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
                                option.id === selectedDelivery[item.productId]
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
                        src={
                          products.find((p) => p.id === item.productId)?.image
                        }
                        alt={
                          products.find((p) => p.id === item.productId)?.name
                        } // Added alt text for accessibility
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {products.find((p) => p.id === item.productId)?.name}
                        </div>
                        <div className="product-price">
                          $
                          {(
                            products.find((p) => p.id === item.productId)
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
        </div>
      </form>
    </>
  );
};

export default Orders;
