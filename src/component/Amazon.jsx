import { useEffect, useState } from 'react'
import '../styles/pages/amazon.css';
;

const Amazon = ({cart,setCart,setCartQuantity,products,saveToStorage}) => {
  let timeoutId;

  const displaymessage=(productId)=>{
    const addedToCartElement = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);
    
    addedToCartElement.style.opacity = 1;
    
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      addedToCartElement.style.opacity = 0;
      
    }, 2000);
  };
  
  const handleQuantityChange = (productId, quantity) => {
    
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.productId === productId);

      if (existingItemIndex !== -1) {
        // Update quantity for existing item
        return prevCart.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity } : item
        );
      } else {
        // Add new item to cart with selected quantity
        return [...prevCart, { productId, quantity }];
      }
    });

        saveToStorage() 
        displaymessage(productId)
   
  };

  

  const handleAddToCart = (productId) => {
    const matchingItem = cart.find((item) => item.productId === productId);
       
    if (matchingItem) {
      // Update quantity for existing item in cart
      setCart(
        cart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Add new item to cart with quantity 1
      setCart([...cart, { productId, quantity: 1 }]);
    }
    saveToStorage()
    displaymessage(productId)
  
};


  
  return (
<>
  <div className="main">
      <div className="products-grid">

      {products.map((product) => (
  <div className="product-container" key={product.id}>
    <div className="product-image-container">
      <img className="product-image" src={product.image} alt={product.name} />
    </div>

    <div className="product-name limit-text-to-2-lines">
      {product.name}
    </div>

    <div className="product-rating-container">
      <img
        className="product-rating-stars"
        src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        alt={`Rating: ${product.rating.stars}`}
      />
      <div className="product-rating-count link-primary">
        {product.rating.count}
      </div>
    </div>

    <div className="product-price">
      ${((product.priceCents / 100).toFixed(2))}
    </div>

    <div className="product-quantity-container">
      <select 
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}>
        {[...Array(100)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>

    <div className="product-spacer"></div>

    <div className="added-to-cart" data-product-id={product.id}>
          <img src="images/icons/checkmark.png" alt="Added" />
          Added
        </div>

    <button
     className={`add-to-cart-button button-primary js-add-to-cart`} 
     onClick={()=>handleAddToCart(product.id)} data-product-id={product.id}
    >
      Add to Cart
    </button>
  </div>
  ))}

        
      </div>
    </div>
</>
  )
}
 

export default Amazon;