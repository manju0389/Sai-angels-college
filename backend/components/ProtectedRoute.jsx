import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;