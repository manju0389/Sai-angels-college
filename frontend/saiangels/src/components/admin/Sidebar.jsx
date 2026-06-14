// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import logo from "/images/main-logo.jpg";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const Sidebar = ({ show, setShow }) => {
  return (
    
    <div className={`sidebar ${show ? "show" : ""}`}>
      <img src={logo} alt="Sai Angels Logo" className="logo mb-5" />

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin" className="nav-link text-white">Dashboard</Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/home" className="nav-link text-white">
            Home Page
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/achievements" className="nav-link text-white">
            Achievements Page
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/gallery" className="nav-link text-white">
            Gallery Page
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/videos" className="nav-link text-white">
            Videos Page
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/about" className="nav-link text-white">
            About Page
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" onClick={handleLogout} className="nav-link text-white">
            Logout
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;