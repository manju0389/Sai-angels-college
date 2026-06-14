// src/components/Topbar.jsx
import { FaBars } from "react-icons/fa";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="topbar d-flex justify-content-between align-items-center px-3">
      {/* Hamburger */}
      <button className="btn btn-light d-md-none" onClick={toggleSidebar}>
        <FaBars />
      </button>
      
      <h5 className="text-white m-0">Admin Panel</h5>

      <div className="dropdown">
        <button className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">
          Admin
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          <li><button className="dropdown-item">My Profile</button></li>
          <li><button onClick={handleLogout} className="btn btn-danger dropdown-item"> Logout </button></li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;