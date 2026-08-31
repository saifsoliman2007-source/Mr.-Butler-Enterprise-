import React from 'react';
import { Language, ScreenId } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Home } from 'lucide-react';

interface Screen5Props {
  email: string;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const Screen5_ConsumerComplete: React.FC<Screen5Props> = ({
  email,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      <div />

      {/* Main Success Container */}
      <div className="max-w-md w-full mx-auto space-y-6 my-auto text-center flex flex-col items-center">
        
        {/* Animated Emblem with Verification Beacon */}
        <div className="relative">
          <EGEC size="lg" shape="rounded-2xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="verified" />
        </div>

        {/* Title & Message */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1D4ED8] dark:text-blue-400">
            Registration Verified
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            {t.consumerRegSuccessTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
            {t.consumerRegSuccessDesc}
          </p>
        </div>

        {/* Account Details Card */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-xs text-left space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9] dark:border-slate-800">
            <span className="text-[#64748B]">Account Type:</span>
            <span className="font-bold text-[#1D4ED8] dark:text-blue-300">Mr. Butler Consumer</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9] dark:border-slate-800">
            <span className="text-[#64748B]">Verified Email:</span>
            <span className="font-mono font-semibold text-[#0F172A] dark:text-slate-200">{email || 'consumer@mrbutler.com'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#64748B]">Security Standard:</span>
            <span className="text-[#10B981] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MEDS Enterprise Level 1</span>
            </span>
          </div>
        </div>

        {/* Action Button: Navigate to Consumer Home */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate('consumer_home')}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2.5 cursor-pointer min-h-[48px] group active:scale-98"
          >
            <Home className="w-4 h-4 text-[#3B82F6]" />
            <span>{t.continueToHome}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-[#64748B]">
        Mr. Butler Enterprise Concierge Platform
      </div>

    </div>
  );
};
