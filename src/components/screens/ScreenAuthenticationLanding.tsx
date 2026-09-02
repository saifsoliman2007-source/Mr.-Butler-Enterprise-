import React, { useState } from 'react';
import { ScreenId, Language, RegistrationData, Role } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { EGEC } from '../EGEC';
import { 
  TextInput, 
  EmailInput, 
  PhoneInput, 
  PasswordInput, 
  SegmentedControl, 
  Checkbox 
} from '../forms';
import { ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, User, Sparkles } from 'lucide-react';

interface ScreenAuthenticationLandingProps {
  formData: RegistrationData;
  onUpdateFormData: (data: Partial<RegistrationData>) => void;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const ScreenAuthenticationLanding: React.FC<ScreenAuthenticationLandingProps> = ({
  formData,
  onUpdateFormData,
  onNavigate,
  lang,
  onLanguageChange,
}) => {
  const isRTL = lang === 'ar';
  const [fullName, setFullName] = useState('Master Wayne');
  const [email, setEmail] = useState(formData.email || 'wayne@manor.com');
  const [phone, setPhone] = useState(formData.businessPhone || '50 123 4567');
  const [password, setPassword] = useState('WayneVault2026!');
  const [role, setRole] = useState<Role>(formData.role || 'consumer');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    onUpdateFormData({ role: newRole });
    if (newRole === 'provider') {
      onNavigate(6); // Visibly & functionally enter Provider Registration
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(isRTL ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address');
      return;
    }
    if (!acceptTerms) {
      setErrorMsg(isRTL ? 'يرجى قبول شروط الخدمة للمتابعة' : 'Please accept the terms of service to proceed');
      return;
    }
    onUpdateFormData({
      email,
      role,
      businessPhone: phone
    });
    if (role === 'provider') {
      onNavigate(6); // Provider Registration
    } else {
      onNavigate('verify_email');
    }
  };

  const handleSocialRegister = (provider: string) => {
    onUpdateFormData({
      email: `${provider.toLowerCase()}@user.mrbutler.com`,
      role
    });
    if (role === 'provider') {
      onNavigate(6); // Provider Registration
    } else {
      onNavigate('verify_email');
    }
  };

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Recurring Application Header Structure */}
      <RecurringAppHeader 
        currentScreen="create_account" 
        onNavigate={onNavigate} 
        lang={lang} 
        onLanguageChange={onLanguageChange}
        showStatusBar={true}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-md w-full mx-auto px-3.5 sm:px-5 md:px-6 py-4 sm:py-6 flex flex-col justify-center items-center">
        
        {/* Logo & Heading */}
        <div className="text-center mb-4 sm:mb-5 flex flex-col items-center">
          <div className="mb-2 sm:mb-2.5">
            <EGEC size="sm" shape="rounded-xl" withAura={false} withSheen={true} withBeacon={true} beaconStatus="online" />
          </div>
          <h1 
            className="font-serif text-xl sm:text-2xl font-bold text-[#00444D] dark:text-[#FFE088] tracking-tight"
            style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}
          >
            {isRTL ? 'إنشاء حساب جديد' : 'Create an Account'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
            {isRTL ? 'انضم إلى السيد باتلر للاستمتاع بخدمات فاخرة ومخصصة' : 'Join Mr. Butler for impeccable, tailored service.'}
          </p>

          {/* Role Switcher using Shared SegmentedControl */}
          <div className="w-full max-w-xs mt-3 sm:mt-3.5">
            <SegmentedControl<Role>
              size="sm"
              options={[
                { value: 'consumer', label: isRTL ? 'حساب العميل' : 'Consumer' },
                { value: 'provider', label: isRTL ? 'مقدم الخدمة' : 'Service Provider' },
              ]}
              value={role}
              onChange={handleRoleChange}
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* Social Authentication Landing Entry Points */}
        <div className="w-full space-y-2 mb-4">
          <button
            type="button"
            onClick={() => handleSocialRegister('Google')}
            className="w-full min-h-[40px] sm:min-h-[44px] py-2 sm:py-2.5 px-3.5 bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-xl font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-[#EFF4FF] dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5 shadow-2xs hover:border-[#00444D]/30 cursor-pointer active:scale-[0.99]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{isRTL ? 'المتابعة باستخدام Google' : 'Continue with Google'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSocialRegister('Apple')}
              className="min-h-[38px] sm:min-h-[42px] py-2 px-3 bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 hover:bg-[#EFF4FF] dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-[0.99]"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.8c.62-.75 1.04-1.8 0.92-2.8-.9.04-1.98.6-2.63 1.35-.57.65-1.07 1.71-.94 2.69 1 .08 2.03-.49 2.65-1.24z"/>
              </svg>
              <span>Apple</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialRegister('Facebook')}
              className="min-h-[38px] sm:min-h-[42px] py-2 px-3 bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 hover:bg-[#EFF4FF] dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-[0.99]"
            >
              <svg className="w-3.5 h-3.5 fill-[#1877F2] shrink-0" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center gap-2.5 my-2.5">
          <div className="flex-1 h-px bg-[#D9E3F6] dark:bg-slate-800" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            {isRTL ? 'أو التسجيل عبر البريد الإلكتروني' : 'Or register with email'}
          </span>
          <div className="flex-1 h-px bg-[#D9E3F6] dark:bg-slate-800" />
        </div>

        {/* Shared Form Primitives */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E2E8F0] dark:border-slate-800">
          <form onSubmit={handleCreateAccount} className="space-y-3.5">
            
            {/* Full Name */}
            <TextInput
              label={isRTL ? 'الاسم الكامل' : 'Full Name'}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Master Wayne"
              leftIcon={<User className="w-4 h-4" />}
              requiredIndicator
              isRTL={isRTL}
            />

            {/* Email Address */}
            <EmailInput
              label={isRTL ? 'عنوان البريد الإلكتروني' : 'Email Address'}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="wayne@manor.com"
              requiredIndicator
              isRTL={isRTL}
            />

            {/* Phone Number */}
            <PhoneInput
              label={isRTL ? 'رقم الهاتف الجوال' : 'Mobile Phone Number'}
              value={phone}
              onChange={(val) => setPhone(val)}
              isRTL={isRTL}
            />

            {/* Password with Strength Indicator */}
            <PasswordInput
              label={isRTL ? 'كلمة المرور' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showStrength={true}
              requiredIndicator
              isRTL={isRTL}
            />

            {/* Terms of Service Checkbox */}
            <div className="pt-1">
              <Checkbox
                checked={acceptTerms}
                onChange={setAcceptTerms}
                label={
                  <span>
                    {isRTL ? 'أوافق على ' : 'I agree to the '}
                    <span className="text-[#00444D] dark:text-[#ABEDFA] underline font-bold">
                      {isRTL ? 'شروط الخدمة وسرية الخصوصية' : 'Terms of Service & Privacy Policy'}
                    </span>
                  </span>
                }
                isRTL={isRTL}
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-500 font-medium pt-1">
                {errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-1.5">
              <button
                type="submit"
                className="w-full min-h-[44px] sm:min-h-[48px] bg-[#00444D] hover:bg-[#0D5D68] text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-[0_4px_14px_rgba(0,68,77,0.25)] hover:shadow-[0_6px_20px_rgba(0,68,77,0.3)] transition-all duration-200 flex items-center justify-center gap-2 group border-b-2 border-[#CCA730]/60 cursor-pointer active:scale-[0.99]"
              >
                <span>{isRTL ? 'إنشاء الحساب والمتابعة' : 'Create Account & Continue'}</span>
                {isRTL ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#FFE088]" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FFE088]" />
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Sign In Link & Guest Bypass */}
        <div className="mt-4 text-center space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isRTL ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
            <button
              type="button"
              onClick={() => onNavigate(9)}
              className="text-[#00444D] dark:text-[#ABEDFA] font-bold hover:underline cursor-pointer"
            >
              {isRTL ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </p>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => onNavigate('our_services')}
              className="w-full py-2 px-3 rounded-xl bg-[#EFF4FF] dark:bg-slate-800/80 border border-[#D9E3F6] dark:border-slate-700 text-[#00444D] dark:text-[#ABEDFA] text-xs font-semibold hover:bg-[#E0EBFF] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#CCA730]" />
              <span>{isRTL ? 'تصفح كضيف • الدخول المباشر للخدمات' : 'Explore All Services as a Guest (Instant Access)'}</span>
            </button>
          </div>
        </div>

      </main>

    </div>
  );
};
