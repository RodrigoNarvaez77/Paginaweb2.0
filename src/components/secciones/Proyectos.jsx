import React from "react";
import { motion } from "framer-motion";

const Proyectos = () => {
  const projects = [
    // 🏠 Interiores
    {
      src: "/images/real2.jpg",
      alt: "Interior terminado con acabados modernos",
      title: "Interior Moderno 1",
      category: "interior",
      type: "image",
    },
    {
      src: "/images/real1.jpg",
      alt: "Sala de estar moderna",
      title: "Interior Moderno 2",
      category: "interior",
      type: "image",
    },
    {
      src: "/images/real3.jpg",
      alt: "Diseño de interiores contemporáneo",
      title: "Interior Moderno 3",
      category: "interior",
      type: "image",
    },

    // 🏪 Tiendas
    {
      src: "/images/tienda 1.png",
      alt: "Vista exterior de tienda",
      title: "Tienda Comercial 1",
      category: "tienda",
      type: "image",
    },
    {
      src: "/images/tienda 2.png",
      alt: "Fachada de una tienda comercial",
      title: "Tienda Comercial 2",
      category: "tienda",
      type: "image",
    },
    {
      src: "/images/tienda 3.png",
      alt: "Proyecto comercial moderno",
      title: "Tienda Comercial 3",
      category: "tienda",
      type: "image",
    },

    // 🏰 Comerciales
    {
      src: "/images/cc7.png",
      alt: "Proyecto comercial moderno",
      title: "Proyecto Comercial CC7",
      category: "comercial",
      type: "image",
    },
    {
      src: "/images/cc5.png",
      alt: "Proyecto comercial moderno",
      title: "Proyecto Comercial CC5",
      category: "comercial",
      type: "image",
    },
    {
      src: "/images/cc6.png",
      alt: "Proyecto comercial moderno",
      title: "Proyecto Comercial CC6",
      category: "comercial",
      type: "image",
    },
    {
      src: "/images/cc1.png",
      alt: "Proyecto comercial moderno",
      title: "Proyecto Comercial CC1",
      category: "comercial",
      type: "image",
    },
    {
      src: "/images/real5.mp4", // Ruta del video
      alt: "Video de un proyecto comercial",
      title: "Proyecto Comercial CC2",
      category: "comercial",
      type: "video", // Indica que es un video
    },
  ];

  return (
    <section className="bg-white py-16">
      <motion.div
        className="container mx-auto px-4 max-w-6xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Encabezado con descripción */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p
            className="uppercase text-sm tracking-widest text-gray-500 mb-6"
            id="proyectos"
          >
            Nuestros Proyectos
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-wide mb-6">
            Diseño y Construcción.
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
            En Solucenter desarrollamos proyectos residenciales, comerciales e
            industriales con altos estándares de calidad, eficiencia y diseño.
            Cada obra está pensada para adaptarse a las necesidades del cliente,
            con terminaciones modernas y funcionales.
          </p>
        </motion.div>

        {/* Galería de imágenes y videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {project.type === "video" ? (
                <video
                  src={project.src}
                  className="w-full h-[500px] object-cover rounded-xl"
                  controls
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <img
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold text-center px-4">
                  {project.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="container mx-auto px-4 max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Título */}
        <div className="mt-10">
          {" "}
          {/* Agrega margen superior */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-black mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Demos inicio a tu proyecto
          </motion.h2>
        </div>

        {/* Botón azul */}
        <div className="flex justify-center">
          <motion.a
            href="#cotizacion"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition duration-300 no-underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Obtén una cotización
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Proyectos;
