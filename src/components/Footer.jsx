import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isConstruccionPage = location.pathname === "/construccion";

  return (
    <footer
      id="redes"
      className="
        bg-gradient-to-r 
        from-[#0a6a2e] via-[#0b7a34] to-[#0a6a2e] 
        text-white 
        text-center 
        py-8
      "
    >
      {/* Texto del Footer */}
      <p className="text-sm mb-4 opacity-90">
        {isConstruccionPage
          ? "© 2024 Solucenter Construcción. Todos los derechos reservados."
          : "© 2024 Ferretería Solucenter. Todos los derechos reservados."}
      </p>

      {/* Redes Sociales */}
      <div className="flex justify-center space-x-6 mt-4">
        {isConstruccionPage ? (
          <>
            <a
              href="https://instagram.com/solucenter_construccion"
              aria-label="Instagram"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </a>
          </>
        ) : (
          <>
            <a
              href="https://instagram.com/solucenter_tienda"
              aria-label="Instagram"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </a>

            <a
              href="https://tiktok.com/ferreteriasolucenter"
              aria-label="TikTok"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <i className="bi bi-tiktok text-2xl"></i>
            </a>

            <a
              href="https://facebook.com/ferreteriasolucenter"
              aria-label="Facebook"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <i className="bi bi-facebook text-2xl"></i>
            </a>

            <a
              href="https://youtube.com/ferreteriasolucenter"
              aria-label="YouTube"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <i className="bi bi-youtube text-2xl"></i>
            </a>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
