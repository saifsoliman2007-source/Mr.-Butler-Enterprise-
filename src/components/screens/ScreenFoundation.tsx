import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { translations } from '../../data/translations';
import { getLocalizedNavLabel } from '../navigation/NavHierarchy';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { EGEC } from '../EGEC';
import { 
  TextInput, 
  EmailInput, 
  PhoneInput, 
  PasswordInput, 
  OTPInput, 
  AddressInput, 
  AddressValue, 
  SearchInput, 
  Select, 
  DatePicker, 
  TimePicker, 
  Checkbox, 
  RadioGroup, 
  Toggle, 
  SegmentedControl, 
  Upload, 
  UploadedFile, 
  ImageInput, 
  LanguageSelector 
} from '../forms';
import { useNotifications, NotificationCategory } from '../../context/NotificationContext';
import { ServiceCardState } from '../states/ServiceCardState';
import { EnterpriseStateBoundary, ComponentStateMode } from '../states/EnterpriseStateBoundary';
import { 
  LoadingSkeleton, 
  ServiceCardSkeleton, 
  OfferCardSkeleton, 
  OrderCardSkeleton, 
  PremiumCardSkeleton, 
  EnterpriseCardSkeleton 
} from '../states/LoadingSkeleton';
import { EmptyStateView } from '../states/EmptyStateView';
import { ErrorStateView } from '../states/ErrorStateView';
import { DualPaneLayout } from '../responsive/DualPaneLayout';
import { ButlerAIAssistant } from '../ai/ButlerAIAssistant';
import {
  PrimaryButton,
  SecondaryButton,
  IconButton,
  EnterpriseCard,
  ServiceCard,
  PremiumCard,
  OfferCard,
  OrderCard,
  ServiceEntryComponent,
  RELEASE_1_SERVICES,
  ServiceEntryLayout,
  Modal,
  BottomSheet,
  ServiceSelector,
  BookingSummary,
  ConfirmationPanel
} from '../ui';
import { 
  Layers, 
  Building2, 
  Crown, 
  Palette, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  Code, 
  CheckCircle2,
  Maximize2,
  Bell,
  Smartphone,
  Bot,
  Activity,
  RefreshCw,
  SlidersHorizontal,
  AlertTriangle,
  Play,
  CheckCircle,
  Info,
  Package,
  Calendar,
  CreditCard,
  Megaphone,
  Cpu,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface ScreenFoundationProps {
  subSection?: 'overview' | 'enterprise' | 'brand' | 'components' | 'design' | 'accessibility';
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const ScreenFoundation: React.FC<ScreenFoundationProps> = ({
  subSection = 'overview',
  onNavigate,
  lang,
  onLanguageChange,
}) => {
  const isRTL = lang === 'ar';
  const t = translations[lang] || translations.en;
  const { notify, openNotificationCenter, history, clearAll } = useNotifications();
  
  const [activeTab, setActiveTab] = useState<
    'enterprise' | 'brand' | 'components' | 'states' | 'notifications' | 'responsive' | 'ai_assistant' | 'design' | 'accessibility'
  >(
    subSection === 'enterprise'
      ? 'enterprise'
      : subSection === 'brand'
        ? 'brand'
        : subSection === 'components'
          ? 'components'
          : subSection === 'design'
            ? 'design'
            : subSection === 'accessibility'
              ? 'accessibility'
              : 'enterprise'
  );

  // Component State Simulator
  const [selectedComponentState, setSelectedComponentState] = useState<ComponentStateMode>('available');
  const [customErrorMsg, setCustomErrorMsg] = useState('Payment authorization gateway timed out. Please retry.');
  const [customEmptyMsg, setCustomEmptyMsg] = useState('No scheduled bespoke valet appointments found for this period.');
  const [customUnavailableMsg, setCustomUnavailableMsg] = useState('Shoe restoration artisan studio is closed for seasonal leather restocking.');

  // Notification Test Bench State
  const [testCategory, setTestCategory] = useState<NotificationCategory>('booking_update');
  const [testTitle, setTestTitle] = useState('Valet En Route');
  const [testMessage, setTestMessage] = useState('Sir, your white-glove driver will arrive at Penthouse Suite 8B in 10 minutes.');
  const [testPriority, setTestPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('high');
  const [testSticky, setTestSticky] = useState(false);
  const [testSound, setTestSound] = useState(true);

  // Responsive Dual Pane Demo State
  const [selectedServiceItem, setSelectedServiceItem] = useState<string>('dry_cleaning');

  // Interactive Form Primitives Playground States
  const [sampleText, setSampleText] = useState('Master Bruce Wayne');
  const [sampleEmail, setSampleEmail] = useState('bruce@wayne-enterprises.com');
  const [samplePhone, setSamplePhone] = useState('50 888 9999');
  const [samplePassword, setSamplePassword] = useState('GothamSecret2026!');
  const [sampleOtp, setSampleOtp] = useState('742819');
  const [sampleAddress, setSampleAddress] = useState<AddressValue>({
    street: '1007 Mountain Drive',
    unit: 'Penthouse Suite 8B',
    city: 'Dubai Marina',
    postalCode: '00000',
  });
  const [sampleSearch, setSampleSearch] = useState('');
  const [sampleSelect, setSampleSelect] = useState('dry_clean');
  const [sampleDate, setSampleDate] = useState(new Date().toISOString().split('T')[0]);
  const [sampleTime, setSampleTime] = useState('08:00 AM - 10:00 AM');
  const [sampleCheckbox, setSampleCheckbox] = useState(true);
  const [sampleRadio, setSampleRadio] = useState('express');
  const [sampleToggle, setSampleToggle] = useState(true);
  const [sampleSegment, setSampleSegment] = useState<'consumer' | 'provider'>('consumer');
  const [sampleFiles, setSampleFiles] = useState<UploadedFile[]>([
    { name: 'bespoke-garment-care.pdf', size: '2.4 MB', type: 'application/pdf' },
  ]);
  const [sampleImage, setSampleImage] = useState<string | null>(null);

  // Interactive UI Showcase Demo States
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDemoBottomSheetOpen, setIsDemoBottomSheetOpen] = useState(false);
  const [demoBtnLoading, setDemoBtnLoading] = useState(false);
  const [demoSelectedCard, setDemoSelectedCard] = useState('dry_clean');
  const [demoAppliedPromo, setDemoAppliedPromo] = useState('IMPERIAL15');
  const [demoSelectedService, setDemoSelectedService] = useState('dry_cleaning');
  const [demoServiceLayout, setDemoServiceLayout] = useState<ServiceEntryLayout>('grid');

  return (
    <div className="w-full flex-1 flex flex-col">
      <RecurringAppHeader 
        currentScreen="foundation" 
        onNavigate={onNavigate} 
        lang={lang} 
        onLanguageChange={onLanguageChange}
      />
      <div 
        dir={isRTL ? 'rtl' : 'ltr'}
        className="min-h-full w-full bg-[#EFF4FF] dark:bg-[#0B1120] text-slate-900 dark:text-white p-4 sm:p-6 lg:p-8 space-y-6 select-none flex-1"
      >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#00444D] via-[#0D5D68] to-[#002D33] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE088]/20 border border-[#FFE088]/30 text-[#FFE088] text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navFoundation', lang)}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            {isRTL ? 'الأسس المعمارية ومكتبة المكونات' : 'Design & Architecture Foundation'}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-xl font-light">
            {isRTL 
              ? 'مكتبة المكونات المشتركة، معايير إمكانية الوصول، وهوية العلامة التجارية الفاخرة.' 
              : 'Enterprise design tokens, brand identity systems, shared form primitives, and accessibility criteria.'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/15 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('enterprise')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'enterprise'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navEnterpriseInfo', lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab('brand')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'brand'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navBrand', lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'components'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navSharedComponents', lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab('states')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'states'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{isRTL ? 'مصفوفة حالات المكونات' : 'Component States (6 Modes)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{isRTL ? 'معمارية الإشعارات المشتركة' : 'Notification Architecture (9 Types)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('responsive')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'responsive'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isRTL ? 'الهواتف القابلة للطي والتصميم الثنائي' : 'Foldables & Dual-Pane'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_assistant')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'ai_assistant'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{isRTL ? 'مساعد باتلر الذكي والضوابط' : 'Butler AI & Safeguards'}</span>
          </button>

          <button
            onClick={() => setActiveTab('design')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'design'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navDesign', lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab('accessibility')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'accessibility'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navAccessibility', lang)}</span>
          </button>
        </div>
      </div>

      {/* Tab: Enterprise Information */}
      {activeTab === 'enterprise' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold">Architecture Matrix</span>
              <h2 className="font-serif text-xl font-bold text-[#00444D] dark:text-[#ABEDFA]">
                Application Shell & State Governance
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#B0EDF4] text-[#00444D] dark:bg-slate-800 dark:text-[#ABEDFA]">
              React 18 + Tailwind
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Persistent Shell
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Top bar header, global drawer, and mobile bottom tab bar remain mounted and synchronized with the state machine.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Safe Area Compliance
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                16dp Mobile, 24dp Tablet, 32dp Desktop margins. Physical edge boundaries never clip interactive content.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                RTL & Multilingual
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                All navigation labels and descriptions derived strictly from the localization dictionary with Arabic RTL support.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Brand Identity */}
      {activeTab === 'brand' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-[#EFF4FF] to-[#B0EDF4]/30 dark:from-slate-800 dark:to-slate-900 border border-[#D9E3F6] dark:border-slate-700">
            <EGEC size="lg" shape="rounded-full" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />
            <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
              <h3 className="font-serif text-2xl font-bold text-[#00444D] dark:text-[#ABEDFA]">
                The Imperial Valet Emblem (EGEC)
              </h3>
              <p className="font-serif italic text-sm text-slate-600 dark:text-slate-300">
                Established For Your Comfort
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md pt-1">
                Rendered with an authentic 24k gold leaf bezel (`#CCA730`), deep teal lacquer core (`#00444D`), and dynamic verified beacon indicator.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Shared Components & Form Primitives Interactive Showcase */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold">Enterprise Library</span>
              <h2 className="font-serif text-xl font-bold text-[#00444D] dark:text-[#ABEDFA]">
                Shared Form Primitives Suite
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Unified form components utilized across Authentication (MRES), Service Booking, Concierge, and Profile management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* 1. Text & Email Input */}
              <div className="p-5 rounded-2xl bg-[#F8F9FF] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-750 space-y-4">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">Text & Email Inputs</span>
                <TextInput
                  label="Text Input"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  placeholder="Enter full name"
                  showClearButton
                  onClear={() => setSampleText('')}
                  isRTL={isRTL}
                />
                <EmailInput
                  label="Email Input"
                  value={sampleEmail}
                  onChange={(e) => setSampleEmail(e.target.value)}
                  isRTL={isRTL}
                />
              </div>

              {/* 2. Phone & Password Input */}
              <div className="p-5 rounded-2xl bg-[#F8F9FF] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-750 space-y-4">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">Phone & Password Inputs</span>
                <PhoneInput
                  label="Phone Input with Dial Code"
                  value={samplePhone}
                  onChange={setSamplePhone}
                  isRTL={isRTL}
                />
                <PasswordInput
                  label="Password Input with Strength Indicator"
                  value={samplePassword}
                  onChange={(e) => setSamplePassword(e.target.value)}
                  showStrength
                  isRTL={isRTL}
                />
              </div>

              {/* 3. OTP 6-Digit Component */}
              <div className="p-5 rounded-2xl bg-[#F8F9FF] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-750 space-y-4 md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">Enterprise 6-Digit OTP Component</span>
                  <span className="text-[10px] text-slate-400 font-mono">Auto-Focus • LTR Safe • Resend Timer • ARIA Live</span>
                </div>
                <div className="max-w-md mx-auto py-2">
                  <OTPInput
                    length={6}
                    value={sampleOtp}
                    onChange={setSampleOtp}
                    isRTL={isRTL}
                  />
                </div>
              </div>

              {/* 4. Address Input */}
              <div className="p-5 rounded-2xl bg-[#F8F9FF] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-750 space-y-4 md:col-span-2">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">Address Input with Saved Presets</span>
                <AddressInput
                  label="Service Destination Address"
                  value={sampleAddress}
                  onChange={setSampleAddress}
                  isRTL={isRTL}
                />
              </div>

              {/* 5. Date & Time Pickers */}
              <div className="p-5 rounded-2xl bg-[#F8F9FF] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-750 space-y-4">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">Date & Time Pickers</span>
                <DatePicker
                  label="Service Date"
                  value={sampleDate}
                  onChange={setSampleDate}
                  isRTL={isRTL}
                />
                <TimePicker
                  label="Service Time Window"
                  value={sampleTime}
                  onChange={setSampleTime}
                  isRTL={isRTL}
                />
              </div>

              {/* 6. Select & Search */}
              <div className="p-5 rounded-2xl bg-[#F8F9FF] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-750 space-y-4">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">Select & Search Inputs</span>
                <SearchInput
                  value={sampleSearch}
                  onChange={setSampleSearch}
                  isRTL={isRTL}
                />
                <Select
                  label="Service Category"
                  value={sampleSelect}
                  onChange={setSampleSelect}
                  options={[
                    { value: 'dry_clean', label: 'Dry Cleaning & Laundry', description: 'White-glove garment valet' },
                    { value: 'tailoring', label: 'Tailoring & Alterations', description: 'Bespoke precision fit' },
                    { value: 'shoe_fix', label: 'Shoe Fix & Repair', description: 'Italian leather cobbler' },
                  ]}
                  isRTL={isRTL}
                />
              </div>

              {/* 7. Checkbox, Radio, Toggle & SegmentedControl */}
              <div className="p-5 rounded-2xl bg-[#F8F9FF] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-750 space-y-4 md:col-span-2">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">Selection Controls & Segment Switchers</span>
                
                <SegmentedControl<'consumer' | 'provider'>
                  options={[
                    { value: 'consumer', label: 'Consumer Account' },
                    { value: 'provider', label: 'Provider Account' },
                  ]}
                  value={sampleSegment}
                  onChange={setSampleSegment}
                  isRTL={isRTL}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-3">
                    <Checkbox
                      checked={sampleCheckbox}
                      onChange={setSampleCheckbox}
                      label="Express Courier Notification"
                      description="Send SMS arrival alerts"
                      isRTL={isRTL}
                    />
                  </div>

                  <div className="space-y-3">
                    <Toggle
                      checked={sampleToggle}
                      onChange={setSampleToggle}
                      label="Eco-Solvent Wash"
                      description="100% Organic solvent"
                      isRTL={isRTL}
                    />
                  </div>

                  <div className="space-y-3">
                    <RadioGroup
                      name="sample-speed"
                      value={sampleRadio}
                      onChange={setSampleRadio}
                      options={[
                        { value: 'standard', label: 'Standard Delivery', tag: 'Free' },
                        { value: 'express', label: 'Priority Courier', tag: '+$15' },
                      ]}
                      isRTL={isRTL}
                    />
                  </div>
                </div>
              </div>

              {/* 8. Upload & ImageInput */}
              <div className="p-5 rounded-2xl bg-[#F8F9FF] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-750 space-y-4 md:col-span-2">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">Upload & Image Capture Primitives (ImageUploader)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Upload
                    files={sampleFiles}
                    onFilesChange={setSampleFiles}
                    isRTL={isRTL}
                  />
                  <ImageInput
                    value={sampleImage}
                    onChange={setSampleImage}
                    isRTL={isRTL}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section: Buttons & Action Controls */}
          <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold">Action Suite</span>
                <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white">
                  Buttons & Interactive Controls (Primary, Secondary, Icon)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setDemoBtnLoading(true);
                    setTimeout(() => setDemoBtnLoading(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  {demoBtnLoading ? 'Simulating...' : 'Simulate 2s Loading State'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Buttons */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-3">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">PrimaryButton</span>
                <div className="space-y-2">
                  <PrimaryButton size="sm" isLoading={demoBtnLoading} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Primary Small
                  </PrimaryButton>
                  <PrimaryButton size="md" isLoading={demoBtnLoading} className="w-full" leftIcon={<Sparkles className="w-4 h-4 text-[#FFE088]" />}>
                    Primary Medium (Default)
                  </PrimaryButton>
                  <PrimaryButton size="lg" isLoading={demoBtnLoading} className="w-full">
                    Primary Large CTA
                  </PrimaryButton>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-3">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">SecondaryButton</span>
                <div className="space-y-2">
                  <SecondaryButton size="sm" isLoading={demoBtnLoading}>
                    Secondary Small
                  </SecondaryButton>
                  <SecondaryButton size="md" isLoading={demoBtnLoading} className="w-full">
                    Secondary Medium
                  </SecondaryButton>
                  <SecondaryButton size="lg" isLoading={demoBtnLoading} className="w-full">
                    Secondary Large
                  </SecondaryButton>
                </div>
              </div>

              {/* Icon Buttons */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-3">
                <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">IconButton (Variants)</span>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <IconButton icon={<Sparkles className="w-4 h-4" />} label="Gold Action" variant="gold" size="sm" />
                  <IconButton icon={<Package className="w-4 h-4" />} label="Primary Action" variant="primary" size="md" />
                  <IconButton icon={<Bell className="w-5 h-5" />} label="Secondary Action" variant="secondary" size="lg" />
                  <IconButton icon={<Crown className="w-4 h-4" />} label="Ghost Action" variant="ghost" size="md" />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Cards Suite (ServiceCard, PremiumCard, OfferCard, OrderCard) */}
          <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold">Surface Components</span>
              <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white">
                Cards Suite (ServiceCard, PremiumCard, OfferCard, OrderCard)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. ServiceCard */}
              <ServiceCard
                title="Dry Cleaning & Laundry"
                subtitle="White-glove garment pressing & ozone sterilization"
                category="Garment Care"
                price="From $24.00"
                eta="4 Hours"
                badge="Popular"
                isSelected={demoSelectedCard === 'dry_clean'}
                onSelect={() => setDemoSelectedCard('dry_clean')}
              />

              {/* 2. PremiumCard */}
              <PremiumCard
                tierName="Imperial VIP"
                title="Bespoke Concierge"
                description="Unlimited priority pickup with personal master tailor access."
                benefits={['Same-day turnaround', 'Wardrobe ozonization']}
                actionLabel="View Tier"
                onAction={() => notify({ category: 'info', title: 'Imperial VIP Tier', message: 'You have accessed the VIP Privileges tier.' })}
              />

              {/* 3. OfferCard */}
              <OfferCard
                promoCode={demoAppliedPromo}
                title="Royal Spring Privilege"
                discount="15% OFF"
                validUntil="Sep 30, 2026"
                onApply={(code) => {
                  notify({ category: 'success', title: 'Promo Code Applied', message: `Privilege code ${code} applied to your cart.` });
                }}
              />

              {/* 4. OrderCard */}
              <OrderCard
                orderId="#MB-8849"
                serviceType="Bespoke Suit Alteration"
                status="in_progress"
                statusLabel="In Fitting Studio"
                itemsCount={2}
                totalPrice="$90.00"
                date="Today, 02:30 PM"
                onViewDetails={() => onNavigate('orders')}
              />
            </div>
          </div>

          {/* Section: Service Entry Component (Release 1 Services - Req 13 & 14) */}
          <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold">Release 1 Architecture</span>
                <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white">
                  Universal Service Entry System (5 Core Services)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Consistent properties across 5 layout variants: grid, horizontal, chip, bar, and tile.
                </p>
              </div>

              {/* Layout Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {(['grid', 'horizontal', 'chip', 'bar', 'tile'] as ServiceEntryLayout[]).map((layout) => (
                  <button
                    key={layout}
                    onClick={() => setDemoServiceLayout(layout)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase font-mono transition-all cursor-pointer ${
                      demoServiceLayout === layout
                        ? 'bg-[#00444D] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {layout}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Entry Showcase rendered in active layout */}
            <div className={
              demoServiceLayout === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : demoServiceLayout === 'horizontal'
                  ? 'space-y-3'
                  : demoServiceLayout === 'chip'
                    ? 'flex flex-wrap gap-2.5'
                    : demoServiceLayout === 'bar'
                      ? 'space-y-2.5'
                      : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3'
            }>
              {RELEASE_1_SERVICES.map((srv) => (
                <ServiceEntryComponent
                  key={srv.id}
                  service={srv}
                  layout={demoServiceLayout}
                  isSelected={demoSelectedService === srv.id}
                  onSelect={(id) => {
                    setDemoSelectedService(id);
                    notify({
                      category: 'info',
                      title: srv.name,
                      message: `Selected ${srv.name}. Starting ${srv.startingPrice}. ${srv.availability}`
                    });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Section: Overlays, Modals, BottomSheet, Drawers */}
          <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold">Feedback & Overlay Suite</span>
              <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white">
                Modal, BottomSheet, Drawer & Toast Triggers
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:border-[#00444D] text-left transition cursor-pointer"
              >
                <h4 className="font-bold text-xs text-[#00444D] dark:text-[#ABEDFA]">Open Enterprise Modal</h4>
                <p className="text-[11px] text-slate-500 mt-1">Accessible dialog with backdrop and header/footer slots.</p>
              </button>

              <button
                onClick={() => setIsDemoBottomSheetOpen(true)}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:border-[#00444D] text-left transition cursor-pointer"
              >
                <h4 className="font-bold text-xs text-[#00444D] dark:text-[#ABEDFA]">Open Mobile BottomSheet</h4>
                <p className="text-[11px] text-slate-500 mt-1">Slide-up sheet with drag handle and responsive constraints.</p>
              </button>

              <button
                onClick={openNotificationCenter}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:border-[#00444D] text-left transition cursor-pointer"
              >
                <h4 className="font-bold text-xs text-[#00444D] dark:text-[#ABEDFA]">Open Notification Drawer</h4>
                <p className="text-[11px] text-slate-500 mt-1">Slide-in history drawer with 9 notification categories.</p>
              </button>

              <button
                onClick={() => {
                  notify({
                    category: 'success',
                    title: 'Interactive Toast Fired',
                    message: 'Floating toast rendered via independent NotificationContext.',
                    priority: 'normal'
                  });
                }}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:border-[#00444D] text-left transition cursor-pointer"
              >
                <h4 className="font-bold text-xs text-[#00444D] dark:text-[#ABEDFA]">Trigger Floating Toast</h4>
                <p className="text-[11px] text-slate-500 mt-1">Non-blocking toast with sound and action buttons.</p>
              </button>
            </div>
          </div>

          {/* Section: Service Selector, Booking Summary & Confirmation Panel */}
          <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold">Booking Flow Primitives</span>
              <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white">
                ServiceSelector, BookingSummary & ConfirmationPanel
              </h3>
            </div>

            <div className="space-y-6">
              {/* Service Selector Component */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  ServiceSelector Component (`ServiceSelector.tsx`)
                </span>
                <ServiceSelector
                  selectedServiceId={demoSelectedService}
                  onSelectService={setDemoSelectedService}
                />
              </div>

              {/* Booking Summary & Confirmation Panel in 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    BookingSummary Component (`BookingSummary.tsx`)
                  </span>
                  <BookingSummary
                    serviceName="Bespoke Wardrobe Valet"
                    items={[
                      { id: '1', name: 'Two-Piece Silk Tuxedo Suit', quantity: 2, unitPrice: 35.00 },
                      { id: '2', name: 'Artisan Leather Shoes Buff & Wax', quantity: 1, unitPrice: 38.00 },
                      { id: '3', name: 'Egyptian Cotton Dress Shirts', quantity: 3, unitPrice: 12.00 }
                    ]}
                    discountAmount={15.00}
                    promoCode="IMPERIAL15"
                    onProceedToPayment={() => {
                      notify({
                        category: 'payment_update',
                        title: 'Demo Payment Authorized',
                        message: 'Payment simulation completed for BookingSummary component.',
                        priority: 'normal'
                      });
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    ConfirmationPanel Component (`ConfirmationPanel.tsx`)
                  </span>
                  <ConfirmationPanel
                    orderId="MB-2026-VIP"
                    serviceTitle="Bespoke Wardrobe Valet Service"
                    totalPaid="$148.50"
                    onTrackOrder={() => onNavigate('orders')}
                    onReturnHome={() => onNavigate('our_services')}
                    onDownloadReceipt={() => {
                      notify({
                        category: 'system',
                        title: 'Invoice Downloaded',
                        message: 'PDF receipt saved to user downloads.'
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal Demo */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Enterprise Modal Primitive"
        subtitle="Accessible dialog component supporting full keyboard focus trap and ARIA compliance"
        footer={
          <>
            <SecondaryButton onClick={() => setIsDemoModalOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={() => {
                setIsDemoModalOpen(false);
                notify({ category: 'success', title: 'Modal Action Confirmed', message: 'Action successfully processed inside modal dialog.' });
              }}
            >
              Confirm Action
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <p>
            This enterprise modal conforms to the MEDS Design System specification:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <li>Strict backdrop blur with click-outside dismissal</li>
            <li>Header with optional title, subtitle, and close button</li>
            <li>Scroll-constrained body area for multi-form workflows</li>
            <li>Sticky footer for primary and secondary call-to-actions</li>
          </ul>
        </div>
      </Modal>

      {/* Interactive Bottom Sheet Demo */}
      <BottomSheet
        isOpen={isDemoBottomSheetOpen}
        onClose={() => setIsDemoBottomSheetOpen(false)}
        title="Mobile BottomSheet Primitive"
        subtitle="Swipe-friendly slide-up sheet designed for mobile and compact viewports"
        footer={
          <PrimaryButton className="w-full" onClick={() => setIsDemoBottomSheetOpen(false)}>
            Close Sheet
          </PrimaryButton>
        }
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <p>
            The BottomSheet primitive provides mobile-optimized interaction patterns:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Design Pattern:</span>
              <span className="font-bold text-[#00444D] dark:text-[#ABEDFA]">MEDS-BS-01</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Drag Handle:</span>
              <span className="text-emerald-600 font-bold">Enabled</span>
            </div>
          </div>
        </div>
      </BottomSheet>

      {/* Tab: Enterprise Component States Playground */}
      {activeTab === 'states' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#00444D] dark:text-[#ABEDFA] uppercase font-bold tracking-wider">
                Resilient Non-Happy Path Protocol
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#00444D] dark:text-white">
                Enterprise Component State Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Every MEDS enterprise component rigorously defines 6 standard states: Available, Loading, Empty, Error, Disabled, and Temporarily Unavailable.
              </p>
            </div>

            {/* Live State Switcher */}
            <div className="flex items-center gap-1.5 bg-[#F1F5F9] dark:bg-slate-800 p-1.5 rounded-2xl flex-wrap">
              {(['available', 'loading', 'empty', 'error', 'disabled', 'unavailable'] as ComponentStateMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedComponentState(mode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    selectedComponentState === mode
                      ? 'bg-[#00444D] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Service Card State Matrix */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#00444D] dark:text-[#ABEDFA] flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>Service Card (Interactive State Switcher)</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">
                Active Mode: <strong className="text-[#00444D] dark:text-[#ABEDFA] uppercase">{selectedComponentState}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Controlled by active state selector */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Interactive Service Card</span>
                <ServiceCardState
                  mode={selectedComponentState}
                  title="Dry Cleaning & Laundry"
                  subtitle="White-glove garment pressing & ozone sanitization"
                  tag="Popular"
                  price="From $24.00"
                  eta="Same-Day 4hr Turnaround"
                  icon={Sparkles}
                  onSelect={() => onNavigate('book_dry_cleaning')}
                  onRetry={() => setSelectedComponentState('available')}
                  errorMessage={customErrorMsg}
                  emptyMessage={customEmptyMsg}
                  unavailableReason={customUnavailableMsg}
                />
              </div>

              {/* Card 2: Bespoke Tailoring Card (Shows Available State) */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Baseline Available State</span>
                <ServiceCardState
                  mode="available"
                  title="Tailoring & Alterations"
                  subtitle="Bespoke master stitch, seam tapering & fitting"
                  tag="Bespoke"
                  price="From $45.00"
                  eta="Next-Day Express"
                  icon={Crown}
                  onSelect={() => onNavigate('book_tailoring')}
                />
              </div>

              {/* Card 3: Temporarily Unavailable State */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Unavailable State Fallback</span>
                <ServiceCardState
                  mode="unavailable"
                  title="Shoe Fix & Repair"
                  subtitle="Artisan leather buffing & sole restoration"
                  tag="Artisan"
                  price="From $38.00"
                  eta="2 Days"
                  icon={Package}
                  unavailableReason="Master Cobbler is currently off-duty. Re-opens tomorrow at 08:00 AM."
                  onSelect={() => onNavigate('book_shoe_repair')}
                />
              </div>
            </div>
          </div>

          {/* Standalone Error & Empty State Primitives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            {/* Empty State View Preview */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Enterprise Empty State View (`EmptyStateView.tsx`)
              </span>
              <EmptyStateView
                title="No Active Orders"
                description="You currently have no active valet requests or scheduled garment pickups."
                actionLabel="Explore Concierge Services"
                onAction={() => onNavigate('our_services')}
              />
            </div>

            {/* Error State View Preview */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Enterprise Error State View (`ErrorStateView.tsx`)
              </span>
              <ErrorStateView
                title="Service Synchronization Failed"
                message="Unable to reach the high-priority valet scheduling server. Diagnostic error code: #ERR_503_GW."
                retryLabel="Attempt Reconnection"
                onRetry={() => {
                  notify({
                    category: 'system',
                    title: 'Diagnostic Test Reconnected',
                    message: 'Valet cluster re-established with 12ms latency.',
                    priority: 'normal'
                  });
                }}
              />
            </div>
          </div>

          {/* Section: Standardized Skeleton Loading System (All Card Types) */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold tracking-wider">
                  Perceived Performance Acceleration
                </span>
                <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white">
                  Standardized Skeleton Loading Matrix (Services, Offers, Orders & VIP)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pre-baked geometric structural skeletons with synchronized pulse animations matching the exact bounding geometry of all primary card variants.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1. Services Card Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase">
                    1. Service Card Skeleton
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">`ServiceCardSkeleton`</span>
                </div>
                <ServiceCardSkeleton layout="grid" />
              </div>

              {/* 2. Offers Card Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase">
                    2. Offer Card Skeleton
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">`OfferCardSkeleton`</span>
                </div>
                <OfferCardSkeleton />
              </div>

              {/* 3. Orders Card Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                    3. Order Card Skeleton
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">`OrderCardSkeleton`</span>
                </div>
                <OrderCardSkeleton />
              </div>

              {/* 4. VIP Premium Card Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#CCA730] uppercase">
                    4. Premium Card Skeleton
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">`PremiumCardSkeleton`</span>
                </div>
                <PremiumCardSkeleton />
              </div>
            </div>

            {/* Service Skeleton Layout Adaptations */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Service Skeleton Adaptive Layout Variants (Horizontal, Bar, Tile, Chip)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400">Horizontal Layout (`layout="horizontal"`)</span>
                  <ServiceCardSkeleton layout="horizontal" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400">Mobile Bar Layout (`layout="bar"`)</span>
                  <ServiceCardSkeleton layout="bar" />
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-[11px] font-mono text-slate-400">Chip:</span>
                    <ServiceCardSkeleton layout="chip" />
                    <ServiceCardSkeleton layout="chip" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab: Shared Notification Architecture */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B0EDF4] dark:bg-[#0D5D68] text-[#00444D] dark:text-[#ABEDFA] text-xs font-semibold mb-1">
                <Bell className="w-3.5 h-3.5" />
                <span>Screen-Agnostic Dispatch Architecture</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#00444D] dark:text-white">
                Shared Notification Architecture (9 Standard Categories)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Notifications never depend on a particular screen's visual implementation. Dispatched payloads trigger top-level floating toasts, persist in the drawer history, and support deep-linking.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openNotificationCenter}
                className="px-4 py-2.5 rounded-xl bg-[#00444D] text-[#FFE088] font-bold text-xs hover:bg-[#0D5D68] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>Open Notification Drawer ({history.length})</span>
              </button>
              {history.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear History
                </button>
              )}
            </div>
          </div>

          {/* Quick Trigger Test Grid for all 9 Enterprise Notification Types */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-[#00444D] dark:text-[#ABEDFA] flex items-center gap-2">
              <Play className="w-4 h-4 text-[#CCA730]" />
              <span>One-Click Enterprise Notification Dispatchers</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* 1. Success */}
              <button
                onClick={() => {
                  notify({
                    category: 'success',
                    title: 'Appointment Confirmed',
                    message: 'Your bespoke fitting appointment with Master Master Tailor is confirmed for tomorrow at 10:00 AM.',
                    priority: 'normal',
                    action: { label: 'View Schedule', onClick: () => onNavigate('orders') }
                  });
                }}
                className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 hover:border-emerald-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    <CheckCircle className="w-4 h-4" />
                    <span>1. Success</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Triggers confirmation banner for successful operations.</p>
              </button>

              {/* 2. Information */}
              <button
                onClick={() => {
                  notify({
                    category: 'info',
                    title: 'Concierge Briefing Ready',
                    message: 'New signature seasonal fabrics from Milan are now available in the tailoring catalog.',
                    priority: 'low',
                    action: { label: 'Explore', onClick: () => onNavigate('book_tailoring') }
                  });
                }}
                className="p-4 rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 hover:border-sky-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-xs">
                    <Info className="w-4 h-4" />
                    <span>2. Information</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Informs user of non-blocking contextual updates.</p>
              </button>

              {/* 3. Warning */}
              <button
                onClick={() => {
                  notify({
                    category: 'warning',
                    title: 'Express Cutoff in 30 Mins',
                    message: 'Orders placed after 02:00 PM will shift to next-day morning delivery.',
                    priority: 'high'
                  });
                }}
                className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 hover:border-amber-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>3. Warning</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Cautionary alert requiring timely attention.</p>
              </button>

              {/* 4. Error */}
              <button
                onClick={() => {
                  notify({
                    category: 'error',
                    title: 'Payment Authorization Declined',
                    message: 'Your banking institution declined tokenized charge #TXN-9021. Please update your primary payment card.',
                    priority: 'urgent',
                    action: { label: 'Update Card', onClick: () => onNavigate('create_account') }
                  });
                }}
                className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 hover:border-rose-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>4. Error</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Critical operational exception with corrective action.</p>
              </button>

              {/* 5. Order Update */}
              <button
                onClick={() => {
                  notify({
                    category: 'order_update',
                    title: 'Order #MB-8829: Dry Cleaning In Progress',
                    message: 'Your 3 tuxedo suits and 2 silk shirts are currently inside the ozone steam cycle.',
                    priority: 'normal',
                    action: { label: 'Track Order', onClick: () => onNavigate('orders') }
                  });
                }}
                className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 hover:border-indigo-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                    <Package className="w-4 h-4" />
                    <span>5. Order Update</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Live order lifecycle stage progression updates.</p>
              </button>

              {/* 6. Booking Update */}
              <button
                onClick={() => {
                  notify({
                    category: 'booking_update',
                    title: 'Valet Chauffeur Arriving',
                    message: 'Valet driver Ahmed is approaching 1007 Mountain Drive in a temperature-controlled van.',
                    priority: 'high',
                    action: { label: 'Live Location', onClick: () => onNavigate('orders') }
                  });
                }}
                className="p-4 rounded-2xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/50 dark:bg-teal-950/20 hover:border-teal-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 font-bold text-xs">
                    <Calendar className="w-4 h-4" />
                    <span>6. Booking Update</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Appointment time, arrival, and reschedule alerts.</p>
              </button>

              {/* 7. Payment Update */}
              <button
                onClick={() => {
                  notify({
                    category: 'payment_update',
                    title: 'Invoice Settled ($142.50)',
                    message: 'Payment for bespoke tuxedo restoration and courier delivery was processed via Apple Pay.',
                    priority: 'normal',
                    action: { label: 'Download Receipt', onClick: () => onNavigate('orders') }
                  });
                }}
                className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 hover:border-emerald-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    <CreditCard className="w-4 h-4" />
                    <span>7. Payment Update</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Charges, refunds, tips, and digital receipt delivery.</p>
              </button>

              {/* 8. Promotional */}
              <button
                onClick={() => {
                  notify({
                    category: 'promotional',
                    title: 'Imperial Weekend Privilege',
                    message: 'Enjoy complimentary leather waxing with any tuxedo dry cleaning booking this Saturday.',
                    priority: 'low',
                    action: { label: 'Claim Offer', onClick: () => onNavigate('book_dry_cleaning') }
                  });
                }}
                className="p-4 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 hover:border-purple-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-xs">
                    <Megaphone className="w-4 h-4" />
                    <span>8. Promotional</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Tier benefits, exclusive weekend offers & privileges.</p>
              </button>

              {/* 9. System */}
              <button
                onClick={() => {
                  notify({
                    category: 'system',
                    title: 'Security Sync Complete',
                    message: 'Multi-factor authentication credentials updated successfully across all enterprise devices.',
                    priority: 'normal'
                  });
                }}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-xs">
                    <Cpu className="w-4 h-4" />
                    <span>9. System</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Platform security, offline sync, and cache states.</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Responsive Dual-Pane Architecture & Foldables */}
      {activeTab === 'responsive' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B0EDF4] dark:bg-[#0D5D68] text-[#00444D] dark:text-[#ABEDFA] text-xs font-semibold mb-1">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Foldables As First-Class Citizen</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#00444D] dark:text-white">
              Responsive Framework & Dual-Pane Layout Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              The shell transitions seamlessly from Single Screen (Mobile) → Wide Screen (Tablet/Desktop) → Dual-Pane Layout (Foldable devices unfolded / Ultra-wide viewports) with zero design language drift.
            </p>
          </div>

          {/* Interactive Dual Pane Container */}
          <div className="border border-[#E2E8F0] dark:border-slate-800 rounded-2xl overflow-hidden min-h-[480px]">
            <DualPaneLayout
              lang={lang}
              leftTitle="Imperial Valet Directory"
              rightTitle="Service Details & Booking Spec"
              leftPane={
                <div className="p-4 space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Select a Service Item</span>
                  <div className="space-y-2">
                    {[
                      { id: 'dry_cleaning', title: 'Dry Cleaning & Laundry', tag: 'Fast-Track', icon: Sparkles },
                      { id: 'tailoring', title: 'Tailoring & Alterations', tag: 'Bespoke', icon: Crown },
                      { id: 'shoe_repair', title: 'Shoe Fix & Repair', tag: 'Artisan', icon: Package },
                      { id: 'beauty_salon', title: 'Beauty Salon Services', tag: 'Luxury', icon: Palette },
                      { id: 'pet_care', title: 'Pet Care & Spa', tag: 'Valet Care', icon: Eye }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedServiceItem === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedServiceItem(item.id)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#00444D] text-white border-[#00444D] shadow-sm'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-[#00444D]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/20 text-[#FFE088]' : 'bg-[#EFF4FF] dark:bg-slate-700 text-[#00444D] dark:text-[#ABEDFA]'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-bold text-xs">{item.title}</h4>
                              <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>{item.tag}</span>
                            </div>
                          </div>
                          <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-[#FFE088]' : 'text-slate-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              }
              rightPane={
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold">Pane 2: Deep Inspector</span>
                      <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white capitalize">
                        {selectedServiceItem.replace('_', ' ')}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#FFE088] text-[#241A00] font-bold text-xs">
                      Enterprise Tier
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <p>
                      Dual-pane viewports allow simultaneous navigation of the catalog while configuring custom order parameters, pickup addresses, and scheduling constraints in the companion pane.
                    </p>
                    
                    <div className="p-4 rounded-xl bg-[#F8F9FF] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-slate-500">Selected SKU:</span>
                        <span className="font-bold text-[#00444D] dark:text-[#ABEDFA]">VALET-{selectedServiceItem.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-slate-500">Service Chauffeur:</span>
                        <span className="font-bold">Dedicated White-Glove Butler</span>
                      </div>
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-slate-500">SLA Guarantee:</span>
                        <span className="font-bold text-emerald-600">100% Quality Inspected</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (selectedServiceItem === 'dry_cleaning') onNavigate('book_dry_cleaning');
                      else if (selectedServiceItem === 'tailoring') onNavigate('book_tailoring');
                      else if (selectedServiceItem === 'shoe_repair') onNavigate('book_shoe_repair');
                      else if (selectedServiceItem === 'beauty_salon') onNavigate('book_beauty_salon');
                      else if (selectedServiceItem === 'pet_care') onNavigate('book_pet_care');
                    }}
                    className="w-full py-3 rounded-xl bg-[#00444D] text-white font-bold text-xs hover:bg-[#0D5D68] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Proceed to Full Booking Wizard</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FFE088]" />
                  </button>
                </div>
              }
            />
          </div>
        </div>
      )}

      {/* Tab: Butler AI Assistant & Safeguard Protocol */}
      {activeTab === 'ai_assistant' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE088] text-[#241A00] text-xs font-bold mb-1">
              <Bot className="w-3.5 h-3.5" />
              <span>Enterprise AI Policy Mandate</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#00444D] dark:text-white">
              Butler AI Assistant & Explicit Safeguards
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              The Butler AI Assistant is a shared capability integrated seamlessly using standard MEDS components.
              <strong> AI must never silently override:</strong> Customer decisions, Provider decisions, Pricing, Bookings, Payments, Cancellation, or Legal consent.
            </p>
          </div>

          {/* Embedded Butler AI Component */}
          <div className="border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-4 bg-[#F8F9FF] dark:bg-slate-850">
            <ButlerAIAssistant onNavigate={onNavigate} lang={lang} />
          </div>
        </div>
      )}

      {/* Tab: Design Tokens */}
      {activeTab === 'design' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#00444D] dark:text-[#ABEDFA]">
            Color Tokens & Visual Palette
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#00444D] text-white">
              <span className="font-bold block">#00444D</span>
              <span className="text-[10px] opacity-80">Imperial Teal</span>
            </div>
            <div className="p-3 rounded-xl bg-[#CCA730] text-slate-900 font-bold">
              <span className="block">#CCA730</span>
              <span className="text-[10px] opacity-80">24k Gold Bezel</span>
            </div>
            <div className="p-3 rounded-xl bg-[#B0EDF4] text-[#00444D] font-bold">
              <span className="block">#B0EDF4</span>
              <span className="text-[10px] opacity-80">Aura Cyan</span>
            </div>
            <div className="p-3 rounded-xl bg-[#EFF4FF] text-slate-800 border border-slate-300 font-bold">
              <span className="block">#EFF4FF</span>
              <span className="text-[10px] opacity-80">Porcelain Canvas</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Accessibility */}
      {activeTab === 'accessibility' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#00444D] dark:text-[#ABEDFA]">
            Accessibility (WCAG AA & Touch Standards)
          </h2>
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p><strong>Touch Targets:</strong> Every navigation button, dropdown item, and tab has a minimum touch footprint of 44x44px (with 48px on mobile tab bars).</p>
            <p><strong>Keyboard Navigation:</strong> Fully operable via Tab, Enter, Space, Arrow keys, and Escape key dismissal.</p>
            <p><strong>Screen Reader Support:</strong> Standard ARIA roles (`role="navigation"`, `role="dialog"`, `aria-current="page"`, `aria-expanded`).</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
