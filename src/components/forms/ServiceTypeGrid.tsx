import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ServiceTypeOptionItem<T extends string = string> {
  id: T;
  label: string;
  labelAr?: string;
  price?: number | string;
  icon?: LucideIcon;
  badge?: string;
  badgeAr?: string;
}

export interface ServiceTypeGridProps<T extends string = string> {
  options: ServiceTypeOptionItem<T>[];
  value: T;
  onChange: (value: T) => void;
  isRTL?: boolean;
  columns?: 2 | 3 | 4;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  ariaLabel?: string;
}

export function ServiceTypeGrid<T extends string = string>({
  options,
  value,
  onChange,
  isRTL = false,
  columns = 3,
  size = 'sm',
  className = '',
  ariaLabel = 'Select service type',
}: ServiceTypeGridProps<T>) {
  const getGridColsClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-2';
      case 4:
        return 'grid-cols-2 sm:grid-cols-4';
      case 3:
      default:
        return 'grid-cols-3';
    }
  };

  const getPaddingClass = () => {
    switch (size) {
      case 'xs':
        return 'py-1 px-1.5 text-[10px]';
      case 'md':
        return 'py-2 px-2.5 text-xs sm:text-sm';
      case 'sm':
      default:
        return 'py-1.5 px-2 text-[11px]';
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`grid ${getGridColsClass()} gap-1.5 w-full ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {options.map((option) => {
        const isSelected = value === option.id;
        const Icon = option.icon;
        const displayLabel = isRTL && option.labelAr ? option.labelAr : option.label;
        const displayBadge = isRTL && option.badgeAr ? option.badgeAr : option.badge;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.id)}
            className={`relative rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer border text-center select-none ${getPaddingClass()} ${
              isSelected
                ? 'bg-[#00444D] text-white border-[#00444D] shadow-2xs font-semibold'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-[#D9E3F6] dark:border-slate-700 hover:bg-[#F0F4FF] dark:hover:bg-slate-700/60'
            }`}
          >
            {Icon && (
              <Icon
                className={`${
                  size === 'xs' ? 'w-2.5 h-2.5' : 'w-3 h-3'
                } shrink-0 ${isSelected ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`}
              />
            )}
            <span className="truncate">{displayLabel}</span>
            {option.price !== undefined && (
              <span
                className={`font-mono text-[10px] font-bold ${
                  isSelected ? 'text-[#FFE088]' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {typeof option.price === 'number' ? `$${option.price}` : option.price}
              </span>
            )}
            {displayBadge && (
              <span
                className={`absolute -top-1.5 -right-1 text-[8px] px-1 py-0.2 rounded-full font-bold uppercase tracking-tight ${
                  isSelected
                    ? 'bg-[#FFE088] text-[#00444D]'
                    : 'bg-[#00444D] text-white'
                }`}
              >
                {displayBadge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
