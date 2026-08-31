import React, { useEffect } from 'react';
import { Language, ScreenId } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Screen0Props {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const Screen0_Splash: React.FC<Screen0Props> = ({ onNavigate, lang }) => {
  const t = translations[lang] || translations.en;

  // Option for quick auto-advance or interactive tap
  useEffect(() => {
    const timer = setTimeout(() => {
      // Gentle auto-advance after 4.5 seconds if user hasn't clicked
      onNavigate(1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div 
      onClick={() => onNavigate(1)}
      className="relative min-h-[580px] h-full w-full bg-[#0F172A] text-slate-100 flex flex-col items-center justify-between p-6 sm:p-10 cursor-pointer overflow-hidden transition-all select-none"
    >
      {/* Background Subtle Blue Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="pt-4 flex items-center gap-2 text-blue-300 text-xs font-mono tracking-widest uppercase">
        <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
        <span>Mr. Butler Enterprise Foundation</span>
      </div>

      {/* Center Logo & Emblem (EGEC showcasing EBIA) */}
      <div className="flex flex-col items-center text-center space-y-6 my-auto max-w-sm px-4">
        
        {/* Luxury Crest Frame with EGEC */}
        <EGEC 
          size="hero" 
          shape="rounded-full" 
          withAura={true} 
          withSheen={true} 
          withBeacon={true} 
          beaconStatus="verified" 
        />

        {/* Branding & Motto */}
        <div className="space-y-2">
          <h1 className="font-bold text-3xl sm:text-4xl tracking-tight text-white">
            Mr. Butler
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#3B82F6] uppercase">
            {t.motto}
          </p>
          <p className="text-xs text-slate-300 font-normal leading-relaxed pt-1">
            {t.mottoSub}
          </p>
        </div>

      </div>

      {/* Footer Callout */}
      <div className="pb-4 w-full flex flex-col items-center space-y-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(1);
          }}
          className="w-full max-w-xs py-3.5 px-6 rounded-xl bg-[#FFFFFF] text-[#0F172A] font-bold text-sm shadow-xl hover:bg-[#F8FAFC] transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
        >
          <span>Enter Experience</span>
          <ArrowRight className="w-4 h-4 text-[#0F172A] group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[10px] text-slate-400 font-mono tracking-wider">
          Tap anywhere or wait to proceed
        </p>
      </div>

    </div>
  );
};
