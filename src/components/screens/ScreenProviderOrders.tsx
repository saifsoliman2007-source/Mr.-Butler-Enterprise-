import React, { useState } from 'react';
import { Language, ScreenId, ProviderOrder, ProviderCategory, OrderStatus } from '../../types';
import { translations } from '../../data/translations';
import { OrderStatusBadge } from './ScreenProviderDashboard';
import { 
  Package, 
  Search, 
  Filter, 
  Clock, 
  MapPin, 
  Truck, 
  Check, 
  X, 
  Eye, 
  MessageSquare, 
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Camera,
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface ScreenProviderOrdersProps {
  orders: ProviderOrder[];
  onNavigate: (screen: ScreenId) => void;
  onSelectOrder: (order: ProviderOrder) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  lang: Language;
}

type FilterTab = 'ALL' | 'NEW' | 'ACTIVE' | 'READY' | 'COMPLETED';

export const ScreenProviderOrders: React.FC<ScreenProviderOrdersProps> = ({
  orders,
  onNavigate,
  onSelectOrder,
  onUpdateOrderStatus,
  lang,
}) => {
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';

  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Tab Filtering logic
  const filteredOrders = orders.filter((order) => {
    // Tab match
    if (activeTab === 'NEW' && order.status !== 'NEW') return false;
    if (activeTab === 'ACTIVE' && !['ACCEPTED', 'CONFIRMED', 'PICKUP_SCHEDULED', 'IN_PROGRESS'].includes(order.status)) return false;
    if (activeTab === 'READY' && !['READY', 'OUT_FOR_DELIVERY'].includes(order.status)) return false;
    if (activeTab === 'COMPLETED' && !['COMPLETED', 'CANCELLED'].includes(order.status)) return false;

    // Category match
    if (selectedCategory !== 'ALL' && order.category !== selectedCategory) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNumber = order.orderNumber.toLowerCase().includes(q);
      const matchCustomer = order.customerName.toLowerCase().includes(q);
      const matchDistrict = order.customerDistrict.toLowerCase().includes(q);
      const matchService = order.serviceTitle.toLowerCase().includes(q);
      if (!matchNumber && !matchCustomer && !matchDistrict && !matchService) return false;
    }

    return true;
  });

  const newCount = orders.filter(o => o.status === 'NEW').length;
  const activeCount = orders.filter(o => ['ACCEPTED', 'CONFIRMED', 'PICKUP_SCHEDULED', 'IN_PROGRESS'].includes(o.status)).length;
  const readyCount = orders.filter(o => ['READY', 'OUT_FOR_DELIVERY'].includes(o.status)).length;
  const completedCount = orders.filter(o => ['COMPLETED', 'CANCELLED'].includes(o.status)).length;

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#070D18] text-[#1E293B] dark:text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E3F6] dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('provider_dashboard')}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
          </button>
          <div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#00444D] dark:text-[#FFE088]">
              Order Management & Fulfillment
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage incoming VIP bookings, valet pickup dispatches & active artisan services
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-[#00444D]/5 dark:bg-[#FFE088]/10 text-[#00444D] dark:text-[#FFE088] border border-[#00444D]/15 dark:border-[#FFE088]/20">
            {orders.length} Total Orders Recorded
          </span>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'ALL'
              ? 'bg-[#00444D] text-white dark:bg-[#FFE088] dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          All Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('NEW')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'NEW'
              ? 'bg-[#00444D] text-white dark:bg-[#FFE088] dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <span>Incoming / New</span>
          {newCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-mono">
              {newCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('ACTIVE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'ACTIVE'
              ? 'bg-[#00444D] text-white dark:bg-[#FFE088] dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <span>Active In-Progress</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
            {activeCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('READY')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'READY'
              ? 'bg-[#00444D] text-white dark:bg-[#FFE088] dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <span>Ready & Out for Delivery</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
            {readyCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('COMPLETED')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'COMPLETED'
              ? 'bg-[#00444D] text-white dark:bg-[#FFE088] dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          Completed & History ({completedCount})
        </button>
      </div>

      {/* Search & Category Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, client name, or district..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm outline-none focus:border-[#00444D]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium outline-none focus:border-[#00444D] w-full sm:w-auto"
          >
            <option value="ALL">All Categories</option>
            <option value="Laundry & Dry Cleaning">Laundry & Dry Cleaning</option>
            <option value="Tailoring">Tailoring & Alterations</option>
            <option value="Shoe Fix & Repair">Shoe Fix & Repair</option>
            <option value="Beauty Salon">Beauty Salon & Spa</option>
            <option value="Pet Care">Pet Care & Grooming</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <Package className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-serif font-bold text-slate-700 dark:text-slate-200">No Orders Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No orders matched your current tab filter or search criteria. Try switching tabs or clearing filters.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            return (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#00444D]/50 transition shadow-xs space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono font-bold text-xs text-[#00444D] dark:text-[#FFE088] bg-[#00444D]/5 dark:bg-[#FFE088]/10 px-2.5 py-1 rounded-lg border border-[#00444D]/15 dark:border-[#FFE088]/20">
                      {order.orderNumber}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {order.customerName}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {order.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <OrderStatusBadge status={order.status} />
                    <span className="font-mono font-bold text-base text-[#00444D] dark:text-[#FFE088]">
                      ${order.estimatedPrice}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Service Domain</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                      {order.serviceTitle}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Itemized Breakdown</span>
                    <div className="mt-0.5 space-y-0.5">
                      {order.items.map((item) => (
                        <div key={item.id} className="text-slate-600 dark:text-slate-300 flex justify-between">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-mono text-slate-400">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Client Location & Transit</span>
                    <p className="text-slate-700 dark:text-slate-300 flex items-center gap-1 font-medium mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{order.customerDistrict}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Truck className="w-3 h-3 text-slate-400" />
                      <span>{order.deliveryRequirement}</span>
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Requested Schedule</span>
                    <p className="text-slate-700 dark:text-slate-300 flex items-center gap-1 font-medium mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{order.requestedDateTime}</span>
                    </p>
                    {order.courierStatus && (
                      <span className="inline-block text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded mt-1">
                        Courier: {order.courierStatus}
                      </span>
                    )}
                  </div>
                </div>

                {/* Customer Notes / Photos Strip */}
                {(order.customerNotes || (order.uploadedImages && order.uploadedImages.length > 0)) && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    {order.customerNotes && (
                      <p className="text-slate-600 dark:text-slate-300 italic">
                        <span className="font-semibold text-slate-700 dark:text-slate-200 not-italic">Client Note: </span>
                        "{order.customerNotes}"
                      </p>
                    )}
                    {order.uploadedImages && order.uploadedImages.length > 0 && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Camera className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[11px] text-slate-500 font-medium">{order.uploadedImages.length} Inspection Photo(s) Attached</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 flex-wrap">
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
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-semibold transition cursor-pointer"
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
                        <span>Begin Service / In-Progress</span>
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
                        <span>Dispatch Valet Courier</span>
                      </button>
                    )}

                    {order.status === 'OUT_FOR_DELIVERY' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'COMPLETED')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Delivered & Completed</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectOrder(order);
                        onNavigate('provider_messages');
                      }}
                      title="Open Customer Chat"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#00444D] dark:hover:text-[#FFE088] transition cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        onSelectOrder(order);
                        onNavigate('provider_order_details');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Full Order Breakdown</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
