import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  console.log("Ruta actual:", location.pathname);
  const isConstruccionPage = location.pathname === "/construccion";
  return (
    <div>
      {isConstruccionPage ? (
        <footer
          className="bg-gradient-to-r from-black via-gray-800 to-black text-gray-100 text-center py-6"
          id="redes"
        >
          {/* Contenido del Footer */}
          <p className="text-sm mb-4">
            &copy; 2024 Solucenter Construcción. Todos los derechos reservados.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://instagram.com/solucenter_construccion"
              aria-label="Instagram"
              className="text-gray-100 hover:text-blue-400 transition duration-300"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </a>
          </div>
        </footer>
      ) : (
        <footer
          className="bg-gradient-to-r from-black via-gray-800 to-black text-gray-100 text-center py-6"
          id="redes"
        >
          {/* Contenido del Footer */}
          <p className="text-sm mb-4">
            &copy; 2024 Ferretería Solucenter. Todos los derechos reservados.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://instagram.com/solucenter_tienda"
              aria-label="Instagram"
              className="text-gray-100 hover:text-blue-400 transition duration-300"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </a>
            <a
              href="https://tiktok.com/ferreteriasolucenter"
              aria-label="TikTok"
              className="text-gray-100 hover:text-blue-400 transition duration-300"
            >
              <i className="bi bi-tiktok text-2xl"></i>
            </a>
            <a
              href="https://facebook.com/ferreteriasolucenter"
              aria-label="Facebook"
              className="text-gray-100 hover:text-blue-400 transition duration-300"
            >
              <i className="bi bi-facebook text-2xl"></i>
            </a>
            <a
              href="https://youtube.com/ferreteriasolucenter"
              aria-label="YouTube"
              className="text-gray-100 hover:text-blue-400 transition duration-300"
            >
              <i className="bi bi-youtube text-2xl"></i>
            </a>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Footer;
