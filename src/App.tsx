import React, { useState, useEffect } from 'react';
import { 
  ScreenId, 
  Role, 
  DeviceType, 
  ThemeMode, 
  Language, 
  FeatureToggles, 
  AccessibilitySettings, 
  RegistrationData,
  Orientation
} from './types';
import { TopBar, SCREEN_LABELS } from './components/TopBar';
import { DeviceFrame } from './components/DeviceFrame';
import { ContentCanvas } from './components/ContentCanvas';
import { AdminTogglesDrawer } from './components/AdminTogglesDrawer';
import { AccessibilityDrawer } from './components/AccessibilityDrawer';
import { DesignSpecsModal } from './components/DesignSpecsModal';
import { ScreenFlowModal } from './components/ScreenFlowModal';
import { NotificationProvider } from './context/NotificationContext';
import { FloatingToastContainer } from './components/notifications/FloatingToastContainer';
import { NotificationCenterDrawer } from './components/notifications/NotificationCenterDrawer';
import { AIAssistantDrawer } from './components/ai/AIAssistantDrawer';

// Screens
import { Screen0_Splash } from './components/screens/Screen0_Splash';
import { Screen1_Welcome } from './components/screens/Screen1_Welcome';
import { Screen2_RegMethod } from './components/screens/Screen2_RegMethod';
import { Screen3_ConsumerReg } from './components/screens/Screen3_ConsumerReg';
import { Screen4_EmailVerification } from './components/screens/Screen4_EmailVerification';
import { Screen5_ConsumerComplete } from './components/screens/Screen5_ConsumerComplete';
import { Screen6_ProviderReg } from './components/screens/Screen6_ProviderReg';
import { Screen7_ProviderVerification } from './components/screens/Screen7_ProviderVerification';
import { Screen8_ProviderComplete } from './components/screens/Screen8_ProviderComplete';
import { Screen9_SignIn } from './components/screens/Screen9_SignIn';
import { Screen10_ForgotPassword } from './components/screens/Screen10_ForgotPassword';
import { Screen11_ResetPassword } from './components/screens/Screen11_ResetPassword';
import { ConsumerHomePreview } from './components/screens/ConsumerHomePreview';
import { ProviderDashboardPreview } from './components/screens/ProviderDashboardPreview';

// New Screens (Imperial Valet Service Portal Suite)
import { ScreenWelcomePortal } from './components/screens/ScreenWelcomePortal';
import { ScreenAuthenticationLanding } from './components/screens/ScreenAuthenticationLanding';
import { ScreenOurServices } from './components/screens/ScreenOurServices';
import { ScreenBookDryCleaning } from './components/screens/ScreenBookDryCleaning';
import { ScreenBookTailoring } from './components/screens/ScreenBookTailoring';
import { ScreenBookShoeRepair } from './components/screens/ScreenBookShoeRepair';
import { ScreenBookBeautySalon } from './components/screens/ScreenBookBeautySalon';
import { ScreenBookPetCare } from './components/screens/ScreenBookPetCare';
import { ScreenConcierge } from './components/screens/ScreenConcierge';
import { ScreenOrders } from './components/screens/ScreenOrders';
import { ScreenFoundation } from './components/screens/ScreenFoundation';
import { ScreenGoogleDrive } from './components/screens/ScreenGoogleDrive';
import { BottomNavigationBar } from './components/navigation/BottomNavigationBar';

export default function App() {
  // Navigation & History State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [history, setHistory] = useState<ScreenId[]>(['welcome']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<Role>('consumer');

  // Device & Display State
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [simulateKeyboard, setSimulateKeyboard] = useState<boolean>(false);
  const [showSafeOverlay, setShowSafeOverlay] = useState<boolean>(false);
  const [showFrame, setShowFrame] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [language, setLanguage] = useState<Language>('en');

  // Drawer / Modal Modals
  const [isAdminTogglesOpen, setIsAdminTogglesOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isDesignSpecsOpen, setIsDesignSpecsOpen] = useState(false);
  const [isScreenFlowOpen, setIsScreenFlowOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Feature Toggles (Administrator Policies)
  const [featureToggles, setFeatureToggles] = useState<FeatureToggles>({
    googleAuth: true,
    facebookAuth: true,
    appleAuth: true,
    emailReg: true,
    emailOtp: true,
    phoneOtp: false, // Disabled by default per spec
  });

  // Accessibility Settings
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    reducedMotion: false,
    highContrast: false,
    fontSizeScale: 100,
    screenReaderActive: true,
    liveAnnouncements: [
      'Mr. Butler Enterprise initialized. Active screen: Screen 0 Splash.',
    ],
  });

  // User Registration State
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    role: 'consumer',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessPhone: '',
    businessAddress: '',
  });

  // Navigation Logger & Announcement Helper with History Management
  const navigateTo = (screen: ScreenId) => {
    setCurrentScreen(screen);
    setHistory((prev) => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      return [...upToCurrent, screen];
    });
    setHistoryIndex((prev) => prev + 1);

    const screenTitle = SCREEN_LABELS[screen] || `Screen ${screen}`;
    const announcement = `Navigated to ${screenTitle}. User role: ${selectedRole}.`;

    setAccessibilitySettings((prev) => ({
      ...prev,
      liveAnnouncements: [...prev.liveAnnouncements.slice(-15), announcement],
    }));
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const targetScreen = history[newIndex];
      setHistoryIndex(newIndex);
      setCurrentScreen(targetScreen);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const targetScreen = history[newIndex];
      setHistoryIndex(newIndex);
      setCurrentScreen(targetScreen);
    }
  };

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...data }));
  };

  // Sync dark class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  // Handle Arabic RTL
  const isRTL = language === 'ar';

  return (
    <NotificationProvider>
      <div 
        className={`min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#1E293B] dark:text-slate-100 flex flex-col font-sans transition-all duration-300 ${
          accessibilitySettings.highContrast ? 'contrast-125 saturate-150 ring-2 ring-[#3B82F6]' : ''
        }`}
        style={{
          fontSize: `${accessibilitySettings.fontSizeScale}%`,
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {/* Top Header Bar */}
        <TopBar
          currentScreen={currentScreen}
          onScreenChange={navigateTo}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < history.length - 1}
          deviceType={deviceType}
          onDeviceChange={setDeviceType}
          orientation={orientation}
          onToggleOrientation={() => setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')}
          simulateKeyboard={simulateKeyboard}
          onToggleKeyboard={() => setSimulateKeyboard(prev => !prev)}
          showSafeOverlay={showSafeOverlay}
          onToggleSafeOverlay={() => setShowSafeOverlay(prev => !prev)}
          themeMode={themeMode}
          onThemeChange={setThemeMode}
          language={language}
          onLanguageChange={setLanguage}
          showFrame={showFrame}
          onToggleFrame={() => setShowFrame(!showFrame)}
          onOpenAdminToggles={() => setIsAdminTogglesOpen(true)}
          onOpenAccessibility={() => setIsAccessibilityOpen(true)}
          onOpenDesignSpecs={() => setIsDesignSpecsOpen(true)}
          onOpenScreenFlow={() => setIsScreenFlowOpen(true)}
          onOpenAI={() => setIsAIAssistantOpen(true)}
        />

        {/* Main Workspace Frame */}
        <main className="flex-1 flex flex-col items-center justify-start relative overflow-x-hidden w-full bg-[#F1F5F9] dark:bg-[#0B1120] p-2 sm:p-4 md:p-6 lg:p-8">
          
          <DeviceFrame
            deviceType={deviceType}
            orientation={orientation}
            showFrame={showFrame}
            onDeviceChange={setDeviceType}
            onToggleFrame={() => setShowFrame(!showFrame)}
          >
            {/* Content Canvas (Enterprise Safe Area Standard: 16dp Mobile, 24dp Tablet, 32dp Desktop, 24dp min vertical) */}
            <ContentCanvas
              deviceType={deviceType}
              orientation={orientation}
              simulateKeyboard={simulateKeyboard}
              simulateHinge={deviceType === 'foldable_unfolded'}
              showSafeOverlay={showSafeOverlay}
              isRTL={isRTL}
              onGoBack={handleGoBack}
              onGoForward={handleGoForward}
            >
            {/* Active Screen Rendering */}
            {(currentScreen === 'welcome' || currentScreen === 'welcome') && (
              <ScreenWelcomePortal onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'create_account' && (
              <ScreenAuthenticationLanding
                formData={registrationData}
                onUpdateFormData={updateRegistrationData}
                onNavigate={navigateTo}
                lang={language}
                onLanguageChange={setLanguage}
              />
            )}

            {currentScreen === 'verify_email' && (
              <Screen4_EmailVerification
                email={registrationData.email}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {(currentScreen === 'our_services' || currentScreen === 'services') && (
              <ScreenOurServices onNavigate={navigateTo} lang={language} />
            )}

            {currentScreen === 'book_dry_cleaning' && (
              <ScreenBookDryCleaning onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'book_tailoring' && (
              <ScreenBookTailoring onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'book_shoe_repair' && (
              <ScreenBookShoeRepair onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'book_beauty_salon' && (
              <ScreenBookBeautySalon onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'book_pet_care' && (
              <ScreenBookPetCare onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {/* Concierge Routes */}
            {currentScreen === 'concierge' && (
              <ScreenConcierge subSection="overview" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'concierge_offers' && (
              <ScreenConcierge subSection="offers" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'concierge_recommendations' && (
              <ScreenConcierge subSection="recommendations" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'concierge_special_requests' && (
              <ScreenConcierge subSection="special_requests" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'google_drive' && (
              <ScreenGoogleDrive onNavigate={navigateTo} />
            )}

            {/* Orders Routes */}
            {currentScreen === 'orders' && (
              <ScreenOrders subSection="overview" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'orders_active' && (
              <ScreenOrders subSection="active" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'orders_previous' && (
              <ScreenOrders subSection="previous" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'orders_details' && (
              <ScreenOrders subSection="details" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {/* Foundation Routes */}
            {currentScreen === 'foundation' && (
              <ScreenFoundation subSection="overview" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'foundation_enterprise' && (
              <ScreenFoundation subSection="enterprise" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'foundation_brand' && (
              <ScreenFoundation subSection="brand" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'foundation_components' && (
              <ScreenFoundation subSection="components" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'foundation_design' && (
              <ScreenFoundation subSection="design" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 'foundation_accessibility' && (
              <ScreenFoundation subSection="accessibility" onNavigate={navigateTo} lang={language} onLanguageChange={setLanguage} />
            )}

            {currentScreen === 0 && (
              <Screen0_Splash onNavigate={navigateTo} lang={language} />
            )}

            {currentScreen === 1 && (
              <Screen1_Welcome
                onSelectRole={(r) => {
                  setSelectedRole(r);
                  setRegistrationData((prev) => ({ ...prev, role: r }));
                }}
                onNavigate={navigateTo}
                lang={language}
                onLanguageChange={setLanguage}
              />
            )}

            {currentScreen === 2 && (
              <Screen2_RegMethod
                role={selectedRole}
                toggles={featureToggles}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 3 && (
              <Screen3_ConsumerReg
                formData={registrationData}
                onUpdateFormData={updateRegistrationData}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 4 && (
              <Screen4_EmailVerification
                email={registrationData.email}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 5 && (
              <Screen5_ConsumerComplete
                email={registrationData.email}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 6 && (
              <Screen6_ProviderReg
                formData={registrationData}
                onUpdateFormData={updateRegistrationData}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 7 && (
              <Screen7_ProviderVerification
                email={registrationData.email}
                businessName={registrationData.businessName}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 8 && (
              <Screen8_ProviderComplete
                email={registrationData.email}
                businessName={registrationData.businessName}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 9 && (
              <Screen9_SignIn
                role={selectedRole}
                toggles={featureToggles}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 10 && (
              <Screen10_ForgotPassword
                email={registrationData.email}
                onUpdateEmail={(email) => updateRegistrationData({ email })}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 11 && (
              <Screen11_ResetPassword
                email={registrationData.email}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 'consumer_home' && (
              <ConsumerHomePreview
                email={registrationData.email}
                onNavigate={navigateTo}
                lang={language}
              />
            )}

            {currentScreen === 'provider_dashboard' && (
              <ProviderDashboardPreview
                email={registrationData.email}
                businessName={registrationData.businessName}
                onNavigate={navigateTo}
                lang={language}
              />
            )}
          </ContentCanvas>
        </DeviceFrame>

      </main>

      {/* Drawers & Modals */}
      <AdminTogglesDrawer
        isOpen={isAdminTogglesOpen}
        onClose={() => setIsAdminTogglesOpen(false)}
        toggles={featureToggles}
        onToggleChange={setFeatureToggles}
      />

      <AccessibilityDrawer
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={accessibilitySettings}
        onSettingsChange={setAccessibilitySettings}
      />

      <DesignSpecsModal
        isOpen={isDesignSpecsOpen}
        onClose={() => setIsDesignSpecsOpen(false)}
      />

      <ScreenFlowModal
        isOpen={isScreenFlowOpen}
        onClose={() => setIsScreenFlowOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={navigateTo}
        lang={language}
      />

      {/* Global Enterprise Notification Drawers & Toast Overlay */}
      <FloatingToastContainer onNavigate={navigateTo} lang={language} />
      <NotificationCenterDrawer onNavigate={navigateTo} lang={language} />
      <AIAssistantDrawer
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onNavigate={navigateTo}
        lang={language}
      />

      </div>
    </NotificationProvider>
  );
}
