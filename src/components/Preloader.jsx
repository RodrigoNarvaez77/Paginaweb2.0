import React from "react";

const Preloader = () => {
  return (
    <div className="preloader">
      {" "}
      {/* Usa solo la clase CSS */}
      <img
        src="/images/logo ferretería blanco.png" // Asegúrate de que la ruta sea correcta
        alt="logo"
        className="logo" // Usa la clase CSS en lugar de estilos en línea
      />
    </div>
  );
};

export default Preloader;
