import React from 'react';

export interface SkeletonProps {
  className?: string;
}

/**
 * Base Atomic Skeleton Box with subtle enterprise shimmer
 */
export const SkeletonBox: React.FC<SkeletonProps & { rounded?: string }> = ({ 
  className = 'h-4 w-full',
  rounded = 'rounded-xl'
}) => (
  <div 
    className={`bg-slate-200/80 dark:bg-slate-800/80 animate-pulse ${rounded} ${className}`}
    aria-hidden="true" 
  />
);

/**
 * Text Line Skeleton with variable line width
 */
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 2,
  className = ''
}) => (
  <div className={`space-y-2 ${className}`} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonBox 
        key={i} 
        className={`h-3.5 ${i === lines - 1 && lines > 1 ? 'w-3/5' : 'w-full'}`} 
      />
    ))}
  </div>
);

/**
 * Badge / Pill Skeleton
 */
export const SkeletonBadge: React.FC<SkeletonProps> = ({ className = 'h-5 w-16' }) => (
  <SkeletonBox className={`${className}`} rounded="rounded-full" />
);

/**
 * Button Skeleton
 */
export const SkeletonButton: React.FC<SkeletonProps & { size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean }> = ({
  size = 'md',
  fullWidth = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-28',
    lg: 'h-12 w-36',
  }[size];

  return (
    <SkeletonBox 
      className={`${sizeClasses} ${fullWidth ? 'w-full' : ''} ${className}`} 
      rounded="rounded-xl" 
    />
  );
};

/* -------------------------------------------------------------
 * 1. Service Card Skeleton (Services: Dry Clean, Tailor, Shoe, etc.)
 * ------------------------------------------------------------- */
export interface ServiceCardSkeletonProps {
  layout?: 'grid' | 'horizontal' | 'bar' | 'tile' | 'chip';
  className?: string;
}

export const ServiceCardSkeleton: React.FC<ServiceCardSkeletonProps> = ({
  layout = 'grid',
  className = ''
}) => {
  // 1.1 Compact Chip Skeleton
  if (layout === 'chip') {
    return (
      <div 
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${className}`}
        aria-hidden="true"
      >
        <SkeletonBox className="w-4 h-4 rounded-md" />
        <SkeletonBox className="w-24 h-3.5" />
        <SkeletonBox className="w-12 h-3.5 rounded" />
      </div>
    );
  }

  // 1.2 Mobile Bar Skeleton
  if (layout === 'bar') {
    return (
      <div 
        className={`w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 ${className}`}
        aria-hidden="true"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <SkeletonBox className="w-10 h-10 rounded-xl flex-shrink-0" />
          <div className="space-y-1.5 flex-1">
            <SkeletonBox className="h-4 w-1/3" />
            <SkeletonBox className="h-3 w-1/2" />
          </div>
        </div>
        <SkeletonBox className="w-24 h-8 rounded-xl flex-shrink-0" />
      </div>
    );
  }

  // 1.3 Horizontal Card Skeleton
  if (layout === 'horizontal') {
    return (
      <div 
        className={`p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
        aria-hidden="true"
      >
        <div className="flex items-start gap-4 flex-1">
          <SkeletonBox className="w-12 h-12 rounded-2xl flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <SkeletonBox className="w-16 h-3" />
              <SkeletonBox className="w-12 h-3 rounded-full" />
            </div>
            <SkeletonBox className="h-5 w-2/5" />
            <SkeletonBox className="h-3.5 w-4/5" />
            <SkeletonBox className="w-28 h-3" />
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="space-y-1 text-right">
            <SkeletonBox className="w-12 h-2.5 ml-auto" />
            <SkeletonBox className="w-16 h-5 ml-auto" />
          </div>
          <SkeletonBox className="w-28 h-9 rounded-xl" />
        </div>
      </div>
    );
  }

  // 1.4 Discovery Tile Skeleton
  if (layout === 'tile') {
    return (
      <div 
        className={`p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-between aspect-square ${className}`}
        aria-hidden="true"
      >
        <div className="w-full flex justify-end">
          <SkeletonBox className="w-12 h-3 rounded" />
        </div>
        <SkeletonBox className="w-12 h-12 rounded-2xl" />
        <div className="space-y-1.5 w-full flex flex-col items-center">
          <SkeletonBox className="h-3.5 w-3/4" />
          <SkeletonBox className="h-3 w-1/2" />
        </div>
        <SkeletonBox className="w-16 h-3 rounded" />
      </div>
    );
  }

  // 1.5 Standard Grid Card Skeleton (Default)
  return (
    <div 
      className={`p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-4 shadow-xs ${className}`}
      aria-hidden="true"
    >
      <div>
        <div className="flex items-start justify-between mb-3">
          <SkeletonBox className="w-11 h-11 rounded-2xl flex-shrink-0" />
          <SkeletonBadge className="w-14 h-4" />
        </div>

        <SkeletonBox className="w-16 h-2.5 mb-1.5" />
        <SkeletonBox className="h-5 w-3/4 mb-2" />
        <div className="space-y-1.5">
          <SkeletonBox className="h-3 w-full" />
          <SkeletonBox className="h-3 w-4/5" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <SkeletonBox className="h-4 w-16" />
          <SkeletonBox className="h-3 w-20" />
        </div>
        <SkeletonButton size="md" fullWidth={true} />
      </div>
    </div>
  );
};

export const SkeletonServiceCard = ServiceCardSkeleton;

/* -------------------------------------------------------------
 * 2. Offer Card Skeleton (Promotions, Discounts & Privileges)
 * ------------------------------------------------------------- */
export const OfferCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div 
    className={`p-5 rounded-2xl border border-amber-200/60 dark:border-amber-900/30 bg-gradient-to-br from-amber-50/50 via-white to-transparent dark:from-amber-950/10 dark:via-slate-900 dark:to-slate-900 flex flex-col justify-between space-y-4 shadow-xs ${className}`}
    aria-hidden="true"
  >
    <div>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <SkeletonBox className="w-10 h-10 rounded-xl bg-amber-200/40 dark:bg-amber-900/30 flex-shrink-0" />
          <SkeletonBox className="w-20 h-3" />
        </div>
        <SkeletonBadge className="w-24 h-4 bg-amber-200/50 dark:bg-amber-900/40" />
      </div>

      <SkeletonBox className="h-5 w-2/3 mb-2" />
      <SkeletonBox className="h-8 w-24 rounded-lg bg-amber-300/40 dark:bg-amber-800/30 mb-2" />
      <SkeletonBox className="h-3 w-4/5" />
    </div>

    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <SkeletonBox className="w-24 h-3" />
      <SkeletonBox className="w-20 h-7 rounded-lg" />
    </div>
  </div>
);

export const SkeletonOfferCard = OfferCardSkeleton;

/* -------------------------------------------------------------
 * 3. Order Card Skeleton (Active & Historic Order Tracking)
 * ------------------------------------------------------------- */
export const OrderCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div 
    className={`p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-4 shadow-xs ${className}`}
    aria-hidden="true"
  >
    <div>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 flex-1">
          <SkeletonBox className="w-10 h-10 rounded-xl flex-shrink-0" />
          <div className="space-y-1.5 flex-1">
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-3 w-16" />
          </div>
        </div>
        <SkeletonBadge className="w-20 h-5" />
      </div>

      <SkeletonBox className="h-3.5 w-3/4 mt-2" />
    </div>

    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
      <SkeletonBox className="h-5 w-16" />
      <SkeletonBox className="h-8 w-24 rounded-xl" />
    </div>
  </div>
);

export const SkeletonOrderCard = OrderCardSkeleton;

/* -------------------------------------------------------------
 * 4. Premium Card Skeleton (VIP / Imperial Membership)
 * ------------------------------------------------------------- */
export const PremiumCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div 
    className={`p-5 rounded-2xl border border-[#CCA730]/30 bg-gradient-to-br from-[#00363D]/90 via-[#00444D]/90 to-[#0D5D68]/90 text-white flex flex-col justify-between space-y-4 shadow-md ${className}`}
    aria-hidden="true"
  >
    <div>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <SkeletonBox className="w-10 h-10 rounded-xl bg-white/20 flex-shrink-0" />
          <SkeletonBox className="w-20 h-3 bg-white/20" />
        </div>
        <SkeletonBadge className="w-20 h-4 bg-white/20" />
      </div>

      <SkeletonBox className="h-5 w-3/5 bg-white/30 mb-2" />
      <SkeletonBox className="h-3.5 w-4/5 bg-white/20 mb-4" />

      {/* Benefit Bullets */}
      <div className="space-y-2 mb-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <SkeletonBox className="w-3.5 h-3.5 rounded-full bg-white/30 flex-shrink-0" />
            <SkeletonBox className="h-3 w-4/5 bg-white/20" />
          </div>
        ))}
      </div>
    </div>

    <div className="pt-3 border-t border-white/15 flex items-center justify-between">
      <SkeletonBox className="w-16 h-3 bg-white/20" />
      <SkeletonBox className="w-32 h-8 rounded-xl bg-[#FFE088]/40" />
    </div>
  </div>
);

export const SkeletonPremiumCard = PremiumCardSkeleton;

/* -------------------------------------------------------------
 * 5. Universal Enterprise Card Skeleton
 * ------------------------------------------------------------- */
export type EnterpriseCardSkeletonVariant = 
  | 'service' 
  | 'offer' 
  | 'order' 
  | 'featured' 
  | 'standard' 
  | 'horizontal' 
  | 'tile' 
  | 'chip';

export interface EnterpriseCardSkeletonProps {
  variant?: EnterpriseCardSkeletonVariant;
  count?: number;
  className?: string;
}

export const EnterpriseCardSkeleton: React.FC<EnterpriseCardSkeletonProps> = ({
  variant = 'service',
  count = 1,
  className = ''
}) => {
  const renderSingle = (key?: number) => {
    switch (variant) {
      case 'offer':
        return <OfferCardSkeleton key={key} className={className} />;
      case 'order':
        return <OrderCardSkeleton key={key} className={className} />;
      case 'featured':
        return <PremiumCardSkeleton key={key} className={className} />;
      case 'horizontal':
        return <ServiceCardSkeleton key={key} layout="horizontal" className={className} />;
      case 'tile':
        return <ServiceCardSkeleton key={key} layout="tile" className={className} />;
      case 'chip':
        return <ServiceCardSkeleton key={key} layout="chip" className={className} />;
      case 'service':
      case 'standard':
      default:
        return <ServiceCardSkeleton key={key} layout="grid" className={className} />;
    }
  };

  if (count <= 1) {
    return renderSingle();
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => renderSingle(i))}
    </div>
  );
};

/* -------------------------------------------------------------
 * 6. Skeleton List (Generic List View Skeleton)
 * ------------------------------------------------------------- */
export const SkeletonList: React.FC<{ count?: number; className?: string }> = ({ 
  count = 3,
  className = ''
}) => (
  <div className={`space-y-3 ${className}`} aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <SkeletonBox className="w-10 h-10 rounded-xl flex-shrink-0" />
          <div className="space-y-1.5 flex-1">
            <SkeletonBox className="h-4 w-40" />
            <SkeletonBox className="h-3 w-24" />
          </div>
        </div>
        <SkeletonBox className="w-16 h-8 rounded-lg flex-shrink-0" />
      </div>
    ))}
  </div>
);

/**
 * Standard SkeletonCard (Backwards Compatibility wrapper)
 */
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ServiceCardSkeleton layout="grid" className={className} />
);

/**
 * Primary Master LoadingSkeleton Controller Component
 */
export const LoadingSkeleton: React.FC<{
  variant?: 'card' | 'service' | 'offer' | 'order' | 'featured' | 'horizontal' | 'tile' | 'chip' | 'list' | 'box';
  count?: number;
  className?: string;
}> = ({
  variant = 'service',
  count = 1,
  className
}) => {
  if (variant === 'list') return <SkeletonList count={count} className={className} />;
  if (variant === 'box') return <SkeletonBox className={className} />;
  if (variant === 'offer') return <EnterpriseCardSkeleton variant="offer" count={count} className={className} />;
  if (variant === 'order') return <EnterpriseCardSkeleton variant="order" count={count} className={className} />;
  if (variant === 'featured') return <EnterpriseCardSkeleton variant="featured" count={count} className={className} />;
  if (variant === 'horizontal') return <EnterpriseCardSkeleton variant="horizontal" count={count} className={className} />;
  if (variant === 'tile') return <EnterpriseCardSkeleton variant="tile" count={count} className={className} />;
  if (variant === 'chip') return <EnterpriseCardSkeleton variant="chip" count={count} className={className} />;
  
  return <EnterpriseCardSkeleton variant="service" count={count} className={className} />;
};
