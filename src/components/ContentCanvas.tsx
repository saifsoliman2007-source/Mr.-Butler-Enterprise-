import React from 'react';
import { DeviceType, Orientation } from '../types';
import { SAFE_AREA_BASELINE } from '../styles/tokens';
import { 
  Maximize2, 
  RotateCw, 
  Smartphone, 
  Tablet, 
  Monitor, 
  TabletSmartphone,
  Layers,
  Keyboard,
  ShieldCheck,
  Eye,
  FoldHorizontal,
  Info
} from 'lucide-react';

interface ContentCanvasProps {
  children: React.ReactNode;
  deviceType: DeviceType;
  orientation?: Orientation;
  simulateKeyboard?: boolean;
  simulateHinge?: boolean;
  showSafeOverlay?: boolean;
  isRTL?: boolean;
}

/**
 * ContentCanvas
 * 
 * Strict Safe Area Standard Implementation:
 * - No primary content may touch the physical screen edge.
 * - Baseline Horizontal: Mobile 16dp, Tablet 24dp, Desktop 32dp
 * - Baseline Vertical: Minimum 24dp
 * - Android system bars & iOS safe areas respected via env(safe-area-inset-*)
 * - Browser viewport insets, Foldable hinge clearance, Dynamic keyboard appearance, and Landscape orientation.
 */
export const ContentCanvas: React.FC<ContentCanvasProps> = ({
  children,
  deviceType,
  orientation = 'portrait',
  simulateKeyboard = false,
  simulateHinge = false,
  showSafeOverlay = false,
  isRTL = false,
}) => {
  const isTablet = deviceType === 'android_tablet' || deviceType === 'ipad';
  const isDesktop = deviceType === 'desktop';
  const isFoldable = deviceType === 'foldable_folded' || deviceType === 'foldable_unfolded';
  const isUnfoldedFoldable = deviceType === 'foldable_unfolded';
  const isLandscape = orientation === 'landscape';

  // Baseline Horizontal: Mobile 16dp (16px), Tablet 24dp (24px), Desktop 32dp (32px)
  const baselineHorizontal = isDesktop
    ? SAFE_AREA_BASELINE.horizontal.desktop
    : isTablet || isUnfoldedFoldable
    ? SAFE_AREA_BASELINE.horizontal.tablet
    : SAFE_AREA_BASELINE.horizontal.mobile;

  // Baseline Vertical: Mobile 24dp (24px), Tablet 32dp (32px), Desktop 40dp (40px)
  const baselineVertical = isDesktop
    ? SAFE_AREA_BASELINE.vertical.desktop
    : isTablet || isUnfoldedFoldable
    ? SAFE_AREA_BASELINE.vertical.tablet
    : SAFE_AREA_BASELINE.vertical.mobile;

  // Dynamic Horizontal Insets taking max(baseline, env(safe-area-inset-*))
  const calculatedPaddingLeft = `max(${baselineHorizontal}, env(safe-area-inset-left, 0px))`;
  const calculatedPaddingRight = `max(${baselineHorizontal}, env(safe-area-inset-right, 0px))`;

  // Dynamic Vertical Insets
  const calculatedPaddingTop = `max(${baselineVertical}, env(safe-area-inset-top, 0px))`;
  const calculatedPaddingBottom = simulateKeyboard
    ? `calc(240px + max(${baselineVertical}, env(safe-area-inset-bottom, 0px)))`
    : `max(${baselineVertical}, env(safe-area-inset-bottom, 0px))`;

  return (
    <div 
      className={`relative w-full flex-1 flex flex-col justify-between overflow-x-hidden transition-all duration-300 ${
        isRTL ? 'rtl' : 'ltr'
      }`}
      style={{
        paddingTop: calculatedPaddingTop,
        paddingBottom: calculatedPaddingBottom,
        paddingLeft: calculatedPaddingLeft,
        paddingRight: calculatedPaddingRight,
      }}
    >
      {/* Visual Safe Area Guideline & System Inset Inspection Overlay */}
      {showSafeOverlay && (
        <div className="absolute inset-0 pointer-events-none z-50 border-2 border-dashed border-emerald-500/50 rounded-2xl flex flex-col justify-between p-2 m-2">
          {/* Top Inset Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/90 px-2.5 py-1 rounded-md backdrop-blur-sm shadow-xs border border-emerald-500/30">
            <span className="flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              SAFE AREA TOP: min 24dp (System Bars / Notch / Dynamic Island)
            </span>
            <span className="font-semibold bg-emerald-500/20 px-1.5 py-0.5 rounded">
              Active: {isDesktop ? 'Desktop 32dp H' : isTablet ? 'Tablet 24dp H' : 'Mobile 16dp H'}
            </span>
          </div>

          {/* Center Info Banner */}
          <div className="flex items-center justify-between text-[9px] font-mono text-emerald-800 dark:text-emerald-200 bg-emerald-50/80 dark:bg-emerald-950/80 px-3 py-1 rounded border border-emerald-500/20 self-center">
            <span>Edge Clearance Baseline: {baselineHorizontal} • Safe Orientation: {orientation.toUpperCase()}</span>
            {simulateKeyboard && <span className="text-purple-600 dark:text-purple-300 font-bold ml-2">• +240px IME Clearance</span>}
            {isUnfoldedFoldable && <span className="text-amber-600 dark:text-amber-300 font-bold ml-2">• Foldable Hinge Active</span>}
          </div>
          
          {/* Bottom Inset Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/90 px-2.5 py-1 rounded-md backdrop-blur-sm shadow-xs border border-emerald-500/30">
            <span className="flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              SAFE AREA BOTTOM: min 24dp (Gesture Bar / Navigation Inset)
            </span>
            <span>No content touches physical screen edge</span>
          </div>
        </div>
      )}

      {/* Foldable Center Hinge Area Clearance simulation */}
      {simulateHinge && isFoldable && isUnfoldedFoldable && (
        <div 
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 z-40 bg-slate-900/10 dark:bg-black/30 border-x border-dashed border-amber-500/40 flex flex-col items-center justify-center pointer-events-none"
          title="Foldable Physical Hinge Crease (Protected Inset)"
        >
          <div className="w-1 h-20 bg-amber-500/80 rounded-full shadow-xs" />
          <span className="text-[8px] font-mono text-amber-600 dark:text-amber-300 bg-black/60 px-1 py-0.5 rounded mt-2 rotate-90 whitespace-nowrap">
            HINGE ZONE
          </span>
        </div>
      )}

      {/* Main Canvas Content Container with Foldable and Fluid Clearance */}
      <div 
        className={`w-full flex-1 flex flex-col max-w-7xl mx-auto z-10 ${
          isUnfoldedFoldable ? 'px-3' : ''
        }`}
      >
        {children}
      </div>

      {/* Onscreen Simulated Virtual Keyboard Drawer (Keyboard Appearance Testing) */}
      {simulateKeyboard && (
        <div className="absolute bottom-0 left-0 right-0 h-[240px] bg-slate-200 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-800 shadow-2xl z-50 flex flex-col p-2 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-1 px-2 border-b border-slate-300 dark:border-slate-800 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <Keyboard className="w-3.5 h-3.5 text-blue-600" /> Virtual IME Keyboard (Simulated Appearance)
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">Dynamic +240px inset active</span>
          </div>
          {/* Key layout simulation */}
          <div className="flex-1 grid grid-rows-3 gap-1.5 p-2">
            <div className="flex justify-center gap-1">
              {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
                <div key={k} className="flex-1 max-w-[36px] bg-white dark:bg-slate-800 rounded-md shadow-xs flex items-center justify-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {k}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-1 px-3">
              {['A','S','D','F','G','H','J','K','L'].map(k => (
                <div key={k} className="flex-1 max-w-[36px] bg-white dark:bg-slate-800 rounded-md shadow-xs flex items-center justify-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {k}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-1 px-6">
              {['Z','X','C','V','B','N','M'].map(k => (
                <div key={k} className="flex-1 max-w-[36px] bg-white dark:bg-slate-800 rounded-md shadow-xs flex items-center justify-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {k}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

