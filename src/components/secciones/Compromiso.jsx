import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Compromiso = () => {
  const location = useLocation(); // Obtener la ruta actual

  // Determinar si estamos en la ruta "construcción"
  const isConstruccionPage = location.pathname === "/construccion";

  return (
    <section
      className="relative bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: isConstruccionPage
          ? "url('../images/constru2.png')" // Imagen de fondo para construcción
          : "url('../images/ferretera_solucenter_cover.png')", // Imagen de fondo por defecto
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-6 py-12">
        {/* Contenido dinámico según la ruta */}
        {isConstruccionPage ? (
          <>
            {/* Contenido para la página de construcción */}
            <section className="bg-white py-20">
              <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                  Gestión Integral de Proyectos
                </h2>
                <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                  Nuestro enfoque estructurado nos permite ofrecer un servicio
                  eficiente y de alta calidad en todas las etapas del proyecto.
                </p>

                {/* Contenedor único con bullets */}
                <div className="bg-gray-100 border border-gray-200 rounded-2xl p-10 shadow-lg text-left">
                  <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg leading-relaxed">
                    <li>Programa de Trabajo.</li>
                    <li>Antecedentes, Requerimientos.</li>
                    <li>
                      Análisis de Factibilidad Técnico-Regulatoria-Económica.
                    </li>
                    <li>Diseño Conceptual.</li>
                    <li>Documentos de Arquitectura y Especialidades.</li>
                    <li>Gestión de Permisos.</li>
                    <li>
                      Planificación de Materiales y Maestros Contratistas.
                    </li>
                    <li>Ejecución.</li>
                    <li>Inspección Técnica de Obras.</li>
                    <li>Recepción Final.</li>
                    <li>Garantía.</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Contenido por defecto */}
            <div>
              <div className="flex flex-col items-center">
                {/* Contenido por defecto */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2
                    id="compromiso"
                    className="text-4xl font-bold text-gray-800"
                  >
                    Comprometidos en cada etapa de tu proyecto
                  </h2>
                  <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                    Tenemos todo lo necesario para tu proyecto. Nuestro amplio
                    stock asegura disponibilidad en todos nuestros productos,
                    garantizando calidad y eficiencia en cada paso.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 text-center">
                  {[
                    {
                      icon: "bi-box2",
                      title: "Amplio Stock",
                      text: "Garantizamos disponibilidad constante para satisfacer tus necesidades.",
                    },
                    {
                      icon: "bi-people",
                      title: "Gran Equipo",
                      text: "Nuestro personal está comprometido con un servicio cordial y eficiente.",
                    },
                    {
                      icon: "bi-cash-coin",
                      title: "Buenos Precios",
                      text: "Ofrecemos productos de calidad a precios competitivos y accesibles.",
                    },
                    {
                      icon: "bi-patch-check",
                      title: "Calidad",
                      text: "Calidad superior garantizada en cada pieza, con precisión y excelencia.",
                    },
                    {
                      icon: "bi-clock-history",
                      title: "Rápida Respuesta",
                      text: "Consúltanos tus dudas y solicita cotizaciones rápidamente a través de nuestro formulario o por WhatsApp.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
                    >
                      <motion.i
                        className={`bi ${item.icon} text-5xl text-green-700`}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <h5 className="text-xl font-semibold mt-4 text-gray-800">
                        {item.title}
                      </h5>
                      <p className="text-gray-600 mt-2">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Compromiso;
