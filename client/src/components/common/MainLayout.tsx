import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
