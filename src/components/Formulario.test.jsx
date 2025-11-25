// src/components/Formulario.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Formulario from "./Formulario";
import eventBus from "../utils/eventBus";
import emailjs from "emailjs-com";

// 🧪 Mocks globales
vi.mock("emailjs-com", () => ({
  default: {
    send: vi.fn(),
  },
}));

vi.mock("../utils/eventBus", () => ({
  default: {
    emit: vi.fn(),
  },
}));

describe("Formulario - pruebas completas", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpia mocks entre tests
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restaura mocks como fetch
  });

  const llenarFormulario = () => {
    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu comuna"), {
      target: { value: "Santiago" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu correo electrónico"), {
      target: { value: "juan@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu teléfono"), {
      target: { value: "987654321" },
    });
    fireEvent.change(screen.getByPlaceholderText("Detalles de tu consulta"), {
      target: { value: "Necesito una cotización urgente." },
    });
  };

  test("✅ emite form:success cuando el formulario se envía correctamente", async () => {
    emailjs.send.mockResolvedValueOnce("ok");

    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    );

    render(<Formulario backgroundImage="/test.jpg" />);
    llenarFormulario();
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(eventBus.emit).toHaveBeenCalledWith(
        "form:success",
        "Formulario enviado correctamente."
      );
    });
  });

  test("❌ emite form:error si emailjs falla", async () => {
    emailjs.send.mockRejectedValueOnce("error");

    render(<Formulario backgroundImage="/test.jpg" />);
    llenarFormulario();
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(eventBus.emit).toHaveBeenCalledWith(
        "form:error",
        "Error al enviar el formulario."
      );
    });
  });

  test("⚠️ emite form:warning si fetch falla pero emailjs funciona", async () => {
    emailjs.send.mockResolvedValueOnce("ok");

    global.fetch = vi.fn(() => Promise.reject("error en backend"));

    render(<Formulario backgroundImage="/test.jpg" />);
    llenarFormulario();
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(eventBus.emit).toHaveBeenCalledWith(
        "form:warning",
        "El correo fue enviado, pero no se guardó en la base de datos."
      );
    });
  });
});
