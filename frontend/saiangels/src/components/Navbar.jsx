import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/images/main-logo.png";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [achievementOpen, setAchievementOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar container">
          <div className="top-left">
            <i className="fa-solid fa-envelope"></i>{" "}
            <a href="mailto:principal.saiangelspucollege@gmail.com">
              principal.saiangelspucollege@gmail.com
            </a>
          </div>

          <div className="top-right">
            <i className="fa-solid fa-phone"></i>{" "}
            <a href="tel:+919535429881">+91 95354 29881</a> /
            <a href="tel:+919686929970"> +91 96869 29970</a>

            <div className="social-icons">
              <span>
                <a href="https://www.facebook.com/Saiangelspuc/"
                  target="_blank" rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </span>

              <span>
                <a href="https://www.youtube.com/@saiangelschikmagalur5459"
                  target="_blank" rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </span>

              <span>
                <a href="https://www.instagram.com/saiangelspucollege/?hl=en"
                  target="_blank" rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </span>

              <span>
                <a href="https://api.whatsapp.com/send?phone=919535429881"
                  target="_blank" rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="navbar-custom">
        <div className="nav-container container">

          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="Sai Angels Logo"
              className="logo"
            />
          </Link>

          {/* Mobile Menu Button */}
          <div
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>

          {/* Menu */}
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>

            <Link to="/">Home</Link>
            <Link to="/about">About</Link>

            {/* ACHIEVEMENTS DROPDOWN */}
            <div
              className={`nav-dropdown ${
                achievementOpen ? "open" : ""
              }`}
            >
              <div
                className="dropdown-toggle-custom"
                onClick={() => setAchievementOpen(!achievementOpen)}
              >
                Achievements
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              <div className="dropdown-menu-custom">
                <Link
                  to="/results"
                  onClick={() => setAchievementOpen(false)}
                >
                  JEE & NEET Results
                </Link>

                <Link
                  to="/achievements"
                  onClick={() => setAchievementOpen(false)}
                >
                  Achievements
                </Link>

              </div>
            </div>

            <Link to="/curriculum">Curriculum</Link>
            <Link to="/admission">Admission</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/video">Video</Link>
            <Link to="/contactus">Contact</Link>
          </div>
        </div>
      </nav>
    </>
  );
}