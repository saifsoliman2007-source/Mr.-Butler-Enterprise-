export type Role = 'consumer' | 'provider';

export type Orientation = 'portrait' | 'landscape';

export type DeviceType = 
  | 'android_phone' 
  | 'iphone' 
  | 'foldable_folded' 
  | 'foldable_unfolded' 
  | 'android_tablet' 
  | 'ipad' 
  | 'desktop';

export type ThemeMode = 'light' | 'dark' | 'system';

export type Language = 'en' | 'ar' | 'fr' | 'de' | 'ru' | 'es';

export type ScreenId = 
  | 0  // Splash / Welcome to Mr. Butler
  | 1  // Welcome & Role Selection
  | 2  // Reg Method / Authentication Landing
  | 3  // Consumer Reg / Create Account
  | 4  // Consumer Email Verification
  | 5  // Consumer Complete
  | 6  // Provider Reg
  | 7  // Provider Verification
  | 8  // Provider Complete
  | 9  // Sign In
  | 10 // Forgot Password
  | 11 // Reset Password
  | 'welcome'
  | 'create_account'
  | 'verify_email'
  // Services
  | 'services'
  | 'our_services'
  | 'book_dry_cleaning'
  | 'book_tailoring'
  | 'book_shoe_repair'
  | 'book_beauty_salon'
  | 'book_pet_care'
  // Concierge & Drive Vault
  | 'concierge'
  | 'concierge_offers'
  | 'concierge_recommendations'
  | 'concierge_special_requests'
  | 'google_drive'
  // Orders
  | 'orders'
  | 'orders_active'
  | 'orders_previous'
  | 'orders_details'
  // Foundation
  | 'foundation'
  | 'foundation_enterprise'
  | 'foundation_brand'
  | 'foundation_components'
  | 'foundation_design'
  | 'foundation_accessibility'
  // Portals
  | 'consumer_home'
  | 'provider_dashboard';

export interface FeatureToggles {
  googleAuth: boolean;
  facebookAuth: boolean;
  appleAuth: boolean;
  emailReg: boolean;
  emailOtp: boolean;
  phoneOtp: boolean; // default false per spec
}

export interface AccessibilitySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSizeScale: number; // 80 - 150
  screenReaderActive: boolean;
  liveAnnouncements: string[];
}

export interface RegistrationData {
  role: Role;
  email: string;
  password: string;
  confirmPassword: string;
  // Provider fields
  businessName?: string;
  businessPhone?: string;
  businessAddress?: string;
  verificationCode?: string;
}

export interface AuthState {
  currentScreen: ScreenId;
  selectedRole: Role;
  userEmail: string;
  isLoggedIn: boolean;
  registrationData: RegistrationData;
  otpSentTo: string | null;
  otpTimer: number; // seconds
}

export interface ServiceCategory {
  id: string;
  titleKey: string;
  iconName: string;
  descriptionKey: string;
  gradient: string;
  tag: string;
}
