import React, { useState } from 'react';
import { Language, ScreenId, RegistrationData } from '../../types';
import { translations } from '../../data/translations';
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator';
import { EGEC } from '../EGEC';
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
  AlertCircle 
} from 'lucide-react';

interface Screen6Props {
  formData: RegistrationData;
  onUpdateFormData: (data: Partial<RegistrationData>) => void;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

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

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.businessName) errs.businessName = t.fieldRequired;
    if (!formData.businessPhone) errs.businessPhone = t.fieldRequired;
    if (!formData.businessAddress) errs.businessAddress = t.fieldRequired;

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
      onNavigate(7); // Provider Verification
    }
  };

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate(1)}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-300 hover:bg-[#F1F5F9] transition flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-[#3B82F6]" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 border border-[#E2E8F0] dark:border-blue-800">
          Service Provider Registration
        </span>
      </div>

      {/* Main Form Container */}
      <div className="max-w-md w-full mx-auto space-y-6 my-auto">
        
        <div className="text-center space-y-2 flex flex-col items-center">
          <EGEC size="md" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight">
            {t.providerRegTitle}
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400">
            Register your artisan service establishment with Mr. Butler
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Business Name */}
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
                placeholder={t.businessNamePlaceholder}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[44px]
                  ${errors.businessName ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20'}`}
              />
              <Building2 className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.businessName && <p className="text-xs text-red-500 flex items-center gap-1 font-medium">{errors.businessName}</p>}
          </div>

          {/* Business Phone Number */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
              {t.businessPhone} <span className="text-red-500">*</span>
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
                placeholder={t.businessPhonePlaceholder}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[44px]
                  ${errors.businessPhone ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20'}`}
              />
              <Phone className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.businessPhone && <p className="text-xs text-red-500 flex items-center gap-1 font-medium">{errors.businessPhone}</p>}
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
                placeholder={t.businessAddressPlaceholder}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[44px]
                  ${errors.businessAddress ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20'}`}
              />
              <MapPin className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.businessAddress && <p className="text-xs text-red-500 flex items-center gap-1 font-medium">{errors.businessAddress}</p>}
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
              {t.emailAddress} <span className="text-red-500">*</span>
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
                placeholder="provider@business.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[44px]
                  ${errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20'}`}
              />
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 font-medium">{errors.email}</p>}
          </div>

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
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[44px]
                  ${errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20'}`}
              />
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 flex items-center gap-1 font-medium">{errors.password}</p>}

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
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-white dark:bg-slate-900 transition outline-none min-h-[44px]
                  ${errors.confirmPassword ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' : 'border-[#E2E8F0] dark:border-slate-800 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20'}`}
              />
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] dark:hover:text-slate-200"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500 flex items-center gap-1 font-medium">{errors.confirmPassword}</p>}
          </div>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>{t.sendVerificationCode}</span>
              <ArrowRight className="w-4 h-4 text-[#3B82F6]" />
            </button>
          </div>

        </form>

      </div>

      <div />
    </div>
  );
};
