import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formatCLP = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value || 0);

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePay = async () => {
    try {
      setLoading(true);
      setError("");

      // Si por algún motivo el carrito está vacío, prevenimos llamada
      if (!cart || cart.length === 0) {
        setError("Tu carrito está vacío.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://carritodecompras-aqgw.onrender.com/api/cart/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart.map((item) => ({
              id: item.id,
              name: item.name,
              price: Number(item.price),
              quantity: Number(item.quantity),
            })),
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

      // 🔁 Redirigir a Webpay
      if (data.webpayUrl) {
        window.location.href = data.webpayUrl;
      } else {
        throw new Error("No se recibió la URL de Webpay desde el backend.");
      }
    } catch (err) {
      console.error("❌ Error en handlePay:", err);
      setError(err.message || "Ocurrió un error al iniciar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="w-full px-6 md:px-12 max-w-4xl mx-auto">
        <section className="bg-white rounded-lg shadow-sm w-full px-8 py-10 md:px-10 md:py-10">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 mb-4 hover:underline"
          >
            ← Seguir comprando
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Carrito de compras
          </h1>

          {cart.length === 0 ? (
            <div className="text-gray-600">
              <p>Tu carrito está vacío.</p>
              <button
                onClick={() => navigate("/construccion")}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
              >
                Ir a comprar materiales
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Precio unitario: {formatCLP(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Cantidad</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="w-16 border rounded-md text-center"
                      />
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">Subtotal</p>
                      <p className="font-bold text-gray-900">
                        {formatCLP(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-1 text-xs text-red-500 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <p className="text-lg font-semibold text-gray-800">
                  Total a pagar:
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {formatCLP(total)}
                </p>
              </div>

              {error && <p className="mt-3 text-sm text-red-600">⚠️ {error}</p>}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handlePay}
                  disabled={loading}
                  className={`${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  } bg-green-600 text-white px-6 py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-green-700 transition`}
                >
                  {loading ? "Redirigiendo a Webpay..." : "Ir a pagar"}
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default CartPage;
