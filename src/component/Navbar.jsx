// import { Link, Outlet } from 'react-router-dom';

// import '../styles/pages/navbar.css'
// import { useState } from 'react';

// const Navbar = () => {
// const [menu,setmenu]=useState('home')


//   return (
//     <>
//     <div className="amazon-header">
//       <div className="amazon-header-left-section">
//         <Link to="/" className="header-link">
//           <img className="amazon-logo"
//             src="images/amazon-logo-white.png"/>
//           <img className="amazon-mobile-logo"
//             src="images/amazon-mobile-logo-white.png"/>
//         </Link>
//       </div>

//       <div className="amazon-header-middle-section">
//        <ul className='navbar-menu'>
//         <li onClick={()=>setmenu('home')} className={menu==='home' ? 'active':''}>home</li>
//         <li onClick={()=>setmenu('menu')} className={menu==='menu' ? 'active':''}>menu</li>
//         <li onClick={()=>setmenu('mobile-app')} className={menu==='mobile-app' ? 'active':''}>mobile-app</li>
//         <li onClick={()=>setmenu('contact us')} className={menu==='contact us' ? 'active':''}>contact us</li>
//        </ul>
       
//       </div>

//       <div className="amazon-header-right-section">
//         <button className="search-button">
//           <img className="search-icon" src="images/icons/search-icon.png"/>
//         </button>

//         <Link className="cart-link header-link" to="checkout">
//           <img className="cart-icon" src="images/icons/cart-icon.png"/>
//           <div className="cart-quantity"></div>
//           <div className="cart-text">Cart</div>
//         </Link>

//         <div >
//           <span className="sign-text">signin</span>
          
//         </div>
//       </div>
      
//     </div>
//     <Outlet/>
//     </>
//   )
// }

// export default Navbar
