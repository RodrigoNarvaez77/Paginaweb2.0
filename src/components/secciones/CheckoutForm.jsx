import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formatCLP = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value || 0);

const CheckoutForm = ({ cart }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rut: "",
    email: "",
    phone: "",
    address: "",
    comuna: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!cart || cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    // Validaciones simples
    if (!formData.name || !formData.rut || !formData.email) {
      setError("Por favor completa al menos Nombre, RUT y Correo.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://carritodecompras-aqgw.onrender.com/api/cart/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // 🧾 Items del carrito
            items: cart.map((item) => ({
              id: item.id,
              name: item.name,
              price: Number(item.price),
              quantity: Number(item.quantity),
            })),
            // 👤 Datos del cliente / despacho
            customer: {
              name: formData.name,
              rut: formData.rut,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              comuna: formData.comuna,
              notes: formData.notes,
            },
            // 💡 IMPORTANTE:
            // El envío de correos debe hacerse SOLO cuando el backend
            // reciba la confirmación de pago de Webpay (callback/confirmación).
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        console.error("❌ Error desde backend:", data);
        throw new Error(
          data.message || "No se pudo iniciar el pago con Webpay."
        );
      }

      if (data.webpayUrl) {
        // Redirección directa a Webpay
        window.location.href = data.webpayUrl;
      } else {
        throw new Error("No se recibió la URL de Webpay desde el backend.");
      }
    } catch (err) {
      console.error("❌ Error en CheckoutForm:", err);
      setError(err.message || "Ocurrió un error al iniciar el pago.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 pt-10 pb-20">
        <div className="w-full px-6 md:px-12 max-w-4xl mx-auto">
          <section className="bg-white rounded-lg shadow-sm w-full px-8 py-10 md:px-10 md:py-10">
            <p className="text-gray-700 mb-4">
              Tu carrito está vacío. Agrega productos antes de continuar.
            </p>
            <button
              onClick={() => navigate("/construccion")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
            >
              Volver a comprar
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="w-full px-6 md:px-12 max-w-4xl mx-auto">
        <section className="bg-white rounded-lg shadow-sm w-full px-8 py-10 md:px-10 md:py-10">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 mb-4 hover:underline"
          >
            ← Volver al carrito
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Datos de despacho
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Ingresa tus datos para coordinar el despacho. Luego te redirigiremos
            al pago seguro con Webpay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* FORMULARIO */}
            <form
              onSubmit={handleSubmit}
              className="md:col-span-2 space-y-4"
              autoComplete="off"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RUT *
                </label>
                <input
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  placeholder="12.345.678-9"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comuna
                </label>
                <input
                  type="text"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comentarios / indicaciones de despacho
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {error && <p className="mt-2 text-sm text-red-600">⚠️ {error}</p>}

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  } bg-green-600 text-white px-6 py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-green-700 transition`}
                >
                  {loading ? "Redirigiendo a Webpay..." : "Ir a pagar"}
                </button>
              </div>
            </form>

            {/* RESUMEN CARRITO */}
            <aside className="md:col-span-1 border rounded-lg p-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Resumen de tu compra
              </h2>
              <ul className="space-y-2 text-sm text-gray-700 mb-3">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between border-b pb-1"
                  >
                    <span>
                      {item.quantity}× {item.name}
                    </span>
                    <span>{formatCLP(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold text-gray-800">
                  Total a pagar:
                </span>
                <span className="text-lg font-bold text-green-700">
                  {formatCLP(total)}
                </span>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CheckoutForm;
