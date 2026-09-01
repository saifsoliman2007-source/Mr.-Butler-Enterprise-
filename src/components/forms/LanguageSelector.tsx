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
        className={`flex items-center gap-1 rounded-md font-medium transition-all focus:outline-none focus:ring-1.5 focus:ring-[#00444D] cursor-pointer ${
          variant === 'header'
            ? 'h-7 sm:h-7.5 px-1.5 sm:px-2 text-[10px] sm:text-[11px] text-[#00444D] dark:text-[#ABEDFA] bg-[#E6EEFF] dark:bg-slate-800 hover:bg-[#D9E3F6] dark:hover:bg-slate-700 border border-[#D9E3F6] dark:border-slate-700 shadow-2xs'
            : 'h-6.5 px-1.5 sm:px-2 text-[10px] sm:text-[11px] text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 hover:border-slate-400 shadow-2xs'
        }`}
      >
        <Globe className="w-3 h-3 flex-shrink-0 text-[#00444D] dark:text-[#ABEDFA]" />
        
        {/* Language Display: Code on narrow screens, native name on larger */}
        <span className="font-semibold tracking-tight text-[10px] sm:text-[11px]">
          <span className="xs:hidden">{currentOption.code.toUpperCase()}</span>
          <span className="hidden xs:inline">{compact ? currentOption.nativeName : `${currentOption.name} (${currentOption.nativeName})`}</span>
        </span>

        <ChevronDown 
          className={`w-2.5 h-2.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Popover / Dropdown Menu: Styled to strictly stay within screen boundaries and never overflow */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Supported Languages"
          className={`absolute top-full mt-1.5 w-44 sm:w-48 max-w-[calc(100vw-24px)] max-h-[75vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-[#D9E3F6] dark:border-slate-800 py-1 z-50 backdrop-blur-md animate-fadeIn ${
            isRTL ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
          }`}
        >
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-0.5">
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
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00444D] text-white font-bold shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-[#EFF4FF] dark:hover:bg-slate-800 font-medium'
                  }`}
                >
                  <div className="flex flex-col text-left rtl:text-right">
                    <span className="font-semibold text-xs leading-tight">{langOption.nativeName}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                      {langOption.name}
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#FFE088] flex-shrink-0" />
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
