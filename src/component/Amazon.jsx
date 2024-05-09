
import '../styles/pages/amazon.css';
import Header from './Header';

;

const Amazon = ({cart,setCart,products,saveToStorage}) => {
  let timeoutId;

  const displaymessage=(productId)=>{
    const addedToCartElement = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);
    
    addedToCartElement.style.opacity = 1;
    
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      addedToCartElement.style.opacity = 0;
      
    }, 2000);
  };

  const generateUniqueDeliveryId=()=> {
  
    return Math.random().toString(36).substring(2, 15) + Math.abs(Date.now()).toString(36).substring(2);
  }
  const handleQuantityChange = (productId, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.productId === productId);
  
      if (existingItemIndex !== -1) {
        // Update quantity for existing item
  
        // Leverage spread syntax with conditional logic for a more concise update:
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity } // Update quantity if it's the matching item
            : item // Keep other items unchanged
        );
      } else {
        // Add new item to cart with the specified quantity
  
        const deliveryOptions = [{
          id: '1',
          deliveryDays: 7,
          priceCents: 0
        }, {
          id: '2',
          deliveryDays: 3,
          priceCents: 499
        }, {
          id: '3',
          deliveryDays: 1,
          priceCents: 999
        }];
        const newDeliveryId = generateUniqueDeliveryId();
  
        return [...prevCart, { productId, quantity, deliveryId: newDeliveryId, deliveryoption: deliveryOptions }];
      }
    });
  
    saveToStorage();
    displaymessage(productId);
    
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
      const deliveryOptions = [{
        id: '1',
        deliveryDays: 7,
        priceCents: 0
      }, {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
      }, {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
      }];
     const newDeliveryId = generateUniqueDeliveryId();
      // Add new item to cart with quantity 1 and a unique deliveryId
     setCart([...cart, { productId, quantity: 1, deliveryId: newDeliveryId,deliveryoption:deliveryOptions }]
       
      ); 
    }
    saveToStorage();
    displaymessage(productId);
  };
  
  


  
  return (
<>
       <Header/>
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
            {[...Array(10)].map((_, index) => (
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