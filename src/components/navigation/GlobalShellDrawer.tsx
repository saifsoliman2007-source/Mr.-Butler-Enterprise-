import React, { useEffect, useRef, useState } from 'react';
import { ScreenId, Language } from '../../types';
import { EGEC } from '../EGEC';
import { 
  NAV_HIERARCHY, 
  NavSection, 
  NavChildItem, 
  getLocalizedNavLabel, 
  isSectionActive 
} from './NavHierarchy';
import { 
  X, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  User, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface GlobalShellDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const GlobalShellDrawer: React.FC<GlobalShellDrawerProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onNavigate,
  lang
}) => {
  const isRTL = lang === 'ar';
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Maintain expanded state for accordion sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAV_HIERARCHY.forEach(section => {
      // Auto-expand if active or has children
      if (isSectionActive(section, currentScreen)) {
        initial[String(section.id)] = true;
      }
    });
    return initial;
  });

  // Keep active section expanded when screen changes
  useEffect(() => {
    NAV_HIERARCHY.forEach(section => {
      if (isSectionActive(section, currentScreen)) {
        setExpandedSections(prev => ({ ...prev, [String(section.id)]: true }));
      }
    });
  }, [currentScreen]);

  // Focus trap & Escape key listener for keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Autofocus close button or container
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  if (!isOpen) return null;

  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div 
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label={getLocalizedNavLabel('navMenu', lang)}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div 
        ref={drawerRef}
        className={`relative w-full max-w-md bg-[#F8F9FF] dark:bg-[#0F172A] text-slate-900 dark:text-white shadow-2xl flex flex-col h-full z-10 border-[#D9E3F6] dark:border-slate-800 transition-transform duration-300 ${
          isRTL ? 'mr-auto border-l' : 'ml-auto sm:ml-0 sm:mr-auto border-r'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#D9E3F6] dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 select-none">
          <div className="flex items-center gap-3">
            <EGEC size="sm" shape="rounded-full" withAura={false} withBeacon={true} beaconStatus="online" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-base sm:text-lg text-[#00444D] dark:text-[#ABEDFA]">
                  {getLocalizedNavLabel('appName', lang)}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#CCA730]/20 text-[#CCA730] font-mono font-bold uppercase">
                  Valet
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-serif italic">
                {getLocalizedNavLabel('tagline', lang)}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label={getLocalizedNavLabel('closeNavigation', lang)}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00444D]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conceptual Navigation Hierarchy Tree */}
        <nav 
          aria-label={getLocalizedNavLabel('navMenu', lang)}
          className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 focus:outline-none"
        >
          <div className="flex items-center justify-between px-2 pt-1 pb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00444D] dark:text-[#ABEDFA]">
              {getLocalizedNavLabel('navMenu', lang)}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              Architecture Hierarchy
            </span>
          </div>

          {NAV_HIERARCHY.map((section) => {
            const SectionIcon = section.icon;
            const hasChildren = Boolean(section.children && section.children.length > 0);
            const isCurrent = currentScreen === section.id || 
              (section.id === 'welcome' && currentScreen === 0) ||
              (section.id === 'our_services' && currentScreen === 'services');
            const isActiveParent = isSectionActive(section, currentScreen);
            const isExpanded = Boolean(expandedSections[String(section.id)]);

            return (
              <div 
                key={String(section.id)} 
                className="rounded-2xl border border-[#E2E8F0] dark:border-slate-800/80 bg-white dark:bg-slate-900/90 overflow-hidden transition-all shadow-xs"
              >
                {/* Section Item Row */}
                <div 
                  className={`flex items-center justify-between p-1.5 transition-colors ${
                    isActiveParent ? 'bg-[#00444D]/5 dark:bg-[#ABEDFA]/5' : ''
                  }`}
                >
                  <button
                    onClick={() => {
                      onNavigate(section.id);
                      if (!hasChildren) {
                        onClose();
                      } else if (!isExpanded) {
                        toggleSection(String(section.id));
                      }
                    }}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`flex-1 min-h-[44px] flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${
                      isCurrent
                        ? 'bg-[#00444D] text-white font-semibold shadow-xs'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-[#EFF4FF] dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                      isCurrent 
                        ? 'bg-white/20 text-white' 
                        : isActiveParent
                          ? 'bg-[#00444D] text-white dark:bg-[#ABEDFA] dark:text-[#00444D]'
                          : 'bg-[#E6EEFF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]'
                    }`}>
                      <SectionIcon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold truncate ${isCurrent ? 'text-white' : ''}`}>
                          {getLocalizedNavLabel(section.labelKey, lang)}
                        </span>
                        {section.badge && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                            isCurrent
                              ? 'bg-white/20 text-white'
                              : 'bg-[#CCA730]/15 text-[#CCA730] border border-[#CCA730]/30'
                          }`}>
                            {section.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Accordion expand/collapse button for sections with children */}
                  {hasChildren && (
                    <button
                      onClick={() => toggleSection(String(section.id))}
                      aria-expanded={isExpanded}
                      aria-label={`${getLocalizedNavLabel(section.labelKey, lang)} submenu`}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00444D]"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#00444D] dark:text-[#ABEDFA]' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Submenu Children List */}
                {hasChildren && isExpanded && (
                  <div 
                    role="group" 
                    aria-label={getLocalizedNavLabel(section.labelKey, lang)}
                    className="p-1.5 pt-0 space-y-1 bg-slate-50/60 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/60"
                  >
                    {section.children?.map((child: NavChildItem) => {
                      const ChildIcon = child.icon;
                      const isChildActive = currentScreen === child.id;

                      return (
                        <button
                          key={String(child.id)}
                          onClick={() => {
                            onNavigate(child.id);
                            onClose();
                          }}
                          aria-current={isChildActive ? 'page' : undefined}
                          className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                            isChildActive
                              ? 'bg-[#00444D] text-white font-bold shadow-xs'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-[#00444D] dark:hover:text-white'
                          } ${isRTL ? 'pr-6' : 'pl-6'}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <ChildIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isChildActive ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`} />
                            <span className="truncate">
                              {getLocalizedNavLabel(child.labelKey, lang)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {child.badge && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                                isChildActive 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}>
                                {child.badge}
                              </span>
                            )}
                            <ArrowIcon className={`w-3.5 h-3.5 opacity-60 ${isChildActive ? 'text-white opacity-100' : ''}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Drawer Footer Account & Quick Actions */}
        <div className="p-4 border-t border-[#D9E3F6] dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                onNavigate('create_account');
                onClose();
              }}
              className="flex items-center gap-2 text-xs font-semibold text-[#00444D] dark:text-[#ABEDFA] hover:underline p-1.5"
            >
              <User className="w-4 h-4" />
              <span>{getLocalizedNavLabel('navAccount', lang)} / Auth Portal</span>
            </button>
            <span className="text-[10px] text-slate-400 font-mono">v2.4 Shell</span>
          </div>

          <button
            onClick={() => {
              onNavigate('welcome');
              onClose();
            }}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#00444D] hover:bg-[#0D5D68] text-white text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFE088]" />
            <span>{getLocalizedNavLabel('navHome', lang)} Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
