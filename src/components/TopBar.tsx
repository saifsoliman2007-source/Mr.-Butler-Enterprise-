import React from 'react';
import { ScreenId, DeviceType, ThemeMode, Language, Orientation } from '../types';
import { DEVICE_CONFIGS } from './DeviceFrame';
import { translations } from '../data/translations';
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
  Tablet,
  Monitor,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Workflow,
  Sparkles,
  Layers,
  Keyboard,
  RotateCw
} from 'lucide-react';

interface TopBarProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  onGoBack?: () => void;
  onGoForward?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
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

export const AUTHORITATIVE_SCREENS: { id: ScreenId; label: string; number: string }[] = [
  { id: 'welcome', label: '1. Welcome to Mr. Butler', number: '01' },
  { id: 'create_account', label: '2. Create Account', number: '02' },
  { id: 'verify_email', label: '3. Verify Email', number: '03' },
  { id: 'our_services', label: '4. Our Services', number: '04' },
  { id: 'book_dry_cleaning', label: '5. Book Dry Cleaning', number: '05' },
  { id: 'book_tailoring', label: '6. Book Tailoring', number: '06' },
  { id: 'book_shoe_repair', label: '7. Book Shoe Repair', number: '07' },
  { id: 'book_beauty_salon', label: '8. Book Beauty Salon', number: '08' },
  { id: 'book_pet_care', label: '9. Book Pet Care', number: '09' },
];

export const SYSTEM_HUBS: { id: ScreenId; label: string }[] = [
  { id: 9, label: 'Screen 9: Sign In Portal' },
  { id: 10, label: 'Screen 10: Forgot Password' },
  { id: 11, label: 'Screen 11: Reset Password' },
  { id: 'orders', label: 'Orders: Active & History' },
  { id: 'concierge', label: 'Concierge: Overview' },
  { id: 'google_drive', label: 'Concierge: Google Drive Vault' },
  { id: 'foundation', label: 'MEDS Foundation & Design Specs' },
  { id: 0, label: 'Screen 0: Splash Screen' },
  { id: 1, label: 'Screen 1: Welcome & Roles' },
  { id: 2, label: 'Screen 2: Registration Method' },
  { id: 3, label: 'Screen 3: Consumer Email Form' },
  { id: 4, label: 'Screen 4: Consumer OTP' },
  { id: 5, label: 'Screen 5: Consumer Complete' },
  { id: 6, label: 'Screen 6: Provider Registration' },
  { id: 7, label: 'Screen 7: Provider OTP' },
  { id: 8, label: 'Screen 8: Provider Complete' },
  { id: 'consumer_home', label: 'Destination: Consumer Home' },
  { id: 'provider_dashboard', label: 'Destination: Provider Dashboard' },
];

export const SCREEN_LABELS: Record<string, string> = Object.fromEntries([
  ...AUTHORITATIVE_SCREENS.map(s => [s.id, s.label]),
  ...SYSTEM_HUBS.map(s => [s.id, s.label]),
]);

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  onScreenChange,
  onGoBack,
  onGoForward,
  canGoBack = false,
  canGoForward = false,
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
  const isRTL = language === 'ar';

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC] dark:bg-[#0B1120] text-[#1E293B] dark:text-slate-200 border-b border-[#E2E8F0] dark:border-slate-800 shadow-xs px-1.5 sm:px-2.5 py-1">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1 sm:gap-1.5">
        
        {/* Left Lockup: Dev Indicator + Screen Selector Dropdown */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap sm:flex-nowrap">
          {/* Dev Only Label Badge */}
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#EFF6FF] dark:bg-blue-950/60 border border-[#BFDBFE] dark:border-blue-800 text-[#1D4ED8] dark:text-blue-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider select-none shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="hidden xs:inline">{isRTL ? "معاينة (تطوير)" : "DEV PREVIEW"}</span>
          </div>

          {/* Tactile Back / Forward Navigation Controls */}
          <div className="flex items-center bg-white dark:bg-slate-800 rounded p-0.5 border border-[#E2E8F0] dark:border-slate-700 shadow-2xs h-6.5">
            <button
              onClick={onGoBack}
              disabled={!canGoBack}
              title={isRTL ? "الصفحة السابقة" : "Go Back"}
              aria-label="Previous screen"
              className={`p-0.5 rounded transition-all flex items-center justify-center cursor-pointer ${
                canGoBack
                  ? 'text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#F1F5F9] dark:hover:bg-slate-700 active:scale-95 shadow-xs font-bold'
                  : 'text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              {isRTL ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>
            <div className="h-3 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />
            <button
              onClick={onGoForward}
              disabled={!canGoForward}
              title={isRTL ? "الصفحة التالية" : "Go Forward"}
              aria-label="Next screen"
              className={`p-0.5 rounded transition-all flex items-center justify-center cursor-pointer ${
                canGoForward
                  ? 'text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#F1F5F9] dark:hover:bg-slate-700 active:scale-95 shadow-xs font-bold'
                  : 'text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              {isRTL ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
          </div>

          {/* Primary Screen Selector Dropdown */}
          <div className="relative min-w-[150px] sm:min-w-[200px] max-w-full">
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
              aria-label="Select screen to preview"
              className="w-full h-6.5 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-slate-100 text-[11px] font-semibold pl-2 pr-6 py-0.5 rounded border border-[#CBD5E1] dark:border-slate-700 hover:border-[#3B82F6] focus:outline-none focus:ring-1.5 focus:ring-[#3B82F6]/40 transition cursor-pointer appearance-none shadow-2xs"
            >
              <optgroup label={isRTL ? "الشاشات الأساسية (تسلسل الإصدار الأول)" : "Authoritative Screen Flow (1-9)"}>
                {AUTHORITATIVE_SCREENS.map((screen) => (
                  <option key={String(screen.id)} value={screen.id} className="bg-white dark:bg-slate-900 text-[#1E293B] dark:text-slate-200 py-0.5 font-medium">
                    {screen.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label={isRTL ? "مراكز ومكونات النظام" : "System Hubs & Components"}>
                {SYSTEM_HUBS.map((screen) => (
                  <option key={String(screen.id)} value={screen.id} className="bg-white dark:bg-slate-900 text-[#475569] dark:text-slate-400 py-0.5">
                    {screen.label}
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Center & Right Controls: Device Selection & Toggles */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
          
          {/* Device Preset Dropdown */}
          <div className="relative hidden lg:flex items-center">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mr-1 font-medium select-none">
              {isRTL ? "الجهاز:" : "Device:"}
            </span>
            <div className="relative">
              <select
                value={deviceType}
                onChange={(e) => onDeviceChange(e.target.value as DeviceType)}
                aria-label="Select preview device frame"
                className="h-6.5 bg-white dark:bg-slate-800 text-[#334155] dark:text-slate-200 text-[11px] font-medium pl-2 pr-6 py-0.5 rounded border border-[#CBD5E1] dark:border-slate-700 hover:border-[#3B82F6] focus:outline-none focus:ring-1.5 focus:ring-[#3B82F6]/40 transition cursor-pointer appearance-none shadow-2xs"
              >
                {Object.entries(DEVICE_CONFIGS).map(([key, config]) => (
                  <option key={key} value={key} className="bg-white dark:bg-slate-900 text-[#1E293B] dark:text-slate-200">
                    {config.name} ({config.badge})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Quick Device Frame Icons */}
          <div className="flex items-center bg-white dark:bg-slate-800 rounded p-0.5 border border-[#CBD5E1] dark:border-slate-700 shadow-2xs h-6.5">
            <button
              onClick={() => onDeviceChange('iphone')}
              title="Mobile (393px)"
              className={`p-1 rounded transition ${
                deviceType === 'iphone' || deviceType === 'android_phone'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 font-bold'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3 h-3" />
            </button>
            <button
              onClick={() => onDeviceChange('ipad')}
              title="Tablet (768px)"
              className={`p-1 rounded transition ${
                deviceType === 'ipad' || deviceType === 'android_tablet'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 font-bold'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3 h-3" />
            </button>
            <button
              onClick={() => onDeviceChange('desktop')}
              title="Desktop (1440px)"
              className={`p-1 rounded transition ${
                deviceType === 'desktop'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 font-bold'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3 h-3" />
            </button>
          </div>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={() => {
              if (themeMode === 'light') onThemeChange('dark');
              else if (themeMode === 'dark') onThemeChange('system');
              else onThemeChange('light');
            }}
            title={`Current Theme: ${themeMode}`}
            aria-label="Toggle theme"
            className="w-6.5 h-6.5 p-1 rounded bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#3B82F6] transition cursor-pointer shadow-2xs flex items-center justify-center"
          >
            {themeMode === 'light' && <Sun className="w-3.5 h-3.5 text-amber-500" />}
            {themeMode === 'dark' && <Moon className="w-3.5 h-3.5 text-blue-400" />}
            {themeMode === 'system' && <Laptop className="w-3.5 h-3.5 text-[#3B82F6]" />}
          </button>

          {/* Safe Area Inspection Overlay Toggle */}
          <button
            onClick={onToggleSafeOverlay}
            title="Toggle Safe Area Overlay (16/24/32dp margins)"
            aria-label="Toggle safe area overlay"
            className={`w-6.5 h-6.5 p-1 rounded border transition cursor-pointer shadow-2xs flex items-center justify-center ${
              showSafeOverlay
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-[#CBD5E1] dark:border-slate-700 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* Frame Toggle */}
          <button
            onClick={onToggleFrame}
            title={showFrame ? "Hide Device Frame (Fullscreen)" : "Show Device Frame"}
            aria-label="Toggle device frame"
            className={`w-6.5 h-6.5 p-1 rounded border transition cursor-pointer shadow-2xs flex items-center justify-center ${
              showFrame
                ? 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-[#CBD5E1] dark:border-slate-700'
                : 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
            }`}
          >
            {showFrame ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </button>

          {/* AI Butler Concierge Trigger */}
          {onOpenAI && (
            <button
              onClick={onOpenAI}
              title={isRTL ? "خدمة كونسيرج مستر باتلر" : "Launch Butler AI Concierge"}
              aria-label="Launch Butler AI Concierge"
              className="h-6.5 px-1.5 py-0.5 rounded bg-gradient-to-r from-[#00444D] to-[#0D5D68] text-[#FFE088] border border-[#CCA730]/50 hover:border-[#CCA730] transition flex flex-row items-center gap-1 cursor-pointer shadow-2xs active:scale-95 text-[10px] font-bold"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#FFE088] animate-pulse" />
              <span className="hidden sm:inline text-white font-semibold text-[10px]">
                {isRTL ? "الكونسيرج" : "Concierge"}
              </span>
            </button>
          )}

          {/* Language Selector */}
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
            compact={true}
            variant="standalone"
          />

          {/* Screen Flow Visualizer Button */}
          {onOpenScreenFlow && (
            <button
              onClick={onOpenScreenFlow}
              title="Interactive Screen Flow Blueprint"
              className="w-6.5 h-6.5 p-1 rounded bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition cursor-pointer shadow-2xs flex items-center justify-center"
            >
              <Workflow className="w-3 h-3" />
            </button>
          )}

          {/* Design Specs Modal Button */}
          <button
            onClick={onOpenDesignSpecs}
            title="MEDS Design Specifications & Tokens"
            className="w-6.5 h-6.5 p-1 rounded bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition cursor-pointer shadow-2xs flex items-center justify-center"
          >
            <FileCode2 className="w-3 h-3" />
          </button>
        </div>

      </div>
    </header>
  );
};

