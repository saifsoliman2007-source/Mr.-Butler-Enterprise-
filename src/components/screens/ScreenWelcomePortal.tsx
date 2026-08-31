import React from 'react';
import { ScreenId, Language } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface ScreenWelcomePortalProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const ScreenWelcomePortal: React.FC<ScreenWelcomePortalProps> = ({ 
  onNavigate, 
  lang,
  onLanguageChange 
}) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-[#EFF4FF] via-[#E6EEFF] to-[#B0EDF4] dark:from-[#0F172A] dark:via-[#132238] dark:to-[#0D5D68] text-[#121C2A] dark:text-white flex flex-col justify-between relative overflow-hidden transition-all select-none flex-1">
      
      {/* Persistent Recurring App Header */}
      <RecurringAppHeader 
        currentScreen="welcome" 
        onNavigate={onNavigate} 
        lang={lang} 
        onLanguageChange={onLanguageChange}
      />

      {/* Background Ambient Aura Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-white dark:bg-[#3B82F6]/20 rounded-full blur-[90px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-[#B0EDF4] dark:bg-[#00444D]/40 rounded-full blur-[110px]" />
      </div>

      {/* Top Header Identity Tag with Safe Inset Awareness */}
      <div className="relative z-10 w-full flex items-center justify-between px-4 pt-2">
        <div className="flex items-center gap-2 text-[#00444D] dark:text-[#ABEDFA] text-xs font-semibold tracking-wider uppercase bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D9E3F6] dark:border-slate-700 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#CCA730]" />
          <span>Imperial Valet & Concierge</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
          welcome_screen_material_update.html
        </span>
      </div>

      {/* Main Center Branding Presentation */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto max-w-md mx-auto w-full py-6 space-y-6">
        
        {/* Official Master Logo Presentation in EGEC */}
        <div className="relative transform hover:scale-105 transition-transform duration-500">
          <EGEC 
            size="hero" 
            shape="rounded-full" 
            withAura={true} 
            withSheen={true} 
            withBeacon={true} 
            beaconStatus="verified" 
          />
        </div>

        {/* Typography using Serif Scale & Tokens */}
        <div className="space-y-2.5">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#00444D] dark:text-white drop-shadow-xs">
            Mr. Butler
          </h1>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#3F484A] dark:text-[#ABEDFA] opacity-90 max-w-xs sm:max-w-md mx-auto">
            Established For Your Comfort
          </p>

          {/* Subtle Decorative Gold Divider with Spa Ornament */}
          <div className="flex items-center justify-center pt-2 gap-3">
            <div className="h-px w-14 bg-[#CCA730]/50" />
            <span className="text-[#CCA730] text-xs font-serif">❖</span>
            <div className="h-px w-14 bg-[#CCA730]/50" />
          </div>
        </div>

        {/* Sub-description with Baseline Readability Constraint (65ch) */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-sm sm:max-w-md leading-relaxed">
          White-glove dry cleaning, bespoke tailoring, shoe restoration, beauty suites, and pet concierge at your beck and call.
        </p>

      </div>

      {/* Bottom Action Area (Docked Action for Onboarding with Safe Area Baseline) */}
      <div className="relative z-20 w-full max-w-md mx-auto pt-4 flex flex-col items-center gap-3">
        <button
          onClick={() => onNavigate('create_account')}
          className="w-full min-h-[48px] bg-[#00444D] hover:bg-[#0D5D68] text-white font-semibold text-base py-4 px-6 rounded-2xl shadow-[0_10px_30px_rgba(0,68,77,0.25)] hover:shadow-[0_15px_40px_rgba(0,68,77,0.35)] transition-all duration-300 hover:-translate-y-0.5 border-b-2 border-[#CCA730]/60 flex items-center justify-center gap-3 group active:scale-[0.99] cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[#FFE088]" />
        </button>

        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <button 
            onClick={() => onNavigate(9)}
            className="hover:text-[#00444D] dark:hover:text-white font-medium transition-colors cursor-pointer py-1"
          >
            Existing Member? <span className="font-bold text-[#00444D] dark:text-[#ABEDFA] underline underline-offset-2">Sign In</span>
          </button>
          <span>•</span>
          <button 
            onClick={() => onNavigate('our_services')}
            className="hover:text-[#00444D] dark:hover:text-white font-medium transition-colors cursor-pointer py-1"
          >
            Explore Services
          </button>
        </div>
      </div>

    </div>
  );
};

