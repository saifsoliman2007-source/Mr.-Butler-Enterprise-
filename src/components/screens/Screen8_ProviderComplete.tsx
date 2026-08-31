import React from 'react';
import { Language, ScreenId } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { CheckCircle2, ShieldCheck, Briefcase, ArrowRight, LayoutDashboard, Building } from 'lucide-react';

interface Screen8Props {
  email: string;
  businessName?: string;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const Screen8_ProviderComplete: React.FC<Screen8Props> = ({
  email,
  businessName,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      <div />

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto space-y-6 my-auto text-center flex flex-col items-center">
        
        {/* Emblem Presentation */}
        <div className="relative">
          <EGEC size="lg" shape="rounded-2xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="verified" />
        </div>

        {/* Title & Message */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1D4ED8] dark:text-blue-400">
            Service Provider Registered
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            {t.providerRegSuccessTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
            {t.providerRegSuccessDesc}
          </p>
        </div>

        {/* Account Details Card */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-xs text-left space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9] dark:border-slate-800">
            <span className="text-[#64748B]">Business Name:</span>
            <span className="font-bold text-[#1D4ED8] dark:text-blue-300">{businessName || 'Royal Silk Tailors & Cleaners'}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9] dark:border-slate-800">
            <span className="text-[#64748B]">Verified Email:</span>
            <span className="font-mono font-semibold text-[#0F172A] dark:text-slate-200">{email || 'provider@business.com'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#64748B]">Provider Status:</span>
            <span className="text-[#10B981] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Merchant</span>
            </span>
          </div>
        </div>

        {/* Action Button: Navigate to Service Provider Dashboard Setup */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate('provider_dashboard')}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2.5 cursor-pointer min-h-[48px] group active:scale-98"
          >
            <LayoutDashboard className="w-4 h-4 text-[#3B82F6]" />
            <span>{t.continueToDashboard}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-[#64748B]">
        Mr. Butler Service Provider Merchant Portal
      </div>

    </div>
  );
};
