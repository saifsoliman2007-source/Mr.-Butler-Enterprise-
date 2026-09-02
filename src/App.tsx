import React, { useState, useEffect, useCallback } from 'react';
import { 
  ScreenId, 
  Role, 
  ThemeMode, 
  Language, 
  FeatureToggles, 
  AccessibilitySettings, 
  RegistrationData
} from './types';
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

// Unified Service Suite Screens
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

// Service Provider Suite Screens
import { ScreenProviderDashboard } from './components/screens/ScreenProviderDashboard';
import { ScreenProviderOrders } from './components/screens/ScreenProviderOrders';
import { ScreenProviderOrderDetails } from './components/screens/ScreenProviderOrderDetails';
import { ScreenProviderMessages } from './components/screens/ScreenProviderMessages';
import { ScreenProviderProfile } from './components/screens/ScreenProviderProfile';
import { INITIAL_PROVIDER_ORDERS, INITIAL_PROVIDER_PROFILE } from './data/providerData';
import { ProviderOrder, ProviderBusinessProfile, OrderStatus } from './types';

// Helper to determine if bottom nav should be displayed
function shouldShowBottomNav(screen: ScreenId): boolean {
  const mainScreens = new Set([
    'welcome',
    'our_services',
    'services',
    'concierge',
    'concierge_offers',
    'concierge_recommendations',
    'concierge_special_requests',
    'orders',
    'orders_active',
    'orders_previous',
    'orders_details',
    'foundation',
    'foundation_enterprise',
    'foundation_brand',
    'foundation_components',
    'foundation_design',
    'foundation_accessibility',
    'consumer_home',
    'provider_dashboard',
    'provider_orders',
    'provider_messages',
    'provider_profile',
  ]);
  return mainScreens.has(String(screen));
}

export default function App() {
  // Navigation & History State synchronized with Browser & Mobile History
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) return hash as ScreenId;
    return 'welcome';
  });

  const [selectedRole, setSelectedRole] = useState<Role>('consumer');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('en');

  // Drawers
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Feature Toggles
  const [featureToggles] = useState<FeatureToggles>({
    googleAuth: true,
    facebookAuth: true,
    appleAuth: true,
    emailReg: true,
    emailOtp: true,
    phoneOtp: false,
  });

  // Accessibility Settings
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    reducedMotion: false,
    highContrast: false,
    fontSizeScale: 100,
    screenReaderActive: true,
    liveAnnouncements: [],
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

  // Service Provider State
  const [providerProfile, setProviderProfile] = useState<ProviderBusinessProfile>(INITIAL_PROVIDER_PROFILE);
  const [providerOrders, setProviderOrders] = useState<ProviderOrder[]>(INITIAL_PROVIDER_ORDERS);
  const [selectedProviderOrder, setSelectedProviderOrder] = useState<ProviderOrder>(INITIAL_PROVIDER_ORDERS[0]);

  const handleUpdateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus, note?: string) => {
    setProviderOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const updated = {
            ...order,
            status: newStatus,
            statusHistory: [
              ...order.statusHistory,
              { status: newStatus, timestamp, note: note || `Status updated to ${newStatus}` }
            ]
          };
          if (selectedProviderOrder?.id === orderId) {
            setSelectedProviderOrder(updated);
          }
          return updated;
        }
        return order;
      })
    );
  }, [selectedProviderOrder]);

  const handleUpdateProviderProfile = useCallback((updated: ProviderBusinessProfile) => {
    setProviderProfile(updated);
  }, []);

  const handleSelectProviderOrder = useCallback((order: ProviderOrder) => {
    setSelectedProviderOrder(order);
  }, []);

  // Navigate to screen with full Android & iOS history integration
  const navigateTo = useCallback((screen: ScreenId) => {
    setCurrentScreen(screen);
    window.history.pushState({ screen }, '', `#${screen}`);
    
    // Scroll window smoothly to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to native Android Back button, iOS swipe back, and Browser Back/Forward
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.screen) {
        setCurrentScreen(event.state.screen);
      } else {
        const hash = window.location.hash.replace('#', '');
        setCurrentScreen(hash ? (hash as ScreenId) : 'welcome');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  return (
    <NotificationProvider>
      <div 
        className={`min-h-screen w-full bg-[#F8FAFC] dark:bg-[#0B1120] text-[#1E293B] dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 overflow-x-hidden ${
          accessibilitySettings.highContrast ? 'contrast-125 saturate-150 ring-1 ring-[#00444D]' : ''
        }`}
        style={{
          fontSize: `${accessibilitySettings.fontSizeScale}%`,
          paddingTop: 'max(env(safe-area-inset-top, 0px), 0px)',
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 0px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 0px)',
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Main Responsive Viewport Container */}
        <main className="flex-1 flex flex-col w-full min-h-0 relative">
          
          {/* Active Screen Rendering */}
          {currentScreen === 'welcome' && (
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

          {/* Provider Flow Unified Screens */}
          {currentScreen === 'provider_dashboard' && (
            <ScreenProviderDashboard
              profile={providerProfile}
              orders={providerOrders}
              onNavigate={navigateTo}
              onSelectOrder={handleSelectProviderOrder}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              lang={language}
            />
          )}

          {currentScreen === 'provider_orders' && (
            <ScreenProviderOrders
              orders={providerOrders}
              onNavigate={navigateTo}
              onSelectOrder={handleSelectProviderOrder}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              lang={language}
            />
          )}

          {currentScreen === 'provider_order_details' && (
            <ScreenProviderOrderDetails
              order={selectedProviderOrder || providerOrders[0]}
              onNavigate={navigateTo}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onOpenChat={(orderId) => {
                const target = providerOrders.find(o => o.id === orderId) || providerOrders[0];
                handleSelectProviderOrder(target);
                navigateTo('provider_messages');
              }}
              lang={language}
            />
          )}

          {currentScreen === 'provider_messages' && (
            <ScreenProviderMessages
              orders={providerOrders}
              selectedOrderId={selectedProviderOrder?.id}
              onNavigate={navigateTo}
              onSelectOrder={handleSelectProviderOrder}
              lang={language}
            />
          )}

          {currentScreen === 'provider_profile' && (
            <ScreenProviderProfile
              profile={providerProfile}
              onUpdateProfile={handleUpdateProviderProfile}
              onNavigate={navigateTo}
              lang={language}
            />
          )}
        </main>

        {/* Global Bottom Navigation Bar */}
        {shouldShowBottomNav(currentScreen) && (
          <BottomNavigationBar
            currentScreen={currentScreen}
            onNavigate={navigateTo}
            lang={language}
            role={String(currentScreen).startsWith('provider_') ? 'provider' : selectedRole}
          />
        )}

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
