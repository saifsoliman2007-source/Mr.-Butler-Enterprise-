import React from 'react';
import { 
  Sparkles, 
  Crown, 
  Tag, 
  Clock, 
  ChevronRight, 
  Package, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  ArrowRight,
  Info,
  Layers,
  Inbox,
  ExternalLink,
  LucideIcon
} from 'lucide-react';

export type EnterpriseCardVariant = 
  | 'standard' 
  | 'featured' 
  | 'service' 
  | 'offer' 
  | 'order' 
  | 'information' 
  | 'action' 
  | 'empty';

export interface EnterpriseCardProps {
  variant?: EnterpriseCardVariant;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  headerAction?: React.ReactNode;
  footerContent?: React.ReactNode;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Standardized Enterprise Card Component (Requirement 15)
 * Structural language remains identical across all domains (services, offers, providers,
 * orders, booking options, recommendations, information, notifications).
 */
export const EnterpriseCard: React.FC<EnterpriseCardProps> = ({
  variant = 'standard',
  title,
  subtitle,
  description,
  icon: Icon,
  badge,
  headerAction,
  footerContent,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  isSelected = false,
  onClick,
  className = '',
  children
}) => {
  // Variant-specific styling rules
  const variantStyles = {
    standard: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100',
    featured: 'border-[#CCA730]/40 bg-gradient-to-br from-[#00363D] via-[#00444D] to-[#0D5D68] text-white shadow-lg',
    service: isSelected
      ? 'border-[#00444D] bg-[#F4FAFB] dark:bg-[#00444D]/25 ring-2 ring-[#00444D] shadow-md'
      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#00444D] hover:shadow-xs',
    offer: 'border-[#CCA730]/40 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent text-slate-800 dark:text-slate-100',
    order: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100',
    information: 'border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 text-slate-800 dark:text-slate-100',
    action: 'border-[#00444D]/30 dark:border-[#ABEDFA]/20 bg-[#F0F9FA] dark:bg-[#00444D]/15 text-slate-800 dark:text-slate-100',
    empty: 'border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 text-center items-center justify-center p-8',
  }[variant];

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${variantStyles} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Top Header Row */}
      {(Icon || badge || headerAction || subtitle) && (
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                variant === 'featured'
                  ? 'bg-white/10 text-[#FFE088]'
                  : 'bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            {subtitle && (
              <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                variant === 'featured' ? 'text-[#FFE088]' : 'text-slate-400 dark:text-slate-400'
              }`}>
                {subtitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                variant === 'featured'
                  ? 'bg-white/20 text-[#FFE088] border border-white/30'
                  : 'bg-[#FFE088] text-[#241A00]'
              }`}>
                {badge}
              </span>
            )}
            {headerAction}
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="flex-1">
        {title && (
          <h4 className={`font-serif text-base sm:text-lg font-bold tracking-tight mb-1 ${
            variant === 'featured' ? 'text-white' : 'text-[#00444D] dark:text-white'
          }`}>
            {title}
          </h4>
        )}
        {description && (
          <div className={`text-xs sm:text-sm leading-relaxed mb-3 ${
            variant === 'featured' ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'
          }`}>
            {description}
          </div>
        )}
        {children}
      </div>

      {/* Footer & Actions */}
      {(footerContent || primaryActionLabel || secondaryActionLabel) && (
        <div className={`flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t ${
          variant === 'featured' ? 'border-white/15' : 'border-slate-100 dark:border-slate-800'
        }`}>
          <div>{footerContent}</div>

          <div className="flex items-center gap-2">
            {secondaryActionLabel && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSecondaryAction?.();
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {secondaryActionLabel}
              </button>
            )}

            {primaryActionLabel && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrimaryAction?.();
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                  variant === 'featured'
                    ? 'bg-[#FFE088] text-[#241A00] hover:bg-[#F3D477]'
                    : 'bg-[#00444D] text-white hover:bg-[#0D5D68]'
                }`}
              >
                <span>{primaryActionLabel}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------
 * 1. ServiceCard (Pre-styled Service Domain Wrapper)
 * ------------------------------------------------------------- */
export interface ServiceCardProps {
  title: string;
  subtitle: string;
  category?: string;
  price?: string;
  eta?: string;
  icon?: LucideIcon;
  badge?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  category,
  price,
  eta,
  icon = Sparkles,
  badge,
  isSelected = false,
  onSelect,
  className = ''
}) => {
  return (
    <EnterpriseCard
      variant="service"
      title={title}
      subtitle={category}
      description={subtitle}
      icon={icon}
      badge={badge}
      isSelected={isSelected}
      onClick={onSelect}
      className={className}
      footerContent={
        <div className="flex items-center gap-3 text-xs">
          {price && <span className="font-bold text-[#00444D] dark:text-[#FFE088]">{price}</span>}
          {eta && (
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3" />
              {eta}
            </span>
          )}
        </div>
      }
    />
  );
};

/* -------------------------------------------------------------
 * 2. PremiumCard (VIP / Membership / Bespoke Valet Privileges)
 * ------------------------------------------------------------- */
export interface PremiumCardProps {
  tierName?: string;
  title: string;
  description: string;
  benefits?: string[];
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  tierName = 'Imperial Tier',
  title,
  description,
  benefits = [
    '24/7 Dedicated White-Glove Butler',
    'Priority same-day express turnaround',
    'Complimentary wardrobe ozonization'
  ],
  actionLabel = 'Explore Privilege',
  onAction,
  className = ''
}) => {
  return (
    <EnterpriseCard
      variant="featured"
      title={title}
      subtitle={tierName}
      description={description}
      icon={Crown}
      badge="VIP MEMBER"
      primaryActionLabel={actionLabel}
      onPrimaryAction={onAction}
      className={className}
    >
      {benefits.length > 0 && (
        <ul className="space-y-2 mb-2">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-[#FFE088]">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-slate-100">{benefit}</span>
            </li>
          ))}
        </ul>
      )}
    </EnterpriseCard>
  );
};

/* -------------------------------------------------------------
 * 3. OfferCard (Promotional Discounts & Privileges)
 * ------------------------------------------------------------- */
export interface OfferCardProps {
  promoCode: string;
  title: string;
  discount: string;
  validUntil: string;
  onApply?: (code: string) => void;
  className?: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  promoCode,
  title,
  discount,
  validUntil,
  onApply,
  className = ''
}) => {
  return (
    <EnterpriseCard
      variant="offer"
      title={title}
      icon={Tag}
      badge="Special Privilege"
      description={
        <p className="text-2xl font-bold text-[#CCA730] mt-1 font-mono">
          {discount}
        </p>
      }
      className={className}
      footerContent={
        <span className="text-[11px] text-slate-400 font-mono">
          Valid: {validUntil}
        </span>
      }
      headerAction={
        <button
          onClick={() => onApply?.(promoCode)}
          className="px-3 py-1 rounded-lg bg-[#00444D] text-white hover:bg-[#0D5D68] text-xs font-bold font-mono transition-colors cursor-pointer"
        >
          {promoCode}
        </button>
      }
    />
  );
};

/* -------------------------------------------------------------
 * 4. OrderCard (Order Status & Lifecycle Tracker)
 * ------------------------------------------------------------- */
export interface OrderCardProps {
  orderId: string;
  serviceType: string;
  status: 'pending' | 'in_progress' | 'out_for_delivery' | 'completed' | 'cancelled';
  statusLabel: string;
  itemsCount: number;
  totalPrice: string;
  date: string;
  onViewDetails?: () => void;
  className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  serviceType,
  status,
  statusLabel,
  itemsCount,
  totalPrice,
  date,
  onViewDetails,
  className = ''
}) => {
  const statusColors = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300',
    in_progress: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300',
    out_for_delivery: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300',
    completed: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300',
    cancelled: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300',
  }[status];

  return (
    <EnterpriseCard
      variant="order"
      title={serviceType}
      subtitle={orderId}
      icon={Package}
      badge={<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors}`}>{statusLabel}</span>}
      description={`${itemsCount} Garment / Care Items • Scheduled: ${date}`}
      className={className}
      footerContent={
        <span className="font-bold text-sm text-[#00444D] dark:text-[#FFE088]">
          {totalPrice}
        </span>
      }
      primaryActionLabel="View Details"
      onPrimaryAction={onViewDetails}
    />
  );
};
