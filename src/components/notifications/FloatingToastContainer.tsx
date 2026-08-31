import React, { useEffect } from 'react';
import { useNotifications, NotificationType, AppNotification } from '../../context/NotificationContext';
import { ScreenId, Language } from '../../types';
import { 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  AlertOctagon, 
  Truck, 
  CalendarCheck, 
  CreditCard, 
  Sparkles, 
  Cpu, 
  X, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface FloatingToastContainerProps {
  onNavigate: (screen: ScreenId) => void;
  lang?: Language;
}

export const NOTIFICATION_TYPE_CONFIG: Record<NotificationType, {
  label: string;
  badgeBg: string;
  badgeText: string;
  border: string;
  icon: React.ElementType;
  iconColor: string;
  accentBar: string;
}> = {
  success: {
    label: 'Success',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    accentBar: 'bg-emerald-500'
  },
  info: {
    label: 'Information',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/80',
    badgeText: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800',
    icon: Info,
    iconColor: 'text-sky-600 dark:text-sky-400',
    accentBar: 'bg-sky-500'
  },
  warning: {
    label: 'Warning',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/80',
    badgeText: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    icon: AlertTriangle,
    iconColor: 'text-amber-600 dark:text-amber-400',
    accentBar: 'bg-amber-500'
  },
  error: {
    label: 'Error',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/80',
    badgeText: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
    icon: AlertOctagon,
    iconColor: 'text-rose-600 dark:text-rose-400',
    accentBar: 'bg-rose-500'
  },
  order_update: {
    label: 'Order Update',
    badgeBg: 'bg-[#EFF4FF] dark:bg-[#00444D]/50',
    badgeText: 'text-[#00444D] dark:text-[#ABEDFA]',
    border: 'border-[#B0EDF4] dark:border-teal-700',
    icon: Truck,
    iconColor: 'text-[#00444D] dark:text-[#ABEDFA]',
    accentBar: 'bg-[#00444D]'
  },
  booking_update: {
    label: 'Booking Update',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/80',
    badgeText: 'text-teal-800 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800',
    icon: CalendarCheck,
    iconColor: 'text-teal-600 dark:text-teal-400',
    accentBar: 'bg-teal-500'
  },
  payment_update: {
    label: 'Payment Update',
    badgeBg: 'bg-amber-50/70 dark:bg-amber-950/50',
    badgeText: 'text-amber-900 dark:text-[#FFE088]',
    border: 'border-[#FFE088]/60 dark:border-amber-700',
    icon: CreditCard,
    iconColor: 'text-[#CCA730] dark:text-[#FFE088]',
    accentBar: 'bg-[#CCA730]'
  },
  promotional: {
    label: 'Promotional',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/80',
    badgeText: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    icon: Sparkles,
    iconColor: 'text-purple-600 dark:text-purple-400',
    accentBar: 'bg-purple-500'
  },
  system: {
    label: 'System Notification',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-300 dark:border-slate-700',
    icon: Cpu,
    iconColor: 'text-slate-600 dark:text-slate-400',
    accentBar: 'bg-slate-500'
  }
};

const ToastItem: React.FC<{
  notification: AppNotification;
  onDismiss: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
  lang?: Language;
}> = ({ notification, onDismiss, onNavigate, lang }) => {
  const isRTL = lang === 'ar';
  const config = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.info;
  const Icon = config.icon;

  // Auto dismiss after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 6000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const handleAction = () => {
    if (notification.actionScreen) {
      onNavigate(notification.actionScreen);
    }
    onDismiss(notification.id);
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div 
      role="alert" 
      aria-live="polite"
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`w-full max-w-sm sm:max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border ${config.border} p-3.5 sm:p-4 relative overflow-hidden transition-all transform animate-fadeIn`}
    >
      {/* Top / Left accent strip */}
      <div className={`absolute top-0 inset-x-0 h-1 ${config.accentBar}`} />

      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div className={`p-2 rounded-xl ${config.badgeBg} flex-shrink-0 mt-0.5`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${config.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText}`}>
              {config.label}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {notification.timestamp}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-white truncate">
            {notification.title}
          </h4>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {notification.message}
          </p>

          {/* Action CTA if present */}
          {notification.actionScreen && (
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleAction}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] hover:underline cursor-pointer"
              >
                <span>{notification.actionLabel || 'View Details'}</span>
                <Arrow className="w-3 h-3" />
              </button>

              {notification.metadata?.orderId && (
                <span className="text-[10px] font-mono text-slate-400">
                  Ref: {notification.metadata.orderId}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => onDismiss(notification.id)}
          aria-label="Dismiss notification"
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const FloatingToastContainer: React.FC<FloatingToastContainerProps> = ({ onNavigate, lang }) => {
  const { activeToasts, dismissToast } = useNotifications();

  if (activeToasts.length === 0) return null;

  const isRTL = lang === 'ar';

  return (
    <div 
      aria-label="Live System Notifications"
      className={`fixed top-16 z-50 flex flex-col gap-2.5 max-w-full px-4 pointer-events-auto ${
        isRTL ? 'left-4' : 'right-4'
      }`}
      style={{ maxWidth: 'calc(100vw - 32px)' }}
    >
      {activeToasts.map((toast) => (
        <ToastItem
          key={toast.id}
          notification={toast}
          onDismiss={dismissToast}
          onNavigate={onNavigate}
          lang={lang}
        />
      ))}
    </div>
  );
};
