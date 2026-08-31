import React, { useState } from 'react';
import { useNotifications, NotificationCategory, NotificationType, AppNotification } from '../../context/NotificationContext';
import { NOTIFICATION_TYPE_CONFIG } from './FloatingToastContainer';
import { ScreenId, Language } from '../../types';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Trash2, 
  Filter, 
  Sparkles, 
  Truck, 
  CreditCard, 
  Cpu, 
  Layers, 
  ChevronRight,
  ChevronLeft,
  PlayCircle
} from 'lucide-react';

interface NotificationCenterDrawerProps {
  onNavigate: (screen: ScreenId) => void;
  lang?: Language;
}

export const NotificationCenterDrawer: React.FC<NotificationCenterDrawerProps> = ({
  onNavigate,
  lang
}) => {
  const isRTL = lang === 'ar';
  const {
    notifications,
    unreadCount,
    isCenterOpen,
    closeNotificationCenter,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    simulateNotification
  } = useNotifications();

  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('all');
  const [showSimulator, setShowSimulator] = useState(false);

  if (!isCenterOpen) return null;

  // Filter notifications by category
  const filteredNotifications = notifications.filter((notif) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'orders') return notif.type === 'order_update' || notif.type === 'booking_update';
    if (activeCategory === 'payments') return notif.type === 'payment_update';
    if (activeCategory === 'promotions') return notif.type === 'promotional';
    if (activeCategory === 'system') return notif.type === 'system' || notif.type === 'warning' || notif.type === 'error' || notif.type === 'info' || notif.type === 'success';
    return true;
  });

  const handleNotificationClick = (notif: AppNotification) => {
    markAsRead(notif.id);
    if (notif.actionScreen) {
      onNavigate(notif.actionScreen);
      closeNotificationCenter();
    }
  };

  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn"
      aria-modal="true"
      role="dialog"
      aria-labelledby="notification-center-title"
    >
      <div 
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-md bg-[#F8F9FF] dark:bg-[#0F172A] text-slate-900 dark:text-white h-full flex flex-col shadow-2xl border-l border-[#D9E3F6] dark:border-slate-800 transition-all duration-300"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-b border-[#D9E3F6] dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00444D] text-[#FFE088]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 id="notification-center-title" className="font-serif text-lg font-bold text-[#00444D] dark:text-white">
                {isRTL ? 'مركز الإشعارات' : 'Notification Center'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isRTL 
                  ? `${unreadCount} غير مقروء • معمارية إشعارات موحدة` 
                  : `${unreadCount} unread • Universal Notification Gateway`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSimulator(prev => !prev)}
              title="Test All 9 Notification Types"
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                showSimulator
                  ? 'bg-[#CCA730] text-slate-950 shadow-xs'
                  : 'bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E2E8F0]'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{isRTL ? 'اختبار' : 'Simulate'}</span>
            </button>

            <button
              onClick={closeNotificationCenter}
              aria-label="Close notification center"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Simulator Bar (Expanded when requested) */}
        {showSimulator && (
          <div className="p-4 bg-gradient-to-r from-[#00444D] to-[#0D5D68] text-white border-b border-[#CCA730]/40 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1.5 text-[#FFE088]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Enterprise Notification:</span>
              </span>
              <span className="text-[10px] text-slate-200">All 9 Specs Supported</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {(
                [
                  { type: 'success', label: '1. Success' },
                  { type: 'info', label: '2. Info' },
                  { type: 'warning', label: '3. Warning' },
                  { type: 'error', label: '4. Error' },
                  { type: 'order_update', label: '5. Order' },
                  { type: 'booking_update', label: '6. Booking' },
                  { type: 'payment_update', label: '7. Payment' },
                  { type: 'promotional', label: '8. Promo' },
                  { type: 'system', label: '9. System' }
                ] as { type: NotificationType; label: string }[]
              ).map(item => (
                <button
                  key={item.type}
                  onClick={() => simulateNotification(item.type)}
                  className="px-2 py-1.5 bg-white/15 hover:bg-white/30 text-white rounded-lg text-[11px] font-semibold text-center truncate transition-all cursor-pointer border border-white/20 active:scale-95"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="px-4 py-2 bg-white dark:bg-slate-900 border-b border-[#D9E3F6] dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {(
            [
              { id: 'all', label: isRTL ? 'الكل' : 'All' },
              { id: 'orders', label: isRTL ? 'الطلبات والمواعيد' : 'Orders & Valet' },
              { id: 'payments', label: isRTL ? 'المدفوعات' : 'Payments' },
              { id: 'promotions', label: isRTL ? 'العروض' : 'Privileges' },
              { id: 'system', label: isRTL ? 'النظام' : 'System' }
            ] as { id: NotificationCategory; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#00444D] text-white shadow-xs'
                  : 'bg-[#EFF4FF] dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#E2E8F0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Header: Mark all read / Clear */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>{filteredNotifications.length} {isRTL ? 'إشعار' : 'Notifications'}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-1 hover:text-[#00444D] dark:hover:text-[#ABEDFA] disabled:opacity-40 disabled:cursor-not-allowed font-medium cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{isRTL ? 'تحديد الكل كمقروء' : 'Mark all read'}</span>
            </button>
            <button
              onClick={clearAll}
              disabled={notifications.length === 0}
              className="inline-flex items-center gap-1 hover:text-rose-600 disabled:opacity-40 disabled:cursor-not-allowed font-medium cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isRTL ? 'مسح الكل' : 'Clear all'}</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {isRTL ? 'لا توجد إشعارات في هذا القسم' : 'No notifications in this category'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {isRTL ? 'انقر على زر "اختبار" لتوليد إشعارات جديدة.' : 'Use the Simulate button above to test any of the 9 notification types.'}
                </p>
              </div>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const config = NOTIFICATION_TYPE_CONFIG[notif.type] || NOTIFICATION_TYPE_CONFIG.info;
              const Icon = config.icon;

              return (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                    notif.read
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100'
                      : 'bg-white dark:bg-slate-900 border-[#CCA730]/50 dark:border-[#CCA730]/40 shadow-sm ring-1 ring-[#CCA730]/20'
                  }`}
                >
                  {!notif.read && (
                    <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-2 h-2 rounded-full bg-[#CCA730]" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${config.badgeBg} flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${config.iconColor}`} />
                    </div>

                    <div className="flex-1 min-w-0 pr-4 rtl:pr-0 rtl:pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText}`}>
                          {config.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {notif.timestamp}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-white leading-snug">
                        {notif.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {notif.message}
                      </p>

                      {/* Metadata Chips if available */}
                      {notif.metadata && (
                        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 font-mono">
                          {notif.metadata.orderId && (
                            <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                              ID: {notif.metadata.orderId}
                            </span>
                          )}
                          {notif.metadata.amount && (
                            <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded font-bold">
                              {notif.metadata.amount}
                            </span>
                          )}
                          {notif.metadata.discountCode && (
                            <span className="bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-1.5 py-0.5 rounded font-bold">
                              Code: {notif.metadata.discountCode}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Link */}
                      {notif.actionScreen && (
                        <div className="mt-2 text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] flex items-center gap-1">
                          <span>{notif.actionLabel || 'View Details'}</span>
                          <Chevron className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                      title="Delete notification"
                      aria-label="Delete notification"
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-[#D9E3F6] dark:border-slate-800 text-center text-xs text-slate-400 font-mono">
          <span>Enterprise Notification Bus • WCAG AA</span>
        </div>
      </div>
    </div>
  );
};
