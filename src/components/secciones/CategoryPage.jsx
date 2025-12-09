import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header";

// helper para mostrar CLP bonito
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
      {
        id: "volcanita",
        product: {
          id: "volcanita-10mm-1.2x2.4",
          name: "PL. Volcanita 10 MM STD 1.2 X 2.4 MTS (21.6 KG)",
          brand: "Volcan",
          type: "Placa de yeso-cartón",
          warranty: "N/A",
          color: "Blanco",
          material: "Yeso-cartón",
          model: "STD 10 mm",
          measures: "1.2 x 2.4 m",
          thickness: "10 mm",
          weight: "21.6 kg",
          piecesPerPallet: "70 placas aprox.",
          description:
            "Placa de yeso-cartón estándar de 10 mm, ideal para tabiques interiores, cielos y revestimientos.",
          images: "/images/volcanita.jpeg",
          price: 6390,
        },
      },
      {
        id: "terciado",
        product: {
          id: "terciado-ran-colonial-9mm",
          name: "Terc Ran Colonial 9 MM 1.22 X 2.44 (108 PL)",
          brand: "Colonial",
          type: "Terciado ranurado",
          warranty: "N/A",
          color: "Natural",
          material: "Madera terciada",
          model: "Colonial Ranurado 9mm",
          measures: "1.22 x 2.44 m",
          thickness: "9 mm",
          weight: "—",
          piecesPerPallet: "108 planchas aprox.",
          description:
            "Terciado ranurado colonial de 9 mm ideal para revestimientos interiores, tabiques y aplicaciones decorativas.",
          images: "/images/terciado.webp",
          price: 21990,
        },
      },
      {
        id: "fibrocemento",
        product: {
          id: "fibrocemento-standard-6mm-120x240",
          name: "Fibrocemento Standard 120X240 X 6 MM (27.9 KG / 80 PL)",
          brand: "Standard",
          type: "Plancha de fibrocemento",
          warranty: "N/A",
          color: "Gris",
          material: "Fibrocemento",
          model: "Standard 6mm",
          measures: "1.20 x 2.40 m",
          thickness: "6 mm",
          weight: "27.9 kg",
          piecesPerPallet: "80 planchas aprox.",
          description:
            "Placa de fibrocemento estándar de 6 mm, ideal para revestimientos exteriores, tabiques estructurales y aplicaciones de alta durabilidad.",
          images: "/images/plancha_fibrocemento.webp",
          price: 14490,
        },
      },
      {
        id: "fibrocemento",
        product: {
          id: "fibrocemento-standard-120x240x6",
          name: "Fibrocemento Standard 120 x 240 x 6 mm",
          brand: "Standard",
          type: "Placa de fibrocemento para tabiquería",
          warranty: "Garantía del fabricante",
          color: "Gris",
          material: "Fibrocemento",
          model: "Standard",
          measures: "120 x 240 cm",
          thickness: "6 mm",
          piecesPerPallet: "80 planchas",
          description:
            "Placa de fibrocemento standard de 120 x 240 cm y 6 mm de espesor, ideal para tabiquería, cierres perimetrales y aplicaciones estructurales livianas. Alta resistencia a la humedad y al fuego.",
          images: "/images/fibrocemento.webp",
          price: 18490,
        },
      },
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
          price: 4290,
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
          price: 4390,
        },
      },
      {
        id: "cemento",
        product: {
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
          price: 5950,
        },
      },
      {
        id: "rejas",
        product: {
          id: "alambre-puas-motto-16bwg-275mt",
          name: "Alambre Puas Motto 16 BWG Rollo 275 MT Inchalam",
          brand: "Inchalam",
          type: "Alambre de púas galvanizado",
          warranty: "N/A",
          color: "Galvanizado",
          material: "Acero galvanizado",
          model: "Motto 16 BWG",
          measures: "Rollo 275 metros",
          thickness: "16 BWG",
          piecesPerPallet: "—",
          description:
            "Alambre de púas galvanizado Motto 16 BWG de 275 metros, ideal para cierre perimetral, protección y delimitación de terrenos.",
          images: "/images/alambre_de_puas_motto.webp",
          price: 39990,
        },
      },
    ],
  },

  terminaciones: {
    title: "Terminaciones",
    subcategories: [
      { id: "revestimientos", label: "Revestimientos" },
      { id: "pisos", label: "Pisos" },
      { id: "puertas", label: "Puertas" },
      { id: "ventanas", label: "Ventanas" },
      { id: "calefaccion", label: "Calefacción" },
    ],
    highlights: [
      {
        id: "calefaccion",
        product: {
          id: "kit-bosca-acero-inoxidable-6plg-10plg",
          name: 'Kit Bosca Cañería Acero Inoxidable 6" + 10"',
          brand: "Bosca",
          type: "Kit de instalación para estufa",
          warranty: "Garantía del fabricante",
          color: "Acero",
          material: "Acero inoxidable",
          model: "Kit Cañería Bosca",
          measures: '4 caños 6" + 2 caños 10"',
          thickness: "N/A",
          piecesPerPallet: "—",
          description:
            "Kit Bosca compuesto por 4 caños de acero inoxidable de 6 pulgadas y 2 caños de 10 pulgadas, ideal para la correcta instalación y evacuación de gases en estufas a leña.",
          images: "/images/kit_bosca.webp",
          price: 139990,
        },
      },
      {
        id: "revestimientos",
        product: {
          id: "bekron-polvo-25kg",
          name: "Bekron Polvo 25 kg",
          brand: "Bekron",
          type: "Adhesivo cementicio en polvo",
          warranty: "Garantía del fabricante",
          color: "Gris",
          material: "Cemento modificado con polímeros",
          model: "Bekron Polvo",
          measures: "Saco 25 kg",
          thickness: "N/A",
          piecesPerPallet: "—",
          description:
            "Bekron Polvo 25 kg, adhesivo cementicio para instalación de cerámicos y revestimientos en muros y pisos. Rendimiento aproximado entre 5,2 y 10,42 m² según tamaño de llana y técnica de aplicación.",
          images: "/images/Bekron_Polvo_25.webp",
          price: 4490,
        },
      },
      {
        id: "revestimientos",
        product: {
          id: "siding-madera-190x3660x6",
          name: "Siding Madera 190 x 3,66 m x 6 mm",
          brand: "Genérico",
          type: "Siding símil madera",
          warranty: "Garantía del fabricante",
          color: "Madera",
          material: "Fibrocemento",
          model: "Siding Madera",
          measures: "190 mm x 3,66 m",
          thickness: "6 mm",
          piecesPerPallet: "300 unidades",
          description:
            "Siding símil madera de fibrocemento 190 x 3,66 m x 6 mm, ideal para revestimientos exteriores e interiores. Otorga terminación estética tipo madera con alta resistencia a la humedad y al exterior.",
          images: "/images/siding_madera.jpg",
          price: 4190,
        },
      },
      {
        id: "revestimientos",
        product: {
          id: "bekron-da-polvo-25kg",
          name: "Bekron D.A. Polvo 25 kg",
          brand: "Bekron",
          type: "Adhesivo cementicio doble acción",
          warranty: "Garantía del fabricante",
          color: "Gris",
          material: "Cemento modificado con polímeros",
          model: "Bekron D.A.",
          measures: "Saco 25 kg",
          thickness: "N/A",
          piecesPerPallet: "—",
          description:
            "Bekron D.A. Polvo 25 kg, adhesivo cementicio de doble acción para instalación de cerámicos y porcelanatos en muros y pisos. Rendimiento aproximado entre 5,2 y 10,4 m² según técnica de aplicación.",
          images: "/images/bekron_ceramico.webp",
          price: 13990,
        },
      },
      {
        id: "revestimientos",
        product: {
          id: "solcrom-adhesivo-polvo-25kg",
          name: "Solcrom Adhesivo Polvo 25 kg",
          brand: "Weber",
          type: "Adhesivo cementicio en polvo",
          warranty: "Garantía del fabricante",
          color: "Gris",
          material: "Cemento modificado con polímeros",
          model: "Solcrom",
          measures: "Saco 25 kg",
          thickness: "N/A",
          piecesPerPallet: "—",
          description:
            "Solcrom adhesivo en polvo de 25 kg, marca Weber, indicado para la instalación de cerámicos y revestimientos en muros y pisos. Adecuado para aplicaciones interiores y exteriores.",
          images: "/images/solcrom.webp",
          price: 3490,
        },
      },
      {
        id: "revestimientos",
        product: {
          id: "solcrom-adhesivo-da-25kg",
          name: "Solcrom Adhesivo D.A Saco 25 Kg",
          brand: "Weber",
          type: "Adhesivo cementicio doble acción",
          warranty: "Garantía del fabricante",
          color: "Gris",
          material: "Cemento modificado con polímeros",
          model: "Solcrom D.A",
          measures: "Saco 25 kg",
          thickness: "N/A",
          piecesPerPallet: "—",
          description:
            "Solcrom adhesivo D.A en saco de 25 kg, marca Weber, formulado con tecnología de doble acción para la instalación de cerámicos y porcelanatos en muros y pisos, tanto en interiores como exteriores.",
          images: "/images/saco_solcrom.webp",
          price: 10990,
        },
      },
    ],
  },

  techos: {
    title: "Techos, Aislación y Cubiertas",
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
          name: "Pl. Zincalum AC 0.35 X 3.66 MT",
          brand: "Zincalum",
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
          price: 11490,
        },
      },
      {
        id: "plancha-zinc",
        product: {
          id: "pl-zincalum-5v-0.35-2.5mt",
          name: "PL. Zincalum 5V 0.35 X 2.5 MT",
          brand: "Zincalum",
          type: "Plancha para techumbre",
          warranty: "12 meses",
          color: "Galvanizado",
          material: "Acero galvanizado",
          model: "5V 0.35mm",
          measures: "2.5 m x 0,90 m",
          thickness: "0,35 mm",
          piecesPerPallet: "50 unidades aprox.",
          description:
            "Plancha Zincalum ondulada tipo 5V, ideal para techumbres residenciales y estructuras livianas.",
          images: "/images/plancha_zinc_0.35x2.5.webp",
          price: 7290,
        },
      },
      {
        id: "teja-continua",
        product: {
          id: "teja-continua-aysen-pro-negro",
          name: "Teja Cont. Aysen Pro 0.4 X 1.157 X 3.775 Negro",
          brand: "Aysén Pro",
          type: "Teja continua metálica",
          warranty: "Garantía del fabricante",
          color: "Negro",
          material: "Acero galvanizado prepintado",
          model: "Aysén Pro",
          measures: "0.4 x 1.157 x 3.775 m",
          thickness: "0.4 mm",
          piecesPerPallet: "Según proveedor",
          description:
            "Teja continua Aysén Pro color negro, fabricada en acero galvanizado prepintado. Ideal para cubiertas residenciales e industriales, ofrece alta resistencia, durabilidad y un diseño moderno.",
          images: "/images/teja_metalica_continua.webp",
          price: 29490,
        },
      },
      {
        id: "cubiertas",
        product: {
          id: "plancha-zincalum-ac-negro-035x366",
          name: "Plancha Zincalum Acanalada Negra 0.35 x 3,66 m",
          brand: "Genérico",
          type: "Plancha metálica acanalada",
          warranty: "Garantía del fabricante",
          color: "Negro",
          material: "Acero Zincalum prepintado",
          model: "Acanalada",
          measures: "0.35 mm x 3,66 m",
          thickness: "0.35 mm",
          piecesPerPallet: "—",
          description:
            "Plancha Zincalum acanalada color negro de 0,35 mm de espesor y 3,66 m de largo, ideal para cubiertas, techumbres y cierres exteriores. Ofrece alta resistencia a la corrosión y durabilidad.",
          images: "/images/plancha_zinc_acanalada.webp",
          price: 18890,
        },
      },
      {
        id: "aislacion",
        product: {
          id: "aislante-termoacustico-feltrex-240x15x55-36m2",
          name: "Aislante Termo Acustico Feltrex 240 X 15 X 55 MM 36 M2",
          brand: "Feltrex",
          type: "Aislante termoacústico",
          warranty: "Garantía del fabricante",
          color: "Gris",
          material: "Fieltro sintético",
          model: "Feltrex",
          measures: "240 x 15 x 55 mm",
          thickness: "55 mm",
          piecesPerPallet: "—",
          description:
            "Aislante termoacústico Feltrex, ideal para muros, techos y tabiques. Mejora el confort térmico y reduce la transmisión de ruido en aplicaciones residenciales y comerciales. Cobertura total de 36 m².",
          images: "/images/aislante_termico.webp",
          price: 49990,
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
          price: 3990,
        },
      },
    ],
  },
};

// 🔹 Tarjeta de producto con su propio carrito
const ProductCard = ({ product, addToCart, onViewCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAdd = () => {
    if (!addToCart) return;
    addToCart(product, quantity);
    setSuccessMessage("Producto agregado correctamente ✔️");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-7 w-full">
      {/* Imagen */}
      <div className="flex justify-center mb-4">
        <img
          src={product.images}
          alt={product.name}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Nombre */}
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        {product.name}
      </h2>

      {/* Marca */}
      {product.brand && (
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
      )}

      {/* Precio */}
      <p className="text-green-600 font-bold text-sm mb-4">
        {formatCLP(product.price)}
        <span className="text-gray-500 text-xs"> / unidad</span>
      </p>

      {/* Cantidad */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-medium text-gray-700">Cantidad</span>

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
                Number(e.target.value) > 0 ? Number(e.target.value) : 1
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
        <span className="text-sm font-medium text-gray-800">Total</span>
        <span className="font-bold text-green-700">
          {formatCLP(product.price * quantity)}
        </span>
      </div>

      {/* Botón agregar */}
      <button
        onClick={handleAdd}
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
        <button onClick={onViewCart} className="text-blue-700 hover:underline">
          Ver carrito
        </button>
      </div>
    </div>
  );
};

// 👇 acepta addToCart
const CategoryPage = ({ addToCart }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = CATEGORY_DETAILS[categoryId];

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

  const nonProductHighlights = (category.highlights || []).filter(
    (h) => !h.product
  );
  const productHighlights = (category.highlights || []).filter(
    (h) => h.product
  );

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
                    {categoryId === "jardin" && sub.id === "pellets" && (
                      <img
                        src="/images/pellets.jpg"
                        alt="pellet"
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

            {/* Destacados sin producto (solo texto / imágenes genéricas) */}
            {nonProductHighlights.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-10">
                {nonProductHighlights.map((item) => (
                  <div
                    key={item.id}
                    className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-md overflow-hidden"
                  >
                    <span className="italic text-base text-gray-700 text-center px-4">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Productos destacados con carrito */}
            {productHighlights.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {productHighlights.map((item) => (
                  <ProductCard
                    key={item.product.id}
                    product={item.product}
                    addToCart={addToCart}
                    onViewCart={() => navigate("/carrito")}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
