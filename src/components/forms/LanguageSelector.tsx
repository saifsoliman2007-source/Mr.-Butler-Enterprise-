import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../../types';
import { Globe, Check, ChevronDown } from 'lucide-react';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
];

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  compact?: boolean;
  variant?: 'header' | 'standalone' | 'inline';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  compact = true,
  variant = 'header',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isRTL = currentLanguage === 'ar';

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    onLanguageChange(code);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div 
      ref={dropdownRef} 
      className={`relative inline-block text-left select-none ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select Language, currently ${currentOption.name}`}
        className={`flex items-center gap-1.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#00444D] cursor-pointer ${
          variant === 'header'
            ? 'px-2.5 py-1.5 text-xs text-[#00444D] dark:text-[#ABEDFA] bg-[#E6EEFF] dark:bg-slate-800 hover:bg-[#D9E3F6] dark:hover:bg-slate-700 border border-[#D9E3F6] dark:border-slate-700 shadow-xs'
            : 'px-3 py-2 text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 shadow-xs'
        }`}
      >
        <Globe className="w-3.5 h-3.5 flex-shrink-0 text-[#00444D] dark:text-[#ABEDFA]" />
        
        {/* Language Display: Full name per requirement (NO flags) */}
        <span className="font-semibold tracking-tight">
          {compact ? currentOption.nativeName : `${currentOption.name} (${currentOption.nativeName})`}
        </span>

        <ChevronDown 
          className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Popover / Dropdown Menu: Designed to avoid clipping with smart bounds & z-50 */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Supported Languages"
          className={`absolute top-full mt-1.5 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-[#D9E3F6] dark:border-slate-800 py-1.5 z-50 backdrop-blur-md animate-fadeIn overflow-hidden ${
            isRTL ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
          }`}
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
            {isRTL ? 'اختر اللغة' : 'Select Language'}
          </div>

          <div className="space-y-0.5 px-1">
            {SUPPORTED_LANGUAGES.map((langOption) => {
              const isSelected = langOption.code === currentLanguage;
              return (
                <button
                  key={langOption.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(langOption.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00444D] text-white font-bold shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-[#EFF4FF] dark:hover:bg-slate-800 font-medium'
                  }`}
                >
                  <div className="flex flex-col text-left rtl:text-right">
                    <span className="font-semibold">{langOption.nativeName}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                      {langOption.name}
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#FFE088] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
