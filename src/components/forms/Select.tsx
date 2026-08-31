import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  requiredIndicator?: boolean;
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  helperText,
  errorMessage,
  isError = false,
  requiredIndicator = false,
  disabled = false,
  isRTL = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`w-full flex flex-col space-y-1.5 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {label && (
        <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-between">
          <span>
            {label}
            {requiredIndicator && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </span>
        </label>
      )}

      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full flex items-center justify-between text-xs sm:text-sm rounded-xl border font-medium px-3.5 py-2.5 sm:py-3 transition-all outline-none shadow-xs text-left rtl:text-right cursor-pointer
            ${
              isError
                ? 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/20 text-rose-900 dark:text-rose-100'
                : 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#00444D] dark:focus:border-[#ABEDFA] focus:ring-4 focus:ring-[#00444D]/15'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center gap-2 truncate">
            {selectedOption?.icon && (
              <span className="text-slate-500">{selectedOption.icon}</span>
            )}
            <span className={selectedOption ? 'font-medium' : 'text-slate-400'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            role="listbox"
            className="absolute top-full mt-1.5 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 z-50 animate-fadeIn max-h-60 overflow-y-auto"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm transition-all text-left rtl:text-right cursor-pointer ${
                    isSelected
                      ? 'bg-[#00444D] text-white font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {opt.icon && <span>{opt.icon}</span>}
                    <div>
                      <div className="font-semibold">{opt.label}</div>
                      {opt.description && (
                        <div className={`text-[11px] ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                          {opt.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-[#FFE088] flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
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
