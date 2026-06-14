import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* renders the current route’s page */}
      </main>
      <Footer />
    </>
  );
}