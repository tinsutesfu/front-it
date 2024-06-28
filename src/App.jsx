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
import { datacontext } from "./context/Context";
import { useContext, useEffect, useState } from "react";

function App() {
  const { products } = useContext(datacontext);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const filteredResults =products.filter((product) =>
      ((product.name).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults);
  }, [products, search])
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout search={search} setSearch={setSearch}/>}>
          <Route index element={<Header />} />
          <Route path="amazon/" element={<Amazon products={searchResults} />} />
          <Route path="orders" element={<Orders />} />
          
          <Route path="tracking/" element={<Tracking />} />
          <Route path="signin/" element={<Login />} />
          <Route path="signup/" element={<Register />} />
        </Route>
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
