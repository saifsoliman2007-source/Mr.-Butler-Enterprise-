import React, { useState, useEffect } from 'react';
import { Language, ScreenId } from '../../types';
import { translations } from '../../data/translations';
import { OTPInput } from '../OTPInput';
import { EGEC } from '../EGEC';
import { Mail, CheckCircle2, RefreshCw, ArrowLeft, Edit3, AlertCircle } from 'lucide-react';

interface Screen4Props {
  email: string;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const Screen4_EmailVerification: React.FC<Screen4Props> = ({
  email,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;

  const [otpValue, setOtpValue] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');

  useEffect(() => {
    let interval: any = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (otpValue.length < 6) {
      setErrorMsg('Please enter all 6 digits of your verification code.');
      return;
    }
    // Any 6 digits or test 123456 accepted
    onNavigate(5); // Consumer Reg Complete
  };

  const handleResend = () => {
    if (timer > 0) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setTimer(60);
      setSuccessToast(t.codeResentMsg);
      setTimeout(() => setSuccessToast(''), 4000);
    }, 800);
  };

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('create_account')}
          className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-300 hover:bg-[#F1F5F9] transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#00444D] dark:text-[#ABEDFA]" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#00444D] dark:bg-blue-950 dark:text-[#FFE088] border border-[#BFDBFE] dark:border-blue-800">
          Email OTP Step
        </span>
      </div>

      {/* Main Verification Container */}
      <div className="max-w-md w-full mx-auto space-y-6 my-auto text-center px-2">
        
        {/* Email Badge & Emblem */}
        <div className="space-y-3 flex flex-col items-center">
          <EGEC size="md" shape="rounded-2xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />

          <h1 
            className="text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight"
            style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}
          >
            {t.emailVerificationTitle}
          </h1>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-xs text-[#64748B] dark:text-slate-300 space-y-1 shadow-xs">
            <p>{t.enterCodeSentTo}</p>
            <div className="flex items-center justify-center gap-2 font-mono font-bold text-[#00444D] dark:text-[#ABEDFA] text-sm">
              <span>{email || 'consumer@mrbutler.com'}</span>
              <button
                onClick={() => onNavigate('create_account')}
                title={t.changeEmailAddress}
                className="p-1.5 rounded hover:bg-[#F1F5F9] dark:hover:bg-slate-800 text-[#64748B] hover:text-[#00444D] transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* OTP Input Component */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
            {t.verificationCodeLabel}
          </label>

          <OTPInput
            length={6}
            value={otpValue}
            onChange={(val) => {
              setOtpValue(val);
              if (errorMsg) setErrorMsg('');
            }}
            onComplete={(code) => {
              handleVerify();
            }}
          />

          {errorMsg && (
            <p className="text-xs text-red-500 flex items-center justify-center gap-1 font-medium pt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </p>
          )}

          {successToast && (
            <p className="text-xs text-[#10B981] flex items-center justify-center gap-1 font-medium pt-1 animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{successToast}</span>
            </p>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            onClick={handleVerify}
            className="w-full py-4 px-6 rounded-2xl bg-[#00444D] hover:bg-[#0D5D68] text-white font-bold text-sm shadow-[0_10px_25px_rgba(0,68,77,0.25)] hover:shadow-[0_15px_35px_rgba(0,68,77,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px] border-b-2 border-[#CCA730]/60 active:scale-[0.99]"
          >
            <span>{t.verifyEmail}</span>
          </button>
        </div>

        {/* Support Actions: Resend Code & Change Email */}
        <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={handleResend}
            disabled={timer > 0 || isResending}
            className={`font-semibold transition flex items-center gap-1.5 ${
              timer > 0
                ? 'text-[#64748B] cursor-not-allowed'
                : 'text-[#1D4ED8] dark:text-blue-400 hover:underline cursor-pointer'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
            <span>
              {timer > 0 ? `${t.resendCode} in ${timer}s` : t.resendCode}
            </span>
          </button>

          <button
            onClick={() => onNavigate(3)}
            className="text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100 underline"
          >
            {t.changeEmailAddress}
          </button>
        </div>

      </div>

      <div />
    </div>
  );
};
