import React from "react";
import { motion } from "framer-motion";

const Arquitecturayconstruccion = () => {
  return (
    <section className="bg-gray-50 text-center py-16" id="construccion">
      <div className="container mx-auto px-6">
        {/* Título */}
        <motion.h3
          className="text-3xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Servicios de arquitectura y Gestión de la construcción.
        </motion.h3>

        {/* Imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Imagen 1 */}
          <motion.div
            className="rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="./images/imagen1.png"
              alt="Producto 1"
              className="w-full h-96 object-cover"
            />
          </motion.div>

          {/* Imagen 2 */}
          <motion.div
            className="rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="./images/imagen2.png"
              alt="Producto 2"
              className="w-full h-96 object-cover"
            />
          </motion.div>

          {/* Imagen 3 */}
          <motion.div
            className="rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="./images/imagen3.png"
              alt="Producto 3"
              className="w-full h-96 object-cover"
            />
          </motion.div>
        </div>

        {/* Texto adicional */}
        <motion.p
          className="text-xl text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Diseñamos y construimos.
        </motion.p>

        {/* Botón */}
        <motion.a
          href="/construccion"
          className="w-full px-5 py-2 text-lg text-white font-semibold rounded-lg bg-gradient-to-r from-[#4b4f75] to-[#2d3557] hover:bg-gradient-to-r hover:from-[#2d3557] hover:to-[#434762] focus:ring-2 focus:ring-blue-500 no-underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          Visítanos
        </motion.a>
      </div>
    </section>
  );
};

export default Arquitecturayconstruccion;
