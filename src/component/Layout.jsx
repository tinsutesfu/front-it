import { Link, Outlet } from "react-router-dom";
import "../styles/shared/amazon-header.css";

import { useEffect, useState } from "react";
import Footer from "./Footer";

const Layout = ({ cartQuantity, updatequantity }) => {
  const [menu, setmenu] = useState("home");

  updatequantity();
  return (
    <>
      <div className="amazon-header">
        <div className="amazon-header-left-section">
          <Link to="amazon" className="header-link">
            <img className="amazon-logo" src="images/amazon-logo-white.png" />
            <img
              className="amazon-mobile-logo"
              src="images/amazon-mobile-logo-white.png"
            />
          </Link>

          <ul className="navbar-menu">
            <Link
              to="/"
              onClick={() => setmenu("home")}
              className={menu === "home" ? "active" : ""}>
              home
            </Link>
            <a
              href="#explore"
              onClick={() => setmenu("menu")}
              className={menu === "menu" ? "active" : ""}>
              menu
            </a>
            <a
              href="#"
              onClick={() => setmenu("mobile-app")}
              className={menu === "mobile-app" ? "active" : ""}>
              mobile-app
            </a>
            <a
              href="#footer"
              onClick={() => setmenu("contact us")}
              className={menu === "contact us" ? "active" : ""}>
              contact us
            </a>
          </ul>
        </div>

        <div className="amazon-header-middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="amazon-header-right-section">
          <Link className="orders-link header-link" to="orders">
            <span className="returns-text">Returns</span>
            <span className="orders-text">& Orders</span>
          </Link>

          <Link className="cart-link header-link" to="checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{cartQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
          <Link to='signin'>
            <span className="sign-text">signin</span>
          </Link>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
