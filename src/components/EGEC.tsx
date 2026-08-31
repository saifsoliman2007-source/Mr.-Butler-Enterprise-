import React from 'react';
import officialLogoAsset from '../assets/images/file_00000000ffe88210a60271dd7139bb6d.png';

/**
 * EBIA: Enterprise Brand Image Asset path
 * The official, protected Mr. Butler artwork asset pulled from GitHub repository.
 * Not to be redrawn, recolored, or replaced with plain letters.
 */
export const EBIA_SRC = officialLogoAsset;

export type EGECSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
export type EGECShape = 'rounded-2xl' | 'rounded-full' | 'rounded-3xl';

export interface EGECProps {
  size?: EGECSize;
  shape?: EGECShape;
  withAura?: boolean;
  withSheen?: boolean;
  withBeacon?: boolean;
  beaconStatus?: 'online' | 'verified' | 'standby';
  className?: string;
  altText?: string;
}

const SIZE_CONFIGS: Record<EGECSize, {
  container: string;
  imgPadding: string;
  innerRadius: string;
  sheenSize: string;
  badgeSize: string;
}> = {
  xs: {
    container: 'w-7 h-7 min-w-[28px]',
    imgPadding: 'p-0.5',
    innerRadius: 'rounded-md',
    sheenSize: 'w-3 h-3',
    badgeSize: 'w-1.5 h-1.5 ring-1',
  },
  sm: {
    container: 'w-9 h-9 min-w-[36px]',
    imgPadding: 'p-0.5',
    innerRadius: 'rounded-lg',
    sheenSize: 'w-4 h-4',
    badgeSize: 'w-2 h-2 ring-1.5',
  },
  md: {
    container: 'w-12 h-12 min-w-[48px]',
    imgPadding: 'p-1',
    innerRadius: 'rounded-xl',
    sheenSize: 'w-6 h-6',
    badgeSize: 'w-2.5 h-2.5 ring-2',
  },
  lg: {
    container: 'w-16 h-16 min-w-[64px]',
    imgPadding: 'p-1.5',
    innerRadius: 'rounded-2xl',
    sheenSize: 'w-8 h-8',
    badgeSize: 'w-3 h-3 ring-2',
  },
  xl: {
    container: 'w-24 h-24 min-w-[96px]',
    imgPadding: 'p-2',
    innerRadius: 'rounded-2xl',
    sheenSize: 'w-12 h-12',
    badgeSize: 'w-3.5 h-3.5 ring-2',
  },
  hero: {
    container: 'w-36 h-36 sm:w-44 sm:h-44 min-w-[144px]',
    imgPadding: 'p-2.5 sm:p-3',
    innerRadius: 'rounded-full',
    sheenSize: 'w-20 h-20',
    badgeSize: 'w-4 h-4 ring-2',
  },
};

/**
 * EGEC: Enterprise Glass Emblem Component
 * The reusable 3D glass presentation enclosure that displays EBIA.
 * It provides the crystal-glass surface, optical depth, luxury frame,
 * shadows, reflections and tactile presentation without altering the underlying official logo.
 */
export const EGEC: React.FC<EGECProps> = ({
  size = 'md',
  shape = 'rounded-2xl',
  withAura = true,
  withSheen = true,
  withBeacon = false,
  beaconStatus = 'verified',
  className = '',
  altText = 'Mr. Butler Enterprise Crest',
}) => {
  const config = SIZE_CONFIGS[size];
  const isCircle = shape === 'rounded-full' || size === 'hero';
  const effectiveShape = isCircle ? 'rounded-full' : shape;
  const effectiveInnerRadius = isCircle ? 'rounded-full' : config.innerRadius;

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 group select-none ${className}`}
      aria-label="Enterprise Glass Emblem Component"
    >
      {/* Layer 1: Ambient Optical Aura (MEDS Atmosphere) */}
      {withAura && (
        <div 
          className={`absolute -inset-1.5 ${effectiveShape} bg-gradient-to-tr from-[#3B82F6]/30 via-[#1D4ED8]/20 to-[#60A5FA]/25 blur-md pointer-events-none transition-all duration-700 group-hover:opacity-100 group-hover:scale-105`} 
        />
      )}

      {/* Layer 2: 3D Crystal Glass Bezel Enclosure (Glassmorphism & Claymorphism Frame) */}
      <div
        className={`relative ${config.container} ${effectiveShape} ${config.imgPadding} 
          bg-gradient-to-b from-white/90 via-slate-100/80 to-slate-200/90 
          dark:from-slate-800/90 dark:via-[#0F172A]/90 dark:to-slate-950/95
          backdrop-blur-xl
          border border-white/60 dark:border-white/15
          shadow-[0_8px_20px_-4px_rgba(15,23,42,0.18),0_2px_6px_rgba(59,130,246,0.12),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)]
          dark:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.6),0_2px_8px_rgba(59,130,246,0.25),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.5)]
          transition-transform duration-300 group-hover:scale-[1.02] flex items-center justify-center overflow-hidden`}
      >
        {/* Layer 3: Inner Official EBIA Asset Display (Protected Artwork) */}
        <div className={`w-full h-full ${effectiveInnerRadius} overflow-hidden bg-[#0A1112] shadow-inner relative flex items-center justify-center`}>
          <img
            src={EBIA_SRC}
            alt={altText}
            className={`w-full h-full object-cover ${effectiveInnerRadius} transform transition-transform duration-500 group-hover:scale-105`}
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Layer 4: Specular Glass Sheen Reflection (Crystal Refraction Sweep) */}
          {withSheen && (
            <div 
              className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none ${effectiveInnerRadius}`} 
            />
          )}

          {/* Layer 5: Optical Rim Highlight */}
          <div 
            className={`absolute inset-0 border border-white/20 dark:border-white/10 pointer-events-none ${effectiveInnerRadius}`} 
          />
        </div>
      </div>

      {/* Layer 6: Optional Verified Beacon Status */}
      {withBeacon && (
        <span 
          className={`absolute -bottom-0.5 -right-0.5 ${config.badgeSize} rounded-full ring-white dark:ring-slate-900 ${
            beaconStatus === 'verified' ? 'bg-[#10B981]' : beaconStatus === 'online' ? 'bg-[#3B82F6]' : 'bg-amber-400'
          } shadow-sm animate-pulse`}
          title={`Status: ${beaconStatus}`}
        />
      )}
    </div>
  );
};
