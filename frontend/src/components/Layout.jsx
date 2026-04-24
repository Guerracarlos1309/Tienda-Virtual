import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";

const Layout = ({ theme, onThemeToggle }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={() => navigate("/admin")}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <main className="main-content">
        <Outlet />
      </main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </>
  );
};

export default Layout;
