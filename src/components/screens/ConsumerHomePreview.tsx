import React from 'react';
import { Language, ScreenId } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { 
  Shirt, 
  Scissors, 
  Footprints, 
  Sparkles, 
  Dog, 
  Clock, 
  PlusCircle, 
  Bell, 
  ChevronRight, 
  Search, 
  CheckCircle2, 
  UserCheck, 
  LogOut 
} from 'lucide-react';

interface ConsumerHomePreviewProps {
  email: string;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ConsumerHomePreview: React.FC<ConsumerHomePreviewProps> = ({
  email,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;

  const categories = [
    { title: t.serviceLaundry, icon: Shirt, badge: 'Express 24h', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]' },
    { title: t.serviceTailoring, icon: Scissors, badge: 'Master Tailor', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]' },
    { title: t.serviceShoe, icon: Footprints, badge: 'Cobbler Restores', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]' },
    { title: t.serviceSalon, icon: Sparkles, badge: 'At-Home Salon', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]' },
    { title: t.servicePet, icon: Dog, badge: 'Gentle Grooming', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]' },
  ];

  const recentRequests = [
    { id: 'BUTLER-8942', service: 'Italian Suit Tailoring & Steam', status: 'Valet en route', time: 'Today, 2:30 PM', butler: 'Alfred S.' },
    { id: 'BUTLER-8910', service: 'Equestrian Boot Polishing', status: 'In Restoration', time: 'Yesterday', butler: 'Giles M.' },
  ];

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-slate-800">
        <div className="flex items-center gap-3">
          <EGEC size="sm" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[#0F172A] dark:text-white">
                Mr. Butler Concierge
              </span>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            </div>
            <p className="text-[11px] text-[#64748B] font-mono">
              {email || 'client@mrbutler.com'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-300 relative">
            <Bell className="w-4 h-4 text-[#3B82F6]" />
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] absolute top-1.5 right-1.5" />
          </button>
          <button
            onClick={() => onNavigate(1)}
            title="Sign Out"
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#64748B] hover:text-red-500 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Greeting Banner */}
      <div className="p-5 rounded-xl bg-[#0F172A] text-white border border-[#E2E8F0] dark:border-slate-800 shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-widest">
            Bespoke Household Portal
          </span>
          <span className="text-[10px] bg-[#EFF6FF] text-[#1D4ED8] px-2.5 py-0.5 rounded-full font-bold border border-[#E2E8F0]">
            Consumer Active
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {t.consumerHomeTitle}
        </h1>
        <p className="text-xs text-slate-300 font-normal">
          {t.consumerHomeSub}
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-[#0F172A] dark:text-white">
            Request Personal Services
          </h2>
          <span className="text-xs text-[#1D4ED8] dark:text-blue-400 font-semibold">5 Services Ready</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#3B82F6] transition shadow-xs flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0F172A] dark:text-slate-100">
                      {cat.title}
                    </h3>
                    <span className="text-[10px] text-[#64748B]">{cat.badge}</span>
                  </div>
                </div>
                <PlusCircle className="w-4 h-4 text-[#64748B] group-hover:text-[#3B82F6] transition-colors" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Requests */}
      <div className="space-y-3">
        <h2 className="font-bold text-sm text-[#0F172A] dark:text-white">
          {t.recentOrders}
        </h2>

        <div className="space-y-2">
          {recentRequests.map((req) => (
            <div key={req.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-mono font-bold text-[#1D4ED8] dark:text-blue-400">
                  <span>{req.id}</span>
                  <span className="text-[#64748B]">•</span>
                  <span className="text-[#0F172A] dark:text-slate-300 font-sans">{req.service}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                  <span>Valet: {req.butler}</span>
                  <span>•</span>
                  <span>{req.time}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 border border-[#E2E8F0] dark:border-blue-800 text-[10px] font-bold">
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Return Action */}
      <div className="pt-2 text-center">
        <button
          onClick={() => onNavigate(1)}
          className="text-xs text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] hover:underline"
        >
          Return to Mr. Butler Welcome Portal
        </button>
      </div>

    </div>
  );
};
