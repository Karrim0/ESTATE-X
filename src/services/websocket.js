// src/services/websocket.js

import { WS_ENDPOINTS, STORAGE_KEYS } from '../data/constants';

class WebSocketService {
  constructor() {
    this.connections = new Map();
    this.reconnectAttempts = new Map();
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000;
    this.listeners = new Map();
  }

  // ==================== CONNECT ====================
  connect(channel, onMessage, onError) {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (!token) {
      console.warn('No auth token found for WebSocket connection');
      return null;
    }

    // Check if already connected to this channel
    if (this.connections.has(channel)) {
      console.log(`Already connected to ${channel}`);
      return this.connections.get(channel);
    }

    try {
      const wsUrl = `${WS_ENDPOINTS.BASE_URL}${channel}?token=${token}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log(`WebSocket connected to ${channel}`);
        this.reconnectAttempts.set(channel, 0);
        
        // Send authentication
        ws.send(JSON.stringify({
          type: 'auth',
          token
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Handle different message types
          switch (data.type) {
            case 'auth_success':
              console.log(`Authenticated on ${channel}`);
              break;
            case 'auth_error':
              console.error('WebSocket authentication failed');
              if (onError) onError(new Error('Authentication failed'));
              break;
            default:
              if (onMessage) onMessage(data);
              this.notifyListeners(channel, data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error(`WebSocket error on ${channel}:`, error);
        if (onError) onError(error);
      };

      ws.onclose = (event) => {
        console.log(`WebSocket disconnected from ${channel}`);
        this.connections.delete(channel);
        
        // Attempt reconnection if not a clean close
        if (!event.wasClean) {
          this.attemptReconnect(channel, onMessage, onError);
        }
      };

      this.connections.set(channel, ws);
      return ws;
    } catch (error) {
      console.error(`Failed to connect to ${channel}:`, error);
      if (onError) onError(error);
      return null;
    }
  }

  // ==================== DISCONNECT ====================
  disconnect(channel) {
    const ws = this.connections.get(channel);
    
    if (ws) {
      ws.close(1000, 'Client disconnect');
      this.connections.delete(channel);
      this.reconnectAttempts.delete(channel);
      this.listeners.delete(channel);
      console.log(`Disconnected from ${channel}`);
    }
  }

  // ==================== DISCONNECT ALL ====================
  disconnectAll() {
    this.connections.forEach((ws, channel) => {
      this.disconnect(channel);
    });
  }

  // ==================== SEND MESSAGE ====================
  send(channel, data) {
    const ws = this.connections.get(channel);
    
    if (!ws) {
      console.error(`No WebSocket connection to ${channel}`);
      return false;
    }

    if (ws.readyState !== WebSocket.OPEN) {
      console.error(`WebSocket to ${channel} is not open`);
      return false;
    }

    try {
      ws.send(JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error sending message to ${channel}:`, error);
      return false;
    }
  }

  // ==================== ATTEMPT RECONNECT ====================
  attemptReconnect(channel, onMessage, onError) {
    const attempts = this.reconnectAttempts.get(channel) || 0;
    
    if (attempts >= this.maxReconnectAttempts) {
      console.error(`Max reconnection attempts reached for ${channel}`);
      return;
    }

    console.log(`Attempting to reconnect to ${channel} (${attempts + 1}/${this.maxReconnectAttempts})`);
    
    setTimeout(() => {
      this.reconnectAttempts.set(channel, attempts + 1);
      this.connect(channel, onMessage, onError);
    }, this.reconnectDelay * (attempts + 1));
  }

  // ==================== ADD LISTENER ====================
  addListener(channel, id, callback) {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, new Map());
    }
    
    this.listeners.get(channel).set(id, callback);
  }

  // ==================== REMOVE LISTENER ====================
  removeListener(channel, id) {
    const channelListeners = this.listeners.get(channel);
    
    if (channelListeners) {
      channelListeners.delete(id);
      
      if (channelListeners.size === 0) {
        this.listeners.delete(channel);
      }
    }
  }

  // ==================== NOTIFY LISTENERS ====================
  notifyListeners(channel, data) {
    const channelListeners = this.listeners.get(channel);
    
    if (channelListeners) {
      channelListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in WebSocket listener:', error);
        }
      });
    }
  }

  // ==================== IS CONNECTED ====================
  isConnected(channel) {
    const ws = this.connections.get(channel);
    return ws && ws.readyState === WebSocket.OPEN;
  }

  // ==================== GET CONNECTION STATUS ====================
  getConnectionStatus(channel) {
    const ws = this.connections.get(channel);
    
    if (!ws) return 'disconnected';
    
    switch (ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      case WebSocket.CLOSING:
        return 'closing';
      case WebSocket.CLOSED:
        return 'closed';
      default:
        return 'unknown';
    }
  }
}

// Create singleton instance
const websocketService = new WebSocketService();

// ==================== AUCTION-SPECIFIC HELPERS ====================
export const connectToAuction = (auctionId, onBidUpdate, onError) => {
  return websocketService.connect(
    `${WS_ENDPOINTS.AUCTIONS}/${auctionId}`,
    (data) => {
      if (data.type === 'bid_update' && onBidUpdate) {
        onBidUpdate(data.payload);
      }
    },
    onError
  );
};

export const disconnectFromAuction = (auctionId) => {
  websocketService.disconnect(`${WS_ENDPOINTS.AUCTIONS}/${auctionId}`);
};

export const sendBid = (auctionId, bidAmount) => {
  return websocketService.send(`${WS_ENDPOINTS.AUCTIONS}/${auctionId}`, {
    type: 'place_bid',
    amount: bidAmount,
    timestamp: new Date().toISOString()
  });
};

// ==================== NOTIFICATION-SPECIFIC HELPERS ====================
export const connectToNotifications = (onNotification, onError) => {
  return websocketService.connect(
    WS_ENDPOINTS.NOTIFICATIONS,
    (data) => {
      if (data.type === 'notification' && onNotification) {
        onNotification(data.payload);
      }
    },
    onError
  );
};

export const disconnectFromNotifications = () => {
  websocketService.disconnect(WS_ENDPOINTS.NOTIFICATIONS);
};

// ==================== CHAT-SPECIFIC HELPERS ====================
export const connectToChat = (conversationId, onMessage, onError) => {
  return websocketService.connect(
    `${WS_ENDPOINTS.CHAT}/${conversationId}`,
    (data) => {
      if (data.type === 'message' && onMessage) {
        onMessage(data.payload);
      } else if (data.type === 'typing' && data.payload) {
        // Handle typing indicator
      } else if (data.type === 'read' && data.payload) {
        // Handle read receipts
      }
    },
    onError
  );
};

export const disconnectFromChat = (conversationId) => {
  websocketService.disconnect(`${WS_ENDPOINTS.CHAT}/${conversationId}`);
};

export const sendChatMessage = (conversationId, message) => {
  return websocketService.send(`${WS_ENDPOINTS.CHAT}/${conversationId}`, {
    type: 'message',
    message,
    timestamp: new Date().toISOString()
  });
};

export const sendTypingIndicator = (conversationId, isTyping) => {
  return websocketService.send(`${WS_ENDPOINTS.CHAT}/${conversationId}`, {
    type: 'typing',
    isTyping,
    timestamp: new Date().toISOString()
  });
};

// ==================== MOCK MODE (Development) ====================
export const createMockWebSocket = (channel) => {
  // Mock WebSocket for development without backend
  return {
    readyState: WebSocket.OPEN,
    send: (data) => {
      console.log(`[Mock WS] Sending to ${channel}:`, data);
    },
    close: () => {
      console.log(`[Mock WS] Closing ${channel}`);
    },
    addEventListener: (event, handler) => {
      console.log(`[Mock WS] Listener added for ${event} on ${channel}`);
    }
  };
};

export default websocketService;