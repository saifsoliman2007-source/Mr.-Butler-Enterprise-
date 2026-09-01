import React, { useState, useRef, useEffect } from 'react';
import { ScreenId, Language } from '../../types';
import { EGEC } from '../EGEC';
import { 
  RELEASE_1_GLOBAL_NAV, 
  NavSection, 
  NavChildItem, 
  getLocalizedNavLabel, 
  isSectionActive 
} from './NavHierarchy';
import { LanguageSelector } from '../forms/LanguageSelector';
import { useNotifications } from '../../context/NotificationContext';
import { 
  Menu, 
  Truck, 
  User, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Bell
} from 'lucide-react';

interface GlobalShellHeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
  onOpenDrawer: () => void;
  onOpenAI?: () => void;
  showStatusBar?: boolean;
  statusMessage?: string;
  title?: string;
}

export const GlobalShellHeader: React.FC<GlobalShellHeaderProps> = ({
  currentScreen,
  onNavigate,
  lang,
  onLanguageChange,
  onOpenDrawer,
  onOpenAI,
  showStatusBar = true,
  statusMessage,
  title
}) => {
  const isRTL = lang === 'ar';
  const { unreadCount, openNotificationCenter } = useNotifications();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for dropdowns
  const handleDropdownKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Escape') {
      setActiveDropdown(null);
    } else if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveDropdown(sectionId);
    }
  };

  const appName = title || getLocalizedNavLabel('appName', lang);
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Top Status Notification Banner - Continuous Roller Marquee Tape */}
      {showStatusBar && (
        <aside 
          aria-label="Live Dispatch Status Roller Banner" 
          dir={isRTL ? 'rtl' : 'ltr'}
          className="w-full bg-[#B0EDF4] dark:bg-[#0D5D68] text-[#00444D] dark:text-[#ABEDFA] py-0.5 sm:py-1 px-2 text-[10px] sm:text-[11px] font-medium border-b border-[#CCA730]/40 transition-colors shadow-2xs select-none overflow-hidden relative"
        >
          <div className="w-full overflow-hidden flex items-center">
            {/* Live Status Badge */}
            <div className="shrink-0 z-10 bg-[#00444D] dark:bg-[#062c31] text-[#FFE088] px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-2xs mr-1.5 rtl:mr-0 rtl:ml-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping inline-block" />
              <Truck className="w-2.5 h-2.5 flex-shrink-0 text-[#FFE088]" />
              <span>{isRTL ? "مباشر" : "LIVE"}</span>
            </div>

            {/* Continuous Marquee Roller Stream */}
            <div className="overflow-hidden whitespace-nowrap flex-1 flex">
              <div className={isRTL ? "animate-roller-ticker-rtl" : "animate-roller-ticker"}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                  <div key={idx} className="flex items-center gap-4 sm:gap-6 px-3 sm:px-4">
                    <span 
                      className="font-serif italic tracking-wide text-[10px] sm:text-[11px] font-medium"
                      style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}
                    >
                      {isRTL ? "تأسست لراحتكم — Established For Your Comfort" : "Established For Your Comfort"}
                    </span>
                    <span className="text-[#CCA730] font-bold">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Persistent Application Shell Header */}
      <header 
        dir={isRTL ? 'rtl' : 'ltr'}
        className="sticky top-0 z-40 bg-[#F8F9FF]/95 dark:bg-[#0B132B]/95 backdrop-blur-md border-b border-[#D9E3F6] dark:border-slate-800 border-t-2 border-t-[#CCA730]/70 px-1.5 sm:px-2.5 md:px-4 py-1 sm:py-1.5 flex items-center justify-between transition-colors shadow-2xs select-none gap-1 sm:gap-1.5"
      >
        {/* Left Lockup: Hamburger Menu (compact size, aligned with grid) + Mr. Butler Logo in flex-row */}
        <div className="flex flex-row items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={onOpenDrawer}
            aria-label={getLocalizedNavLabel('navMenu', lang)}
            title={getLocalizedNavLabel('navMenu', lang)}
            className="w-7 h-7 sm:w-7.5 sm:h-7.5 min-w-[28px] min-h-[28px] rounded-md text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E6EEFF] dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-1.5 focus:ring-[#00444D] flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
          >
            <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Refined Luxury Brand Lockup: Logo positioned elegantly beside menu in flex-row with consistent spacing */}
          <button 
            onClick={() => onNavigate('welcome')}
            className="flex flex-row items-center gap-1 sm:gap-1.5 group text-left rtl:text-right focus:outline-none cursor-pointer shrink-0"
            aria-label="Mr. Butler Home"
          >
            <div className="relative shrink-0 flex items-center scale-90 sm:scale-100">
              <EGEC 
                size="xs" 
                shape="rounded-full" 
                withAura={false} 
                withSheen={true} 
                withBeacon={true} 
                beaconStatus="verified" 
              />
            </div>
            
            <div className="flex flex-col justify-center shrink-0">
              <div className="flex flex-row items-center gap-1">
                <span 
                  className="font-serif text-xs sm:text-sm md:text-base font-black tracking-tight text-[#00444D] dark:text-[#FFE088] group-hover:text-[#0D5D68] dark:group-hover:text-white transition-colors whitespace-nowrap drop-shadow-2xs leading-none"
                  style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}
                >
                  {appName}
                </span>
                <span className="hidden xl:inline-flex text-[7px] font-mono font-bold uppercase tracking-wider bg-[#FFE088] text-[#241A00] px-1 py-0.2 rounded border border-[#CCA730]/40">
                  Valet
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Desktop Persistent Top Navigation Bar with Mega-menus */}
        <nav 
          ref={dropdownRef}
          role="navigation"
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-0.5 bg-[#E6EEFF] dark:bg-slate-800/90 p-0.5 rounded-full border border-[#D9E3F6] dark:border-slate-700 shadow-inner mx-1"
        >
          {RELEASE_1_GLOBAL_NAV.map((section) => {
            const SectionIcon = section.icon;
            const hasChildren = Boolean(section.children && section.children.length > 0);
            const isActive = isSectionActive(section, currentScreen);
            const isMenuOpen = activeDropdown === String(section.id);
            const localizedLabel = getLocalizedNavLabel(section.labelKey, lang);

            return (
              <div 
                key={String(section.id)} 
                className="relative"
                onMouseEnter={() => hasChildren && setActiveDropdown(String(section.id))}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setActiveDropdown(isMenuOpen ? null : String(section.id));
                    }
                    onNavigate(section.id);
                  }}
                  onKeyDown={(e) => hasChildren && handleDropdownKeyDown(e, String(section.id))}
                  aria-expanded={hasChildren ? isMenuOpen : undefined}
                  aria-haspopup={hasChildren ? 'menu' : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-full transition-all flex items-center gap-1 focus:outline-none focus-visible:ring-1.5 focus-visible:ring-[#00444D] cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#00444D] text-white shadow-2xs'
                      : 'text-[#00444D] dark:text-slate-200 hover:bg-white/70 dark:hover:bg-slate-700'
                  }`}
                >
                  <SectionIcon className="w-3 h-3" />
                  <span>{localizedLabel}</span>
                  {hasChildren && (
                    <ChevronDown className={`w-2.5 h-2.5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Dropdown Menu for desktop */}
                {hasChildren && isMenuOpen && (
                  <div 
                    role="menu"
                    aria-label={`${localizedLabel} Submenu`}
                    className={`absolute top-full mt-1 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-[#D9E3F6] dark:border-slate-800 p-1 z-50 animate-fadeIn ${
                      isRTL ? 'right-0' : 'left-0'
                    }`}
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 px-2 py-0.5 border-b border-slate-100 dark:border-slate-800 mb-0.5">
                      {localizedLabel}
                    </div>

                    <div className="space-y-0.5">
                      {section.children?.map((child: NavChildItem) => {
                        const ChildIcon = child.icon;
                        const isChildActive = currentScreen === child.id;

                        return (
                          <button
                            key={String(child.id)}
                            role="menuitem"
                            onClick={() => {
                              onNavigate(child.id);
                              setActiveDropdown(null);
                            }}
                            className={`w-full text-left flex items-center justify-between p-1.2 rounded-md text-[11px] transition-all cursor-pointer ${
                              isChildActive
                                ? 'bg-[#00444D] text-white font-bold'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-[#EFF4FF] dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <ChildIcon className={`w-3 h-3 flex-shrink-0 ${isChildActive ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`} />
                              <span className="truncate">
                                {getLocalizedNavLabel(child.labelKey, lang)}
                              </span>
                            </div>
                            {child.badge && (
                              <span className={`text-[8px] px-1 py-0.2 rounded font-mono ${
                                isChildActive 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-[#B0EDF4] text-[#00444D] dark:bg-slate-800 dark:text-[#ABEDFA]'
                              }`}>
                                {child.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Side: AI Concierge, Notifications, Language Selector, User Profile */}
        <div className="flex flex-row items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Butler AI Concierge Button - Compact on mobile, full label on tablet/desktop */}
          <button
            onClick={onOpenAI}
            title={isRTL ? "خدمة الكونسيرج الذكية" : "Butler Concierge Assistant"}
            aria-label={isRTL ? "الكونسيرج" : "Concierge"}
            className="h-7 sm:h-7.5 min-h-[28px] px-1.5 sm:px-2 rounded-md bg-gradient-to-r from-[#00444D] to-[#0D5D68] text-[#FFE088] border border-[#CCA730]/60 hover:border-[#CCA730] hover:shadow-2xs transition-all flex flex-row items-center justify-center gap-1 focus:outline-none focus:ring-1.5 focus:ring-[#CCA730] cursor-pointer active:scale-95 shrink-0 shadow-2xs select-none"
          >
            <Sparkles className="w-3 h-3 text-[#FFE088] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wide whitespace-nowrap hidden sm:inline">
              {isRTL ? "الكونسيرج" : "Concierge"}
            </span>
          </button>

          {/* Notification Center Trigger with Badge - Safely within viewport bounds */}
          <button
            onClick={openNotificationCenter}
            title={isRTL ? "مركز الإشعارات" : "Notification Center"}
            aria-label="Open notification center"
            className="relative w-7 h-7 sm:w-7.5 sm:h-7.5 min-w-[28px] min-h-[28px] rounded-md text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E6EEFF] dark:hover:bg-slate-800 transition-colors flex items-center justify-center focus:outline-none focus:ring-1.5 focus:ring-[#00444D] cursor-pointer active:scale-95 shrink-0"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-3 h-3 bg-[#CCA730] text-slate-950 font-mono text-[7px] font-bold rounded-full flex items-center justify-center shadow-2xs">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {onLanguageChange && (
            <LanguageSelector
              currentLanguage={lang}
              onLanguageChange={onLanguageChange}
              compact={true}
              variant="header"
            />
          )}

          <button
            onClick={() => onNavigate('create_account')}
            aria-label={getLocalizedNavLabel('navAccount', lang)}
            title={getLocalizedNavLabel('navAccount', lang)}
            className="hidden md:flex w-7 h-7 sm:w-auto sm:px-1.5 h-7 min-w-[28px] min-h-[28px] rounded-md text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E6EEFF] dark:hover:bg-slate-800 transition-colors items-center justify-center sm:gap-1 focus:outline-none focus:ring-1.5 focus:ring-[#00444D] cursor-pointer active:scale-95 shrink-0"
          >
            <User className="w-3.5 h-3.5" />
            <span className="text-[10px] font-semibold hidden md:inline whitespace-nowrap">
              {getLocalizedNavLabel('navAccount', lang)}
            </span>
          </button>
        </div>
      </header>
    </>
  );
};
