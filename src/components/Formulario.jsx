import React, { useState } from "react";
import emailjs from "emailjs-com";
import eventBus from "../utils/eventBus"; // Asegúrate de tener este módulo creado

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
            console.log("📬 Cotización guardada en la base de datos");
          })
          .catch((err) => {
            console.error("❌ Error al guardar en backend:", err);
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
    <section
      className="w-full min-h-screen bg-no-repeat bg-cover bg-center aspect-[4/3] md:aspect-auto flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-grow items-center justify-start p-6 sm:ml-10 lg:ml-20">
        <div className="w-full max-w-lg bg-opacity-80 bg-gray-800 p-8 rounded-lg shadow-xl overflow-hidden">
          <h2
            className="text-3xl font-bold text-white mb-6 text-center"
            id="cotizacion"
          >
            Solicita una Cotización
          </h2>

          <form id="contactForm" onSubmit={enviarFormulario}>
            {[
              { id: "nombre", label: "Nombre" },
              { id: "comuna", label: "Comuna" },
              { id: "email", label: "Correo Electrónico", type: "email" },
              { id: "telefono", label: "Teléfono" },
            ].map(({ id, label, type }) => (
              <div className="mb-4" key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-white"
                >
                  {label}
                </label>
                <input
                  type={type || "text"}
                  id={id}
                  name={id}
                  placeholder={`Tu ${label.toLowerCase()}`}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}

            <div className="mb-4">
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-white"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="3"
                placeholder="Detalles de tu consulta"
                value={formData.mensaje}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#4b4f75] to-[#2d3557] hover:from-[#2d3557] hover:to-[#434762] focus:ring-2 focus:ring-blue-500"
              }`}
            >
              {loading ? "Enviando..." : "Enviar Cotización"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Formulario;
