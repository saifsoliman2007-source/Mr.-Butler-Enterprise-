import React from 'react';
import { ScreenId, DeviceType, ThemeMode, Language, Orientation } from '../types';
import { DEVICE_CONFIGS } from './DeviceFrame';
import { translations } from '../data/translations';
import { EGEC } from './EGEC';
import { LanguageSelector } from './forms/LanguageSelector';
import { useNotifications } from '../context/NotificationContext';
import { 
  Sliders, 
  Eye, 
  FileCode2, 
  Sun, 
  Moon, 
  Laptop, 
  ChevronDown, 
  Smartphone,
  Globe,
  ShieldCheck,
  SmartphoneNfc,
  RotateCw,
  Keyboard,
  ShieldAlert,
  Layers,
  Bell,
  Sparkles,
  Home,
  Shirt,
  Scissors,
  Footprints,
  Sparkle,
  Dog,
  Package,
  Compass,
  CheckCircle2,
  Workflow
} from 'lucide-react';

interface TopBarProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  deviceType: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  orientation: Orientation;
  onToggleOrientation: () => void;
  simulateKeyboard: boolean;
  onToggleKeyboard: () => void;
  showSafeOverlay: boolean;
  onToggleSafeOverlay: () => void;
  themeMode: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  showFrame: boolean;
  onToggleFrame: () => void;
  onOpenAdminToggles: () => void;
  onOpenAccessibility: () => void;
  onOpenDesignSpecs: () => void;
  onOpenScreenFlow?: () => void;
  onOpenAI?: () => void;
}

export const SCREEN_LABELS: Record<ScreenId, string> = {
  welcome: 'Home: Welcome Portal (welcome_screen_material_update.html)',
  create_account: 'Auth: Create Account (authentication_landing.html)',
  verify_email: 'Auth: Verify Email (6-Digit OTP)',
  // Services
  services: 'Services: Overview & Directory',
  our_services: 'Services: Concierge Portal',
  book_dry_cleaning: 'Services > Dry Cleaning & Laundry',
  book_tailoring: 'Services > Tailoring & Alterations',
  book_shoe_repair: 'Services > Shoe Fix & Repair',
  book_beauty_salon: 'Services > Beauty Salon Services',
  book_pet_care: 'Services > Pet Care Services',
  // Concierge
  concierge: 'Concierge: Overview',
  concierge_offers: 'Concierge > Offers',
  concierge_recommendations: 'Concierge > Recommendations',
  concierge_special_requests: 'Concierge > Special Requests',
  google_drive: 'Concierge > Google Drive Valet Vault',
  // Orders
  orders: 'Orders: Hub',
  orders_active: 'Orders > Active Orders',
  orders_previous: 'Orders > Previous Orders',
  orders_details: 'Orders > Order Details',
  // Foundation
  foundation: 'Foundation: Overview',
  foundation_enterprise: 'Foundation > Enterprise Information',
  foundation_brand: 'Foundation > Brand Identity',
  foundation_components: 'Foundation > Shared Components',
  foundation_design: 'Foundation > Design & Tokens',
  foundation_accessibility: 'Foundation > Accessibility',
  // Legacy / Direct Screens
  0: 'Screen 0: Splash Screen (Animated)',
  1: 'Screen 1: Welcome & Service Roles',
  2: 'Screen 2: Registration Method Selector',
  3: 'Screen 3: Consumer Email Registration',
  4: 'Screen 4: Consumer Email Verification (OTP)',
  5: 'Screen 5: Consumer Registration Complete',
  6: 'Screen 6: Service Provider Registration',
  7: 'Screen 7: Provider Email Verification (OTP)',
  8: 'Screen 8: Provider Registration Complete',
  9: 'Screen 9: Sign In Portal',
  10: 'Screen 10: Forgot Password',
  11: 'Screen 11: Reset Password',
  consumer_home: 'Destination: Consumer Home',
  provider_dashboard: 'Destination: Service Provider Setup',
};

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  onScreenChange,
  deviceType,
  onDeviceChange,
  orientation,
  onToggleOrientation,
  simulateKeyboard,
  onToggleKeyboard,
  showSafeOverlay,
  onToggleSafeOverlay,
  themeMode,
  onThemeChange,
  language,
  onLanguageChange,
  showFrame,
  onToggleFrame,
  onOpenAdminToggles,
  onOpenAccessibility,
  onOpenDesignSpecs,
  onOpenScreenFlow,
  onOpenAI,
}) => {
  const t = translations[language] || translations.en;
  const { unreadCount, openNotificationCenter } = useNotifications();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#0F172A] text-[#1E293B] dark:text-slate-100 border-b border-[#E2E8F0] dark:border-slate-800 shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & Title (Application Shell Global Header with Official Logo & Libre Caslon Text) */}
        <div 
          onClick={() => onScreenChange('welcome')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onScreenChange('welcome')}
          aria-label="Mr. Butler Enterprise - Go to Home"
          className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00444D] rounded-2xl p-1 transition-transform active:scale-98 select-none"
        >
          {/* Official Mr. Butler Protected Brand Emblem (EGEC) */}
          <EGEC 
            size="sm" 
            shape="rounded-full" 
            withAura={true} 
            withSheen={true} 
            withBeacon={true} 
            beaconStatus="online" 
            altText="Mr. Butler Official Crest"
          />

          {/* Brand Name Styled in Libre Caslon Text Typography */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 
                className="text-lg sm:text-xl font-bold tracking-tight text-[#00444D] dark:text-[#FFE088] group-hover:text-[#0D5D68] dark:group-hover:text-white transition-colors whitespace-nowrap drop-shadow-2xs"
                style={{ 
                  fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                  letterSpacing: '-0.02em',
                }}
              >
                {language === 'ar' ? 'مستر باتلر' : 'Mr. Butler'}
              </h1>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#00444D] dark:text-[#ABEDFA] bg-[#B0EDF4]/70 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-[#CCA730]/40 font-mono tracking-wider uppercase">
                Enterprise
              </span>
            </div>
            <p 
              className="text-[8px] sm:text-[9px] text-[#CCA730] dark:text-[#FFE088]/85 font-mono font-bold uppercase tracking-[0.18em] leading-none mt-0.5 whitespace-nowrap"
            >
              {language === 'ar' ? 'في خدمتكم دائماً • خدمات الفاليه الفاخرة' : 'Imperial Valet & Concierge'}
            </p>
          </div>
        </div>

        {/* Center Controls: Screen Jumper & Device Frame Selector */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Screen Jumper Dropdown */}
          <div className="relative">
            <select
              value={currentScreen}
              onChange={(e) => {
                const val = e.target.value;
                if (!isNaN(Number(val))) {
                  onScreenChange(Number(val) as ScreenId);
                } else {
                  onScreenChange(val as ScreenId);
                }
              }}
              className="bg-[#EFF6FF] dark:bg-slate-800 text-[#1D4ED8] dark:text-blue-400 text-xs font-semibold pl-3 pr-8 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-slate-700 hover:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40 transition cursor-pointer appearance-none shadow-xs"
            >
              {Object.entries(SCREEN_LABELS).map(([id, label]) => (
                <option key={id} value={id} className="bg-white dark:bg-slate-900 text-[#1E293B] dark:text-slate-200">
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Device Selector */}
          <div className="relative hidden md:block">
            <select
              value={deviceType}
              onChange={(e) => onDeviceChange(e.target.value as DeviceType)}
              className="bg-[#F8FAFC] dark:bg-slate-800 text-[#475569] dark:text-slate-200 text-xs font-medium pl-8 pr-7 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-slate-700 hover:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40 transition cursor-pointer appearance-none"
            >
              {Object.entries(DEVICE_CONFIGS).map(([key, config]) => (
                <option key={key} value={key} className="bg-white dark:bg-slate-900 text-[#1E293B] dark:text-slate-200">
                  {config.name} ({config.badge})
                </option>
              ))}
            </select>
            <Smartphone className="w-3.5 h-3.5 text-[#3B82F6] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Orientation Toggle (Portrait / Landscape) */}
          <button
            onClick={onToggleOrientation}
            title={`Toggle Orientation (Current: ${orientation})`}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition flex items-center gap-1.5 ${
              orientation === 'landscape'
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                : 'bg-white dark:bg-slate-800 text-[#64748B] dark:text-slate-400 border-[#E2E8F0] dark:border-slate-700 hover:text-[#0F172A]'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden xl:inline">{orientation === 'landscape' ? 'Landscape' : 'Portrait'}</span>
          </button>

          {/* Safe Area Guideline Overlay Toggle */}
          <button
            onClick={onToggleSafeOverlay}
            title="Toggle Safe Area Overlay Inspection (16/24/32dp margins)"
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition flex items-center gap-1.5 ${
              showSafeOverlay
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-slate-800 text-[#64748B] dark:text-slate-400 border-[#E2E8F0] dark:border-slate-700 hover:text-[#0F172A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden xl:inline">Safe Area: {showSafeOverlay ? 'Visible' : 'Hidden'}</span>
          </button>

          {/* Virtual Keyboard Appearance Simulation Toggle */}
          <button
            onClick={onToggleKeyboard}
            title="Simulate Mobile Virtual Keyboard Appearance (Bottom Inset)"
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition flex items-center gap-1.5 ${
              simulateKeyboard
                ? 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
                : 'bg-white dark:bg-slate-800 text-[#64748B] dark:text-slate-400 border-[#E2E8F0] dark:border-slate-700 hover:text-[#0F172A]'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden xl:inline">Keyboard</span>
          </button>
        </div>

        {/* Right Tools: Butler AI, Notifications, Theme, Language, Admin Toggles, Accessibility, Specs */}
        <div className="flex items-center gap-1.5">

          {/* Butler AI Concierge Trigger */}
          {onOpenAI && (
            <button
              onClick={onOpenAI}
              title="Open Butler AI Concierge Assistant"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-gradient-to-r from-[#00444D] to-[#0D5D68] text-[#FFE088] hover:shadow-md transition flex items-center gap-1.5 text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFE088]" />
              <span className="hidden sm:inline text-white">Butler AI</span>
            </button>
          )}

          {/* Notification Center Trigger */}
          <button
            onClick={openNotificationCenter}
            title="Notification Center (9 Enterprise Types)"
            className="relative p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#475569] dark:text-slate-300 hover:text-[#00444D] dark:hover:text-[#ABEDFA] hover:border-[#00444D] transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <Bell className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA]" />
            <span className="hidden md:inline">Notifications</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#CCA730] text-slate-950 font-mono text-[10px] font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* Language Selector */}
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
            compact={true}
            variant="standalone"
          />

          {/* Theme Toggle */}
          <button
            onClick={() => {
              if (themeMode === 'light') onThemeChange('dark');
              else if (themeMode === 'dark') onThemeChange('system');
              else onThemeChange('light');
            }}
            title={`Current Theme: ${themeMode}`}
            className="p-1.5 rounded-lg bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#475569] dark:text-slate-300 hover:text-[#3B82F6] transition"
          >
            {themeMode === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
            {themeMode === 'dark' && <Moon className="w-4 h-4 text-blue-400" />}
            {themeMode === 'system' && <Laptop className="w-4 h-4 text-[#3B82F6]" />}
          </button>

          {/* Admin Feature Toggles Drawer */}
          <button
            onClick={onOpenAdminToggles}
            title="Administrator Feature Toggles"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/50 border border-[#E2E8F0] dark:border-blue-800 text-[#1D4ED8] dark:text-blue-300 hover:bg-blue-100 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <Sliders className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="hidden lg:inline">{t.featureToggles}</span>
          </button>

          {/* Accessibility Inspector Button */}
          <button
            onClick={onOpenAccessibility}
            title="Accessibility Settings & Inspector"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#F1F5F9] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#475569] dark:text-slate-300 hover:bg-slate-200 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <Eye className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="hidden lg:inline">{t.accessibilityInspector}</span>
          </button>

          {/* Screen Flow Visualizer & Blueprint Button */}
          {onOpenScreenFlow && (
            <button
              onClick={onOpenScreenFlow}
              title="Interactive Screen Flow & Master Stitch Prototype"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition flex items-center gap-1.5 text-xs font-bold shadow-xs cursor-pointer"
            >
              <Workflow className="w-3.5 h-3.5 text-blue-200" />
              <span className="hidden sm:inline">{language === 'ar' ? 'مخطط التدفق' : 'Screen Flow'}</span>
              <span className="px-1.5 py-0.2 bg-white/20 text-white rounded text-[10px] font-mono">23</span>
            </button>
          )}

          {/* Design Specs Modal Button */}
          <button
            onClick={onOpenDesignSpecs}
            title="MEDS Design Specifications & Documentation"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#0F172A] text-white hover:bg-[#1E293B] transition flex items-center gap-1.5 text-xs font-semibold shadow-xs"
          >
            <FileCode2 className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="hidden lg:inline">{t.designSpecs}</span>
          </button>
        </div>

      </div>

      {/* Guest Free Sector Navigator Ribbon */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 shrink-0 pr-2">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
            <Compass className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Guest Freedom:</span>
            <span>{language === 'ar' ? 'حرية التجول الكاملة' : 'All Sectors Unlocked'}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'welcome' as ScreenId, label: language === 'ar' ? 'الرئيسية' : 'Home', icon: Home },
            { id: 'our_services' as ScreenId, label: language === 'ar' ? 'كافة الخدمات (٥)' : 'All Services (5)', icon: Sparkles, highlight: true },
            { id: 'book_dry_cleaning' as ScreenId, label: language === 'ar' ? 'غسيل وتنظيف' : 'Dry Clean', icon: Shirt },
            { id: 'book_tailoring' as ScreenId, label: language === 'ar' ? 'خياطة وتفصيل' : 'Tailoring', icon: Scissors },
            { id: 'book_shoe_repair' as ScreenId, label: language === 'ar' ? 'تلميع أحذية' : 'Shoe Care', icon: Footprints },
            { id: 'book_beauty_salon' as ScreenId, label: language === 'ar' ? 'تجميل وحلاقة' : 'Beauty Suite', icon: Sparkle },
            { id: 'book_pet_care' as ScreenId, label: language === 'ar' ? 'سبا الحيوانات' : 'Pet Care', icon: Dog },
            { id: 'concierge' as ScreenId, label: language === 'ar' ? 'كونسيرج' : 'Concierge', icon: Bell },
            { id: 'orders' as ScreenId, label: language === 'ar' ? 'تتبع الطلبات' : 'Orders', icon: Package },
            { id: 'foundation' as ScreenId, label: language === 'ar' ? 'الأساس والمواصفات' : 'Foundation', icon: Layers },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id || (item.id === 'our_services' && currentScreen === 'services');
            return (
              <button
                key={String(item.id)}
                onClick={() => onScreenChange(item.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#00444D] text-[#FFE088] shadow-xs ring-1 ring-[#CCA730]/40'
                    : item.highlight
                    ? 'bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#D9E3F6] dark:hover:bg-slate-700'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-[#FFE088]' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
