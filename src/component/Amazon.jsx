import "../styles/pages/amazon.css";
import axios from "../api/axios";
import { datacontext } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";

const Amazon = ({ products }) => {
  const [userRatings, setUserRatings] = useState({});
  const { cart, setCart, token } = useContext(datacontext);
  const navigate = useNavigate();
  let timeoutId;

  const displaymessage = (productId) => {
    const addedToCartElement = document.querySelector(
      `.added-to-cart[data-product-id="${productId}"]`
    );

    addedToCartElement.style.opacity = 1;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      addedToCartElement.style.opacity = 0;
    }, 2000);
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      navigate("/amazon");
    }
  }, [token]);

  const handleAddToCart = async (productId) => {
    const matchingItem = cart.find((item) => item.productId === productId);

    if (matchingItem) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      try {
        const response = await axios.post(
          "/api/cart/add",
          { productId },
          { headers: { token } }
        );

        setCart([
          ...cart,
          {
            productId,
            quantity: 1,
            deliveryOptions: response.data.deliveryOptions,
          },
        ]);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
    displaymessage(productId);
  };

  const handleRatingChange = async (productId, newRating) => {
    try {
      const response = await axios.post(
        "/api/it/rating",
        { productId, rating: newRating },
        { headers: { token } }
      );

      if (response.data.success) {
        setUserRatings((prevRatings) => ({
          ...prevRatings,
          [productId]: {
            rating: newRating,
            count: prevRatings[productId]?.count
              ? prevRatings[productId].count + 1
              : 1,
          },
        }));
        toast.success("Your rating has been submitted!");
      } else {
        toast.error("Failed to submit your rating. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="main">
        <div className="products-grid">
          {products?.map((product) => (
            <div className="product-container" key={product._id}>
              <div className="product-image-container">
                <img
                  className="product-image"
                  https://front-it-solution.onrender.com/" + product.image}
                  alt={product.image}
                />
              </div>

              <div className="product-name">
                <span className="product-name-text" title={product.name}>
                  {product.name.length <= 25
                    ? product.name
                    : `${product.name.slice(0, 25)}...`}
                </span>
              </div>

              <div className="product-rating-container">
                <Rating
                  name={`user-rating-${product._id}`}
                  readOnly={!!product.userRating * 10}
                  value={product.userRating?.rating * 10 || 0}
                  onChange={(event, newRating) =>
                    handleRatingChange(product._id, newRating)
                  }
                  precision={0.5}
                  size="small"
                />

                <div className="product-rating-count link-primary">
                  {product.ratingcount || 0}
                </div>
              </div>

              <div className="product-price">
                ${(product.priceCents / 100).toFixed(2)}
              </div>

              <div className="product-spacer"></div>

              <div className="added-to-cart" data-product-id={product._id}>
                <img src="images/icons/checkmark.png" alt="Added" />
                Added
              </div>

              <button
                className="add-to-cart-button button-primary "
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Amazon;
