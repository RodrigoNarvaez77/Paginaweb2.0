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
          price: 5990,
        },
        {
          id: "cemento-biobio-25kg",
          name: "Cemento Biobío 25 kg",
          brand: "Cementos Biobío",
          type: "Cemento de uso general",
          warranty: "12 meses",
          color: "Gris",
          material: "Cemento Portland",
          model: "Biobío Gris 25kg",
          measures: "Saco 25 kg",
          thickness: "N/A",
          piecesPerPallet: "56 sacos aprox.",
          description:
            "Cemento Biobío 25 kg ideal para hormigones estructurales y trabajos de albañilería de alta resistencia.",
          images: "/images/cemento-biobio.webp",
          price: 5890,
        },
        {
          id: "cemento-polpaico-alta-resistencia-25kg",
          name: "Cemento Polpaico Alta Resistencia 25 kg",
          brand: "Polpaico",
          type: "Cemento de alta resistencia",
          warranty: "12 meses",
          color: "Gris",
          material: "Cemento Portland",
          model: "Alta Resistencia 25kg",
          measures: "Saco 25 kg",
          thickness: "N/A",
          piecesPerPallet: "56 sacos aprox.",
          description:
            "Cemento Polpaico Alta Resistencia 25 kg ideal para hormigones estructurales, fundaciones y aplicaciones que requieren mayor durabilidad.",
          images: "/images/cemento_polpaico_alta.jpeg",
          price: 6490,
        },
      ],
    },
    "rejas-perimetro": {
      title: "Rejas / Perímetro",
      products: [
        {
          id: "alambre-puas-motto-275mt",
          name: "Alambre Púas Motto 16 BWG Rollo 275 MT",
          brand: "Inchalám",
          type: "Alambre de púas",
          warranty: "12 meses",
          color: "Plateado",
          material: "Acero galvanizado",
          model: "Motto 16 BWG",
          measures: "Rollo 275 m",
          thickness: "16 BWG",
          piecesPerPallet: "N/A",
          description:
            "Alambre de púas Inchalám Motto 16 BWG, rollo de 275 metros, ideal para cercos perimetrales, protección de terrenos y faenas.",
          images: "/images/alambre_de_puas_motto.webp",
          price: 39990,
        },
      ],
    },
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
          price: 19990,
        },
      ],
    },
  },
};

// onAddToCart opcional para no romper nada si aún no lo conectas
const SubcategoryPage = ({ onAddToCart = () => {} }) => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();

  const categoryData = SUBCATEGORY_DATA[categoryId];
  const subcategory = categoryData ? categoryData[subcategoryId] : null;

  const [selectedProduct, setSelectedProduct] = useState(null);
  // cantidades por producto, ej: { "cemento-polpaico-25kg": 3 }
  const [quantities, setQuantities] = useState({});

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

  // formateo CLP
  const formatCLP = (value) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(value);

  const getQuantity = (productId) => quantities[productId] || 1;

  const handleIncrease = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const handleDecrease = (productId) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = current > 1 ? current - 1 : 1;
      return { ...prev, [productId]: next };
    });
  };

  const handleChangeQuantity = (productId, valueRaw) => {
    const value = Number(valueRaw);
    setQuantities((prev) => ({
      ...prev,
      [productId]: !Number.isNaN(value) && value > 0 ? value : 1,
    }));
  };

  const handleAddToCartClick = (product) => {
    const qty = getQuantity(product.id);
    onAddToCart(product, qty);
    console.log("🛒 Agregado al carrito:", product.id, "x", qty);
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
            {subcategory.products.map((product) => {
              const quantity = getQuantity(product.id);
              const total = product.price * quantity;

              return (
                <div
                  key={product.id}
                  className="flex flex-col items-center bg-gray-50 rounded-lg p-4 hover:shadow-md transition"
                >
                  {/* Imagen clickeable para abrir ficha técnica */}
                  <button
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
                  </button>

                  {/* Precio unitario */}
                  <p className="text-green-600 font-semibold text-sm mt-2">
                    {formatCLP(product.price)}{" "}
                    <span className="text-xs text-gray-500">/ unidad</span>
                  </p>

                  {/* Cantidad + Total + Botón agregar (TODO FUERA DEL MODAL) */}
                  <div className="mt-4 w-full flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-sm text-gray-600">Cantidad</span>
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleDecrease(product.id)}
                          className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) =>
                            handleChangeQuantity(product.id, e.target.value)
                          }
                          className="w-14 text-center outline-none border-l border-r"
                        />
                        <button
                          onClick={() => handleIncrease(product.id)}
                          className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total</span>
                      <span className="text-base font-bold text-gray-900">
                        {formatCLP(total)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCartClick(product)}
                      className="mt-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition w-full"
                    >
                      Agregar al carrito
                    </button>

                    <button
                      onClick={() => handleOpenModal(product)}
                      className="text-xs text-blue-600 hover:underline mt-1"
                    >
                      Ver ficha técnica
                    </button>
                    <button
                      onClick={() => navigate("/carrito")}
                      className="text-xs text-blue-600 hover:underline mt-1"
                    >
                      Ver carrito
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* MODAL SOLO FICHA TÉCNICA (sin cantidad ni botón de carrito) */}
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
