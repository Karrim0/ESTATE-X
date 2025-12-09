// src/context/NotificationContext.jsx

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as usersAPI from '../services/api/users';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ==================== FETCH NOTIFICATIONS ====================
  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await usersAPI.getUserNotifications();
      
      if (response.notifications) {
        setNotifications(response.notifications);
        setUnreadCount(response.unread || 0);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch on mount and when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, fetchNotifications]);

  // ==================== ADD NOTIFICATION ====================
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
      createdAt: new Date().toISOString()
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Show browser notification if permission granted
    if (Notification.permission === 'granted' && notification.showBrowser !== false) {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/vite.svg',
        tag: `notification-${newNotification.id}`
      });
    }

    return newNotification;
  }, []);

  // ==================== MARK AS READ ====================
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await usersAPI.markNotificationAsRead(notificationId);
      
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, read: true }
            : notif
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, []);

  // ==================== MARK ALL AS READ ====================
  const markAllAsRead = useCallback(async () => {
    try {
      await usersAPI.markAllNotificationsAsRead();
      
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
      
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  }, []);

  // ==================== DELETE NOTIFICATION ====================
  const deleteNotification = useCallback((notificationId) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === notificationId);
      const filtered = prev.filter(n => n.id !== notificationId);
      
      // Decrease unread count if notification was unread
      if (notification && !notification.read) {
        setUnreadCount(count => Math.max(0, count - 1));
      }
      
      return filtered;
    });
  }, []);

  // ==================== CLEAR ALL ====================
  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // ==================== REQUEST PERMISSION ====================
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }, []);

  // ==================== SHOW SUCCESS TOAST ====================
  const showSuccess = useCallback((message, title = 'Success') => {
    return addNotification({
      type: 'success',
      title,
      message,
      showBrowser: false
    });
  }, [addNotification]);

  // ==================== SHOW ERROR TOAST ====================
  const showError = useCallback((message, title = 'Error') => {
    return addNotification({
      type: 'error',
      title,
      message,
      showBrowser: false
    });
  }, [addNotification]);

  // ==================== SHOW INFO TOAST ====================
  const showInfo = useCallback((message, title = 'Info') => {
    return addNotification({
      type: 'info',
      title,
      message,
      showBrowser: false
    });
  }, [addNotification]);

  // ==================== SHOW WARNING TOAST ====================
  const showWarning = useCallback((message, title = 'Warning') => {
    return addNotification({
      type: 'warning',
      title,
      message,
      showBrowser: false
    });
  }, [addNotification]);

  const value = {
    // State
    notifications,
    unreadCount,
    loading,
    
    // Actions
    fetchNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    requestPermission,
    
    // Toast helpers
    showSuccess,
    showError,
    showInfo,
    showWarning
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// ==================== CUSTOM HOOK ====================
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  
  return context;
};

export default NotificationContext;