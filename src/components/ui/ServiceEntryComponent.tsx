import React from 'react';
import { 
  Shirt, 
  Scissors, 
  Footprints, 
  Sparkle, 
  Dog, 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import { ScreenId, Language } from '../../types';

export type ServiceEntryLayout = 'grid' | 'horizontal' | 'chip' | 'bar' | 'tile';

export interface ServiceEntryData {
  id: ScreenId;
  name: string;
  nameKey: string;
  shortDescription?: string;
  availability: string;
  startingPrice: string;
  primaryActionLabel: string;
  icon: LucideIcon;
  badge?: string;
  category: string;
}

/**
 * Permanent First-Class Release 1 Service Entities (Requirement 13)
 */
export const RELEASE_1_SERVICES: ServiceEntryData[] = [
  {
    id: 'book_dry_cleaning',
    name: 'Dry Cleaning & Laundry',
    nameKey: 'navDryCleaning',
    shortDescription: 'Eco-solvent delicate garment wash, silk & wool care with hand-pressed finishing.',
    availability: 'Open Today • 7:00 AM - 10:00 PM',
    startingPrice: 'From $12.00',
    primaryActionLabel: 'Book Service',
    icon: Shirt,
    badge: 'Eco-Solvent',
    category: 'Garment Care'
  },
  {
    id: 'book_tailoring',
    name: 'Tailoring & Alterations',
    nameKey: 'navTailoring',
    shortDescription: 'Master fitting, hem adjustments, silhouette reshaping, and bespoke seamstressing.',
    availability: 'Next Master Slot in 30 mins',
    startingPrice: 'From $25.00',
    primaryActionLabel: 'Book Fitting',
    icon: Scissors,
    badge: 'Bespoke',
    category: 'Tailoring'
  },
  {
    id: 'book_shoe_repair',
    name: 'Shoe Fix & Repair',
    nameKey: 'navShoeRepair',
    shortDescription: 'Artisan cobbler resoling, edge re-crafting, leather conditioning, and polish.',
    availability: 'Available Daily',
    startingPrice: 'From $28.00',
    primaryActionLabel: 'Book Restoration',
    icon: Footprints,
    badge: 'Artisan Cobbler',
    category: 'Footwear'
  },
  {
    id: 'book_beauty_salon',
    name: 'Beauty Salon Services',
    nameKey: 'navBeautySalon',
    shortDescription: 'In-suite aesthetician appointments, styling, blowout bar, and manicures.',
    availability: 'By Private Appointment',
    startingPrice: 'From $45.00',
    primaryActionLabel: 'Book Salon',
    icon: Sparkle,
    badge: 'VIP Salon',
    category: 'Grooming'
  },
  {
    id: 'book_pet_care',
    name: 'Pet Care Services',
    nameKey: 'navPetCare',
    shortDescription: 'Gentle organic hydro-spa baths, hygienic brushing, and white-glove valet walking.',
    availability: 'On-Demand & Scheduled',
    startingPrice: 'From $30.00',
    primaryActionLabel: 'Book Pet Spa',
    icon: Dog,
    badge: 'Gentle Care',
    category: 'Valet Pets'
  }
];

export interface ServiceEntryComponentProps {
  service: ServiceEntryData;
  layout?: ServiceEntryLayout;
  isSelected?: boolean;
  onSelect?: (serviceId: ScreenId) => void;
  className?: string;
  lang?: Language;
}

/**
 * Universal Shared Service Entry Component (Requirement 14)
 * Supports:
 * - horizontal cards
 * - grid cards
 * - compact chips
 * - mobile service bar
 * - discovery tiles
 */
export const ServiceEntryComponent: React.FC<ServiceEntryComponentProps> = ({
  service,
  layout = 'grid',
  isSelected = false,
  onSelect,
  className = '',
}) => {
  const Icon = service.icon;
  const isRTL = false;

  const handleClick = () => {
    onSelect?.(service.id);
  };

  /* -------------------------------------------------------------
   * 1. Compact Chip Layout
   * ------------------------------------------------------------- */
  if (layout === 'chip') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
          isSelected
            ? 'bg-[#00444D] text-white border-[#00444D] shadow-xs'
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#00444D]/50 hover:bg-[#F0F9FA] dark:hover:bg-slate-800'
        } ${className}`}
      >
        <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`} />
        <span className="whitespace-nowrap">{service.name}</span>
        {service.startingPrice && (
          <span className={`text-[10px] font-mono ml-1 px-1.5 py-0.5 rounded ${
            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-[#00444D] dark:text-[#FFE088]'
          }`}>
            {service.startingPrice}
          </span>
        )}
      </button>
    );
  }

  /* -------------------------------------------------------------
   * 2. Mobile Service Bar Layout
   * ------------------------------------------------------------- */
  if (layout === 'bar') {
    return (
      <div
        onClick={handleClick}
        className={`w-full p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
          isSelected
            ? 'border-[#00444D] bg-[#F0F9FA] dark:bg-[#00444D]/20 ring-2 ring-[#00444D]'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#00444D]/50 shadow-xs'
        } ${className}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-serif text-sm font-bold text-[#00444D] dark:text-white truncate">
                {service.name}
              </h4>
              {service.badge && (
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#FFE088] text-[#241A00] px-1.5 py-0.5 rounded">
                  {service.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span className="font-semibold text-[#00444D] dark:text-[#FFE088]">{service.startingPrice}</span>
              <span>•</span>
              <span className="truncate text-[11px]">{service.availability}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-[#00444D] text-white hover:bg-[#0D5D68] text-xs font-bold transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-xs"
        >
          <span>{service.primaryActionLabel}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 3. Horizontal Card Layout
   * ------------------------------------------------------------- */
  if (layout === 'horizontal') {
    return (
      <div
        onClick={handleClick}
        className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-pointer ${
          isSelected
            ? 'border-[#00444D] bg-[#F0F9FA] dark:bg-[#00444D]/25 ring-2 ring-[#00444D] shadow-md'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#00444D] hover:shadow-xs'
        } ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] flex items-center justify-center flex-shrink-0 shadow-inner">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                {service.category}
              </span>
              {service.badge && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#FFE088] text-[#241A00]">
                  {service.badge}
                </span>
              )}
            </div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#00444D] dark:text-white mt-0.5">
              {service.name}
            </h4>
            {service.shortDescription && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl line-clamp-2">
                {service.shortDescription}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA]" />
                {service.availability}
              </span>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-mono">ESTIMATE</span>
            <span className="text-base font-extrabold text-[#00444D] dark:text-[#FFE088] font-mono">
              {service.startingPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="px-4 py-2 rounded-xl bg-[#00444D] text-white hover:bg-[#0D5D68] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
          >
            <span>{service.primaryActionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 4. Discovery Tile Layout
   * ------------------------------------------------------------- */
  if (layout === 'tile') {
    return (
      <div
        onClick={handleClick}
        className={`group p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all cursor-pointer aspect-square ${
          isSelected
            ? 'border-[#00444D] bg-[#F0F9FA] dark:bg-[#00444D]/25 ring-2 ring-[#00444D]'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#00444D] hover:shadow-md'
        } ${className}`}
      >
        <div className="w-full flex justify-end">
          {service.badge && (
            <span className="text-[8px] font-bold uppercase tracking-wider bg-[#FFE088] text-[#241A00] px-1.5 py-0.5 rounded">
              {service.badge}
            </span>
          )}
        </div>

        <div className="w-12 h-12 rounded-2xl bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6" />
        </div>

        <div>
          <h4 className="font-serif text-xs sm:text-sm font-bold text-[#00444D] dark:text-white line-clamp-2">
            {service.name}
          </h4>
          <span className="text-[11px] font-bold text-[#00444D] dark:text-[#FFE088] font-mono block mt-1">
            {service.startingPrice}
          </span>
        </div>

        <span className="text-[10px] text-[#00444D] dark:text-[#ABEDFA] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          {service.primaryActionLabel} <ArrowRight className="w-2.5 h-2.5" />
        </span>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 5. Default Grid Card Layout
   * ------------------------------------------------------------- */
  return (
    <div
      onClick={handleClick}
      className={`p-5 rounded-2xl border flex flex-col justify-between transition-all cursor-pointer ${
        isSelected
          ? 'border-[#00444D] bg-[#F0F9FA] dark:bg-[#00444D]/25 ring-2 ring-[#00444D] shadow-md'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#00444D] hover:shadow-sm'
      } ${className}`}
    >
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] flex items-center justify-center shadow-inner">
            <Icon className="w-5 h-5" />
          </div>
          {service.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#FFE088] text-[#241A00]">
              {service.badge}
            </span>
          )}
        </div>

        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          {service.category}
        </span>
        <h4 className="font-serif text-base font-bold text-[#00444D] dark:text-white mt-0.5">
          {service.name}
        </h4>
        {service.shortDescription && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-extrabold text-[#00444D] dark:text-[#FFE088] font-mono text-sm">
            {service.startingPrice}
          </span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {service.availability}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-[#00444D] text-white hover:bg-[#0D5D68] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>{service.primaryActionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
