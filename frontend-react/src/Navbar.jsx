import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLoginUsername } from './UserStore';

function Navbar() {
  const [isNavbarShowing, setIsNavbarShowing] = useState(false);
  // returns the current URL
  const [location] = useLocation();

  const toggleNavbar = () => {
    setIsNavbarShowing(!isNavbarShowing);
  };

  const { getLoginUsername } = useLoginUsername();

  const loginUsername = getLoginUsername();

  let url;

  const isActiveLink = () => {
    console.log(loginUsername);
    if (loginUsername === "Guest") {
      url = "/login";
      // document.getElementById("loginlogout").innerHTML = "Login";
    } else {
      url = "/logout";
      // document.getElementById("loginlogout").innerHTML = "Logout";
    }
    
    if (location == url) {
        return "nav-link active"; // active is the class that set highlighting
    } else {
        return "nav-link";
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/" className="navbar-brand">e-BookStore</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className={`nav-link ${location === '/products' ? 'active' : ''}`}>
                Books
              </Link>
            </li>
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
              <Link href={`${loginUsername === 'Guest' ?  "/login" : "/logout"}`} className={isActiveLink()} id="loginlogout">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className={`nav-link ${location === '/cart' ? 'active' : ''}`}>
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
