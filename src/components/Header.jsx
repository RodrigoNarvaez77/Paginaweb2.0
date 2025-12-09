import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMapPin, FiSearch, FiShoppingCart, FiMenu } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const isConstruccionPage = location.pathname === "/construccion";

  const categorias = [
    {
      id: "obra-gruesa",
      label: "Obra gruesa y perimetral",
      image: "/images/obra_gruesa.jpg",
    },
    {
      id: "estructuras",
      label: "Estructuras",
      image: "/images/estructuras-acero.jpg",
    },
    {
      id: "techos",
      label: "Techos, Aislación y Cubiertas",
      image: "/images/techos.jpg",
    },
    {
      id: "terminaciones",
      label: "Terminaciones",
      image: "/images/terminaciones.webp",
    },
    {
      id: "herramientas",
      label: "Herramientas y Maquinarias",
      image: "/images/herramientas.webp",
    },
    {
      id: "electricidad",
      label: "Electricidad / Iluminación",
      image: "/images/electricidad.png",
    },
    {
      id: "plomeria",
      label: "Plomería / Gasfitería",
      image: "/images/plomeria.jpg",
    },
    {
      id: "jardin",
      label: "Jardín / Exterior",
      image: "/images/jardin.webp",
    },
  ];

  const searchIndex = [
    // Cemento
    {
      keywords: ["cemento", "polpaico", "biobio"],
      path: "/categorias/obra-gruesa/cemento",
    },

    // Rejas / Perímetro (alambre de púas)
    {
      keywords: ["alambre", "pua", "púas", "motto", "inchalam", "perimetro"],
      path: "/categorias/obra-gruesa/rejas-perimetro",
    },

    // Plancha Zinc
    {
      keywords: ["zinc", "plancha", "zincalum"],
      path: "/categorias/techos/plancha-zinc",
    },

    // Pellets
    {
      keywords: ["pellet", "pellets", "combustion"],
      path: "/categorias/jardin/pellets",
    },

    // Terciados
    {
      keywords: ["terciado", "terciados", "colonial", "ranurado"],
      path: "/categorias/estructuras/terciados",
    },

    // Fibrocemento
    {
      keywords: ["fibrocemento", "fibra", "placa exterior"],
      path: "/categorias/estructuras/fibrocemento",
    },

    // Volcanita
    {
      keywords: ["volcanita", "yeso", "carton", "volcan"],
      path: "/categorias/estructuras/volcanita",
    },
  ];

  const handleSearch = () => {
    const q = searchText.trim().toLowerCase();
    if (!q) return;

    const match = searchIndex.find((item) =>
      item.keywords.some((k) => q.includes(k))
    );

    if (match) {
      navigate(match.path);
      setMenuOpen(false);
    } else {
      console.log("🔍 Sin resultados para:", q);
    }
  };

  // ⚠️ Cambia estas rutas a las versiones en negro de tu logo si las tienes
  const logoSrc = isConstruccionPage
    ? "./images/logo solucenter construcción blanco.png"
    : "./images/logo ferretería blanco.png";

  return (
    <>
      <header className="w-full text-gray-900">
        {/* Fila superior: fondo blanco */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div>
              <img
                src={logoSrc}
                alt="Solucenter"
                className="w-40 md:w-56 cursor-pointer object-contain"
                onClick={() => navigate("/")}
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-800 hover:bg-gray-100">
                <FiMapPin className="text-lg" />
                <span>Ingresa tu ubicación</span>
              </button>

              <button
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={() => navigate("/carrito")}
              >
                <FiShoppingCart className="text-xl text-gray-900" />
              </button>
            </div>
          </div>
        </div>

        {/* Fila inferior: barra verde */}
        <div className="w-full bg-green-700 py-2">
          <div
            className="
              container mx-auto 
              px-3 sm:px-4 
              flex flex-col sm:flex-row 
              items-stretch sm:items-center 
              gap-2 sm:gap-4
            "
          >
            {/* Botón Categorías */}
            <button
              onClick={toggleMenu}
              className="
                flex items-center gap-2 
                px-3 py-2 
                text-white 
                font-semibold uppercase text-sm 
                shrink-0
              "
            >
              <FiMenu className="text-lg" />
              <span>CATEGORÍAS</span>
            </button>

            {/* Buscador */}
            <div className="flex items-center flex-1 bg-white px-3 py-2 rounded-md border border-gray-300">
              <input
                type="text"
                placeholder="Buscar en Solucenter"
                className="flex-1 outline-none bg-transparent text-sm text-gray-800 placeholder:text-gray-500"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <button type="button" onClick={handleSearch} className="p-1 ml-1">
                <FiSearch className="text-gray-800 text-lg" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú categorías */}
      {menuOpen && (
        <section className="w-full bg-white border-t shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center text-gray-800">
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    navigate(`/categorias/${cat.id}`);
                    setMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-2 hover:opacity-90"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-200">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>

                  <span className="text-xs sm:text-sm italic">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Header;
