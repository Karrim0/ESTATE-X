// src/hooks/useWebSocket.js

import { useContext } from "react";
import WebSocketContext from "../context/WebSocketContext";

/**
 * Custom hook to access WebSocket context
 * @returns {Object} WebSocket context
 */
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }

  return context;
};

export default useWebSocket;
