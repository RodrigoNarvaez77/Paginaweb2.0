import React from "react";
import { motion } from "framer-motion";

const CategoriasFerreteria = () => {
  const categorias = [
    {
      nombre: "Canaleta, Techo y Drywall",
      descripcion:
        "Soluciones en canalizaciones, techumbres y sistemas de drywall para construcciones seguras.",
    },
    {
      nombre: "Pisos, Paredes y Terminaciones",
      descripcion:
        "Materiales para revestimiento, terminaciones y acabados de alta calidad.",
    },
    {
      nombre: "Ferretería y Maderas",
      descripcion:
        "Amplia variedad de productos de ferretería y maderas para proyectos de construcción y carpintería.",
    },
    {
      nombre: "Cementos y Aditivos",
      descripcion:
        "Cementos, morteros y aditivos para obras duraderas y resistentes.",
    },
    {
      nombre: "Adhesivo e Impermeabilizante",
      descripcion:
        "Productos adhesivos y soluciones para impermeabilizar todo tipo de superficies.",
    },
    {
      nombre: "Aseo, Baños y Cocinas",
      descripcion:
        "Todo en artículos de aseo, equipamiento para baños y cocinas funcionales.",
    },
    {
      nombre: "Herramientas",
      descripcion:
        "Herramientas manuales y eléctricas para cada tipo de trabajo.",
    },
    {
      nombre: "Seguridad Industrial",
      descripcion:
        "Elementos de protección personal y seguridad en el trabajo.",
    },
    {
      nombre: "Tubería",
      descripcion:
        "Tubos, conexiones y sistemas de conducción de fluidos para diversas aplicaciones.",
    },
    {
      nombre: "Pinturas y Acabados",
      descripcion:
        "Pinturas, barnices y productos para acabados profesionales.",
    },
    {
      nombre: "Aceros",
      descripcion:
        "Productos de acero para estructuras, obras y construcciones de gran envergadura.",
    },
  ];

  return (
    <section className="bg-gray-50 text-center py-16" id="categorias">
      <div id="categorias" className="container mx-auto px-6">
        <motion.h3
          className="text-3xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Nuestras Categorías de Productos
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias.map((cat, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl shadow-lg bg-white flex flex-col items-center transform transition duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                {cat.nombre}
              </h4>
              <p className="text-gray-600 text-sm">{cat.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriasFerreteria;
