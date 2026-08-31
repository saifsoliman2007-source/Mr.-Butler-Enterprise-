import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ScreenId } from '../types';

export type NotificationType = 
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'order_update'
  | 'booking_update'
  | 'payment_update'
  | 'promotional'
  | 'system';

export type NotificationCategory = 'all' | 'orders' | 'payments' | 'system' | 'promotions';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionScreen?: ScreenId;
  actionLabel?: string;
  metadata?: {
    orderId?: string;
    amount?: string;
    serviceName?: string;
    valetName?: string;
    discountCode?: string;
    badge?: string;
  };
}

interface NotificationContextValue {
  notifications: AppNotification[];
  activeToasts: AppNotification[];
  unreadCount: number;
  isCenterOpen: boolean;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'> & { id?: string; timestamp?: string; read?: boolean }) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  dismissToast: (id: string) => void;
  openNotificationCenter: () => void;
  closeNotificationCenter: () => void;
  toggleNotificationCenter: () => void;
  simulateNotification: (type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'order_update',
    title: 'Valet Dispatch In Transit',
    message: 'Master Butler Charles is en route to 1007 Mountain Drive with your freshly pressed Italian Tuxedo.',
    timestamp: '3 mins ago',
    read: false,
    actionScreen: 'orders_active',
    actionLabel: 'Track Valet',
    metadata: { orderId: 'MB-99482', valetName: 'Charles Montgomery', serviceName: 'Tuxedo Dry Cleaning' }
  },
  {
    id: 'notif-2',
    type: 'payment_update',
    title: 'Payment Settled: $128.00',
    message: 'Imperial Garment Care receipt #RCP-8841 settled securely via Apple Pay.',
    timestamp: '25 mins ago',
    read: false,
    actionScreen: 'orders_details',
    actionLabel: 'View Invoice',
    metadata: { amount: '$128.00', orderId: 'MB-99482' }
  },
  {
    id: 'notif-3',
    type: 'booking_update',
    title: 'Valet Slot Confirmed',
    message: 'Your Artisan Steam & Shoe Restoration appointment is scheduled for tomorrow at 08:00 AM.',
    timestamp: '2 hours ago',
    read: false,
    actionScreen: 'orders_active',
    actionLabel: 'View Schedule',
    metadata: { serviceName: 'Shoe Fix & Artisan Steam' }
  },
  {
    id: 'notif-4',
    type: 'promotional',
    title: 'VIP Concierge Privilege',
    message: 'Enjoy 20% complimentary couture conditioning on Egyptian cotton linens this weekend with code ROYAL20.',
    timestamp: '5 hours ago',
    read: true,
    actionScreen: 'concierge_offers',
    actionLabel: 'Redeem Privilege',
    metadata: { discountCode: 'ROYAL20' }
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'Security & Encryption Active',
    message: 'Biometric multi-factor authentication (MRES) synchronized for your primary device.',
    timestamp: 'Yesterday',
    read: true,
    actionScreen: 'foundation_enterprise',
    actionLabel: 'Security Settings'
  },
  {
    id: 'notif-6',
    type: 'warning',
    title: 'High Humidity Advisory',
    message: 'High humidity detected in your district. Delicate silk and cashmere items should remain in breathable garment bags.',
    timestamp: 'Yesterday',
    read: true,
    actionScreen: 'concierge_recommendations',
    actionLabel: 'Fabric Guide'
  },
  {
    id: 'notif-7',
    type: 'info',
    title: 'New Eco-Solvent Standard',
    message: 'All dry cleaning facilities upgraded to 100% hypoallergenic organic solutions.',
    timestamp: '2 days ago',
    read: true,
    actionScreen: 'foundation_brand',
    actionLabel: 'Learn More'
  }
];

export const NotificationProvider: React.FC<{ children: ReactNode; onNavigate?: (screen: ScreenId) => void }> = ({ 
  children,
  onNavigate
}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(SEED_NOTIFICATIONS);
  const [activeToasts, setActiveToasts] = useState<AppNotification[]>([]);
  const [isCenterOpen, setIsCenterOpen] = useState<boolean>(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const dismissToast = useCallback((id: string) => {
    setActiveToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addNotification = useCallback((
    notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'> & { id?: string; timestamp?: string; read?: boolean }
  ) => {
    const fullNotif: AppNotification = {
      id: notif.id || `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: notif.type,
      title: notif.title,
      message: notif.message,
      timestamp: notif.timestamp || 'Just now',
      read: notif.read ?? false,
      actionScreen: notif.actionScreen,
      actionLabel: notif.actionLabel,
      metadata: notif.metadata
    };

    setNotifications(prev => [fullNotif, ...prev]);
    setActiveToasts(prev => [fullNotif, ...prev.slice(0, 2)]); // Keep max 3 simultaneous toasts
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setActiveToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    setActiveToasts([]);
  }, []);

  const openNotificationCenter = useCallback(() => setIsCenterOpen(true), []);
  const closeNotificationCenter = useCallback(() => setIsCenterOpen(false), []);
  const toggleNotificationCenter = useCallback(() => setIsCenterOpen(prev => !prev), []);

  const simulateNotification = useCallback((type: NotificationType) => {
    const templates: Record<NotificationType, Omit<AppNotification, 'id' | 'timestamp' | 'read'>> = {
      success: {
        type: 'success',
        title: 'Action Completed Successfully',
        message: 'Your bespoke tailoring measurements have been updated and synced with Master Savile Row Tailor.',
        actionScreen: 'book_tailoring',
        actionLabel: 'View Specs'
      },
      info: {
        type: 'info',
        title: 'District Concierge Update',
        message: 'Valet courier routes expanded to cover Dubai Marina and Downtown Palm sectors.',
        actionScreen: 'our_services',
        actionLabel: 'Explore Services'
      },
      warning: {
        type: 'warning',
        title: 'Impending Weather Delay Notice',
        message: 'Heavy sandstorm advisory may introduce a 15-minute grace period for evening drop-offs.',
        actionScreen: 'orders_active',
        actionLabel: 'Check ETA'
      },
      error: {
        type: 'error',
        title: 'Payment Method Pre-Authorization Failed',
        message: 'Card ending in 4242 was declined by your financial institution. Please update card details.',
        actionScreen: 'orders_details',
        actionLabel: 'Update Card'
      },
      order_update: {
        type: 'order_update',
        title: 'Garments Checked into Laboratory',
        message: '3 bespoke shirts and 1 tuxedo inspected under UV spectroscopy. Cleaning in progress.',
        actionScreen: 'orders_active',
        actionLabel: 'View Inspection',
        metadata: { orderId: 'MB-10928', serviceName: 'Eco-Dry Clean' }
      },
      booking_update: {
        type: 'booking_update',
        title: 'Valet Dispatch Rescheduled',
        message: 'Pickup slot successfully modified to Thursday 10:00 AM at your request.',
        actionScreen: 'orders_active',
        actionLabel: 'View Schedule'
      },
      payment_update: {
        type: 'payment_update',
        title: 'Invoice Settled: $48.00',
        message: 'Express valet priority service invoiced and settled with corporate card.',
        actionScreen: 'orders_details',
        actionLabel: 'Download PDF',
        metadata: { amount: '$48.00' }
      },
      promotional: {
        type: 'promotional',
        title: 'Seasonal Velvet & Leather Care',
        message: 'Receive a complimentary handmade shoe horn and cedar hanger with any leather restoration.',
        actionScreen: 'concierge_offers',
        actionLabel: 'Claim Offer',
        metadata: { discountCode: 'CEDAR2026' }
      },
      system: {
        type: 'system',
        title: 'MEDS Shell Framework v2.4 Active',
        message: 'Enterprise notification gateway, state boundaries, and foldable layout engine operational.',
        actionScreen: 'foundation_enterprise',
        actionLabel: 'System Status'
      }
    };

    const template = templates[type];
    addNotification(template);
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        activeToasts,
        unreadCount,
        isCenterOpen,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        dismissToast,
        openNotificationCenter,
        closeNotificationCenter,
        toggleNotificationCenter,
        simulateNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
