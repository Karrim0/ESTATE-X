// src/context/WebSocketContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import websocketService, {
  connectToAuction,
  disconnectFromAuction,
  sendBid,
  connectToNotifications,
  disconnectFromNotifications,
  connectToChat,
  disconnectFromChat,
  sendChatMessage,
  sendTypingIndicator,
} from "../services/websocket";
import { useAuth } from "./AuthContext";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [activeConnections, setActiveConnections] = useState(new Set());

  // ==================== INITIALIZE ====================
  useEffect(() => {
    if (isAuthenticated) {
      setIsConnected(true);
    } else {
      // Disconnect all on logout
      websocketService.disconnectAll();
      setIsConnected(false);
      setActiveConnections(new Set());
    }
  }, [isAuthenticated]);

  // ==================== AUCTION FUNCTIONS ====================
  const joinAuction = useCallback(
    (auctionId, onBidUpdate) => {
      if (!isAuthenticated) {
        console.warn("Cannot join auction: Not authenticated");
        return null;
      }

      const connection = connectToAuction(
        auctionId,
        (bidData) => {
          if (onBidUpdate) onBidUpdate(bidData);
        },
        (error) => {
          console.error("Auction WebSocket error:", error);
          setError(error.message);
        }
      );

      if (connection) {
        setActiveConnections((prev) =>
          new Set(prev).add(`auction_${auctionId}`)
        );
      }

      return connection;
    },
    [isAuthenticated]
  );

  const leaveAuction = useCallback((auctionId) => {
    disconnectFromAuction(auctionId);
    setActiveConnections((prev) => {
      const newSet = new Set(prev);
      newSet.delete(`auction_${auctionId}`);
      return newSet;
    });
  }, []);

  const placeBid = useCallback((auctionId, amount) => {
    return sendBid(auctionId, amount);
  }, []);

  // ==================== NOTIFICATION FUNCTIONS ====================
  const [notifications, setNotifications] = useState([]);

  const joinNotifications = useCallback(() => {
    if (!isAuthenticated) {
      console.warn("Cannot join notifications: Not authenticated");
      return null;
    }

    const connection = connectToNotifications(
      (notification) => {
        setNotifications((prev) => [notification, ...prev]);

        // Show browser notification if permission granted
        if (Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/vite.svg",
          });
        }
      },
      (error) => {
        console.error("Notification WebSocket error:", error);
        setError(error.message);
      }
    );

    if (connection) {
      setActiveConnections((prev) => new Set(prev).add("notifications"));
    }

    return connection;
  }, [isAuthenticated]);

  const leaveNotifications = useCallback(() => {
    disconnectFromNotifications();
    setActiveConnections((prev) => {
      const newSet = new Set(prev);
      newSet.delete("notifications");
      return newSet;
    });
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // ==================== CHAT FUNCTIONS ====================
  const [activeChats, setActiveChats] = useState(new Map());

  const joinChat = useCallback(
    (conversationId, onMessage) => {
      if (!isAuthenticated) {
        console.warn("Cannot join chat: Not authenticated");
        return null;
      }

      const connection = connectToChat(
        conversationId,
        (message) => {
          if (onMessage) onMessage(message);

          // Update active chat messages
          setActiveChats((prev) => {
            const newMap = new Map(prev);
            const messages = newMap.get(conversationId) || [];
            newMap.set(conversationId, [...messages, message]);
            return newMap;
          });
        },
        (error) => {
          console.error("Chat WebSocket error:", error);
          setError(error.message);
        }
      );

      if (connection) {
        setActiveConnections((prev) =>
          new Set(prev).add(`chat_${conversationId}`)
        );
      }

      return connection;
    },
    [isAuthenticated]
  );

  const leaveChat = useCallback((conversationId) => {
    disconnectFromChat(conversationId);
    setActiveConnections((prev) => {
      const newSet = new Set(prev);
      newSet.delete(`chat_${conversationId}`);
      return newSet;
    });

    setActiveChats((prev) => {
      const newMap = new Map(prev);
      newMap.delete(conversationId);
      return newMap;
    });
  }, []);

  const sendMessage = useCallback((conversationId, message) => {
    return sendChatMessage(conversationId, message);
  }, []);

  const setTyping = useCallback((conversationId, isTyping) => {
    return sendTypingIndicator(conversationId, isTyping);
  }, []);

  // ==================== CONNECTION STATUS ====================
  const getConnectionStatus = useCallback((channel) => {
    return websocketService.getConnectionStatus(channel);
  }, []);

  const isChannelConnected = useCallback((channel) => {
    return websocketService.isConnected(channel);
  }, []);

  // ==================== CLEANUP ====================
  useEffect(() => {
    return () => {
      websocketService.disconnectAll();
    };
  }, []);

  const value = {
    // State
    isConnected,
    error,
    activeConnections,
    notifications,
    activeChats,

    // Auction
    joinAuction,
    leaveAuction,
    placeBid,

    // Notifications
    joinNotifications,
    leaveNotifications,
    clearNotifications,

    // Chat
    joinChat,
    leaveChat,
    sendMessage,
    setTyping,

    // Status
    getConnectionStatus,
    isChannelConnected,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

// ==================== CUSTOM HOOK ====================
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }

  return context;
};

export default WebSocketContext;
