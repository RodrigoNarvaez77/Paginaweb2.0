import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CATEGORY_DETAILS = {
  estructuras: {
    title: "Estructuras",
    subcategories: [
      { id: "acero", label: "Acero" },
      { id: "metalcon", label: "Metalcon" },
      { id: "volcometal", label: "Volcometal" },
      { id: "maderas", label: "Maderas" },
    ],
    highlights: [
      { id: "acero", label: "ej: Foto de acero" },
      { id: "metalcon", label: "ej: Foto de metalcon" },
    ],
  },

  "obra-gruesa": {
    title: "Obra gruesa y perimetral",
    subcategories: [
      { id: "cemento", label: "Cemento" },
      { id: "hormigon", label: "Hormigón" },
      { id: "bloques", label: "Bloques" },
      { id: "rejas", label: "Rejas / Perímetro" },
    ],
    highlights: [
      {
        id: "cemento",
        product: {
          id: "cemento-polpaico-25kg",
          name: "Cemento Polpaico 25 kg",
          brand: "Polpaico",
          type: "Cemento de uso general",
          warranty: "12 meses",
          color: "Gris",
          material: "Cemento Portland",
          model: "Polpaico Gris 25kg",
          measures: "Saco 25 kg",
          thickness: "N/A",
          piecesPerPallet: "56 sacos aprox.",
          description:
            "Cemento Polpaico 25 kg ideal para hormigones, morteros y albañilería en obras de construcción general.",
          images: "/images/Cemento_Polpaico.webp",
          price: "$0",
        },
      },
      {
        id: "bloques",
        label: "Foto de bloques",
      },
    ],
  },

  techos: {
    title: "Techos",
    subcategories: [
      { id: "plancha-zinc", label: "Plancha Zinc" },
      { id: "osb", label: "Placa OSB" },
      { id: "teja-asfaltica", label: "Teja Asfáltica" },
      { id: "policarbonato", label: "Policarbonato" },
    ],
    highlights: [
      {
        id: "plancha-zinc",
        product: {
          id: "PL. ZINCALUM AC 0.35 X 3.66 MT",
          name: "PL. ZINCALUM AC 0.35 X 3.66 MT",
          brand: "Ejemplo",
          type: "Plancha para techumbre",
          warranty: "12 meses",
          color: "Galvanizado",
          material: "Acero galvanizado",
          model: "Zinc 5m",
          measures: "5 m x 0,90 m",
          thickness: "0,35 mm",
          piecesPerPallet: "50 unidades aprox.",
          description:
            "Plancha de zinc galvanizado ideal para techumbres residenciales e industriales.",
          images: "/images/zinc_acanalado.webp",
          price: "$0",
        },
      },
    ],
  },
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = CATEGORY_DETAILS[categoryId];

  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 p-10">
        <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
        <p className="text-gray-600">
          Revisa la URL o selecciona una categoría válida desde el menú.
        </p>
      </div>
    );
  }

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="w-full px-6 md:px-12">
        <div className="grid grid-cols-1 w-full">
          <section className="bg-white rounded-lg shadow-sm w-full px-8 py-10 md:px-14 md:py-12">
            {/* 🔙 Botón volver */}
            <button
              onClick={() => navigate("/")}
              className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              ⬅ Volver al inicio
            </button>

            <h1 className="text-4xl font-bold text-gray-900 mb-10">
              {category.title}
            </h1>

            {/* Subcategorías */}
            <div className="flex flex-wrap gap-10 mb-14">
              {category.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() =>
                    navigate(`/categorias/${categoryId}/${sub.id}`)
                  }
                  className="flex flex-col items-center gap-3 text-gray-800 hover:opacity-80"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-200">
                    {/* Imagen especial por subcategoría (cemento y plancha zinc) */}
                    {categoryId === "obra-gruesa" && sub.id === "cemento" && (
                      <img
                        src="/images/Cemento_Polpaico.webp"
                        alt="Cemento"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {categoryId === "techos" && sub.id === "plancha-zinc" && (
                      <img
                        src="/images/zinc_acanalado.webp"
                        alt="Plancha Zinc"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <span className="text-sm md:text-base italic">
                    {sub.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Destacados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
              {category.highlights.map((item) => {
                // Si el destacado tiene product → mostrar como tarjeta clickeable (foto+nombre+precio) tal cual cemento
                if (item.product) {
                  const p = item.product;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleOpenModal(p)}
                      className="flex flex-col items-center hover:opacity-90 transition"
                    >
                      <img
                        src={p.images}
                        alt={p.name}
                        className="w-56 h-56 object-contain mb-3"
                      />
                      <p className="text-gray-900 font-medium text-sm text-center">
                        {p.name}
                      </p>
                      <p className="text-green-600 font-semibold text-sm">
                        {p.price ?? "$0"}
                      </p>
                    </button>
                  );
                }

                // Resto de destacados simples
                return (
                  <div
                    key={item.id}
                    className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-md overflow-hidden"
                  >
                    <span className="italic text-base text-gray-700 text-center px-4">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* MODAL DETALLE (misma ficha técnica que en subcategoría) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full mx-4 p-6 md:p-8 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Ficha técnica – {selectedProduct.name}
            </h2>

            <div className="bg-gray-100 rounded-md p-4 space-y-2 text-sm md:text-base">
              <div>
                <span className="font-semibold">Marca:</span>{" "}
                {selectedProduct.brand}
              </div>
              <div>
                <span className="font-semibold">Tipo de producto:</span>{" "}
                {selectedProduct.type}
              </div>
              <div>
                <span className="font-semibold">Garantía:</span>{" "}
                {selectedProduct.warranty}
              </div>
              <div>
                <span className="font-semibold">Color:</span>{" "}
                {selectedProduct.color}
              </div>
              <div>
                <span className="font-semibold">Material:</span>{" "}
                {selectedProduct.material}
              </div>
              <div>
                <span className="font-semibold">Modelo:</span>{" "}
                {selectedProduct.model}
              </div>
              <div>
                <span className="font-semibold">Medidas:</span>{" "}
                {selectedProduct.measures}
              </div>
              <div>
                <span className="font-semibold">Espesor:</span>{" "}
                {selectedProduct.thickness}
              </div>
              <div>
                <span className="font-semibold">Piezas por Pallet:</span>{" "}
                {selectedProduct.piecesPerPallet}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-base font-semibold mb-2">Descripción:</h3>
              <div className="bg-gray-100 rounded-md p-3 text-sm md:text-base text-gray-800">
                {selectedProduct.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CategoryPage;
