import React from "react";

const FormasDePago = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2
          id="pago"
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Compra fácil y seguro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <i className="bi bi-journal-text text-5xl text-green-700"></i>
            <h4 className="mt-4 text-xl font-semibold text-gray-800">
              Cotiza fácilmente
            </h4>
            <p className="text-gray-600 mt-2">
              Solicita cotizaciones de forma digital o presencial.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <i className="bi bi-credit-card text-5xl text-green-700"></i>
            <h4 className="mt-4 text-xl font-semibold text-gray-800">
              Paga cómodamente
            </h4>
            <p className="text-gray-600 mt-2">
              Usa nuestros múltiples métodos de pago.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <i className="bi bi-truck text-5xl text-green-700"></i>
            <h4 className="mt-4 text-xl font-semibold text-gray-800">
              Retira o recibe
            </h4>
            <p className="text-gray-600 mt-2">
              Recoge tus productos en tienda o solicita despacho.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormasDePago;
