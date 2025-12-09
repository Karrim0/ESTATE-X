// src/services/api/messages.js

import apiClient, { apiCall } from "./client";
import { API_ENDPOINTS } from "../../data/constants";

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Modern Luxury Villa",
    propertyImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400",
    otherUser: {
      id: "user_2",
      name: "Sarah Johnson",
      avatar:
        "https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff&bold=true&size=200",
      role: "agent",
      online: true,
    },
    lastMessage: {
      text: "Yes, I can arrange a viewing for tomorrow at 2 PM. Does that work for you?",
      sender: "user_2",
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false,
    },
    unreadCount: 2,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    propertyId: 7,
    propertyTitle: "Skyline Penthouse Dubai",
    propertyImage:
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=400",
    otherUser: {
      id: "user_4",
      name: "Mohammed Al Farsi",
      avatar:
        "https://ui-avatars.com/api/?name=Mohammed+AlFarsi&background=f59e0b&color=fff&bold=true&size=200",
      role: "developer",
      online: false,
    },
    lastMessage: {
      text: "Thank you for your interest. The property comes with full documentation.",
      sender: "user_4",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    unreadCount: 0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock messages data
const mockMessages = {
  1: [
    {
      id: 1,
      conversationId: 1,
      sender: "user_1",
      text: "Hi, I am interested in viewing this property. Is it still available?",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read: true,
      status: "read",
    },
    {
      id: 2,
      conversationId: 1,
      sender: "user_2",
      text: "Hello! Yes, the property is still available. When would you like to schedule a viewing?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
      status: "read",
    },
    {
      id: 3,
      conversationId: 1,
      sender: "user_1",
      text: "Great! Would tomorrow afternoon work?",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      read: true,
      status: "read",
    },
    {
      id: 4,
      conversationId: 1,
      sender: "user_2",
      text: "Yes, I can arrange a viewing for tomorrow at 2 PM. Does that work for you?",
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false,
      status: "delivered",
    },
  ],
  2: [
    {
      id: 5,
      conversationId: 2,
      sender: "user_1",
      text: "Hello, I would like more information about the penthouse",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      read: true,
      status: "read",
    },
    {
      id: 6,
      conversationId: 2,
      sender: "user_4",
      text: "Thank you for your interest. The property comes with full documentation.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
      status: "read",
    },
  ],
};

// ==================== GET ALL CONVERSATIONS ====================
export const getConversations = async () => {
  const mockData = () => {
    return {
      conversations: mockConversations,
      total: mockConversations.length,
      unreadCount: mockConversations.reduce(
        (sum, conv) => sum + conv.unreadCount,
        0
      ),
    };
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.MESSAGES}/conversations`),
    mockData()
  );
};

// ==================== GET CONVERSATION BY ID ====================
export const getConversation = async (conversationId) => {
  const mockData = () => {
    const conversation = mockConversations.find(
      (c) => c.id === parseInt(conversationId)
    );

    if (!conversation) {
      throw { message: "Conversation not found", status: 404 };
    }

    return conversation;
  };

  return apiCall(
    () =>
      apiClient.get(
        `${API_ENDPOINTS.MESSAGES}/conversations/${conversationId}`
      ),
    mockData()
  );
};

// ==================== GET MESSAGES ====================
export const getMessages = async (conversationId, params = {}) => {
  const mockData = () => {
    const messages = mockMessages[conversationId] || [];

    return {
      messages,
      total: messages.length,
      conversationId: parseInt(conversationId),
    };
  };

  return apiCall(
    () =>
      apiClient.get(
        `${API_ENDPOINTS.MESSAGES}/conversations/${conversationId}/messages`,
        { params }
      ),
    mockData()
  );
};

// ==================== SEND MESSAGE ====================
export const sendMessage = async (
  conversationId,
  messageText,
  attachments = []
) => {
  const mockData = () => {
    const newMessage = {
      id: Date.now(),
      conversationId: parseInt(conversationId),
      sender: "user_1", // Current user
      text: messageText,
      attachments,
      timestamp: new Date().toISOString(),
      read: false,
      status: "sent",
    };

    // Add to mock messages
    if (!mockMessages[conversationId]) {
      mockMessages[conversationId] = [];
    }
    mockMessages[conversationId].push(newMessage);

    // Update conversation
    const conversation = mockConversations.find(
      (c) => c.id === parseInt(conversationId)
    );
    if (conversation) {
      conversation.lastMessage = {
        text: messageText,
        sender: "user_1",
        timestamp: newMessage.timestamp,
        read: false,
      };
    }

    return {
      message: "Message sent successfully",
      data: newMessage,
    };
  };

  return apiCall(
    () =>
      apiClient.post(
        `${API_ENDPOINTS.MESSAGES}/conversations/${conversationId}/messages`,
        {
          text: messageText,
          attachments,
        }
      ),
    mockData()
  );
};

// ==================== START CONVERSATION ====================
export const startConversation = async (propertyId, initialMessage) => {
  const mockData = () => {
    const newConversation = {
      id: Date.now(),
      propertyId: parseInt(propertyId),
      propertyTitle: "Property Title",
      propertyImage:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400",
      otherUser: {
        id: "user_agent",
        name: "Agent Name",
        avatar:
          "https://ui-avatars.com/api/?name=Agent&background=3b82f6&color=fff&bold=true&size=200",
        role: "agent",
        online: true,
      },
      lastMessage: {
        text: initialMessage,
        sender: "user_1",
        timestamp: new Date().toISOString(),
        read: false,
      },
      unreadCount: 0,
      createdAt: new Date().toISOString(),
    };

    mockConversations.push(newConversation);

    return {
      message: "Conversation started",
      conversation: newConversation,
    };
  };

  return apiCall(
    () =>
      apiClient.post(`${API_ENDPOINTS.MESSAGES}/conversations`, {
        propertyId,
        initialMessage,
      }),
    mockData()
  );
};

// ==================== MARK CONVERSATION AS READ ====================
export const markConversationAsRead = async (conversationId) => {
  const mockData = () => {
    const conversation = mockConversations.find(
      (c) => c.id === parseInt(conversationId)
    );

    if (conversation) {
      conversation.unreadCount = 0;
      if (conversation.lastMessage) {
        conversation.lastMessage.read = true;
      }

      // Mark all messages as read
      const messages = mockMessages[conversationId] || [];
      messages.forEach((msg) => {
        if (msg.sender !== "user_1") {
          msg.read = true;
          msg.status = "read";
        }
      });
    }

    return {
      message: "Conversation marked as read",
      conversationId: parseInt(conversationId),
    };
  };

  return apiCall(
    () =>
      apiClient.patch(
        `${API_ENDPOINTS.MESSAGES}/conversations/${conversationId}/read`
      ),
    mockData()
  );
};

// ==================== DELETE CONVERSATION ====================
export const deleteConversation = async (conversationId) => {
  const mockData = () => {
    const index = mockConversations.findIndex(
      (c) => c.id === parseInt(conversationId)
    );

    if (index !== -1) {
      mockConversations.splice(index, 1);
    }

    return {
      message: "Conversation deleted",
      conversationId: parseInt(conversationId),
    };
  };

  return apiCall(
    () =>
      apiClient.delete(
        `${API_ENDPOINTS.MESSAGES}/conversations/${conversationId}`
      ),
    mockData()
  );
};

// ==================== SEARCH MESSAGES ====================
export const searchMessages = async (query) => {
  const mockData = () => {
    const allMessages = Object.values(mockMessages).flat();
    const results = allMessages.filter((msg) =>
      msg.text.toLowerCase().includes(query.toLowerCase())
    );

    return {
      results,
      total: results.length,
      query,
    };
  };

  return apiCall(
    () =>
      apiClient.get(`${API_ENDPOINTS.MESSAGES}/search`, {
        params: { q: query },
      }),
    mockData()
  );
};

// ==================== UPLOAD ATTACHMENT ====================
export const uploadAttachment = async (file) => {
  const mockData = () => {
    return {
      message: "File uploaded successfully",
      attachment: {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      },
    };
  };

  const formData = new FormData();
  formData.append("file", file);

  return apiCall(
    () =>
      apiClient.post(`${API_ENDPOINTS.MESSAGES}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    mockData()
  );
};

export default {
  getConversations,
  getConversation,
  getMessages,
  sendMessage,
  startConversation,
  markConversationAsRead,
  deleteConversation,
  searchMessages,
  uploadAttachment,
};
