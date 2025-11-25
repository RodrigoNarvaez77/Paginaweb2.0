import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Construccion from "./components/secciones/Construccion";
import CategoryPage from "./components/secciones/CategoryPage";
import SubcategoryPage from "./components/secciones/SubcategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/construccion" element={<Construccion />} />

        {/* Categoría (círculos grandes) */}
        <Route path="/categorias/:categoryId" element={<CategoryPage />} />

        {/* Subcategoría (ej: Cemento) */}
        <Route
          path="/categorias/:categoryId/:subcategoryId"
          element={<SubcategoryPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
