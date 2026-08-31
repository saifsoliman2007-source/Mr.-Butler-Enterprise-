import React from 'react';
import { Search, X, Command } from 'lucide-react';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  isRTL?: boolean;
  className?: string;
  showShortcut?: boolean;
  id?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search services, garments, orders...',
  isRTL = false,
  className = '',
  showShortcut = true,
  id,
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
        <Search className="w-4 h-4" />
      </div>

      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 rtl:pl-10 rtl:pr-10 pr-16 py-2.5 sm:py-3 font-medium outline-none focus:border-[#00444D] dark:focus:border-[#ABEDFA] focus:ring-4 focus:ring-[#00444D]/15 shadow-xs transition-all placeholder:text-slate-400"
      />

      <div className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              if (onClear) onClear();
            }}
            aria-label="Clear search"
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {showShortcut && !value && (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        )}
      </div>
    </div>
  );
};
