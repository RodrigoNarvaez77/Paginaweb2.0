import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "🦊 ¡Hola! ¿En qué puedo ayudarte?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://nodejsasistentevirtual-1.onrender.com/api/data/message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mensaje: input.trim() }),
        }
      );

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: `🦊 ${data.respuesta}`, sender: "bot" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: `❌ Error: ${error.message}`, sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    // Scroll automático al último mensaje
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 👇 Nuevo: Función para manejar el Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-3 w-full h-[450px] flex flex-col rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg text-gray-800">
          Asistente Virtual Solucenter
        </h3>
        <button
          onClick={onClose}
          className="text-purple-500 hover:text-purple-700 text-xl"
        >
          ✖
        </button>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 bg-gray-100 rounded-lg p-3 overflow-y-auto border mb-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`mb-2 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-[70%] text-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-900"
              }`}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="text-left text-gray-500 text-sm">
            🦊 Escribiendo...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensaje */}
      <div className="flex border-t pt-2">
        <input
          className="w-full max-w-[95%] sm:max-w-full border border-gray-300 p-2 rounded-l-lg focus:outline-none bg-gray-50 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe algo..."
          disabled={loading}
        />
        <button
          className={`px-6 py-2 rounded-r-lg text-sm font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          onClick={handleSend}
          disabled={loading}
        >
          Enviar
        </button>
      </div>
    </motion.div>
  );
};

export default Chatbot;
