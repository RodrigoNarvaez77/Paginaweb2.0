// src/components/secciones/Categorias.test.jsx
import { render, screen } from "@testing-library/react";
import Categorias from "./Categorias";

describe("CategoriasFerreteria", () => {
  it("debería renderizar el título principal", () => {
    render(<Categorias />);
    expect(
      screen.getByRole("heading", { name: "Categorías" })
    ).toBeInTheDocument();
  });

  it("debería renderizar 3 tarjetas de categoría", () => {
    render(<Categorias />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(4); // 1 título + 3 tarjetas
    // Excluimos el título principal para verificar solo las 3 tarjetas:
    const tarjetas = headings.filter((el) => el.textContent !== "Categorías");
    expect(tarjetas.length).toBe(3);
  });

  it("debería mostrar los nombres y descripciones de cada categoría", () => {
    render(<Categorias />);

    expect(screen.getByText("Productos")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Amplia gama de herramientas y materiales de construcción."
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Servicios")).toBeInTheDocument();
    expect(
      screen.getByText(/Despachos gratis.*Santa Juana\./i)
    ).toBeInTheDocument();

    expect(screen.getByText("Mapa")).toBeInTheDocument();
    expect(
      screen.getByText("Conoce nuestras sucursales en la Región del Bio-Bío.")
    ).toBeInTheDocument();
  });
});
