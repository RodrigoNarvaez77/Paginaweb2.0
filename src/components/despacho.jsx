import React from "react";
import { motion } from "framer-motion";

const Despacho = () => {
  const tiendas = [
    { nombre: "ARAUCO", telefono: "+569 2623 5712" },
    { nombre: "O'HIGGINS - ARAUCO", telefono: "+569 8903 6191" },
    { nombre: "CAÑETE", telefono: "+569 3953 4037" },
    { nombre: "HUILLINCO", telefono: "+569 5879 9068" },
    { nombre: "CURANILAHUE", telefono: "+569 3268 0304" },
    { nombre: "SANTA JUANA", telefono: "+569 5879 9094" },
  ];

  return (
    <section className="w-full bg-[#f5f5f5] py-16">
      {/* --- TITULO --- */}
      <h2 className="text-3xl font-extrabold text-center text-[#111] mb-10 tracking-wide">
        TIENDAS Y HORARIOS
      </h2>

      {/* --- PILLS FULL WIDTH --- */}
      <div className="w-full flex flex-wrap justify-center gap-8 mb-12 px-4">
        {tiendas.map((t, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[160px]">
            <div className="px-4 py-1 border border-[#0b7a34] rounded-full text-xs font-semibold text-[#0b7a34] uppercase mb-1 text-center">
              {t.nombre}
            </div>

            <a
              href={`tel:${t.telefono.replace(/\s/g, "")}`}
              className="px-4 py-2 bg-[#0b7a34] text-white text-sm font-semibold rounded-full shadow-md hover:bg-[#0a6a2e] transition"
            >
              {t.telefono}
            </a>
          </div>
        ))}
      </div>

      {/* --- DESPACHO GRATIS FULL WIDTH --- */}
      <div className="w-full bg-[#0b7a34] py-3 text-center text-white font-bold tracking-wide uppercase">
        DESPACHO GRATIS
      </div>

      {/* --- TARJETA BLANCA FULL WIDTH --- */}
      <div className="w-full bg-white py-14 px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-20 text-center">
          {/* Lunes a Viernes */}
          <div>
            <p className="text-xl font-extrabold">LUNES A VIERNES</p>
            <p className="mt-1 text-[#333] text-sm sm:text-base">
              DE 8:30 A 18:00 HRS
            </p>
          </div>

          {/* Separador vertical */}
          <div className="hidden sm:block w-px h-14 bg-gray-300"></div>

          {/* Sábados */}
          <div>
            <p className="text-xl font-extrabold">SÁBADOS</p>
            <p className="mt-1 text-[#333] text-sm sm:text-base">
              DE 9:00 A 14:00 HRS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Despacho;
