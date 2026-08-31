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
  statusMessage = "Your Butler is en route to Mr. Wayne's residence.",
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
      {/* Top Status Notification Banner */}
      {showStatusBar && (
        <aside 
          aria-label="Dispatch Status Bar" 
          dir={isRTL ? 'rtl' : 'ltr'}
          className="w-full bg-[#B0EDF4] dark:bg-[#0D5D68] text-[#00444D] dark:text-[#ABEDFA] py-1.5 px-3 sm:px-4 text-xs flex items-center justify-center font-medium border-b border-[#CCA730]/40 transition-colors shadow-2xs select-none"
        >
          <div className="flex items-center gap-2 max-w-5xl mx-auto truncate">
            <Truck className="w-3.5 h-3.5 flex-shrink-0 text-[#00444D] dark:text-[#ABEDFA] animate-pulse" />
            <span className="font-serif italic tracking-wide truncate">
              {statusMessage}
            </span>
          </div>
        </aside>
      )}

      {/* Main Persistent Application Shell Header */}
      <header 
        dir={isRTL ? 'rtl' : 'ltr'}
        className="sticky top-0 z-40 bg-[#F8F9FF]/95 dark:bg-[#0B132B]/95 backdrop-blur-md border-b border-[#D9E3F6] dark:border-slate-800 border-t-2 border-t-[#CCA730]/70 px-2 sm:px-4 md:px-5 py-2 sm:py-2.5 flex items-center justify-between transition-colors shadow-xs select-none"
      >
        {/* Left Lockup: Menu Drawer Trigger + Brand Identity */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenDrawer}
            aria-label={getLocalizedNavLabel('navMenu', lang)}
            className="w-10 h-10 rounded-xl text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E6EEFF] dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00444D] flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Refined Luxury Brand Lockup: Logo + Mr. Butler with Tagline Font */}
          <button 
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-2 sm:gap-2.5 group text-left focus:outline-none cursor-pointer shrink-0"
            aria-label="Mr. Butler Home"
          >
            <div className="relative shrink-0">
              <EGEC 
                size="sm" 
                shape="rounded-full" 
                withAura={true} 
                withSheen={true} 
                withBeacon={true} 
                beaconStatus="verified" 
              />
            </div>
            
            <div className="flex flex-col justify-center shrink-0">
              <div className="flex items-center gap-1.5">
                <span 
                  className="font-serif text-base sm:text-lg md:text-xl font-black tracking-tight text-[#00444D] dark:text-[#FFE088] group-hover:text-[#0D5D68] dark:group-hover:text-white transition-colors whitespace-nowrap drop-shadow-2xs"
                  style={{ fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif" }}
                >
                  {appName}
                </span>
                <span className="hidden xl:inline-flex text-[9px] font-mono font-bold uppercase tracking-wider bg-[#FFE088] text-[#241A00] px-1.5 py-0.2 rounded border border-[#CCA730]/40">
                  Valet
                </span>
              </div>
              <p className="text-[8px] sm:text-[9px] text-[#CCA730] dark:text-[#FFE088]/80 font-mono font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] leading-none mt-0.5 whitespace-nowrap">
                {isRTL ? "في خدمتكم دائماً" : "Imperial Valet & Concierge"}
              </p>
            </div>
          </button>
        </div>

        {/* Center: Desktop Persistent Top Navigation Bar with Mega-menus */}
        <nav 
          ref={dropdownRef}
          role="navigation"
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 bg-[#E6EEFF] dark:bg-slate-800/90 p-1 rounded-full border border-[#D9E3F6] dark:border-slate-700 shadow-inner mx-2"
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
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00444D] cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#00444D] text-white shadow-xs'
                      : 'text-[#00444D] dark:text-slate-200 hover:bg-white/70 dark:hover:bg-slate-700'
                  }`}
                >
                  <SectionIcon className="w-3.5 h-3.5" />
                  <span>{localizedLabel}</span>
                  {hasChildren && (
                    <ChevronDown className={`w-3 h-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Dropdown Menu for desktop */}
                {hasChildren && isMenuOpen && (
                  <div 
                    role="menu"
                    aria-label={`${localizedLabel} Submenu`}
                    className={`absolute top-full mt-1.5 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-[#D9E3F6] dark:border-slate-800 p-2 z-50 animate-fadeIn ${
                      isRTL ? 'right-0' : 'left-0'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 border-b border-slate-100 dark:border-slate-800 mb-1">
                      {localizedLabel}
                    </div>

                    <div className="space-y-1">
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
                            className={`w-full text-left flex items-center justify-between p-2 rounded-xl text-xs transition-all cursor-pointer ${
                              isChildActive
                                ? 'bg-[#00444D] text-white font-bold'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-[#EFF4FF] dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <ChildIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isChildActive ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`} />
                              <span className="truncate">
                                {getLocalizedNavLabel(child.labelKey, lang)}
                              </span>
                            </div>
                            {child.badge && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
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

        {/* Right Side: AI Concierge, Notifications, Language Selector + Account Button */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
          {/* Butler AI Assistant Button */}
          <button
            onClick={onOpenAI}
            title={isRTL ? "مساعد مستر باتلر الذكي" : "Butler AI Concierge"}
            aria-label="Open Butler AI Concierge"
            className="h-9 px-2 sm:px-2.5 rounded-xl bg-gradient-to-r from-[#00444D] to-[#0D5D68] text-[#FFE088] border border-[#CCA730]/40 hover:shadow-md transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#CCA730] cursor-pointer active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#FFE088] animate-pulse" />
            <span className="text-xs font-bold hidden sm:inline text-white whitespace-nowrap">
              {isRTL ? "المساعد" : "Butler AI"}
            </span>
          </button>

          {/* Notification Center Trigger with Badge */}
          <button
            onClick={openNotificationCenter}
            title={isRTL ? "مركز الإشعارات" : "Notification Center"}
            aria-label="Open notification center"
            className="relative w-9 h-9 rounded-xl text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E6EEFF] dark:hover:bg-slate-800 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#00444D] cursor-pointer active:scale-95 shrink-0"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 rtl:right-auto rtl:left-1 w-4 h-4 bg-[#CCA730] text-slate-950 font-mono text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
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
            className="h-9 px-2 sm:px-2.5 rounded-xl text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E6EEFF] dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00444D] cursor-pointer active:scale-95 shrink-0"
          >
            <User className="w-4 h-4" />
            <span className="text-xs font-semibold hidden md:inline whitespace-nowrap">
              {getLocalizedNavLabel('navAccount', lang)}
            </span>
          </button>
        </div>
      </header>
    </>
  );
};
