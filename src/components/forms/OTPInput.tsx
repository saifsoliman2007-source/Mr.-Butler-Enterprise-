import React, { useRef, useEffect, useState, useId } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';

export interface EnterpriseOTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (code: string) => void;
  onResend?: () => void;
  resendCountdown?: number; // in seconds
  isError?: boolean;
  errorMessage?: string;
  isVerified?: boolean;
  verifiedMessage?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  lang?: Language;
  className?: string;
  id?: string;
}

export const OTPInput: React.FC<EnterpriseOTPInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  onResend,
  resendCountdown = 45,
  isError = false,
  errorMessage,
  isVerified = false,
  verifiedMessage = 'Verification code confirmed.',
  disabled = false,
  autoFocus = true,
  lang = 'en',
  className = '',
  id: customId,
}) => {
  const generatedId = useId();
  const componentId = customId || `enterprise-otp-${generatedId}`;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Timer state for resend functionality
  const [timer, setTimer] = useState<number>(resendCountdown);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>('');

  const isRTL = lang === 'ar';

  // Split value string into array of single characters
  const digits = value.padEnd(length, '').slice(0, length).split('');

  // Initial Auto-focus
  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  // Handle completion trigger
  useEffect(() => {
    if (value.length === length) {
      setAnnouncement(`All ${length} digits entered: ${value}`);
      if (onComplete) {
        onComplete(value);
      }
    }
  }, [value, length, onComplete]);

  // Resend Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
      setAnnouncement('Verification code expired. You may now request a new code.');
    }
  }, [timer]);

  // Announce verification or error changes
  useEffect(() => {
    if (isVerified) {
      setAnnouncement(verifiedMessage);
    } else if (isError && errorMessage) {
      setAnnouncement(`Error: ${errorMessage}`);
    }
  }, [isVerified, isError, errorMessage, verifiedMessage]);

  const handleDigitChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.slice(-1); // Take last character entered
    if (!/^[0-9]?$/.test(val)) return;

    const newDigits = [...digits];
    newDigits[index] = val;
    const newValue = newDigits.join('').trimEnd();
    onChange(newValue);

    if (val) {
      setAnnouncement(`Digit ${index + 1} set to ${val}`);
      // Auto focus next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Step back and clear prior box
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join('').trimEnd());
      } else if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join('').trimEnd());
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length);
    if (pastedData) {
      onChange(pastedData);
      setAnnouncement(`Pasted ${pastedData.length}-digit code.`);
      const targetIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[targetIndex]?.focus();
    }
  };

  const handleResendClick = () => {
    if (!canResend || disabled) return;
    setTimer(resendCountdown);
    setCanResend(false);
    setAnnouncement('New verification code requested.');
    if (onResend) onResend();
  };

  return (
    <div 
      id={componentId}
      className={`w-full flex flex-col items-center space-y-4 select-none ${className}`}
    >
      {/* Live Accessibility Announcement Region for Screen Readers */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcement}
      </div>

      {/* 6-Digit Container (Strictly LTR presentation for numerical safety across RTL locales) */}
      <div 
        dir="ltr"
        role="group" 
        aria-label={`6-digit verification security code`}
        className="flex items-center justify-center gap-1.5 sm:gap-2.5 max-w-full"
      >
        {Array.from({ length }).map((_, index) => {
          const isFilled = Boolean(digits[index]);
          const isCurrentActive = digits.findIndex((d) => !d) === index;

          let stateClasses = 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100';
          
          if (isVerified) {
            stateClasses = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20';
          } else if (isError) {
            stateClasses = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/20 animate-shake';
          } else if (isFilled) {
            stateClasses = 'border-[#00444D] dark:border-[#ABEDFA] bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] shadow-xs';
          } else if (isCurrentActive) {
            stateClasses = 'border-[#CCA730] ring-2 ring-[#CCA730]/30 bg-amber-50/30 dark:bg-amber-950/20';
          }

          return (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={1}
              value={digits[index] || ''}
              onChange={(e) => handleDigitChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={disabled || isVerified}
              aria-label={`Digit ${index + 1} of ${length}`}
              aria-invalid={isError ? 'true' : 'false'}
              className={`w-10 h-13 sm:w-12 sm:h-14 md:w-13 md:h-15 text-center text-xl sm:text-2xl font-bold font-mono rounded-2xl border-2 transition-all outline-none shadow-xs
                ${stateClasses}
                focus:border-[#00444D] dark:focus:border-[#ABEDFA] focus:ring-4 focus:ring-[#00444D]/20
                disabled:opacity-60 disabled:cursor-not-allowed`}
            />
          );
        })}
      </div>

      {/* Status & Feedback Area */}
      {isVerified && (
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{verifiedMessage}</span>
        </div>
      )}

      {isError && errorMessage && (
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Resend Code Timer and Action */}
      {!isVerified && (
        <div className="flex items-center justify-between w-full max-w-xs text-xs px-1 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <RefreshCw className={`w-3.5 h-3.5 ${!canResend ? 'animate-spin text-slate-400' : 'text-[#00444D] dark:text-[#ABEDFA]'}`} />
            {!canResend ? (
              <span>
                {isRTL ? `إعادة الإرسال بعد ${timer} ثانية` : `Resend code in ${timer}s`}
              </span>
            ) : (
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {isRTL ? 'لم تستلم الرمز؟' : "Didn't receive code?"}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleResendClick}
            disabled={!canResend || disabled}
            className={`font-bold transition-all underline cursor-pointer ${
              canResend && !disabled
                ? 'text-[#00444D] dark:text-[#ABEDFA] hover:text-[#0D5D68] cursor-pointer'
                : 'text-slate-300 dark:text-slate-600 cursor-not-allowed no-underline'
            }`}
          >
            {isRTL ? 'إعادة إرسال الرمز' : 'Resend Now'}
          </button>
        </div>
      )}
    </div>
  );
};
