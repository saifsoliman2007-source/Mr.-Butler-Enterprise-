import React from 'react';
import { 
  Sparkles, 
  Crown, 
  Package, 
  Palette, 
  Eye,
  Check
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  startingPrice: string;
  eta: string;
  icon?: LucideIcon;
  badge?: string;
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'dry_cleaning',
    name: 'Dry Cleaning & Laundry',
    category: 'Garment Care',
    startingPrice: '$24.00',
    eta: '4 Hours',
    icon: Sparkles,
    badge: 'Popular'
  },
  {
    id: 'tailoring',
    name: 'Tailoring & Alterations',
    category: 'Bespoke Fitting',
    startingPrice: '$45.00',
    eta: '24 Hours',
    icon: Crown,
    badge: 'Artisan'
  },
  {
    id: 'shoe_repair',
    name: 'Shoe Fix & Restoration',
    category: 'Leather Studio',
    startingPrice: '$38.00',
    eta: '2 Days',
    icon: Package
  },
  {
    id: 'beauty_salon',
    name: 'Beauty Salon Services',
    category: 'In-Suite Grooming',
    startingPrice: '$65.00',
    eta: 'By Appointment',
    icon: Palette,
    badge: 'Luxury'
  },
  {
    id: 'pet_care',
    name: 'Pet Care & Spa',
    category: 'Valet Pet Care',
    startingPrice: '$30.00',
    eta: 'Flexible',
    icon: Eye
  }
];

export interface ServiceSelectorProps {
  services?: ServiceItem[];
  selectedServiceId: string;
  onSelectService: (serviceId: string) => void;
  className?: string;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services = DEFAULT_SERVICES,
  selectedServiceId,
  onSelectService,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 ${className}`}>
      {services.map((item) => {
        const Icon = item.icon || Sparkles;
        const isSelected = selectedServiceId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectService(item.id)}
            className={`relative p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
              isSelected
                ? 'border-[#00444D] bg-[#F0F9FA] dark:bg-[#00444D]/25 ring-2 ring-[#00444D] shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#00444D]/50 hover:bg-slate-50/50'
            }`}
          >
            {item.badge && (
              <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#FFE088] text-[#241A00]">
                {item.badge}
              </span>
            )}

            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isSelected
                  ? 'bg-[#00444D] text-[#FFE088]'
                  : 'bg-slate-100 dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  {item.category}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-[#00444D] dark:text-white mt-0.5">
                  {item.name}
                </h4>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-bold text-[#00444D] dark:text-[#FFE088]">
                {item.startingPrice}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400">{item.eta}</span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-[#00444D] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
