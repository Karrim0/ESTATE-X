// src/hooks/useNotifications.js

import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

/**
 * Custom hook to access notification context
 * @returns {Object} Notification context
 */
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  
  return context;
};

export default useNotifications;