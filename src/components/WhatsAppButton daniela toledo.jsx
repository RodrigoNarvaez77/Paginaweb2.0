import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { FaComments, FaRobot } from "react-icons/fa";
import Chatbot from "./Chatbot"; // Asegúrate que esté bien la ruta

const WhatsAppButton = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    setShowChatbot(false); // Siempre que abres/cerras, reseteamos
  };

  const isConstruccionPage = location.pathname === "/construccion";

  const sucursales = isConstruccionPage
    ? [
        {
          name: "Asistente de Ventas",
          address: "Condell 615, Arauco",
          link: "https://wa.me/+56994458337",
          icon: "whatsapp",
        },
      ]
    : [
        {
          name: "Daniela Toledo",
          address: "Arauco - Curanilahue - Cañete - Sta Juana",
          link: "https://wa.me/+56966178043",
          icon: "whatsapp",
        },
        {
          name: "Chat Virtual",
          address: "Asistente Virtual",
          link: "",
          icon: "robot",
        },
      ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón flotante */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className="bg-green-800 text-white flex items-center px-5 py-3 rounded-full shadow-lg hover:bg-green-900 transition duration-300 focus:outline-none"
      >
        <FaComments className="text-2xl mr-2" />
        <span className="font-semibold text-base">Chat de ventas</span>
      </motion.button>

      {/* Menú desplegable */}
      <AnimatePresence>
        {menuVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 bg-white shadow-xl rounded-lg p-3 w-80 border border-gray-200"
            style={{
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
            }}
          >
            {!showChatbot ? (
              <div className="space-y-2">
                {sucursales.map((sucursal, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white bg-opacity-90 p-2 rounded-lg shadow flex justify-between items-center transition-transform duration-300"
                  >
                    <div>
                      <h5 className="font-bold text-sm text-gray-800">
                        {sucursal.name}
                      </h5>
                      <p className="text-xs text-gray-600">
                        {sucursal.address}
                      </p>
                    </div>
                    {sucursal.icon === "whatsapp" ? (
                      <a
                        href={sucursal.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white rounded-full p-2 shadow-md hover:bg-green-700 transition duration-200 flex items-center justify-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="bi bi-whatsapp text-lg"></i>
                      </a>
                    ) : (
                      <button
                        onClick={() => setShowChatbot(true)}
                        className="bg-blue-600 text-white rounded-full p-2 shadow-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <FaRobot className="text-lg" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              // Renderizamos el chatbot real
              <Chatbot onClose={() => setShowChatbot(false)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppButton;
