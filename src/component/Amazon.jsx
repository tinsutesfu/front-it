import "../styles/pages/amazon.css";
import axios from "../api/axios";
import { datacontect } from "../context/Context";
import { useContext } from "react";

const Amazon = ({ cart, setCart, saveToStorage }) => {
  const { products } = useContext(datacontect);
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

  
  

  const handleAddToCart = (productId) => {
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
      const deliveryOptions = [
        {
          id: "1",
          deliveryDays: 7,
          priceCents: 0,
        },
        {
          id: "2",
          deliveryDays: 3,
          priceCents: 499,
        },
        {
          id: "3",
          deliveryDays: 1,
          priceCents: 999,
        },
      ];
     
      // Add new item to cart with quantity 1 and a unique deliveryId
      setCart([
        ...cart,
        {
          productId,
          quantity: 1,
          
          deliveryoption: deliveryOptions,
        },
      ]);
    }
    saveToStorage();
    displaymessage(productId);
  };

  return (
    <>
      <div className="main">
        <div className="products-grid">
          {products?.map((product) => (
            <div className="product-container" key={product.id}>
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={'http://localhost:3500/images/'+
                    product.image}
                  alt={product.image}
                />
              </div>

              <div className="product-name limit-text-to-2-lines">
                {product.name}
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

             

              <div className="added-to-cart" data-product-id={product.id}>
                <img src="images/icons/checkmark.png" alt="Added" />
                Added
              </div>

              <button
                className={`add-to-cart-button button-primary js-add-to-cart`}
                onClick={() => handleAddToCart(product.id)}
                data-product-id={product.id}
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
