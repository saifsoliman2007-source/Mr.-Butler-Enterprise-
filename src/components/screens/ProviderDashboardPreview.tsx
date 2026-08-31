import React from 'react';
import { Language, ScreenId } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { 
  Building2, 
  Store, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  LogOut, 
  Calendar, 
  DollarSign,
  Briefcase
} from 'lucide-react';

interface ProviderDashboardPreviewProps {
  email: string;
  businessName?: string;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ProviderDashboardPreview: React.FC<ProviderDashboardPreviewProps> = ({
  email,
  businessName,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;

  const bookings = [
    { id: 'JOB-901', client: 'Lord Harrington', service: 'Besponsed Tuxedo Fitting', time: '10:00 AM', status: 'Confirmed' },
    { id: 'JOB-902', client: 'Lady Kensington', service: 'Cashmere Dry Clean & Steam', time: '01:30 PM', status: 'In Valet Pickup' },
  ];

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-slate-800">
        <div className="flex items-center gap-3">
          <EGEC size="sm" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="verified" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm text-[#0F172A] dark:text-white">
                {businessName || 'Royal Silk Tailors & Cleaners'}
              </h1>
              <span className="text-[10px] bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 font-mono font-bold px-2 py-0.5 rounded border border-[#E2E8F0] dark:border-blue-800">
                Verified Provider
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-mono">
              {email || 'provider@business.com'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate(1)}
          title="Sign Out"
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#64748B] hover:text-red-500 transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Banner */}
      <div className="p-5 rounded-xl bg-[#0F172A] text-white border border-[#E2E8F0] dark:border-slate-800 shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-widest">
            {t.providerDashTitle}
          </span>
          <span className="text-[10px] bg-[#EFF6FF] text-[#1D4ED8] px-2.5 py-0.5 rounded-full font-bold border border-[#E2E8F0]">
            {t.businessStatus}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Merchant Setup & Service Catalog
        </h2>
        <p className="text-xs text-slate-300 font-normal">
          {t.providerDashSub}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard icon={Calendar} label="Today's Jobs" value="4 Scheduled" color="text-[#3B82F6]" />
        <MetricCard icon={DollarSign} label="Monthly Volume" value="$12,850" color="text-[#10B981]" />
        <MetricCard icon={Users} label="Client Reviews" value="4.98 ★ (120)" color="text-[#3B82F6]" />
        <MetricCard icon={ShieldCheck} label="Butler Rating" value="Tier 1 Gold" color="text-[#1D4ED8]" />
      </div>

      {/* Active Schedule */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#0F172A] dark:text-white">
            {t.activeBookings}
          </h3>
          <span className="text-xs text-[#1D4ED8] dark:text-blue-400 font-semibold">Live Dispatch</span>
        </div>

        <div className="space-y-2">
          {bookings.map((job) => (
            <div key={job.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-mono font-bold text-[#1D4ED8] dark:text-blue-400">
                  <span>{job.id}</span>
                  <span className="text-[#64748B]">•</span>
                  <span className="text-[#0F172A] dark:text-slate-200 font-sans">{job.client}</span>
                </div>
                <p className="text-[11px] text-[#64748B]">{job.service} ({job.time})</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 border border-[#E2E8F0] dark:border-blue-800 text-[10px] font-bold">
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Return to Portal */}
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

const MetricCard: React.FC<{ icon: React.ElementType; label: string; value: string; color: string }> = ({ icon: Icon, label, value, color }) => (
  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-1 shadow-xs">
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-[10px] text-[#64748B] uppercase font-bold">{label}</span>
    </div>
    <p className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-slate-100">{value}</p>
  </div>
);
