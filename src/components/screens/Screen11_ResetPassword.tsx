import React, { useState } from 'react';
import { Language, ScreenId } from '../../types';
import { translations } from '../../data/translations';
import { OTPInput } from '../OTPInput';
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator';
import { EGEC } from '../EGEC';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface Screen11Props {
  email: string;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const Screen11_ResetPassword: React.FC<Screen11Props> = ({
  email,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;

  const [otpValue, setOtpValue] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (otpValue.length < 6) errs.otp = 'Please enter all 6 digits.';
    if (!newPassword) errs.password = t.fieldRequired;
    else if (newPassword.length < 8) errs.password = t.reqLength;

    if (!confirmPassword) errs.confirmPassword = t.fieldRequired;
    else if (newPassword !== confirmPassword) errs.confirmPassword = t.passwordsMatchError;

    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSuccess(true);
      setTimeout(() => {
        onNavigate(9); // Sign In
      }, 2000);
    }
  };

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate(10)}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-300 hover:bg-[#F1F5F9] transition flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-[#3B82F6]" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 border border-[#E2E8F0] dark:border-blue-800">
          Reset Password
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto space-y-5 my-auto">
        
        <div className="text-center space-y-2 flex flex-col items-center">
          <EGEC size="md" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight">
            {t.resetPwTitle}
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400">
            {t.resetPwDesc}
          </p>
        </div>

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto" />
            <h3 className="font-bold text-base text-[#10B981] dark:text-emerald-300">
              Password Reset Complete!
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-300">
              {t.pwResetSuccessMsg} Redirecting to Sign In...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* OTP Code */}
            <div className="space-y-2 text-center">
              <label className="block text-xs font-bold text-[#64748B] dark:text-slate-300 uppercase tracking-wider">
                {t.verificationCodeLabel}
              </label>
              <OTPInput
                length={6}
                value={otpValue}
                onChange={(val) => {
                  setOtpValue(val);
                  if (errors.otp) setErrors({ ...errors, otp: '' });
                }}
              />
              {errors.otp && <p className="text-xs text-red-500 font-medium">{errors.otp}</p>}
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
                {t.newPassword} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition min-h-[44px]"
                />
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] dark:hover:text-slate-200"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password}</p>}
              <PasswordStrengthIndicator password={newPassword} lang={lang} />
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
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition min-h-[44px]"
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
              {errors.confirmPassword && <p className="text-xs text-red-500 font-medium">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>{t.resetPasswordBtn}</span>
            </button>

          </form>
        )}

      </div>

      <div />
    </div>
  );
};
