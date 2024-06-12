import "./styles/shared/general.css";
import { Routes, Route } from "react-router-dom";
import Checkout from "./component/Checkout";
import Orders from "./component/Orders";
import Tracking from "./component/Tracking";
import Layout from "./component/Layout";
import Amazon from "./component/Amazon";
import { useEffect, useState } from "react";
import Header from "./component/Header";
import Login from "./component/Login";
import Register from "./component/Register";

function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartQuantity, setCartQuantity] = useState(0);

  const updatequantity = () => {
    useEffect(() => {
      // Update cart quantity when cart items change
      const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartQuantity(totalQuantity);
      saveToStorage();
    }, [cart]);
  };

  const saveToStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              cartQuantity={cartQuantity}
              setCartQuantity={setCartQuantity}
              cart={cart}
              updatequantity={updatequantity}
            />
          }>
          <Route index element={<Header />}/>
          <Route
            path="amazon"
            element={
              <Amazon
                cart={cart}
                setCart={setCart}
                cartQuantity={cartQuantity}
                setCartQuantity={setCartQuantity}
                saveToStorage={saveToStorage}
              />
            }
          />
          <Route path="orders" element={<Orders />} />
          <Route path="tracking" element={<Tracking />} />
           <Route  path="signin/" element={<Login/>}/>
        <Route  path="signup/" element={<Register/>}/>
        </Route>
        <Route
          path="checkout"
          element={
            <Checkout
              cart={cart}
              cartQuantity={cartQuantity}
              setCartQuantity={setCartQuantity}
              setCart={setCart}
              saveToStorage={saveToStorage}
              updatequantity={updatequantity}
            />
          }
        />
       
        
      </Routes>
    </>
  );
}

export default App;