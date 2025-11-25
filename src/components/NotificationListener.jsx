// 📦 src/components/NotificationListener.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eventBus from "../utils/eventBus";

const NotificationListener = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleSuccess = (message) => {
      setNotification({ message, type: "success" });
      setVisible(true);
    };

    const handleError = (message) => {
      setNotification({ message, type: "error" });
      setVisible(true);
    };

    eventBus.on("form:success", handleSuccess);
    eventBus.on("form:error", handleError);

    return () => {
      eventBus.off("form:success", handleSuccess);
      eventBus.off("form:error", handleError);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div className="fixed top-10 right-10 z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            key="notification"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-md shadow-lg ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationListener;
