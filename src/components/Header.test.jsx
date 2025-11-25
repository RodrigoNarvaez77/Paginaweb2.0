// src/components/secciones/Header.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("muestra el logo de construcción si la ruta es /construccion", () => {
    render(
      <MemoryRouter initialEntries={["/construccion"]}>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Logo Construcción");
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute("src")).toContain("construcción");
  });

  it("muestra el logo de ferretería si la ruta no es /construccion", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Logo Ferretería");
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute("src")).toContain("ferretería");
  });

  it("muestra los enlaces correctos según la ruta /construccion", () => {
    render(
      <MemoryRouter initialEntries={["/construccion"]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Proyectos")).toBeInTheDocument();
    expect(screen.getByText("Compromiso")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
  });

  it("muestra los enlaces correctos si la ruta es diferente", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Cotización")).toBeInTheDocument();
    expect(screen.getByText("Categorias")).toBeInTheDocument();
    expect(screen.getByText("Redes Sociales")).toBeInTheDocument(); // ← corrección
  });

  it("abre el menú cuando se hace clic en el botón", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /toggle navigation/i });
    fireEvent.click(button);

    const menu = screen
      .getByRole("link", { name: /Cotización/i })
      .closest("ul");
    expect(menu?.className).not.toContain("hidden");
  });
});
