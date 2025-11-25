import React from "react";
import { motion } from "framer-motion";

const Categorias = () => {
  return (
    <section
      className="relative bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('../images/ferretera_solucenter_cover.png')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-6 py-12">
        {/* Título */}
        <motion.h3
          id="categorias"
          className="text-center text-4xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Categorías
        </motion.h3>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tarjeta 1: Productos */}
          <motion.div
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/images/pelotaproductos.png"
              alt="Productos"
              className="w-full h-96 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Productos</h3>
              <p className="text-sm text-gray-600 mt-2">
                Amplia gama de herramientas y materiales de construcción.
              </p>
            </div>
          </motion.div>

          {/* Tarjeta 2: Servicios */}
          <motion.div
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/images/servicios.png"
              alt="Servicios"
              className="w-full h-96 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Servicios</h3>
              <p className="text-sm text-gray-600 mt-2">
                Despachos gratis Arauco, Curanilahue, Cañete, Huillinco, Santa
                Juana.
              </p>
            </div>
          </motion.div>

          {/* Tarjeta 3: Mapa */}
          <motion.div
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            {/* Contenedor del mapa */}
            <div className="w-full h-96 object-cover">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1zNKJjn5B9lpbGxrwn258gD8XFoZQhkY&zoom=13&ehbc=2E312F"
                className="w-full h-full"
                style={{
                  position: "relative",
                  top: "-70px", // Ajusta el valor para ocultar el encabezado negro
                  height: "calc(100% + 70px)", // Aumenta la altura para cubrir
                }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            {/* Texto del mapa */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Mapa</h3>
              <p className="text-sm text-gray-600 mt-2">
                Conoce nuestras sucursales en la Región del Bio-Bío.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Categorias;
