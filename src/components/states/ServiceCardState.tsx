import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  RefreshCw, 
  BellRing, 
  CheckCircle2, 
  Lock, 
  Ban,
  LucideIcon
} from 'lucide-react';
import { Language } from '../../types';
import { ServiceCardSkeleton, SkeletonCard } from './LoadingSkeleton';
import { ErrorStateView } from './ErrorStateView';

export type ComponentStateMode = 'available' | 'temporarily_unavailable' | 'loading' | 'error' | 'disabled' | 'empty' | 'unavailable';

export interface ServiceCardData {
  id: string;
  title: string;
  category: string;
  description: string;
  priceStartingAt: number;
  estimatedTime: string;
  badge?: string;
  imageUrl?: string;
}

export interface ServiceCardStateProps {
  service?: ServiceCardData;
  stateMode?: ComponentStateMode;
  mode?: ComponentStateMode;
  title?: string;
  subtitle?: string;
  tag?: string;
  price?: string;
  eta?: string;
  icon?: LucideIcon;
  onBook?: () => void;
  onSelect?: () => void;
  onRetry?: () => void;
  lang?: Language;
  allowStateSwitching?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  unavailableReason?: string;
}

export const ServiceCardState: React.FC<ServiceCardStateProps> = ({
  service,
  stateMode,
  mode,
  title: propTitle,
  subtitle: propSubtitle,
  tag: propTag,
  price: propPrice,
  eta: propEta,
  icon: PropIcon = Sparkles,
  onBook,
  onSelect,
  onRetry,
  lang = 'en',
  allowStateSwitching = false,
  errorMessage,
  emptyMessage,
  unavailableReason
}) => {
  const initialMode = mode || stateMode || 'available';
  const [currentMode, setCurrentMode] = useState<ComponentStateMode>(initialMode);
  const [waitlistJoined, setWaitlistJoined] = useState(false);

  // Sync mode if changed by parent
  React.useEffect(() => {
    if (mode) setCurrentMode(mode);
    else if (stateMode) setCurrentMode(stateMode);
  }, [mode, stateMode]);

  const isRTL = lang === 'ar';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const resolvedTitle = propTitle || service?.title || 'Service Offering';
  const resolvedCategory = propTag || service?.category || 'Valet Service';
  const resolvedDescription = propSubtitle || service?.description || 'Bespoke high-touch white glove care';
  const resolvedPrice = propPrice || (service ? `$${service.priceStartingAt}` : '$24.00');
  const resolvedAction = onSelect || onBook;

  // 1. Loading State
  if (currentMode === 'loading') {
    return (
      <div className="space-y-2">
        {allowStateSwitching && renderStateSwitcher(currentMode, setCurrentMode)}
        <ServiceCardSkeleton />
      </div>
    );
  }

  // 2. Error State
  if (currentMode === 'error') {
    return (
      <div className="space-y-2">
        {allowStateSwitching && renderStateSwitcher(currentMode, setCurrentMode)}
        <ErrorStateView
          title={errorMessage || `Unable to load "${resolvedTitle}"`}
          description="Pricing matrix and artisan schedule temporarily unreachable. Tap retry to reconnect."
          errorCode="ERR_CATALOG_SYNC_502"
          onRetry={onRetry || (() => setCurrentMode('available'))}
          lang={lang}
        />
      </div>
    );
  }

  // 3. Empty State
  if (currentMode === 'empty') {
    return (
      <div className="space-y-2">
        {allowStateSwitching && renderStateSwitcher(currentMode, setCurrentMode)}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-400">
            <Ban className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-sm font-bold text-slate-800 dark:text-white">
            {emptyMessage || 'No Service Variants Configured'}
          </h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            This bespoke department has no active catalog entries in your selected region.
          </p>
        </div>
      </div>
    );
  }

  const isUnavailable = currentMode === 'temporarily_unavailable' || currentMode === 'unavailable';
  const isDisabled = currentMode === 'disabled';

  return (
    <div className="space-y-2">
      {allowStateSwitching && renderStateSwitcher(currentMode, setCurrentMode)}

      <div 
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`group bg-white dark:bg-slate-900 border rounded-3xl p-5 transition-all relative overflow-hidden shadow-xs flex flex-col justify-between ${
          isDisabled
            ? 'opacity-50 grayscale border-slate-200 dark:border-slate-800 cursor-not-allowed'
            : isUnavailable
              ? 'border-amber-300 dark:border-amber-700/60 bg-amber-50/20 dark:bg-amber-950/10'
              : 'border-[#D9E3F6] dark:border-slate-800 hover:border-[#00444D] dark:hover:border-[#ABEDFA] hover:shadow-md'
        }`}
      >
        <div>
          {/* Top Badges */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] flex items-center justify-center">
                <PropIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                {resolvedCategory}
              </span>
            </div>

            {isUnavailable ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{isRTL ? 'غير متوفر مؤقتاً' : 'Temporarily Unavailable'}</span>
              </span>
            ) : isDisabled ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>{isRTL ? 'غير متاح لحسابك' : 'Restricted Role'}</span>
              </span>
            ) : propTag || service?.badge ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE088] text-[#241A00]">
                {propTag || service?.badge}
              </span>
            ) : null}
          </div>

          {/* Title & Description */}
          <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white leading-tight">
            {resolvedTitle}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {resolvedDescription}
          </p>

          {/* Unavailable Notice / Waitlist Bar */}
          {isUnavailable && (
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-semibold text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{isRTL ? 'طلب عالي على ورشة الحرفيين' : 'Artisan Atelier at Peak Capacity'}</span>
              </div>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-400">
                {unavailableReason || (isRTL ? 'مواعيد هذا الأسبوع محجوزة بالكامل. انضم لقائمة الانتظار للإشعار الفوري عند فتح موعد جديد.' : 'All slots booked for today. Join VIP waitlist to be alerted upon early valet release.')}
              </p>
              <button
                type="button"
                onClick={() => setWaitlistJoined(true)}
                disabled={waitlistJoined}
                className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  waitlistJoined
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                }`}
              >
                {waitlistJoined ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'تم الانضمام لقائمة الانتظار' : 'On Waitlist (Priority #4)'}</span>
                  </>
                ) : (
                  <>
                    <BellRing className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'إشعار عند التوفر' : 'Join VIP Waitlist'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Pricing and Action Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">
              {isRTL ? 'يبدأ من' : 'Starting from'}
            </span>
            <span className="font-serif text-lg font-bold text-[#00444D] dark:text-[#FFE088]">
              {resolvedPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={resolvedAction}
            disabled={isDisabled || isUnavailable}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
              isDisabled || isUnavailable
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-[#00444D] hover:bg-[#0D5D68] text-white border-b border-[#CCA730] active:scale-95'
            }`}
          >
            <span>{isRTL ? 'طلب الخدمة' : 'Request Service'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

function renderStateSwitcher(
  current: ComponentStateMode,
  setMode: (mode: ComponentStateMode) => void
) {
  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto text-[10px] font-mono scrollbar-none">
      <span className="text-slate-400 font-bold px-2">State:</span>
      {(['available', 'loading', 'empty', 'error', 'disabled', 'unavailable'] as ComponentStateMode[]).map((mode) => (
        <button
          key={mode}
          onClick={() => setMode(mode)}
          className={`px-2 py-0.5 rounded-lg font-semibold transition-all capitalize whitespace-nowrap cursor-pointer ${
            current === mode
              ? 'bg-[#00444D] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {mode.replace('_', ' ')}
        </button>
      ))}
    </div>
  );
}
