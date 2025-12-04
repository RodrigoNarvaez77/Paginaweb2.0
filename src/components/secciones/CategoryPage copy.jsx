import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// 💰 helper para mostrar CLP bonito
const formatCLP = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value || 0);

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
          price: 5990,
        },
      },
      {
        id: "cemento",
        product: {
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
          price: 19990,
        },
      },
    ],
  },

  jardin: {
    title: "Jardín / Exterior",
    subcategories: [
      { id: "pellets", label: "Pellets / Combustión" },
      { id: "maceteros", label: "Maceteros" },
      { id: "riego", label: "Riego" },
      // las que ya tengas...
    ],
    highlights: [
      {
        id: "pellets",
        product: {
          id: "pellets-madera-15kg",
          name: "Pellets de Madera 15 kg",
          brand: "Premium",
          type: "Pellets para combustión",
          warranty: "N/A",
          color: "Madera natural",
          material: "Madera comprimida",
          model: "Saco 15 kg",
          measures: "15 kg",
          thickness: "N/A",
          piecesPerPallet: "50 sacos aprox.",
          description:
            "Pellets de madera premium para estufas a combustión, alta eficiencia y bajo residuo.",
          images: "/images/pellet.jpg",
          price: 6990,
        },
      },
    ],
  },
};

// 👇 acepta addToCart
const CategoryPage = ({ addToCart }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = CATEGORY_DETAILS[categoryId];

  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // si la categoría tiene algún producto destacado, lo seleccionamos por defecto
  useEffect(() => {
    if (!category) return;
    const firstWithProduct = category.highlights.find((h) => h.product);
    if (firstWithProduct) {
      setSelectedProduct(firstWithProduct.product);
      setQuantity(1);
    } else {
      setSelectedProduct(null);
    }
  }, [categoryId, category]);

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

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedProduct || !addToCart) return;

    // 👉 solo una vez
    addToCart(selectedProduct, quantity);

    setSuccessMessage("Producto agregado correctamente ✔️");

    // Ocultar después de 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
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

            {/* Destacados (arriba) – solo los que NO tienen product para evitar duplicar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-10">
              {category.highlights.map((item) => {
                if (item.product) return null; // no duplicar el producto principal

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

            {/* 💳 Tarjeta de compra fuera del modal */}
            {selectedProduct && (
              <div className="mt-8">
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-7 max-w-md w-full">
                  {/* Imagen centrada */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={selectedProduct.images}
                      alt={selectedProduct.name}
                      className="w-32 h-32 object-contain"
                    />
                  </div>

                  {/* Nombre */}
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {selectedProduct.name}
                  </h2>

                  {/* Precio */}
                  <p className="text-green-600 font-bold text-sm mb-4">
                    {formatCLP(selectedProduct.price)}
                    <span className="text-gray-500 text-xs"> / unidad</span>
                  </p>

                  {/* Cantidad */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      Cantidad
                    </span>

                    <div className="inline-flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={decrease}
                        className="w-8 h-8 text-base flex items-center justify-center hover:bg-gray-100"
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Number(e.target.value) > 0
                              ? Number(e.target.value)
                              : 1
                          )
                        }
                        className="w-14 text-center border-x text-base outline-none"
                      />

                      <button
                        onClick={increase}
                        className="w-8 h-8 text-base flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-800">
                      Total
                    </span>
                    <span className="font-bold text-green-700">
                      {formatCLP(selectedProduct.price * quantity)}
                    </span>
                  </div>

                  {/* Botón agregar */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold"
                  >
                    Agregar al carrito
                  </button>

                  {/* Mensaje de éxito */}
                  {successMessage && (
                    <p className="text-green-600 text-sm mt-3 text-center">
                      {successMessage}
                    </p>
                  )}

                  {/* Ver carrito */}
                  <div className="mt-4 text-sm">
                    <button
                      onClick={() => navigate("/carrito")}
                      className="text-blue-700 hover:underline"
                    >
                      Ver carrito
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
