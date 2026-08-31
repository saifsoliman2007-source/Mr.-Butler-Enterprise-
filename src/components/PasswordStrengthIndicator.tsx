import React from 'react';
import { Check, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface PasswordStrengthIndicatorProps {
  password: string;
  lang: Language;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password, lang }) => {
  const t = translations[lang] || translations.en;

  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);

  const score = [hasMinLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (password.length === 0) return { label: '', color: 'bg-slate-200 dark:bg-slate-700', text: 'text-slate-400' };
    if (score <= 1) return { label: t.pwWeak, color: 'bg-red-500', text: 'text-red-500' };
    if (score === 2) return { label: t.pwFair, color: 'bg-amber-500', text: 'text-amber-500' };
    if (score === 3) return { label: t.pwStrong, color: 'bg-[#3B82F6]', text: 'text-[#3B82F6]' };
    return { label: t.pwEnterprise, color: 'bg-[#10B981]', text: 'text-[#10B981]' };
  };

  const strength = getStrengthLabel();

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2 text-xs" aria-live="polite">
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500 dark:text-gray-400">Password Strength:</span>
        <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <div className={`h-full transition-all duration-300 ${score >= 1 ? strength.color : ''}`} />
        <div className={`h-full transition-all duration-300 ${score >= 2 ? strength.color : ''}`} />
        <div className={`h-full transition-all duration-300 ${score >= 3 ? strength.color : ''}`} />
        <div className={`h-full transition-all duration-300 ${score >= 4 ? strength.color : ''}`} />
      </div>

      {/* Requirements checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 text-[11px]">
        <RequirementItem met={hasMinLength} text={t.reqLength} />
        <RequirementItem met={hasUpper} text={t.reqUpper} />
        <RequirementItem met={hasNumber} text={t.reqNumber} />
        <RequirementItem met={hasSpecial} text={t.reqSpecial} />
      </div>
    </div>
  );
};

const RequirementItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
  <div className={`flex items-center gap-1.5 transition-colors ${met ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-gray-400 dark:text-gray-500'}`}>
    {met ? (
      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
    ) : (
      <X className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 shrink-0" />
    )}
    <span>{text}</span>
  </div>
);
