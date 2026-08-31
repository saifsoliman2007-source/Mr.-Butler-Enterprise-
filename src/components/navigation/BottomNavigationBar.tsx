import React from 'react';
import { ScreenId, Language } from '../../types';
import { RELEASE_1_GLOBAL_NAV, getLocalizedNavLabel, isSectionActive } from './NavHierarchy';

interface BottomNavigationBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

/**
 * Global Bottom Navigation Bar (Requirement 11)
 * Uses the 4 Release 1 consumer pillars:
 * 1. HOME
 * 2. CONCIERGE
 * 3. ORDERS
 * 4. FOUNDATION
 */
export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  currentScreen,
  onNavigate,
  lang
}) => {
  const isRTL = lang === 'ar';

  return (
    <nav
      role="navigation"
      aria-label={getLocalizedNavLabel('navMenu', lang)}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="md:hidden sticky bottom-0 z-30 w-full bg-[#F8F9FF]/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-t border-[#D9E3F6] dark:border-slate-800 transition-colors shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)'
      }}
    >
      <div className="flex items-center justify-around px-2 pt-1.5 pb-1 max-w-lg mx-auto">
        {RELEASE_1_GLOBAL_NAV.map((section) => {
          const SectionIcon = section.icon;
          const isActive = isSectionActive(section, currentScreen);
          const localizedTitle = getLocalizedNavLabel(section.labelKey, lang);

          return (
            <button
              key={String(section.id)}
              onClick={() => onNavigate(section.id)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={localizedTitle}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00444D] cursor-pointer ${
                isActive
                  ? 'text-[#00444D] dark:text-[#ABEDFA]'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {/* Active Indicator Bar / Pill */}
              <div className="relative">
                <div
                  className={`p-1.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00444D] text-white dark:bg-[#00444D] dark:text-[#FFE088] shadow-xs scale-105'
                      : 'group-hover:bg-slate-200/60 dark:group-hover:bg-slate-800'
                  }`}
                >
                  <SectionIcon className="w-4 h-4" />
                </div>

                {/* Badge indicator if any */}
                {section.badge && (
                  <span className="absolute -top-1 -right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCA730] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCA730]"></span>
                  </span>
                )}
              </div>

              {/* Localized Label */}
              <span
                className={`text-[10px] mt-1 tracking-tight font-medium truncate max-w-[70px] text-center ${
                  isActive
                    ? 'font-bold text-[#00444D] dark:text-[#ABEDFA]'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {localizedTitle}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
