import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/shared/layout.css";
import { CgProfile } from "react-icons/cg";
import { FaShoppingBag } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { datacontext } from "../context/Context";

const Layout = ({search,setSearch}) => {
  const [menu, setmenu] = useState("home");
  const searchRef = useRef(null);
  const [searchInput, setSearchInput] = useState(null);
  const { token,setToken,updatequantity,cartQuantity} = useContext(datacontext);
  const navigate = useNavigate();


  
  useEffect(() => {
    setSearchInput(searchRef.current);
  }, []);

  const clearSearchInput = () => {
    if (searchInput) {
      searchInput.value = '';
    }
  };

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
            <img className="amazon-logo" src="images/t-zon.jpg" />
            
          </Link>

          <ul className="navbar-menu">
            <Link
              to="/"
              onClick={() => setmenu("home")}
              className={menu === "home" ? "active" : ""}>
              home
            </Link>
            <Link
              to="amazon"
              onClick={() => setmenu("menu")}
              className={menu === "menu" ? "active" : ""}>
              menu
            </Link>
            <a
              href="#footer"
              onClick={() => setmenu("contact us")}
              className={menu === "contact us" ? "active" : ""}>
              contact us
            </a>
          </ul>
        </div>

        <form className="amazon-header-middle-section" onSubmit={(e) => e.preventDefault()}>
          <input className="search-bar" id="search" type="text" placeholder="Search product" value={search} onChange={(e) => setSearch(e.target.value)}
            ref={searchRef}/>

          <button className="search-button"  onClick={clearSearchInput}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </form>

        <div className="amazon-header-right-section">
          <Link className="orders-link header-link" to="orders">
            
            <span className="orders-text">checkout</span>
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
