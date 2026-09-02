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

export type ProviderCategory = 
  | 'Beauty Salon'
  | 'Laundry & Dry Cleaning'
  | 'Tailoring'
  | 'Shoe Fix & Repair'
  | 'Pet Care';

export type OrderStatus = 
  | 'NEW'
  | 'ACCEPTED'
  | 'CONFIRMED'
  | 'PICKUP_SCHEDULED'
  | 'IN_PROGRESS'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'COMPLETED'
  | 'CANCELLED';

export type CourierStatus = 
  | 'Awaiting Pickup'
  | 'Picked Up'
  | 'In Service'
  | 'Ready'
  | 'Out for Delivery'
  | 'Delivered';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface ProviderOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerDistrict: string;
  category: ProviderCategory;
  serviceTitle: string;
  items: OrderItem[];
  requestedDateTime: string;
  deliveryRequirement: 'Valet Pickup & Delivery' | 'In-Store Dropoff';
  courierStatus?: CourierStatus;
  estimatedPrice: number;
  customerNotes?: string;
  uploadedImages?: string[];
  status: OrderStatus;
  statusHistory: { status: OrderStatus; timestamp: string; note?: string }[];
  specialInstructions?: string;
  aiSummary?: string;
  aiDefectObservation?: string;
  aiSuggestedPricing?: number;
  aiSuggestedResponse?: string;
  unreadMessages?: number;
}

export interface ProviderMessage {
  id: string;
  orderId?: string;
  sender?: 'customer' | 'provider' | 'system' | 'ai';
  senderRole?: 'customer' | 'provider' | 'system' | 'ai';
  senderName: string;
  content?: string;
  text?: string;
  translatedContent?: string;
  timestamp: string;
  isStatusUpdate?: boolean;
  isRead?: boolean;
}

export interface ProviderBusinessProfile {
  businessName: string;
  crNumber: string;
  businessAddress: string;
  serviceCategory: ProviderCategory;
  contactPerson: string;
  phone: string;
  email: string;
  operatingHours: string;
  serviceAreas: string[];
  pickupDeliveryAvailable: boolean;
  basePricing: number;
  verified: boolean;
  description: string;
  rating: number;
  totalOrders: number;
}

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
  // Consumer Portal
  | 'consumer_home'
  // Provider Flow Screens
  | 'provider_dashboard'
  | 'provider_orders'
  | 'provider_order_details'
  | 'provider_messages'
  | 'provider_profile'
  | 'provider_notifications';

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
  businessNumber?: string; // CR Number
  businessPhone?: string;
  businessAddress?: string;
  serviceCategory?: ProviderCategory;
  contactPerson?: string;
  operatingHours?: string;
  serviceAreas?: string[];
  pickupDeliveryAvailable?: boolean;
  basePricing?: number;
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

