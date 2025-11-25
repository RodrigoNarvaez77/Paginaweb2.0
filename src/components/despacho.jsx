import React from "react";
import { motion } from "framer-motion";

const Despacho = () => {
  return (
    <section className="w-full bg-gradient-to-br from-white via-gray-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center rounded-3xl shadow-2xl p-6 md:p-12 bg-white">
        {/* Imagen con animación */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 md:order-none"
        >
          <img
            src="/images/despacho.png"
            alt="Camión de reparto Solucenter"
            className="w-full h-auto object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Información a la derecha */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left space-y-6"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 ml-8">
            Despacho Gratuito
          </h2>

          <ul className="text-gray-700 text-lg leading-relaxed space-y-4">
            <li>
              <span className="font-semibold text-gray-900">Zonas:</span>
              <span
                className="ml-2"
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              >
                Arauco, O'Higgins, Curanilahue, Cañete, Huillinco, Santa Juana.
              </span>
            </li>

            <li>
              <span className="font-semibold text-gray-900">Horarios:</span>
              <ul className="ml-6 mt-2 space-y-2 list-disc text-gray-600">
                <li>
                  <span className="font-semibold text-gray-900">
                    Lunes a Viernes
                  </span>
                  <ul className="ml-4 list-disc">
                    <li>Arauco, Curanilahue, Cañete: 08:30–18:00 hrs.</li>
                    <li>Santa Juana, Huillinco: 09:00–18:00 hrs.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Sábados</span>
                  <ul className="ml-4 list-disc">
                    <li>Arauco, Curanilahue, Cañete: 09:00–14:00 hrs.</li>
                    <li>Santa Juana: 09:00–13:00 hrs.</li>
                    <li>Huillinco: 10:00–14:00 hrs.</li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              Atención personalizada y una amplia variedad de productos con
              entrega segura y rápida.
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Despacho;
