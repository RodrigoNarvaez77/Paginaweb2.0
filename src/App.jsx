import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Construccion from "./components/secciones/Construccion";
import CategoryPage from "./components/secciones/CategoryPage";
import SubcategoryPage from "./components/secciones/SubcategoryPage";
import CartPage from "./components/secciones/CartPage"; // 👈 lo creamos abajo

function App() {
  // 🛒 CARRITO GLOBAL
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity) || 1;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });

    console.log("🛒 Agregado al carrito:", product.id, "x", qty);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const qty = Number(quantity);
    if (Number.isNaN(qty) || qty <= 0) return;

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <Router>
      <Routes>
        {/* Puedes pasar cart si después quieres mostrar badge con cantidad */}
        <Route path="/" element={<HomePage />} />

        <Route path="/construccion" element={<Construccion />} />

        {/* Categoría (círculos grandes) */}
        <Route path="/categorias/:categoryId" element={<CategoryPage />} />

        {/* Subcategoría (ej: Cemento) */}
        <Route
          path="/categorias/:categoryId/:subcategoryId"
          element={<SubcategoryPage onAddToCart={addToCart} />}
        />

        {/* 🛒 Página de carrito */}
        <Route
          path="/carrito"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
