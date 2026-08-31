import React, { useId } from 'react';

export interface ToggleProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
  id?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  isRTL = false,
  className = '',
  id: customId,
}) => {
  const generatedId = useId();
  const toggleId = customId || `toggle-${generatedId}`;

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`flex items-center justify-between gap-4 select-none ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      <div className="flex flex-col">
        <label 
          htmlFor={toggleId}
          className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {description}
          </span>
        )}
      </div>

      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00444D]/20 ${
          checked ? 'bg-[#00444D] dark:bg-[#ABEDFA]' : 'bg-slate-300 dark:bg-slate-700'
        }`}
      >
        <span className="sr-only">Toggle option</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-slate-900 shadow-md ring-0 transition duration-200 ease-in-out ${
            checked 
              ? 'translate-x-5 rtl:-translate-x-5' 
              : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
