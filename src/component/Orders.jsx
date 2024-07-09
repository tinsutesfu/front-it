import { useNavigate } from "react-router-dom";
import "../styles/pages/orders.css";
import dayjs from "dayjs";
import axios from "../api/axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { datacontext } from "../context/Context";

const Orders = () => {
  const { token, products } = useContext(datacontext);
  const location = useLocation();
  const { cart, selectedDelivery, orderTotal, deliveryId } =
    location.state || {};
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Orders component received cart:", cart);
    console.log(
      "Orders component received selectedDelivery:",
      selectedDelivery
    );
  }, [cart, selectedDelivery]);
  const onchangehanndler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  const submitorder = async (e) => {
    e.preventDefault();

    const orderItems = cart?.map((item) => {
      return {
        name: products.find((p) => p._id === item.productId)?.name,
        productId: item.productId,
        quantity: item.quantity,
        deliveryOptionId: `Delivery date: ${dayjs()
          .add(
            // Find the selected delivery option for this item
            item.deliveryOptions?.find(
              (option) => option.id === selectedDelivery[item.productId]
            )?.deliveryDays,
            "day"
          )
          .format("dddd, MMMM D")}`, // Use selectedDelivery from props
      };
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: orderTotal.toFixed(2),
      deliveryId,
    };

    try {
      // Send order to backend using axios
      const response = await axios.post("/api/place/order", orderData, {
        headers: { token }, // Include token in Authorization header
      });
      if (response.data.success && orderItems !== undefined) {
        navigate("/tracking");
      } else {
        alert("incomplete orderdata");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else if (!cart) {
      navigate("/checkout");
    }
  }, [token, cart]);

  return (
    <>
      <form onSubmit={submitorder} className="place-order">
        <div className="place-order-left">
          <p className="title">delivery information</p>
          <div className="multi-field">
            <input
              required
              name="firstname"
              onChange={onchangehanndler}
              value={data.firstname}
              type="text"
              placeholder="first name"
            />
            <input
              required
              name="lastname"
              onChange={onchangehanndler}
              value={data.lastname}
              type="text"
              placeholder="last name"
            />
          </div>
          <div className="multi-field">
            <input
              required
              name="email"
              onChange={onchangehanndler}
              value={data.email}
              type="email"
              placeholder="email address"
            />
            <input
              required
              name="street"
              onChange={onchangehanndler}
              value={data.street}
              type="text"
              placeholder="street"
            />
          </div>
          <div className="multi-field">
            <input
              required
              name="city"
              onChange={onchangehanndler}
              value={data.city}
              type="text"
              placeholder="city"
            />
            <input
              required
              name="state"
              onChange={onchangehanndler}
              value={data.state}
              type="text"
              placeholder="state"
            />
          </div>
          <div className="multi-field">
            <input
              required
              name="zipcode"
              onChange={onchangehanndler}
              value={data.zipcode}
              type="text"
              placeholder="zip code"
            />
            <input
              required
              name="country"
              onChange={onchangehanndler}
              value={data.country}
              type="text"
              placeholder="country"
            />
          </div>
          <div className="multi-field">
            <input
              required
              name="phone"
              onChange={onchangehanndler}
              value={data.phone}
              type="text"
              placeholder="phone"
            />
          </div>
        </div>

        <div className="place-order-right">
          <div className="title"> your order</div>

          <div className="orders-grid">
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-total">
                  <span className="order-header-label"> Order total</span>:$
                  {orderTotal?.toFixed(2) || 0}
                </div>
              </div>

              <p className="order-header-right-section">
                <span className="order-header-label">deliveryID:</span>
                {deliveryId}
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
                            item.deliveryOptions?.find(
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
                        src=
                        {`/uploads/${ products.find((p) => p._id === item.productId)?.image}`}
                        alt={
                          products.find((p) => p._id === item.productId)?.name
                        } // Added alt text for accessibility
                      />

                      <div className="cart-item-details">
                        <div
                          className="product-name"
                          title={
                            products.find((p) => p._id === item.productId)?.name
                          }
                        >
                          {products.find((p) => p._id === item.productId)?.name
                            .length <= 25
                            ? products.find((p) => p._id === item.productId)
                                ?.name
                            : `${products
                                .find((p) => p._id === item.productId)
                                ?.name.slice(0, 25)}...`}
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
          <div className="multi-field"></div>

          <button className="button" type="submit">
            Proceed to Payment
          </button>
        </div>
      </form>
    </>
  );
};

export default Orders;
