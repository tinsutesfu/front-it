import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/shared/amazon-header.css";
import { CgProfile } from "react-icons/cg";
import { FaShoppingBag } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import Footer from "./Footer";
import { datacontext } from "../context/Context";

const Layout = () => {
  const [menu, setmenu] = useState("home");
  const { token,setToken,updatequantity,cartQuantity } = useContext(datacontext);
  const navigate = useNavigate();

  
  updatequantity();
  const logout=()=>{
    localStorage.removeItem('token');
    setToken('');
    navigate('/')
  }
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
            
            <span className="orders-text"> Orders</span>
          </Link>

          <Link className="cart-link header-link" to="checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{cartQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
          {!token? <Link to='signin'>
            <span className="sign-text">signin</span>
          </Link>:<div className="navbar-profile">
          <span className="profile"><CgProfile  /></span>
          <ul className="profile-dropdown">
            <li onClick={()=>navigate('tracking')}><FaShoppingBag /><p>myorders</p></li>
            <hr/>
            <li onClick={logout}><IoLogOutOutline /><p>logout</p></li>
          </ul>
            </div>}
         
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
