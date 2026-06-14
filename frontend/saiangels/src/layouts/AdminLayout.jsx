// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";


export default function AdminLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar show={showSidebar} setShow={setShowSidebar} />

      {/* Overlay (mobile) */}
      {showSidebar && (
        <div
          className="overlay"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Main */}
      <div className="main-content w-100">
        <Topbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

        <div className="p-4">
          <Outlet /> {/* renders the admin page */} 
        </div>
      </div>
    </div>
  );
}