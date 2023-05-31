import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import img from "../images/graduation-cap.png";
import { removeToken, getToken } from "../helpers";
import { Context } from "../Context/context";
import img1 from "../images/more.png"
export default function Navbar() {
  const [colorChange, setColorchange] = useState(false);
  const navigate = useNavigate();
  const { user, setUser,setCartItems } = useContext(Context);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authToken = getToken();
 
  // useEffect(() => {}, [authToken]);

   const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const changeNavbarColor = () => {
    const logo = document.getElementById("logo");
    const loginBtn = document.getElementById("loginBtn");
    const signUpBtn = document.getElementById('signUpBtn')
    const dropbtn = document.getElementById("dropbtn");
    const elements = document.querySelectorAll(".navbar-menu-item > a");
    if (window.scrollY >= 5) {
      setColorchange(true);
      if (loginBtn && signUpBtn) {
        loginBtn.classList.add("black");
        signUpBtn.classList.add("black");
      }
      logo.classList.add("black");
      elements.forEach((element) => {
        element.classList.add("black");
        dropbtn.classList.add("black");
      });
    } else {
      setColorchange(false);
      elements.forEach((element) => {
        element.classList.remove("black");
        logo.classList.remove("black");
        dropbtn.classList.remove("black");
        if (loginBtn && signUpBtn) {
          loginBtn.classList.remove("black");
          signUpBtn.classList.remove("black");
        }
      });
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const handleLogout = () => {
    removeToken();
    setUser();
    
    navigate("/login", { replace: true });
  };
  // console.log(user)
  return (
    <nav className={colorChange ? "navbar white" : "navbar"} id="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
        <img src={img} alt="grad-cap" />
        <Link to="/" className="navbar-logo" id="logo">
         Learnings on Web
        </Link>
        </div>
        <button
          className="hamburger-menu"
          onClick={toggleMobileMenu}
        >
          <img src={img1} alt="menu" />
        </button>

        <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li className="navbar-menu-item">
            <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          </li>
          <li className="navbar-menu-item">
            <Link to="/courses" onClick={toggleMobileMenu}>Courses</Link>
          </li>
          <li className="navbar-menu-item">
            <Link to="/membership" onClick={toggleMobileMenu}>Membership</Link>
          </li>
          <li className="navbar-menu-item">
            <div className="dropdown">
              <button className="dropbtn" id="dropbtn">
                Pages
                <span id="drop-symbol">
                  <img className={` drop-img`}
                    src={
                      colorChange
                        ? require("../images/down2.png")
                        : require("../images/down.png")
                    }
                    alt=""
                  />
                   <img className="resp"
                    src={
                      require("../images/down2.png")  
                    }
                    alt="drop"
                  />
                </span>
              </button>
              <div className="dropdown-content">
                <Link to="/about" onClick={toggleMobileMenu}>About Us</Link>

                <Link to="/become_a_teacher" onClick={toggleMobileMenu}>Become a Teacher</Link>
              </div>
            </div>
          </li>

          <li className="navbar-menu-item">
            <Link to="/events" onClick={toggleMobileMenu}>Events</Link>
          </li>
          <li className="navbar-menu-item">
            <Link to="/blogs" onClick={toggleMobileMenu}>Blog</Link>
          </li>
          <li className="navbar-menu-item">
            <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
          </li>
        </ul>
        {user ? (<div className="dropdown1">
          <button className="dropbtn1" id="dropbtn1">
            <img src={require("../images/user (1).png")} alt="" />
          </button>
          <div className="dropdown-content1">
            <Link to="/profile">My Profile</Link>
            <Link to="/profile">Update Profile</Link>
            <Link to="/profile">My Courses</Link>

            <Link to="/cart">My Cart</Link>
           
            <Link to="/contact">Help</Link>
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
        ) : (
          <div className="login-btn">
            <Link id="loginBtn" to="/login" style={{marginRight:5}}>
              Login
            </Link>
            <Link id="signUpBtn" to="/register">
            SignUp
          </Link>
          </div>
         
        )}
      </div>
    </nav>
  );
}
