import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { translations } from '../../data/translations';
import { getLocalizedNavLabel } from '../navigation/NavHierarchy';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Truck, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Calendar,
  DollarSign,
  HardDrive
} from 'lucide-react';

interface ScreenOrdersProps {
  subSection?: 'overview' | 'active' | 'previous' | 'details';
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const ScreenOrders: React.FC<ScreenOrdersProps> = ({
  subSection = 'overview',
  onNavigate,
  lang,
  onLanguageChange
}) => {
  const isRTL = lang === 'ar';
  const t = translations[lang] || translations.en;
  const [activeTab, setActiveTab] = useState<'active' | 'previous' | 'details'>(
    subSection === 'active' 
      ? 'active' 
      : subSection === 'previous' 
        ? 'previous' 
        : subSection === 'details' 
          ? 'details' 
          : 'active'
  );

  const [selectedOrder, setSelectedOrder] = useState<string>('ORD-9842');

  const activeOrders = [
    {
      id: 'ORD-9842',
      service: 'Dry Cleaning & Laundry',
      items: '6 items (3 Dress Shirts, 2 Silk Ties, 1 Tuxedo Jacket)',
      status: 'Courier In Transit',
      eta: 'Today at 5:30 PM',
      valet: 'James Harrison (Master Valet)',
      step: 3, // 1: Picked Up, 2: In Eco Cleaning, 3: Quality Passed, 4: Out for Delivery
      total: '$84.50'
    },
    {
      id: 'ORD-9840',
      service: 'Shoe Restoration & Cobbler Fix',
      items: '1 pair Oxford Leather Shoes (Resole + Saphir Shine)',
      status: 'Artisan Workshop Fitting',
      eta: 'Tomorrow at 11:00 AM',
      valet: 'Marco Rossi',
      step: 2,
      total: '$120.00'
    }
  ];

  const previousOrders = [
    {
      id: 'ORD-8921',
      date: 'Aug 22, 2026',
      service: 'Bespoke Suit Alteration & Hemming',
      items: '2 Custom Suits',
      total: '$195.00',
      status: 'Delivered & Inspected'
    },
    {
      id: 'ORD-8734',
      date: 'Aug 14, 2026',
      service: 'Pet Grooming & Luxury Bath',
      items: '1 Golden Retriever (Full Spa)',
      total: '$110.00',
      status: 'Delivered & Inspected'
    },
    {
      id: 'ORD-8512',
      date: 'Aug 02, 2026',
      service: 'Express Wash & Fold',
      items: '12 kg Linen & Household',
      total: '$65.00',
      status: 'Delivered & Inspected'
    }
  ];

  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="w-full flex-1 flex flex-col">
      <RecurringAppHeader 
        currentScreen="orders" 
        onNavigate={onNavigate} 
        lang={lang} 
        onLanguageChange={onLanguageChange}
      />
      <div 
        dir={isRTL ? 'rtl' : 'ltr'}
        className="min-h-full w-full bg-[#EFF4FF] dark:bg-[#0B1120] text-slate-900 dark:text-white p-4 sm:p-6 lg:p-8 space-y-6 select-none flex-1"
      >
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#00444D] via-[#0D5D68] to-[#002D33] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE088]/20 border border-[#FFE088]/30 text-[#FFE088] text-xs font-semibold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navOrders', lang)}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            Concierge Orders & Valet Tracking
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-xl font-light">
            Real-time status tracking for dry cleaning, bespoke tailoring, shoe care, and salon bookings.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/15 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'active'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navActiveOrders', lang)} ({activeOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('previous')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'previous'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navPreviousOrders', lang)} ({previousOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'details'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navOrderDetails', lang)}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Active Orders */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[#00444D] dark:text-[#ABEDFA]">
              Active Deliveries in Flight
            </h2>
            <span className="text-xs text-slate-500 font-mono">Live GPS Sync</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#00444D] dark:text-[#ABEDFA] bg-[#E6EEFF] dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      {order.id}
                    </span>
                    <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white mt-1.5">
                      {order.service}
                    </h3>
                  </div>
                  <span className="text-sm font-extrabold text-[#00444D] dark:text-[#FFE088]">
                    {order.total}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {order.items}
                </p>

                {/* Progress Steps */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#00444D] dark:text-[#ABEDFA] flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 animate-pulse" />
                      {order.status}
                    </span>
                    <span className="text-[#CCA730]">ETA: {order.eta}</span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-[#00444D] dark:bg-[#ABEDFA] h-full transition-all duration-500 rounded-full"
                      style={{ width: `${(order.step / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500">
                    Valet: <strong className="text-slate-700 dark:text-slate-200">{order.valet}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOrder(order.id);
                      setActiveTab('details');
                    }}
                    className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Itemized Details</span>
                    <ChevronIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Previous Orders */}
      {activeTab === 'previous' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-[#00444D] dark:text-[#ABEDFA]">
            Completed Valet Records & Receipts
          </h2>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {previousOrders.map((order) => (
              <div 
                key={order.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-3 rounded-2xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">{order.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                      {order.status}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                    {order.service}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {order.items} • {order.date}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{order.total}</span>
                  <button
                    onClick={() => {
                      setSelectedOrder(order.id);
                      setActiveTab('details');
                    }}
                    className="min-h-[40px] px-3.5 py-1.5 rounded-xl border border-[#D9E3F6] dark:border-slate-700 text-xs font-semibold text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E6EEFF] dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    View Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Order Details */}
      {activeTab === 'details' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400">OFFICIAL MANIFEST</span>
              <h2 className="font-serif text-xl font-bold text-[#00444D] dark:text-[#ABEDFA]">
                Order {selectedOrder}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
              In Delivery
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Service Category</span>
              <span className="font-semibold text-slate-900 dark:text-white">Dry Cleaning & Laundry Protocol</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Pickup Address</span>
              <span className="font-semibold text-slate-900 dark:text-white">Penthouse 42B, Imperial Towers</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Garment Breakdown</span>
              <span className="font-semibold text-slate-900 dark:text-white">3 Egyptian Cotton Shirts, 2 Silk Ties, 1 Tuxedo</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Special Treatment</span>
              <span className="font-semibold text-slate-900 dark:text-white">Non-Toxic Perc-Free Hydrocarbon Cleaning</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Valet Courier</span>
              <span className="font-semibold text-[#00444D] dark:text-[#ABEDFA]">James Harrison (#VH-402)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Total Billed</span>
            <span className="text-lg font-extrabold text-[#00444D] dark:text-[#FFE088]">$84.50</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate('google_drive')}
              className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-[#00444D] hover:bg-[#0D5D68] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <HardDrive className="w-4 h-4 text-[#FFE088]" />
              <span>Archive to Google Drive</span>
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className="min-h-[44px] py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Return to Orders
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
