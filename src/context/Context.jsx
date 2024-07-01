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
    const response = await axios.get("/api/it/list");
    setProducts(response.data.data);
  };

  const getCartData = async (token) => {
    try {
      const response = await axios.get("/api/cart/get", { headers: { token } });
      if (response.data.success) {
        const cartArray = Object.keys(response.data.cartdata).map((key) => {
          return {
            productId: key,
            quantity: response.data.cartdata[key],
          };
        });
        setCart(cartArray);
      } else {
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    async function loaddata() {
      await fetchproduct();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await getCartData(localStorage.getItem("token"));
      }
    }
    loaddata();
  }, []);

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
    if (token) {
      await axios.post("/api/cart/add", { productId }, { headers: { token } });
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
