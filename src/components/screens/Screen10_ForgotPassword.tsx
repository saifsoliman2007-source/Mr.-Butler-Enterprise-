import React, { useState } from 'react';
import { Language, ScreenId } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { Mail, ArrowLeft, ArrowRight, KeyRound } from 'lucide-react';

interface Screen10Props {
  email: string;
  onUpdateEmail: (email: string) => void;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const Screen10_ForgotPassword: React.FC<Screen10Props> = ({
  email,
  onUpdateEmail,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(t.enterValidEmail);
      return;
    }
    onNavigate(11); // Reset Password
  };

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate(9)}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-300 hover:bg-[#F1F5F9] transition flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-[#3B82F6]" />
          <span>Back to Sign In</span>
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 border border-[#E2E8F0] dark:border-blue-800">
          Account Recovery
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto space-y-6 my-auto">
        
        <div className="text-center space-y-2 flex flex-col items-center">
          <EGEC size="md" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight">
            {t.forgotPwTitle}
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            {t.forgotPwDesc}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1E293B] dark:text-slate-300">
              {t.emailAddress} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  onUpdateEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="registered@mrbutler.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition min-h-[44px]"
              />
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <span>{t.sendVerificationCode}</span>
            <ArrowRight className="w-4 h-4 text-[#3B82F6]" />
          </button>

        </form>

      </div>

      <div />
    </div>
  );
};
