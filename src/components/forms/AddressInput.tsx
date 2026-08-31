import React, { useState } from 'react';
import { MapPin, Building, Navigation, Check } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

export interface AddressValue {
  street: string;
  unit?: string;
  city: string;
  postalCode?: string;
}

export interface AddressInputProps {
  label?: string;
  value: AddressValue;
  onChange: (value: AddressValue) => void;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  requiredIndicator?: boolean;
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
}

const PRESET_ADDRESSES: { name: string; address: AddressValue }[] = [
  {
    name: 'Wayne Manor Residence',
    address: { street: '1007 Mountain Drive', unit: 'East Wing Suite', city: 'Dubai Marina', postalCode: '00000' }
  },
  {
    name: 'Penthouse Palms',
    address: { street: 'Palm Jumeirah Crescent', unit: 'Villa 42', city: 'Dubai', postalCode: '00000' }
  },
  {
    name: 'Downtown Executive',
    address: { street: 'Financial Center Road', unit: 'Floor 54, Apt 5402', city: 'DIFC', postalCode: '00000' }
  }
];

export const AddressInput: React.FC<AddressInputProps> = ({
  label = 'Service Address',
  value,
  onChange,
  helperText,
  errorMessage,
  isError = false,
  requiredIndicator = false,
  disabled = false,
  isRTL = false,
  className = '',
}) => {
  const [showPresets, setShowPresets] = useState(false);

  return (
    <div className={`w-full flex flex-col space-y-2.5 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            {label}
            {requiredIndicator && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </label>
        )}

        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="text-xs font-semibold text-[#00444D] dark:text-[#ABEDFA] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Navigation className="w-3 h-3" />
          <span>{isRTL ? 'عناوين محفوظة' : 'Saved Addresses'}</span>
        </button>
      </div>

      {/* Preset Addresses Accordion */}
      {showPresets && (
        <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-750 space-y-1.5 animate-fadeIn">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-2">
            {isRTL ? 'اختر من العناوين المحفوظة' : 'Quick Select Saved Address'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            {PRESET_ADDRESSES.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  onChange(preset.address);
                  setShowPresets(false);
                }}
                className="p-2 text-left rtl:text-right rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-[#00444D] dark:hover:border-[#ABEDFA] text-xs transition-all cursor-pointer"
              >
                <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{preset.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{preset.address.street}, {preset.address.city}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Street Address */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
          <MapPin className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value.street}
          onChange={(e) => onChange({ ...value, street: e.target.value })}
          placeholder={isRTL ? 'الشارع / المبنى' : 'Street name & building number'}
          disabled={disabled}
          className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 rtl:pl-3.5 rtl:pr-10 pr-3.5 py-2.5 sm:py-3 font-medium outline-none focus:border-[#00444D] dark:focus:border-[#ABEDFA] focus:ring-4 focus:ring-[#00444D]/15 shadow-xs"
        />
      </div>

      {/* Unit / Suite & City Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
            <Building className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={value.unit || ''}
            onChange={(e) => onChange({ ...value, unit: e.target.value })}
            placeholder={isRTL ? 'الشقة / الجناح (اختياري)' : 'Apt / Suite / Villa (optional)'}
            disabled={disabled}
            className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-9 rtl:pl-3.5 rtl:pr-9 pr-3.5 py-2 sm:py-2.5 font-medium outline-none focus:border-[#00444D] dark:focus:border-[#ABEDFA] shadow-xs"
          />
        </div>

        <input
          type="text"
          value={value.city}
          onChange={(e) => onChange({ ...value, city: e.target.value })}
          placeholder={isRTL ? 'المدينة / المنطقة' : 'City / Neighborhood'}
          disabled={disabled}
          className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2 sm:py-2.5 font-medium outline-none focus:border-[#00444D] dark:focus:border-[#ABEDFA] shadow-xs"
        />
      </div>

      {isError && errorMessage && (
        <p role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}

      {!isError && helperText && (
        <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
          {helperText}
        </p>
      )}
    </div>
  );
};
