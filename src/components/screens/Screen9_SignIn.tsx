import React, { useState } from 'react';
import { Language, ScreenId, FeatureToggles, Role } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { SegmentedControl } from '../forms';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';

interface Screen9Props {
  role: Role;
  toggles: FeatureToggles;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const Screen9_SignIn: React.FC<Screen9Props> = ({
  role: initialRole,
  toggles,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';

  const [currentRole, setCurrentRole] = useState<Role>(initialRole || 'consumer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t.fieldRequired);
      return;
    }
    // Navigate directly to target role destination
    onNavigate(currentRole === 'consumer' ? 'consumer_home' : 'provider_dashboard');
  };

  const hasQuickAccess = toggles.googleAuth || toggles.facebookAuth || toggles.appleAuth;

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate(1)}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-300 hover:bg-[#F1F5F9] transition flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-[#3B82F6]" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 border border-[#E2E8F0] dark:border-blue-800">
          {t.signIn}
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto space-y-5 my-auto">
        
        {/* Title */}
        <div className="text-center space-y-1.5 flex flex-col items-center">
          <EGEC size="md" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight">
            {t.signInTitle}
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400">
            {t.signInSubtitle}
          </p>

          {/* Role Switcher */}
          <div className="w-full max-w-xs mt-3">
            <SegmentedControl<Role>
              size="sm"
              options={[
                { value: 'consumer', label: isRTL ? 'حساب العميل' : 'Consumer' },
                { value: 'provider', label: isRTL ? 'مقدم الخدمة' : 'Service Provider' },
              ]}
              value={currentRole}
              onChange={(newRole) => setCurrentRole(newRole)}
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* Quick Access Section */}
        {hasQuickAccess && (
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider text-center">
              {t.quickAccess}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {toggles.googleAuth && (
                <button
                  type="button"
                  onClick={() => onNavigate(currentRole === 'consumer' ? 'consumer_home' : 'provider_dashboard')}
                  className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#0F172A] dark:text-slate-100 font-semibold text-xs hover:border-[#3B82F6] transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>
              )}

              {toggles.facebookAuth && (
                <button
                  type="button"
                  onClick={() => onNavigate(currentRole === 'consumer' ? 'consumer_home' : 'provider_dashboard')}
                  className="py-2.5 px-3 rounded-xl bg-[#1877F2] text-white font-semibold text-xs hover:bg-[#166fe5] transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              )}

              {toggles.appleAuth && (
                <button
                  type="button"
                  onClick={() => onNavigate(currentRole === 'consumer' ? 'consumer_home' : 'provider_dashboard')}
                  className="py-2.5 px-3 rounded-xl bg-[#0F172A] text-white font-semibold text-xs hover:bg-[#1E293B] transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.09c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.86-1 2.97 1.08.08 2.16-.57 2.81-1.37z" />
                  </svg>
                  <span>Apple</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Divider */}
        {hasQuickAccess && (
          <div className="relative flex items-center justify-center my-3">
            <div className="w-full border-t border-[#E2E8F0] dark:border-slate-800" />
            <span className="absolute bg-[#F8FAFC] dark:bg-slate-950 px-3 text-xs text-[#64748B] font-medium">
              {t.orDivider}
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-3.5">
          
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
              {t.emailAddress}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="user@mrbutler.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition min-h-[44px]"
              />
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                {t.password}
              </label>
              <button
                type="button"
                onClick={() => onNavigate(10)} // Forgot Password
                className="text-xs text-[#1D4ED8] dark:text-blue-400 hover:underline font-semibold"
              >
                {t.forgotPassword}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition min-h-[44px]"
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
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <span>{t.signInWithEmail}</span>
            <ArrowRight className="w-4 h-4 text-[#3B82F6]" />
          </button>

        </form>

        {/* Support Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#64748B] dark:text-slate-400">
            {t.dontHaveAccount}{' '}
            <button
              onClick={() => onNavigate(2)}
              className="font-bold text-[#1D4ED8] dark:text-blue-400 hover:underline"
            >
              {t.registerNow}
            </button>
          </p>
        </div>

      </div>

      <div />
    </div>
  );
};
