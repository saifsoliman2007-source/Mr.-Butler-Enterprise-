import React, { useState } from 'react';
import { Language, ScreenId, ProviderOrder, ProviderBusinessProfile } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { 
  Building2, 
  Store, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  LogOut, 
  Calendar, 
  DollarSign,
  Package,
  ArrowRight,
  Sparkles,
  AlertCircle,
  PlusCircle,
  Truck,
  Check,
  X,
  ChevronRight,
  Eye,
  MessageSquare,
  Bot
} from 'lucide-react';

interface ScreenProviderDashboardProps {
  profile: ProviderBusinessProfile;
  orders: ProviderOrder[];
  onNavigate: (screen: ScreenId) => void;
  onSelectOrder: (order: ProviderOrder) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: ProviderOrder['status']) => void;
  lang: Language;
}

export const ScreenProviderDashboard: React.FC<ScreenProviderDashboardProps> = ({
  profile,
  orders,
  onNavigate,
  onSelectOrder,
  onUpdateOrderStatus,
  lang,
}) => {
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';

  const [aiAssistantOpen, setAiAssistantOpen] = useState(true);

  // Calculate Overview Metrics
  const newOrders = orders.filter(o => o.status === 'NEW');
  const awaitingConfirmation = orders.filter(o => o.status === 'ACCEPTED');
  const confirmedOrders = orders.filter(o => o.status === 'CONFIRMED' || o.status === 'PICKUP_SCHEDULED');
  const inProgressOrders = orders.filter(o => o.status === 'IN_PROGRESS');
  const readyOrders = orders.filter(o => o.status === 'READY');
  const outForDeliveryOrders = orders.filter(o => o.status === 'OUT_FOR_DELIVERY');
  const completedOrders = orders.filter(o => o.status === 'COMPLETED');
  const cancelledOrders = orders.filter(o => o.status === 'CANCELLED');

  const activeTotal = newOrders.length + awaitingConfirmation.length + confirmedOrders.length + inProgressOrders.length + readyOrders.length + outForDeliveryOrders.length;
  const todayRevenue = orders
    .filter(o => o.status !== 'CANCELLED')
    .reduce((acc, curr) => acc + curr.estimatedPrice, 0);

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#070D18] text-[#1E293B] dark:text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header with Business Identity & Verified Badge */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E3F6] dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <EGEC size="md" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="verified" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif font-bold text-lg sm:text-xl text-[#00444D] dark:text-[#FFE088]">
                {profile.businessName}
              </h1>
              <span className="text-[10px] bg-[#00444D]/10 text-[#00444D] dark:bg-[#FFE088]/15 dark:text-[#FFE088] font-bold px-2.5 py-0.5 rounded-full border border-[#00444D]/20 dark:border-[#FFE088]/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#CCA730]" />
                <span>Verified Merchant</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
              <span>{profile.serviceCategory}</span>
              <span>•</span>
              <span className="font-mono text-[11px]">{profile.crNumber}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => onNavigate('provider_profile')}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Store className="w-3.5 h-3.5 text-[#00444D] dark:text-[#FFE088]" />
            <span>Store Profile</span>
          </button>

          <button
            onClick={() => onNavigate(1)}
            title="Switch to Consumer or Sign Out"
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-500 transition flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Role Selector</span>
          </button>
        </div>
      </header>

      {/* AI Assistive Workload & Capacity Banner */}
      {aiAssistantOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#003840] to-[#00505B] text-white border border-[#00606D] shadow-md space-y-3 relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#FFE088]/20 text-[#FFE088]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#FFE088]">
                  AI Assistive Dispatch Assistant
                </span>
                <p className="text-xs text-white/90 font-medium">
                  {newOrders.length > 0
                    ? `You have ${newOrders.length} incoming high-priority orders awaiting your review. Peak valet slots predicted at 04:00 PM - 07:00 PM.`
                    : `Optimal dispatch capacity. All ${activeTotal} active orders are on schedule for on-time luxury valet completion.`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setAiAssistantOpen(false)}
              className="text-white/60 hover:text-white text-xs p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1 relative z-10 flex-wrap">
            {newOrders.length > 0 && (
              <button
                onClick={() => onNavigate('provider_orders')}
                className="px-3 py-1.5 rounded-lg bg-[#FFE088] text-[#00333A] font-bold text-xs hover:bg-[#FFD768] transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>Review {newOrders.length} New Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-[11px] text-white/70">
              AI recommendations are assistive only; every order decision requires your confirmation.
            </span>
          </div>
        </div>
      )}

      {/* Today's Overview Grid (Metric Cards) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
            <h2 className="font-serif font-bold text-base text-slate-900 dark:text-white">
              Today's Overview & Order Status
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500">
            {activeTotal} active orders today
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          <StatusMetricCard
            title="New Orders"
            count={newOrders.length}
            color="border-amber-400/80 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300"
            badge="Needs Action"
            onClick={() => onNavigate('provider_orders')}
          />
          <StatusMetricCard
            title="Awaiting Confirm"
            count={awaitingConfirmation.length}
            color="border-blue-400/80 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300"
            onClick={() => onNavigate('provider_orders')}
          />
          <StatusMetricCard
            title="Confirmed"
            count={confirmedOrders.length}
            color="border-indigo-400/80 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-800 dark:text-indigo-300"
            onClick={() => onNavigate('provider_orders')}
          />
          <StatusMetricCard
            title="In Progress"
            count={inProgressOrders.length}
            color="border-purple-400/80 bg-purple-50 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300"
            onClick={() => onNavigate('provider_orders')}
          />
          <StatusMetricCard
            title="Ready / Out"
            count={readyOrders.length + outForDeliveryOrders.length}
            color="border-teal-400/80 bg-teal-50 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300"
            onClick={() => onNavigate('provider_orders')}
          />
          <StatusMetricCard
            title="Completed"
            count={completedOrders.length}
            color="border-emerald-400/80 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
            onClick={() => onNavigate('provider_orders')}
          />
          <StatusMetricCard
            title="Cancelled"
            count={cancelledOrders.length}
            color="border-slate-300 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
            onClick={() => onNavigate('provider_orders')}
          />
        </div>
      </section>

      {/* Revenue & Fast Performance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Estimated Pipeline Volume</p>
            <p className="text-xl font-bold font-serif text-[#00444D] dark:text-[#FFE088] mt-1">
              ${todayRevenue.toLocaleString()} <span className="text-xs font-sans font-normal text-slate-500">SAR / USD</span>
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Artisan Service Rating</p>
            <p className="text-xl font-bold font-serif text-slate-900 dark:text-white mt-1">
              {profile.rating} ★ <span className="text-xs font-sans font-normal text-slate-500">({profile.totalOrders} VIP orders)</span>
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Valet Couriers</p>
            <p className="text-xl font-bold font-serif text-slate-900 dark:text-white mt-1">
              3 Vehicles <span className="text-xs font-sans font-normal text-slate-500">(In Transit)</span>
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600">
            <Truck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Priority Incoming Orders Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
            <h2 className="font-serif font-bold text-base text-slate-900 dark:text-white">
              Incoming Orders & Priority Queue
            </h2>
          </div>

          <button
            onClick={() => onNavigate('provider_orders')}
            className="text-xs font-bold text-[#00444D] dark:text-[#FFE088] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Orders ({orders.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {orders.slice(0, 3).map((order) => {
            return (
              <div
                key={order.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#00444D]/40 transition shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-xs text-[#00444D] dark:text-[#FFE088] bg-[#00444D]/5 dark:bg-[#FFE088]/10 px-2.5 py-1 rounded-lg border border-[#00444D]/15 dark:border-[#FFE088]/20">
                      {order.orderNumber}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {order.customerName}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {order.customerDistrict}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <OrderStatusBadge status={order.status} />
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                      ${order.estimatedPrice}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Service Title</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {order.serviceTitle}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Items Breakdown</span>
                    <span className="text-slate-600 dark:text-slate-300 truncate block">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Requested Slot</span>
                    <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {order.requestedDateTime}
                    </span>
                  </div>
                </div>

                {/* Quick Actions Toolbar */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {order.status === 'NEW' && (
                      <>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'ACCEPTED')}
                          className="px-3.5 py-1.5 rounded-xl bg-[#00444D] text-white font-bold text-xs hover:bg-[#00333A] transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5 text-[#FFE088]" />
                          <span>Accept Order</span>
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'CANCELLED')}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-semibold transition cursor-pointer"
                        >
                          <span>Decline</span>
                        </button>
                      </>
                    )}

                    {order.status === 'ACCEPTED' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'CONFIRMED')}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm Order</span>
                      </button>
                    )}

                    {order.status === 'CONFIRMED' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'IN_PROGRESS')}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Begin Service</span>
                      </button>
                    )}

                    {order.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'READY')}
                        className="px-3.5 py-1.5 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Ready</span>
                      </button>
                    )}

                    {order.status === 'READY' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'OUT_FOR_DELIVERY')}
                        className="px-3.5 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Dispatch Courier</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      onSelectOrder(order);
                      onNavigate('provider_order_details');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs transition flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

const StatusMetricCard: React.FC<{
  title: string;
  count: number;
  color: string;
  badge?: string;
  onClick: () => void;
}> = ({ title, count, color, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-xl border ${color} text-left transition hover:scale-102 cursor-pointer shadow-xs flex flex-col justify-between`}
  >
    <div className="flex items-center justify-between">
      <span className="text-[10px] uppercase font-bold tracking-wider truncate">
        {title}
      </span>
      {badge && (
        <span className="text-[9px] bg-red-500 text-white font-bold px-1.5 py-0.2 rounded-full">
          {badge}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold font-serif mt-2">{count}</p>
  </button>
);

export const OrderStatusBadge: React.FC<{ status: ProviderOrder['status'] }> = ({ status }) => {
  const styles: Record<ProviderOrder['status'], { bg: string; text: string; label: string }> = {
    NEW: { bg: 'bg-amber-100 dark:bg-amber-950/60', text: 'text-amber-800 dark:text-amber-300 border-amber-300', label: 'NEW' },
    ACCEPTED: { bg: 'bg-blue-100 dark:bg-blue-950/60', text: 'text-blue-800 dark:text-blue-300 border-blue-300', label: 'ACCEPTED' },
    CONFIRMED: { bg: 'bg-indigo-100 dark:bg-indigo-950/60', text: 'text-indigo-800 dark:text-indigo-300 border-indigo-300', label: 'CONFIRMED' },
    PICKUP_SCHEDULED: { bg: 'bg-sky-100 dark:bg-sky-950/60', text: 'text-sky-800 dark:text-sky-300 border-sky-300', label: 'PICKUP SCHEDULED' },
    IN_PROGRESS: { bg: 'bg-purple-100 dark:bg-purple-950/60', text: 'text-purple-800 dark:text-purple-300 border-purple-300', label: 'IN PROGRESS' },
    READY: { bg: 'bg-teal-100 dark:bg-teal-950/60', text: 'text-teal-800 dark:text-teal-300 border-teal-300', label: 'READY' },
    OUT_FOR_DELIVERY: { bg: 'bg-cyan-100 dark:bg-cyan-950/60', text: 'text-cyan-800 dark:text-cyan-300 border-cyan-300', label: 'OUT FOR DELIVERY' },
    COMPLETED: { bg: 'bg-emerald-100 dark:bg-emerald-950/60', text: 'text-emerald-800 dark:text-emerald-300 border-emerald-300', label: 'COMPLETED' },
    CANCELLED: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400 border-slate-300', label: 'CANCELLED' }
  };

  const style = styles[status] || styles.NEW;

  return (
    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
};
