import React, { useState } from 'react';
import { useLoginUsername } from './UserStore';
import { useCart } from './CartStore';
import { Link, useLocation } from 'wouter';

function Navbar() {
  const { getLoginUsername } = useLoginUsername();

  const loginUsername = getLoginUsername();

  // console.log(loginUsername);

  const [isNavbarShowing, setIsNavbarShowing] = useState(false);
  // returns the current URL
  const [location, setLocation] = useLocation();

  const toggleNavbar = () => {
    setIsNavbarShowing(!isNavbarShowing);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  let url;

  let y = document.getElementById("loginlogout");
  if ((loginUsername === "Guest") || (loginUsername === "null")) {    
    if (y)
      y.innerHTML = "Login";
  } else {
    if (y)
      y.innerHTML = "Logout";
  }

  const isActiveLink = () => {
    // console.log(loginUsername);
    if ((loginUsername === "Guest") || (loginUsername === "null")) {
      url = "/login";
    } else {
      url = "/logout";
    }
    
    if (location == url) {
        return "nav-link active"; // active is the class that set highlighting
    } else {
        return "nav-link";
    }
  }

  const handleCartBtnClick = () => {
    setLocation('/cart');
    // <Link href="/cart"></Link>
  }

  const { cart } = useCart();

  const spacing = 1;

  const loginlogoutClick = () => {
    if ((loginUsername === "Guest") || (loginUsername === "null")) {
      // login
      setLocation('/login');
    } else {
      // logout
      if (cart.length !== 0) {
        if (confirm("Are you sure? You still have shopping cart not yet checkout!")) {
          console.log("logout: You pressed OK!");
          setLocation('/logout');
        } else {
          console.log("logout: You pressed Cancel!");
          setLocation('/cart');
        }       
      } else {
        setLocation('/logout');  
      }
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container px-4 px-lg-5">
        <Link href="/" className="navbar-brand">e-BookStore</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            {/* <li className="nav-item"> */}
              {/* <Link href="/products" className={`nav-link ${location === '/products' ? 'active' : ''}`}> */}
                {/* Books */}
              {/* </Link> */}
            {/* </li> */}
            <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" onClick={handleButtonClick} aria-expanded="false">Shop</a>
    <ul className={`dropdown-menu ${showDropdown ? "show" : ""}`} aria-labelledby="navbarDropdown">
        <li>
          {/* <a class="dropdown-item" href="#!">All Products</a> */}
          <Link href="/products" className="dropdown-item" onClick={handleButtonClick}>
            All Products
          </Link>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          {/* <a class="dropdown-item" href="#!">Popular Items</a> */}
          <Link href="/productsPopular" className="dropdown-item" onClick={handleButtonClick}>
            Popular Items
          </Link>
        </li>
        <li>
          {/* <a class="dropdown-item" href="#!">New Arrivals</a> */}
          <Link href="/productsNewArrivals" className="dropdown-item" onClick={handleButtonClick}>
            New Arrivals
          </Link>
        </li>
    </ul>
</li>
            {/* <li className="nav-item">
              <Link href="/register" className={`nav-link ${location === '/register' ? 'active' : ''}`}>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link href={`${loginUsername === 'Guest' ?  "/login" : "/logout"}`} className={isActiveLink()} id="loginlogout">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className={`nav-link ${location === '/cart' ? 'active' : ''}`}>
                Cart
              </Link>
            </li> */}
          </ul>
          
          <ul className="navbar-nav me-2 mb-2 mb-lg-0">
          <li className="nav-item">
              <Link href="/register" className={`nav-link ${location === '/register' ? 'active' : ''}`}>
                Register
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link href="/login" className={`nav-link ${location === '/login' ? 'active' : ''}`}>
                Login
              </Link> */}
              {/* <Link href={`${loginUsername === 'Guest' ?  "/login" : "/logout"}`} className={`nav-link ${location === '/login' ? 'active' : ''}`} id="loginlogout">
                Login
              </Link> */}
              {/* <Link href={`${((loginUsername === "Guest") || (loginUsername === "null")) ?  "/login" : "/logout"}`} className={isActiveLink()} id="loginlogout" onClick={loginlogoutClick}> */}
                {/* Login */}
              {/* </Link> */}
              <Link href="#" className={isActiveLink()} id="loginlogout" onClick={loginlogoutClick}></Link>
            </li>
          {/* <li className="nav-item">
              <Link href="/cart" className={`nav-link ${location === '/cart' ? 'active' : ''}`}>
                Cart
              </Link>
            </li> */}
        </ul>
            <form className="d-flex">
    <button className="btn btn-outline-dark" type="submit" onClick={handleCartBtnClick}>
        <i className="bi-cart-fill me-1"></i>
        Cart
        <span className="badge bg-dark text-white ms-1 rounded-pill">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
    </button>
</form>
<span style={{ marginLeft: spacing + 'em'}} className="bg-dark text-white me-1 mb-2 mb-lg-0">&emsp;{loginUsername}&emsp;</span>  
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;
