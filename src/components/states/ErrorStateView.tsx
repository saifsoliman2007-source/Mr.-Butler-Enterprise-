import React from 'react';
import { AlertOctagon, RefreshCw, HelpCircle, ShieldAlert } from 'lucide-react';
import { Language } from '../../types';

interface ErrorStateViewProps {
  title?: string;
  description?: string;
  errorCode?: string;
  onRetry?: () => void;
  lang?: Language;
  className?: string;
}

export const ErrorStateView: React.FC<ErrorStateViewProps> = ({
  title = 'Service Gateway Unreachable',
  description = 'An enterprise network boundary error occurred while retrieving real-time valet telemetry.',
  errorCode = 'ERR_VALET_TELEMETRY_503',
  onRetry,
  lang = 'en',
  className = ''
}) => {
  const isRTL = lang === 'ar';

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`p-6 sm:p-8 text-center flex flex-col items-center justify-center bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-3xl space-y-4 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/60 border border-rose-300 dark:border-rose-700 flex items-center justify-center text-rose-600 dark:text-rose-400">
        <AlertOctagon className="w-7 h-7" />
      </div>

      <div className="max-w-md space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-200/60 dark:bg-rose-900/80 text-rose-800 dark:text-rose-300 text-[10px] font-mono font-bold">
          <ShieldAlert className="w-3 h-3" />
          <span>{errorCode}</span>
        </div>
        <h3 className="font-serif text-lg font-bold text-rose-950 dark:text-rose-200">
          {title}
        </h3>
        <p className="text-xs text-rose-700 dark:text-rose-300/80 leading-relaxed">
          {description}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isRTL ? 'إعادة المحاولة' : 'Retry Operation'}</span>
        </button>
      )}
    </div>
  );
};
