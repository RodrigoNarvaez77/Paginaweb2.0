import React, { useState } from "react";
import emailjs from "emailjs-com";
import eventBus from "../utils/eventBus";

const Formulario = ({ backgroundImage }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    comuna: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_k65j17r",
        "template_bs86x61",
        { ...formData },
        "fHj28KP1AWBuCIBG1"
      )
      .then(() => {
        eventBus.emit("form:success", "Formulario enviado correctamente.");
        setFormData({
          nombre: "",
          comuna: "",
          email: "",
          telefono: "",
          mensaje: "",
        });

        // ✅ Enviar datos al backend en segundo plano
        fetch("https://cotizador-k8g4.onrender.com/guardar-cotizacion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Error al guardar en el backend");
            console.log(
              "📬 Cotización guardada en la base de datos / 📬 Quote saved in database"
            );
          })
          .catch((err) => {
            console.error(
              "❌ Error al guardar en backend / ❌ Error saving in backend:",
              err
            );
            eventBus.emit(
              "form:warning",
              "El correo fue enviado, pero no se guardó en la base de datos."
            );
          });
      })
      .catch(() => {
        eventBus.emit("form:error", "Error al enviar el formulario.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="w-full bg-[#f5f5f5] py-12">
      {/* --- BARRA MARCAS EXCLUSIVAS full ancho --- */}
      <div className="w-full bg-[#0b7a34] text-white text-center py-3 font-bold tracking-wide text-lg uppercase">
        NUESTRAS MARCAS
      </div>

      {/* --- FRANJA BLANCA full ancho --- */}
      <div className="w-full bg-white border-b border-[#0b7a34] px-6 py-6 flex flex-wrap justify-center gap-6">
        <img
          src="/images/ceresita.png"
          alt="Ceresita"
          className="w-40 h-auto object-contain"
        />

        <img
          src="/images/cordillera.jpg"
          alt="Cordillera"
          className="w-40 h-auto object-contain"
        />
        <img
          src="/images/Polpaico.png"
          alt="Polpaico"
          className="w-40 h-auto object-contain"
        />
        <img
          src="/images/klipen.png"
          alt="Klipen"
          className="w-40 h-auto object-contain"
        />
        <img
          src="/images/toyama.png"
          alt="Toyama"
          className="w-40 h-auto object-contain"
        />
      </div>

      {/* --- BLOQUE VERDE CONTÁCTANOS full ancho --- */}
      <div className="w-full bg-[#0b7a34] py-14 px-4 sm:px-10 rounded-none">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          COTIZA CON NOSOTROS
        </h2>

        <p className="text-center text-white mb-10">
          Ingresa tus datos en el formulario:
        </p>

        {/* FORMULARIO FULL ANCHO */}
        <form
          id="contactForm"
          onSubmit={enviarFormulario}
          className="w-full max-w-5xl mx-auto space-y-6"
        >
          {/* Nombre + Comuna */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-white text-sm font-medium mb-1 block">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full bg-white text-gray-900 px-3 py-2 rounded-sm"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-1 block">
                Comuna *
              </label>
              <input
                type="text"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                className="w-full bg-white text-gray-900 px-3 py-2 rounded-sm"
                placeholder="Tu comuna"
                required
              />
            </div>
          </div>

          {/* Email + Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-white text-sm font-medium mb-1 block">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white text-gray-900 px-3 py-2 rounded-sm"
                placeholder="Tu correo electrónico"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-1 block">
                Teléfono *
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full bg-white text-gray-900 px-3 py-2 rounded-sm"
                placeholder="Tu teléfono"
                required
              />
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label className="text-white text-sm font-medium mb-1 block">
              Mensaje *
            </label>
            <textarea
              name="mensaje"
              rows="4"
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 px-3 py-2 rounded-sm"
              placeholder="Escribe aquí los detalles de tu consulta"
              required
            ></textarea>
          </div>

          {/* Botón */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`min-w-[160px] px-10 py-2 bg-white text-[#0b7a34] font-semibold rounded-sm border border-white
              ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-100"}
            `}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Formulario;
