import { createContext, useEffect, useState } from "react";

import axios from "../api/axios";

export const datacontext = createContext(null);

const Contextprovider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cart, setCart] = useState([]);

  const [cartQuantity, setCartQuantity] = useState(0);

  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  const fetchproduct = async () => {
    try {
      const response = await axios.get('/api/it/list', { headers: { token } });
      const productsWithRatings = response.data.data.map((product,userId) => ({
        ...product,
        userRating: product.userRatings.find(rating => rating.userId === userId) || null
      }));
      setProducts(productsWithRatings);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const getCartData = async (token) => {
    try {
      const response = await axios.get("/api/cart/get", { headers: { token } });
      if (response.data.success) {
        const cartArray = response.data.cartdata.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          deliveryOptions: item.deliveryOptions, // Assuming delivery options are sent from backend
        }));
        setCart(cartArray);
      } else {
        // Handle error response if needed
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  

  useEffect(() => {
    async function loaddata() {
      if (token) {
          await fetchproduct();
      }
    
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await getCartData(localStorage.getItem("token"));
      }
    }
    loaddata();
  }, [token]);

  const updatequantity = () => {
    useEffect(() => {
      // Update cart quantity when cart items change
      const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartQuantity(totalQuantity);
    }, [cart]);
  };

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
   
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((cartItem) => cartItem.productId !== productId);
    setCart(newCart);
    //saveToStorage();
  };

  return (
    <datacontext.Provider
      value={{
        products,
        auth,
        setAuth,
        cart,
        cartQuantity,
        handleAddToCart,
        setCartQuantity,
        setCart,

        updatequantity,
        removeFromCart,

        token,
        setToken,
      }}
    >
      {children}
    </datacontext.Provider>
  );
};

export default Contextprovider;
