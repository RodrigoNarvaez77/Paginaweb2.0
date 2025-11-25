import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Chatbot from "./Chatbot";

// 👇 Mock para evitar error de scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock de fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ respuesta: "Respuesta simulada" }),
  })
);

describe("Chatbot", () => {
  it("debería renderizar correctamente el chatbot", () => {
    render(<Chatbot onClose={() => {}} />);
    expect(
      screen.getByText("Asistente Virtual Solucenter")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Escribe algo...")).toBeInTheDocument();
  });

  it("debería enviar un mensaje al presionar Enter", async () => {
    render(<Chatbot onClose={() => {}} />);
    const input = screen.getByPlaceholderText("Escribe algo...");
    fireEvent.change(input, { target: { value: "Hola asistente" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(await screen.findByText("Hola asistente")).toBeInTheDocument();
    expect(
      await screen.findByText("🦊 Respuesta simulada")
    ).toBeInTheDocument();
  });

  it("debería enviar un mensaje al hacer clic en Enviar", async () => {
    render(<Chatbot onClose={() => {}} />);
    const input = screen.getByPlaceholderText("Escribe algo...");
    const button = screen.getByRole("button", { name: /enviar/i });

    fireEvent.change(input, { target: { value: "¿Qué productos tienen?" } });
    fireEvent.click(button);

    expect(
      await screen.findByText("¿Qué productos tienen?")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("🦊 Respuesta simulada")
    ).toBeInTheDocument();
  });

  it("debería manejar errores de la API", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Error de red"))
    );

    render(<Chatbot onClose={() => {}} />);
    const input = screen.getByPlaceholderText("Escribe algo...");
    const button = screen.getByRole("button", { name: /enviar/i });

    fireEvent.change(input, { target: { value: "¿Hay promociones?" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(/❌ Error: Error de red/)
    ).toBeInTheDocument();
  });
});
