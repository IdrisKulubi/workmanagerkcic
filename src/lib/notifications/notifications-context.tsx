"use client";

import { createContext, useContext, useReducer } from 'react';

export type NotificationType = 
  | 'NEW_PROJECT'
  | 'PROJECT_WON'
  | 'PROJECT_DEADLINE'
  | 'NEW_EMPLOYEE'
  | 'WEEKLY_SUMMARY';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  data?: {
    projectId?: string;
    projectName?: string;
    employeeId?: string;
    employeeName?: string;
    deadline?: Date;
    status?: string;
  };
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  showWeeklySummary: boolean;
}

type NotificationAction = 
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'DISMISS_WEEKLY_SUMMARY' };

const NotificationsContext = createContext<{
  state: NotificationState;
  dispatch: React.Dispatch<NotificationAction>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissWeeklySummary: () => void;
} | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const initialState: NotificationState = {
    notifications: [],
    unreadCount: 0,
    showWeeklySummary: false
  };

  function notificationsReducer(state: NotificationState, action: NotificationAction): NotificationState {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return {
          ...state,
          notifications: [action.payload, ...state.notifications],
          unreadCount: state.unreadCount + 1
        };
      case 'MARK_AS_READ':
        return {
          ...state,
          notifications: state.notifications.map(notif => 
            notif.id === action.payload ? { ...notif, read: true } : notif
          ),
          unreadCount: state.unreadCount - 1
        };
      case 'MARK_ALL_AS_READ':
        return {
          ...state,
          notifications: state.notifications.map(notif => ({ ...notif, read: true })),
          unreadCount: 0
        };
      case 'DISMISS_WEEKLY_SUMMARY':
        return {
          ...state,
          showWeeklySummary: false
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(notificationsReducer, initialState);

  const markAsRead = (id: string) => dispatch({ type: 'MARK_AS_READ', payload: id });
  const markAllAsRead = () => dispatch({ type: 'MARK_ALL_AS_READ' });
  const dismissWeeklySummary = () => dispatch({ type: 'DISMISS_WEEKLY_SUMMARY' });

  return (
    <NotificationsContext.Provider value={{ 
      state, 
      dispatch, 
      markAsRead, 
      markAllAsRead,
      dismissWeeklySummary 
    }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
} 