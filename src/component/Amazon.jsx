import "../styles/pages/amazon.css";
import axios from "../api/axios";
import { datacontext } from "../context/Context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Amazon = ({products}) => {
  const {cart,setCart,token} = useContext(datacontext);
  const navigate=useNavigate()
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

  useEffect(()=>{
    if (!token ) {
      navigate('/signin')
    } else  {
      navigate('/amazon')
    } 
  },[token])
  
  

  const handleAddToCart = async (productId) => {
    const matchingItem = cart.find((item) => item.productId === productId);

    if (matchingItem) {
      // Update quantity for existing item in cart
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      try {
        // Add new item to cart with quantity 1
        const response = await axios.post("/api/cart/add", { productId }, { headers: { token } });
  
        // Update state with new cart item and delivery options
        setCart([
          ...cart,
          {
            productId,
            quantity: 1,
            deliveryOptions: response.data.deliveryOptions, // Assuming deliveryOptions is sent back in response
          },
        ]);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
   displaymessage(productId)
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
                  src={'http://localhost:3500/images/'+
                    product.image}
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
                <img
                  className="product-rating-stars"
                  src={`images/ratings/rating-${product.ratingstars * 10}.png`}
                  alt={`Rating: ${product.ratingstars}`}
                />
                <div className="product-rating-count link-primary">
                  {product.ratingcount}
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
                className='add-to-cart-button button-primary '
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
