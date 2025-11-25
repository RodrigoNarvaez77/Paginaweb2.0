import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SUBCATEGORY_DATA = {
  "obra-gruesa": {
    cemento: {
      title: "Cemento",
      products: [
        {
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
          price: "$0", // 👈 añadido
        },
      ],
    },
    // aquí podrías agregar hormigon, bloques, etc
  },
  techos: {
    "plancha-zinc": {
      title: "Plancha Zinc",
      products: [
        {
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
      ],
    },
  },
};

const SubcategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();

  const categoryData = SUBCATEGORY_DATA[categoryId];
  const subcategory = categoryData ? categoryData[subcategoryId] : null;

  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!subcategory) {
    return (
      <div className="min-h-screen bg-gray-50 p-10">
        <h1 className="text-2xl font-bold mb-4">Subcategoría no encontrada</h1>
        <p className="text-gray-600">
          Revisa la URL o vuelve a seleccionar desde la categoría.
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
        <section className="bg-white rounded-lg shadow-sm w-full px-8 py-10 md:px-14 md:py-12">
          {/* Volver atrás */}
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 mb-4 hover:underline"
          >
            ← Volver a categorías
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {subcategory.title}
          </h1>

          {/* Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {subcategory.products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleOpenModal(product)}
                className="flex flex-col items-center hover:opacity-90 transition"
              >
                <img
                  src={product.images}
                  alt={product.name}
                  className="w-56 h-56 object-contain mb-3"
                />

                <p className="text-gray-900 font-medium text-sm text-center">
                  {product.name}
                </p>

                <p className="text-green-600 font-semibold text-sm">
                  {product.price ?? "$0"}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL FICHA TÉCNICA */}
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

export default SubcategoryPage;
