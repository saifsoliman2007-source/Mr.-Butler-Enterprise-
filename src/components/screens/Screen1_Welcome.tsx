import React from 'react';
import { Language, Role, ScreenId } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { 
  Shirt, 
  Scissors, 
  Footprints, 
  Sparkles, 
  Dog, 
  User, 
  Briefcase, 
  Globe, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface Screen1Props {
  onSelectRole: (role: Role) => void;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Screen1_Welcome: React.FC<Screen1Props> = ({
  onSelectRole,
  onNavigate,
  lang,
  onLanguageChange,
}) => {
  const t = translations[lang] || translations.en;

  const services = [
    {
      title: t.serviceLaundry,
      desc: t.serviceLaundryDesc,
      icon: Shirt,
      gradient: 'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 border-[#E2E8F0] dark:border-blue-900',
    },
    {
      title: t.serviceTailoring,
      desc: t.serviceTailoringDesc,
      icon: Scissors,
      gradient: 'bg-[#F1F5F9] text-[#0F172A] dark:bg-slate-800 dark:text-slate-200 border-[#E2E8F0] dark:border-slate-700',
    },
    {
      title: t.serviceShoe,
      desc: t.serviceShoeDesc,
      icon: Footprints,
      gradient: 'bg-[#F8FAFC] text-[#475569] dark:bg-slate-800 dark:text-slate-300 border-[#E2E8F0] dark:border-slate-700',
    },
    {
      title: t.serviceSalon,
      desc: t.serviceSalonDesc,
      icon: Sparkles,
      gradient: 'bg-[#EFF6FF] text-[#3B82F6] dark:bg-blue-950 dark:text-blue-300 border-[#E2E8F0] dark:border-blue-900',
    },
    {
      title: t.servicePet,
      desc: t.servicePetDesc,
      icon: Dog,
      gradient: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    },
  ];

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header & Language Selector */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2.5">
          <EGEC size="sm" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />
          <div>
            <h2 className="font-bold text-base text-[#0F172A] dark:text-white leading-tight">
              Mr. Butler
            </h2>
            <p className="text-[10px] text-[#1D4ED8] dark:text-blue-400 font-semibold tracking-wider uppercase">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Language selector in-screen header */}
        <div className="relative">
          <select
            value={lang}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          >
            <option value="en">English</option>
            <option value="ar">العربية (Arabic)</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
          </select>
          <Globe className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Main Hero & Service Showcase */}
      <div className="space-y-6 my-auto">
        
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-amber-100 tracking-tight">
            {t.welcomeTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.welcomeSubtitle}
          </p>
        </div>

        {/* 5 Core Services Showcase Grid / Scroll */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
            Bespoke Concierge Services
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`p-3 rounded-2xl border bg-gradient-to-br ${item.gradient} transition-all duration-300 hover:scale-[1.01] flex items-start gap-3 shadow-xs`}
                >
                  <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 shadow-xs shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-bold text-xs text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Role Selector Actions */}
        <div className="pt-2 space-y-3 max-w-md mx-auto">
          <p className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
            Please choose how you wish to proceed:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Continue as Consumer Button */}
            <button
              onClick={() => {
                onSelectRole('consumer');
                onNavigate(2); // Registration Method
              }}
              className="p-4 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-md font-semibold text-sm transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer active:scale-98 border border-[#0F172A]"
            >
              <div className="p-2 rounded-full bg-white/10 text-[#3B82F6] group-hover:scale-110 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="font-bold">{t.continueAsConsumer}</div>
                <div className="text-[10px] text-slate-300 font-normal">For Household Concierge</div>
              </div>
            </button>

            {/* Continue as Service Provider Button */}
            <button
              onClick={() => {
                onSelectRole('provider');
                onNavigate(6); // Service Provider Registration directly
              }}
              className="p-4 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] dark:bg-slate-900 dark:text-white border border-[#E2E8F0] dark:border-slate-800 shadow-xs font-semibold text-sm transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer active:scale-98"
            >
              <div className="p-2 rounded-full bg-[#F1F5F9] dark:bg-slate-800 text-[#0F172A] dark:text-slate-200 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="font-bold">{t.continueAsProvider}</div>
                <div className="text-[10px] text-[#64748B] dark:text-slate-400 font-normal">For Artisans & Businesses</div>
              </div>
            </button>

          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => onNavigate(9)} // Sign In
              className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline"
            >
              {t.alreadyHaveAccount} <span className="font-bold">{t.signIn}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Footer Links */}
      <footer className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
        <div className="flex items-center gap-3">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">
            {t.privacyPolicy}
          </a>
          <span>•</span>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">
            {t.termsConditions}
          </a>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>Mr. Butler Security Certified</span>
        </div>
      </footer>

    </div>
  );
};
