import React from 'react';
import { Loader2 } from 'lucide-react';

export type PrimaryButtonAction = 'continue' | 'book' | 'confirm' | 'register' | 'submit' | 'pay' | 'custom';
export type SecondaryButtonAction = 'view' | 'edit' | 'more' | 'cancel' | 'custom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
  actionType?: PrimaryButtonAction | SecondaryButtonAction;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Standardized Enterprise Primary Button
 * Primary Used for: Continue, Book, Confirm, Register, Submit, Pay
 */
export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  className = '',
  size = 'md',
  actionType = 'custom',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs min-h-[36px]',
    md: 'px-5 py-2.5 text-sm min-h-[44px]',
    lg: 'px-7 py-3.5 text-base min-h-[52px]',
  }[size];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CCA730] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm active:scale-[0.99] bg-[#00444D] text-white hover:bg-[#0D5D68] dark:bg-[#00444D] dark:hover:bg-[#0D5D68] border border-[#00444D] hover:border-[#0D5D68] ${sizeClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin rtl:mr-0 rtl:ml-2" />
      ) : (
        leftIcon && <span className="mr-2 rtl:mr-0 rtl:ml-2 flex items-center">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && (
        <span className="ml-2 rtl:ml-0 rtl:mr-2 flex items-center">{rightIcon}</span>
      )}
    </button>
  );
};

/**
 * Standardized Enterprise Secondary Button
 * Secondary Used for: View, Edit, More, Cancel
 */
export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  className = '',
  size = 'md',
  actionType = 'custom',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs min-h-[36px]',
    md: 'px-5 py-2.5 text-sm min-h-[44px]',
    lg: 'px-7 py-3.5 text-base min-h-[52px]',
  }[size];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00444D] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99] bg-white hover:bg-slate-100/80 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 dark:border-slate-700 shadow-xs ${sizeClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin rtl:mr-0 rtl:ml-2" />
      ) : (
        leftIcon && <span className="mr-2 rtl:mr-0 rtl:ml-2 flex items-center">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && (
        <span className="ml-2 rtl:ml-0 rtl:mr-2 flex items-center">{rightIcon}</span>
      )}
    </button>
  );
};

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 min-w-[32px] p-1.5',
    md: 'w-10 h-10 min-w-[40px] p-2',
    lg: 'w-12 h-12 min-w-[48px] p-3',
  }[size];

  const variantClasses = {
    primary: 'bg-[#00444D] hover:bg-[#0D5D68] text-white shadow-xs',
    secondary: 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 shadow-xs',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300',
    gold: 'bg-gradient-to-r from-[#00444D] to-[#0D5D68] text-[#FFE088] border border-[#CCA730]/40 shadow-xs hover:shadow-md'
  }[variant];

  return (
    <button
      title={label}
      aria-label={label}
      disabled={disabled || isLoading}
      className={`rounded-xl transition-all duration-150 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#CCA730] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
    </button>
  );
};

