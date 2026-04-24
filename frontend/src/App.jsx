import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Layout from "./components/Layout";
import HelpCenter from "./pages/HelpCenter";
import TermsOfUse from "./pages/TermsOfUse";
import ShippingPolicy from "./pages/ShippingPolicy";
import AboutUs from "./pages/AboutUs";
import CategoryProducts from "./pages/CategoryProducts";
import "./styles/global.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes with Shared Layout */}
            <Route
              path="/"
              element={<Layout theme={theme} onThemeToggle={toggleTheme} />}
            >
              <Route index element={<Home />} />
              <Route path="ayuda" element={<HelpCenter />} />
              <Route path="terminos" element={<TermsOfUse />} />
              <Route path="envios" element={<ShippingPolicy />} />
              <Route path="sobre-nosotros" element={<AboutUs />} />
              <Route path="categoria/:slug" element={<CategoryProducts />} />
            </Route>

            {/* Admin Route - Independent Layout */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
