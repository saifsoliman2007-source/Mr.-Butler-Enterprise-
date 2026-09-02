import React, { useState } from 'react';
import { Language, ScreenId, RegistrationData, ProviderCategory } from '../../types';
import { translations } from '../../data/translations';
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator';
import { EGEC } from '../EGEC';
import { ProfilePictureUploader } from '../forms';
import { 
  Building2, 
  Phone, 
  MapPin, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight, 
  FileText,
  User,
  Clock,
  Truck,
  DollarSign,
  Sparkles,
  Shirt,
  Scissors,
  Footprints,
  Sparkle,
  Dog,
  CheckCircle2
} from 'lucide-react';

interface Screen6Props {
  formData: RegistrationData;
  onUpdateFormData: (data: Partial<RegistrationData>) => void;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

const PROVIDER_CATEGORIES: { id: ProviderCategory; label: string; icon: React.ElementType }[] = [
  { id: 'Laundry & Dry Cleaning', label: 'Laundry & Dry Cleaning', icon: Shirt },
  { id: 'Tailoring', label: 'Tailoring & Alterations', icon: Scissors },
  { id: 'Shoe Fix & Repair', label: 'Shoe Fix & Repair', icon: Footprints },
  { id: 'Beauty Salon', label: 'Beauty Salon & Grooming', icon: Sparkle },
  { id: 'Pet Care', label: 'Pet Care & Grooming', icon: Dog },
];

const AVAILABLE_SERVICE_AREAS = [
  'Downtown Central',
  'Al Olaya Financial District',
  'Diplomatic Quarter',
  'Palm Gardens',
  'Al Nakheel Heights',
  'North Gate Suburbs'
];

export const Screen6_ProviderReg: React.FC<Screen6Props> = ({
  formData,
  onUpdateFormData,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedCategory = formData.serviceCategory || 'Laundry & Dry Cleaning';
  const selectedAreas = formData.serviceAreas || ['Downtown Central', 'Al Olaya Financial District'];

  const toggleArea = (area: string) => {
    const current = formData.serviceAreas || ['Downtown Central', 'Al Olaya Financial District'];
    const updated = current.includes(area)
      ? current.filter(a => a !== area)
      : [...current, area];
    onUpdateFormData({ serviceAreas: updated });
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.businessName) errs.businessName = t.fieldRequired;
    if (!formData.businessPhone) errs.businessPhone = t.fieldRequired;
    if (!formData.businessAddress) errs.businessAddress = t.fieldRequired;
    if (!formData.contactPerson) errs.contactPerson = t.fieldRequired;

    if (!formData.email) {
      errs.email = t.fieldRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = t.enterValidEmail;
    }

    if (!formData.password) {
      errs.password = t.fieldRequired;
    } else if (formData.password.length < 8) {
      errs.password = t.reqLength;
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = t.fieldRequired;
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = t.passwordsMatchError;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onUpdateFormData({
        serviceCategory: selectedCategory,
        serviceAreas: selectedAreas,
        pickupDeliveryAvailable: formData.pickupDeliveryAvailable !== false,
        operatingHours: formData.operatingHours || '08:00 AM - 10:00 PM (Sat - Thu)',
        basePricing: formData.basePricing || 45
      });
      onNavigate(7); // Provider Verification
    }
  };

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate(1)}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-300 hover:bg-[#F1F5F9] transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] dark:bg-sky-950 dark:text-sky-300 border border-[#BAE6FD] dark:border-sky-800">
          Release 1 Merchant Onboarding
        </span>
      </div>

      {/* Main Form Container */}
      <div className="max-w-2xl w-full mx-auto space-y-6 my-4">
        
        <div className="text-center space-y-2 flex flex-col items-center">
          <EGEC size="md" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight">
            {t.providerRegTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 max-w-md">
            Register your artisan service establishment with Mr. Butler. Connect directly with VIP clients.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 shadow-sm">
          
          {/* Section 1: Business Identity & Category */}
          <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. Service Category & Business Identity</span>
            </h3>

            {/* Provider Logo / Business Picture Uploader */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex flex-col items-center">
              <ProfilePictureUploader
                type="provider"
                value={formData.businessLogo || formData.profilePicture || 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=300&auto=format&fit=crop&q=80'}
                onChange={(img) => onUpdateFormData({ businessLogo: img || undefined, profilePicture: img || undefined })}
                label="Artisan Establishment Logo & Storefront Photo"
                helperText="Upload your official brand logo or select a verified artisan crest"
                size="md"
                shape="rounded-2xl"
              />
            </div>

            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                Primary Service Domain <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROVIDER_CATEGORIES.map((cat) => {
                  const CatIcon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onUpdateFormData({ serviceCategory: cat.id })}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-medium transition cursor-pointer ${
                        isSelected
                          ? 'border-[#00444D] bg-[#00444D]/5 text-[#00444D] dark:border-[#FFE088] dark:bg-[#FFE088]/10 dark:text-[#FFE088] font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#00444D] text-white dark:bg-[#FFE088] dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
                        <CatIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="flex-1 truncate">{cat.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Business Name & CR Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                  {t.businessName} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.businessName || ''}
                    onChange={(e) => {
                      onUpdateFormData({ businessName: e.target.value });
                      if (errors.businessName) setErrors({ ...errors, businessName: '' });
                    }}
                    placeholder="e.g. Royal Silk Cleaners & Tailors"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px]
                      ${errors.businessName ? 'border-red-500' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#00444D]'}`}
                  />
                  <Building2 className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.businessName && <p className="text-[11px] text-red-500 font-medium">{errors.businessName}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                  Commercial Registration (CR)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.businessNumber || ''}
                    onChange={(e) => onUpdateFormData({ businessNumber: e.target.value })}
                    placeholder="CR-1010489271"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px] focus:border-[#00444D]"
                  />
                  <FileText className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Business Address */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                {t.businessAddress} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.businessAddress || ''}
                  onChange={(e) => {
                    onUpdateFormData({ businessAddress: e.target.value });
                    if (errors.businessAddress) setErrors({ ...errors, businessAddress: '' });
                  }}
                  placeholder="742 Enterprise Blvd, Suite 400, Olaya District"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px]
                    ${errors.businessAddress ? 'border-red-500' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#00444D]'}`}
                />
                <MapPin className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.businessAddress && <p className="text-[11px] text-red-500 font-medium">{errors.businessAddress}</p>}
            </div>
          </div>

          {/* Section 2: Contact Person & Details */}
          <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>2. Contact Executive & Operating Hours</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.contactPerson || ''}
                    onChange={(e) => {
                      onUpdateFormData({ contactPerson: e.target.value });
                      if (errors.contactPerson) setErrors({ ...errors, contactPerson: '' });
                    }}
                    placeholder="Master Pierre Dubois"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px]
                      ${errors.contactPerson ? 'border-red-500' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#00444D]'}`}
                  />
                  <User className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.contactPerson && <p className="text-[11px] text-red-500 font-medium">{errors.contactPerson}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                  Business Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={formData.businessPhone || ''}
                    onChange={(e) => {
                      onUpdateFormData({ businessPhone: e.target.value });
                      if (errors.businessPhone) setErrors({ ...errors, businessPhone: '' });
                    }}
                    placeholder="+966 50 892 4110"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px]
                      ${errors.businessPhone ? 'border-red-500' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#00444D]'}`}
                  />
                  <Phone className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.businessPhone && <p className="text-[11px] text-red-500 font-medium">{errors.businessPhone}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email || ''}
                    onChange={(e) => {
                      onUpdateFormData({ email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="concierge@royalsilk.com"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px]
                      ${errors.email ? 'border-red-500' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#00444D]'}`}
                  />
                  <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 font-medium">{errors.email}</p>}
              </div>
            </div>

            {/* Operating Hours & Base Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                  Operating Hours
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.operatingHours || '08:00 AM - 10:00 PM (Sat - Thu)'}
                    onChange={(e) => onUpdateFormData({ operatingHours: e.target.value })}
                    placeholder="08:00 AM - 10:00 PM"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px] focus:border-[#00444D]"
                  />
                  <Clock className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                  Base Starting Price (SAR / $)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.basePricing || 45}
                    onChange={(e) => onUpdateFormData({ basePricing: Number(e.target.value) })}
                    placeholder="45"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px] focus:border-[#00444D]"
                  />
                  <DollarSign className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Service Areas & Valet Delivery */}
          <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>3. Service Areas & Delivery Fulfillment</span>
            </h3>

            {/* Pickup / Delivery Availability Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Valet Pickup & Delivery Service
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Offer white-glove door-to-door concierge transit to Mr. Butler clients
                </p>
              </div>
              <button
                type="button"
                onClick={() => onUpdateFormData({ pickupDeliveryAvailable: !(formData.pickupDeliveryAvailable !== false) })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
                  formData.pickupDeliveryAvailable !== false ? 'bg-[#00444D] dark:bg-[#00444D]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    formData.pickupDeliveryAvailable !== false ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Service Areas Multi-Selection */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                Authorized Service Districts
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_SERVICE_AREAS.map((area) => {
                  const isSelected = selectedAreas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleArea(area)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#00444D] text-white dark:bg-[#00444D] dark:text-[#FFE088]'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {isSelected ? `✓ ${area}` : `+ ${area}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Security & Credentials */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>4. Merchant Portal Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                  {t.password} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password || ''}
                    onChange={(e) => {
                      onUpdateFormData({ password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    placeholder="••••••••••••"
                    className={`w-full pl-9 pr-9 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px]
                      ${errors.password ? 'border-red-500' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#00444D]'}`}
                  />
                  <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-500 font-medium">{errors.password}</p>}
                <PasswordStrengthIndicator password={formData.password || ''} lang={lang} />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                  {t.confirmPassword} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword || ''}
                    onChange={(e) => {
                      onUpdateFormData({ confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    placeholder="••••••••••••"
                    className={`w-full pl-9 pr-9 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[42px]
                      ${errors.confirmPassword ? 'border-red-500' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#00444D]'}`}
                  />
                  <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-[11px] text-red-500 font-medium">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Primary Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#00444D] hover:bg-[#00333A] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
            >
              <span>{t.sendVerificationCode}</span>
              <ArrowRight className="w-4 h-4 text-[#FFE088]" />
            </button>
          </div>

        </form>

      </div>

      <div />
    </div>
  );
};

