import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/images/main-logo.jpg";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
      <div className="top-bar container">
        <div className="top-left">
          <i className="fa-solid fa-envelope"></i> {" "} <a href="mailto:principal.saiangelspucollege@gmail.com"> principal.saiangelspucollege@gmail.com </a>
        </div>

        <div className="top-right">
          <i className="fa-solid fa-phone"></i> {" "} <a href="tel:+919535429881"> +91 95354 29881 </a>  / < a href="tel:+919686929970"> +91 96869 29970 </a>

          <div className="social-icons">
            <span> <a href="https://www.facebook.com/Saiangelspuc/" target="_blank" rel="noopener noreferrer"> <i className="fa-brands fa-facebook"></i> </a></span>
            <span> <a href="https://www.youtube.com/@saiangelschikmagalur5459" target="_blank" rel="noopener noreferrer"> <i className="fa-brands fa-youtube"></i> </a></span>
            <span> <a href="https://www.instagram.com/saiangelspucollege/?hl=en" target="_blank" rel="noopener noreferrer"> <i className="fa-brands fa-instagram"></i> </a></span>
        </div>
        </div>
      </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="navbar-custom">
        <div className="nav-container container">

          {/* Logo Image */}
          <a href="/">
            <img src={logo} alt="Sai Angels Logo" className="logo" />
          </a>

          {/* Mobile Menu Button */}
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

          {/* Menu */}
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/achievements">Achievements</Link>
            <Link to="/curriculum">Curriculum</Link>
            <Link to="/admission">Admission</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/video">Video</Link>
            <Link to="/contactus">Contact</Link>

            {/* Profile Dropdown 
            <div className="profile">
              <div
                className="avatar"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                Sai
              </div>

              <div className={`profile-menu ${profileOpen ? "show" : ""}`}>
                <Link to="/admin">Admin</Link>
                <button>Logout</button>
              </div>
            </div>*/}
          </div>

        </div>
        
      </nav>
      
    </>
  );
}