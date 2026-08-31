import React, { useState } from 'react';
import { ScreenId, Language, DeviceType } from '../../types';
import { 
  Columns, 
  Square, 
  Smartphone, 
  TabletSmartphone, 
  Monitor, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

interface DualPaneLayoutProps {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  leftPaneTitle?: string;
  rightPaneTitle?: string;
  isFoldable?: boolean;
  foldPosture?: 'flat' | 'book' | 'tent';
  lang?: Language;
  onNavigate?: (screen: ScreenId) => void;
  className?: string;
}

export const DualPaneLayout: React.FC<DualPaneLayoutProps> = ({
  leftPane,
  rightPane,
  leftPaneTitle,
  rightPaneTitle,
  isFoldable = false,
  foldPosture = 'flat',
  lang = 'en',
  className = ''
}) => {
  const isRTL = lang === 'ar';
  const [activeMobilePane, setActiveMobilePane] = useState<'left' | 'right'>('left');

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`w-full flex-1 flex flex-col ${className}`}
    >
      {/* Desktop / Foldable Dual Pane Grid */}
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 relative overflow-hidden rounded-3xl border border-[#D9E3F6] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        
        {/* Left / Master Pane (Columns 1 - 5 on Desktop / Foldable) */}
        <div 
          className={`lg:col-span-5 border-b lg:border-b-0 ${
            isRTL ? 'lg:border-l' : 'lg:border-r'
          } border-[#D9E3F6] dark:border-slate-800 flex flex-col bg-[#F8F9FF] dark:bg-slate-900/60 overflow-y-auto ${
            activeMobilePane === 'right' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {leftPaneTitle && (
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-[#D9E3F6] dark:border-slate-800 flex items-center justify-between">
              <span className="font-serif text-sm font-bold text-[#00444D] dark:text-white">
                {leftPaneTitle}
              </span>
              <span className="text-[10px] font-mono text-slate-400">Primary Pane</span>
            </div>
          )}
          <div className="p-4 sm:p-5 flex-1">
            {leftPane}
          </div>
        </div>

        {/* Physical Foldable Hinge Visual Simulation (When in Foldable mode) */}
        {isFoldable && (
          <div 
            className="hidden lg:flex absolute inset-y-0 left-[41.666%] w-3 -ml-1.5 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 z-20 shadow-inner items-center justify-center pointer-events-none"
            title="Foldable Hinge Line (First-Class Device Target)"
          >
            <div className="w-0.5 h-12 bg-white/40 dark:bg-black/40 rounded-full" />
          </div>
        )}

        {/* Right / Detail Pane (Columns 6 - 12 on Desktop / Foldable) */}
        <div 
          className={`lg:col-span-7 flex flex-col bg-white dark:bg-slate-900 overflow-y-auto ${
            activeMobilePane === 'left' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {rightPaneTitle && (
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-[#D9E3F6] dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveMobilePane('left')}
                  className="lg:hidden p-1 text-[#00444D] dark:text-[#ABEDFA] font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                  <span>Back</span>
                </button>
                <span className="font-serif text-sm font-bold text-[#00444D] dark:text-white">
                  {rightPaneTitle}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Detail Pane</span>
            </div>
          )}
          <div className="p-4 sm:p-5 flex-1">
            {rightPane}
          </div>
        </div>

      </div>

      {/* Mobile Single-Screen Pane Switcher */}
      <div className="lg:hidden mt-3 flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-2xl border border-[#D9E3F6] dark:border-slate-800 text-xs">
        <span className="text-slate-500 text-[11px] px-2 font-mono">
          Viewport: Single Screen
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveMobilePane('left')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeMobilePane === 'left'
                ? 'bg-[#00444D] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {leftPaneTitle || 'Catalog Pane'}
          </button>
          <button
            onClick={() => setActiveMobilePane('right')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeMobilePane === 'right'
                ? 'bg-[#00444D] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {rightPaneTitle || 'Action Pane'}
          </button>
        </div>
      </div>
    </div>
  );
};
