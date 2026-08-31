import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, FolderSearch } from 'lucide-react';
import { Language } from '../../types';

interface EmptyStateViewProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  lang?: Language;
  className?: string;
}

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  icon: Icon = FolderSearch,
  title,
  description,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  lang = 'en',
  className = ''
}) => {
  const isRTL = lang === 'ar';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`p-8 sm:p-12 text-center flex flex-col items-center justify-center bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl space-y-4 shadow-xs ${className}`}
    >
      <div className="w-16 h-16 rounded-3xl bg-[#EFF4FF] dark:bg-slate-800 border border-[#D9E3F6] dark:border-slate-700 flex items-center justify-center text-[#00444D] dark:text-[#ABEDFA] shadow-inner">
        <Icon className="w-8 h-8" />
      </div>

      <div className="max-w-md space-y-1.5">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#00444D] dark:text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {(primaryActionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {primaryActionLabel && onPrimaryAction && (
            <button
              onClick={onPrimaryAction}
              className="px-5 py-2.5 bg-[#00444D] hover:bg-[#0D5D68] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>{primaryActionLabel}</span>
              <Arrow className="w-3.5 h-3.5" />
            </button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="px-5 py-2.5 bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E2E8F0] rounded-xl text-xs font-bold transition-all border border-[#D9E3F6] dark:border-slate-700 cursor-pointer"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
