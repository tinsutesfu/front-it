import "./styles/shared/general.css";
import { Routes, Route } from "react-router-dom";
import Checkout from "./component/Checkout";
import Orders from "./component/Orders";
import Tracking from "./component/Tracking";
import Layout from "./component/Layout";
import Amazon from "./component/Amazon";

import Header from "./component/Header";
import Login from "./component/Login";
import Register from "./component/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Header />} />
          <Route path="amazon" element={<Amazon />} />
          <Route path="orders" element={<Orders />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="signin/" element={<Login />} />
          <Route path="signup/" element={<Register />} />
        </Route>
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
